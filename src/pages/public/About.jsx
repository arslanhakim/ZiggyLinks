import { Link } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout';
import ImagePlaceholder from '../../components/ImagePlaceholder';
import './About.css';

export default function About() {
  return (
    <PublicLayout>
      {/* Page Hero */}
      <section className="about-hero">
        <div className="about-hero__text container">
          <p className="t-label about-hero__label">Our Story</p>
          <h1 className="t-display about-hero__headline">
            Built on a belief<br /><em>that things should last.</em>
          </h1>
        </div>
        <div className="about-hero__image">
          <ImagePlaceholder src="/images/studio/founder.jpg" name="Abena Asante" detail="Founder" className="about-hero__img" />
        </div>
      </section>

      {/* Origin story */}
      <section className="section about-origin">
        <div className="container about-origin__grid">
          <div className="about-origin__copy">
            <p className="t-label">How It Started</p>
            <h2 className="t-title about-origin__title">
              Ziggy started with a chain and a question.
            </h2>
            <p className="t-body">
              In 2021, ZiggyLinks founder Abena Asante was living in London when she discovered permanent jewellery at a small studio in Shoreditch. She had a bracelet welded on, went home, and realised she hadn't taken it off six months later.
            </p>
            <p className="t-body">
              Back in Accra, she couldn't find anything like it. There were beautiful jewellers, incredible craftsmanship — but no one doing the permanent weld experience. So she trained, sourced ethically, and opened ZiggyLinks in 2022.
            </p>
            <p className="t-body">
              What started as a one-woman pop-up is now a proper studio with a full collection, a team of two, and a growing list of clients who still haven't taken their pieces off.
            </p>
          </div>
          <div className="about-origin__images">
            <div className="origin-img origin-img--top">
              <ImagePlaceholder src="/images/studio/interior.jpg" name="Studio interior" detail="East Cantonments, Accra" />
            </div>
            <div className="origin-img origin-img--bottom">
              <ImagePlaceholder src="/images/studio/weld-closeup.jpg" name="The weld moment" detail="Micro-weld process" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section about-values">
        <div className="container">
          <p className="t-label text-center">What We Stand For</p>
          <h2 className="t-headline text-center about-values__title">
            The things we don't compromise on.
          </h2>
          <div className="values-grid">
            {[
              { title: 'Craftsmanship', body: 'Every weld is done with precision. We take our time with every fitting, every measurement, every pulse of the welder.' },
              { title: 'Intention', body: 'We want every client to leave with something they genuinely love, not just something they purchased. That means honest guidance.' },
              { title: 'Quality Materials', body: 'We work exclusively with 14K and 18K gold fill, sterling silver, and rose gold fill. Nothing cheaper, nothing that will tarnish.' },
              { title: 'Experience First', body: 'The studio visit should feel like a ritual, not a transaction. We pour care into every detail, from the music to the conversation.' },
            ].map(v => (
              <div key={v.title} className="value-item">
                <h3 className="value-title">{v.title}</h3>
                <p className="t-body value-body">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section about-team">
        <div className="container">
          <p className="t-label">The Studio</p>
          <div className="team-grid">
            {[
              { name: 'Abena Asante', role: 'Founder & Lead Jeweller', bio: 'Trained in permanent jewellery welding in London. Obsessed with details, materials, and making clients feel seen.', img: '/images/studio/team-abena.jpg' },
              { name: 'Kofi Mensah', role: 'Studio Assistant & Client Experience', bio: 'Kofi handles bookings, client care, and makes sure the studio is always a calm, welcoming place to spend an hour.', img: '/images/studio/team-kofi.jpg' },
            ].map(person => (
              <div key={person.name} className="team-card">
                <ImagePlaceholder src={person.img} name={person.name} detail={person.role} className="team-img" />
                <div className="team-info">
                  <h3 className="team-name">{person.name}</h3>
                  <p className="t-label team-role">{person.role}</p>
                  <p className="t-body team-bio">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section about-cta">
        <div className="container--narrow text-center">
          <h2 className="t-headline about-cta__headline">
            Come and see<br /><em>for yourself.</em>
          </h2>
          <p className="t-body about-cta__body">
            The studio is a quiet, intentional space in Accra. We'd love to have you visit.
          </p>
          <Link to="/visit" className="btn btn--brass">Book a Visit</Link>
        </div>
      </section>
    </PublicLayout>
  );
}
