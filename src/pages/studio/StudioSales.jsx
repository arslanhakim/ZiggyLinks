import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudioLayout from '../../components/layout/StudioLayout';
import { products, MATERIALS } from '../../data/products';
import { getStock, saveSale } from '../../data/store';
import './StudioSales.css';

function materialLabel(id) {
  return MATERIALS.find(m => m.id === id)?.label || id;
}

function ProductThumb({ name }) {
  // Two-letter monogram from first letters of each word
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2);
  return (
    <div className="pos-thumb">
      <span>{initials}</span>
    </div>
  );
}

export default function StudioSales() {
  const navigate = useNavigate();
  const [stock, setStock] = useState({});
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setStock(getStock());
  }, []);

  const CATS = [
    { id: 'all', label: 'All' },
    { id: 'chains', label: 'Chains' },
    { id: 'anklets', label: 'Anklets' },
    { id: 'bracelets', label: 'Bracelets' },
    { id: 'necklaces', label: 'Necklaces' },
    { id: 'rings', label: 'Rings' },
  ];

  const filtered = products.filter(p => {
    if (filterCat !== 'all' && p.category !== filterCat) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const addToCart = (product) => {
    const available = stock[product.id] ?? product.stock;
    if (available <= 0) return;
    setCart(prev => {
      const existing = prev.find(i => i.productId === product.id);
      if (existing) {
        if (existing.qty >= available) return prev;
        return prev.map(i => i.productId === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { productId: product.id, name: product.name, price: product.price, qty: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(i => i.productId !== productId));
  };

  const updateQty = (productId, qty) => {
    if (qty < 1) { removeFromCart(productId); return; }
    setCart(prev => prev.map(i => i.productId === productId ? { ...i, qty } : i));
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const itemCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const confirmSale = () => {
    if (cart.length === 0) return;
    const sale = saveSale({
      items: cart,
      total,
      customerName: customerName || 'Walk-in',
      customerNote,
    });
    setStock(getStock());
    navigate('/studio/receipt', { state: { sale } });
  };

  return (
    <StudioLayout mode="studio">
      <div className="pos-shell">
        {/* Product Picker */}
        <div className="pos-picker">
          <div className="pos-picker__header">
            <h2 className="pos-title">New Sale</h2>
            <input
              className="pos-search"
              type="search"
              placeholder="Search pieces..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className="pos-cats">
              {CATS.map(c => (
                <button
                  key={c.id}
                  className={`pos-cat-btn ${filterCat === c.id ? 'pos-cat-btn--active' : ''}`}
                  onClick={() => setFilterCat(c.id)}
                >{c.label}</button>
              ))}
            </div>
          </div>

          <div className="pos-product-grid">
            {filtered.map(product => {
              const inStock = stock[product.id] ?? product.stock;
              const cartItem = cart.find(i => i.productId === product.id);
              const inCart = !!cartItem;
              const isOut = inStock <= 0;

              return (
                <button
                  key={product.id}
                  className={`pos-product-tile ${inCart ? 'pos-product-tile--in-cart' : ''} ${isOut ? 'pos-product-tile--out' : ''}`}
                  onClick={() => addToCart(product)}
                  disabled={isOut}
                >
                  <ProductThumb name={product.name} />
                  <div className="pos-tile-info">
                    <p className="pos-tile-name">{product.name}</p>
                    <p className="pos-tile-material">{materialLabel(product.material)}</p>
                    <div className="pos-tile-meta">
                      <span className="pos-tile-price">GHS {product.price.toLocaleString()}</span>
                      <span className={`pos-stock-label ${inStock <= 3 ? 'pos-stock-label--low' : ''} ${isOut ? 'pos-stock-label--out' : ''}`}>
                        {isOut ? 'Out' : `${inStock}`}
                      </span>
                    </div>
                  </div>
                  {inCart && <span className="pos-in-cart-badge">{cartItem.qty}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Order Panel */}
        <div className="pos-cart">
          <div className="pos-cart__inner">
            <div className="pos-cart__header">
              <h3 className="pos-cart-title">Order</h3>
              {itemCount > 0 && (
                <span className="pos-cart-count">{itemCount} item{itemCount !== 1 ? 's' : ''}</span>
              )}
            </div>

            {/* Customer name */}
            <div className="pos-customer">
              <input
                className="pos-input"
                type="text"
                placeholder="Customer name (optional)"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
              />
            </div>

            {/* Cart items */}
            <div className="pos-items">
              {cart.length === 0 && (
                <p className="pos-empty-cart">Tap a piece to add it.</p>
              )}
              {cart.map(item => (
                <div key={item.productId} className="pos-cart-item">
                  <div className="pos-cart-item__top">
                    <div className="pos-cart-item__info">
                      <p className="pos-cart-item__name">{item.name}</p>
                      <p className="pos-cart-item__unit">GHS {item.price.toLocaleString()} each</p>
                    </div>
                    <p className="pos-cart-item__subtotal">GHS {(item.price * item.qty).toLocaleString()}</p>
                  </div>
                  <div className="pos-cart-item__controls">
                    <button className="pos-qty-btn" onClick={() => updateQty(item.productId, item.qty - 1)} aria-label="Decrease">-</button>
                    <span className="pos-qty-val">{item.qty}</span>
                    <button className="pos-qty-btn" onClick={() => updateQty(item.productId, item.qty + 1)} aria-label="Increase">+</button>
                    <button className="pos-remove-btn" onClick={() => removeFromCart(item.productId)} aria-label="Remove">Remove</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Note */}
            {cart.length > 0 && (
              <textarea
                className="pos-input pos-note-input"
                rows={2}
                placeholder="Note (re-weld, referral, gift...)"
                value={customerNote}
                onChange={e => setCustomerNote(e.target.value)}
              />
            )}

            {/* Total + actions */}
            <div className="pos-checkout">
              <div className="pos-total-row">
                <span className="pos-total-label">Total</span>
                <span className="pos-total-amount">GHS {total.toLocaleString()}</span>
              </div>

              <button
                className="btn btn--brass btn--full pos-confirm-btn"
                onClick={confirmSale}
                disabled={cart.length === 0}
              >
                Confirm Sale
              </button>

              {cart.length > 0 && (
                <button
                  className="pos-clear-btn"
                  onClick={() => setCart([])}
                >
                  Clear order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </StudioLayout>
  );
}
