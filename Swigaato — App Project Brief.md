# Swigaato — App Project Brief

Oct 14, 2026 · @Aegis

## Overview

Swigaato is a food-delivery platform that serves only Gonda, Uttar Pradesh. It connects local restaurants, delivery riders and customers through three mobile apps and one admin panel.

The national apps treat Gonda as a small market. Swigaato's edge is being local: Gonda's own kitchens, fast delivery inside a small radius, Hindi + English, UPI and cash on delivery, and support that knows the city.

The goal of this project is a launch-ready platform. A customer can order, pay, track and rate. A restaurant can accept and prepare. A rider can pick up and deliver. The Swigaato team can run and control all of it from the admin panel.

## Objectives & success metrics

Launch is a success when a real order runs end to end across all four products with no manual workaround. The targets below are for the Swigaato team to set; blanks are marked.

| Objective | Metric | Launch target |
| --- | --- | --- |
| Restaurants live at launch | Approved, menu-complete restaurants | \[TARGET\] |
| Fast delivery | Average order-to-door time | \[TARGET\] min |
| Reliable orders | Orders cancelled by restaurant or system | under \[TARGET\]% |
| Customer adoption | Monthly ordering customers after 3 months | \[TARGET\] |
| Repeat use | Customers ordering again within 30 days | \[TARGET\]% |
| Rider coverage | Riders online at lunch and dinner peaks | \[TARGET\] |
| Quality | Average food and delivery rating | 4.2+ |

## Users & products

Four groups use Swigaato, each through its own product.

&#91;embedded content: Swigaato platform · 4 products, 1 backend, 5 services\]

The apps never talk to each other directly. The backend applies the Gonda service area, pricing and payment rules for all of them.

## Feature scope

All four products ship together at launch. The customer app follows the 13 approved screen designs.

### Customer app

- Phone number + OTP login, Hindi / English switch
- Set delivery location on a map; addresses outside Gonda's service area are blocked
- Home: offers banner, food categories, restaurant list with rating, time and distance
- Search with filters: dishes, restaurants, veg only, under ₹200
- Restaurant menu: veg / non-veg markers, add-ons, ADD and quantity stepper, sticky cart bar
- Cart: bill breakdown, coupon, cooking note, address change
- Payment: UPI apps, UPI ID, debit / credit card, cash on delivery, Swigaato wallet
- Live tracking: rider on map, status timeline, delivery OTP, call rider
- My orders, reorder, rate food and delivery separately
- Account: saved addresses, wallet, offers, help and support tickets, logout
- Push notifications for every order status change

### Restaurant partner app

- Onboarding with KYC: FSSAI licence, GSTIN (optional), bank details, owner ID
- New-order alert with loud ring; accept or reject with a prep time
- Order board: New, Preparing, Ready for pickup
- Menu management: item on / off, price, photos, categories
- Open / close toggle and opening hours
- Earnings, weekly settlements, ratings, support

### Delivery rider app

- Onboarding with KYC: driving licence, vehicle RC, ID proof, bank details
- Online / offline toggle
- Delivery request with accept / decline countdown
- Navigation to restaurant, then customer
- Pickup confirmation; delivery confirmed with customer's 4-digit OTP
- Cash-on-delivery collection tracking
- Earnings (today / week), incentives, payout history

### Admin panel

- Dashboard: today's orders, sales, live orders on a map, riders online, average delivery time
- Orders: search, full timeline, manual rider assignment, cancel, refund
- Restaurants: approve KYC, commission %, COD on / off, menu editor, hours
- Riders: approve KYC, live map, earnings, payouts
- Customers: search, wallet adjustment with reason, block
- Coupons, home banners and categories
- Service area editor: draw Gonda delivery zones on a map
- Fees and settings: delivery fee slabs, platform fee, GST, COD limit, auto-reject timer
- Settlement and payout reports with CSV export
- Support tickets, staff accounts with roles, audit log of admin actions

## Core business rules

These rules are enforced on the server, so no app can bypass them.

**Service area.** The admin draws Gonda delivery zones on a map, with a pincode list as backup. Addresses outside the zones cannot be saved, and the server rejects any order outside them.

**Order flow.** Every change is logged with time and who made it.

