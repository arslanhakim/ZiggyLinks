import { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout';
import './FAQ.css';

const FAQ_DATA = [
  {
    category: 'About the Process',
    items: [
      { q: 'What exactly is permanent jewellery?', a: 'Permanent jewellery is a chain, anklet, bracelet, or necklace that is welded directly onto you — with no clasp. It\'s designed to be worn continuously, through showering, swimming, sleeping, and everything in between.' },
      { q: 'Does the welding hurt?', a: 'No. We use a jeweller\'s pulse arc welder. The weld happens at the clasp, away from your skin. You might feel a tiny warmth near the weld point, but the process is painless.' },
      { q: 'How long does the appointment take?', a: 'Most visits take 30–45 minutes. This includes browsing, selecting, fitting, and the weld itself. If you\'re bringing friends or getting multiple pieces, allow more time.' },
      { q: 'Can I come without an appointment?', a: 'We\'re appointment-only. Walk-ins aren\'t something we can accommodate — the experience works best when we have time dedicated to you. Booking takes just a few minutes.' },
    ],
  },
  {
    category: 'Wearing & Care',
    items: [
      { q: 'Can I shower with it on?', a: 'Yes. That\'s one of the best things about it. Gold fill and sterling silver are made to be worn daily. Water, soap, and sweat won\'t harm them.' },
      { q: 'What about swimming in the sea or pool?', a: 'Occasional exposure is fine. Prolonged saltwater or chlorinated water can affect the finish over time, especially on sterling silver. We recommend a quick rinse after swimming.' },
      { q: 'Can I sleep with it on?', a: 'Yes. Most clients say they forget it\'s there within a week. The pieces are designed to move with you.' },
      { q: 'Will it tarnish?', a: 'Sterling silver may develop a natural patina over time. Gold fill is very resistant to tarnishing. A gentle clean with a soft cloth every few weeks keeps both looking fresh.' },
    ],
  },
  {
    category: 'Removal & Adjustment',
    items: [
      { q: 'Can it be removed if I need it off?', a: 'Yes. A small pair of scissors will cut through the chain. The piece can be re-welded afterwards if you wish — just bring it back to us.' },
      { q: 'What if I need an MRI scan?', a: 'Gold fill and sterling silver are non-magnetic metals and generally MRI-safe. However, always inform your radiologist about any jewellery. In most cases they\'ll be comfortable proceeding, or will ask you to cut it off temporarily.' },
      { q: 'Can I re-weld it after removal?', a: 'Yes. Bring the piece back to us and we can re-weld it. We charge a small re-weld fee. This applies as long as the chain itself is undamaged.' },
    ],
  },
  {
    category: 'Pricing & Materials',
    items: [
      { q: 'How is the price calculated?', a: 'Pricing is listed per piece, but the final cost varies slightly based on the length of chain used (which depends on your wrist, ankle, or neck measurement). We\'ll give you an exact price at the fitting before we weld.' },
      { q: 'What materials do you use?', a: 'We work with 14K gold fill, 18K gold fill, sterling silver, and rose gold fill. We do not use gold-plated chains or base metal, as these tarnish and wear over time. Our materials are high quality and designed for permanent wear.' },
      { q: 'Do you offer gift vouchers?', a: 'Yes. WhatsApp or email us and we\'ll set one up for you. A studio experience voucher makes a beautiful gift.' },
    ],
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'faq-item--open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className="faq-icon">{open ? '–' : '+'}</span>
      </button>
      {open && <div className="faq-answer t-body">{a}</div>}
    </div>
  );
}

export default function FAQ() {
  return (
    <PublicLayout>
      <section className="faq-hero">
        <div className="container">
          <p className="t-label faq-hero__label">Frequently Asked</p>
          <h1 className="t-headline faq-headline">Common Questions</h1>
          <p className="t-subtitle faq-sub">
            Everything you'd want to know before your visit.
          </p>
        </div>
      </section>

      <div className="faq-body container--content">
        {FAQ_DATA.map(section => (
          <div key={section.category} className="faq-section">
            <h2 className="faq-section-title">{section.category}</h2>
            <div className="faq-list">
              {section.items.map(item => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        ))}

        <div className="faq-contact-strip">
          <p className="t-subtitle">Still have a question?</p>
          <div className="faq-contact-actions">
            <a href="https://wa.me/233248310045" className="btn btn--outline">WhatsApp Us</a>
            <Link to="/contact" className="btn btn--ghost">Send an Email</Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
