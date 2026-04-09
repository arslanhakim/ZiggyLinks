import { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout';
import ImagePlaceholder from '../../components/ImagePlaceholder';
import { products, CATEGORIES, MATERIALS } from '../../data/products';
import './Collection.css';

function materialLabel(id) {
  return MATERIALS.find(m => m.id === id)?.label || id;
}

function StockIndicator({ stock, available }) {
  if (!available || stock === 0) return <span className="col-stock col-stock--out">Currently unavailable</span>;
  if (stock <= 3) return <span className="col-stock col-stock--low">Only {stock} left</span>;
  return null; // no badge when stock is healthy — less noise
}

export default function Collection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeMaterial, setActiveMaterial] = useState('all');
  const [sort, setSort] = useState('default');

  let filtered = products.filter(p => {
    if (activeCategory !== 'all' && p.category !== activeCategory) return false;
    if (activeMaterial !== 'all' && p.material !== activeMaterial) return false;
    return true;
  });

  if (sort === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === 'name') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  const availableCount = filtered.filter(p => p.available).length;

  return (
    <PublicLayout>
      {/* Hero */}
      <div className="collection-hero">
        <div className="container">
          <p className="t-label collection-hero__label">The Collection</p>
          <h1 className="t-headline collection-hero__title">Pieces made to stay.</h1>
          <p className="collection-hero__sub">
            Each piece is custom-fitted and permanently welded in our Accra studio. Prices are guides — final cost depends on your measurement.
          </p>
        </div>
      </div>

      <div className="container">
        {/* Filters */}
        <div className="collection-filters">
          <div className="filter-group">
            <span className="t-label filter-label">Category</span>
            <div className="filter-pills">
              <button
                className={`filter-pill ${activeCategory === 'all' ? 'filter-pill--active' : ''}`}
                onClick={() => setActiveCategory('all')}
              >All</button>
              {CATEGORIES.map(c => (
                <button
                  key={c.id}
                  className={`filter-pill ${activeCategory === c.id ? 'filter-pill--active' : ''}`}
                  onClick={() => setActiveCategory(c.id)}
                >{c.label}</button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <span className="t-label filter-label">Material</span>
            <div className="filter-pills">
              <button
                className={`filter-pill ${activeMaterial === 'all' ? 'filter-pill--active' : ''}`}
                onClick={() => setActiveMaterial('all')}
              >All</button>
              {MATERIALS.map(m => (
                <button
                  key={m.id}
                  className={`filter-pill ${activeMaterial === m.id ? 'filter-pill--active' : ''}`}
                  onClick={() => setActiveMaterial(m.id)}
                >{m.label}</button>
              ))}
            </div>
          </div>

          <div className="filter-sort">
            <span className="t-label filter-label">Sort</span>
            <select
              className="sort-select"
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </div>

        <div className="collection-count t-small">
          {filtered.length} piece{filtered.length !== 1 ? 's' : ''}
          {availableCount < filtered.length && ` · ${availableCount} available`}
        </div>

        {/* Product Grid */}
        <div className="collection-grid">
          {filtered.map((product) => (
            <Link
              key={product.id}
              to={`/collection/${product.slug}`}
              className={`col-card ${!product.available ? 'col-card--unavailable' : ''}`}
            >
              <div className="col-card__img">
                <ImagePlaceholder
                  src={product.images?.[0]}
                  name={product.name}
                  detail={materialLabel(product.material)}
                />
                {!product.available && (
                  <div className="col-card__sold-out">Sold Out</div>
                )}
              </div>
              <div className="col-card__body">
                <p className="col-card__name">{product.name}</p>
                <p className="col-card__brief">{product.brief}</p>
                <div className="col-card__footer">
                  <div className="col-card__pricing">
                    <span className="col-card__price">From GHS {product.price.toLocaleString()}</span>
                    <span className="col-card__material">{materialLabel(product.material)}</span>
                  </div>
                  <StockIndicator stock={product.stock} available={product.available} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="collection-empty">
            <p className="t-subtitle">No pieces match your filters.</p>
            <button className="btn btn--ghost" onClick={() => { setActiveCategory('all'); setActiveMaterial('all'); }}>
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Studio note */}
      <section className="collection-note section">
        <div className="container--narrow text-center">
          <p className="t-label collection-note__label">In-Studio Only</p>
          <p className="t-subtitle collection-note__body">
            We do not sell or ship online. Every piece is fitted and welded in-person at our East Cantonments studio.
          </p>
          <Link to="/visit" className="btn btn--primary collection-note__cta">
            Book a Visit
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
