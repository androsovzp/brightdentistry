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

const PRODUCTS_FILE_ROOT = path.join(process.cwd(), 'products.json');
const PRODUCTS_FILE_PUBLIC = path.join(process.cwd(), 'public', 'data', 'products.json');

function readProducts() {
  try {
    const raw = fs.readFileSync(PRODUCTS_FILE_PUBLIC, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading products:', err);
    return [];
  }
}

function writeProducts(products) {
  const jsonStr = JSON.stringify(products, null, 2);
  try {
    fs.writeFileSync(PRODUCTS_FILE_ROOT, jsonStr, 'utf8');
  } catch (e) {
    // Ignore error if root directory is read-only
  }
  try {
    fs.writeFileSync(PRODUCTS_FILE_PUBLIC, jsonStr, 'utf8');
  } catch (e) {
    console.error('Failed writing public products.json:', e);
  }
}

async function commitToGitHub(products) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPOSITORY || 'androsovzp/brightdentistry';
  if (!token) {
    console.warn('⚠️ [Products API] GITHUB_TOKEN is not configured. Products.json cannot be pushed to GitHub.');
    return { success: false, reason: 'GITHUB_TOKEN not configured' };
  }

  try {
    const content = Buffer.from(JSON.stringify(products, null, 2)).toString('base64');
    const url = `https://api.github.com/repos/${repo}/contents/public/data/products.json`;

    // 1. Get current file sha
    const getRes = await fetch(url, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json' },
    });
    const fileData = await getRes.json();
    const sha = fileData.sha;

    // 2. Put updated file
    const putRes = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'admin: update products catalog via Admin Panel',
        content,
        sha,
      }),
    });
    const putData = await putRes.json();
    console.log(`✅ [Products API] GitHub catalog commit status: ${putRes.status}`);
    return { success: putRes.ok, status: putRes.status, data: putData };
  } catch (err) {
    console.error('❌ [Products API] GitHub commit error:', err);
    return { success: false, error: err.message };
  }
}

export default async function handler(req, res) {
  // Public GET access to list products, or protected write methods
  if (req.method === 'GET') {
    const products = readProducts();
    return res.status(200).json(products);
  }

  // All modification methods require admin authentication
  if (!verifyAdminAuth(req)) {
    return res.status(401).json({ message: 'Необхідна авторизація адміністратора' });
  }

  const products = readProducts();

  if (req.method === 'POST') {
    const { code, title, category, price, description, image, inStock } = req.body || {};

    if (!code || !title || !category) {
      return res.status(400).json({ message: 'Поля "Код", "Назва" та "Категорія" обов’язкові' });
    }

    const numPrice = Number(price) || 0;
    const cleanCode = String(code).trim();
    const productId = `p_${cleanCode}`;
    const imagePath = image || `/images/products/prod_${cleanCode}.webp`;

    const newProduct = {
      id: productId,
      code: cleanCode,
      title: title.trim(),
      category: category.trim(),
      description: (description || '').trim(),
      price: numPrice,
      priceFormatted: `${numPrice} грн`,
      image: imagePath,
      inStock: inStock !== undefined ? Boolean(inStock) : true,
    };

    // Check if code already exists
    const existingIndex = products.findIndex((p) => p.code === cleanCode || p.id === productId);
    if (existingIndex >= 0) {
      products[existingIndex] = { ...products[existingIndex], ...newProduct };
    } else {
      products.unshift(newProduct);
    }

    writeProducts(products);
    const githubResult = await commitToGitHub(products);

    return res.status(200).json({
      success: true,
      product: newProduct,
      debug: {
        github: githubResult,
        hasGithubToken: Boolean(process.env.GITHUB_TOKEN),
      },
    });
  }

  if (req.method === 'PUT') {
    const { id, code, title, category, price, description, image, inStock } = req.body || {};

    if (!id && !code) {
      return res.status(400).json({ message: 'Вкажіть ID або Код товару' });
    }

    const index = products.findIndex((p) => p.id === id || p.code === String(code));
    if (index === -1) {
      return res.status(404).json({ message: 'Товар не знайдено' });
    }

    const current = products[index];
    const numPrice = price !== undefined ? Number(price) : current.price;

    const updatedProduct = {
      ...current,
      title: title !== undefined ? title.trim() : current.title,
      category: category !== undefined ? category.trim() : current.category,
      description: description !== undefined ? description.trim() : current.description,
      price: numPrice,
      priceFormatted: `${numPrice} грн`,
      image: image !== undefined ? image : current.image,
      inStock: inStock !== undefined ? Boolean(inStock) : current.inStock,
    };

    products[index] = updatedProduct;
    writeProducts(products);
    const githubResult = await commitToGitHub(products);

    return res.status(200).json({
      success: true,
      product: updatedProduct,
      debug: {
        github: githubResult,
        hasGithubToken: Boolean(process.env.GITHUB_TOKEN),
      },
    });
  }

  if (req.method === 'DELETE') {
    const { id, code } = req.query;
    if (!id && !code) {
      return res.status(400).json({ message: 'Потрібно вказати ID або Код для видалення' });
    }

    const initialLen = products.length;
    const filtered = products.filter((p) => p.id !== id && p.code !== String(code));

    if (filtered.length === initialLen) {
      return res.status(404).json({ message: 'Товар не знайдено' });
    }

    writeProducts(filtered);
    await commitToGitHub(filtered);

    return res.status(200).json({ success: true, message: 'Товар видалено' });
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
