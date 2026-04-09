import { useState } from 'react';
import StudioLayout from '../../components/layout/StudioLayout';
import { resetStock, clearAllSales } from '../../data/store';
import './AdminSettings.css';

export default function AdminSettings() {
  const [saved, setSaved] = useState(false);
  const [studioName, setStudioName] = useState(
    localStorage.getItem('zl_studio_name') || 'ZiggyLinks Studio'
  );
  const [currency, setCurrency] = useState(
    localStorage.getItem('zl_currency') || 'GHS'
  );
  const [lowThreshold, setLowThreshold] = useState(
    localStorage.getItem('zl_low_threshold') || '3'
  );

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('zl_studio_name', studioName);
    localStorage.setItem('zl_currency', currency);
    localStorage.setItem('zl_low_threshold', lowThreshold);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleResetStock = () => {
    if (window.confirm('Reset all stock levels to default values from product data?')) {
      resetStock();
      alert('Stock levels have been reset.');
    }
  };

  const handleClearSales = () => {
    if (window.confirm('Delete ALL sales history permanently? This cannot be undone.')) {
      clearAllSales();
      alert('All sales history cleared.');
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Clear ALL app data (stock + sales)? This cannot be undone.')) {
      localStorage.removeItem('ziggylinks_sales');
      localStorage.removeItem('ziggylinks_stock');
      alert('All data cleared. Refresh the page to reinitialise.');
    }
  };

  return (
    <StudioLayout mode="admin">
      <div className="settings-shell">
        <div className="admin-page-header">
          <h2 className="admin-page-title">Settings</h2>
        </div>

        <div className="settings-body">
          {/* General Settings */}
          <div className="settings-section">
            <h3 className="settings-section-title">General</h3>
            <form className="settings-form" onSubmit={handleSave}>
              <div className="settings-field">
                <label className="t-label settings-label">Studio Name</label>
                <input
                  className="input settings-input"
                  type="text"
                  value={studioName}
                  onChange={e => setStudioName(e.target.value)}
                />
                <p className="settings-hint t-small">Appears on receipts and internal headers.</p>
              </div>
              <div className="settings-field">
                <label className="t-label settings-label">Currency Symbol</label>
                <input
                  className="input settings-input"
                  type="text"
                  value={currency}
                  onChange={e => setCurrency(e.target.value)}
                  maxLength={5}
                  style={{ maxWidth: '120px' }}
                />
              </div>
              <div className="settings-field">
                <label className="t-label settings-label">Low Stock Alert Threshold</label>
                <input
                  className="input settings-input"
                  type="number"
                  min="1"
                  max="20"
                  value={lowThreshold}
                  onChange={e => setLowThreshold(e.target.value)}
                  style={{ maxWidth: '120px' }}
                />
                <p className="settings-hint t-small">Items at or below this quantity will show a low-stock warning.</p>
              </div>
              <div className="settings-save-row">
                <button className="btn btn--primary" type="submit">Save Changes</button>
                {saved && <span className="settings-saved t-small">✓ Saved</span>}
              </div>
            </form>
          </div>

          {/* Data Management */}
          <div className="settings-section settings-section--danger">
            <h3 className="settings-section-title">Data Management</h3>
            <p className="t-body settings-section-desc">
              These actions affect stored data. Use with care. All data is saved in your browser's local storage. When you're ready to connect a real backend (Supabase, Firebase, etc.), replace the functions in <code>src/data/store.js</code>.
            </p>
            <div className="settings-danger-actions">
              <div className="settings-danger-item">
                <div>
                  <p className="settings-danger-title">Reset Stock Levels</p>
                  <p className="t-small settings-danger-desc">Restores all stock to the default values in product data. Existing sales history is unaffected.</p>
                </div>
                <button className="btn btn--ghost" onClick={handleResetStock}>Reset Stock</button>
              </div>
              <div className="settings-danger-item">
                <div>
                  <p className="settings-danger-title">Clear Sales History</p>
                  <p className="t-small settings-danger-desc">Permanently deletes all recorded sales. Stock levels are unaffected.</p>
                </div>
                <button className="btn btn--ghost" onClick={handleClearSales}>Clear Sales</button>
              </div>
              <div className="settings-danger-item settings-danger-item--critical">
                <div>
                  <p className="settings-danger-title">Clear All App Data</p>
                  <p className="t-small settings-danger-desc">Deletes all stock overrides and sales history. The app will reinitialise from defaults on next load.</p>
                </div>
                <button className="btn btn--ghost settings-btn-critical" onClick={handleClearAll}>Clear Everything</button>
              </div>
            </div>
          </div>

          {/* Backend Note */}
          <div className="settings-section settings-section--info">
            <h3 className="settings-section-title">Connect a Backend</h3>
            <p className="t-body">
              This app currently stores all data in browser <code>localStorage</code>. To connect Supabase or Firebase:
            </p>
            <ol className="settings-steps">
              <li>Create your database tables: <code>products</code>, <code>stock</code>, <code>sales</code></li>
              <li>Replace functions in <code>src/data/store.js</code> with async fetch/write calls</li>
              <li>Replace product data in <code>src/data/products.js</code> with a fetch from your DB</li>
              <li>Add your API keys to a <code>.env</code> file (never commit these)</li>
            </ol>
            <p className="t-small" style={{ color: 'var(--mid-grey)', marginTop: '1rem' }}>
              All function signatures are already async-ready — just swap the implementations.
            </p>
          </div>
        </div>
      </div>
    </StudioLayout>
  );
}
