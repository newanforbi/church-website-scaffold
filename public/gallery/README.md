# Gallery

`/gallery` is Instagram-only.

## Full-bleed photo grid (recommended)

Set these in `.env.local` / Vercel:

```
INSTAGRAM_ACCESS_TOKEN=...
INSTAGRAM_USER_ID=...
```

The page then loads photos edge-to-edge across the desktop viewport; visitors
scroll down and can use **Load more** for older posts.

## Without API credentials

The page falls back to Instagram’s official profile embed (recent posts only,
Instagram-capped width).
