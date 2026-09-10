# TatiSaathi

**An AI-driven virtual business manager for marginalized artisans — piloted with Mising handloom weavers of Assam.**

> "Tati" is the loom itself; "Saathi" is a companion. TatiSaathi is built to sit beside the loom, not replace it — helping an artisan run the business side of their craft without needing to read a spreadsheet, write a product description, or negotiate a fair price alone.

Built for Smart India Hackathon.

---

## 1. Vision

Across India, skilled handloom artisans — many of them women, many in rural or tribal communities — produce textiles of real craftsmanship but capture a small fraction of their final market value. The barriers are rarely about the craft itself:

- **Low digital and financial literacy** makes text-heavy apps, marketplaces, and even basic bookkeeping hard to use independently.
- **No direct market access** forces reliance on middlemen who set prices with little transparency.
- **No pricing intelligence** — artisans often cannot tell if a fair price for their labor and materials is ₹500 or ₹2,000.
- **Language and script barriers** exclude anyone who isn't comfortable in English or Hindi from most e-commerce tooling.

TatiSaathi's premise: an AI assistant can act as an artisan's own **virtual business manager** — listing products from a photo and a spoken description, suggesting fair prices, managing orders, and eventually handling buyer communication — so the artisan's time goes into weaving, not into fighting an unfamiliar app.

The long-term goal is a platform pattern that generalizes to other artisan communities (potters, bamboo weavers, block printers), but every early design decision is being made against one concrete pilot so the product stays grounded rather than generic.

## 2. Target Pilot: Mising Handloom Weavers, Assam

The first pilot community is **Mising weavers** in Assam, chosen deliberately rather than as a placeholder:

- Weaving (particularly on the *loin loom*) is a living, largely female-led household practice among the Mising community, producing textiles such as the *mekhela chador*, *gamosa*, and *ribi*-patterned cloth — often for personal, ceremonial, and local-market use rather than structured e-commerce.
- Many weavers operate individually or through small self-help groups (SHGs), with limited exposure to smartphone-based selling tools, and limited fluency in the English/Hindi UI conventions most apps assume.
- Products, patterns, and pricing conventions here are specific enough that a generic "sell your handicraft" app tends to feel foreign; a tool designed around this community's actual patterns, seasons, and vocabulary is more likely to be trusted and adopted.

