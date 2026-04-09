import PublicLayout from '../../components/layout/PublicLayout';
import ImagePlaceholder from '../../components/ImagePlaceholder';
import { Link } from 'react-router-dom';
import './Gallery.css';

// Gallery items — mix of product on-body shots, studio moments, and detail close-ups.
// Each src points to /public/images/gallery/. Drop in real photos to replace fallbacks.
const GALLERY_ITEMS = [
  { id: 1,  src: '/images/gallery/venetian-wrist.jpg',    name: 'Venetian Box Chain',      detail: 'On wrist · 14K Gold Fill',            aspect: 'portrait',      caption: 'Venetian Box Chain on wrist' },
  { id: 2,  src: '/images/gallery/satellite-ankle.jpg',   name: 'Satellite Anklet',         detail: 'On ankle · Sterling Silver',           aspect: 'landscape',     caption: 'Satellite Anklet, beach light' },
  { id: 3,  src: '/images/gallery/paperclip-neck.jpg',    name: 'Paperclip Necklace',       detail: 'On neck · Rose Gold Fill',             aspect: 'portrait-tall', caption: 'Paperclip Necklace draped' },
  { id: 4,  src: '/images/gallery/weld-moment.jpg',       name: 'The weld',                 detail: 'Studio moment',                        aspect: 'square',        caption: 'The welding moment' },
  { id: 5,  src: '/images/gallery/figaro-stack.jpg',      name: 'Figaro + Midi Ring',       detail: 'Wrist stack · 14K Gold',               aspect: 'portrait',      caption: 'Figaro Chain and Midi Ring' },
  { id: 6,  src: '/images/gallery/cable-ankle.jpg',       name: 'Cable Chain Anklet',       detail: 'Detail · 14K Gold Fill',               aspect: 'landscape',     caption: 'Cable Chain close-up' },
  { id: 7,  src: '/images/gallery/studio-interior.jpg',   name: 'Our studio',               detail: 'East Cantonments, Accra',              aspect: 'landscape',     caption: 'The ZiggyLinks studio' },
  { id: 8,  src: '/images/gallery/herringbone-flat.jpg',  name: 'Herringbone Chain',        detail: 'Flat lay · 18K Gold Fill',             aspect: 'portrait',      caption: 'Herringbone flat lay' },
  { id: 9,  src: '/images/gallery/group-wrists.jpg',      name: 'Three wrists',             detail: 'Group weld session',                   aspect: 'square',        caption: 'Friends welded together' },
  { id: 10, src: '/images/gallery/curb-bold.jpg',         name: 'Curb Chain Bracelet',      detail: 'On wrist · 14K Gold Fill',             aspect: 'portrait-tall', caption: 'Curb Chain — bold weight' },
  { id: 11, src: '/images/gallery/rope-texture.jpg',      name: 'Rope Twist Chain',         detail: 'Macro texture · 18K Gold',             aspect: 'square',        caption: 'Rope Twist detail' },
  { id: 12, src: '/images/gallery/snake-draped.jpg',      name: 'Snake Chain Necklace',     detail: 'Draped · 18K Gold Fill',               aspect: 'landscape',     caption: 'Snake Chain draped on collarbone' },
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
          <a href="https://instagram.com/ziggylinks" target="_blank" rel="noopener noreferrer" className="btn btn--primary">
            @ZiggyLinks
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
