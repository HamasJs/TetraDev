# TetraDev marketing site

Next.js + TypeScript + Tailwind CSS. Static export with a lazy-loaded Three.js brand sculpture and no external fonts or remote 3D assets.

## Local private review

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000. Nothing is deployed or connected to a domain.

## Content and configuration

Icons use `lucide-react`: Workflow, Globe, Smartphone, and BrainCircuit for the four services, plus matching icons for links, contact, theme, and animation controls. Service names and inquiry labels use title case with AI capitalized.


- `app/site-config.ts`: booking URL, contact email, WhatsApp number and display text, future demo URL, intended domain, logo path. Booking URL takes precedence over email. With neither configured, all contact buttons display “Contact details coming soon” and have no link. Contact email is `tetradev371@gmail.com`; WhatsApp is `+966553064813`.
- `app/page.tsx`: company page copy: four service areas (AI automation, web development, app development, AI engineering), a featured AI support offer, delivery process, and contact. Illustrative conversations have been removed. The future demo URL remains reserved in configuration.
- `public/tetradev-logo.png`: supplied logo cropped to its visible wordmark. Replace this file to update the logo. Original retained as `public/tetradev-logo-original.png`.
- `app/globals.css`: responsive layout and light/dark color tokens. Midnight navy, cobalt, mint, and coral.
- `app/components/theme-toggle.tsx`: accessible light/dark toggle, persisted in local storage. Dark is the default; an inline initialization script avoids a theme flash on repeat visits.
- `app/components/brand-scene.tsx`: animated Three.js sculpture based on the four-piece logo. Lazy-loads Three.js, caps pixel density and frame rate, pauses offscreen/in background tabs, respects reduced motion, includes a pause control, disposes GPU resources on cleanup, and retains a CSS fallback if WebGL is unavailable.
- `app/icon.svg`: favicon.

## Build and launch

`npm run build` creates the static site in `out/`. `npm run typecheck` checks TypeScript.

Prepared for `tetradev.ai`, but no DNS or hosting changes have been made. Before launch: configure contact details, review demos/copy, deploy to your chosen static host, connect the domain and HTTPS, then change `robots` in `app/layout.tsx` to allow indexing and add the canonical URL using `siteConfig.domain`. The current noindex setting is for review; local-only hosting is what keeps this version private.
