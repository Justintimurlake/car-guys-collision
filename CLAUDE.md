# Car Guys Collision — One-Page Website

Project brief for a single-page, cinematic website for Car Guys Collision, a body shop in Van Nuys, CA. Visual reference: Bugatti Solitaire FKP Hommage page (https://www.bugatti.com/solitaire/fkp-hommage).

---

## Business information

- **Name:** Car Guys Collision
- **Address:** 7620 Balboa Blvd, Van Nuys, CA 91406
- **Phone:** (818) 474-4442
- **Hours:** 9:00 AM – 5:00 PM, 7 days a week
- **Towing:** 24/7
- **Instagram:** @carguyscollision
- **Year founded:** Not specified — omit "since [year]" from copy

---

## Services (shown on site)

1. Collision Repair
2. Auto Body & Paint
3. Dent & Scratch Removal
4. Frame Straightening
5. Bumper Repair
6. Detailing & Polish
7. Oil Change
8. Insurance Claims Assistance
9. 24/7 Towing

## Insurance

Display logos / names of major carriers for credibility: **State Farm, Geico, Allstate, Progressive, AAA, Farmers, Liberty Mutual, USAA, Mercury** (and copy: "All major insurance accepted").

## Loaner car offer

Copy: *"If your insurance covers a loaner, we provide one right here at the shop."*

## Why Choose Us (all apply)

- Family-owned
- Lifetime warranty on paint / repairs
- I-CAR / ASE certified technicians
- Free estimates
- Direct repair program with major insurers
- All makes & models (luxury, exotic, EV)
- Same-day estimates

---

## Design & style

- Reference: **Bugatti Solitaire FKP Hommage** — cinematic, editorial, premium
- Pure black background, white/cream typography
- Big serif display font + clean sans for body
- Heavy letter-spacing, generous whitespace
- Minimal navigation (logo left, menu right)
- Section labels in tiny caps with line dividers
- Smooth scroll-triggered reveals and pin-based scroll animations (GSAP ScrollTrigger)

## Language

English only.

---

## Page structure

### 1. Hero
- Full-bleed looping video background (concatenation of `1.mp4` + `2.mp4` via ffmpeg)
- Headline (Option B, locked in):

> **CAR GUYS COLLISION**
> Bring it broken. Drive it perfect.
> Van Nuys · 7 Days · 24/7 Tow

**Site must be fully mobile-responsive.**

### 2. Scroll-pinned animation section
- Video pinned to viewport: `hf_20260514_225423_764b2bf2-9b4b-4b5e-87bb-d18e6f06735f.mp4`
- Video scrubbed by scroll position (or plays continuously while pinned)
- Text panels fade in/out over the video, covering:
  - **Services** (8 items)
  - **Why Choose Us / About** (7 points)

### 3. Testimonials (Bugatti editorial style — NOT standard cards)
- 3 testimonials, presented as full-bleed cinematic panels
- Each panel uses one of the 3 car photos in the folder
- Poetic quotes overlaid with large serif typography
- Scroll-pinned, one testimonial per "moment"
- Content: 3 realistic placeholder reviews (to be swapped with real ones later)

### 4. Contact + Map
- **No contact form.** Three direct CTA buttons:
  - 📞 **Call** — tel:+18184744442
  - 💬 **WhatsApp Business** — wa.me/18184744442
  - ✈️ **Telegram** — t.me/carguyscollision
- Embedded Google Map of 7620 Balboa Blvd, Van Nuys, CA 91406

### 5. Footer
- Logo
- Address
- Hours
- Instagram link only (no other social)

### Removed
- ❌ Before & After gallery (deliberately excluded)
- ❌ Contact form (replaced by direct buttons)

---

## Tech stack

- **Vanilla HTML + CSS + JavaScript** — no framework
- **GSAP + ScrollTrigger** for scroll-pinned animations
- Static deploy — drag-and-drop to Netlify, Vercel, GoDaddy, or any host
- No build step required

Rationale: heavy video/imagery loads faster on vanilla, easier to host, easier for the client to edit later. Next.js would add overhead with no benefit for a one-pager.

---

## Assets available in this folder

| File | Purpose |
|---|---|
| `logo.jpg` | Brand logo (nav + footer) |
| `1.mp4` | Hero video (part 1) — combine with 2.mp4 |
| `2.mp4` | Hero video (part 2) — combine with 1.mp4 |
| `hf_20260514_225423_*.mp4` | Scroll-pinned animation video (Services + Why Us section) |
| `hf_20260514_054605_*.png` | Testimonial panel image |
| `hf_20260514_230307_*.png` | Testimonial panel image |
| `hf_20260514_230438_*.png` | Testimonial panel image |

---

## Open items

All confirmed. Ready to build.

---

## Build status

In progress.
