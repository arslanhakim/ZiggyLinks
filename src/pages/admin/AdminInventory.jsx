import { useState, useEffect } from 'react';
import StudioLayout from '../../components/layout/StudioLayout';
import { products, CATEGORIES, MATERIALS } from '../../data/products';
import { getStock, updateStockItem, resetStock } from '../../data/store';
import './AdminInventory.css';

export default function AdminInventory() {
  const [stock, setStock] = useState({});
  const [editing, setEditing] = useState(null);
  const [editVal, setEditVal] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [saved, setSaved] = useState(null);

  useEffect(() => {
    setStock(getStock());
  }, []);

  const filtered = products.filter(p =>
    filterCat === 'all' || p.category === filterCat
  );

  const startEdit = (productId, currentQty) => {
    setEditing(productId);
    setEditVal(String(currentQty));
  };

  const saveEdit = (productId) => {
    const qty = parseInt(editVal, 10);
    if (isNaN(qty) || qty < 0) return;
    const updated = updateStockItem(productId, qty);
    setStock(prev => ({ ...prev, [productId]: updated[productId] ?? qty }));
    setEditing(null);
    setSaved(productId);
    setTimeout(() => setSaved(null), 1500);
  };

  const handleReset = () => {
    if (window.confirm('Reset all stock to default values?')) {
      const s = resetStock();
      setStock(s);
    }
  };

  const getStockStatus = (qty) => {
    if (qty === 0) return 'out';
    if (qty <= 3) return 'low';
    return 'ok';
  };

  const totalItems = Object.values(stock).reduce((a, b) => a + b, 0);
  const outCount = products.filter(p => (stock[p.id] ?? 0) === 0).length;
  const lowCount = products.filter(p => { const q = stock[p.id] ?? 0; return q > 0 && q <= 3; }).length;

  return (
    <StudioLayout mode="admin">
      <div className="inv-shell">
        <div className="admin-page-header">
          <div>
            <h2 className="admin-page-title">Inventory</h2>
            <p className="t-small" style={{ color: 'var(--warm-grey)' }}>
              {totalItems} units across {products.length} pieces
            </p>
          </div>
          <div className="inv-header-actions">
            <button className="btn btn--ghost" onClick={handleReset}>Reset to Defaults</button>
          </div>
        </div>

        {/* Summary bar */}
        <div className="inv-summary-bar">
          <div className="inv-summary-item">
            <span className="t-label">Total Pieces</span>
            <span className="inv-summary-val">{products.length}</span>
          </div>
          <div className="inv-summary-item">
            <span className="t-label">Total Units</span>
            <span className="inv-summary-val">{totalItems}</span>
          </div>
          <div className="inv-summary-item">
            <span className="t-label">Low Stock</span>
            <span className={`inv-summary-val ${lowCount > 0 ? 'inv-summary-val--warn' : ''}`}>{lowCount}</span>
          </div>
          <div className="inv-summary-item">
            <span className="t-label">Out of Stock</span>
            <span className={`inv-summary-val ${outCount > 0 ? 'inv-summary-val--alert' : ''}`}>{outCount}</span>
          </div>
        </div>

        {/* Category filter */}
        <div className="inv-filters">
          <button
            className={`filter-pill ${filterCat === 'all' ? 'filter-pill--active' : ''}`}
            onClick={() => setFilterCat('all')}
          >All</button>
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              className={`filter-pill ${filterCat === c.id ? 'filter-pill--active' : ''}`}
              onClick={() => setFilterCat(c.id)}
            >{c.label}</button>
          ))}
        </div>

        {/* Inventory table */}
        <div className="inv-table-wrap">
          <table className="inv-table">
            <thead>
              <tr>
                <th className="t-label">Piece</th>
                <th className="t-label">Category</th>
                <th className="t-label">Material</th>
                <th className="t-label">Price</th>
                <th className="t-label">Status</th>
                <th className="t-label">Stock</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(product => {
                const qty = stock[product.id] ?? 0;
                const status = getStockStatus(qty);
                const isEditing = editing === product.id;
                const wasSaved = saved === product.id;
                const matLabel = MATERIALS.find(m => m.id === product.material)?.label || product.material;

                return (
                  <tr key={product.id} className={`inv-row inv-row--${status}`}>
                    <td className="inv-cell inv-cell--name">
                      <p className="inv-product-name">{product.name}</p>
                      <p className="t-small inv-product-slug">{product.slug}</p>
                    </td>
                    <td className="inv-cell">
                      <span className="inv-cat-tag">
                        {product.category}
                      </span>
                    </td>
                    <td className="inv-cell inv-cell--mat t-small">{matLabel}</td>
                    <td className="inv-cell inv-cell--price">
                      <span className="inv-price">GHS {product.price.toLocaleString()}</span>
                    </td>
                    <td className="inv-cell">
                      {status === 'out' && <span className="badge badge--out">Out</span>}
                      {status === 'low' && <span className="badge badge--low">Low</span>}
                      {status === 'ok' && <span className="badge badge--available">In Stock</span>}
                    </td>
                    <td className="inv-cell inv-cell--stock">
                      {isEditing ? (
                        <div className="inv-edit-row">
                          <input
                            className="inv-qty-input"
                            type="number"
                            min="0"
                            value={editVal}
                            onChange={e => setEditVal(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') saveEdit(product.id); if (e.key === 'Escape') setEditing(null); }}
                            autoFocus
                          />
                          <button className="inv-save-btn" onClick={() => saveEdit(product.id)}>✓</button>
                          <button className="inv-cancel-btn" onClick={() => setEditing(null)}>✕</button>
                        </div>
                      ) : (
                        <span className={`inv-qty-display ${status === 'out' ? 'inv-qty--out' : ''} ${status === 'low' ? 'inv-qty--low' : ''}`}>
                          {qty}
                          {wasSaved && <span className="inv-saved-flash"> ✓</span>}
                        </span>
                      )}
                    </td>
                    <td className="inv-cell inv-cell--action">
                      {!isEditing && (
                        <button
                          className="inv-edit-btn"
                          onClick={() => startEdit(product.id, qty)}
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </StudioLayout>
  );
}
