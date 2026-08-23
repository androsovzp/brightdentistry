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

function readLocalProducts() {
  try {
    const raw = fs.readFileSync(PRODUCTS_FILE_PUBLIC, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('⚠️ [Products API] Error reading local products.json:', err.message);
    try {
      const rawRoot = fs.readFileSync(PRODUCTS_FILE_ROOT, 'utf8');
      return JSON.parse(rawRoot);
    } catch (e) {
      return [];
    }
  }
}

function writeLocalProducts(products) {
  const jsonStr = JSON.stringify(products, null, 2);
  try {
    fs.writeFileSync(PRODUCTS_FILE_ROOT, jsonStr, 'utf8');
  } catch (e) {
    // Read-only on Vercel
  }
  try {
    fs.writeFileSync(PRODUCTS_FILE_PUBLIC, jsonStr, 'utf8');
  } catch (e) {
    // Read-only on Vercel
  }
}

async function getLiveProducts() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPOSITORY || 'androsovzp/brightdentistry';

  if (token) {
    try {
      const url = `https://api.github.com/repos/${repo}/contents/public/data/products.json?ref=main&t=${Date.now()}`;
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
        },
        cache: 'no-store',
      });

      if (res.ok) {
        const fileData = await res.json();
        if (fileData && fileData.content) {
          const raw = Buffer.from(fileData.content, 'base64').toString('utf8');
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return { products: parsed, sha: fileData.sha, source: 'github-live' };
          }
        }
      } else {
        console.warn(`⚠️ [Products API] GitHub fetch returned ${res.status}:`, await res.text());
      }
    } catch (e) {
      console.warn('⚠️ [Products API] Failed to fetch live products from GitHub, using local fallback:', e.message);
    }
  }

  return { products: readLocalProducts(), sha: null, source: 'local-fs' };
}

async function commitToGitHub(products, currentSha, retries = 3) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPOSITORY || 'androsovzp/brightdentistry';
  if (!token) {
    console.warn('⚠️ [Products API] GITHUB_TOKEN is not configured. Changes saved only locally.');
    return { success: false, reason: 'GITHUB_TOKEN not configured' };
  }

  const content = Buffer.from(JSON.stringify(products, null, 2)).toString('base64');
  const filePath = 'public/data/products.json';

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      let sha = attempt === 1 ? currentSha : null;

      if (!sha) {
        const getUrl = `https://api.github.com/repos/${repo}/contents/${filePath}?ref=main&t=${Date.now()}`;
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
          sha = fileData.sha;
        }
      }

      const putUrl = `https://api.github.com/repos/${repo}/contents/${filePath}`;
      const payload = {
        message: 'admin: update products catalog via Admin Panel',
        content,
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
        console.log(`✅ [Products API] GitHub catalog commit success on attempt ${attempt} (Status: ${putRes.status})`);
        return { success: true, status: putRes.status, data: putData, attempt };
      }

      // Handle 409 Conflict (stale SHA) with auto-retry
      if (putRes.status === 409 && attempt < retries) {
        console.warn(`⚠️ [Products API] 409 Conflict on attempt ${attempt}. Fetching fresh SHA and retrying...`);
        await new Promise((r) => setTimeout(r, 300 * attempt));
        continue;
      }

      console.error(`❌ [Products API] GitHub commit returned error ${putRes.status}:`, putData);
      return { success: false, status: putRes.status, error: putData.message };
    } catch (err) {
      console.error(`❌ [Products API] GitHub commit exception on attempt ${attempt}:`, err.message);
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, 300 * attempt));
      } else {
        return { success: false, error: err.message };
      }
    }
  }

  return { success: false, reason: 'Max retries exceeded' };
}

