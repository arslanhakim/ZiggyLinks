import { Link } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout';
import ImagePlaceholder from '../../components/ImagePlaceholder';
import './HowItWorks.css';

const STEPS = [
  {
    num: '01',
    title: 'Book your visit',
    body: "Reserve a slot through our booking form or WhatsApp. We recommend 30\u201345 minutes for first-time clients. No walk-ins \u2014 the experience works best when we have time dedicated to you.",
    note: "We're open Tuesday\u2013Saturday, 10am\u20136pm.",
    img: '/images/studio/studio-02.png',
    imgDetail: 'The studio',
  },
  {
    num: '02',
    title: 'Browse in-studio',
    body: "When you arrive, we'll show you the full collection \u2014 chains, anklets, bracelets, and rings. You can hold each piece, feel the weight, compare materials. We'll talk you through width, finish, and drape.",
    note: 'Bring inspiration photos if you have them.',
    img: '/images/studio/studio-03.png',
    imgDetail: 'Browsing pieces',
  },
  {
    num: '03',
    title: 'Choose and fit',
    body: "Once you've decided, we'll drape the piece on your wrist, ankle, or neck to find the perfect fit. We measure carefully \u2014 snug but not tight. We'll make small adjustments until it sits right.",
    note: 'Sizing is permanent, so we take our time here.',
    img: '/images/studio/studio-01.png',
    imgDetail: 'Fitting the piece',
  },
  {
    num: '04',
    title: 'The weld',
    body: "A jeweller's pulse arc welder fuses the link in a tiny, precise spark. It doesn't touch your skin and you'll barely feel a thing. The whole weld takes under five seconds.",
    note: 'Safe, painless, and surprisingly satisfying.',
    img: '/images/studio/weld-process-01.png',
    imgDetail: 'Micro-weld',
  },
  {
    num: '05',
    title: 'Wear it forever',
    body: "No clasp to fiddle with, no fastener to lose. Your piece is yours now \u2014 permanently. Most clients forget they're wearing it within a week.",
    note: 'Pieces can be removed with scissors if ever needed.',
    img: '/images/studio/studio-04.png',
    imgDetail: 'Worn for life',
  },
];

const FAQS_QUICK = [
  { q: 'Does it hurt?', a: "Not at all. The welder doesn't touch your skin. You may feel a tiny warmth near the weld point but nothing uncomfortable." },
  { q: 'Can I shower, swim, and sleep in it?', a: "Yes \u2014 that's the whole point. 14K and 18K gold fill and sterling silver are designed to be worn continuously." },
  { q: 'What if I need it removed?', a: 'A small pair of scissors can cut through it. It can also be re-welded afterwards if you wish.' },
  { q: 'Can I bring a friend?', a: 'Absolutely. Many of our best visits are pairs or small groups \u2014 friends, sisters, mothers and daughters.' },
];

export default function HowItWorks() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="hiw-hero">
        <div className="container">
          <p className="t-label hiw-hero__label">The Process</p>
          <h1 className="t-display hiw-hero__title">
            How permanent<br />jewellery works.
          </h1>
          <p className="hiw-hero__sub">
            From booking to wearing \u2014 everything you need to know before your visit.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="section hiw-steps">
        <div className="container">
          {STEPS.map((step) => (
            <div key={step.num} className="hiw-step">
              <span className="hiw-step__num">{step.num}</span>
              <div className="hiw-step__content">
                <h2 className="hiw-step__title">{step.title}</h2>
                <p className="t-body hiw-step__body">{step.body}</p>
                <p className="hiw-step__note">{step.note}</p>
              </div>
              <div className="hiw-step__img">
                <ImagePlaceholder
                  src={step.img}
                  name={step.title}
                  detail={step.imgDetail}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick FAQs */}
      <section className="section hiw-faq">
        <div className="container--content">
          <p className="t-label">Common Questions</p>
          <h2 className="t-headline hiw-faq__title">Quick answers.</h2>
          <div className="hiw-faq-grid">
            {FAQS_QUICK.map(item => (
              <div key={item.q} className="hiw-faq-item">
                <h3 className="hiw-faq-q">{item.q}</h3>
                <p className="t-body hiw-faq-a">{item.a}</p>
              </div>
            ))}
          </div>
          <div className="hiw-faq__cta">
            <Link to="/faq" className="btn btn--outline">See All FAQs</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section hiw-cta">
        <div className="container--narrow text-center">
          <h2 className="t-headline">Ready when you are.</h2>
          <p className="t-body hiw-cta__body">
            The whole experience takes under an hour. Book your visit and we will handle the rest.
          </p>
          <Link to="/visit" className="btn btn--primary">Book a Visit</Link>
        </div>
      </section>
    </PublicLayout>
  );
}
