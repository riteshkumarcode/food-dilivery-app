// Swigaato Data Layer — Authentic Gonda, Uttar Pradesh Catalog
window.SWIGAATO_DATA = {
  // Service Area Boundaries in Gonda (Pincodes 271001, 271002, 271003)
  serviceZones: [
    { id: 'z1', name: 'Civil Lines & Collectorate', pincode: '271001', fee: 20, active: true },
    { id: 'z2', name: 'Station Road & Gandhi Park', pincode: '271002', fee: 25, active: true },
    { id: 'z3', name: 'Bahraich Road & Circular Road', pincode: '271001', fee: 25, active: true },
    { id: 'z4', name: 'Pant Nagar & Jhanjhari Block', pincode: '271003', fee: 30, active: true },
    { id: 'z5', name: 'Malviya Nagar & Bus Stand', pincode: '271001', fee: 20, active: true }
  ],

  // Platform Settings
  settings: {
    platformFee: 5,
    gstPercent: 5,
    autoRejectMinutes: 3,
    codLimit: 1500,
    swigaatoHelpline: '+91 5262 230011',
    whatsappSupport: 'https://wa.me/919876543210?text=Namaste%20Swigaato%20Support'
  },

  // Food Categories
  categories: [
    { id: 'cat-biryani', name: 'Biryani', nameHi: 'बिरयानी', ab: 'Bi', bg: '#FCEBC2', icon: '🍲' },
    { id: 'cat-chaat', name: 'Chaat', nameHi: 'चाट', ab: 'Ch', bg: '#F9D8C9', icon: '🥘' },
    { id: 'cat-thali', name: 'Thali', nameHi: 'थाली', ab: 'Th', bg: '#E4EDDF', icon: '🍱' },
    { id: 'cat-pizza', name: 'Pizza', nameHi: 'पिज़्ज़ा', ab: 'Pi', bg: '#F9D8C9', icon: '🍕' },
    { id: 'cat-sweets', name: 'Sweets', nameHi: 'मिठाई', ab: 'Sw', bg: '#FCEBC2', icon: '🍧' },
    { id: 'cat-rolls', name: 'Rolls', nameHi: 'रोल्स', ab: 'Ro', bg: '#E4EDDF', icon: '🌯' },
    { id: 'cat-tea', name: 'Chai & Snacks', nameHi: 'चाय नाश्ता', ab: 'Ch', bg: '#FCEBC2', icon: '☕' }
  ],

  // Restaurants in Gonda
  restaurants: [
    {
      id: 'rest-awadh',
      name: 'Awadh Rasoi',
      rating: '4.4',
      ratingCount: '1.2k',
      time: '25-30 min',
      costForTwo: '₹300 for two',
      cuisine: 'Biryani, Mughlai, Kebabs',
      area: 'Station Road · 1.2 km',
      fullAddress: 'Shop 4, Opp Railway Station, Station Road, Gonda 271002',
      offer: '40% OFF',
      offerDetail: '40% off up to ₹80 on orders above ₹199',
      bg: '#E8B04A',
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80',
      isVeg: false,
      isOpen: true,
      commissionPercent: 18,
      kycApproved: true,
      menuCategories: ['Recommended', 'Biryani', 'Kebabs', 'Breads & Curries', 'Desserts'],
      items: [
        {
          id: 'aw-1',
          name: 'Chicken Dum Biryani',
          price: 220,
          desc: 'Slow-cooked in sealed handi with fragrant saffron rice, tender chicken, served with onion raita & salan.',
          isVeg: false,
          category: 'Biryani',
          isRecommended: true,
          dot: '#B3261E',
          bg: '#E8B04A'
        },
        {
          id: 'aw-2',
          name: 'Veg Awadhi Biryani',
          price: 160,
          desc: 'Long-grain basmati, seasonal veggies and kewra essence, slow cooked with aromatic whole spices.',
          isVeg: true,
          category: 'Biryani',
          isRecommended: true,
          dot: '#12663E',
          bg: '#5E8C4E'
        },
        {
          id: 'aw-3',
          name: 'Galouti Kebab (4 pcs)',
          price: 240,
          desc: 'Melt-in-mouth minced spiced kebabs served on traditional ulte tawe ka paratha with mint chutney.',
          isVeg: false,
          category: 'Kebabs',
          isRecommended: true,
          dot: '#B3261E',
          bg: '#C9643B'
        },
        {
          id: 'aw-4',
          name: 'Mutton Biryani (Handi)',
          price: 320,
          desc: 'Rich spiced Awadhi preparation with succulent mutton cuts cooked on dum with desi ghee.',
          isVeg: false,
          category: 'Biryani',
          isRecommended: false,
          dot: '#B3261E',
          bg: '#C9643B'
        },
        {
          id: 'aw-5',
          name: 'Murgh Makhani (Butter Chicken)',
          price: 260,
          desc: 'Smoked tandoori chicken simmered in rich creamy tomato cashew gravy with fenugreek.',
          isVeg: false,
          category: 'Breads & Curries',
          isRecommended: false,
          dot: '#B3261E',
          bg: '#E8B04A'
        },
        {
          id: 'aw-6',
          name: 'Butter Naan',
          price: 45,
          desc: 'Soft refined flour flatbread baked in traditional tandoor brushed with fresh Amul butter.',
          isVeg: true,
          category: 'Breads & Curries',
          isRecommended: false,
          dot: '#12663E',
          bg: '#EFE7D6'
        },
        {
          id: 'aw-7',
          name: 'Shahi Tukda',
          price: 90,
          desc: 'Crispy fried bread triangles soaked in rich cardamom saffron rabri, topped with crushed pistachios.',
          isVeg: true,
          category: 'Desserts',
          isRecommended: true,
          dot: '#12663E',
          bg: '#F2B230'
        }
      ]
    },

    {
      id: 'rest-chaat',
      name: 'Chaat Chaupal',
      rating: '4.2',
      ratingCount: '890',
      time: '15-20 min',
      costForTwo: '₹150 for two',
      cuisine: 'Chaat, Street Food, Snacks',
      area: 'Civil Lines · 0.6 km',
      fullAddress: 'Near Gandhi Park Gate 2, Civil Lines, Gonda 271001',
      offer: '₹50 OFF',
      offerDetail: 'Flat ₹50 off on orders above ₹149',
      bg: '#C9643B',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
      isVeg: true,
      isOpen: true,
      commissionPercent: 15,
      kycApproved: true,
      menuCategories: ['Recommended', 'Famous Chaat', 'Snacks', 'Beverages'],
      items: [
        {
          id: 'cc-1',
          name: 'Aloo Tikki Chaat (2 pcs)',
          price: 70,
          desc: 'Crisp golden potato patties served with spiced white pea ragda, sweetened curd, tamarind chutney.',
          isVeg: true,
          category: 'Famous Chaat',
          isRecommended: true,
          dot: '#12663E',
          bg: '#C9643B'
        },
        {
          id: 'cc-2',
          name: 'Special Dahi Bhalla',
          price: 80,
          desc: 'Soft urad dal dumplings soaked in chilled sweet curd, cumin powder, pomegranate and saunth.',
          isVeg: true,
          category: 'Famous Chaat',
          isRecommended: true,
          dot: '#12663E',
          bg: '#FCEBC2'
        },
        {
          id: 'cc-3',
          name: 'Golgappa / Pani Puri (8 pcs)',
          price: 40,
          desc: 'Crisp semolina puris with spicy heeng jeera paani, sweet tamarind water and potato stuffing.',
          isVeg: true,
          category: 'Famous Chaat',
          isRecommended: true,
          dot: '#12663E',
          bg: '#E4EDDF'
        },
        {
          id: 'cc-4',
          name: 'Pav Bhaji (Double Butter)',
          price: 110,
          desc: 'Mashed vegetable gravy infused with Pav Bhaji masala, served with 2 butter-toasted pavs.',
          isVeg: true,
          category: 'Snacks',
          isRecommended: false,
          dot: '#12663E',
          bg: '#C9643B'
        },
        {
          id: 'cc-5',
          name: 'Kulhad Masala Chai',
          price: 25,
          desc: 'Ginger cardamom infused milk tea served steaming in an earthen clay kulhad.',
          isVeg: true,
          category: 'Beverages',
          isRecommended: false,
          dot: '#12663E',
          bg: '#E8B04A'
        }
      ]
    },

    {
      id: 'rest-annapurna',
      name: 'Annapurna Bhojnalaya',
      rating: '4.5',
      ratingCount: '1.8k',
      time: '20-25 min',
      costForTwo: '₹250 for two',
      cuisine: 'North Indian Thali, Pure Veg',
      area: 'Bahraich Road · 2.0 km',
      fullAddress: 'Main Market, Bahraich Road crossing, Gonda 271001',
      offer: 'FREE DEL',
      offerDetail: 'Free delivery on all thali orders above ₹199',
      bg: '#5E8C4E',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
      isVeg: true,
      isOpen: true,
      commissionPercent: 16,
      kycApproved: true,
      menuCategories: ['Recommended', 'Special Thalis', 'Sabzi & Paneer', 'Breads & Rice', 'Drinks'],
      items: [
        {
          id: 'an-1',
          name: 'Deluxe Veg Thali',
          price: 170,
          desc: 'Paneer Butter Masala, Dal Makhani, Mix Veg, 4 Tawa Rotis, Jeera Rice, Gulab Jamun, Papad & Salad.',
          isVeg: true,
          category: 'Special Thalis',
          isRecommended: true,
          dot: '#12663E',
          bg: '#5E8C4E'
        },
        {
          id: 'an-2',
          name: 'Special Maharaja Thali',
          price: 240,
          desc: 'Shahi Paneer, Dal Tadka, Chhole, Dum Aloo, 2 Laccha Paratha, Pulao, Raita, Rasgulla & pickle.',
          isVeg: true,
          category: 'Special Thalis',
          isRecommended: true,
          dot: '#12663E',
          bg: '#E8B04A'
        },
        {
          id: 'an-3',
          name: 'Matar Paneer Desi Ghee',
          price: 150,
          desc: 'Homestyle fresh cottage cheese and green peas cooked in aromatic onion-tomato curry.',
          isVeg: true,
          category: 'Sabzi & Paneer',
          isRecommended: false,
          dot: '#12663E',
          bg: '#C9643B'
        },
        {
          id: 'an-4',
          name: 'Tawa Roti with Butter (4 pcs)',
          price: 40,
          desc: 'Freshly puffed whole wheat tawa rotis brushed with pure desi ghee.',
          isVeg: true,
          category: 'Breads & Rice',
          isRecommended: false,
          dot: '#12663E',
          bg: '#EFE7D6'
        },
        {
          id: 'an-5',
          name: 'Sweet Malai Lassi',
          price: 60,
          desc: 'Thick chilled sweet yogurt drink served with thick clotted cream and rose syrup.',
          isVeg: true,
          category: 'Drinks',
          isRecommended: true,
          dot: '#12663E',
          bg: '#FCEBC2'
        }
      ]
    },

    {
      id: 'rest-spice',
      name: 'Spice Darbar',
      rating: '4.3',
      ratingCount: '710',
      time: '30-35 min',
      costForTwo: '₹350 for two',
      cuisine: 'Tandoori, Rolls, Chinese, Fast Food',
      area: 'Malviya Nagar · 1.8 km',
      fullAddress: 'Plot 12, Malviya Nagar Commercial complex, Gonda 271001',
      offer: '30% OFF',
      offerDetail: '30% off up to ₹75 with code SPICE30',
      bg: '#2F5D8A',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80',
      isVeg: false,
      isOpen: true,
      commissionPercent: 20,
      kycApproved: true,
      menuCategories: ['Recommended', 'Rolls & Wraps', 'Tandoori Starters', 'Chinese Noodles'],
      items: [
        {
          id: 'sp-1',
          name: 'Double Egg Chicken Roll',
          price: 130,
          desc: 'Flaky paratha lined with two eggs, wrapped around succulent chicken tikka cubes with mint mayo.',
          isVeg: false,
          category: 'Rolls & Wraps',
          isRecommended: true,
          dot: '#B3261E',
          bg: '#E8B04A'
        },
        {
          id: 'sp-2',
          name: 'Paneer Tikka Roll',
          price: 110,
          desc: 'Chargrilled cottage cheese chunks tossed with bell peppers and onions wrapped in hot paratha.',
          isVeg: true,
          category: 'Rolls & Wraps',
          isRecommended: true,
          dot: '#12663E',
          bg: '#5E8C4E'
        },
        {
          id: 'sp-3',
          name: 'Veg Hakka Noodles',
          price: 120,
          desc: 'Wok tossed noodles with shredded cabbage, carrots, spring onions and soy chili sauce.',
          isVeg: true,
          category: 'Chinese Noodles',
          isRecommended: false,
          dot: '#12663E',
          bg: '#C9643B'
        },
        {
          id: 'sp-4',
          name: 'Tandoori Chicken (Half)',
          price: 210,
          desc: 'Chicken marinated overnight in yogurt, mustard oil and Kashmiri degi mirch roasted in charcoal tandoor.',
          isVeg: false,
          category: 'Tandoori Starters',
          isRecommended: true,
          dot: '#B3261E',
          bg: '#B3261E'
        }
      ]
    },

    {
      id: 'rest-gonda-sweets',
      name: 'Gonda Sweets & Namkeen',
      rating: '4.6',
      ratingCount: '2.1k',
      time: '15-20 min',
      costForTwo: '₹180 for two',
      cuisine: 'Mithai, Samosa, Desi Ghee Jalebi',
      area: 'Utraula Road · 1.0 km',
      fullAddress: 'Near Gonda Chowk, Utraula Road, Gonda 271001',
      offer: '20% OFF',
      offerDetail: '20% off up to ₹50 on all sweets',
      bg: '#E8B04A',
      image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
      isVeg: true,
      isOpen: true,
      commissionPercent: 15,
      kycApproved: true,
      menuCategories: ['Recommended', 'Desi Ghee Sweets', 'Hot Snacks', 'Gift Boxes'],
      items: [
        {
          id: 'gs-1',
          name: 'Special Kaju Katli (250g)',
          price: 260,
          desc: 'Pure cashew fudge made with premium Goan cashews, covered with silver vark.',
          isVeg: true,
          category: 'Desi Ghee Sweets',
          isRecommended: true,
          dot: '#12663E',
          bg: '#FCEBC2'
        },
        {
          id: 'gs-2',
          name: 'Desi Ghee Jalebi (250g)',
          price: 90,
          desc: 'Crispy golden coils fried in pure desi ghee and immersed in fragrant saffron syrup.',
          isVeg: true,
          category: 'Desi Ghee Sweets',
          isRecommended: true,
          dot: '#12663E',
          bg: '#F2B230'
        },
        {
          id: 'gs-3',
          name: 'Khasta Samosa with Chhole (2 pcs)',
          price: 40,
          desc: 'Flaky pastry filled with spiced potatoes served with tangy chickpea chhole gravy.',
          isVeg: true,
          category: 'Hot Snacks',
          isRecommended: true,
          dot: '#12663E',
          bg: '#E8B04A'
        },
        {
          id: 'gs-4',
          name: 'Hot Gulab Jamun (2 pcs)',
          price: 50,
          desc: 'Mawa dumplings soaked in cardamom sugar syrup, served warm.',
          isVeg: true,
          category: 'Desi Ghee Sweets',
          isRecommended: false,
          dot: '#12663E',
          bg: '#C9643B'
        }
      ]
    }
  ],

  // Active Promo Codes
  coupons: [
    {
      code: 'GONDA50',
      title: '50% OFF up to ₹100',
      desc: 'Valid on orders above ₹199 for all Gonda customers',
      percent: 50,
      maxDiscount: 100,
      minOrder: 199,
      isFirstOrder: true
    },
    {
      code: 'SWIGAATO20',
      title: '20% OFF up to ₹60',
      desc: 'Use anytime across all restaurants',
      percent: 20,
      maxDiscount: 60,
      minOrder: 150,
      isFirstOrder: false
    },
    {
      code: 'FREEDEL',
      title: 'Free Delivery',
      desc: 'Save ₹25 delivery fee on orders above ₹149',
      flatDiscount: 25,
      minOrder: 149,
      isFirstOrder: false
    }
  ],

  // Delivery Partners in Gonda
  riders: [
    {
      id: 'rider-1',
      name: 'Amit Yadav',
      phone: '+91 94150 12345',
      rating: '4.8',
      totalDeliveries: '1,420',
      vehicle: 'Hero Splendor (UP-43-AK-8921)',
      status: 'On the way',
      lat: 27.132,
      lng: 81.961,
      todayEarnings: 480,
      todayDeliveries: 9
    },
    {
      id: 'rider-2',
      name: 'Rajesh Kumar',
      phone: '+91 98390 67890',
      rating: '4.9',
      totalDeliveries: '980',
      vehicle: 'Honda Activa (UP-43-BZ-3412)',
      status: 'Available',
      lat: 27.135,
      lng: 81.965,
      todayEarnings: 390,
      todayDeliveries: 7
    },
    {
      id: 'rider-3',
      name: 'Sonu Verma',
      phone: '+91 87654 11223',
      rating: '4.7',
      totalDeliveries: '650',
      vehicle: 'TVS Jupiter (UP-43-CN-5519)',
      status: 'Available',
      lat: 27.139,
      lng: 81.958,
      todayEarnings: 320,
      todayDeliveries: 6
    }
  ],

  // Sample User Profile
  user: {
    name: 'Rahul Keshari',
    phone: '+91 98765 43210',
    initials: 'RK',
    walletBalance: 120,
    savedAddresses: [
      {
        id: 'addr-1',
        tag: 'Home',
        address: 'Civil Lines, Near Gandhi Park, Gonda, Uttar Pradesh 271001',
        landmark: 'Near SBI Branch, House 24',
        isDefault: true
      },
      {
        id: 'addr-2',
        tag: 'Work',
        address: 'Collectorate Complex, Kachahari Road, Gonda 271001',
        landmark: 'Block B Office 14',
        isDefault: false
      }
    ]
  },

  // Initial Order State
  initialOrders: [
    {
      id: 'SW2841',
      restaurantId: 'rest-awadh',
      restaurantName: 'Awadh Rasoi',
      restaurantArea: 'Station Road · 1.2 km',
      date: 'Today, 7:42 PM',
      status: 'on_the_way', // placed -> preparing -> ready -> on_the_way -> delivered
      statusText: 'Arriving in 12 min',
      otp: '4812',
      riderId: 'rider-1',
      riderName: 'Amit Yadav',
      riderPhone: '+91 94150 12345',
      riderRating: '4.8',
      deliveryAddress: 'Civil Lines, Near Gandhi Park, Gonda 271001',
      paymentMethod: 'Google Pay (UPI)',
      isPaid: true,
      items: [
        { id: 'aw-1', name: 'Chicken Dum Biryani', price: 220, qty: 1 },
        { id: 'aw-3', name: 'Galouti Kebab (4 pcs)', price: 240, qty: 1 }
      ],
      bill: {
        itemTotal: 460,
        couponCode: 'GONDA50',
        couponDiscount: 100,
        deliveryFee: 25,
        platformFee: 5,
        gstCharges: 23,
        total: 413
      },
      timeline: [
        { name: 'Order placed', time: '7:42 PM', done: true },
        { name: 'Restaurant is preparing', time: '7:44 PM', done: true },
        { name: 'Picked up, on the way', time: '8:01 PM', done: true, now: true },
        { name: 'Delivered', time: 'Expected 8:13 PM', done: false }
      ]
    },
    {
      id: 'SW2718',
      restaurantId: 'rest-chaat',
      restaurantName: 'Chaat Chaupal',
      restaurantArea: 'Civil Lines',
      date: '12 Oct, 6:10 PM',
      status: 'delivered',
      statusText: 'Delivered',
      itemsSummary: '2 × Aloo Tikki Chaat, 1 × Dahi Bhalla',
      items: [
        { id: 'cc-1', name: 'Aloo Tikki Chaat', price: 70, qty: 2 },
        { id: 'cc-2', name: 'Special Dahi Bhalla', price: 80, qty: 1 }
      ],
      bill: { total: 185 },
      bg: '#C9643B'
    },
    {
      id: 'SW2650',
      restaurantId: 'rest-annapurna',
      restaurantName: 'Annapurna Bhojnalaya',
      restaurantArea: 'Bahraich Road',
      date: '9 Oct, 1:25 PM',
      status: 'delivered',
      statusText: 'Delivered',
      itemsSummary: '2 × Deluxe Veg Thali, 1 × Sweet Lassi',
      items: [
        { id: 'an-1', name: 'Deluxe Veg Thali', price: 170, qty: 2 }
      ],
      bill: { total: 340 },
      bg: '#5E8C4E'
    },
    {
      id: 'SW2588',
      restaurantId: 'rest-awadh',
      restaurantName: 'Awadh Rasoi',
      restaurantArea: 'Station Road',
      date: '3 Oct, 9:02 PM',
      status: 'delivered',
      statusText: 'Delivered',
      itemsSummary: '1 × Chicken Dum Biryani, 1 × Shahi Tukda',
      items: [
        { id: 'aw-1', name: 'Chicken Dum Biryani', price: 220, qty: 1 },
        { id: 'aw-7', name: 'Shahi Tukda', price: 90, qty: 1 }
      ],
      bill: { total: 298 },
      bg: '#E8B04A'
    }
  ],

  // Hinglish / Hindi Translations for the Local Gonda Touch
  i18n: {
    en: {
      tagline: 'Gonda ka apna food delivery',
      deliverTo: 'Deliver to',
      searchPlaceholder: 'Search "biryani", "samosa", "thali"',
      firstOrderOffer: 'FIRST ORDER',
      firstOrderDisc: '50% OFF up to ₹100',
      useCode: 'Code: GONDA50',
      whatsOnMind: "What's on your mind?",
      restaurantsInGonda: 'Restaurants in Gonda',
      openNow: '42 open now',
      home: 'Home',
      search: 'Search',
      orders: 'Orders',
      account: 'Account',
      viewCart: 'View cart →',
      billDetails: 'Bill details',
      itemTotal: 'Item total',
      couponDisc: 'Coupon discount',
      deliveryFee: 'Delivery fee',
      platformFee: 'Platform fee',
      gstCharges: 'GST & restaurant charges',
      toPay: 'To pay',
      proceedToPay: 'Proceed to pay →',
      onTheWay: 'ON THE WAY',
      arrivingIn: 'Arriving in 12 min',
      orderOTP: 'Delivery OTP',
      yourDeliveryPartner: 'Your delivery partner',
      callPartner: 'Call partner',
      trackOrder: 'Track →',
      reorder: 'Reorder',
      liveOrder: 'LIVE ORDER',
      pastOrders: 'PAST ORDERS'
    },
    hi: {
      tagline: 'गोंडा का अपना फूड डिलीवरी ऐप',
      deliverTo: 'यहाँ मँगाएँ',
      searchPlaceholder: 'सर्च करें "बिरयानी", "समोसा", "थाली"',
      firstOrderOffer: 'पहला आर्डर स्पेशल',
      firstOrderDisc: '५०% छूट (₹१०० तक)',
      useCode: 'कोड: GONDA50',
      whatsOnMind: 'आज क्या खाने का मन है?',
      restaurantsInGonda: 'गोंडा के रेस्टोरेंट',
      openNow: '४२ रेस्टोरेंट अभी खुले हैं',
      home: 'होम',
      search: 'खोजें',
      orders: 'आर्डर',
      account: 'प्रोफाइल',
      viewCart: 'कार्ट देखें →',
      billDetails: 'बिल का विवरण',
      itemTotal: 'सामान का कुल मूल्य',
      couponDisc: 'कूपन छूट',
      deliveryFee: 'डिलीवरी शुल्क',
      platformFee: 'प्लेटफ़ॉर्म शुल्क',
      gstCharges: 'जीएसटी और टैक्स',
      toPay: 'कुल भुगतान',
      proceedToPay: 'भुगतान करें →',
      onTheWay: 'रास्ते में है',
      arrivingIn: '१२ मिनट में पहुँचेगा',
      orderOTP: 'डिलीवरी OTP',
      yourDeliveryPartner: 'आपका डिलीवरी पार्टनर',
      callPartner: 'फ़ोन करें',
      trackOrder: 'ट्रैक करें →',
      reorder: 'फिर से मँगाएँ',
      liveOrder: 'चल रहा आर्डर',
      pastOrders: 'पुराने आर्डर्स'
    }
  }
};
