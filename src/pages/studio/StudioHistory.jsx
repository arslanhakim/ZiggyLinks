import { useState, useEffect } from 'react';
import StudioLayout from '../../components/layout/StudioLayout';
import { getSales, getTodayTotal, clearAllSales } from '../../data/store';
import './StudioHistory.css';

export default function StudioHistory() {
  const [sales, setSales] = useState([]);
  const [todayTotal, setTodayTotal] = useState(0);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    setSales(getSales());
    setTodayTotal(getTodayTotal());
  }, []);

  const handleClear = () => {
    if (window.confirm('Clear all sales history? This cannot be undone.')) {
      clearAllSales();
      setSales([]);
      setTodayTotal(0);
    }
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const formatTime = (iso) => {
    const d = new Date(iso);
    return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  const today = new Date().toISOString().split('T')[0];
  const todaySales = sales.filter(s => s.timestamp.startsWith(today));
  const olderSales = sales.filter(s => !s.timestamp.startsWith(today));

  return (
    <StudioLayout mode="studio">
      <div className="history-shell">
        <div className="history-header">
          <div>
            <h2 className="history-title">Sales History</h2>
            <p className="history-sub t-small">{sales.length} total sale{sales.length !== 1 ? 's' : ''} recorded</p>
          </div>
          <div className="history-today-stat">
            <p className="t-label">Today's Total</p>
            <p className="history-today-amount">GHS {todayTotal.toLocaleString()}</p>
            <p className="t-small" style={{ color: 'var(--mid-grey)' }}>{todaySales.length} sale{todaySales.length !== 1 ? 's' : ''}</p>
          </div>
        </div>

        {sales.length === 0 ? (
          <div className="history-empty">
            <p className="t-subtitle">No sales recorded yet.</p>
            <p className="t-small">Sales made in the Studio tab will appear here.</p>
          </div>
        ) : (
          <div className="history-content">
            {todaySales.length > 0 && (
              <div className="history-group">
                <p className="history-group-label t-label">Today</p>
                {todaySales.map(sale => (
                  <SaleRow key={sale.id} sale={sale} expanded={expanded === sale.id} onToggle={() => setExpanded(expanded === sale.id ? null : sale.id)} formatDate={formatDate} formatTime={formatTime} />
                ))}
              </div>
            )}
            {olderSales.length > 0 && (
              <div className="history-group">
                <p className="history-group-label t-label">Previous Sales</p>
                {olderSales.map(sale => (
                  <SaleRow key={sale.id} sale={sale} expanded={expanded === sale.id} onToggle={() => setExpanded(expanded === sale.id ? null : sale.id)} formatDate={formatDate} formatTime={formatTime} />
                ))}
              </div>
            )}
          </div>
        )}

        {sales.length > 0 && (
          <div className="history-footer">
            <button className="btn btn--ghost" onClick={handleClear}>Clear All History</button>
          </div>
        )}
      </div>
    </StudioLayout>
  );
}

function SaleRow({ sale, expanded, onToggle, formatDate, formatTime }) {
  return (
    <div className={`sale-row ${expanded ? 'sale-row--expanded' : ''}`}>
      <button className="sale-row__header" onClick={onToggle}>
        <div className="sale-row__main">
          <span className="sale-row__id t-small">{sale.id}</span>
          <span className="sale-row__customer">{sale.customerName || 'Walk-in'}</span>
          <span className="sale-row__items t-small">{sale.items.length} item{sale.items.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="sale-row__right">
          <span className="sale-row__date t-small">{formatDate(sale.timestamp)} · {formatTime(sale.timestamp)}</span>
          <span className="sale-row__total">GHS {sale.total.toLocaleString()}</span>
          <span className="sale-row__chevron">{expanded ? '▲' : '▼'}</span>
        </div>
      </button>
      {expanded && (
        <div className="sale-row__detail">
          {sale.items.map(item => (
            <div key={item.productId} className="sale-detail-item">
              <span className="t-small">{item.name} × {item.qty}</span>
              <span className="t-small">GHS {(item.price * item.qty).toLocaleString()}</span>
            </div>
          ))}
          {sale.customerNote && (
            <p className="sale-detail-note t-small">Note: {sale.customerNote}</p>
          )}
        </div>
      )}
    </div>
  );
}
