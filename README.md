# ZiggyLinks — Frontend

Permanent jewellery studio website + in-studio POS + admin panel.
Built with React + Vite. Ready to deploy on Server.

---

## Project Structure

```
src/
  data/
    products.js     ← Mock product catalogue (replace with DB fetch)
    store.js        ← localStorage persistence (replace with Supabase/Firebase)
  pages/
    public/         ← Customer-facing pages
    studio/         ← In-studio POS (tablet)
    admin/          ← Inventory & sales admin
  components/
    layout/         ← Header, Footer, PublicLayout, StudioLayout
  styles/
    global.css      ← Design tokens, typography, base styles
```

---

## Pages

### Public
| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About |
| `/how-it-works` | How It Works |
| `/collection` | Browse Collection |
| `/collection/:slug` | Product Detail |
| `/gallery` | Gallery / Lookbook |
| `/visit` | Book a Visit |
| `/faq` | FAQ |
| `/contact` | Contact |
| `/testimonials` | Testimonials |
| `/aftercare` | Jewellery Aftercare |
| `/events` | Events & Pop-ups |
| `/policies` | Policies |

### Studio (POS — use on tablet)
| Route | Page |
|---|---|
| `/studio` | Sales / Transaction Builder |
| `/studio/receipt` | Sale Confirmation |
| `/studio/history` | Sales History |

### Admin
| Route | Page |
|---|---|
| `/admin` | Overview Dashboard |
| `/admin/inventory` | Inventory Manager |
| `/admin/sales` | Sales Report |
| `/admin/settings` | Settings |

---

## Deploy on Netlify

### Option A — Netlify CLI
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### Option B — Netlify UI (recommended)
1. Push this repo to GitHub
2. Go to https://app.netlify.com → "Add new site" → "Import an existing project"
3. Connect your GitHub repo
4. Build settings are auto-detected from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy**. Done.

Client-side routing is handled by `public/_redirects` and `netlify.toml`.

---

## Connect a Real Backend

All data functions are in `src/data/store.js`. Replace the localStorage
implementations with async calls to Supabase, Firebase, or any REST API.

Product data lives in `src/data/products.js`. Replace the exported array
with a fetch call from your database.

Function signatures are already async-compatible — just swap the bodies.

---

## Customise Brand

1. **Colors** — edit CSS variables in `src/styles/global.css` (`:root` block)
2. **Logo** — replace `logo-wordmark` span in `Header.jsx` with an `<img>` tag
3. **Fonts** — swap Google Fonts import in `global.css`
4. **Images** — replace `.img-block` placeholder divs with real `<img>` tags pointing to your image files or CDN URLs
5. **Copy** — all content is inline in page components, easy to find and edit

---

## Local Development

```bash
npm install
npm run dev
```

Visit http://localhost:5173
