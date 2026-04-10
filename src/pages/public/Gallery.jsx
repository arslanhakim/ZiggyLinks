import PublicLayout from '../../components/layout/PublicLayout';
import ImagePlaceholder from '../../components/ImagePlaceholder';
import { Link } from 'react-router-dom';
import './Gallery.css';

// Gallery items — mix of product shots, studio moments, and lifestyle.
// Uses real images from /public/images/.
const GALLERY_ITEMS = [
  { id: 1,  src: '/images/gallery/lookbook-03.png',       name: 'Worn together',            detail: 'Necklace + bracelet',                  aspect: 'portrait-tall', caption: 'Layered on skin' },
  { id: 2,  src: '/images/studio/studio-02.png',          name: 'The workbench',            detail: 'Studio, Accra',                        aspect: 'landscape',     caption: 'Where every piece begins' },
  { id: 3,  src: '/images/products/chain-01.png',         name: 'Cable chain',              detail: '14K Gold Fill',                        aspect: 'square',        caption: 'Venetian Box Chain' },
  { id: 4,  src: '/images/studio/weld-process-01.png',    name: 'The weld',                 detail: 'Studio moment',                        aspect: 'portrait',      caption: 'The welding moment' },
  { id: 5,  src: '/images/gallery/lookbook-01.png',       name: 'The collection',           detail: 'Chains + charms',                      aspect: 'landscape',     caption: 'Chains and charms, laid out' },
  { id: 6,  src: '/images/products/anklet-01.png',        name: 'Anklet on skin',           detail: '14K Gold Fill',                        aspect: 'portrait-tall', caption: 'Cable anklet, golden hour' },
  { id: 7,  src: '/images/products/bracelet-02.png',      name: 'Stacked bracelets',        detail: 'Wrist stack',                          aspect: 'portrait',      caption: 'Two chains, one wrist' },
  { id: 8,  src: '/images/studio/studio-03.png',          name: 'Choosing a piece',         detail: 'Client experience',                    aspect: 'portrait',      caption: 'Browsing the collection' },
  { id: 9,  src: '/images/products/charm-01.png',         name: 'Charm collection',         detail: '14K Gold Fill',                        aspect: 'square',        caption: 'Hearts, moons, stars' },
  { id: 10, src: '/images/gallery/lookbook-02.png',       name: 'In the hands',             detail: 'Detail close-up',                      aspect: 'portrait',      caption: 'Delicate cable chain' },
  { id: 11, src: '/images/gallery/lookbook-04.png',       name: 'Studio flat lay',          detail: 'Pieces + charms',                      aspect: 'landscape',     caption: 'The full offering' },
  { id: 12, src: '/images/studio/studio-04.png',          name: 'Craftsmanship',            detail: 'By hand',                              aspect: 'square',        caption: 'Every link, by hand' },
];

export default function Gallery() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="gallery-hero">
        <div className="container">
          <p className="t-label gallery-hero__label">Lookbook</p>
          <h1 className="t-display gallery-hero__title">The Gallery</h1>
          <p className="gallery-hero__sub">
            Permanent pieces on real people — welded in our Accra studio.
          </p>
        </div>
      </section>

      {/* Masonry grid */}
      <div className="gallery-grid container">
        {GALLERY_ITEMS.map(item => (
          <div key={item.id} className={`gallery-tile gallery-tile--${item.aspect}`}>
            <div className="gallery-tile__img">
              <ImagePlaceholder
                src={item.src}
                name={item.name}
                detail={item.detail}
              />
            </div>
            <p className="gallery-tile__caption">{item.caption}</p>
          </div>
        ))}
      </div>

      {/* Instagram */}
      <section className="gallery-social section">
        <div className="container--narrow text-center">
          <p className="t-label">Follow Along</p>
          <h2 className="t-headline gallery-social__headline">
            See more on<br /><em>Instagram.</em>
          </h2>
          <p className="t-body gallery-social__body">
            We share client pieces, studio moments, and new arrivals every week.
          </p>
          <a href="https://www.instagram.com/ziggylinks.gh/" target="_blank" rel="noopener noreferrer" className="btn btn--primary">
            @ziggylinks.gh
          </a>
        </div>
      </section>

      {/* Lookbook CTA */}
      <section className="gallery-cta section">
        <div className="container--narrow text-center">
          <h2 className="t-headline gallery-cta__headline">
            Want your piece<br /><em>in here?</em>
          </h2>
          <p className="t-body gallery-cta__body">
            Book a visit, let us weld something permanent, and we will photograph it for the lookbook.
          </p>
          <Link to="/visit" className="btn btn--outline">Book a Visit</Link>
        </div>
      </section>
    </PublicLayout>
  );
}
