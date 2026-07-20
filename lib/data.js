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

export function searchProducts(query) {
  if (!query) return productsData;
  const q = query.toLowerCase().trim();
  return productsData.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.code.includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q))
  );
}
