// Swigaato Reactive State Store
class SwigaatoStore {
  constructor() {
    this.listeners = new Set();
    
    // Load from localStorage or defaults
    let initial = null;
    try {
      const saved = localStorage.getItem('swigaato_state');
      if (saved) initial = JSON.parse(saved);
    } catch (e) {
      console.warn('Could not parse saved state:', e);
    }

    const defaultRest = (window.SWIGAATO_DATA && window.SWIGAATO_DATA.restaurants && window.SWIGAATO_DATA.restaurants[0]) || { items: [] };
    const item1 = defaultRest.items[0] || { id: 'aw-1', name: 'Chicken Dum Biryani', price: 220 };
    const item2 = defaultRest.items[2] || { id: 'aw-3', name: 'Galouti Kebab', price: 240 };

    this.state = {
      // Current mode: 'customer' | 'restaurant' | 'rider' | 'admin'
      currentRole: initial?.currentRole || 'customer',
      
      // Customer screen: 'splash' | 'onboarding' | 'login' | 'otp' | 'location' | 'home' | 'search' | 'menu' | 'cart' | 'payment' | 'tracking' | 'orders' | 'account'
      currentScreen: initial?.currentScreen || 'home',
      
      // Selected Restaurant
      currentRestaurantId: initial?.currentRestaurantId || 'rest-awadh',
      
      // Search term & filters
      searchQuery: '',
      vegOnlyFilter: false,
      under200Filter: false,
      minRatingFilter: false,
      selectedCategory: null,

      // Cart: { [itemId]: { item, qty, restaurantId } }
      cart: initial?.cart || {
        [item1.id]: { item: item1, qty: 1, restaurantId: 'rest-awadh' },
        [item2.id]: { item: item2, qty: 1, restaurantId: 'rest-awadh' }
      },
      appliedCoupon: initial?.appliedCoupon || 'GONDA50',
      cookingNote: initial?.cookingNote || '',

      // Current Delivery Address
      deliveryLocation: initial?.deliveryLocation || {
        tag: 'Home',
        address: 'Civil Lines, Near Gandhi Park, Gonda, Uttar Pradesh 271001',
        area: 'Civil Lines, Gonda',
        flat: 'H.No 24, behind SBI branch',
        pincode: '271001',
        isServiceable: true
      },

      // Payment Selection
      paymentMethod: initial?.paymentMethod || 'gpay', // 'gpay' | 'phonepe' | 'upiid' | 'card' | 'cod' | 'wallet'
      upiIdInput: '',

      // Orders List
      orders: initial?.orders || [...window.SWIGAATO_DATA.initialOrders],
      activeOrderId: initial?.activeOrderId || 'SW2841',

      // Rider State
      riderOnline: true,
      
      // Restaurant Partner State
      restaurantOpen: true,
      restaurantItemsStock: initial?.restaurantItemsStock || {}, // { [itemId]: true/false }

      // Language: 'en' | 'hi'
      language: initial?.language || 'en',

      // Presentation Mode: 'phone' | 'full'
      viewMode: initial?.viewMode || 'phone'
    };

    // Auto-save on change
    this.subscribe(() => {
      try {
        localStorage.setItem('swigaato_state', JSON.stringify({
          currentRole: this.state.currentRole,
          currentScreen: this.state.currentScreen,
          currentRestaurantId: this.state.currentRestaurantId,
          cart: this.state.cart,
          appliedCoupon: this.state.appliedCoupon,
          deliveryLocation: this.state.deliveryLocation,
          orders: this.state.orders,
          activeOrderId: this.state.activeOrderId,
          language: this.state.language,
          viewMode: this.state.viewMode
        }));
      } catch (e) {
        // storage overflow fallback
      }
    });
  }

  getState() {
    return {
      ...this.state,
      getCartCount: () => this.getCartCount(),
      getCartBill: () => this.getCartBill(),
      getCartRestaurant: () => this.getCartRestaurant(),
      getCartRestaurantId: () => this.getCartRestaurantId()
    };
  }

