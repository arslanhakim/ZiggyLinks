import { useState, useEffect } from 'react';
import StudioLayout from '../../components/layout/StudioLayout';
import { getSales, getMonthlySalesTotal, getTodayTotal, clearAllSales } from '../../data/store';
import './AdminSales.css';

function groupByDate(sales) {
  const groups = {};
  sales.forEach(sale => {
    const d = sale.timestamp.split('T')[0];
    if (!groups[d]) groups[d] = [];
    groups[d].push(sale);
  });
  return groups;
}

export default function AdminSales() {
  const [sales, setSales] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    setSales(getSales());
  }, []);

  const fmtDate = (iso) => new Date(iso).toLocaleDateString('en-GB', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  const fmtDateShort = (dateStr) => new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
  const fmtTime = (iso) => new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  const grouped = groupByDate(sales);
  const dateKeys = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);
  const avgSale = sales.length ? Math.round(totalRevenue / sales.length) : 0;
  const todayTotal = getTodayTotal();
  const monthlyTotal = getMonthlySalesTotal();

  const handleClear = () => {
    if (window.confirm('Delete all sales records permanently?')) {
      clearAllSales();
      setSales([]);
    }
  };

  return (
    <StudioLayout mode="admin">
      <div className="admin-sales-shell">
        <div className="admin-page-header">
          <div>
            <h2 className="admin-page-title">Sales Report</h2>
            <p className="t-small" style={{ color: 'var(--warm-grey)' }}>
              {sales.length} total transactions recorded
            </p>
          </div>
          <button className="btn btn--ghost" onClick={handleClear}>Clear All</button>
        </div>

        {/* Stat bar */}
        <div className="admin-sales-stat-bar">
          {[
            { label: 'All-Time Revenue', val: `GHS ${totalRevenue.toLocaleString()}` },
            { label: 'This Month', val: `GHS ${monthlyTotal.toLocaleString()}` },
            { label: 'Today', val: `GHS ${todayTotal.toLocaleString()}` },
            { label: 'Avg. Sale Value', val: `GHS ${avgSale.toLocaleString()}` },
            { label: 'Total Sales', val: sales.length },
          ].map(s => (
            <div key={s.label} className="admin-sales-stat">
              <p className="t-label">{s.label}</p>
              <p className="admin-sales-stat-val">{s.val}</p>
            </div>
          ))}
        </div>

        {/* Sales by date */}
        <div className="admin-sales-body">
          {sales.length === 0 ? (
            <div className="admin-sales-empty">
              <p className="t-subtitle">No sales recorded yet.</p>
              <p className="t-small">Head to the Studio tab to make a sale.</p>
            </div>
          ) : (
            dateKeys.map(dateKey => {
              const daySales = grouped[dateKey];
              const dayTotal = daySales.reduce((s, sale) => s + sale.total, 0);
              return (
                <div key={dateKey} className="admin-sales-day">
                  <div className="admin-sales-day-header">
                    <div>
                      <p className="admin-sales-day-title">{fmtDateShort(dateKey)}</p>
                      <p className="t-small admin-sales-day-count">
                        {daySales.length} sale{daySales.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <p className="admin-sales-day-total">GHS {dayTotal.toLocaleString()}</p>
                  </div>

                  <table className="admin-sales-table">
                    <thead>
                      <tr>
                        <th className="t-label">ID</th>
                        <th className="t-label">Time</th>
                        <th className="t-label">Customer</th>
                        <th className="t-label">Items</th>
                        <th className="t-label">Total</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {daySales.map(sale => (
                        <>
                          <tr
                            key={sale.id}
                            className={`admin-sales-row ${expanded === sale.id ? 'admin-sales-row--expanded' : ''}`}
                            onClick={() => setExpanded(expanded === sale.id ? null : sale.id)}
                          >
                            <td className="admin-sales-cell t-small" style={{ color: 'var(--mid-grey)' }}>{sale.id}</td>
                            <td className="admin-sales-cell t-small">{fmtTime(sale.timestamp)}</td>
                            <td className="admin-sales-cell">
                              <span className="admin-sales-customer">{sale.customerName || 'Walk-in'}</span>
                            </td>
                            <td className="admin-sales-cell t-small">{sale.items.length}</td>
                            <td className="admin-sales-cell">
                              <span className="admin-sales-total">GHS {sale.total.toLocaleString()}</span>
                            </td>
                            <td className="admin-sales-cell admin-sales-cell--expand">
                              <span className="admin-expand-icon">{expanded === sale.id ? '▲' : '▼'}</span>
                            </td>
                          </tr>
                          {expanded === sale.id && (
                            <tr className="admin-sales-detail-row" key={`${sale.id}-detail`}>
                              <td colSpan={6} className="admin-sales-detail-cell">
                                <div className="admin-sales-detail">
                                  {sale.items.map(item => (
                                    <div key={item.productId} className="admin-detail-line">
                                      <span className="admin-detail-name">{item.name} × {item.qty}</span>
                                      <span className="admin-detail-price t-small">GHS {(item.price * item.qty).toLocaleString()}</span>
                                    </div>
                                  ))}
                                  {sale.customerNote && (
                                    <p className="admin-detail-note t-small">Note: {sale.customerNote}</p>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })
          )}
        </div>
      </div>
    </StudioLayout>
  );
}
