# Swigaato — Google Play Store Release Checklist & Build Guide

Follow this step-by-step checklist to build and publish **Swigaato** on the Google Play Store.

---

## 📋 Pre-Requisites

1. **Google Play Developer Account**: A registered Google Play Developer account ($25 one-time registration fee).
2. **Java Development Kit (JDK 17+)** installed on your system.
3. **Android Studio** (or Gradle / Expo EAS CLI).

---

## 🛠️ Step 1: Generate Release Keystore

Run the following command in PowerShell or Command Prompt to generate your release signing key:

```bash
keytool -genkey -v -keystore play-store/swigaato-release-key.jks -alias swigaato -keyalg RSA -keysize 2048 -validity 10000
```

> ⚠️ **IMPORTANT**: Securely back up `swigaato-release-key.jks` and store the password in a safe password manager. If you lose this key, you cannot update your app on the Play Store!

---

## 📦 Step 2: Build Production Android App Bundle (.aab)

Google Play requires the **Android App Bundle (.aab)** format for all new apps.

### Option A: Using the Native Capacitor Android Project

1. Configure your release signing properties in `android/gradle.properties`:
   ```properties
   SWIGAATO_RELEASE_STORE_FILE=../play-store/swigaato-release-key.jks
   SWIGAATO_RELEASE_STORE_PASSWORD=your_keystore_password
   SWIGAATO_RELEASE_KEY_ALIAS=swigaato
   SWIGAATO_RELEASE_KEY_PASSWORD=your_key_password
   ```

2. Sync the web assets:
   ```bash
   python scripts/sync_web.py
   ```

3. Build the signed `.aab`:
   ```bash
   cd android
   ./gradlew bundleRelease
   ```
   *(On Windows without bash, run: `gradlew.bat bundleRelease`)*

4. The generated release bundle will be located at:
   `android/app/build/outputs/bundle/release/app-release.aab`

---

### Option B: Using the React Native Expo Project (Cloud EAS Build)

1. Navigate to `expo-app/`:
   ```bash
   cd expo-app
   ```

2. Run EAS Build:
   ```bash
   npx eas-cli build --platform android --profile production
   ```

3. EAS will build the signed `.aab` in the cloud and provide a download link.

---

## 🚀 Step 3: Google Play Console Submission

1. **Create App in Play Console**:
   - Go to [Google Play Console](https://play.google.com/console).
   - Click **Create App**.
   - App Name: `Swigaato — Gonda Food Delivery`
   - Default Language: `English (United States)` or `Hindi`
   - App or Game: `App`
   - Free or Paid: `Free`

2. **Complete Store Presence**:
   - Copy descriptions from [`play-store/metadata.md`](metadata.md).
   - Upload App Icon (512x512 PNG, 32-bit).
   - Upload Feature Graphic (1024x500 PNG/JPEG).
   - Upload Phone Screenshots (at least 4 screenshots showing Splash, Home, Menu, and Live Tracking).

3. **Provide Privacy Policy**:
   - Host [`play-store/PRIVACY_POLICY.md`](PRIVACY_POLICY.md) on your domain (e.g. `https://swigaato.com/privacy`) and paste the public URL in **App Content ➔ Privacy Policy**.

4. **Data Safety Form**:
   - Location: Yes (Approximate & Precise) — for delivery area check and order routing.
   - Personal Info: Name & Phone Number — for account creation and OTP verification.
   - Financial Info: Handled via secure payment gateway.

5. **Upload App Bundle (.aab)**:
   - Navigate to **Release ➔ Production** (or **Closed Testing** for 20-tester review requirement).
   - Create a new release.
   - Drag & drop `app-release.aab`.
   - Release name: `1.0.0 (1)`.
   - Release notes:
     ```
     Swigaato launch release for Gonda, UP:
     - 13 approved customer screens
     - Local restaurants in Station Road, Civil Lines, and Bahraich Road
     - Live order tracking with customer OTP
     - UPI, Card, and Cash on Delivery
     ```

6. **Submit for Review**:
   - Click **Review release** ➔ **Start rollout to Production**!
