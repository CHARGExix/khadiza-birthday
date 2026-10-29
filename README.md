# Limitless Wishes — Happy Birthday, Khadiza Tur Nur

A responsive, English-language birthday experience inspired by Gojo Satoru and anime: original SVG character art, blue and purple infinity energy, a sealed birthday letter, animated cake and candles, confetti, three interactive momos, and surprise gifts.

## Experience

- Unlock a personal birthday letter.
- Blow out five candles, then relight them.
- Enjoy three momos and refill the plate.
- Open three surprise birthday reminders.
- Turn on an optional, locally synthesized birthday melody.
- Pause motion; the operating system's reduced-motion preference is respected.
- Keyboard navigation, focus indicators, dialog focus management, and status announcements.

## Development

Use Node.js 22.12+ (tested with Node.js 24).

```sh
npm ci
npm run dev
npm run build
npm run preview
```

## GitHub Pages

The production build is included in `docs/`. Pages serves `main` → `/docs`.

After changing source files, run `npm run publish:prepare`, commit both source and `docs/`, and push. Relative asset paths support GitHub project Pages and ordinary static hosting.

## Credits and privacy

Unofficial personal anime fan tribute; not affiliated with the original creators. All character, cake, and momo artwork is drawn in SVG/CSS in this project. Icons are from Lucide. Fonts load from Google Fonts with local fallback fonts. Audio is synthesized in the browser only after it is enabled. No analytics, microphone access, accounts, or personal data collection.
