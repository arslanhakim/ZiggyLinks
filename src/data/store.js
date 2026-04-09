// ZiggyLinks — Sales & Inventory Store
// Uses localStorage for persistence. Replace with Supabase/Firebase when ready.

const SALES_KEY = 'ziggylinks_sales';
const STOCK_KEY = 'ziggylinks_stock';

import { products as defaultProducts } from './products';

// ---------- STOCK ----------

export function getStock() {
  try {
    const saved = localStorage.getItem(STOCK_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  // Initialize from default products
  const stock = {};
  defaultProducts.forEach(p => { stock[p.id] = p.stock; });
  saveStock(stock);
  return stock;
}

export function saveStock(stock) {
  localStorage.setItem(STOCK_KEY, JSON.stringify(stock));
}

export function updateStockItem(productId, newQty) {
  const stock = getStock();
  stock[productId] = Math.max(0, newQty);
  saveStock(stock);
  return stock;
}

export function decrementStock(productId, qty = 1) {
  const stock = getStock();
  stock[productId] = Math.max(0, (stock[productId] || 0) - qty);
  saveStock(stock);
  return stock[productId];
}

export function resetStock() {
  const stock = {};
  defaultProducts.forEach(p => { stock[p.id] = p.stock; });
  saveStock(stock);
  return stock;
}

// ---------- SALES ----------

export function getSales() {
  try {
    const saved = localStorage.getItem(SALES_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return [];
}

export function saveSale(saleData) {
  const sales = getSales();
  const newSale = {
    id: `S${Date.now()}`,
    timestamp: new Date().toISOString(),
    ...saleData,
  };
  sales.unshift(newSale); // newest first
  localStorage.setItem(SALES_KEY, JSON.stringify(sales));

  // Reduce stock for each item
  newSale.items.forEach(item => {
    decrementStock(item.productId, item.qty);
  });

  return newSale;
}

export function clearAllSales() {
  localStorage.removeItem(SALES_KEY);
}

// ---------- ANALYTICS ----------

export function getDailySalesTotal(dateStr) {
  // dateStr: 'YYYY-MM-DD'
  const sales = getSales();
  return sales
    .filter(s => s.timestamp.startsWith(dateStr))
    .reduce((sum, s) => sum + s.total, 0);
}

export function getTodayTotal() {
  const today = new Date().toISOString().split('T')[0];
  return getDailySalesTotal(today);
}

export function getMonthlySalesTotal() {
  const prefix = new Date().toISOString().slice(0, 7); // 'YYYY-MM'
  const sales = getSales();
  return sales
    .filter(s => s.timestamp.startsWith(prefix))
    .reduce((sum, s) => sum + s.total, 0);
}

export function getSalesCount() {
  return getSales().length;
}

export function getTopProducts(limit = 5) {
  const sales = getSales();
  const counts = {};
  sales.forEach(sale => {
    sale.items.forEach(item => {
      counts[item.productId] = (counts[item.productId] || 0) + item.qty;
    });
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([productId, qty]) => ({ productId, qty }));
}
