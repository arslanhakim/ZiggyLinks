import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StudioLayout from '../../components/layout/StudioLayout';
import { getSales, getTodayTotal, getMonthlySalesTotal, getTopProducts } from '../../data/store';
import { getProductById, getLowStockProducts, getOutOfStockProducts } from '../../data/products';
import './AdminOverview.css';

export default function AdminOverview() {
  const [stats, setStats] = useState({
    todayTotal: 0,
    monthlyTotal: 0,
    totalSales: 0,
    lowStock: [],
    outOfStock: [],
    recentSales: [],
    topProducts: [],
  });

  useEffect(() => {
    const sales = getSales();
    setStats({
      todayTotal: getTodayTotal(),
      monthlyTotal: getMonthlySalesTotal(),
      totalSales: sales.length,
      lowStock: getLowStockProducts(),
      outOfStock: getOutOfStockProducts(),
      recentSales: sales.slice(0, 5),
      topProducts: getTopProducts(5),
    });
  }, []);

  const fmtDate = (iso) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  const fmtTime = (iso) => new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  return (
    <StudioLayout mode="admin">
      <div className="admin-shell">
        <div className="admin-page-header">
          <h2 className="admin-page-title">Overview</h2>
          <p className="t-small" style={{ color: 'var(--warm-grey)' }}>
            {new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Stats Row */}
        <div className="admin-stats-row">
          {[
            { label: "Today's Sales", value: `GHS ${stats.todayTotal.toLocaleString()}`, sub: `${stats.recentSales.filter(s => s.timestamp.startsWith(new Date().toISOString().split('T')[0])).length} transactions` },
            { label: 'This Month', value: `GHS ${stats.monthlyTotal.toLocaleString()}`, sub: 'Total revenue' },
            { label: 'All-Time Sales', value: stats.totalSales, sub: 'Total transactions' },
            { label: 'Low Stock Items', value: stats.lowStock.length, sub: 'Pieces to reorder', alert: stats.lowStock.length > 0 },
          ].map(stat => (
            <div key={stat.label} className={`admin-stat-card ${stat.alert ? 'admin-stat-card--alert' : ''}`}>
              <p className="t-label admin-stat-label">{stat.label}</p>
              <p className="admin-stat-value">{stat.value}</p>
              <p className="t-small admin-stat-sub">{stat.sub}</p>
            </div>
          ))}
        </div>

        <div className="admin-content-grid">
          {/* Recent Sales */}
          <div className="admin-panel">
            <div className="admin-panel__head">
              <h3 className="admin-panel-title">Recent Sales</h3>
              <Link to="/admin/sales" className="admin-panel-link t-small">View all →</Link>
            </div>
            {stats.recentSales.length === 0 ? (
              <p className="admin-panel-empty t-small">No sales recorded yet.</p>
            ) : (
              <div className="admin-recent-list">
                {stats.recentSales.map(sale => (
                  <div key={sale.id} className="admin-recent-item">
                    <div>
                      <p className="admin-recent-name">{sale.customerName || 'Walk-in'}</p>
                      <p className="t-small" style={{ color: 'var(--mid-grey)' }}>{fmtDate(sale.timestamp)} · {fmtTime(sale.timestamp)}</p>
                    </div>
                    <p className="admin-recent-total">GHS {sale.total.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Stock Alerts */}
          <div className="admin-panel">
            <div className="admin-panel__head">
              <h3 className="admin-panel-title">Stock Alerts</h3>
              <Link to="/admin/inventory" className="admin-panel-link t-small">Manage →</Link>
            </div>
            {stats.lowStock.length === 0 && stats.outOfStock.length === 0 ? (
              <p className="admin-panel-empty t-small">All stock levels are healthy.</p>
            ) : (
              <div className="admin-stock-list">
                {stats.outOfStock.map(p => (
                  <div key={p.id} className="admin-stock-item">
                    <span className="admin-stock-name">{p.name}</span>
                    <span className="badge badge--out">Out of Stock</span>
                  </div>
                ))}
                {stats.lowStock.map(p => (
                  <div key={p.id} className="admin-stock-item">
                    <span className="admin-stock-name">{p.name}</span>
                    <span className="badge badge--low">Low</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Top Products */}
          <div className="admin-panel">
            <div className="admin-panel__head">
              <h3 className="admin-panel-title">Top Selling Pieces</h3>
            </div>
            {stats.topProducts.length === 0 ? (
              <p className="admin-panel-empty t-small">No sales data yet.</p>
            ) : (
              <div className="admin-top-list">
                {stats.topProducts.map(({ productId, qty }, i) => {
                  const product = getProductById(productId);
                  if (!product) return null;
                  return (
                    <div key={productId} className="admin-top-item">
                      <span className="admin-top-rank">{i + 1}</span>
                      <span className="admin-top-name">{product.name}</span>
                      <span className="admin-top-qty t-small">{qty} sold</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="admin-panel admin-panel--links">
            <h3 className="admin-panel-title">Quick Actions</h3>
            <div className="admin-quick-links">
              <Link to="/studio" className="admin-quick-link">
                <span className="admin-quick-link__icon">◈</span>
                <div>
                  <p className="admin-quick-link__title">Open Studio POS</p>
                  <p className="t-small">Start a new sale</p>
                </div>
              </Link>
              <Link to="/admin/inventory" className="admin-quick-link">
                <span className="admin-quick-link__icon">▦</span>
                <div>
                  <p className="admin-quick-link__title">Manage Inventory</p>
                  <p className="t-small">Update stock levels</p>
                </div>
              </Link>
              <Link to="/admin/sales" className="admin-quick-link">
                <span className="admin-quick-link__icon">◷</span>
                <div>
                  <p className="admin-quick-link__title">Sales Report</p>
                  <p className="t-small">View full history</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </StudioLayout>
  );
}
