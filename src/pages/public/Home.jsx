import { Link } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout';
import ImagePlaceholder from '../../components/ImagePlaceholder';
import { getFeaturedProducts, MATERIALS } from '../../data/products';
import './Home.css';

const featured = getFeaturedProducts().slice(0, 4);

function materialLabel(id) {
  return MATERIALS.find(m => m.id === id)?.label || id;
}

export default function Home() {
  return (
    <PublicLayout>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero__media">
          <ImagePlaceholder
            src="/images/gallery/lookbook-03.webp"
            className="hero__image"
            name="Permanent chain on wrist"
            detail="Hero photograph"
          />
        </div>
        <div className="hero__content">
          <p className="t-label hero__eyebrow">Permanent Jewellery · Accra, Ghana</p>
          <h1 className="t-display hero__headline">
            Worn for<br />
            <em>every</em> chapter.
          </h1>
          <p className="hero__sub">
            Chains, anklets, and bracelets welded directly to you — no clasp, no closure. Just a piece that becomes part of your story.
          </p>
          <div className="hero__actions">
            <Link to="/collection" className="btn btn--primary">Browse Collection</Link>
            <Link to="/how-it-works" className="btn btn--outline">How It Works</Link>
          </div>
        </div>
      </section>

      {/* ── MARQUEE STRIP ── */}
      <div className="marquee-strip">
        <div className="marquee-track">
          {['14K Gold Fill', 'Sterling Silver', 'Rose Gold', '18K Gold Fill',
            'Permanent Weld', 'Accra Studio', 'By Appointment', 'Welded to You',
            '14K Gold Fill', 'Sterling Silver', 'Rose Gold', '18K Gold Fill',
            'Permanent Weld', 'Accra Studio', 'By Appointment', 'Welded to You',
          ].map((item, i) => (
            <span key={i} className="marquee-item">
              {item} <span className="marquee-dot">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── EDITORIAL INTRO ── */}
      <section className="editorial-intro section">
        <div className="container">
          <div className="editorial-intro__grid">
            <div className="editorial-intro__copy">
              <p className="t-label">The Studio</p>
              <h2 className="t-headline editorial-intro__headline">
                A piece of jewellery<br />
                <em>without an exit.</em>
              </h2>
              <p className="t-body">
                ZiggyLinks is Accra's first permanent jewellery studio. Each piece is custom-fitted and micro-welded in our East Cantonments space — by hand, with intention.
              </p>
              <p className="t-body">
                No clasps. No fasteners. Just you and the chain you chose.
              </p>
              <Link to="/about" className="text-link editorial-intro__link">
                Read our story →
              </Link>
            </div>
            <div className="editorial-intro__images">
              <div className="intro-img intro-img--tall">
                <ImagePlaceholder
                  src="/images/studio/studio-02.webp"
                  name="Studio interior"
                  detail="East Cantonments, Accra"
                />
              </div>
              <div className="intro-img intro-img--small">
                <ImagePlaceholder
                  src="/images/studio/weld-process-01.webp"
                  name="The weld moment"
                  detail="Micro-weld process"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED COLLECTION ── */}
      <section className="featured-section section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="t-label">From the Studio</p>
              <h2 className="t-title">Featured Pieces</h2>
            </div>
            <Link to="/collection" className="btn btn--ghost">View All →</Link>
          </div>

          <div className="featured-grid">
            {featured.map((product) => (
              <Link
                key={product.id}
                to={`/collection/${product.slug}`}
                className="product-card"
              >
                <div className="product-card__image">
                  <ImagePlaceholder
                    src={product.images?.[0]}
                    name={product.name}
                    detail={materialLabel(product.material)}
                  />
                  <div className="product-card__overlay">
                    <span className="product-card__overlay-text">View Piece</span>
                  </div>
                </div>
                <div className="product-card__info">
                  <div>
                    <p className="product-card__name">{product.name}</p>
                    <p className="product-card__material">{materialLabel(product.material)}</p>
                  </div>
                  <p className="product-card__price">GHS {product.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── MATERIALS STRIP ── */}
      <section className="materials-strip">
        <div className="container">
          <div className="materials-strip__inner">
            {[
              { name: '14K Gold Fill', note: 'Our most popular. Warm, durable, tarnish-resistant.' },
              { name: '18K Gold Fill', note: 'Deeper gold tone. A richer warmth against the skin.' },
              { name: 'Sterling Silver', note: 'Cool and classic. Develops a natural patina over time.' },
              { name: 'Rose Gold Fill', note: 'Soft pink-gold hue. Feminine and modern.' },
            ].map(m => (
              <div key={m.name} className="material-item">
                <span className="material-item__name">{m.name}</span>
                <span className="material-item__note">{m.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS STRIP ── */}
      <section className="process-strip section">
        <div className="container">
          <p className="t-label text-center">The Experience</p>
          <h2 className="t-headline text-center process-strip__headline">
            Three steps to<br /><em>permanent.</em>
          </h2>
          <div className="process-steps">
            {[
              { num: '01', title: 'Choose your piece', body: 'Browse our collection in-studio. We will guide you to the right chain, weight, and material for your style.', note: 'Bring inspiration photos if you have them.' },
              { num: '02', title: 'Get fitted', body: 'We measure and drape the piece on your wrist, neck, or ankle to find the perfect fit — snug but comfortable.', note: 'Sizing is permanent, so we take our time.' },
              { num: '03', title: 'We weld it on', body: 'A quick, painless micro-weld closes the link permanently. No heat touches your skin. The whole process takes under 15 minutes.', note: 'Safe, satisfying, and surprisingly quick.' },
            ].map(step => (
              <div key={step.num} className="process-step">
                <span className="process-step__num">{step.num}</span>
                <h3 className="process-step__title">{step.title}</h3>
                <p className="t-body process-step__body">{step.body}</p>
                <p className="process-step__note">{step.note}</p>
              </div>
            ))}
          </div>
          <div className="text-center process-strip__cta">
            <Link to="/how-it-works" className="btn btn--outline">Read the Full Process</Link>
          </div>
        </div>
      </section>

      {/* ── LOOKBOOK EDITORIAL ── */}
      <section className="lookbook-section">
        <div className="lookbook-grid">
          <div className="lookbook-img lookbook-img--left">
            <ImagePlaceholder
              src="/images/gallery/lookbook-04.webp"
              name="Figaro chain on wrist"
              detail="Lookbook"
            />
          </div>
          <div className="lookbook-copy">
            <p className="t-label">Permanent, Personal</p>
            <h2 className="t-headline">
              The chain you<br />never remove.
            </h2>
            <p className="t-body">
              After a few days, clients say they forget it's there. It just becomes part of them. That's the point.
            </p>
            <Link to="/gallery" className="btn btn--primary lookbook-copy__btn">
              View the Gallery
            </Link>
          </div>
          <div className="lookbook-img lookbook-img--right">
            <ImagePlaceholder
              src="/images/gallery/lookbook-01.webp"
              name="Satellite anklet"
              detail="Lookbook"
            />
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials section">
        <div className="container--content">
          <p className="t-label testimonials__label">Client Stories</p>
          <div className="testimonials-grid">
            {[
              { quote: "I haven't taken mine off since the day it was welded. It's just part of me now. I get asked about it constantly.", name: 'Adjoa M.', piece: 'Venetian Box Chain', location: 'Accra' },
              { quote: "The studio experience was so calming. Ziggy took her time with the fitting and the weld was over in seconds.", name: 'Serwaa K.', piece: 'Satellite Anklet', location: 'East Legon' },
              { quote: "I brought my sister for her birthday and we both got pieces. It felt like a ritual — not a purchase.", name: 'Efua T.', piece: 'Figaro Chain', location: 'Cantonments' },
            ].map((t, i) => (
              <div key={i} className="testimonial-item">
                <p className="testimonial-quote">{t.quote}</p>
                <div className="testimonial-meta">
                  <p className="testimonial-name">{t.name}</p>
                  <p className="testimonial-piece">{t.piece}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="cta-band section">
        <div className="container--narrow text-center">
          <p className="t-label cta-band__label">By Appointment Only</p>
          <h2 className="t-headline cta-band__headline">Ready to visit<br /><em>the studio?</em></h2>
          <p className="t-body cta-band__sub">
            We're based in East Cantonments, Accra and open Tuesday through Saturday. Book a time and we'll have everything ready for you.
          </p>
          <div className="cta-band__actions">
            <Link to="/visit" className="btn btn--primary">Book a Visit</Link>
            <Link to="/faq" className="btn btn--outline">Common Questions</Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
