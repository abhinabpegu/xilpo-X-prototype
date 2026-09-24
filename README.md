# Xilpo — an AI assistant for artisans

Initially focused on handloom artisans from Assam. This is a clickable, hardcoded
prototype of the artisan's workflow (nothing here is real AI yet).

## Run

```bash
npm install
npm run dev
```

Vite prints two addresses:

- `Local:   https://localhost:5173`      -> open on your laptop
- `Network: https://192.168.x.x:5173`    -> open on your phone (same Wi-Fi)

The dev server uses a self-signed https certificate, because phones only allow
camera access on https. On the phone, tap "Advanced" -> "Proceed" once.

## Flow (build order)

1. Take 3 photos (front, back, close-up)   <- built
2. AI looks at the photos
3. AI interviews her by voice
4. Listing + fair price
5. Save & share

Add each screen in `src/screens/` and register it in `src/screens/index.js`.