This README, and the UI decisions in this repo (see [Design Rationale](#5-design-rationale)), treat the Mising pilot as the anchor. Anything that only makes sense for the pilot community lives in configuration/content, not hardcoded assumptions, so the same shell can be re-skinned for the next community.

## 3. What This Milestone Delivers

This step is the **frontend shell**: the container the rest of the product will be built inside.

- [x] Project scaffold (Vite + React + Tailwind + Framer Motion)
- [x] Installable PWA (`manifest.json`, icons, meta tags)
- [x] Global responsive layout: full-bleed on real phones, centered "phone card" preview on desktop
- [x] Bottom navigation — Home, New Product, Catalog, Profile
- [x] Home dashboard: greeting, quick stats, high-contrast primary CTA, voice-input affordance
- [ ] Guided "New Product" flow (photo capture → voice description → AI-suggested price) — next milestone
- [ ] Catalog with order/stock status — next milestone
- [ ] Profile, SHG membership, payouts — next milestone
- [ ] Backend: AI pricing/listing service, vernacular (Assamese/Mising) voice pipeline, offline sync — future milestone

## 4. Architecture

### 4.1 This repo (frontend prototype)

```
tati-saathi/
├── public/
│   ├── manifest.json          # PWA manifest
│   └── icons/                 # App icons (192/512/apple-touch/favicon)
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.jsx   # Global layout: responsive phone frame + outlet
│   │   │   └── BottomNav.jsx  # 4-tab bottom navigation
│   │   └── WeaveBorder.jsx    # Decorative handloom-motif divider
│   ├── pages/
│   │   ├── Home.jsx           # Dashboard: greeting + stats + primary CTA
│   │   ├── NewProduct.jsx     # Placeholder for guided listing flow
│   │   ├── Catalog.jsx        # Placeholder for product/order list
│   │   └── Profile.jsx        # Placeholder for artisan profile
│   ├── App.jsx                # Route table
│   ├── main.jsx                # React root + router
│   └── index.css               # Tailwind entry + accessibility base styles
├── index.html                  # PWA meta tags, font loading
├── tailwind.config.js          # Design tokens (color, type, radius)
└── package.json
```

### 4.2 Where this is heading (system architecture)

```
┌────────────────────────┐      ┌──────────────────────────────┐
│   TatiSaathi PWA        │      │   AI Business-Manager Layer   │
│   (this repo)           │      │                                │
│                          │      │  - Vision: photo → product     │
│  - Installable, offline-│◄────►│    attributes (fabric, motif)  │
│    tolerant shell        │ API  │  - NLU: vernacular voice/text  │
│  - Camera + voice capture│      │    → structured listing        │
│  - Bottom-nav app shell  │      │  - Pricing model: materials +  │
│                          │      │    labor time + market comps   │
└────────────────────────┘      │  - Buyer-facing catalog sync   │
                                  └───────────────┬────────────────┘
                                                   │
                                   ┌───────────────▼────────────────┐
                                   │  Marketplace / Buyer Channels   │
                                   │  (own storefront, WhatsApp,     │
                                   │   partner marketplaces)         │
                                   └──────────────────────────────────┘
```

The frontend is intentionally decoupled from any specific backend choice at this stage — it's built to talk to a REST/GraphQL API once the AI listing and pricing services exist, and to degrade gracefully (queue actions locally) when connectivity is poor, which is the common case in the pilot region.

## 5. Design Rationale

Design choices here are drawn from the pilot's material world rather than generic "handicraft app" defaults:

- **Color** — the palette is pulled from the dye tradition itself: natural **indigo** (primary), **madder-root red** (the single high-contrast accent, reserved for the one action that matters — "Add New Product"), **turmeric ochre** (secondary accent), and undyed **handspun cotton** as the base surface.
- **Type** — headings use **Baloo 2**, a rounded, high-x-height display face that stays legible at low reading fluency and large sizes; body/UI text uses **Inter** for clean, small-size legibility. No single interface element depends on reading dense text to be understood.
- **Low-literacy accessibility** — every primary action pairs an icon with a short label (never icon-only, never color-only for state), tap targets are large (64px+), and the home screen offers a **voice-input affordance** ("Speak instead") as a first-class alternative to typing.
- **Motif, not stereotype** — a slim repeating diamond band (`WeaveBorder`) nods to the supplementary-thread borders common in handloom textiles, used once as a structural divider rather than as decoration plastered across the UI.

## 6. Getting Started

```bash
npm install
npm run dev       # starts Vite dev server, default: http://localhost:5173
npm run build     # production build to /dist
npm run preview   # preview the production build locally
```

To test the installable PWA behavior, run `npm run build && npm run preview`, open the preview URL on a phone (or Chrome DevTools' device toolbar), and use "Add to Home Screen."

## 7. Tech Stack

| Layer      | Choice                          | Why |
|------------|----------------------------------|-----|
| Framework  | React + Vite                     | Fast dev loop for a hackathon timeline; easy PWA setup |
| Styling    | Tailwind CSS                     | Enforces a consistent design-token system across the team |
| Motion     | Framer Motion                    | Small, deliberate animation on the one element that needs it |
| Routing    | React Router                     | Simple tab-based navigation |
| Icons      | lucide-react                     | Consistent, accessible line icons |

## 8. Roadmap (Post-Hackathon)

1. Guided product listing: camera capture → on-device draft → AI-suggested title/description/price.
2. Assamese and Mising-language voice input/output.
3. Offline queueing for areas with intermittent connectivity.
4. SHG/cooperative multi-artisan accounts.
5. Buyer-facing storefront and WhatsApp catalog sharing.

---

*This is a hackathon prototype. Artisan names, figures, and activity shown in the UI are placeholder content pending pilot data.*