export default async function handler(req, res) {
  // Public GET access to list products
  if (req.method === 'GET') {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    const { products, source } = await getLiveProducts();
    console.log(`📦 [Products API] GET /api/admin/products served ${products.length} products (Source: ${source})`);
    return res.status(200).json(products);
  }

  // All modification methods require admin authentication
  if (!verifyAdminAuth(req)) {
    return res.status(401).json({ message: 'Необхідна авторизація адміністратора' });
  }

  const { products, sha } = await getLiveProducts();

  if (req.method === 'POST') {
    const { code, title, category, price, description, image, images, inStock } = req.body || {};

    console.log('➕ [Products API POST] Creating new product:', { code, title, category, price });

    if (!code || !title || !category) {
      return res.status(400).json({ message: 'Поля "Код", "Назва" та "Категорія" обов’язкові' });
    }

    const numPrice = Number(price) || 0;
    const cleanCode = String(code).trim();
    const productId = `p_${cleanCode}`;
    
    // Sanitize images array and primary image
    let sanitizedImages = [];
    if (Array.isArray(images) && images.length > 0) {
      sanitizedImages = images
        .filter((img) => typeof img === 'string' && img.trim().length > 0)
        .map((img, idx) => {
          if (img.startsWith('data:image/')) {
            return `/images/products/prod_${cleanCode}_${Date.now()}_${idx}.webp`;
          }
          return img.trim();
        });
    }

    let imagePath = image || (sanitizedImages.length > 0 ? sanitizedImages[0] : `/images/products/prod_${cleanCode}.webp`);
    if (typeof imagePath === 'string' && imagePath.startsWith('data:image/')) {
      imagePath = sanitizedImages[0] || `/images/products/prod_${cleanCode}.webp`;
    }

    if (sanitizedImages.length === 0 && imagePath) {
      sanitizedImages = [imagePath];
    }

    const newProduct = {
      id: productId,
      code: cleanCode,
      title: title.trim(),
      category: category.trim(),
      description: (description || '').trim(),
      price: numPrice,
      priceFormatted: `${numPrice} грн`,
      image: imagePath,
      images: sanitizedImages,
      inStock: inStock !== undefined ? Boolean(inStock) : true,
    };

    // Check if code already exists
    const existingIndex = products.findIndex((p) => p.code === cleanCode || p.id === productId);
    if (existingIndex >= 0) {
      products[existingIndex] = { ...products[existingIndex], ...newProduct };
    } else {
      products.unshift(newProduct);
    }

    writeLocalProducts(products);
    const githubResult = await commitToGitHub(products, sha);

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
    const { id, code, title, category, price, description, image, images, inStock } = req.body || {};

    console.log('✏️ [Products API PUT] Updating product:', { id, code, title, category, price, inStock });

    if (!id && !code) {
      return res.status(400).json({ message: 'Вкажіть ID або Код товару' });
    }

    const index = products.findIndex((p) => p.id === id || p.code === String(code));
    if (index === -1) {
      return res.status(404).json({ message: 'Товар не знайдено' });
    }

    const current = products[index];
    const numPrice = price !== undefined ? Number(price) : current.price;

    // Sanitize images array
    let sanitizedImages = current.images || (current.image ? [current.image] : []);
    if (images !== undefined && Array.isArray(images)) {
      sanitizedImages = images
        .filter((img) => typeof img === 'string' && img.trim().length > 0)
        .map((img, idx) => {
          if (img.startsWith('data:image/')) {
            return `/images/products/prod_${current.code || code}_${Date.now()}_${idx}.webp`;
          }
          return img.trim();
        });
    }

    // Sanitize primary image
    let imagePath = image !== undefined ? image : (sanitizedImages.length > 0 ? sanitizedImages[0] : current.image);
    if (typeof imagePath === 'string' && imagePath.startsWith('data:image/')) {
      imagePath = sanitizedImages[0] || current.image || `/images/products/prod_${current.code || code}.webp`;
    }

    if (sanitizedImages.length === 0 && imagePath) {
      sanitizedImages = [imagePath];
    }

    const updatedProduct = {
      ...current,
      title: title !== undefined ? title.trim() : current.title,
      category: category !== undefined ? category.trim() : current.category,
      description: description !== undefined ? description.trim() : current.description,
      price: numPrice,
      priceFormatted: `${numPrice} грн`,
      image: imagePath,
      images: sanitizedImages,
      inStock: inStock !== undefined ? Boolean(inStock) : current.inStock,
    };

    products[index] = updatedProduct;
    writeLocalProducts(products);
    const githubResult = await commitToGitHub(products, sha);

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
    console.log('🗑️ [Products API DELETE] Deleting product:', { id, code });

    if (!id && !code) {
      return res.status(400).json({ message: 'Потрібно вказати ID або Код для видалення' });
    }

    const initialLen = products.length;
    const filtered = products.filter((p) => p.id !== id && p.code !== String(code));

    if (filtered.length === initialLen) {
      return res.status(404).json({ message: 'Товар не знайдено' });
    }

    writeLocalProducts(filtered);
    await commitToGitHub(filtered, sha);

    return res.status(200).json({ success: true, message: 'Товар видалено' });
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
