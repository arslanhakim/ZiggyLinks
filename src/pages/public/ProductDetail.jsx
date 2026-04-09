import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout';
import ImagePlaceholder from '../../components/ImagePlaceholder';
import { getProductBySlug, products, MATERIALS } from '../../data/products';
import './ProductDetail.css';

function materialLabel(id) {
  return MATERIALS.find(m => m.id === id)?.label || id;
}

function StockNote({ stock, available }) {
  if (!available || stock === 0) {
    return <p className="pd-stock pd-stock--out">This piece is currently unavailable. Check back soon or contact us for restocking updates.</p>;
  }
  if (stock <= 3) {
    return <p className="pd-stock pd-stock--low">Limited availability — only {stock} remaining in studio.</p>;
  }
  return <p className="pd-stock pd-stock--ok">Available now in studio.</p>;
}

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const [activeThumb, setActiveThumb] = useState(0);

  if (!product) {
    return (
      <PublicLayout>
        <div className="pd-not-found container section">
          <h1 className="t-headline">Piece not found</h1>
          <p className="t-body" style={{ marginTop: '1rem', maxWidth: '360px' }}>
            This piece may have been removed or the link may be incorrect.
          </p>
          <Link to="/collection" className="btn btn--outline" style={{ marginTop: '2rem' }}>Back to Collection</Link>
        </div>
      </PublicLayout>
    );
  }

  const matLabel = materialLabel(product.material);
  const related = products
    .filter(p => p.category === product.category && p.id !== product.id && p.available)
    .slice(0, 3);

  // Gallery views — product shot, worn on body, macro detail
  const galleryViews = [
    { src: product.images?.[0], name: product.name, detail: matLabel },
    { src: product.images?.[1], name: product.name, detail: 'Worn' },
    { src: product.images?.[2], name: product.name, detail: 'Close-up' },
  ];

  return (
    <PublicLayout>
      <div className="pd-page">
        {/* Breadcrumb */}
        <nav className="pd-breadcrumb container">
          <Link to="/collection" className="pd-breadcrumb__link">Collection</Link>
          <span className="pd-breadcrumb__sep">/</span>
          <span className="pd-breadcrumb__current">{product.name}</span>
        </nav>

        {/* Main layout */}
        <div className="pd-main container">
          {/* Gallery */}
          <div className="pd-gallery">
            <div className="pd-gallery__main">
              <ImagePlaceholder
                src={galleryViews[activeThumb].src}
                name={galleryViews[activeThumb].name}
                detail={galleryViews[activeThumb].detail}
              />
            </div>
            <div className="pd-gallery__thumbs">
              {galleryViews.map((view, i) => (
                <button
                  key={i}
                  className={`pd-thumb ${activeThumb === i ? 'pd-thumb--active' : ''}`}
                  onClick={() => setActiveThumb(i)}
                  aria-label={`View ${view.detail}`}
                >
                  <ImagePlaceholder
                    src={view.src}
                    name={view.detail}
                    detail={view.detail}
                    compact
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="pd-info">
            {/* Header */}
            <div className="pd-info__header">
              <p className="t-label pd-info__category">{product.category}</p>
              <h1 className="pd-info__name">{product.name}</h1>
              <p className="pd-info__material">{matLabel}</p>
            </div>

            {/* Price */}
            <div className="pd-pricing">
              <div className="pd-pricing__main">
                <span className="pd-pricing__from">From</span>
                <span className="pd-pricing__amount">GHS {product.price.toLocaleString()}</span>
              </div>
              {product.priceRange && (
                <p className="pd-pricing__range">Typical range: GHS {product.priceRange}</p>
              )}
              <p className="pd-pricing__note">Final price depends on your measurement and fit.</p>
            </div>

            {/* Stock */}
            <StockNote stock={product.stock} available={product.available} />

            {/* Description */}
            <div className="pd-description">
              <p className="t-body">{product.description}</p>
            </div>

            {/* Specs */}
            <div className="pd-specs">
              <div className="pd-spec">
                <span className="pd-spec__label">Width</span>
                <span className="pd-spec__value">{product.widthMm}mm</span>
              </div>
              <div className="pd-spec">
                <span className="pd-spec__label">Weight</span>
                <span className="pd-spec__value">{product.weightGrams}g approx</span>
              </div>
              <div className="pd-spec">
                <span className="pd-spec__label">Material</span>
                <span className="pd-spec__value">{matLabel}</span>
              </div>
              <div className="pd-spec">
                <span className="pd-spec__label">Closure</span>
                <span className="pd-spec__value">Permanent micro-weld</span>
              </div>
            </div>

            {/* Tags */}
            {product.tags?.length > 0 && (
              <div className="pd-tags">
                {product.tags.map(tag => (
                  <span key={tag} className="pd-tag">{tag}</span>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="pd-cta">
              {product.available ? (
                <>
                  <Link to="/visit" className="btn btn--primary btn--full pd-cta__btn">
                    Book a Fitting
                  </Link>
                  <p className="pd-cta__note">
                    This piece is available in our Accra studio. Book a visit and we will have it ready for your fitting.
                  </p>
                </>
              ) : (
                <>
                  <Link to="/contact" className="btn btn--outline btn--full pd-cta__btn">
                    Ask About Restocking
                  </Link>
                  <p className="pd-cta__note">
                    This piece is temporarily out of stock. Get in touch and we will let you know when it is back.
                  </p>
                </>
              )}
            </div>

            {/* Care */}
            <details className="pd-care">
              <summary className="pd-care__toggle">
                <span>Care Instructions</span>
                <span className="pd-care__icon">+</span>
              </summary>
              <p className="pd-care__text">{product.care}</p>
            </details>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="pd-related container">
            <div className="pd-related__header">
              <p className="t-label">You might also like</p>
            </div>
            <div className="pd-related__grid">
              {related.map(r => (
                <Link key={r.id} to={`/collection/${r.slug}`} className="pd-related__card">
                  <div className="pd-related__img">
                    <ImagePlaceholder
                      src={r.images?.[0]}
                      name={r.name}
                      detail={materialLabel(r.material)}
                    />
                  </div>
                  <div className="pd-related__info">
                    <p className="pd-related__name">{r.name}</p>
                    <p className="pd-related__material">{materialLabel(r.material)}</p>
                    <p className="pd-related__price">From GHS {r.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </PublicLayout>
  );
}
