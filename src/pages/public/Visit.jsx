import PublicLayout from '../../components/layout/PublicLayout';
import './Visit.css';

export default function Visit() {
  return (
    <PublicLayout>
      <section className="visit-hero">
        <div className="container">
          <p className="t-label visit-hero__label">Studio Visit</p>
          <h1 className="t-display visit-headline">Come and<br /><em>see us.</em></h1>
        </div>
      </section>

      <div className="visit-body container">
        {/* Left: Info */}
        <div className="visit-info">
          <div className="visit-detail-block">
            <p className="t-label">Location</p>
            <h3 className="visit-detail-title">ZiggyLinks Studio</h3>
            <p className="t-body visit-detail-text">
              12 Ringway Link,<br />
              East Cantonments,<br />
              Accra, Ghana
            </p>
            <a href="https://maps.app.goo.gl/EnsfGz8DPrC5YnUx7" target="_blank" rel="noopener noreferrer" className="text-visit-link">
              Open in Maps →
            </a>
          </div>

          <div className="visit-detail-block">
            <p className="t-label">Hours</p>
            <div className="visit-hours">
              {[
                { day: 'Monday', hrs: 'Closed' },
                { day: 'Tuesday – Friday', hrs: '10:00 – 18:00' },
                { day: 'Saturday', hrs: '10:00 – 17:00' },
                { day: 'Sunday', hrs: 'Closed' },
              ].map(h => (
                <div key={h.day} className="visit-hour-row">
                  <span className="visit-hour-day t-small">{h.day}</span>
                  <span className={`visit-hour-time t-small ${h.hrs === 'Closed' ? 'visit-hour--closed' : ''}`}>{h.hrs}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="visit-detail-block">
            <p className="t-label">Contact</p>
            <div className="visit-contacts">
              <a href="https://wa.me/233551888606" className="visit-contact-item">
                <span className="visit-contact-icon">{'\u2706'}</span>
                <div>
                  <p className="visit-contact-label t-small">WhatsApp</p>
                  <p className="t-body">+233 55 188 8606</p>
                </div>
              </a>
              <a href="mailto:hello@ziggylinks.com" className="visit-contact-item">
                <span className="visit-contact-icon">{'\u2709'}</span>
                <div>
                  <p className="visit-contact-label t-small">Email</p>
                  <p className="t-body">hello@ziggylinks.com</p>
                </div>
              </a>
              <a href="https://www.instagram.com/ziggylinks.gh/" target="_blank" rel="noopener noreferrer" className="visit-contact-item">
                <span className="visit-contact-icon">{'\u25C8'}</span>
                <div>
                  <p className="visit-contact-label t-small">Instagram</p>
                  <p className="t-body">@ziggylinks.gh</p>
                </div>
              </a>
            </div>
          </div>

          <div className="visit-detail-block">
            <p className="t-label">What to Expect</p>
            <ul className="visit-expect-list">
              {[
                'A calm, private studio space — no retail rush.',
                'Your full attention for 30–45 minutes.',
                'Complimentary refreshment while you browse.',
                'An honest conversation about what suits you.',
                'The piece welded and ready before you leave.',
              ].map(item => (
                <li key={item} className="visit-expect-item t-body">{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Booking form */}
        <div className="visit-form-col">
          <div className="visit-form-card">
            <h2 className="visit-form-title">Request a Visit</h2>
            <p className="t-small visit-form-sub">
              Fill this in and we'll confirm your slot via WhatsApp within a few hours.
            </p>
            <form className="visit-form" onSubmit={e => { e.preventDefault(); alert('Request received! We\'ll confirm via WhatsApp shortly.'); }}>
              <div className="form-row">
                <div className="form-field">
                  <label className="t-label form-label">Your Name</label>
                  <input className="input" type="text" placeholder="Ama Boateng" required />
                </div>
                <div className="form-field">
                  <label className="t-label form-label">Phone / WhatsApp</label>
                  <input className="input" type="tel" placeholder="+233 ..." required />
                </div>
              </div>
              <div className="form-field">
                <label className="t-label form-label">Email (optional)</label>
                <input className="input" type="email" placeholder="you@example.com" />
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label className="t-label form-label">Preferred Date</label>
                  <input className="input" type="date" required />
                </div>
                <div className="form-field">
                  <label className="t-label form-label">Preferred Time</label>
                  <select className="input">
                    <option>Morning (10–12)</option>
                    <option>Midday (12–2)</option>
                    <option>Afternoon (2–5)</option>
                  </select>
                </div>
              </div>
              <div className="form-field">
                <label className="t-label form-label">Number of people</label>
                <select className="input">
                  <option>Just me</option>
                  <option>2 people</option>
                  <option>3 people</option>
                  <option>4+ people</option>
                </select>
              </div>
              <div className="form-field">
                <label className="t-label form-label">Pieces you're interested in (optional)</label>
                <textarea className="input visit-textarea" rows={3} placeholder="e.g. I'm thinking a gold anklet and maybe a bracelet..." />
              </div>
              <button type="submit" className="btn btn--primary btn--full visit-submit">
                Request My Visit
              </button>
              <p className="t-small visit-form-note">
                We'll confirm within 4–6 hours on business days.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Map / directions */}
      <div className="visit-map container">
        <div className="visit-map__card">
          <p className="t-label visit-map__label">Find Us</p>
          <p className="visit-map__address">
            12 Ringway Link, East Cantonments, Accra, Ghana
          </p>
          <a href="https://maps.app.goo.gl/EnsfGz8DPrC5YnUx7" target="_blank" rel="noopener noreferrer" className="btn btn--outline visit-map__btn">
            Open in Google Maps
          </a>
        </div>
      </div>
    </PublicLayout>
  );
}
