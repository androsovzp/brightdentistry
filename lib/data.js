import productsData from '@/public/data/products.json';
import categoriesData from '@/public/data/categories.json';

export function getProducts() {
  return productsData;
}

export function getCategories() {
  return categoriesData;
}

export function getProductById(id) {
  return productsData.find((p) => p.id === id);
}

export function getProductsByCategory(categoryName) {
  if (!categoryName || categoryName === 'Всі') return productsData;
  return productsData.filter(
    (p) => p.category.toLowerCase() === categoryName.toLowerCase()
  );
}

const BRAND_SYNONYMS = {
  'курапрокс': 'curaprox',
  'біорепаір': 'biorepair',
  'біорепайр': 'biorepair',
  'біорепейр': 'biorepair',
  'биорепаир': 'biorepair',
  'вітіс': 'vitis',
  'витис': 'vitis',
  'песітро': 'pesitro',
  'песитро': 'pesitro',
  'браш': 'brush',
  'бебі': 'baby',
  'брашбебі': 'brush-baby',
  'тус мус': 'tooth mousse',
  'туз мус': 'tooth mousse',
  'тутмус': 'tooth mousse',
  'тусмус': 'tooth mousse',
  'гельдіс': 'geldis',
  'гельдис': 'geldis',
  'гум': 'gum',
  'гам': 'gum',
  'тепе': 'tepe',
  'орал': 'oral',
  'медіка': 'medica',
  'медика': 'medica',
  'флюораід': 'fluor-aid',
};

export function searchProducts(query) {
  if (!query || !query.trim()) return productsData;
  
  let q = query.toLowerCase().trim();

  // Transliterate brand synonyms
  Object.keys(BRAND_SYNONYMS).forEach((syn) => {
    if (q.includes(syn)) {
      q = q.replace(syn, BRAND_SYNONYMS[syn]);
    }
  });

  const qDigits = q.replace(/\D/g, '');
  const qNumClean = qDigits ? qDigits.replace(/^0+/, '') : '';

  return productsData.filter((p) => {
    const title = p.title.toLowerCase();
    const code = p.code.toLowerCase();
    const category = p.category.toLowerCase();
    const desc = (p.description || '').toLowerCase();

    // Padded code variations (0010, 0025, 000079 etc.)
    const codePadded2 = code.padStart(2, '0');
    const codePadded3 = code.padStart(3, '0');
    const codePadded4 = code.padStart(4, '0');
    const codePadded6 = code.padStart(6, '0');

    // Title / Category / Description matches
    if (title.includes(q) || category.includes(q) || desc.includes(q)) {
      return true;
    }

    // Direct Code matches
    if (code === q || code.includes(q)) {
      return true;
    }

    // Padded Code matches
    if (
      codePadded2.includes(q) ||
      codePadded3.includes(q) ||
      codePadded4.includes(q) ||
      codePadded6.includes(q)
    ) {
      return true;
    }

    // Clean number match (without leading zeros)
    if (qNumClean && (code === qNumClean || code.includes(qNumClean))) {
      return true;
    }

    return false;
  });
}

