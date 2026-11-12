# CDMX Bingo

A Mexico City (CDMX) photo bingo game: complete the challenges, snap photos, and share your board.

**Live:** https://cdmx-bingo.vercel.app

## Features

- **25 CDMX squares:** Karol G, Tacos al pastor, Xochimilco boat, Mariachi band, Pan dulce, Airport moment and more, with a free center square
- **Photo check-off:** tap a square to snap or upload a photo; progress is saved on the device
- **Bingo detection:** rows, columns and diagonals, with confetti and cheers
- **English / Español toggle:** an EN | ES switch on the sign-in page and the board; the choice is remembered per device
- **Reset with confirmation:** "Reset Card" asks you to confirm (Cancel / Yes, reset) before clearing photos and checked squares
- **Phone-friendly:** inputs won't zoom iOS Safari, so the board fits the screen after sign-in
- **Sharing:** share your board by text, email or link; VIP members can customize squares and share player links
- **Papel picado design:** rosa, amber, verde, purple and teal tiles with the Bowlby One title

## Development

```bash
npm install   # or pnpm install
npx vite      # local dev server
npx vite build
```

Pushing to `main` deploys to Vercel automatically.

## Notes

- Email sign-up writes to a Supabase `leads` table, but that project no longer exists. Players still get in, and emails are kept only in their browser (`pendingLeads` in localStorage) until a new Supabase project is set up (SQL in `src/supabaseClient.ts`).
- Translations live in `src/i18n.tsx`; English text is the key, so untranslated or custom squares show as typed.
