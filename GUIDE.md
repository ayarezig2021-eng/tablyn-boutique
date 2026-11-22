# Tablyn V2 — launch guide (static site: Supabase + GitHub + Vercel)

## A. Supabase (your existing project)
1. SQL Editor > New query > paste `supabase_schema.sql` > Run. (Safe if tables already exist; if your old `orders` table has other columns, rename it first or tell your advisor/me.)
2. Authentication > Sign In / Providers > Email: for the demo, turn OFF "Confirm email" (or keep it ON and confirm by mail).
3. Project Settings > API Keys: copy the Project URL and the **publishable** key (never the secret/service_role key).
4. Open `supabase-config.js` in VS Code and fill `supabaseUrl`, `supabaseKey`, `supportEmail`. Save.

## B. Test locally
VS Code > right-click `index.html` > Open with Live Server.
Test: add to cart > Checkout > Create account > fill the order form > Send.
Then Supabase > Table Editor > `orders`: your order must appear.

## C. Make yourself admin
Create your account on the site, then in SQL Editor run (your email):
`update public.profiles set role='admin' where email='YOUR-EMAIL';`
Sign out / sign in: an Admin button appears; it shows the real orders.

## D. GitHub (see Fiche_GitHub_6_Etapes.pdf)
New public repo `tablyn-boutique`. Upload the CONTENT of this folder (index.html at the root). Only the publishable key may be in the repo.

## E. Vercel
vercel.com > Add New > Project > import the repo > Framework: Other > build command empty > Deploy.
Then replace `tablyn-sieu.vercel.app` by your real address in: index.html (canonical, og:url, og:image, JSON-LD), privacy/terms/cookies.html (canonical), robots.txt, sitemap.xml (VS Code: Ctrl+Shift+H, replace in all files).

## F. TP4 audit
Before/After Lighthouse (Mobile, private window), Google Trends keyword, before/after code, git add / commit / push.

## Still to do by the owner
- Replace the 3 placeholder images in /assets with your real ones (same file names, JPG/PNG, compressed).
- Fill the [bracketed] legal details in privacy.html, terms.html, cookies.html.

## Notes
- `tailwind.css` is the compiled styles (the page no longer loads Tailwind from a CDN). If you add new Tailwind classes to index.html, they will not appear until the CSS is rebuilt.
- Prices are re-checked by the database (section 6 of `supabase_schema.sql`). If you change prices in index.html (MATERIALS, SHAPES, ZONES, FREE_OVER), change them in that SQL function too.