1. Placed by customer
2. Accepted by restaurant (or rejected; no answer within the timer, default 3 min, means auto-reject)
3. Preparing
4. Ready for pickup
5. Rider assigned
6. Picked up
7. Delivered (confirmed with the customer's OTP)

An order can be cancelled with a recorded reason. A rejected or cancelled prepaid order is refunded automatically, to the original payment method or the wallet.

**Pricing.** Bill = item total − coupon + delivery fee + platform fee + GST and restaurant charges.

- Delivery fee follows admin-set distance slabs
- Platform fee and GST rate are set in admin
- Each bill line is saved on the order and never recalculated later

**Coupons.** Flat or percentage, maximum discount cap, minimum order, first-order only, per-customer limit, validity dates. A coupon can be platform-wide or for one restaurant, and is marked as funded by Swigaato or by the restaurant.

**Payments.** UPI and cards through the payment gateway; an online payment counts only after the gateway confirms it to the server. Cash on delivery can be switched on or off globally and per restaurant, with a maximum COD order value.

**Rider assignment.** The nearest free, online rider gets the request first, with a short accept window, then the next rider. Admin can assign manually at any time. The rider's live location updates every 5–10 seconds during a delivery.

**Money and settlements.**

- Each restaurant has its own commission %
- Weekly restaurant settlement: gross sales, commission, coupon share, GST, net payable
- Rider pay per delivery: base amount + per-km amount, plus incentives
- Customer wallet with a full transaction history for refunds and cashback

**Approval before going live.** Restaurants and riders cannot take orders until admin approves their documents.

## Brand & design direction

Swigaato should feel local, warm and trustworthy, clearly its own brand and not a copy of the national apps. The 13 customer-app screens are already designed and approved as the reference.

| Element | Choice |
| --- | --- |
| Primary colour | Leaf green #12663E |
| Accent colour | Turmeric yellow #F2B230 |
| Background | Warm cream #FFFBF2 |
| Text | Ink #1F1A17, muted #5A514A |
| Heading font | Baloo 2 (ExtraBold) |
| Body font | DM Sans |
| Shapes | Rounded corners 14–20 px, buttons at least 44 px tall |
| Icons | Simple line icons, no emoji |
| Voice | Friendly Hinglish, e.g. "Gonda ka apna food delivery" |
| Languages | English and Hindi, switchable in the app |

The restaurant, rider and admin products use the same colours and fonts, with denser layouts suited to working screens.

## Tech stack & third-party services

One shared codebase (monorepo) with one backend serving all four products. These are the recommended choices; any can be swapped before Phase 1 starts.

| Part | Technology |
| --- | --- |
| Backend API | Node.js + NestJS (TypeScript) |
| Database | PostgreSQL with Prisma |
| Cache and job queue | Redis + BullMQ |
| Real-time tracking | Socket.io |
| Admin panel | Next.js + Tailwind + shadcn/ui |
| Three mobile apps | React Native (Expo), Android first |
| Hosting | VPS with Docker; mobile builds via Expo EAS for Play Store |

| Service | Used for | Provider (recommended) |
| --- | --- | --- |
| Maps and distance | Location pin, routes, delivery fee distance | Google Maps Platform |
| Payments | UPI, cards, refunds | Razorpay |
| OTP SMS | Login codes | MSG91 |
| Push notifications | Order alerts on all apps | Firebase Cloud Messaging |
| File storage | Food photos, KYC documents | Any S3-compatible storage |

All keys stay in server environment settings and never inside the app code.

## Phases & milestones

The build runs in seven phases. Each phase ends with a working demo and Swigaato's approval before the next one starts.

&#91;embedded content: build roadmap · 7 phases, 7 approval gates\]

Dates for each phase are set once the open questions below are answered.

## Out of scope, assumptions & open questions

**Not in this version:** cities other than Gonda, grocery or parcel delivery, scheduled orders, table booking, a customer website, iOS release (the code supports it; publishing comes later), and a loyalty or subscription plan.

**Assumptions:**

- Android is the priority platform for all three apps
- The Swigaato team provides the logo files, restaurant photos and menus for the first restaurants
- Accounts for Google Maps, Razorpay, MSG91, Firebase and the Play Store are opened in Swigaato's name

**Open questions for Swigaato:**

- [ ] Exact delivery zones and pincodes inside Gonda
- [ ] Commission % for restaurants and rider pay per delivery
- [ ] Delivery fee slabs, platform fee and COD limit
- [ ] Restaurant and rider onboarding count before launch
- [ ] Operating hours (e.g. late-night service or not)
- [ ] Customer support channel: in-app chat, WhatsApp or phone
- [ ] Target launch date
