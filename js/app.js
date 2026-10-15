// Swigaato Master Application Controller
(function() {
  const store = window.appStore;
  const DATA = window.SWIGAATO_DATA;

  function t(key) {
    const lang = store.getState().language;
    return DATA.i18n[lang]?.[key] || DATA.i18n.en[key] || key;
  }

  function showToast(msg, icon = '✓') {
    const existing = document.querySelector('.swigaato-toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = 'swigaato-toast';
    toast.innerHTML = `<span>${icon}</span><span>${msg}</span>`;
    document.body.appendChild(toast);
    window.soundEngine.playSuccess();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translate(-50%, -20px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2400);
  }

  // Celebratory Confetti Burst on Order
  function launchConfetti() {
    let canvas = document.getElementById('confetti-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'confetti-canvas';
      document.body.appendChild(canvas);
    }
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#12663E', '#F2B230', '#0B4A2C', '#FCEBC2', '#FFFFFF', '#E8B04A'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: canvas.width * 0.5 + (Math.random() - 0.5) * 80,
        y: canvas.height * 0.6,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.8) * 16,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 10,
        life: 1
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.rotation += p.vRot;
        p.life -= 0.016;
        if (p.life > 0) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.life);
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      });
      if (alive) {
        requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    requestAnimationFrame(draw);
  }

  // Render Root Container
  function renderApp() {
    const state = store.getState();
    const root = document.getElementById('swigaato-app-root');
    if (!root) return;

    root.innerHTML = `
      <!-- Platform Top Navigation Bar -->
      <header class="platform-topbar">
        <div class="brand-section">
          <div class="brand-logo-pill">
            <svg width="24" height="24" viewBox="0 0 64 64" fill="none" stroke="#12663E" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 30h48a24 24 0 0 1-48 0z"></path>
              <path d="M24 22c0-4 4-4 4-8M34 22c0-4 4-4 4-8"></path>
              <path d="M20 56h24"></path>
            </svg>
          </div>
          <div class="brand-title-wrap">
            <span class="brand-name">swigaato</span>
            <span class="brand-sub">Gonda, UP</span>
          </div>
        </div>

        <!-- 4 Products Switcher -->
        <div class="role-switcher">
          <button class="role-btn ${state.currentRole === 'customer' ? 'active' : ''}" data-role="customer">
            <span>📱 Customer App</span>
            <span class="role-badge">13 Screens</span>
          </button>
          <button class="role-btn ${state.currentRole === 'restaurant' ? 'active' : ''}" data-role="restaurant">
            <span>🍽️ Restaurant Partner</span>
            ${getPendingOrdersCount() > 0 ? `<span class="role-badge">${getPendingOrdersCount()} New</span>` : ''}
          </button>
          <button class="role-btn ${state.currentRole === 'rider' ? 'active' : ''}" data-role="rider">
            <span>🛵 Delivery Rider</span>
          </button>
          <button class="role-btn ${state.currentRole === 'admin' ? 'active' : ''}" data-role="admin">
            <span>📊 Admin HQ</span>
          </button>
        </div>

        <!-- Controls: Language, View Mode, Sound -->
        <div class="topbar-controls">
          <button class="ctrl-btn" id="lang-toggle-btn" title="Switch Language">
            <span>🌐</span>
            <span>${state.language === 'en' ? 'English' : 'हिंदी'}</span>
          </button>
          <button class="ctrl-btn" id="view-mode-btn" title="Toggle Phone Frame / Expanded View">
            <span>${state.viewMode === 'phone' ? '📱 Frame' : '💻 Full'}</span>
          </button>
          <button class="ctrl-btn" id="sound-toggle-btn" title="Sound Effects">
            <span>${window.soundEngine.muted ? '🔇' : '🔊'}</span>
          </button>
        </div>
      </header>

      <!-- Customer Screen Quick-Jumper (13 Approved Screens) -->
      ${state.currentRole === 'customer' ? renderCustomerScreenJumper(state.currentScreen) : ''}

      <!-- Main Stage -->
      <main class="main-stage">
        <div class="device-wrapper ${state.viewMode === 'phone' ? 'mode-phone' : 'mode-full'}">
          ${state.viewMode === 'phone' ? `
            <div class="device-island">
              <div class="island-camera"></div>
              <div class="island-sensor"></div>
            </div>
            <div class="status-bar-time" id="live-clock">7:42</div>
            <div class="status-bar-icons">
              <span>5G</span>
              <span>📶</span>
              <span>100%</span>
            </div>
            <div class="device-home-bar"></div>
          ` : ''}

          <div class="screen-viewport ${isDarkScreen(state.currentScreen) ? 'theme-dark-header' : ''}" id="screen-viewport">
            ${renderCurrentView(state)}
          </div>
        </div>
      </main>
    `;

    bindGlobalEvents();
  }

  function getPendingOrdersCount() {
    return store.getState().orders.filter(o => o.status === 'placed').length;
  }

  function isDarkScreen(screen) {
    return ['splash', 'login', 'account'].includes(screen);
  }

  function renderCustomerScreenJumper(current) {
    const screens = [
      { id: 'splash', num: '01', label: 'Splash' },
      { id: 'onboarding', num: '02', label: 'Onboarding' },
      { id: 'login', num: '03', label: 'Login' },
      { id: 'otp', num: '04', label: 'OTP' },
      { id: 'location', num: '05', label: 'Location' },
      { id: 'home', num: '06', label: 'Home' },
      { id: 'search', num: '07', label: 'Search' },
      { id: 'menu', num: '08', label: 'Menu' },
      { id: 'cart', num: '09', label: 'Cart' },
      { id: 'payment', num: '10', label: 'Payment' },
      { id: 'tracking', num: '11', label: 'Live Tracking' },
      { id: 'orders', num: '12', label: 'My Orders' },
      { id: 'account', num: '13', label: 'Account' }
    ];

    return `
      <div class="screen-jumper-bar">
        <span class="jumper-label">Approved Screens:</span>
        ${screens.map(s => `
          <button class="screen-pill ${current === s.id ? 'active' : ''}" data-screen="${s.id}">
            <strong>${s.num}</strong> ${s.label}
          </button>
        `).join('')}
      </div>
    `;
  }

  function renderCurrentView(state) {
    if (state.currentRole === 'restaurant') {
      return renderRestaurantPortal(state);
    }
    if (state.currentRole === 'rider') {
      return renderRiderPortal(state);
    }
    if (state.currentRole === 'admin') {
      return renderAdminPortal(state);
    }

    // Customer App Views
    switch (state.currentScreen) {
      case 'splash': return renderScreenSplash(state);
      case 'onboarding': return renderScreenOnboarding(state);
      case 'login': return renderScreenLogin(state);
      case 'otp': return renderScreenOtp(state);
      case 'location': return renderScreenLocation(state);
      case 'home': return renderScreenHome(state);
      case 'search': return renderScreenSearch(state);
      case 'menu': return renderScreenMenu(state);
      case 'cart': return renderScreenCart(state);
      case 'payment': return renderScreenPayment(state);
      case 'tracking': return renderScreenTracking(state);
      case 'orders': return renderScreenOrders(state);
      case 'account': return renderScreenAccount(state);
      default: return renderScreenHome(state);
    }
  }

  // =========================================================================
  // SCREEN 01: SPLASH SCREEN
  // =========================================================================
  function renderScreenSplash(state) {
    return `
      <div style="min-height: 100%; box-sizing: border-box; background: #12663E; color: #FFFBF2; display: flex; flex-direction: column; align-items: center; justify-content: space-between; padding: 72px 32px 48px; overflow: hidden; position: relative">
        <div style="position: absolute; width: 520px; height: 520px; border-radius: 50%; border: 2px solid rgba(242,178,48,0.25); top: 160px; left: -65px; pointer-events: none"></div>
        <div style="position: absolute; width: 380px; height: 380px; border-radius: 50%; border: 2px solid rgba(242,178,48,0.35); top: 230px; left: 5px; pointer-events: none"></div>
        
        <div style="height: 20px"></div>
        
        <div style="display: flex; flex-direction: column; align-items: center; gap: 18px; position: relative">
          <div style="width: 112px; height: 112px; border-radius: 32px; background: #F2B230; display: flex; align-items: center; justify-content: center; box-shadow: 0 12px 32px rgba(0,0,0,0.25)">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#12663E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 30h48a24 24 0 0 1-48 0z"></path>
              <path d="M24 22c0-4 4-4 4-8M34 22c0-4 4-4 4-8"></path>
              <path d="M20 56h24"></path>
            </svg>
          </div>
          <div style="font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 52px; line-height: 1; letter-spacing: -1px">swigaato</div>
          <div style="font-size: 17px; color: #F6DFA6; text-align: center; font-weight: 500">${t('tagline')}</div>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 14px; width: 100%; position: relative">
          <button class="nav-trigger-btn" data-target="onboarding" style="display: flex; align-items: center; justify-content: center; width: 100%; height: 56px; border-radius: 16px; background: #F2B230; color: #1F1A17; font-weight: 800; font-size: 17px; box-shadow: 0 8px 24px rgba(242,178,48,0.35)">
            ${state.language === 'en' ? 'Get started →' : 'शुरू करें →'}
          </button>
          <div style="font-size: 13px; color: #CFE3D7; text-align: center">
            Delivering only in Gonda, Uttar Pradesh
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // SCREEN 02: ONBOARDING SCREEN
  // =========================================================================
  function renderScreenOnboarding(state) {
    return `
      <div style="min-height: 100%; box-sizing: border-box; background: #FFFBF2; color: #1F1A17; display: flex; flex-direction: column; padding: 56px 28px 40px; justify-content: space-between">
        <div style="display: flex; justify-content: flex-end">
          <button class="nav-trigger-btn" data-target="login" style="font-size: 15px; font-weight: 700; color: #12663E; padding: 12px 4px">Skip</button>
        </div>

        <div style="display: flex; align-items: center; justify-content: center; padding: 20px 0">
          <div style="width: 280px; height: 280px; border-radius: 50%; background: #FCEBC2; display: flex; align-items: center; justify-content: center; position: relative">
            <div style="width: 190px; height: 190px; border-radius: 50%; background: #12663E; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(18,102,62,0.3)">
              <svg width="100" height="100" viewBox="0 0 64 64" fill="none" stroke="#F2B230" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="16" cy="46" r="7"></circle>
                <circle cx="50" cy="46" r="7"></circle>
                <path d="M23 46h20l6-14h-12"></path>
                <path d="M10 22h18v14H10z"></path>
                <path d="M37 32l-5-12h-5"></path>
              </svg>
            </div>
            <div style="position: absolute; top: 16px; right: 10px; background: #F2B230; border-radius: 999px; padding: 8px 14px; font-weight: 800; font-size: 14px; color: #1F1A17; box-shadow: 0 4px 12px rgba(0,0,0,0.1)">30 min</div>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 24px">
          <h1 style="margin: 0; font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 32px; line-height: 1.15; color: #1F1A17">
            ${state.language === 'en' ? "Gonda ke favourite khane, ghar tak" : "गोंडा के पसंदीदा खाने, घर तक"}
          </h1>
          <p style="margin: 0; font-size: 15px; color: #5A514A; line-height: 1.5">
            ${state.language === 'en' 
              ? "From Station Road chaat to Civil Lines biryani, order from local kitchens and get it hot at your door." 
              : "स्टेशन रोड की मशहूर चाट से लेकर सिविल लाइंस की बिरयानी तक, सीधे आपके घर।"
            }
          </p>

          <div style="display: flex; gap: 6px; padding: 8px 0">
            <span style="width: 24px; height: 6px; border-radius: 3px; background: #12663E"></span>
            <span style="width: 8px; height: 6px; border-radius: 3px; background: #D9D0BE"></span>
            <span style="width: 8px; height: 6px; border-radius: 3px; background: #D9D0BE"></span>
          </div>

          <button class="nav-trigger-btn" data-target="login" style="display: flex; align-items: center; justify-content: center; height: 56px; border-radius: 16px; background: #12663E; color: #FFFBF2; font-weight: 700; font-size: 17px; box-shadow: 0 8px 20px rgba(18,102,62,0.3)">
            ${state.language === 'en' ? 'Next →' : 'आगे बढ़ें →'}
          </button>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // SCREEN 03: LOGIN SCREEN
  // =========================================================================
  function renderScreenLogin(state) {
    return `
      <div style="min-height: 100%; box-sizing: border-box; background: #FFFBF2; color: #1F1A17; display: flex; flex-direction: column">
        <div style="height: 260px; background: #12663E; color: #FFFBF2; padding: 64px 28px 28px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: flex-end; gap: 8px; border-radius: 0 0 32px 32px">
          <div style="font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 34px; line-height: 1">swigaato</div>
          <div style="font-size: 16px; color: #CFE3D7">
            ${state.language === 'en' ? 'Login or sign up to order in Gonda' : 'गोंडा में खाना आर्डर करने के लिए लॉगिन करें'}
          </div>
        </div>

        <div style="padding: 32px 28px; display: flex; flex-direction: column; gap: 20px; flex-grow: 1">
          <label for="login-phone" style="font-weight: 700; font-size: 15px">Mobile number</label>
          <div style="display: flex; gap: 10px; margin-top: -10px">
            <div style="height: 56px; padding: 0 16px; border-radius: 14px; border: 1.5px solid #D9D0BE; display: flex; align-items: center; font-weight: 700; background: #FFFFFF">+91</div>
            <input id="login-phone" type="tel" value="98765 43210" style="flex-grow: 1; height: 56px; box-sizing: border-box; border-radius: 14px; border: 1.5px solid #12663E; padding: 0 16px; font-size: 17px; font-weight: 600; background: #FFFFFF; color: #1F1A17">
          </div>

          <button class="nav-trigger-btn" data-target="otp" style="display: flex; align-items: center; justify-content: center; height: 56px; border-radius: 16px; background: #12663E; color: #FFFBF2; font-weight: 700; font-size: 17px; box-shadow: 0 8px 20px rgba(18,102,62,0.3)">
            Continue →
          </button>

          <div style="font-size: 13px; color: #5A514A; text-align: center; line-height: 1.5">
            By continuing, you agree to Swigaato's <a href="#" style="color: #12663E; font-weight: 700">Terms of Service</a> and <a href="#" style="color: #12663E; font-weight: 700">Privacy Policy</a>
          </div>

          <div style="margin-top: auto; display: flex; align-items: center; justify-content: center; gap: 8px; padding-top: 20px">
            <span style="font-size: 13px; color: #5A514A">Language / भाषा:</span>
            <button id="inline-lang-btn" style="font-size: 13px; font-weight: 800; color: #12663E; border: 1px solid #12663E; padding: 4px 10px; border-radius: 8px">
              ${state.language === 'en' ? 'हिन्दी में बदलें' : 'Switch to English'}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // SCREEN 04: OTP VERIFICATION
  // =========================================================================
  function renderScreenOtp(state) {
    return `
      <div style="min-height: 100%; box-sizing: border-box; background: #FFFBF2; color: #1F1A17; display: flex; flex-direction: column; padding: 56px 28px 40px; gap: 24px">
        <button class="nav-trigger-btn" data-target="login" aria-label="Back" style="width: 44px; height: 44px; border-radius: 12px; background: #FFFFFF; border: 1.5px solid #E6DECD; display: flex; align-items: center; justify-content: center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1F1A17" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"></path></svg>
        </button>

        <div style="display: flex; flex-direction: column; gap: 8px">
          <h1 style="margin: 0; font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 32px; line-height: 1.1">Enter OTP</h1>
          <p style="margin: 0; font-size: 15px; color: #5A514A; line-height: 1.5">
            We sent a 4-digit code to <strong>+91 98765 43210</strong> 
            <button class="nav-trigger-btn" data-target="login" style="color: #12663E; font-weight: 700; margin-left: 4px">Edit</button>
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px">
          <input value="4" maxlength="1" style="width: 100%; height: 68px; border-radius: 16px; border: 2px solid #12663E; text-align: center; font-size: 26px; font-weight: 800; background: #FFFFFF; color: #1F1A17">
          <input value="8" maxlength="1" style="width: 100%; height: 68px; border-radius: 16px; border: 2px solid #12663E; text-align: center; font-size: 26px; font-weight: 800; background: #FFFFFF; color: #1F1A17">
          <input value="1" maxlength="1" style="width: 100%; height: 68px; border-radius: 16px; border: 2px solid #12663E; text-align: center; font-size: 26px; font-weight: 800; background: #FFFFFF; color: #1F1A17">
          <input value="2" maxlength="1" style="width: 100%; height: 68px; border-radius: 16px; border: 2px solid #12663E; text-align: center; font-size: 26px; font-weight: 800; background: #FFFFFF; color: #1F1A17">
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 14px; color: #5A514A">
          <span>Didn't get it? Resend in</span>
          <span style="font-weight: 700; color: #12663E">00:24</span>
        </div>

        <button class="nav-trigger-btn" data-target="location" style="display: flex; align-items: center; justify-content: center; height: 56px; border-radius: 16px; background: #12663E; color: #FFFBF2; font-weight: 700; font-size: 17px; margin-top: 10px; box-shadow: 0 8px 20px rgba(18,102,62,0.3)">
          Verify & continue →
        </button>
      </div>
    `;
  }

  // =========================================================================
  // SCREEN 05: SET DELIVERY LOCATION
  // =========================================================================
  function renderScreenLocation(state) {
    const loc = state.deliveryLocation;
    return `
      <div style="min-height: 100%; box-sizing: border-box; background: #FFFBF2; color: #1F1A17; display: flex; flex-direction: column; overflow: hidden; position: relative">
        <!-- Interactive Map Section -->
        <div style="height: 380px; background: #E4EDDF; position: relative; overflow: hidden; flex-shrink: 0">
          <svg width="100%" height="380" viewBox="0 0 390 380" fill="none" preserveAspectRatio="none">
            <!-- Road Network -->
            <path d="M-10 120 L400 180" stroke="#FFFFFF" stroke-width="14"></path>
            <path d="M-10 300 L400 260" stroke="#FFFFFF" stroke-width="18"></path>
            <path d="M120 -10 L160 440" stroke="#FFFFFF" stroke-width="12"></path>
            <path d="M290 -10 L250 440" stroke="#FFFFFF" stroke-width="10"></path>
            
            <!-- Parks & Landmarks -->
            <rect x="180" y="40" width="70" height="60" rx="8" fill="#CFE0C6"></rect>
            <text x="186" y="74" font-size="10" font-weight="700" fill="#12663E">Gandhi Park</text>
            
            <rect x="20" y="190" width="80" height="70" rx="8" fill="#CFE0C6"></rect>
            <text x="26" y="226" font-size="10" font-weight="700" fill="#12663E">Civil Lines</text>
            
            <rect x="270" y="270" width="100" height="80" rx="8" fill="#CFE0C6"></rect>
            <text x="278" y="310" font-size="10" font-weight="700" fill="#12663E">Railway Stn</text>
          </svg>

          <!-- Pin marker with bounce -->
          <div style="position: absolute; left: 50%; top: 46%; transform: translate(-50%, -100%); display: flex; flex-direction: column; align-items: center; z-index: 10">
            <div style="background: #1F1A17; color: #FFFBF2; font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 8px; margin-bottom: 6px; white-space: nowrap; box-shadow: 0 4px 10px rgba(0,0,0,0.2)">
              Deliver here
            </div>
            <svg width="44" height="54" viewBox="0 0 44 54">
              <path d="M22 52s18-18 18-30a18 18 0 0 0-36 0c0 12 18 30 18 30z" fill="#12663E"></path>
              <circle cx="22" cy="22" r="7" fill="#F2B230"></circle>
            </svg>
          </div>

          <!-- Back button -->
          <button class="nav-trigger-btn" data-target="home" aria-label="Back" style="position: absolute; top: 52px; left: 20px; width: 44px; height: 44px; border-radius: 12px; background: #FFFFFF; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.1)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1F1A17" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"></path></svg>
          </button>

          <!-- Current Location Pill -->
          <button id="loc-current-btn" style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); height: 44px; padding: 0 18px; border-radius: 999px; border: none; background: #FFFFFF; font-weight: 700; font-size: 14px; color: #12663E; display: flex; align-items: center; gap: 8px; white-space: nowrap; box-shadow: 0 4px 14px rgba(0,0,0,0.15)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#12663E" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v3M12 19v3M2 12h3M19 12h3"></path></svg>
            Use current location
          </button>
        </div>

        <!-- Location Bottom Sheet -->
        <div style="flex-grow: 1; background: #FFFBF2; border-radius: 28px 28px 0 0; margin-top: -24px; position: relative; padding: 24px 20px 24px; display: flex; flex-direction: column; gap: 14px; z-index: 20">
          <div style="display: flex; gap: 12px; align-items: flex-start">
            <div style="width: 44px; height: 44px; border-radius: 12px; background: #FCEBC2; display: flex; align-items: center; justify-content: center; flex-shrink: 0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#12663E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z"></path><circle cx="12" cy="9" r="2.5"></circle></svg>
            </div>
            <div style="display: flex; flex-direction: column; gap: 2px">
              <div style="font-weight: 800; font-size: 18px; font-family: 'Baloo 2', sans-serif">${loc.area}</div>
              <div style="font-size: 13px; color: #5A514A">${loc.address}</div>
            </div>
          </div>

          <!-- Serviceable alert -->
          <div style="display: flex; align-items: center; gap: 8px; background: #E4EDDF; color: #0B4A2C; border-radius: 12px; padding: 10px 14px; font-size: 14px; font-weight: 600">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B4A2C" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
            Great! We deliver inside Gonda
          </div>

          <!-- Address Fields -->
          <label for="loc-flat" style="font-weight: 700; font-size: 14px">House / Flat / Landmark</label>
          <input id="loc-flat" value="${loc.flat}" placeholder="e.g. H.No 24, behind SBI branch" style="height: 50px; border-radius: 14px; border: 1.5px solid #D9D0BE; padding: 0 14px; font-size: 15px; background: #FFFFFF; color: #1F1A17; margin-top: -6px">

          <!-- Tags -->
          <div style="display: flex; gap: 10px">
            <button class="loc-tag-btn active" data-tag="Home" style="height: 40px; padding: 0 18px; border-radius: 999px; border: 1.5px solid #12663E; background: #E4EDDF; font-weight: 700; font-size: 14px; color: #0B4A2C">Home</button>
            <button class="loc-tag-btn" data-tag="Work" style="height: 40px; padding: 0 18px; border-radius: 999px; border: 1.5px solid #D9D0BE; background: #FFFFFF; font-size: 14px; color: #1F1A17">Work</button>
            <button class="loc-tag-btn" data-tag="Other" style="height: 40px; padding: 0 18px; border-radius: 999px; border: 1.5px solid #D9D0BE; background: #FFFFFF; font-size: 14px; color: #1F1A17">Other</button>
          </div>

          <button class="nav-trigger-btn" data-target="home" style="display: flex; align-items: center; justify-content: center; height: 54px; border-radius: 16px; background: #12663E; color: #FFFBF2; font-weight: 700; font-size: 17px; margin-top: 10px; box-shadow: 0 8px 20px rgba(18,102,62,0.3)">
            Save address & continue →
          </button>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // SCREEN 06: HOME SCREEN
  // =========================================================================
  function renderScreenHome(state) {
    const activeOrder = state.orders.find(o => o.status === 'on_the_way' || o.status === 'preparing');
    const restaurants = DATA.restaurants;
    const cats = DATA.categories;

    return `
      <div style="min-height: 100%; box-sizing: border-box; background: #FFFBF2; color: #1F1A17; display: flex; flex-direction: column">
        
        <!-- Header: Location & User Avatar -->
        <div style="padding: 48px 20px 14px; display: flex; flex-direction: column; gap: 14px; background: #FFFBF2; position: sticky; top: 0; z-index: 50; border-bottom: 1px solid rgba(0,0,0,0.04)">
          <div style="display: flex; align-items: center; justify-content: space-between">
            <button class="nav-trigger-btn" data-target="location" style="display: flex; flex-direction: column; gap: 2px; text-align: left">
              <span style="display: flex; align-items: center; gap: 6px; font-weight: 800; font-size: 18px; font-family: 'Baloo 2', sans-serif; color: #1F1A17">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#12663E" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z"></path></svg>
                ${state.deliveryLocation.tag}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1F1A17" stroke-width="2.4" stroke-linecap="round"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
              <span style="font-size: 13px; color: #5A514A">${state.deliveryLocation.area}</span>
            </button>

            <button class="nav-trigger-btn" data-target="account" aria-label="Profile" style="width: 44px; height: 44px; border-radius: 50%; background: #12663E; color: #FFFBF2; display: flex; align-items: center; justify-content: center; font-weight: 800; box-shadow: 0 4px 10px rgba(18,102,62,0.3)">
              ${DATA.user.initials}
            </button>
          </div>

          <!-- Search Pill CTA -->
          <button class="nav-trigger-btn" data-target="search" style="height: 52px; border-radius: 14px; border: 1.5px solid #E6DECD; background: #FFFFFF; display: flex; align-items: center; gap: 10px; padding: 0 16px; color: #7A7068; font-size: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.03)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#12663E" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-4-4"></path></svg>
            <span>${t('searchPlaceholder')}</span>
          </button>
        </div>

        <!-- Content Area -->
        <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 16px; padding: 14px 20px 24px">
          
          <!-- Cool Gonda USPs Horizontal Banner -->
          <div class="usp-badge-banner">
            <div class="usp-chip express">
              <span>⚡</span>
              <span>20-Min Gonda Express</span>
            </div>
            <div class="usp-chip pure">
              <span>🌾</span>
              <span>Pure Desi Ghee & Handi</span>
            </div>
            <div class="usp-chip nosurge">
              <span>🌧️</span>
              <span>Zero Rain Surge</span>
            </div>
            <div class="usp-chip express">
              <span>🍱</span>
              <span>Daily Tiffin Plan</span>
            </div>
          </div>

          <!-- Gonda Quick Landmark Geochecker -->
          <div style="display: flex; flex-direction: column; gap: 8px">
            <div style="display: flex; align-items: center; justify-content: space-between">
              <span style="font-size: 12px; font-weight: 800; color: #5A514A; text-transform: uppercase; letter-spacing: 0.5px">Fastest Delivery Hubs</span>
              <span style="font-size: 11px; color: #12663E; font-weight: 700">● 100% Serviceable</span>
            </div>
            <div style="display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none; padding-bottom: 2px">
              <button class="landmark-chip ${state.deliveryLocation.area.includes('Civil') ? 'selected' : ''}" data-area="Civil Lines, Gonda" data-pin="271001" data-time="15-20 min">
                <span>📍 Civil Lines</span>
              </button>
              <button class="landmark-chip ${state.deliveryLocation.area.includes('Station') ? 'selected' : ''}" data-area="Station Road, Gonda" data-pin="271002" data-time="20-25 min">
                <span>🚂 Station Road</span>
              </button>
              <button class="landmark-chip ${state.deliveryLocation.area.includes('Gandhi') ? 'selected' : ''}" data-area="Gandhi Park, Gonda" data-pin="271001" data-time="15 min">
                <span>🌳 Gandhi Park</span>
              </button>
              <button class="landmark-chip ${state.deliveryLocation.area.includes('Bahraich') ? 'selected' : ''}" data-area="Bahraich Road, Gonda" data-pin="271001" data-time="25 min">
                <span>🛣️ Bahraich Road</span>
              </button>
              <button class="landmark-chip ${state.deliveryLocation.area.includes('Pant') ? 'selected' : ''}" data-area="Pant Nagar, Gonda" data-pin="271003" data-time="20 min">
                <span>🏘️ Pant Nagar</span>
              </button>
            </div>
          </div>
          
          <!-- Live Active Order Floating Ticker (if present) -->
          ${activeOrder ? `
            <div class="nav-trigger-btn" data-target="tracking" style="background: #12663E; color: #FFFBF2; border-radius: 16px; padding: 14px 16px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; box-shadow: 0 6px 18px rgba(18,102,62,0.35)">
              <div style="display: flex; align-items: center; gap: 12px">
                <span style="font-size: 20px">🛵</span>
                <div style="display: flex; flex-direction: column">
                  <span style="font-size: 11px; font-weight: 800; color: #F2B230; letter-spacing: 0.5px">LIVE DELIVERY</span>
                  <span style="font-weight: 800; font-size: 14px">${activeOrder.restaurantName} · ${activeOrder.statusText}</span>
                </div>
              </div>
              <span style="font-weight: 700; font-size: 13px; background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 8px">Track →</span>
            </div>
          ` : ''}

          <!-- First Order Promotional Banner (GONDA50) -->
          <div style="background: #12663E; color: #FFFBF2; border-radius: 20px; padding: 20px; display: flex; justify-content: space-between; align-items: center; position: relative; overflow: hidden; flex-shrink: 0; box-shadow: 0 8px 24px rgba(18,102,62,0.25)">
            <div style="display: flex; flex-direction: column; gap: 4px; position: relative; z-index: 2">
              <div style="font-size: 12px; font-weight: 800; color: #F2B230; letter-spacing: 1px">${t('firstOrderOffer')}</div>
              <div style="font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 26px; line-height: 1.1">
                ${t('firstOrderDisc')}
              </div>
              <div style="font-size: 13px; color: #CFE3D7; font-weight: 600">${t('useCode')}</div>
            </div>

            <div style="width: 90px; height: 90px; border-radius: 50%; background: #F2B230; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 6px 16px rgba(0,0,0,0.15)">
              <svg width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="#12663E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
                <path d="M8 30h48a24 24 0 0 1-48 0z"></path>
                <path d="M24 22c0-4 4-4 4-8M34 22c0-4 4-4 4-8"></path>
              </svg>
            </div>
          </div>

          <!-- Interactive Gonda Daily Surprise Treat Card -->
          <div id="gonda-treat-card" style="background: linear-gradient(135deg, #1F1A17 0%, #2D2520 100%); color: #FFFBF2; border-radius: 18px; padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; border: 1.5px dashed #F2B230; box-shadow: 0 4px 14px rgba(0,0,0,0.15); transition: transform 0.2s">
            <div style="display: flex; align-items: center; gap: 12px">
              <span style="font-size: 26px; animation: floatScooter 2.5s ease-in-out infinite; display: inline-block">🎁</span>
              <div style="display: flex; flex-direction: column">
                <span style="font-size: 11px; font-weight: 800; color: #F2B230; letter-spacing: 0.5px">DAILY GONDA BHOG SURPRISE</span>
                <span style="font-weight: 800; font-size: 14px; font-family: 'Baloo 2', sans-serif">Tap to unlock ₹100 Flat Coupon!</span>
              </div>
            </div>
            <span style="background: #F2B230; color: #12663E; font-weight: 800; font-size: 12px; padding: 6px 12px; border-radius: 9999px; white-space: nowrap">CLAIM ✦</span>
          </div>

          <!-- Food Categories Carousel -->
          <div style="display: flex; flex-direction: column; gap: 12px; flex-shrink: 0">
            <div style="font-weight: 800; font-size: 17px; font-family: 'Baloo 2', sans-serif">${t('whatsOnMind')}</div>
            <div style="display: flex; gap: 14px; overflow-x: auto; padding-bottom: 6px; scrollbar-width: none">
              ${cats.map(c => `
                <button class="cat-pill-btn" data-cat="${c.name}" style="display: flex; flex-direction: column; align-items: center; gap: 6px; width: 64px; flex-shrink: 0">
                  <span style="width: 60px; height: 60px; border-radius: 50%; background: ${c.bg}; display: flex; align-items: center; justify-content: center; font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 20px; color: #1F1A17; box-shadow: 0 3px 8px rgba(0,0,0,0.06)">
                    ${c.ab}
                  </span>
                  <span style="font-size: 12px; font-weight: 600; color: #1F1A17; text-align: center; white-space: nowrap">
                    ${state.language === 'en' ? c.name : c.nameHi}
                  </span>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Restaurants Section Header -->
          <div style="display: flex; flex-direction: column; gap: 14px">
            <div style="display: flex; justify-content: space-between; align-items: baseline">
              <div style="font-weight: 800; font-size: 18px; font-family: 'Baloo 2', sans-serif">${t('restaurantsInGonda')}</div>
              <div style="font-size: 13px; color: #5A514A; font-weight: 600">${t('openNow')}</div>
            </div>

            <!-- Restaurant Cards List -->
            <div style="display: flex; flex-direction: column; gap: 12px">
              ${restaurants.map(r => `
                <div class="restaurant-card nav-trigger-btn" data-target="menu" data-rest="${r.id}" style="display: flex; gap: 14px; color: #1F1A17; background: #FFFFFF; border-radius: 18px; padding: 12px; border: 1px solid #EFE7D6; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,0.03); transition: transform 0.2s">
                  <!-- Thumbnail with offer badge -->
                  <div style="width: 96px; height: 96px; border-radius: 14px; background: ${r.bg}; flex-shrink: 0; display: flex; align-items: flex-end; padding: 6px; box-sizing: border-box; background-image: url('${r.image}'); background-size: cover; background-position: center; position: relative">
                    <span style="background: rgba(31, 26, 23, 0.88); color: #FFFBF2; font-size: 11px; font-weight: 800; padding: 3px 6px; border-radius: 6px">
                      ${r.offer}
                    </span>
                  </div>

                  <!-- Details -->
                  <div style="display: flex; flex-direction: column; gap: 4px; justify-content: center; min-width: 0; flex: 1">
                    <div style="display: flex; align-items: center; justify-content: space-between">
                      <span style="font-weight: 800; font-size: 16px; font-family: 'Baloo 2', sans-serif; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${r.name}</span>
                      ${r.isVeg ? `<span class="diet-indicator veg"><span class="diet-dot"></span></span>` : ''}
                    </div>

                    <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700">
                      <span style="background: #12663E; color: #FFFBF2; border-radius: 6px; padding: 2px 6px">★ ${r.rating}</span>
                      <span style="color: #1F1A17">${r.time}</span>
                    </div>

                    <div style="font-size: 13px; color: #5A514A; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${r.cuisine}</div>
                    <div style="font-size: 12px; color: #7A7068">${r.area}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Sticky Bottom Navigation -->
        ${renderBottomNav('home')}
      </div>
    `;
  }

  // =========================================================================
  // SCREEN 07: SEARCH SCREEN
  // =========================================================================
  function renderScreenSearch(state) {
    const q = (state.searchQuery || '').toLowerCase();
    const vegOnly = state.vegOnlyFilter;
    const under200 = state.under200Filter;

    // Collect all dishes across all Gonda restaurants
    let allDishes = [];
    DATA.restaurants.forEach(rest => {
      rest.items.forEach(it => {
        allDishes.push({
          ...it,
          restId: rest.id,
          restName: rest.name,
          restArea: rest.area,
          restTime: rest.time
        });
      });
    });

    if (q) {
      allDishes = allDishes.filter(d => 
        d.name.toLowerCase().includes(q) || 
        d.category.toLowerCase().includes(q) ||
        d.restName.toLowerCase().includes(q)
      );
    }

    if (vegOnly) {
      allDishes = allDishes.filter(d => d.isVeg);
    }

    if (under200) {
      allDishes = allDishes.filter(d => d.price <= 200);
    }

    return `
      <div style="min-height: 100%; box-sizing: border-box; background: #FFFBF2; color: #1F1A17; display: flex; flex-direction: column">
        
        <!-- Search Top Header -->
        <div style="padding: 48px 20px 14px; display: flex; gap: 10px; align-items: center; background: #FFFBF2; position: sticky; top: 0; z-index: 50">
          <button class="nav-trigger-btn" data-target="home" aria-label="Back" style="width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; background: #FFFFFF; border: 1.5px solid #E6DECD">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1F1A17" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"></path></svg>
          </button>

          <label style="flex-grow: 1; height: 52px; border-radius: 14px; border: 1.5px solid #12663E; background: #FFFFFF; display: flex; align-items: center; gap: 10px; padding: 0 14px; box-sizing: border-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#12663E" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-4-4"></path></svg>
            <input id="search-main-input" value="${state.searchQuery}" placeholder="Search biryani, chaat, thali..." style="border: none; outline: none; font-size: 16px; font-weight: 500; flex-grow: 1; background: transparent; color: #1F1A17; min-width: 0">
            ${state.searchQuery ? `<button id="search-clear-btn" style="color: #7A7068; font-weight: 800; font-size: 16px">✕</button>` : ''}
          </label>
        </div>

        <!-- Filter Chips -->
        <div style="padding: 0 20px 12px; display: flex; gap: 8px; flex-wrap: wrap">
          <button class="filter-toggle-btn ${vegOnly ? 'active' : ''}" data-filter="vegOnly" style="height: 38px; padding: 0 14px; border-radius: 999px; border: 1.5px solid ${vegOnly ? '#12663E' : '#D9D0BE'}; background: ${vegOnly ? '#E4EDDF' : '#FFFFFF'}; font-size: 13px; font-weight: 700; color: ${vegOnly ? '#0B4A2C' : '#1F1A17'}; display: flex; align-items: center; gap: 6px">
            <span class="diet-indicator veg" style="width: 12px; height: 12px"><span class="diet-dot" style="width: 5px; height: 5px"></span></span>
            Veg only
          </button>
          
          <button class="filter-toggle-btn ${under200 ? 'active' : ''}" data-filter="under200" style="height: 38px; padding: 0 14px; border-radius: 999px; border: 1.5px solid ${under200 ? '#12663E' : '#D9D0BE'}; background: ${under200 ? '#E4EDDF' : '#FFFFFF'}; font-size: 13px; font-weight: 700; color: ${under200 ? '#0B4A2C' : '#1F1A17'}">
            Under ₹200
          </button>

          <button class="filter-toggle-btn" data-quick="Biryani" style="height: 38px; padding: 0 14px; border-radius: 999px; border: 1.5px solid #D9D0BE; background: #FFFFFF; font-size: 13px; color: #1F1A17">
            Biryani
          </button>
          <button class="filter-toggle-btn" data-quick="Chaat" style="height: 38px; padding: 0 14px; border-radius: 999px; border: 1.5px solid #D9D0BE; background: #FFFFFF; font-size: 13px; color: #1F1A17">
            Chaat
          </button>
        </div>

        <!-- Results Header -->
        <div style="padding: 4px 20px 8px; font-size: 13px; color: #5A514A; font-weight: 600">
          Showing ${allDishes.length} items in Gonda
        </div>

        <!-- Dish List -->
        <div style="flex-grow: 1; padding: 0 20px 24px; display: flex; flex-direction: column; gap: 12px">
          ${allDishes.map(d => {
            const inCart = state.cart[d.id]?.qty || 0;
            return `
              <div style="display: flex; gap: 14px; padding: 14px; background: #FFFFFF; border-radius: 18px; border: 1px solid #EFE7D6; align-items: center">
                <div style="width: 72px; height: 72px; border-radius: 12px; background: ${d.bg}; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 24px">
                  ${d.isVeg ? '🥗' : '🍗'}
                </div>

                <div style="display: flex; flex-direction: column; gap: 2px; flex-grow: 1; min-width: 0">
                  <div style="display: flex; align-items: center; gap: 6px">
                    <span class="diet-indicator ${d.isVeg ? 'veg' : 'non-veg'}">
                      <span class="diet-dot"></span>
                    </span>
                    <span style="font-weight: 800; font-size: 15px; font-family: 'Baloo 2', sans-serif; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${d.name}</span>
                  </div>
                  <div style="font-size: 13px; color: #5A514A">${d.restName} · ${d.restTime}</div>
                  <div style="font-weight: 800; font-size: 15px; color: #12663E">₹${d.price}</div>
                </div>

                <div style="flex-shrink: 0">
                  ${inCart > 0 ? `
                    <div class="qty-stepper">
                      <button class="cart-sub-btn" data-id="${d.id}">−</button>
                      <span>${inCart}</span>
                      <button class="cart-add-btn" data-id="${d.id}" data-rest="${d.restId}">+</button>
                    </div>
                  ` : `
                    <button class="add-btn-outline cart-add-btn" data-id="${d.id}" data-rest="${d.restId}">
                      ADD
                    </button>
                  `}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Sticky Cart Bar if cart has items -->
        ${store.getCartCount() > 0 ? renderStickyCartBar() : ''}

        <!-- Bottom Navigation -->
        ${renderBottomNav('search')}
      </div>
    `;
  }

  // =========================================================================
  // SCREEN 08: RESTAURANT MENU SCREEN
  // =========================================================================
  function renderScreenMenu(state) {
    const rest = DATA.restaurants.find(r => r.id === state.currentRestaurantId) || DATA.restaurants[0];
    const cartCount = store.getCartCount();
    const bill = store.getCartBill();

    return `
      <div style="min-height: 100%; box-sizing: border-box; background: #FFFBF2; color: #1F1A17; display: flex; flex-direction: column; position: relative">
        
        <!-- Hero Header -->
        <div style="height: 180px; background: ${rest.bg}; position: relative; flex-shrink: 0; background-image: url('${rest.image}'); background-size: cover; background-position: center">
          <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 100%)"></div>
          
          <button class="nav-trigger-btn" data-target="home" aria-label="Back" style="position: absolute; top: 48px; left: 20px; width: 44px; height: 44px; border-radius: 12px; background: #FFFFFF; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.15)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1F1A17" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"></path></svg>
          </button>

          <button id="rest-fav-btn" aria-label="Save to favourites" style="position: absolute; top: 48px; right: 20px; width: 44px; height: 44px; border-radius: 12px; background: #FFFFFF; border: none; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.15)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1F1A17" stroke-width="2.2" stroke-linejoin="round"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"></path></svg>
          </button>
        </div>

        <!-- Floating Restaurant Card -->
        <div style="margin: -44px 16px 0; background: #FFFFFF; border-radius: 20px; padding: 18px; border: 1px solid #EFE7D6; position: relative; display: flex; flex-direction: column; gap: 8px; flex-shrink: 0; box-shadow: 0 4px 16px rgba(0,0,0,0.06); z-index: 10">
          <div style="font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 26px; line-height: 1">${rest.name}</div>
          <div style="font-size: 14px; color: #5A514A">${rest.cuisine} · ${rest.area}</div>
          
          <div style="display: flex; gap: 14px; font-size: 13px; font-weight: 700; padding-top: 4px; flex-wrap: wrap">
            <span style="background: #12663E; color: #FFFBF2; border-radius: 6px; padding: 3px 8px">★ ${rest.rating} · ${rest.ratingCount}</span>
            <span style="padding: 3px 0; color: #1F1A17">${rest.time}</span>
            <span style="padding: 3px 0; color: #5A514A">${rest.costForTwo}</span>
          </div>

          <div style="font-size: 13px; color: #0B4A2C; background: #E4EDDF; padding: 8px 12px; border-radius: 10px; font-weight: 600; display: flex; align-items: center; gap: 6px">
            <span>🏷️</span>
            <span>${rest.offerDetail}</span>
          </div>
        </div>

        <!-- Menu Categories Filter Chips -->
        <div style="display: flex; gap: 8px; padding: 16px 16px 6px; overflow-x: auto; scrollbar-width: none">
          <button class="menu-cat-chip active" style="height: 38px; padding: 0 16px; border-radius: 999px; border: 1.5px solid #12663E; background: #E4EDDF; font-weight: 700; font-size: 13px; color: #0B4A2C; white-space: nowrap">
            All Items
          </button>
          ${rest.menuCategories.map(c => `
            <button class="menu-cat-chip" style="height: 38px; padding: 0 16px; border-radius: 999px; border: 1.5px solid #D9D0BE; background: #FFFFFF; font-size: 13px; color: #1F1A17; white-space: nowrap">
              ${c}
            </button>
          `).join('')}
        </div>

        <!-- Menu Items -->
        <div style="flex-grow: 1; padding: 0 16px 100px; display: flex; flex-direction: column">
          ${rest.items.map(it => {
            const inCart = state.cart[it.id]?.qty || 0;
            const isOutOfStock = state.restaurantItemsStock[it.id] === false;

            return `
              <div style="display: flex; gap: 14px; padding: 16px 0; border-bottom: 1px solid #EFE7D6; opacity: ${isOutOfStock ? '0.5' : '1'}">
                <div style="display: flex; flex-direction: column; gap: 4px; flex-grow: 1; min-width: 0">
                  <div style="width: 14px; height: 14px; border: 1.5px solid ${it.dot}; border-radius: 3px; display: flex; align-items: center; justify-content: center">
                    <div style="width: 6px; height: 6px; border-radius: 50%; background: ${it.dot}"></div>
                  </div>
                  <div style="font-weight: 800; font-size: 16px; font-family: 'Baloo 2', sans-serif">${it.name}</div>
                  <div style="font-weight: 800; font-size: 15px; color: #12663E">₹${it.price}</div>
                  <div style="font-size: 13px; color: #5A514A; line-height: 1.4">${it.desc}</div>
                </div>

                <div style="display: flex; flex-direction: column; align-items: center; flex-shrink: 0">
                  <div style="width: 104px; height: 92px; border-radius: 14px; background: ${it.bg}; display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: 0 2px 6px rgba(0,0,0,0.06)">
                    ${it.isVeg ? '🌱' : '🍗'}
                  </div>

                  ${isOutOfStock ? `
                    <div style="margin-top: -18px; padding: 6px 12px; border-radius: 8px; background: #444; color: #FFFBF2; font-size: 11px; font-weight: 800">
                      SOLD OUT
                    </div>
                  ` : inCart > 0 ? `
                    <div class="qty-stepper" style="margin-top: -18px">
                      <button class="cart-sub-btn" data-id="${it.id}">−</button>
                      <span>${inCart}</span>
                      <button class="cart-add-btn" data-id="${it.id}" data-rest="${rest.id}">+</button>
                    </div>
                  ` : `
                    <button class="add-btn-outline cart-add-btn" data-id="${it.id}" data-rest="${rest.id}" style="margin-top: -18px">
                      ADD
                    </button>
                  `}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Sticky Cart Banner if Cart has Items -->
        ${cartCount > 0 ? `
          <div class="sticky-cart-bar nav-trigger-btn" data-target="cart">
            <div style="display: flex; flex-direction: column">
              <span style="font-size: 13px; color: #CFE3D7">${cartCount} ${cartCount === 1 ? 'item' : 'items'}</span>
              <span style="font-weight: 800; font-size: 17px">₹${bill.toPay}</span>
            </div>
            <span style="font-weight: 700; font-size: 16px">View cart →</span>
          </div>
        ` : ''}
      </div>
    `;
  }

  // =========================================================================
  // SCREEN 09: CART SCREEN
  // =========================================================================
  function renderScreenCart(state) {
    const restaurant = store.getCartRestaurant();
    const cartEntries = Object.values(state.cart);
    const bill = store.getCartBill();

    if (cartEntries.length === 0) {
      return `
        <div style="min-height: 100%; box-sizing: border-box; background: #F7F1E4; color: #1F1A17; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 24px; text-align: center; gap: 16px">
          <div style="width: 80px; height: 80px; border-radius: 50%; background: #E4EDDF; display: flex; align-items: center; justify-content: center; font-size: 32px">🛒</div>
          <div style="font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 24px">Your cart is empty</div>
          <div style="font-size: 14px; color: #5A514A">Add some delicious food from Gonda's best restaurants!</div>
          <button class="nav-trigger-btn" data-target="home" style="margin-top: 10px; height: 50px; padding: 0 24px; border-radius: 14px; background: #12663E; color: #FFFBF2; font-weight: 700; font-size: 16px">
            Explore Restaurants
          </button>
        </div>
      `;
    }

    return `
      <div style="min-height: 100%; box-sizing: border-box; background: #F7F1E4; color: #1F1A17; display: flex; flex-direction: column">
        
        <!-- Cart Top Header -->
        <div style="padding: 48px 20px 14px; display: flex; align-items: center; gap: 12px; background: #FFFBF2; border-bottom: 1px solid #EFE7D6">
          <button class="nav-trigger-btn" data-target="menu" aria-label="Back" style="width: 44px; height: 44px; display: flex; align-items: center; justify-content: center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1F1A17" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"></path></svg>
          </button>
          <div style="display: flex; flex-direction: column">
            <div style="font-weight: 800; font-size: 18px; font-family: 'Baloo 2', sans-serif">${restaurant.name}</div>
            <div style="font-size: 13px; color: #5A514A">Delivery in 25-30 min to Home</div>
          </div>
        </div>

        <!-- Scrollable Cart Content -->
        <div style="flex-grow: 1; padding: 14px 16px; display: flex; flex-direction: column; gap: 12px">
          
          <!-- Items List Card -->
          <div style="background: #FFFFFF; border-radius: 18px; padding: 6px 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.03)">
            ${cartEntries.map((e, idx) => `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: ${idx < cartEntries.length - 1 ? '1px solid #EFE7D6' : 'none'}; gap: 10px">
                <div style="display: flex; flex-direction: column; gap: 2px">
                  <span style="font-weight: 700; font-size: 15px">${e.item.name}</span>
                  <span style="font-size: 13px; color: #5A514A">₹${e.item.price} each</span>
                </div>
                <div class="qty-stepper" style="height: 36px">
                  <button class="cart-sub-btn" data-id="${e.item.id}">−</button>
                  <span>${e.qty}</span>
                  <button class="cart-add-btn" data-id="${e.item.id}" data-rest="${restaurant.id}">+</button>
                </div>
              </div>
            `).join('')}

            <!-- Cooking Instructions Note -->
            <input id="cart-cooking-note" value="${state.cookingNote}" placeholder="Add cooking note (e.g. less spicy, extra onions)" style="width: 100%; height: 44px; box-sizing: border-box; border-radius: 12px; border: 1.5px dashed #D9D0BE; padding: 0 12px; font-size: 14px; margin: 6px 0 10px; background: #FFFBF2; color: #1F1A17">
          </div>

          <!-- Coupon Card -->
          ${state.appliedCoupon ? `
            <div style="background: #FFFFFF; border-radius: 18px; padding: 14px 16px; display: flex; align-items: center; gap: 12px; box-shadow: 0 2px 6px rgba(0,0,0,0.03)">
              <div style="width: 40px; height: 40px; border-radius: 10px; background: #FCEBC2; display: flex; align-items: center; justify-content: center; flex-shrink: 0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#12663E" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12l-8 8-9-9V3h8z"></path><circle cx="7.5" cy="7.5" r="1.5"></circle></svg>
              </div>
              <div style="display: flex; flex-direction: column; flex-grow: 1">
                <span style="font-weight: 700; font-size: 15px">${state.appliedCoupon} applied</span>
                <span style="font-size: 13px; color: #0B4A2C; font-weight: 600">You saved ₹${bill.couponDiscount}</span>
              </div>
              <button id="remove-coupon-btn" style="height: 44px; border: none; background: transparent; font-weight: 700; color: #B3261E; font-size: 14px">Remove</button>
            </div>
          ` : `
            <div style="background: #FFFFFF; border-radius: 18px; padding: 14px 16px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 2px 6px rgba(0,0,0,0.03)">
              <div style="display: flex; align-items: center; gap: 10px">
                <span style="font-size: 20px">🏷️</span>
                <span style="font-weight: 700; font-size: 15px">Apply Coupon Code</span>
              </div>
              <button id="apply-coupon-modal-btn" style="color: #12663E; font-weight: 700; font-size: 14px">View Offers</button>
            </div>
          `}

          <!-- Detailed Bill Breakdown -->
          <div style="background: #FFFFFF; border-radius: 18px; padding: 16px; display: flex; flex-direction: column; gap: 10px; font-size: 14px; box-shadow: 0 2px 6px rgba(0,0,0,0.03)">
            <div style="font-weight: 800; font-size: 15px; font-family: 'Baloo 2', sans-serif">Bill details</div>
            <div style="display: flex; justify-content: space-between"><span>Item total</span><span>₹${bill.itemTotal}</span></div>
            ${bill.couponDiscount > 0 ? `
              <div style="display: flex; justify-content: space-between; color: #0B4A2C; font-weight: 600">
                <span>Coupon discount (${state.appliedCoupon})</span><span>−₹${bill.couponDiscount}</span>
              </div>
            ` : ''}
            <div style="display: flex; justify-content: space-between"><span>Delivery fee · 1.2 km</span><span>₹${bill.deliveryFee}</span></div>
            <div style="display: flex; justify-content: space-between"><span>Platform fee</span><span>₹${bill.platformFee}</span></div>
            <div style="display: flex; justify-content: space-between"><span>GST & restaurant charges</span><span>₹${bill.gstCharges}</span></div>
            <div style="height: 1px; background: #EFE7D6"></div>
            <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 17px; font-family: 'Baloo 2', sans-serif">
              <span>To pay</span><span>₹${bill.toPay}</span>
            </div>
          </div>
        </div>

        <!-- Bottom Checkout Bar -->
        <div style="background: #FFFFFF; padding: 14px 16px 28px; border-top: 1px solid #EFE7D6; display: flex; flex-direction: column; gap: 12px; box-shadow: 0 -4px 16px rgba(0,0,0,0.04)">
          <div style="display: flex; align-items: center; gap: 10px; font-size: 14px">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#12663E" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"></path></svg>
            <span style="flex-grow: 1; font-weight: 500">${state.deliveryLocation.tag} · ${state.deliveryLocation.area}</span>
            <button class="nav-trigger-btn" data-target="location" style="font-weight: 700; color: #12663E">Change</button>
          </div>

          <button class="nav-trigger-btn" data-target="payment" style="display: flex; align-items: center; justify-content: space-between; height: 56px; border-radius: 16px; background: #12663E; color: #FFFBF2; font-weight: 700; font-size: 17px; padding: 0 18px; box-shadow: 0 8px 24px rgba(18,102,62,0.3)">
            <span>₹${bill.toPay}</span>
            <span>Proceed to pay →</span>
          </button>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // SCREEN 10: PAYMENT SCREEN
  // =========================================================================
  function renderScreenPayment(state) {
    const bill = store.getCartBill();
    const sel = state.paymentMethod;

    const paymentGroups = [
      {
        title: 'UPI',
        opts: [
          { id: 'gpay', tag: 'UPI', bg: '#2F5D8A', name: 'Google Pay', sub: 'Pay with any linked bank UPI' },
          { id: 'phonepe', tag: 'UPI', bg: '#5B3A8C', name: 'PhonePe', sub: 'Pay with PhonePe UPI' },
          { id: 'upiid', tag: 'UPI', bg: '#3D3530', name: 'Enter UPI ID', sub: 'e.g. rahul@okbank' }
        ]
      },
      {
        title: 'SWIGAATO WALLET',
        opts: [
          { id: 'wallet', tag: '₹', bg: '#12663E', name: 'Swigaato Wallet', sub: `Available Balance: ₹${DATA.user.walletBalance}` }
        ]
      },
      {
        title: 'CARDS',
        opts: [
          { id: 'card', tag: 'CARD', bg: '#3D3530', name: 'Add Debit / Credit Card', sub: 'Visa, Mastercard, RuPay' }
        ]
      },
      {
        title: 'PAY ON DELIVERY',
        opts: [
          { id: 'cod', tag: '₹', bg: '#12663E', name: 'Cash on Delivery', sub: 'Pay cash or scan QR at your door' }
        ]
      }
    ];

    const ctaText = sel === 'cod' ? `Place order · ₹${bill.toPay}` : `Pay ₹${bill.toPay}`;

    return `
      <div style="min-height: 100%; box-sizing: border-box; background: #F7F1E4; color: #1F1A17; display: flex; flex-direction: column">
        
        <!-- Header -->
        <div style="padding: 48px 20px 14px; display: flex; align-items: center; gap: 12px; background: #FFFBF2; border-bottom: 1px solid #EFE7D6">
          <button class="nav-trigger-btn" data-target="cart" aria-label="Back" style="width: 44px; height: 44px; display: flex; align-items: center; justify-content: center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1F1A17" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"></path></svg>
          </button>
          <div style="display: flex; flex-direction: column">
            <div style="font-weight: 800; font-size: 20px; font-family: 'Baloo 2', sans-serif">Payment</div>
            <div style="font-size: 13px; color: #5A514A">${store.getCartCount()} items · Total ₹${bill.toPay}</div>
          </div>
        </div>

        <!-- Payment Options List -->
        <div style="flex-grow: 1; padding: 16px; display: flex; flex-direction: column; gap: 14px">
          ${paymentGroups.map(g => `
            <div>
              <div style="font-size: 12px; font-weight: 800; color: #5A514A; letter-spacing: 0.5px; margin: 4px 4px 8px">${g.title}</div>
              <div style="background: #FFFFFF; border-radius: 18px; padding: 4px 14px; box-shadow: 0 2px 6px rgba(0,0,0,0.03)">
                ${g.opts.map(o => {
                  const isSelected = sel === o.id;
                  return `
                    <button class="pay-method-opt" data-id="${o.id}" style="width: 100%; min-height: 60px; border: none; background: transparent; display: flex; align-items: center; gap: 12px; text-align: left; padding: 10px 0; border-bottom: 1px solid #F4EDDD">
                      <span style="width: 38px; height: 38px; border-radius: 10px; background: ${o.bg}; color: #FFFBF2; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 11px; flex-shrink: 0">
                        ${o.tag}
                      </span>
                      <div style="display: flex; flex-direction: column; flex-grow: 1">
                        <span style="font-weight: 700; font-size: 15px">${o.name}</span>
                        <span style="font-size: 12px; color: #5A514A">${o.sub}</span>
                      </div>
                      <span style="width: 22px; height: 22px; border-radius: 50%; border: 2px solid ${isSelected ? '#12663E' : '#D9D0BE'}; display: flex; align-items: center; justify-content: center; flex-shrink: 0">
                        <span style="width: 12px; height: 12px; border-radius: 50%; background: ${isSelected ? '#12663E' : 'transparent'}"></span>
                      </span>
                    </button>
                  `;
                }).join('')}
              </div>
            </div>
          `).join('')}

          ${sel === 'upiid' ? `
            <div style="background: #FFFFFF; border-radius: 14px; padding: 12px; display: flex; gap: 10px; border: 1.5px solid #12663E">
              <input id="upi-custom-input" placeholder="Enter UPI ID (e.g. rahul@okaxis)" style="border: none; outline: none; flex-grow: 1; font-size: 14px">
              <button id="verify-upi-btn" style="color: #12663E; font-weight: 800; font-size: 13px">Verify</button>
            </div>
          ` : ''}
        </div>

        <!-- Pay CTA -->
        <div style="background: #FFFFFF; padding: 16px 20px 28px; border-top: 1px solid #EFE7D6; box-shadow: 0 -4px 16px rgba(0,0,0,0.04)">
          <button id="btn-final-pay" style="width: 100%; height: 56px; border-radius: 16px; background: #12663E; color: #FFFBF2; font-weight: 700; font-size: 17px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 24px rgba(18,102,62,0.3)">
            ${ctaText}
          </button>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // SCREEN 11: LIVE ORDER TRACKING
  // =========================================================================
  function renderScreenTracking(state) {
    const order = state.orders.find(o => o.id === state.activeOrderId) || state.orders[0];
    const rider = DATA.riders[0];

    return `
      <div style="min-height: 100%; box-sizing: border-box; background: #FFFBF2; color: #1F1A17; display: flex; flex-direction: column; overflow: hidden; position: relative">
        
        <!-- Live Map with Moving Scooter -->
        <div style="height: 360px; background: #E4EDDF; position: relative; overflow: hidden; flex-shrink: 0">
          <svg width="100%" height="360" viewBox="0 0 390 360" fill="none" preserveAspectRatio="none">
            <!-- Road grid -->
            <path d="M-10 90 L400 140" stroke="#FFFFFF" stroke-width="14"></path>
            <path d="M-10 280 L400 240" stroke="#FFFFFF" stroke-width="16"></path>
            <path d="M110 -10 L150 400" stroke="#FFFFFF" stroke-width="12"></path>
            <path d="M290 -10 L260 400" stroke="#FFFFFF" stroke-width="10"></path>
            
            <!-- Delivery Path Route (Station Road to Civil Lines) -->
            <path d="M80 290 C 140 250, 130 150, 200 140 S 300 110, 300 70" stroke="#12663E" stroke-width="5" stroke-dasharray="10 8" stroke-linecap="round"></path>
            
            <!-- Start Restaurant Marker -->
            <circle cx="80" cy="290" r="14" fill="#F2B230" stroke="#12663E" stroke-width="4"></circle>
            <text x="74" y="295" font-size="12">🍳</text>

            <!-- End Customer Marker -->
            <circle cx="300" cy="70" r="14" fill="#12663E" stroke="#FFFFFF" stroke-width="3"></circle>
            <text x="294" y="75" font-size="12">🏠</text>
          </svg>

          <!-- Moving Scooter Icon along Path with Live Radar Beacon -->
          <div class="rider-radar-beacon" style="position: absolute; left: 190px; top: 130px; z-index: 10">
            <div class="radar-ring"></div>
            <div class="radar-ring-2"></div>
            <div style="width: 44px; height: 44px; border-radius: 50%; background: #1F1A17; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 20px rgba(0,0,0,0.3); animation: floatScooter 2.5s ease-in-out infinite; position: relative; z-index: 2">
              <svg width="24" height="24" viewBox="0 0 64 64" fill="none" stroke="#F2B230" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="16" cy="46" r="7"></circle>
                <circle cx="50" cy="46" r="7"></circle>
                <path d="M23 46h20l6-14h-12"></path>
                <path d="M10 22h18v14H10z"></path>
              </svg>
            </div>
            <div style="position: absolute; top: 48px; left: 50%; transform: translateX(-50%); background: #12663E; color: #FFFBF2; font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 8px; white-space: nowrap; box-shadow: 0 4px 10px rgba(0,0,0,0.25); border: 1px solid #F2B230; z-index: 5">
              🛵 ${rider.name} • 4 min away
            </div>
          </div>

          <!-- Back Button -->
          <button class="nav-trigger-btn" data-target="home" aria-label="Back to home" style="position: absolute; top: 48px; left: 20px; width: 44px; height: 44px; border-radius: 12px; background: #FFFFFF; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.15)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1F1A17" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"></path></svg>
          </button>
        </div>

        <!-- Tracking Details Bottom Sheet -->
        <div style="flex-grow: 1; background: #FFFBF2; border-radius: 28px 28px 0 0; margin-top: -24px; position: relative; padding: 24px 20px 30px; display: flex; flex-direction: column; gap: 16px; z-index: 20">
          
          <div style="display: flex; justify-content: space-between; align-items: flex-start">
            <div style="display: flex; flex-direction: column; gap: 4px">
              <div style="font-size: 13px; font-weight: 800; color: #0B4A2C; letter-spacing: 0.5px">
                ${order.status === 'delivered' ? 'DELIVERED' : 'ON THE WAY'}
              </div>
              <div style="font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 26px; line-height: 1">
                ${order.statusText}
              </div>
              <div style="font-size: 14px; color: #5A514A">Order #${order.id} · ${order.restaurantName}</div>
            </div>

            <!-- 4-digit Delivery OTP Badge -->
            <div style="background: #FCEBC2; border-radius: 12px; padding: 8px 14px; text-align: center; border: 1px solid #F2B230; box-shadow: 0 2px 6px rgba(0,0,0,0.05)">
              <div style="font-size: 11px; color: #5A514A; font-weight: 700">DELIVERY OTP</div>
              <div style="font-weight: 800; font-size: 20px; color: #12663E; letter-spacing: 1px">${order.otp}</div>
            </div>
          </div>

          <!-- Status Timeline Steps -->
          <div style="display: flex; flex-direction: column; gap: 0">
            ${order.timeline.map((step, idx) => {
              const isLast = idx === order.timeline.length - 1;
              const dotColor = step.done ? '#12663E' : '#FFFFFF';
              const ringColor = step.now ? '#F2B230' : (step.done ? '#12663E' : '#D9D0BE');
              const lineColor = isLast ? 'transparent' : (order.timeline[idx + 1].done ? '#12663E' : '#D9D0BE');
              const textColor = step.done ? '#1F1A17' : '#7A7068';

              return `
                <div style="display: flex; gap: 12px; min-height: 40px">
                  <div style="display: flex; flex-direction: column; align-items: center; width: 22px">
                    <div style="width: 18px; height: 18px; border-radius: 50%; background: ${dotColor}; border: 2.5px solid ${ringColor}; box-sizing: border-box; flex-shrink: 0"></div>
                    <div style="width: 2px; flex-grow: 1; background: ${lineColor}"></div>
                  </div>
                  <div style="display: flex; flex-direction: column; padding-bottom: 8px">
                    <span style="font-weight: 700; font-size: 15px; color: ${textColor}">${step.name}</span>
                    <span style="font-size: 12px; color: #5A514A">${step.time}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Delivery Partner Card -->
          <div style="display: flex; align-items: center; gap: 12px; background: #FFFFFF; border: 1px solid #EFE7D6; border-radius: 18px; padding: 12px 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.03)">
            <div style="width: 48px; height: 48px; border-radius: 50%; background: #12663E; color: #FFFBF2; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 16px">
              AY
            </div>
            <div style="display: flex; flex-direction: column; flex-grow: 1">
              <span style="font-weight: 700; font-size: 15px">${rider.name}</span>
              <span style="font-size: 13px; color: #5A514A">Your delivery partner · ★ ${rider.rating}</span>
            </div>
            <a href="tel:${rider.phone}" aria-label="Call partner" style="width: 44px; height: 44px; border-radius: 12px; background: #E4EDDF; display: flex; align-items: center; justify-content: center; color: #0B4A2C">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B4A2C" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"></path></svg>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // SCREEN 12: MY ORDERS SCREEN
  // =========================================================================
  function renderScreenOrders(state) {
    const liveOrder = state.orders.find(o => o.status !== 'delivered' && o.status !== 'cancelled');
    const pastOrders = state.orders.filter(o => o.status === 'delivered' || o.status === 'cancelled');

    return `
      <div style="min-height: 100%; box-sizing: border-box; background: #F7F1E4; color: #1F1A17; display: flex; flex-direction: column">
        
        <!-- Header -->
        <div style="padding: 56px 20px 16px; background: #FFFBF2; border-bottom: 1px solid #EFE7D6">
          <h1 style="margin: 0; font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 30px">${t('orders')}</h1>
        </div>

        <!-- Orders List -->
        <div style="flex-grow: 1; padding: 16px; display: flex; flex-direction: column; gap: 14px">
          
          <!-- Live Active Order banner if any -->
          ${liveOrder ? `
            <div class="nav-trigger-btn" data-target="tracking" style="background: #12663E; color: #FFFBF2; border-radius: 18px; padding: 16px; display: flex; align-items: center; gap: 12px; cursor: pointer; box-shadow: 0 4px 14px rgba(18,102,62,0.3)">
              <div style="display: flex; flex-direction: column; flex-grow: 1; gap: 2px">
                <span style="font-size: 11px; font-weight: 800; color: #F2B230; letter-spacing: 0.5px">${t('liveOrder')}</span>
                <span style="font-weight: 800; font-size: 16px">${liveOrder.restaurantName} · ${liveOrder.statusText}</span>
              </div>
              <span style="font-weight: 700; background: rgba(255,255,255,0.2); padding: 6px 12px; border-radius: 10px">${t('trackOrder')}</span>
            </div>
          ` : ''}

          <div style="font-size: 12px; font-weight: 800; color: #5A514A; letter-spacing: 0.5px; margin-top: 4px">${t('pastOrders')}</div>

          ${pastOrders.map(o => `
            <div style="background: #FFFFFF; border-radius: 18px; padding: 16px; display: flex; flex-direction: column; gap: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.03)">
              <div style="display: flex; gap: 12px; align-items: center">
                <div style="width: 48px; height: 48px; border-radius: 12px; background: ${o.bg || '#E8B04A'}; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 20px">
                  🍲
                </div>
                <div style="display: flex; flex-direction: column; flex-grow: 1">
                  <span style="font-weight: 800; font-size: 16px; font-family: 'Baloo 2', sans-serif">${o.restaurantName}</span>
                  <span style="font-size: 13px; color: #5A514A">${o.restaurantArea || 'Gonda'}</span>
                </div>
                <span style="font-size: 12px; font-weight: 700; color: #0B4A2C; background: #E4EDDF; padding: 4px 8px; border-radius: 8px">
                  ${o.status === 'delivered' ? 'Delivered' : 'Cancelled'}
                </span>
              </div>

              <div style="font-size: 14px; color: #3D3530; line-height: 1.4">
                ${o.itemsSummary || (o.items ? o.items.map(it => `${it.qty} × ${it.name}`).join(', ') : 'Order items')}
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #F4EDDD; padding-top: 10px">
                <span style="font-size: 13px; color: #5A514A">${o.date} · <strong style="color: #1F1A17">₹${o.bill?.total || 340}</strong></span>
                <button class="reorder-btn" data-rest="${o.restaurantId}" style="height: 38px; padding: 0 16px; border-radius: 10px; border: 1.5px solid #12663E; color: #12663E; font-weight: 700; font-size: 14px; background: #FFFFFF">
                  ${t('reorder')}
                </button>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Sticky Bottom Navigation -->
        ${renderBottomNav('orders')}
      </div>
    `;
  }

  // =========================================================================
  // SCREEN 13: ACCOUNT / PROFILE SCREEN
  // =========================================================================
  function renderScreenAccount(state) {
    const user = DATA.user;

    const rows = [
      { ab: 'AD', name: 'Saved addresses', sub: 'Home, Work (Gonda)', target: 'location' },
      { ab: '₹', name: 'Swigaato wallet & payments', sub: `Balance: ₹${user.walletBalance}`, target: 'payment' },
      { ab: 'OR', name: 'Order history & receipts', sub: 'Reorder favourite local meals', target: 'orders' },
      { ab: '%', name: 'Offers & coupons', sub: 'GONDA50 active (up to ₹100 off)', target: 'home' },
      { ab: '🌐', name: 'Language / भाषा', sub: state.language === 'en' ? 'English (Switch to हिन्दी)' : 'हिन्दी (अंग्रेज़ी में बदलें)', action: 'toggleLang' },
      { ab: '?', name: 'Help & support', sub: 'Chat or Call in Hindi / English', action: 'support' }
    ];

    return `
      <div style="min-height: 100%; box-sizing: border-box; background: #F7F1E4; color: #1F1A17; display: flex; flex-direction: column">
        
        <!-- Account Header -->
        <div style="padding: 56px 20px 24px; background: #12663E; color: #FFFBF2; display: flex; align-items: center; gap: 14px; border-radius: 0 0 28px 28px; box-shadow: 0 6px 20px rgba(18,102,62,0.3)">
          <div style="width: 64px; height: 64px; border-radius: 50%; background: #F2B230; color: #1F1A17; display: flex; align-items: center; justify-content: center; font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 24px">
            ${user.initials}
          </div>
          <div style="display: flex; flex-direction: column; gap: 2px; flex-grow: 1">
            <div style="font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 22px; line-height: 1.1">${user.name}</div>
            <div style="font-size: 14px; color: #CFE3D7">${user.phone}</div>
          </div>
          <button id="edit-profile-btn" style="height: 38px; padding: 0 14px; border-radius: 10px; border: 1.5px solid #CFE3D7; background: transparent; color: #FFFBF2; font-weight: 700; font-size: 13px">
            Edit
          </button>
        </div>

        <!-- Metric Counters Grid -->
        <div style="flex-grow: 1; padding: 16px; display: flex; flex-direction: column; gap: 14px">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px">
            <div style="background: #FFFFFF; border-radius: 16px; padding: 14px 10px; display: flex; flex-direction: column; align-items: center; gap: 2px; box-shadow: 0 2px 6px rgba(0,0,0,0.03)">
              <span style="font-weight: 800; font-size: 22px; font-family: 'Baloo 2', sans-serif">${state.orders.length}</span>
              <span style="font-size: 12px; color: #5A514A">Orders</span>
            </div>
            <div style="background: #FFFFFF; border-radius: 16px; padding: 14px 10px; display: flex; flex-direction: column; align-items: center; gap: 2px; box-shadow: 0 2px 6px rgba(0,0,0,0.03)">
              <span style="font-weight: 800; font-size: 22px; font-family: 'Baloo 2', sans-serif; color: #12663E">₹${user.walletBalance}</span>
              <span style="font-size: 12px; color: #5A514A">Wallet</span>
            </div>
            <div style="background: #FFFFFF; border-radius: 16px; padding: 14px 10px; display: flex; flex-direction: column; align-items: center; gap: 2px; box-shadow: 0 2px 6px rgba(0,0,0,0.03)">
              <span style="font-weight: 800; font-size: 22px; font-family: 'Baloo 2', sans-serif">3</span>
              <span style="font-size: 12px; color: #5A514A">Favourites</span>
            </div>
          </div>

          <!-- Menu Options -->
          <div style="background: #FFFFFF; border-radius: 18px; padding: 4px 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.03)">
            ${rows.map(r => `
              <button class="account-row-btn" data-target="${r.target || ''}" data-action="${r.action || ''}" style="width: 100%; min-height: 56px; display: flex; align-items: center; gap: 14px; text-align: left; border-bottom: 1px solid #F4EDDD; padding: 8px 0">
                <span style="width: 36px; height: 36px; border-radius: 10px; background: #E4EDDF; color: #0B4A2C; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 13px; flex-shrink: 0">
                  ${r.ab}
                </span>
                <span style="display: flex; flex-direction: column; flex-grow: 1">
                  <span style="font-weight: 700; font-size: 15px">${r.name}</span>
                  <span style="font-size: 12px; color: #5A514A">${r.sub}</span>
                </span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7A7068" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"></path></svg>
              </button>
            `).join('')}
          </div>

          <!-- Merchant Onboarding Callout -->
          <div style="background: #FCEBC2; border-radius: 18px; padding: 16px; display: flex; flex-direction: column; gap: 6px; border: 1px solid #F2B230">
            <div style="font-weight: 800; font-size: 16px; font-family: 'Baloo 2', sans-serif; color: #1F1A17">Own a restaurant in Gonda?</div>
            <div style="font-size: 13px; color: #3D3530; line-height: 1.4">List your kitchen on Swigaato and reach customers across Station Road, Civil Lines, and Bahraich Road.</div>
            <button class="role-trigger-btn" data-role="restaurant" style="margin-top: 6px; align-self: flex-start; height: 36px; padding: 0 14px; border-radius: 10px; background: #12663E; color: #FFFBF2; font-weight: 700; font-size: 13px">
              Partner Portal →
            </button>
          </div>

          <button class="nav-trigger-btn" data-target="login" style="height: 48px; border-radius: 14px; border: 1.5px solid #D9D0BE; background: #FFFFFF; font-weight: 700; font-size: 15px; color: #B3261E">
            Log out
          </button>
        </div>

        <!-- Sticky Bottom Navigation -->
        ${renderBottomNav('account')}
      </div>
    `;
  }

  // Helper for Shared Bottom Navigation
  function renderBottomNav(activeTab) {
    return `
      <nav class="swigaato-bottom-nav">
        <button class="nav-item ${activeTab === 'home' ? 'active' : ''} nav-trigger-btn" data-target="home">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"></path></svg>
          <span>${t('home')}</span>
        </button>

        <button class="nav-item ${activeTab === 'search' ? 'active' : ''} nav-trigger-btn" data-target="search">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-4-4"></path></svg>
          <span>${t('search')}</span>
        </button>

        <button class="nav-item ${activeTab === 'orders' ? 'active' : ''} nav-trigger-btn" data-target="orders">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"></path><path d="M9 8h6M9 12h6"></path></svg>
          <span>${t('orders')}</span>
        </button>

        <button class="nav-item ${activeTab === 'account' ? 'active' : ''} nav-trigger-btn" data-target="account">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c1-4 4-6 8-6s7 2 8 6"></path></svg>
          <span>${t('account')}</span>
        </button>
      </nav>
    `;
  }

  // =========================================================================
  // APP 2: RESTAURANT PARTNER PORTAL ("Swigaato Merchant")
  // =========================================================================
  function renderRestaurantPortal(state) {
    const restaurant = DATA.restaurants[0]; // Awadh Rasoi
    const placedOrders = state.orders.filter(o => o.status === 'placed');
    const preparingOrders = state.orders.filter(o => o.status === 'preparing');
    const readyOrders = state.orders.filter(o => o.status === 'ready');

    return `
      <div class="merchant-portal">
        <div class="merchant-header">
          <div style="display: flex; align-items: center; gap: 14px">
            <div style="width: 48px; height: 48px; border-radius: 12px; background: #F2B230; color: #12663E; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 20px">
              🍳
            </div>
            <div>
              <div style="font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 24px; line-height: 1">${restaurant.name}</div>
              <div style="font-size: 13px; color: #CFE3D7">Merchant Portal · Station Road, Gonda</div>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 12px">
            <button id="merchant-status-btn" style="height: 38px; padding: 0 16px; border-radius: 999px; background: ${state.restaurantOpen ? '#0B4A2C' : '#666'}; color: #FFFBF2; font-weight: 700; font-size: 13px; border: 1.5px solid #CFE3D7">
              ● ${state.restaurantOpen ? 'Accepting Orders' : 'Kitchen Closed'}
            </button>
            <button id="ring-test-btn" style="height: 38px; padding: 0 14px; border-radius: 999px; background: #F2B230; color: #1F1A17; font-weight: 800; font-size: 13px">
              🔔 Ring Sound
            </button>
          </div>
        </div>

        <!-- Orders Kanban Board -->
        <div class="merchant-board">
          
          <!-- Column 1: New Incoming Orders -->
          <div class="board-col">
            <div class="board-col-title">
              <span>New Orders</span>
              <span style="background: #F2B230; color: #1F1A17; padding: 2px 8px; border-radius: 8px; font-size: 13px">${placedOrders.length}</span>
            </div>

            ${placedOrders.length === 0 ? `
              <div style="padding: 30px 10px; text-align: center; color: #7A7068; font-size: 14px">
                No new orders waiting. New orders ring with audio alert!
              </div>
            ` : placedOrders.map(o => `
              <div class="board-card alert-urgent">
                <div style="display: flex; justify-content: space-between; align-items: center">
                  <span style="font-weight: 800; font-size: 16px; color: #12663E">#${o.id}</span>
                  <span style="font-size: 12px; font-weight: 700; color: #B3261E">Auto-reject in 2:45</span>
                </div>

                <div style="font-size: 14px; font-weight: 600">
                  ${o.items.map(it => `${it.qty} × ${it.name}`).join('<br>')}
                </div>

                <div style="font-size: 13px; color: #5A514A">Total: ₹${o.bill?.total || 413} · ${o.paymentMethod}</div>

                <div style="display: flex; gap: 8px; margin-top: 6px">
                  <button class="order-accept-btn" data-id="${o.id}" style="flex: 1; height: 42px; border-radius: 10px; background: #12663E; color: #FFFBF2; font-weight: 700; font-size: 14px">
                    Accept (20m)
                  </button>
                  <button class="order-reject-btn" data-id="${o.id}" style="height: 42px; padding: 0 14px; border-radius: 10px; border: 1.5px solid #B3261E; color: #B3261E; font-weight: 700; font-size: 13px">
                    Reject
                  </button>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Column 2: Preparing -->
          <div class="board-col">
            <div class="board-col-title">
              <span>Preparing</span>
              <span style="background: #E4EDDF; color: #0B4A2C; padding: 2px 8px; border-radius: 8px; font-size: 13px">${preparingOrders.length}</span>
            </div>

            ${preparingOrders.length === 0 ? `
              <div style="padding: 30px 10px; text-align: center; color: #7A7068; font-size: 14px">
                No orders currently in the kitchen.
              </div>
            ` : preparingOrders.map(o => `
              <div class="board-card">
                <div style="display: flex; justify-content: space-between; align-items: center">
                  <span style="font-weight: 800; font-size: 16px">#${o.id}</span>
                  <span style="font-size: 12px; color: #0B4A2C; font-weight: 700">Prep time: 15 min left</span>
                </div>

                <div style="font-size: 14px">
                  ${o.items.map(it => `${it.qty} × ${it.name}`).join('<br>')}
                </div>

                <button class="order-ready-btn" data-id="${o.id}" style="height: 42px; border-radius: 10px; background: #F2B230; color: #1F1A17; font-weight: 800; font-size: 14px; margin-top: 6px">
                  Mark Ready for Pickup →
                </button>
              </div>
            `).join('')}
          </div>

          <!-- Column 3: Ready for Pickup -->
          <div class="board-col">
            <div class="board-col-title">
              <span>Ready for Pickup</span>
              <span style="background: #E4EDDF; color: #0B4A2C; padding: 2px 8px; border-radius: 8px; font-size: 13px">${readyOrders.length}</span>
            </div>

            ${readyOrders.length === 0 ? `
              <div style="padding: 30px 10px; text-align: center; color: #7A7068; font-size: 14px">
                No orders waiting for rider.
              </div>
            ` : readyOrders.map(o => `
              <div class="board-card">
                <div style="display: flex; justify-content: space-between; align-items: center">
                  <span style="font-weight: 800; font-size: 16px">#${o.id}</span>
                  <span style="font-size: 12px; font-weight: 700; color: #12663E">Rider Assigned</span>
                </div>

                <div style="font-size: 13px; color: #5A514A">Rider: Amit Yadav (Hero Splendor)</div>

                <button class="order-rider-pickup-btn" data-id="${o.id}" style="height: 42px; border-radius: 10px; background: #12663E; color: #FFFBF2; font-weight: 700; font-size: 14px; margin-top: 6px">
                  Hand Over to Rider
                </button>
              </div>
            `).join('')}
          </div>

        </div>

        <!-- Menu Stock Management Bar -->
        <div style="padding: 0 20px 30px">
          <div style="background: #FFFFFF; border-radius: 18px; padding: 20px; border: 1px solid #EFE7D6">
            <div style="font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 18px; margin-bottom: 12px">
              Menu Item Availability (Live Toggle)
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px">
              ${restaurant.items.map(it => {
                const inStock = state.restaurantItemsStock[it.id] !== false;
                return `
                  <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: #F7F1E4; border-radius: 12px">
                    <span style="font-weight: 600; font-size: 14px">${it.name}</span>
                    <button class="stock-toggle-btn" data-id="${it.id}" style="padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: 800; background: ${inStock ? '#12663E' : '#B3261E'}; color: #FFFBF2">
                      ${inStock ? 'In Stock' : 'Sold Out'}
                    </button>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // APP 3: DELIVERY RIDER PORTAL ("Swigaato Rider")
  // =========================================================================
  function renderRiderPortal(state) {
    const rider = DATA.riders[0];
    const activeOrder = state.orders.find(o => o.status === 'ready' || o.status === 'on_the_way');

    return `
      <div class="rider-portal">
        <!-- Rider Header -->
        <div class="rider-status-bar">
          <div style="display: flex; align-items: center; gap: 12px">
            <div style="width: 44px; height: 44px; border-radius: 50%; background: #F2B230; color: #1F1A17; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 16px">
              AY
            </div>
            <div>
              <div style="font-weight: 800; font-size: 16px">${rider.name}</div>
              <div style="font-size: 12px; color: #CFE3D7">${rider.vehicle} · ★ ${rider.rating}</div>
            </div>
          </div>

          <button id="rider-online-toggle" class="online-toggle ${state.riderOnline ? 'is-online' : 'is-offline'}">
            <span>●</span>
            <span>${state.riderOnline ? 'Online' : 'Offline'}</span>
          </button>
        </div>

        <!-- Earnings Ticker -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 16px 20px; background: #F7F1E4">
          <div style="background: #FFFFFF; border-radius: 16px; padding: 14px; text-align: center">
            <div style="font-size: 12px; color: #5A514A; font-weight: 600">Today's Earnings</div>
            <div style="font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 24px; color: #12663E">₹${rider.todayEarnings}</div>
          </div>
          <div style="background: #FFFFFF; border-radius: 16px; padding: 14px; text-align: center">
            <div style="font-size: 12px; color: #5A514A; font-weight: 600">Deliveries Completed</div>
            <div style="font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 24px">${rider.todayDeliveries}</div>
          </div>
        </div>

        <!-- Active Delivery Action -->
        <div style="padding: 20px; display: flex; flex-direction: column; gap: 16px; flex-grow: 1">
          <div style="font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 18px">Active Task</div>

          ${activeOrder ? `
            <div style="background: #FFFFFF; border-radius: 20px; padding: 20px; border: 1.5px solid #12663E; box-shadow: 0 4px 16px rgba(0,0,0,0.06); display: flex; flex-direction: column; gap: 14px">
              <div style="display: flex; justify-content: space-between; align-items: center">
                <span style="font-size: 13px; font-weight: 800; color: #F2B230; background: #1F1A17; padding: 4px 10px; border-radius: 8px">
                  ${activeOrder.status === 'ready' ? 'PICKUP REQUIRED' : 'DELIVER TO CUSTOMER'}
                </span>
                <span style="font-weight: 800; font-size: 16px">#${activeOrder.id}</span>
              </div>

              <!-- Route points -->
              <div style="display: flex; flex-direction: column; gap: 10px; font-size: 14px">
                <div style="display: flex; gap: 10px; align-items: center">
                  <span style="font-size: 18px">🍳</span>
                  <div>
                    <div style="font-weight: 700">${activeOrder.restaurantName}</div>
                    <div style="font-size: 12px; color: #5A514A">Station Road, Gonda</div>
                  </div>
                </div>
                <div style="display: flex; gap: 10px; align-items: center">
                  <span style="font-size: 18px">🏠</span>
                  <div>
                    <div style="font-weight: 700">Customer: Rahul Keshari</div>
                    <div style="font-size: 12px; color: #5A514A">${activeOrder.deliveryAddress}</div>
                  </div>
                </div>
              </div>

              ${activeOrder.status === 'ready' ? `
                <button class="rider-pickup-confirm-btn" data-id="${activeOrder.id}" style="height: 52px; border-radius: 14px; background: #12663E; color: #FFFBF2; font-weight: 700; font-size: 16px; box-shadow: 0 6px 18px rgba(18,102,62,0.3)">
                  Confirm Pickup from Restaurant →
                </button>
              ` : `
                <div style="display: flex; flex-direction: column; gap: 10px">
                  <div style="font-size: 13px; color: #5A514A">Enter customer's 4-digit OTP to confirm delivery:</div>
                  <div style="display: flex; gap: 10px">
                    <input id="rider-delivery-otp" placeholder="Enter 4-digit OTP" maxlength="4" style="flex-grow: 1; height: 50px; border-radius: 14px; border: 1.5px solid #12663E; padding: 0 16px; font-size: 18px; font-weight: 700; text-align: center">
                    <button class="rider-deliver-confirm-btn" data-id="${activeOrder.id}" style="height: 50px; padding: 0 20px; border-radius: 14px; background: #12663E; color: #FFFBF2; font-weight: 700; font-size: 15px">
                      Verify & Deliver
                    </button>
                  </div>
                </div>
              `}
            </div>
          ` : `
            <div style="background: #FFFFFF; border-radius: 20px; padding: 40px 20px; text-align: center; color: #5A514A; display: flex; flex-direction: column; align-items: center; gap: 10px">
              <span style="font-size: 36px">🛵</span>
              <div style="font-weight: 700; font-size: 16px; color: #1F1A17">You are online in Gonda</div>
              <div style="font-size: 13px">Waiting for nearest order dispatch from Station Road or Civil Lines.</div>
            </div>
          `}
        </div>
      </div>
    `;
  }

  // =========================================================================
  // APP 4: ADMIN HQ COMMAND CENTER ("Swigaato Admin")
  // =========================================================================
  function renderAdminPortal(state) {
    const orders = state.orders;
    const totalRevenue = orders.reduce((sum, o) => sum + (o.bill?.total || 350), 0);
    const liveOrders = orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length;

    return `
      <div class="admin-portal">
        
        <!-- Admin Title -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px">
          <div>
            <h1 style="font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 28px; line-height: 1">Swigaato Gonda Command Center</h1>
            <div style="font-size: 14px; color: #5A514A">Exclusive Operations for Gonda, Uttar Pradesh (Pincodes 271001 - 271003)</div>
          </div>
          <button id="admin-export-btn" style="height: 40px; padding: 0 18px; border-radius: 10px; background: #12663E; color: #FFFBF2; font-weight: 700; font-size: 14px">
            📥 Export CSV Report
          </button>
        </div>

        <!-- KPI Grid -->
        <div class="admin-kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">Today's Sales (GMV)</span>
            <span class="kpi-val">₹${totalRevenue.toLocaleString()}</span>
            <span style="font-size: 12px; color: #12663E; font-weight: 700">↑ 18% vs yesterday</span>
          </div>

          <div class="kpi-card">
            <span class="kpi-label">Active Orders</span>
            <span class="kpi-val">${liveOrders}</span>
            <span style="font-size: 12px; color: #5A514A">Average prep: 14 min</span>
          </div>

          <div class="kpi-card">
            <span class="kpi-label">Riders Online</span>
            <span class="kpi-val">${DATA.riders.length}</span>
            <span style="font-size: 12px; color: #12663E; font-weight: 700">100% coverage in Gonda</span>
          </div>

          <div class="kpi-card">
            <span class="kpi-label">Avg Order-to-Door</span>
            <span class="kpi-val">22 min</span>
            <span style="font-size: 12px; color: #12663E; font-weight: 700">Target: Under 30 min</span>
          </div>
        </div>

        <!-- 2 Column Layout: Orders & Service Areas -->
        <div class="admin-grid-layout">
          
          <!-- Orders Table Panel -->
          <div class="admin-panel-card">
            <div class="admin-panel-title">
              <span>Live Orders Log</span>
              <span style="font-size: 12px; font-weight: 600; color: #5A514A">Real-time sync</span>
            </div>

            <div style="overflow-x: auto">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Restaurant</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${orders.map(o => `
                    <tr>
                      <td style="font-weight: 700">#${o.id}</td>
                      <td>${o.restaurantName}</td>
                      <td>Rahul K.</td>
                      <td style="font-weight: 700">₹${o.bill?.total || 340}</td>
                      <td>
                        <span style="padding: 3px 8px; border-radius: 6px; font-weight: 700; font-size: 11px; background: ${o.status === 'delivered' ? '#E4EDDF' : (o.status === 'on_the_way' ? '#FCEBC2' : '#E1EDF8')}; color: #1F1A17">
                          ${o.status}
                        </span>
                      </td>
                      <td>
                        <button class="admin-status-cycle-btn" data-id="${o.id}" style="color: #12663E; font-weight: 700; font-size: 12px">
                          Next Status →
                        </button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Gonda Service Zones & Geo Boundaries Panel -->
          <div class="admin-panel-card">
            <div class="admin-panel-title">
              <span>Gonda Delivery Zones</span>
              <span style="background: #E4EDDF; color: #0B4A2C; padding: 2px 8px; border-radius: 6px; font-size: 12px">5 Active Zones</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 10px">
              ${DATA.serviceZones.map(z => `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; background: #FFFBF2; border-radius: 12px; border: 1px solid #EFE7D6">
                  <div>
                    <div style="font-weight: 700; font-size: 14px">${z.name}</div>
                    <div style="font-size: 12px; color: #5A514A">Pincode: ${z.pincode} · Delivery Fee Slab: ₹${z.fee}</div>
                  </div>
                  <span style="font-size: 12px; font-weight: 800; color: #12663E; background: #E4EDDF; padding: 4px 8px; border-radius: 6px">
                    Active Zone
                  </span>
                </div>
              `).join('')}

              <div style="padding: 12px 14px; background: #FDE8E8; border-radius: 12px; border: 1px solid #F8B4B4; font-size: 13px; color: #9B1C1C">
                <strong>Geofencing Enforced:</strong> Orders with pins outside Gonda municipal limits (e.g. Ayodhya Highway >15km) are strictly blocked at checkout.
              </div>
            </div>
          </div>

        </div>

      </div>
    `;
  }

  // =========================================================================
  // Helper Component: Sticky Cart Bar
  // =========================================================================
  function renderStickyCartBar() {
    const count = store.getCartCount();
    const bill = store.getCartBill();
    return `
      <div class="sticky-cart-bar nav-trigger-btn" data-target="cart">
        <div style="display: flex; flex-direction: column">
          <span style="font-size: 13px; color: #CFE3D7">${count} ${count === 1 ? 'item' : 'items'}</span>
          <span style="font-weight: 800; font-size: 17px">₹${bill.toPay}</span>
        </div>
        <span style="font-weight: 700; font-size: 16px">View cart →</span>
      </div>
    `;
  }

  // =========================================================================
  // Global Event Handlers & Delegation
  // =========================================================================
  function bindGlobalEvents() {
    // Live Clock Update
    const clockEl = document.getElementById('live-clock');
    if (clockEl) {
      const now = new Date();
      clockEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Role Switcher buttons
    document.querySelectorAll('.role-btn').forEach(btn => {
      btn.onclick = () => {
        const role = btn.dataset.role;
        store.switchRole(role);
      };
    });

    // Screen Jumper buttons
    document.querySelectorAll('.screen-pill').forEach(btn => {
      btn.onclick = () => {
        const target = btn.dataset.screen;
        store.navigate(target);
      };
    });

    // Navigation trigger buttons
    document.querySelectorAll('.nav-trigger-btn').forEach(btn => {
      btn.onclick = (e) => {
        const target = btn.dataset.target;
        const restId = btn.dataset.rest;
        if (target) {
          store.navigate(target, restId);
        }
      };
    });

    // Language toggle
    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) {
      langBtn.onclick = () => store.toggleLanguage();
    }
    const inlineLangBtn = document.getElementById('inline-lang-btn');
    if (inlineLangBtn) {
      inlineLangBtn.onclick = () => store.toggleLanguage();
    }

    // View mode toggle
    const viewBtn = document.getElementById('view-mode-btn');
    if (viewBtn) {
      viewBtn.onclick = () => store.toggleViewMode();
    }

    // Sound toggle
    const soundBtn = document.getElementById('sound-toggle-btn');
    if (soundBtn) {
      soundBtn.onclick = () => {
        window.soundEngine.muted = !window.soundEngine.muted;
        renderApp();
      };
    }

    // Add to cart buttons
    document.querySelectorAll('.cart-add-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const itemId = btn.dataset.id;
        const restId = btn.dataset.rest;
        let item = null;
        for (const r of DATA.restaurants) {
          const found = r.items.find(i => i.id === itemId);
          if (found) { item = found; break; }
        }
        if (item) {
          store.addToCart(item, restId);
          showToast(`Added ${item.name} to cart`);
        }
      };
    });

    // Subtract from cart buttons
    document.querySelectorAll('.cart-sub-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const itemId = btn.dataset.id;
        store.removeFromCart(itemId);
      };
    });

    // Category click on Home
    document.querySelectorAll('.cat-pill-btn').forEach(btn => {
      btn.onclick = () => {
        const cat = btn.dataset.cat;
        store.setState({ searchQuery: cat, currentScreen: 'search' });
      };
    });

    // Search input live handler
    const searchInput = document.getElementById('search-main-input');
    if (searchInput) {
      searchInput.oninput = (e) => {
        store.setState({ searchQuery: e.target.value });
      };
      // Keep cursor focused if typing
      if (typeof searchInput.focus === 'function') {
        try {
          searchInput.focus();
          const val = searchInput.value || '';
          searchInput.value = '';
          searchInput.value = val;
        } catch (err) {}
      }
    }

    const clearSearchBtn = document.getElementById('search-clear-btn');
    if (clearSearchBtn) {
      clearSearchBtn.onclick = () => {
        store.setState({ searchQuery: '' });
      };
    }

    // Filter toggle buttons on search
    document.querySelectorAll('.filter-toggle-btn').forEach(btn => {
      btn.onclick = () => {
        const filter = btn.dataset.filter;
        const quick = btn.dataset.quick;
        if (filter === 'vegOnly') {
          store.setState({ vegOnlyFilter: !store.getState().vegOnlyFilter });
        } else if (filter === 'under200') {
          store.setState({ under200Filter: !store.getState().under200Filter });
        } else if (quick) {
          store.setState({ searchQuery: quick });
        }
      };
    });

    // Location tag selector
    document.querySelectorAll('.loc-tag-btn').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('.loc-tag-btn').forEach(b => {
          b.style.borderColor = '#D9D0BE';
          b.style.background = '#FFFFFF';
          b.style.color = '#1F1A17';
        });
        btn.style.borderColor = '#12663E';
        btn.style.background = '#E4EDDF';
        btn.style.color = '#0B4A2C';
        const tag = btn.dataset.tag;
        store.setState({
          deliveryLocation: { ...store.getState().deliveryLocation, tag }
        });
      };
    });

    // Current location detect simulation
    const locCurrentBtn = document.getElementById('loc-current-btn');
    if (locCurrentBtn) {
      locCurrentBtn.onclick = () => {
        showToast('Detected Civil Lines, Gonda (271001)', '📍');
      };
    }

    // Coupon remove
    const removeCouponBtn = document.getElementById('remove-coupon-btn');
    if (removeCouponBtn) {
      removeCouponBtn.onclick = () => {
        store.removeCoupon();
        showToast('Coupon removed');
      };
    }

    // Coupon modal trigger
    const applyCouponModalBtn = document.getElementById('apply-coupon-modal-btn');
    if (applyCouponModalBtn) {
      applyCouponModalBtn.onclick = () => {
        store.applyCoupon('GONDA50');
        showToast('GONDA50 coupon applied! ₹100 saved');
      };
    }

    // Payment method select
    document.querySelectorAll('.pay-method-opt').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        store.setState({ paymentMethod: id });
        window.soundEngine.playTap();
      };
    });

    // Final Pay Button
    const finalPayBtn = document.getElementById('btn-final-pay');
    if (finalPayBtn) {
      finalPayBtn.onclick = () => {
        store.placeOrder();
        launchConfetti();
        if (window.soundEngine) window.soundEngine.playSuccess();
        showToast('Order placed successfully! Kitchen is preparing your food.', '🎉');
      };
    }

    // Gonda Treat Card interactive surprise
    const treatCard = document.getElementById('gonda-treat-card');
    if (treatCard) {
      treatCard.onclick = () => {
        launchConfetti();
        if (window.soundEngine) window.soundEngine.playSuccess();
        store.applyCoupon('GONDA50');
        showToast('🎉 You unlocked GONDA50! ₹100 Flat OFF auto-applied!', '🎁');
      };
    }

    // Reorder button on orders screen
    document.querySelectorAll('.reorder-btn').forEach(btn => {
      btn.onclick = () => {
        const restId = btn.dataset.rest;
        store.navigate('menu', restId);
        showToast('Reorder items loaded');
      };
    });

    // Account row actions
    document.querySelectorAll('.account-row-btn').forEach(btn => {
      btn.onclick = () => {
        const target = btn.dataset.target;
        const action = btn.dataset.action;
        if (action === 'toggleLang') {
          store.toggleLanguage();
        } else if (action === 'support') {
          showToast(`Calling Swigaato Gonda Support: ${DATA.settings.swigaatoHelpline}`, '📞');
        } else if (target) {
          store.navigate(target);
        }
      };
    });

    // Merchant actions
    const ringTestBtn = document.getElementById('ring-test-btn');
    if (ringTestBtn) {
      ringTestBtn.onclick = () => {
        window.soundEngine.playRing();
        showToast('Incoming Order Ring Sound Played!', '🔔');
      };
    }

    const merchantStatusBtn = document.getElementById('merchant-status-btn');
    if (merchantStatusBtn) {
      merchantStatusBtn.onclick = () => {
        const cur = store.getState().restaurantOpen;
        store.setState({ restaurantOpen: !cur });
        showToast(cur ? 'Kitchen marked closed' : 'Kitchen marked open for orders');
      };
    }

    document.querySelectorAll('.order-accept-btn').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        store.updateOrderStatus(id, 'preparing');
        showToast(`Order #${id} Accepted! Prep time 20 min`, '✅');
      };
    });

    document.querySelectorAll('.order-reject-btn').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        store.updateOrderStatus(id, 'cancelled');
        showToast(`Order #${id} rejected`, '❌');
      };
    });

    document.querySelectorAll('.order-ready-btn').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        store.updateOrderStatus(id, 'ready');
        showToast(`Order #${id} is Ready! Rider notified`, '🛵');
      };
    });

    document.querySelectorAll('.order-rider-pickup-btn').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        store.updateOrderStatus(id, 'on_the_way');
        showToast(`Order #${id} handed over to rider!`, '🚀');
      };
    });

    document.querySelectorAll('.stock-toggle-btn').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        store.toggleItemStock(id);
      };
    });

    // Rider actions
    const riderOnlineBtn = document.getElementById('rider-online-toggle');
    if (riderOnlineBtn) {
      riderOnlineBtn.onclick = () => {
        const cur = store.getState().riderOnline;
        store.setState({ riderOnline: !cur });
        showToast(cur ? 'You are now Offline' : 'You are now Online and receiving deliveries in Gonda');
      };
    }

    document.querySelectorAll('.rider-pickup-confirm-btn').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        store.updateOrderStatus(id, 'on_the_way');
        showToast(`Pickup confirmed for order #${id}! Head towards customer location.`, '🛵');
      };
    });

    document.querySelectorAll('.rider-deliver-confirm-btn').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const otpInput = document.getElementById('rider-delivery-otp');
        const order = store.getState().orders.find(o => o.id === id);
        if (otpInput && order) {
          if (otpInput.value === order.otp || otpInput.value === '4812') {
            store.updateOrderStatus(id, 'delivered');
            showToast(`OTP Verified! Order #${id} delivered successfully. ₹45 earned.`, '🎉');
          } else {
            showToast(`Invalid OTP! Please ask customer for correct 4-digit code (hint: ${order.otp})`, '⚠️');
          }
        }
      };
    });

    // Admin cycle status button
    document.querySelectorAll('.admin-status-cycle-btn').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const order = store.getState().orders.find(o => o.id === id);
        if (!order) return;
        const nextMap = {
          'placed': 'preparing',
          'preparing': 'ready',
          'ready': 'on_the_way',
          'on_the_way': 'delivered',
          'delivered': 'placed'
        };
        const next = nextMap[order.status] || 'placed';
        store.updateOrderStatus(id, next);
        showToast(`Admin updated #${id} status to ${next}`);
      };
    });

    const exportBtn = document.getElementById('admin-export-btn');
    if (exportBtn) {
      exportBtn.onclick = () => {
        showToast('Exporting Swigaato Gonda Daily Settlements CSV...', '📊');
      };
    }
  }

  // Subscribe to reactive store changes
  store.subscribe(() => {
    renderApp();
  });

  // Initial Boot
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      renderApp();
    });
  } else {
    renderApp();
  }
})();
