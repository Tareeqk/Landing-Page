# Next steps — Become a Driver / Become a Partner + Urdu spacing

Handoff notes from a backend session on `tareeqk-v2-be`. Two things left to build here, plus one thing already fixed that's worth knowing about.

## 1. Backend is ready — API contract

A new public, unauthenticated, rate-limited endpoint now exists on the backend for the partner/fleet form:

```
POST {VITE_BASE_URL}/api/v1/partner-applications
Content-Type: application/json
```

Request body:
```json
{
  "contact_name": "Ahmed Ali",       // required — the person filling the form
  "company_name": "Ahmed Fleet Services", // required — the fleet/company name
  "email": "ahmed@example.com",      // required
  "phone": "+971501234567",          // required
  "trade_license_number": "DED-12345" // optional
}
```

Response — same `{success, data}` / `{success, error}` envelope every other `api/v1` endpoint uses (identical shape to `/api/v1/contact-us`, which `ContactForm.jsx` already calls — copy that component's `handleSubmit` almost verbatim):
- Success (201): `{"success": true, "data": {"id": 42}}`
- Validation error (422): `{"success": false, "error": {"code": "VALIDATION_ERROR", "message": "...", "fields": {...}}}`

Rate limited to 5 requests/minute per IP — if you hit it while testing, that's expected, not a bug.

CORS is already configured for this origin (`config/cors.php` on the backend allows `https://tareeqk.ae` / `https://www.tareeqk.ae` for all `api/*` paths), so no backend changes needed for that.

What happens after submit: the backend creates a `Company` record with `status: Pending` — no `company_code` yet. A Tareeqk admin reviews it in the admin panel and assigns a code once vetted. There's no auto-approval and nothing else to build server-side for this flow.

## 2. Build: "Become a Driver" + "Become a Partner" section

Design a new section (or page — your call based on how it fits the nav) with two paths, matching the site's existing visual language (the amber/yellow brand color, rounded-2xl cards, `data-aos` scroll animations, the same font/spacing scale used in `ContactForm.jsx` and `Service.jsx` — read a couple of existing sections before styling this one, don't invent a new visual style).

**Become a Driver** — this is just external links, no form. The app-store link component already exists and already has a driver variant ready to go:
```jsx
import { DownloadApps } from "@/Components/DownloadApps";
<DownloadApps type="driver" />
```
That's it — it renders the Google Play + App Store badges pointing at the driver app. Don't rebuild this.

**Become a Partner / Vendor / Fleet** — a form collecting exactly the 5 fields in the API contract above (contact name, company/fleet name, email, phone, trade license number — last one optional, say so in the UI). Build it as a sibling to `src/Components/ContactForm.jsx`:
- Same `fetch(`${baseUrl}/api/v1/partner-applications`, ...)` pattern, same try/catch/finally + loading state, same success/error alert handling (or upgrade both forms to a nicer inline toast if you want, but keep them consistent with each other).
- Wire it through `react-i18next` like everything else here — add a new top-level key (e.g. `partnerForm`) to all three `public/locales/{en,ar,ur}/common.json` files, following the exact key names already used under `contact` in those same files (`eyebrow`, `heading`, `description`, `nameLabel`, `namePlaceholder`, etc.) so translators/future-you aren't guessing at a different convention.
- RTL: this codebase already uses Tailwind logical properties in newer components (`start-`/`end-` instead of `left-`/`right-` — see `ContactForm.jsx`'s ambient background blobs) — do the same here, don't use physical `left-`/`right-` utilities.
- Phone formatting: `ContactForm.jsx` prefixes the mobile input with `+971` before sending (UAE-only number entry) — decide if that's right for a fleet-partner form too (fleets could be registering from elsewhere) or if it should take a full international number instead. Worth a quick judgment call, not a big deal either way.

## 3. Already fixed: Urdu line-height collision

You flagged wrapped Urdu text colliding across lines (card descriptions, cookie-consent banner, "why us" steps). Root cause: `html[lang="ur"] h1 { line-height: 1.3; }` in `src/index.css` was the *only* Urdu-specific line-height rule in the whole site, and it only covered `<h1>` — every `<p>`/`<li>` (where the actual wrapping prose lives) was inheriting whatever tight Latin-tuned `line-height` each component happened to set (or the browser default). Noto Nastaliq Urdu's diagonal stacking and tall loops need much more vertical room than Latin or Arabic Kufic text to avoid this.

Fixed with a global rule added right next to the existing `html[lang="ur"]` font-family block in `src/index.css`:
```css
html[lang="ur"] p,
html[lang="ur"] li {
  line-height: 2 !important;
}
```
(`2` matches `leading-loose` — the same value `CJI.jsx` already used locally for one section before this fix, via a manual `isUrdu ? "leading-loose" : ""` — that pattern is now redundant everywhere except CJI.jsx itself, which you can leave as-is since it still works, just no longer needs to be copied elsewhere.)

**Please verify visually** (`npm run dev`, switch to Urdu, scroll the whole homepage + a couple of inner pages) — this was fixed and reasoned through carefully but not seen rendered in a real browser from this session. If anything still looks cramped, it's likely a component setting `line-height`/`leading-*` directly on something that *isn't* a `p` or `li` tag (a `div`/`span` used for a text block) — extend the selector rather than reintroducing a one-off per-component fix.
