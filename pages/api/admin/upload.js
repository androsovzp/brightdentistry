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
  if (!token || !repo) return;

  try {
    const url = `https://api.github.com/repos/${repo}/contents/public/images/products/${fileName}`;

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
      }
    } catch (e) {
      // file might not exist yet
    }

    const payload = {
      message: `admin: upload product image ${fileName}`,
      content: base64Content,
    };
    if (sha) {
      payload.sha = sha;
    }

    await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error('GitHub image commit error:', err);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  if (!verifyAdminAuth(req)) {
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

    const targetDir = path.join(process.cwd(), 'public', 'images', 'products');
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Generate unique timestamped filename to prevent browser and CDN caching issues
    const timestamp = Date.now();
    const prodFileName = `prod_${cleanCode}_${timestamp}.webp`;
    const prodFilePath = path.join(targetDir, prodFileName);

    // Clean up older local image files for this product code
    try {
      if (fs.existsSync(targetDir)) {
        const files = fs.readdirSync(targetDir);
        for (const file of files) {
          if (
            (file.startsWith(`prod_${cleanCode}_`) && file.endsWith('.webp') && file !== prodFileName) ||
            file === `prod_${cleanCode}.webp`
          ) {
            try {
              fs.unlinkSync(path.join(targetDir, file));
            } catch (e) {
              // ignore deletion error
            }
          }
        }
      }
    } catch (cleanErr) {
      // ignore
    }

    try {
      fs.writeFileSync(prodFilePath, buffer);
    } catch (fsErr) {
      console.warn('Local FS write error (read-only filesystem on Vercel):', fsErr);
    }

    // Commit to GitHub repository if credentials are configured
    await commitImageToGitHub(prodFileName, base64Data);

    const relativeUrl = `/images/products/${prodFileName}`;
    return res.status(200).json({ success: true, url: relativeUrl });
  } catch (err) {
    console.error('Upload API error:', err);
    return res.status(500).json({ message: 'Помилка завантаження зображення' });
  }
}
