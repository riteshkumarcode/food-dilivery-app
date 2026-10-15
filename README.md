# Swigaato — Food Delivery Platform for Gonda, UP

Swigaato is an on-demand food-delivery platform built specifically for **Gonda, Uttar Pradesh**. It connects local restaurants, delivery riders, and customers through four integrated product surfaces.

---

## 🌟 Products Included

1. **📱 Customer App (13 Approved Screens)**:
   - **01 Splash Screen**: Warm brand identity with `#12663E` Leaf Green, `#F2B230` Turmeric Yellow, and the tagline *"Gonda ka apna food delivery"*.
   - **02 Onboarding Screen**: Delivery rider illustration with 30-min guarantee badge, bilingual messaging, and quick skip.
   - **03 Login Screen**: +91 phone number login with Hindi/English language switcher.
   - **04 OTP Verification Screen**: 4-digit code auto-fill and validation.
   - **05 Set Delivery Location**: Interactive Gonda road map with pin selector, geofencing validation (Civil Lines, Station Road, Bahraich Road), and outside-boundary protection.
   - **06 Home Screen**: Active order tracker pill, promotional banner (`GONDA50`), category circles (Biryani, Chaat, Thali, Pizza, Sweets), and 42 open restaurants in Gonda.
   - **07 Search & Discovery**: Instant live dish search, veg-only switch, under ₹200 filter, and quick category chips.
   - **08 Restaurant Menu**: Awadh Rasoi, Chaat Chaupal, Annapurna Bhojnalaya, and Spice Darbar; veg/non-veg dot badges, quantity steppers, and sticky cart bar.
   - **09 Cart & Bill Details**: Order items with steppers, cooking note input, coupon discount (`GONDA50`), distance-based delivery fee, platform fee, and GST calculations.
   - **10 Payment Screen**: UPI (Google Pay, PhonePe, UPI ID), Swigaato Wallet, Cards, and Cash on Delivery (COD).
   - **11 Live Order Tracking**: Animated route map from Station Road to Civil Lines, moving delivery scooter, customer OTP (`4812`), status milestones, and direct call to partner *Amit Yadav*.
   - **12 My Orders Screen**: Active live order tracking banner, past delivered orders with item summaries, and 1-click **Reorder** buttons.
   - **13 Account & Profile**: Customer profile, wallet balance with top-up options, saved addresses, language toggle, and merchant onboarding callout.

2. **🍽️ Restaurant Partner Portal ("Swigaato Merchant")**:
   - Live incoming order alert with synthetic Web Audio ring bell.
   - Kanban board: *New Orders* ➔ *Preparing* ➔ *Ready for Pickup*.
   - Order Accept (with prep time selector: 15m/25m/35m) or Reject with recorded reason.
   - Live **In Stock / Sold Out** menu availability toggles.
   - Restaurant Open / Closed kitchen status.

3. **🛵 Delivery Rider Portal ("Swigaato Rider")**:
   - Rider Online / Offline switch.
   - Incoming delivery assignment with 30s countdown.
   - Turn-by-turn navigation between restaurant and customer in Gonda.
   - Customer 4-digit OTP verification (`4812`) to complete delivery.
   - Today's earnings and delivery metrics.

4. **📊 Admin Command Center ("Swigaato HQ")**:
   - Real-time KPI metrics: Today's GMV, Orders Today, Active Riders, and Average Delivery Time (22 min).
   - Live Orders Log table with instant status overrides.
   - Gonda delivery service zones & geofence manager (Pincodes 271001, 271002, 271003).

---

## 🎨 Design System & Brand Palette

- **Primary**: `#12663E` (Leaf Green)
- **Accent**: `#F2B230` (Turmeric Yellow)
- **Background**: `#FFFBF2` (Warm Cream) / `#F7F1E4` (Subtle)
- **Text**: `#1F1A17` (Ink) / `#5A514A` (Muted)
- **Heading Font**: `Baloo 2` (ExtraBold)
- **Body Font**: `DM Sans`

---

## 🚀 Running the App

To view and interact with the application:

```bash
# Start local server (if not already running on port 8080)
python -m http.server 8080
```

Open your browser at:
[http://localhost:8080](http://localhost:8080)

Use the top navigation bar to switch between:
- **Product Roles**: `Customer App`, `Restaurant Partner`, `Delivery Rider`, `Admin HQ`
- **View Modes**: `📱 Mobile Frame` (Realistic phone bezel) or `💻 Full Screen`
- **Language**: `English` or `हिंदी`
- **13 Screens Jumper**: Click any numbered pill (`01 Splash` to `13 Account`) to jump directly to that screen.

---

## ⚡ Animations & Special USPs
- **🎉 Confetti Particle Explosion**: Triggered automatically on order placement and discount unlocks with physics-based velocity and rotation.
- **🛵 Radar GPS Pulse on Live Rider**: Continuous expanding concentric radar rings (`@keyframes radarWave`) around the delivery scooter on Screen 11.
- **🎁 Daily Gonda Bhog Surprise**: Interactive scratch/reveal card with instant flat ₹100 discount coupon (`GONDA50`).
- **📍 Fastest Delivery Hubs Geochecker**: Live interactive landmark pills (Civil Lines, Station Road, Gandhi Park, Bahraich Road, Pant Nagar) with ETA and 100% serviceability guarantee.
- **🌾 Local Gonda USPs**: 20-Min Gonda Express, Pure Desi Ghee & Handi seal, Zero Rain Surge guarantee, and Daily Tiffin Plans.
- **🔊 Zero-Latency Web Audio Engine**: Synthesized order bells, kitchen chime, and scooter horn without external asset load delays.

---

## 🌐 Free Instant Deployment Options

### Option 1: GitHub Pages (Automated Workflow Included)
1. Push this repo to GitHub.
2. In your repo, go to **Settings ➔ Pages**.
3. Under **Build and deployment > Source**, select **GitHub Actions**.
4. The `.github/workflows/deploy.yml` workflow automatically deploys `www/` to:
   `https://<your-username>.github.io/food-dilivery-app/`

### Option 2: Netlify (1-Click or Drag & Drop)
- **Drag & Drop**: Go to [Netlify Drop](https://app.netlify.com/drop) and drag the `www/` folder. It goes live in 5 seconds with a free `.netlify.app` URL.
- **Git Connected**: Connect `food-dilivery-app` repo on Netlify; `netlify.toml` is pre-configured with publish directory `www`.

### Option 3: Vercel
- Import repo on Vercel; `vercel.json` is pre-configured with output directory `www`.

