import { Link } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout';
import './SimplePages.css';

// ─── CONTACT ───────────────────────────────────────────────────────────────
export function Contact() {
  return (
    <PublicLayout>
      <section className="simple-hero">
        <div className="container">
          <p className="t-label brass">Contact</p>
          <h1 className="t-headline page-headline">Get in touch.</h1>
          <p className="t-subtitle">We'd love to hear from you.</p>
        </div>
      </section>
      <div className="contact-body container--content">
        <div className="contact-grid">
          <div>
            <p className="t-label" style={{ marginBottom: '1.5rem' }}>Reach Us Directly</p>
            {[
              { label: 'WhatsApp', value: '+233 24 831 0045', href: 'https://wa.me/233248310045', icon: '\u2706' },
              { label: 'Email', value: 'hello@ziggylinks.com', href: 'mailto:hello@ziggylinks.com', icon: '\u2709' },
              { label: 'Instagram', value: '@ziggylinks', href: 'https://instagram.com/ziggylinks', icon: '\u25C8' },
            ].map(c => (
              <a key={c.label} href={c.href} className="contact-row">
                <span className="contact-row__icon">{c.icon}</span>
                <div>
                  <p className="t-label" style={{ color: 'var(--warm-grey)' }}>{c.label}</p>
                  <p className="t-body">{c.value}</p>
                </div>
              </a>
            ))}
          </div>
          <div>
            <p className="t-label" style={{ marginBottom: '1.5rem' }}>Send a Message</p>
            <form className="contact-form" onSubmit={e => { e.preventDefault(); alert("Message sent! We'll respond within 24 hours."); }}>
              <input className="input" type="text" placeholder="Your name" required />
              <input className="input" type="email" placeholder="your@email.com" required />
              <textarea className="input" rows={5} placeholder="What's on your mind?" required />
              <button className="btn btn--primary btn--full" type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

// ─── TESTIMONIALS ──────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { name: 'Adjoa M.', location: 'Accra', piece: 'Venetian Box Chain', rating: 5, quote: "I got my chain welded on six months ago and haven't thought about removing it once. It's just part of me. People ask about it constantly — I've already referred three friends." },
  { name: 'Serwaa K.', location: 'East Legon', piece: 'Satellite Anklet', rating: 5, quote: "The studio experience was everything. Quiet, unhurried, warm. Abena was so patient helping me decide. I left with an anklet I'm obsessed with and a booking for my sister next month." },
  { name: 'Efua T.', location: 'Airport Hills', piece: 'Figaro Chain', rating: 5, quote: "Came in thinking I'd get a bracelet, left with a necklace AND a bracelet. The Figaro chain looks incredible. I've had mine for four months and still get compliments every week." },
  { name: 'Ama Boateng', location: 'Cantonments', piece: 'Cable Chain Anklet', rating: 5, quote: "Absolutely perfect experience from start to finish. The studio is beautiful, the process is fast, and the anklet looks like it was made for me. Which I guess it was." },
  { name: 'Nana A.', location: 'Tema', piece: 'Rope Twist Chain', rating: 5, quote: "I drove from Tema specifically for this and I'd do it again in a heartbeat. The rope chain catches the light differently at every hour. Worth every minute of the drive." },
  { name: 'Yaa O.', location: 'Labone', piece: 'Midi Ring Band', rating: 5, quote: "The midi ring looks so good stacked with my other rings. People always think it's part of a designer set. It was fast, painless, and Kofi was so welcoming from the moment I arrived." },
];

export function Testimonials() {
  return (
    <PublicLayout>
      <section className="simple-hero">
        <div className="container">
          <p className="t-label brass">What Clients Say</p>
          <h1 className="t-headline page-headline">Testimonials</h1>
          <p className="t-subtitle">Real words from real clients, worn permanently.</p>
        </div>
      </section>
      <div className="testimonials-page container--content section">
        <div className="testimonials-page-grid">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="testimonial-card">
              <div className="testimonial-card__stars">{'★'.repeat(t.rating)}</div>
              <p className="testimonial-card__quote">"{t.quote}"</p>
              <div className="testimonial-card__meta">
                <p className="testimonial-card__name">{t.name}</p>
                <p className="t-small">{t.location} · {t.piece}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center" style={{ marginTop: '4rem' }}>
          <Link to="/visit" className="btn btn--primary">Book a Visit</Link>
        </div>
      </div>
    </PublicLayout>
  );
}

// ─── AFTERCARE ─────────────────────────────────────────────────────────────
const AFTERCARE_SECTIONS = [
  { title: 'Daily Wear', items: ['You can wear your piece 24/7 — this is by design.', 'It\'s safe for showering, sleeping, and exercise.', 'Gold fill and sterling silver are resilient to daily wear.'] },
  { title: 'Cleaning', items: ['Wipe with a soft, lint-free cloth once a week.', 'For deeper cleaning, use warm water and a tiny drop of mild soap.', 'Avoid toothpaste, baking soda, or harsh chemical cleaners.', 'Pat dry with a soft cloth — don\'t rub vigorously.'] },
  { title: 'What to Avoid', items: ['Avoid soaking in chlorinated or heavily salted water for extended periods.', 'Remove before using bleach, cleaning products, or applying perfume directly to the chain.', 'Don\'t apply hand sanitiser directly onto the chain repeatedly.', 'Avoid contact with lotions, oils, and sunscreens where possible.'] },
  { title: 'Sterling Silver Care', items: ['Silver naturally tarnishes over time — this is normal and beautiful.', 'Use a silver polishing cloth to restore brightness.', 'Store flat if removed (e.g. after cutting) to prevent kinking.'] },
  { title: 'Gold Fill Care', items: ['Gold fill is very durable — the gold layer is thick and bonded.', 'It won\'t peel or tarnish under normal conditions.', 'A gentle wipe with a dry cloth keeps it luminous.'] },
];

export function Aftercare() {
  return (
    <PublicLayout>
      <section className="simple-hero">
        <div className="container">
          <p className="t-label brass">Jewellery Care</p>
          <h1 className="t-headline page-headline">Aftercare Guide</h1>
          <p className="t-subtitle">How to keep your permanent piece looking its best.</p>
        </div>
      </section>
      <div className="aftercare-body container--content section">
        <div className="aftercare-intro">
          <p className="t-body">
            Permanent jewellery is made for life — but a little care goes a long way. Here's our simple guide to keeping your piece in beautiful condition.
          </p>
        </div>
        <div className="aftercare-sections">
          {AFTERCARE_SECTIONS.map(s => (
            <div key={s.title} className="aftercare-section">
              <h3 className="aftercare-section-title">{s.title}</h3>
              <ul className="aftercare-list">
                {s.items.map(item => (
                  <li key={item} className="aftercare-item t-body">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="aftercare-note">
          <p className="t-label" style={{ marginBottom: '0.75rem' }}>Questions?</p>
          <p className="t-body">If you have any concerns about your piece — discolouration, feel, or fit — reach out before removing it. In many cases it's a quick fix. <Link to="/contact" className="text-link">Contact us here.</Link></p>
        </div>
      </div>
    </PublicLayout>
  );
}

// ─── EVENTS ────────────────────────────────────────────────────────────────
const EVENTS = [
  { title: 'Pop-Up at Alara Lagos', date: 'June 2026', location: 'Lagos, Nigeria', status: 'upcoming', desc: "We're taking ZiggyLinks to Lagos for a one-weekend pop-up at Alara Concept Store. Book in advance \u2014 slots are limited." },
  { title: 'Anniversary Weekend', date: 'August 2026', location: 'Accra Studio', status: 'upcoming', desc: 'Four-year anniversary weekend with new pieces, extended hours, and a complimentary polish for existing clients.' },
  { title: 'Kumasi Pop-Up', date: 'March 2026', location: 'Kumasi, Ghana', status: 'past', desc: 'Our second Kumasi pop-up was fully booked within 48 hours. Thank you to everyone who came through.' },
];

export function Events() {
  return (
    <PublicLayout>
      <section className="simple-hero">
        <div className="container">
          <p className="t-label brass">Events & Pop-Ups</p>
          <h1 className="t-headline page-headline">Where We'll Be</h1>
          <p className="t-subtitle">We occasionally take ZiggyLinks on the road. Follow us to stay updated.</p>
        </div>
      </section>
      <div className="events-body container--content section">
        <div className="events-list">
          {EVENTS.map(evt => (
            <div key={evt.title} className={`event-card ${evt.status === 'past' ? 'event-card--past' : ''}`}>
              <div className="event-card__meta">
                <span className={`badge ${evt.status === 'upcoming' ? 'badge--available' : 'badge--out'}`}>
                  {evt.status === 'upcoming' ? 'Upcoming' : 'Past'}
                </span>
                <p className="event-card__date t-label">{evt.date}</p>
              </div>
              <h3 className="event-card__title">{evt.title}</h3>
              <p className="event-card__location t-small">{evt.location}</p>
              <p className="event-card__desc t-body">{evt.desc}</p>
              {evt.status === 'upcoming' && (
                <Link to="/visit" className="btn btn--outline" style={{ marginTop: '1rem', alignSelf: 'flex-start' }}>Reserve a Slot</Link>
              )}
            </div>
          ))}
        </div>
        <div className="events-follow">
          <p className="t-subtitle">Stay updated on new events and pop-ups.</p>
          <a href="https://instagram.com/ziggylinks" target="_blank" rel="noopener noreferrer" className="btn btn--primary" style={{ marginTop: '1.5rem' }}>Follow @ZiggyLinks</a>
        </div>
      </div>
    </PublicLayout>
  );
}

// ─── POLICIES ──────────────────────────────────────────────────────────────
export function Policies() {
  return (
    <PublicLayout>
      <section className="simple-hero">
        <div className="container">
          <p className="t-label brass">Policies</p>
          <h1 className="t-headline page-headline">Our Policies</h1>
          <p className="t-subtitle">Straightforward. No fine print surprises.</p>
        </div>
      </section>
      <div className="policies-body container--narrow section">
        {[
          { title: 'No Returns or Exchanges', body: 'All permanent jewellery is custom-fitted and welded. Because each piece is personalised to you at the time of your visit, we cannot offer returns or exchanges once the weld is made. Please take your time choosing — we\'re here to help you decide.' },
          { title: 'Appointments & Cancellations', body: 'We kindly ask for at least 24 hours notice if you need to cancel or reschedule. Last-minute cancellations mean another client misses the slot. Three or more no-shows may result in being asked to prepay for future visits.' },
          { title: 'Re-Weld Policy', body: 'If you cut a piece off for medical reasons or personal choice, we\'re happy to re-weld it. A small re-weld fee applies. Please note this only applies if the chain itself is undamaged and still in original condition.' },
          { title: 'Photography & Privacy', body: 'We love photographing our work and may ask permission to share images of your piece on social media. We will always ask before posting. You are under no obligation to agree.' },
          { title: 'Health & Safety', body: 'Our welder is a professional jewellery tool that has been in use for years without incident. If you have a known metal allergy or skin sensitivity, please let us know before your visit so we can advise on suitable materials.' },
          { title: 'Pricing', body: 'Prices shown on our website are guides. Final pricing depends on the length of chain used (based on your measurement). We will always confirm the exact price before welding.' },
        ].map(p => (
          <div key={p.title} className="policy-block">
            <h3 className="policy-title">{p.title}</h3>
            <p className="t-body policy-body">{p.body}</p>
          </div>
        ))}
        <p className="t-small" style={{ marginTop: '3rem', color: 'var(--mid-grey)' }}>Last updated: March 2026. For questions, <Link to="/contact" className="text-link">contact us.</Link></p>
      </div>
    </PublicLayout>
  );
}

// ─── 404 ───────────────────────────────────────────────────────────────────
export function NotFound() {
  return (
    <PublicLayout>
      <div className="not-found">
        <span className="not-found__num">404</span>
        <h1 className="t-headline">This page doesn't exist.</h1>
        <p className="t-subtitle not-found__sub">But our studio does.</p>
        <div className="not-found__actions">
          <Link to="/" className="btn btn--primary">Back to Home</Link>
          <Link to="/collection" className="btn btn--outline">Browse Collection</Link>
        </div>
      </div>
    </PublicLayout>
  );
}
