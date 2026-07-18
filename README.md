# Church Website Scaffold

A basic, production-ready church website scaffold built with [Next.js](https://nextjs.org) (App Router), TypeScript, and Tailwind CSS &mdash; engineered to deploy on [Vercel](https://vercel.com) with zero configuration.

## Pages

- **Home** &mdash; hero, service times, latest sermon, upcoming events, giving CTA
- **About** &mdash; story, beliefs, team
- **Sermons** &mdash; message archive
- **Events** &mdash; upcoming events list
- **Give** &mdash; online giving CTA and other ways to give
- **Contact** &mdash; contact form backed by an API route

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customizing

Almost everything site-specific lives in one file: **`lib/site-config.ts`**. Update the church name, tagline, address, phone, email, service times, nav links, social links, and giving URL there and it propagates through the nav, footer, home page, and metadata.

Sample content used as placeholders:

- `lib/sermons-data.ts` &mdash; swap for a CMS or database query later

Recurring gatherings (Sunday services, Shiloh Hour, Digging Deep, Power Night) live in `lib/recurring-events.ts` as day/time rules, not fixed dates. The "Upcoming Events" sections compute the next real occurrences from those rules on every request (revalidated hourly), so they stay accurate indefinitely — add, remove, or edit a rule there rather than a list of dates.

Global styling (colors, fonts) lives in `tailwind.config.ts` and `app/globals.css`.

## Contact Form

`app/api/contact/route.ts` is a Vercel Edge Function that validates and receives submissions from the contact form (`components/contact-form.tsx`). Wire up an email provider (e.g. [Resend](https://resend.com), Postmark) or a CRM webhook where noted in that file, and add any required secrets to `.env.local` (see `.env.example`).

## Deploying to Vercel

This project requires no special configuration &mdash; Vercel auto-detects Next.js.

1. Push this repo to GitHub (already done if you're reading this from the repo).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Keep the default build settings (`next build`) and click **Deploy**.
4. Add any environment variables from `.env.example` in the Vercel project settings if you've wired up an email provider.

Every push to your default branch redeploys production; every PR gets its own preview deployment automatically.

### Before going live

- Replace `url` in `lib/site-config.ts` with your production domain (used for metadata, sitemap, and robots.txt).
- Replace the placeholder Unsplash images in `app/page.tsx` and `app/about/page.tsx` with real photos.
- Set `give.onlineGivingUrl` in `lib/site-config.ts` to your real giving platform link.

## Scripts

- `npm run dev` &mdash; start the dev server
- `npm run build` &mdash; production build
- `npm run start` &mdash; run the production build locally
- `npm run lint` &mdash; lint the project
- `npm run typecheck` &mdash; run TypeScript without emitting
