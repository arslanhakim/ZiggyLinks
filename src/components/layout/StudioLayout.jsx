import { Link, NavLink } from 'react-router-dom';
import './StudioLayout.css';

const STUDIO_LINKS = [
  { to: '/studio', label: 'Sales', icon: '◈' },
  { to: '/studio/history', label: 'History', icon: '◷' },
];

const ADMIN_LINKS = [
  { to: '/admin', label: 'Overview', icon: '◉' },
  { to: '/admin/inventory', label: 'Inventory', icon: '▦' },
  { to: '/admin/sales', label: 'Sales', icon: '◈' },
  { to: '/admin/settings', label: 'Settings', icon: '◎' },
];

export default function StudioLayout({ children, mode = 'studio' }) {
  const links = mode === 'admin' ? ADMIN_LINKS : STUDIO_LINKS;
  const title = mode === 'admin' ? 'ZiggyLinks Admin' : 'ZiggyLinks Studio';

  return (
    <div className="studio-shell">
      <aside className="studio-sidebar">
        <div className="studio-sidebar__brand">
          <Link to="/" className="studio-brand-link">
            <span className="studio-logo">ZiggyLinks</span>
            <span className="studio-mode-label">{mode === 'admin' ? 'Admin' : 'Studio'}</span>
          </Link>
        </div>

        <nav className="studio-nav">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/studio' || link.to === '/admin'}
              className={({ isActive }) =>
                `studio-nav-link ${isActive ? 'studio-nav-link--active' : ''}`
              }
            >
              <span className="studio-nav-icon">{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="studio-sidebar__footer">
          {mode === 'studio' ? (
            <Link to="/admin" className="mode-switch">↗ Admin Panel</Link>
          ) : (
            <Link to="/studio" className="mode-switch">↗ Studio POS</Link>
          )}
          <Link to="/" className="mode-switch">← Public Site</Link>
        </div>
      </aside>

      <div className="studio-main">
        {children}
      </div>
    </div>
  );
}
