import fs from 'fs';
import path from 'path';
import { verifyAdminAuth } from '@/lib/adminAuth';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '35mb',
    },
  },
};

async function commitImageToGitHub(fileName, base64Content, retries = 3) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPOSITORY || 'androsovzp/brightdentistry';
  if (!token) {
    console.warn('⚠️ [Upload API] GITHUB_TOKEN is not set in environment variables. Image cannot be pushed to GitHub.');
    return { success: false, reason: 'GITHUB_TOKEN not configured' };
  }

  const filePath = `public/images/products/${fileName}`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const getUrl = `https://api.github.com/repos/${repo}/contents/${filePath}?ref=main&t=${Date.now()}`;

      let sha;
      try {
        const getRes = await fetch(getUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3+json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
          },
          cache: 'no-store',
        });
        if (getRes.ok) {
          const fileData = await getRes.json();
          sha = fileData?.sha;
        }
      } catch (e) {
        // File might not exist yet
      }

      const putUrl = `https://api.github.com/repos/${repo}/contents/${filePath}`;
      const payload = {
        message: `admin: upload product image ${fileName}`,
        content: base64Content,
      };
      if (sha) {
        payload.sha = sha;
      }

      const putRes = await fetch(putUrl, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const putData = await putRes.json();

      if (putRes.ok) {
        console.log(`✅ [Upload API] GitHub image commit success on attempt ${attempt} for ${fileName} (Status: ${putRes.status})`);
        return { success: true, status: putRes.status, data: putData, attempt };
      }

      // Handle 409 Conflict with auto-retry
      if (putRes.status === 409 && attempt < retries) {
        console.warn(`⚠️ [Upload API] 409 Conflict on attempt ${attempt} for ${fileName}. Retrying with fresh SHA...`);
        await new Promise((r) => setTimeout(r, 350 * attempt));
        continue;
      }

      console.error(`❌ [Upload API] GitHub image commit returned error ${putRes.status} for ${fileName}:`, putData);
      return { success: false, status: putRes.status, error: putData.message };
    } catch (err) {
      console.error(`❌ [Upload API] GitHub image commit exception on attempt ${attempt} for ${fileName}:`, err);
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, 350 * attempt));
      } else {
        return { success: false, error: err.message };
      }
    }
  }

  return { success: false, reason: 'Max retries exceeded' };
}

async function processSingleImage(cleanCode, fileBase64, filename, suffix = null) {
  const base64Data = fileBase64.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  const sizeKb = Math.round(buffer.length / 1024);

  const timestamp = Date.now();
  const fileSuffix = suffix !== null && suffix !== undefined ? `_${suffix}` : `_${timestamp}`;
  const prodFileName = `prod_${cleanCode}${fileSuffix}.webp`;
  const targetDir = path.join(process.cwd(), 'public', 'images', 'products');
  const prodFilePath = path.join(targetDir, prodFileName);

  console.log(`📦 [Upload API] Processing image for product code "${cleanCode}":`, {
    filename,
    prodFileName,
    size: `${sizeKb} KB`,
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

  return {
    url: relativeUrl,
    fileName: prodFileName,
    sizeKb,
    localWrite: { success: localWriteSuccess, error: localWriteError },
    github: githubResult,
  };
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
    const { code, fileBase64, filename, suffix, files } = req.body || {};
    const cleanCode = code ? String(code).trim() : Date.now().toString();

    // 1. Batch upload mode
    if (Array.isArray(files) && files.length > 0) {
      console.log(`📦 [Upload API] Batch uploading ${files.length} images for product "${cleanCode}"...`);
      const results = [];
      const timestamp = Date.now();

      for (let i = 0; i < files.length; i++) {
        const item = files[i];
        if (!item || !item.fileBase64) continue;
        const itemSuffix = item.suffix !== undefined ? item.suffix : `${timestamp}_${i}`;
        const result = await processSingleImage(cleanCode, item.fileBase64, item.filename, itemSuffix);
        results.push(result);
      }

      const urls = results.map((r) => r.url);
      console.log(`🎯 [Upload API] Batch uploaded ${urls.length} images:`, urls);

      return res.status(200).json({
        success: true,
        urls,
        url: urls[0] || '',
        results,
        debug: {
          cleanCode,
          count: urls.length,
          hasGithubToken: Boolean(process.env.GITHUB_TOKEN),
          environment: process.env.VERCEL ? 'Vercel' : 'Local / Custom Server',
        },
      });
    }

    // 2. Single upload mode
    if (!fileBase64) {
      return res.status(400).json({ message: 'Файл зображення не надано' });
    }

    const result = await processSingleImage(cleanCode, fileBase64, filename, suffix);
    console.log(`🎯 [Upload API] Single image uploaded: ${result.url}`);

    return res.status(200).json({
      success: true,
      url: result.url,
      urls: [result.url],
      debug: {
        cleanCode,
        result,
        hasGithubToken: Boolean(process.env.GITHUB_TOKEN),
        environment: process.env.VERCEL ? 'Vercel' : 'Local / Custom Server',
      },
    });
  } catch (err) {
    console.error('❌ [Upload API] Fatal error:', err);
    return res.status(500).json({ message: 'Помилка завантаження зображення', error: err.message });
  }
}
