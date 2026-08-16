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

    const prodFileName = `prod_${cleanCode}.webp`;
    const prodFilePath = path.join(targetDir, prodFileName);

    try {
      fs.writeFileSync(prodFilePath, buffer);
    } catch (fsErr) {
      console.warn('Local FS write error (read-only filesystem on Vercel):', fsErr);
    }

    const relativeUrl = `/images/products/${prodFileName}`;
    return res.status(200).json({ success: true, url: relativeUrl });
  } catch (err) {
    console.error('Upload API error:', err);
    return res.status(500).json({ message: 'Помилка завантаження зображення' });
  }
}
