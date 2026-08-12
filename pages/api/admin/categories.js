import fs from 'fs';
import path from 'path';
import { verifyAdminAuth } from '@/lib/adminAuth';

const CATEGORIES_FILE_ROOT = path.join(process.cwd(), 'categories.json');
const CATEGORIES_FILE_PUBLIC = path.join(process.cwd(), 'public', 'data', 'categories.json');

function readCategories() {
  try {
    const raw = fs.readFileSync(CATEGORIES_FILE_PUBLIC, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

function writeCategories(categories) {
  const jsonStr = JSON.stringify(categories, null, 2);
  try {
    fs.writeFileSync(CATEGORIES_FILE_ROOT, jsonStr, 'utf8');
  } catch (e) {}
  try {
    fs.writeFileSync(CATEGORIES_FILE_PUBLIC, jsonStr, 'utf8');
  } catch (e) {}
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(readCategories());
  }

  if (!verifyAdminAuth(req)) {
    return res.status(401).json({ message: 'Необхідна авторизація адміністратора' });
  }

  if (req.method === 'POST' || req.method === 'PUT') {
    const categories = req.body;
    if (!Array.isArray(categories)) {
      return res.status(400).json({ message: 'Очікується масив категорій' });
    }

    writeCategories(categories);
    return res.status(200).json({ success: true, categories });
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
