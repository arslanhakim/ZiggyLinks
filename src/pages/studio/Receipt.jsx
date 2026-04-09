import { useLocation, Link, useNavigate } from 'react-router-dom';
import StudioLayout from '../../components/layout/StudioLayout';
import './Receipt.css';

export default function Receipt() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const sale = state?.sale;

  if (!sale) {
    return (
      <StudioLayout mode="studio">
        <div className="receipt-empty">
          <p>No sale data found.</p>
          <Link to="/studio" className="btn btn--outline" style={{ marginTop: '1rem' }}>← Back to Sales</Link>
        </div>
      </StudioLayout>
    );
  }

  const date = new Date(sale.timestamp);
  const dateStr = date.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  return (
    <StudioLayout mode="studio">
      <div className="receipt-shell">
        <div className="receipt-card">
          {/* Header */}
          <div className="receipt-header">
            <div className="receipt-check">✓</div>
            <h2 className="receipt-heading">Sale Confirmed</h2>
            <p className="receipt-subhead">
              {sale.customerName !== 'Walk-in' ? `Thank you, ${sale.customerName}.` : 'Walk-in sale recorded.'}
            </p>
          </div>

          {/* Meta */}
          <div className="receipt-meta">
            <div className="receipt-meta-row">
              <span className="t-label">Sale ID</span>
              <span className="receipt-meta-val">{sale.id}</span>
            </div>
            <div className="receipt-meta-row">
              <span className="t-label">Date</span>
              <span className="receipt-meta-val">{dateStr}</span>
            </div>
            <div className="receipt-meta-row">
              <span className="t-label">Time</span>
              <span className="receipt-meta-val">{timeStr}</span>
            </div>
            {sale.customerName && sale.customerName !== 'Walk-in' && (
              <div className="receipt-meta-row">
                <span className="t-label">Customer</span>
                <span className="receipt-meta-val">{sale.customerName}</span>
              </div>
            )}
          </div>

          {/* Items */}
          <div className="receipt-items">
            <p className="t-label receipt-items-head">Items</p>
            {sale.items.map(item => (
              <div key={item.productId} className="receipt-item">
                <div className="receipt-item__left">
                  <span className="receipt-item__name">{item.name}</span>
                  <span className="receipt-item__qty">× {item.qty}</span>
                </div>
                <span className="receipt-item__price">GHS {(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="receipt-total-row">
            <span className="receipt-total-label">Total</span>
            <span className="receipt-total-amount">GHS {sale.total.toLocaleString()}</span>
          </div>

          {/* Note */}
          {sale.customerNote && (
            <div className="receipt-note">
              <p className="t-label" style={{ marginBottom: '0.4rem' }}>Note</p>
              <p className="receipt-note-text">{sale.customerNote}</p>
            </div>
          )}

          {/* Actions */}
          <div className="receipt-actions">
            <button
              className="btn btn--brass btn--full"
              onClick={() => navigate('/studio')}
            >
              New Sale
            </button>
            <Link to="/studio/history" className="btn btn--ghost btn--full">
              View History →
            </Link>
          </div>
        </div>
      </div>
    </StudioLayout>
  );
}