  setState(partial) {
    this.state = { ...this.state, ...partial };
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  // Navigation
  navigate(screen, restaurantId = null) {
    const update = { currentScreen: screen };
    if (restaurantId) {
      update.currentRestaurantId = restaurantId;
    }
    this.setState(update);
    window.soundEngine.playTap();
  }

  switchRole(role) {
    this.setState({ currentRole: role });
    window.soundEngine.playPop();
  }

  toggleLanguage() {
    const next = this.state.language === 'en' ? 'hi' : 'en';
    this.setState({ language: next });
    window.soundEngine.playTap();
  }

  toggleViewMode() {
    const next = this.state.viewMode === 'phone' ? 'full' : 'phone';
    this.setState({ viewMode: next });
  }

  // Cart Management
  addToCart(item, restaurantId) {
    const currentRest = this.getCartRestaurantId();
    let newCart = { ...this.state.cart };

    // If adding from another restaurant, reset cart for single-restaurant logic
    if (currentRest && currentRest !== restaurantId) {
      newCart = {};
    }

    const existing = newCart[item.id];
    newCart[item.id] = {
      item,
      qty: (existing ? existing.qty : 0) + 1,
      restaurantId
    };

    this.setState({ cart: newCart });
    window.soundEngine.playSuccess();
  }

  removeFromCart(itemId) {
    const newCart = { ...this.state.cart };
    if (newCart[itemId]) {
      if (newCart[itemId].qty > 1) {
        newCart[itemId].qty -= 1;
      } else {
        delete newCart[itemId];
      }
    }
    this.setState({ cart: newCart });
    window.soundEngine.playTap();
  }

  clearCart() {
    this.setState({ cart: {} });
  }

  getCartRestaurantId() {
    const keys = Object.keys(this.state.cart);
    if (keys.length === 0) return null;
    return this.state.cart[keys[0]].restaurantId;
  }

  getCartRestaurant() {
    const restId = this.getCartRestaurantId() || this.state.currentRestaurantId;
    return window.SWIGAATO_DATA.restaurants.find(r => r.id === restId) || window.SWIGAATO_DATA.restaurants[0];
  }

  getCartCount() {
    return Object.values(this.state.cart).reduce((sum, entry) => sum + entry.qty, 0);
  }

  getCartBill() {
    const items = Object.values(this.state.cart || {});
    const itemTotal = items.reduce((sum, entry) => {
      const price = entry && entry.item && typeof entry.item.price === 'number' ? entry.item.price : 0;
      const qty = entry && typeof entry.qty === 'number' ? entry.qty : 1;
      return sum + (price * qty);
    }, 0);
    
    // Delivery fee based on distance
    const deliveryFee = itemTotal > 0 ? 25 : 0;
    const platformFee = itemTotal > 0 ? window.SWIGAATO_DATA.settings.platformFee : 0;
    
    // Calculate coupon discount
    let couponDiscount = 0;
    if (this.state.appliedCoupon && itemTotal > 0) {
      const coupon = window.SWIGAATO_DATA.coupons.find(c => c.code === this.state.appliedCoupon);
      if (coupon) {
        if (coupon.flatDiscount) {
          couponDiscount = coupon.flatDiscount;
        } else if (coupon.percent) {
          const rawDisc = Math.round((itemTotal * coupon.percent) / 100);
          couponDiscount = Math.min(rawDisc, coupon.maxDiscount || rawDisc);
        }
      }
    }

    const taxableAmount = Math.max(0, itemTotal - couponDiscount);
    const gstCharges = itemTotal > 0 ? Math.round(taxableAmount * (window.SWIGAATO_DATA.settings.gstPercent / 100)) + 3 : 0;
    const toPay = Math.max(0, taxableAmount + deliveryFee + platformFee + gstCharges);

    return {
      itemTotal,
      couponDiscount,
      deliveryFee,
      platformFee,
      gstCharges,
      toPay
    };
  }

  applyCoupon(code) {
    this.setState({ appliedCoupon: code });
    window.soundEngine.playSuccess();
  }

  removeCoupon() {
    this.setState({ appliedCoupon: null });
    window.soundEngine.playTap();
  }

  // Order Placement (end-to-end flow)
  placeOrder() {
    const bill = this.getCartBill();
    const cartEntries = Object.values(this.state.cart);
    const restaurant = this.getCartRestaurant();
    
    const newOrderId = 'SW' + Math.floor(1000 + Math.random() * 9000);
    const newOtp = String(Math.floor(1000 + Math.random() * 9000));

    const orderObj = {
      id: newOrderId,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      restaurantArea: restaurant.area,
      date: 'Just now',
      status: 'placed', // 'placed' -> 'preparing' -> 'ready' -> 'on_the_way' -> 'delivered'
      statusText: 'Restaurant is reviewing',
      otp: newOtp,
      riderId: 'rider-1',
      riderName: 'Amit Yadav',
      riderPhone: '+91 94150 12345',
      riderRating: '4.8',
      deliveryAddress: this.state.deliveryLocation.address,
      paymentMethod: this.getPaymentLabel(this.state.paymentMethod),
      isPaid: this.state.paymentMethod !== 'cod',
      items: cartEntries.map(e => ({ id: e.item.id, name: e.item.name, price: e.item.price, qty: e.qty })),
      bill: {
        itemTotal: bill.itemTotal,
        couponCode: this.state.appliedCoupon,
        couponDiscount: bill.couponDiscount,
        deliveryFee: bill.deliveryFee,
        platformFee: bill.platformFee,
        gstCharges: bill.gstCharges,
        total: bill.toPay
      },
      timeline: [
        { name: 'Order placed', time: 'Just now', done: true },
        { name: 'Restaurant is preparing', time: 'Pending', done: false },
        { name: 'Picked up, on the way', time: 'Pending', done: false },
        { name: 'Delivered', time: 'Pending', done: false }
      ]
    };

    // Prepend to orders
    const updatedOrders = [orderObj, ...this.state.orders];
    this.setState({
      orders: updatedOrders,
      activeOrderId: newOrderId,
      cart: {},
      currentScreen: 'tracking'
    });

    window.soundEngine.playSuccess();

    // Trigger incoming ring in restaurant partner if in background
    setTimeout(() => {
      window.soundEngine.playRing();
    }, 1000);
  }

  getPaymentLabel(id) {
    switch (id) {
      case 'gpay': return 'Google Pay (UPI)';
      case 'phonepe': return 'PhonePe (UPI)';
      case 'upiid': return 'UPI ID (' + (this.state.upiIdInput || 'rahul@okhdfc') + ')';
      case 'card': return 'Debit / Credit Card';
      case 'wallet': return 'Swigaato Wallet';
      case 'cod': return 'Cash on Delivery';
      default: return 'Online Payment';
    }
  }

  // Update order status (called by restaurant, rider, or admin)
  updateOrderStatus(orderId, nextStatus) {
    const updated = this.state.orders.map(order => {
      if (order.id !== orderId) return order;

      const timeline = order.timeline.map(t => ({ ...t }));
      let statusText = order.statusText;

      if (nextStatus === 'preparing') {
        statusText = 'Restaurant is preparing your food';
        if (timeline[1]) { timeline[1].done = true; timeline[1].time = 'Now'; }
      } else if (nextStatus === 'ready') {
        statusText = 'Food is ready, rider assigned';
        if (timeline[1]) { timeline[1].done = true; }
      } else if (nextStatus === 'on_the_way') {
        statusText = 'Rider picked up · Arriving in 10-15 min';
        if (timeline[2]) { timeline[2].done = true; timeline[2].now = true; timeline[2].time = 'Now'; }
      } else if (nextStatus === 'delivered') {
        statusText = 'Order delivered successfully';
        if (timeline[2]) { timeline[2].now = false; }
        if (timeline[3]) { timeline[3].done = true; timeline[3].time = 'Now'; }
      } else if (nextStatus === 'cancelled') {
        statusText = 'Order cancelled';
      }

      return {
        ...order,
        status: nextStatus,
        statusText,
        timeline
      };
    });

    this.setState({ orders: updated });
    window.soundEngine.playSuccess();
  }

  // Toggle item stock for restaurant
  toggleItemStock(itemId) {
    const current = this.state.restaurantItemsStock[itemId] !== false;
    this.setState({
      restaurantItemsStock: {
        ...this.state.restaurantItemsStock,
        [itemId]: !current
      }
    });
    window.soundEngine.playTap();
  }
}

window.appStore = new SwigaatoStore();
