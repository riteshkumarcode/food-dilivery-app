export const GONDA_RESTAURANTS = [
  {
    id: 'rest-awadh',
    name: 'Awadh Rasoi',
    rating: '4.4',
    ratingCount: '1.2k',
    time: '25-30 min',
    cuisine: 'Biryani, Mughlai, Kebabs',
    area: 'Station Road · 1.2 km',
    offer: '40% OFF',
    offerDetail: '40% off up to ₹80 on orders above ₹199',
    bg: '#E8B04A',
    isVeg: false,
    items: [
      { id: 'aw-1', name: 'Chicken Dum Biryani', price: 220, desc: 'Slow-cooked in sealed handi with saffron rice, served with raita.', isVeg: false },
      { id: 'aw-2', name: 'Veg Awadhi Biryani', price: 160, desc: 'Basmati, seasonal veg and kewra, with mirchi ka salan.', isVeg: true },
      { id: 'aw-3', name: 'Galouti Kebab (4 pcs)', price: 240, desc: 'Melt-in-mouth minced kebabs on ulte tawe ka paratha.', isVeg: false },
      { id: 'aw-7', name: 'Shahi Tukda', price: 90, desc: 'Fried bread soaked in rabri, topped with nuts.', isVeg: true }
    ]
  },
  {
    id: 'rest-chaat',
    name: 'Chaat Chaupal',
    rating: '4.2',
    ratingCount: '890',
    time: '15-20 min',
    cuisine: 'Chaat, Street Food',
    area: 'Civil Lines · 0.6 km',
    offer: '₹50 OFF',
    offerDetail: 'Flat ₹50 off on orders above ₹149',
    bg: '#C9643B',
    isVeg: true,
    items: [
      { id: 'cc-1', name: 'Aloo Tikki Chaat (2 pcs)', price: 70, desc: 'Crisp potato patties with ragda & sweet curd.', isVeg: true },
      { id: 'cc-2', name: 'Special Dahi Bhalla', price: 80, desc: 'Soft urad dal dumplings in sweet curd & saunth.', isVeg: true }
    ]
  },
  {
    id: 'rest-annapurna',
    name: 'Annapurna Bhojnalaya',
    rating: '4.5',
    ratingCount: '1.8k',
    time: '20-25 min',
    cuisine: 'North Indian Thali, Veg',
    area: 'Bahraich Road · 2.0 km',
    offer: 'FREE DEL',
    offerDetail: 'Free delivery on all thali orders above ₹199',
    bg: '#5E8C4E',
    isVeg: true,
    items: [
      { id: 'an-1', name: 'Deluxe Veg Thali', price: 170, desc: 'Paneer Butter Masala, Dal Makhani, 4 Rotis, Rice & Gulab Jamun.', isVeg: true },
      { id: 'an-5', name: 'Sweet Malai Lassi', price: 60, desc: 'Thick chilled sweet yogurt drink with clotted cream.', isVeg: true }
    ]
  }
];

export const CATEGORIES = [
  { id: '1', name: 'Biryani', ab: 'Bi', bg: '#FCEBC2' },
  { id: '2', name: 'Chaat', ab: 'Ch', bg: '#F9D8C9' },
  { id: '3', name: 'Thali', ab: 'Th', bg: '#E4EDDF' },
  { id: '4', name: 'Pizza', ab: 'Pi', bg: '#F9D8C9' },
  { id: '5', name: 'Sweets', ab: 'Sw', bg: '#FCEBC2' }
];
