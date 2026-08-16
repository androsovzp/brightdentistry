import fs from 'fs';
import path from 'path';
import { verifyAdminAuth } from '@/lib/adminAuth';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '15mb',
    },
  },
};

async function commitImageToGitHub(fileName, base64Content) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPOSITORY || 'androsovzp/brightdentistry';
  if (!token) {
    console.warn('⚠️ [Upload API] GITHUB_TOKEN is not set in environment variables. Image cannot be pushed to GitHub.');
    return { success: false, reason: 'GITHUB_TOKEN not configured' };
  }

  try {
    const url = `https://api.github.com/repos/${repo}/contents/public/images/products/${fileName}`;
    console.log(`🌐 [Upload API] Fetching current SHA for GitHub: ${url}`);

    let sha;
    try {
      const getRes = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });
      if (getRes.ok) {
        const fileData = await getRes.json();
        sha = fileData?.sha;
        console.log(`ℹ️ [Upload API] Existing file SHA found: ${sha}`);
      }
    } catch (e) {
      console.warn('ℹ️ [Upload API] File does not exist in GitHub yet, will create new.');
    }

    const payload = {
      message: `admin: upload product image ${fileName}`,
      content: base64Content,
    };
    if (sha) {
      payload.sha = sha;
    }

    const putRes = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const putData = await putRes.json();
    console.log(`✅ [Upload API] GitHub PUT status: ${putRes.status}`, putData?.commit?.html_url || putData?.message);
    return { success: putRes.ok, status: putRes.status, data: putData };
  } catch (err) {
    console.error('❌ [Upload API] GitHub image commit error:', err);
    return { success: false, error: err.message };
  }
}

export default async function handler(req, res) {
  console.log(`\n📥 [Upload API] Received ${req.method} request`);

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  if (!verifyAdminAuth(req)) {
    console.warn('⛔ [Upload API] Unauthorized access attempt');
    return res.status(401).json({ message: 'Необхідна авторизація адміністратора' });
  }

  try {
    const { code, fileBase64, filename } = req.body || {};

    if (!fileBase64) {
      return res.status(400).json({ message: 'Файл зображення не надано' });
    }

    const cleanCode = code ? String(code).trim() : Date.now().toString();
    const base64Data = fileBase64.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const sizeKb = Math.round(buffer.length / 1024);

    const prodFileName = `prod_${cleanCode}.webp`;
    const targetDir = path.join(process.cwd(), 'public', 'images', 'products');
    const prodFilePath = path.join(targetDir, prodFileName);

    console.log(`📦 [Upload API] Processing image for product code "${cleanCode}":`, {
      filename,
      prodFileName,
      size: `${sizeKb} KB`,
      isVercel: Boolean(process.env.VERCEL || process.env.VERCEL_ENV),
    });

    let localWriteSuccess = false;
    let localWriteError = null;

    try {
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      fs.writeFileSync(prodFilePath, buffer);
      localWriteSuccess = true;
      console.log(`💾 [Upload API] Successfully wrote local file: ${prodFilePath}`);
    } catch (fsErr) {
      localWriteError = fsErr.message;
      console.warn('⚠️ [Upload API] Local FS write skipped/failed (expected on Vercel):', fsErr.message);
    }

    // Commit the image file to GitHub
    const githubResult = await commitImageToGitHub(prodFileName, base64Data);

    const relativeUrl = `/images/products/${prodFileName}`;
    console.log(`🎯 [Upload API] Responding with url: ${relativeUrl}`);

    return res.status(200).json({
      success: true,
      url: relativeUrl,
      debug: {
        cleanCode,
        prodFileName,
        sizeKb,
        localWrite: { success: localWriteSuccess, error: localWriteError },
        github: githubResult,
        hasGithubToken: Boolean(process.env.GITHUB_TOKEN),
        environment: process.env.VERCEL ? 'Vercel' : 'Local / Custom Server',
      },
    });
  } catch (err) {
    console.error('❌ [Upload API] Fatal error:', err);
    return res.status(500).json({ message: 'Помилка завантаження зображення', error: err.message });
  }
}
