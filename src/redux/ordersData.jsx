export const mockOrders = [
  {
    _id: "B0127384",
    orderActualId: "id_01",
    customerName: "tttt",
    customerEmail: "kmo72355@gmail.com",
    avatarLetter: "T",
    date: "06 Jul 2026",
    status: "Processing",
    isPaid: false,
    paymentMethodType: "Cash",
    totalOrderPrice: 2119.26,
    shippingAddress: "Alexandria, Egypt",
    customerNote: "sdf sdf df s df sd fs df sd f sdf f sdf s",
    adminNote: "",
    cartItems: [
      {
        product: { title: "MacBook Pro 14-inch (M3 Pro Chip)", imageCover: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100" },
        quantity: 1,
        price: 1859.00
      }
    ],
    taxPrice: 260.26,
    shippingPrice: 0.00
  },
  {
    _id: "A9823145",
    orderActualId: "id_02",
    customerName: "Ahmed Mansour",
    customerEmail: "ahmed.mansour@outlook.com",
    avatarLetter: "A",
    date: "06 Jul 2026",
    status: "Delivered",
    isPaid: true,
    paymentMethodType: "Stripe",
    totalOrderPrice: 15450.00,
    shippingAddress: "Cairo, Egypt",
    customerNote: "Please call before delivery",
    adminNote: "Delivered on time",
    cartItems: [
      {
        product: { title: "iPhone 15 Pro Max 256GB", imageCover: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=100" },
        quantity: 1,
        price: 13552.63
      }
    ],
    taxPrice: 1897.37,
    shippingPrice: 0.00
  },
  {
    _id: "C3489102",
    orderActualId: "id_03",
    customerName: "Mostafa Mahmoud",
    customerEmail: "mostafa.m99@gmail.com",
    avatarLetter: "M",
    date: "05 Jul 2026",
    status: "Pending",
    isPaid: false,
    paymentMethodType: "Cash",
    totalOrderPrice: 3500.00,
    shippingAddress: "Giza, Egypt",
    customerNote: "",
    adminNote: "",
    cartItems: [
      {
        product: { title: "Samsung Odyssy Gaming Monitor", imageCover: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=100" },
        quantity: 1,
        price: 3070.18
      }
    ],
    taxPrice: 429.82,
    shippingPrice: 0.00
  },
  {
    _id: "D8832104",
    orderActualId: "id_04",
    customerName: "Omar Sherif",
    customerEmail: "omar.sherif@yahoo.com",
    avatarLetter: "O",
    date: "05 Jul 2026",
    status: "Processing",
    isPaid: true,
    paymentMethodType: "Stripe",
    totalOrderPrice: 950.00,
    shippingAddress: "Tanta, Egypt",
    customerNote: "Leave at the reception desk",
    adminNote: "",
    cartItems: [
      {
        product: { title: "Redragon Mechanical Keyboard", imageCover: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=100" },
        quantity: 1,
        price: 833.33
      }
    ],
    taxPrice: 116.67,
    shippingPrice: 0.00
  },
  {
    _id: "E2390114",
    orderActualId: "id_05",
    customerName: "Hassan Ali",
    customerEmail: "hassan.ali@gmail.com",
    avatarLetter: "H",
    date: "04 Jul 2026",
    status: "Shipped",
    isPaid: true,
    paymentMethodType: "Stripe",
    totalOrderPrice: 1200.00,
    shippingAddress: "Mansoura, Egypt",
    customerNote: "",
    adminNote: "",
    cartItems: [
      {
        product: { title: "Logitech G Pro Wireless Mouse", imageCover: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=100" },
        quantity: 1,
        price: 1052.63
      }
    ],
    taxPrice: 147.37,
    shippingPrice: 0.00
  },
  {
    _id: "F9301248",
    orderActualId: "id_06",
    customerName: "Khaled Saied",
    customerEmail: "khaled.saied@gmail.com",
    avatarLetter: "K",
    date: "04 Jul 2026",
    status: "Cancelled",
    isPaid: false,
    paymentMethodType: "Cash",
    totalOrderPrice: 2400.00,
    shippingAddress: "Zagazig, Egypt",
    customerNote: "Cancel if it takes more than 3 days",
    adminNote: "Customer cancelled via phone",
    cartItems: [
      {
        product: { title: "Anker PowerBank 20,000 mAh", imageCover: "https://images.unsplash.com/photo-1609592424261-28309936f7ec?w=100" },
        quantity: 2,
        price: 1052.63
      }
    ],
    taxPrice: 294.74,
    shippingPrice: 0.00
  },
  {
    _id: "G3029147",
    orderActualId: "id_07",
    customerName: "Amr Abdelaziz",
    customerEmail: "amr.abdelaziz@gmail.com",
    avatarLetter: "A",
    date: "03 Jul 2026",
    status: "Delivered",
    isPaid: true,
    paymentMethodType: "Cash",
    totalOrderPrice: 450.00,
    shippingAddress: "Suez, Egypt",
    customerNote: "",
    adminNote: "",
    cartItems: [
      {
        product: { title: "Type-C Fast Charging Cable", imageCover: "https://images.unsplash.com/photo-1541667590938-24857ef8f762?w=100" },
        quantity: 3,
        price: 131.58
      }
    ],
    taxPrice: 55.26,
    shippingPrice: 0.00
  },
  {
    _id: "H1029384",
    orderActualId: "id_08",
    customerName: "Ibrahim Adel",
    customerEmail: "ibrahim.adel@gmail.com",
    avatarLetter: "I",
    date: "03 Jul 2026",
    status: "Returned",
    isPaid: true,
    paymentMethodType: "Stripe",
    totalOrderPrice: 6500.00,
    shippingAddress: "Ismailia, Egypt",
    customerNote: "Size XL please",
    adminNote: "Returned due to wrong size",
    cartItems: [
      {
        product: { title: "Leather Gaming Chair Premium", imageCover: "https://images.unsplash.com/photo-1598550476439-6847785fce6e?w=100" },
        quantity: 1,
        price: 5701.75
      }
    ],
    taxPrice: 798.25,
    shippingPrice: 0.00
  },
  {
    _id: "I4829104",
    orderActualId: "id_09",
    customerName: "Tarek Fathy",
    customerEmail: "tarek.fathy@gmail.com",
    avatarLetter: "T",
    date: "02 Jul 2026",
    status: "Confirmed",
    isPaid: false,
    paymentMethodType: "Cash",
    totalOrderPrice: 1800.00,
    shippingAddress: "Hurghada, Egypt",
    customerNote: "",
    adminNote: "",
    cartItems: [
      {
        product: { title: "JBL Flip 6 Bluetooth Speaker", imageCover: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100" },
        quantity: 1,
        price: 1578.95
      }
    ],
    taxPrice: 221.05,
    shippingPrice: 0.00
  },
  {
    _id: "J3920147",
    orderActualId: "id_10",
    customerName: "Ziad Elsayed",
    customerEmail: "ziad.elsayed@gmail.com",
    avatarLetter: "Z",
    date: "02 Jul 2026",
    status: "Processing",
    isPaid: true,
    paymentMethodType: "Cash",
    totalOrderPrice: 2900.00,
    shippingAddress: "Sharm El Sheikh, Egypt",
    customerNote: "Deliver after 5 PM",
    adminNote: "",
    cartItems: [
      {
        product: { title: "HyperX Cloud II Headset", imageCover: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=100" },
        quantity: 1,
        price: 2543.86
      }
    ],
    taxPrice: 356.14,
    shippingPrice: 0.00
  },
  {
    _id: "K4920148",
    orderActualId: "id_11",
    customerName: "Mahmoud Wagdy",
    customerEmail: "mahmoud.wagdy@gmail.com",
    avatarLetter: "M",
    date: "01 Jul 2026",
    status: "Delivered",
    isPaid: true,
    paymentMethodType: "Stripe",
    totalOrderPrice: 750.00,
    shippingAddress: "Asyut, Egypt",
    customerNote: "",
    adminNote: "",
    cartItems: [
      {
        product: { title: "Xiaomi Smart Band 8", imageCover: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=100" },
        quantity: 1,
        price: 657.89
      }
    ],
    taxPrice: 92.11,
    shippingPrice: 0.00
  },
  {
    _id: "L3920134",
    orderActualId: "id_12",
    customerName: "Sayed Nour",
    customerEmail: "sayed.nour@gmail.com",
    avatarLetter: "S",
    date: "01 Jul 2026",
    status: "Pending",
    isPaid: false,
    paymentMethodType: "Cash",
    totalOrderPrice: 4100.00,
    shippingAddress: "Sohag, Egypt",
    customerNote: "",
    adminNote: "",
    cartItems: [
      {
        product: { title: "Crucial P3 2TB NVMe SSD", imageCover: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=100" },
        quantity: 1,
        price: 3596.49
      }
    ],
    taxPrice: 503.51,
    shippingPrice: 0.00
  },
  {
    _id: "M9203481",
    orderActualId: "id_13",
    customerName: "Kareem Ayman",
    customerEmail: "kareem.ayman@gmail.com",
    avatarLetter: "K",
    date: "30 Jun 2026",
    status: "Shipped",
    isPaid: true,
    paymentMethodType: "Cash",
    totalOrderPrice: 1950.00,
    shippingAddress: "Minya, Egypt",
    customerNote: "Fragile items, handle with care",
    adminNote: "",
    cartItems: [
      {
        product: { title: "Corsair Vengeance 32GB RAM", imageCover: "https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?w=100" },
        quantity: 1,
        price: 1710.53
      }
    ],
    taxPrice: 239.47,
    shippingPrice: 0.00
  },
  {
    _id: "N2930148",
    orderActualId: "id_14",
    customerName: "Eslam Raafat",
    customerEmail: "eslam.raafat@gmail.com",
    avatarLetter: "E",
    date: "30 Jun 2026",
    status: "Delivered",
    isPaid: true,
    paymentMethodType: "Stripe",
    totalOrderPrice: 5300.00,
    shippingAddress: "Damietta, Egypt",
    customerNote: "",
    adminNote: "",
    cartItems: [
      {
        product: { title: "Razer BlackShark V2 Pro", imageCover: "https://images.unsplash.com/photo-1612444530582-fc66183b16f7?w=100" },
        quantity: 1,
        price: 4649.12
      }
    ],
    taxPrice: 650.88,
    shippingPrice: 0.00
  },
  {
    _id: "O1029347",
    orderActualId: "id_15",
    customerName: "Wael Essam",
    customerEmail: "wael.essam@gmail.com",
    avatarLetter: "W",
    date: "29 Jun 2026",
    status: "Cancelled",
    isPaid: false,
    paymentMethodType: "Cash",
    totalOrderPrice: 320.00,
    shippingAddress: "Port Said, Egypt",
    customerNote: "",
    adminNote: "No stock available",
    cartItems: [
      {
        product: { title: "Logitech B100 USB Mouse", imageCover: "https://images.unsplash.com/photo-1625805546227-a09c5159535a?w=100" },
        quantity: 2,
        price: 140.35
      }
    ],
    taxPrice: 39.30,
    shippingPrice: 0.00
  },
  {
    _id: "P3920146",
    orderActualId: "id_16",
    customerName: "Sherif Younis",
    customerEmail: "sherif.younis@gmail.com",
    avatarLetter: "S",
    date: "29 Jun 2026",
    status: "Processing",
    isPaid: false,
    paymentMethodType: "Cash",
    totalOrderPrice: 2100.00,
    shippingAddress: "Benha, Egypt",
    customerNote: "Call 10 mins before arrival",
    adminNote: "",
    cartItems: [
      {
        product: { title: "WD Blue 1TB Internal HDD", imageCover: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=100" },
        quantity: 1,
        price: 1842.11
      }
    ],
    taxPrice: 257.89,
    shippingPrice: 0.00
  },
  {
    _id: "Q2930144",
    orderActualId: "id_17",
    customerName: "Nader Salah",
    customerEmail: "nader.salah@gmail.com",
    avatarLetter: "N",
    date: "28 Jun 2026",
    status: "Delivered",
    isPaid: true,
    paymentMethodType: "Stripe",
    totalOrderPrice: 1150.00,
    shippingAddress: "Fayoum, Egypt",
    customerNote: "",
    adminNote: "",
    cartItems: [
      {
        product: { title: "TP-Link AC1200 Router", imageCover: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=100" },
        quantity: 1,
        price: 1008.77
      }
    ],
    taxPrice: 141.23,
    shippingPrice: 0.00
  },
  {
    _id: "R1029345",
    orderActualId: "id_18",
    customerName: "Hazem Emad",
    customerEmail: "hazem.emad@gmail.com",
    avatarLetter: "H",
    date: "28 Jun 2026",
    status: "Pending",
    isPaid: false,
    paymentMethodType: "Cash",
    totalOrderPrice: 1650.00,
    shippingAddress: "Qena, Egypt",
    customerNote: "",
    adminNote: "",
    cartItems: [
      {
        product: { title: "Sony WH-CH520 Wireless", imageCover: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=100" },
        quantity: 1,
        price: 1447.37
      }
    ],
    taxPrice: 202.63,
    shippingPrice: 0.00
  },
  {
    _id: "S3920112",
    orderActualId: "id_19",
    customerName: "Rami Nabil",
    customerEmail: "rami.nabil@gmail.com",
    avatarLetter: "R",
    date: "27 Jun 2026",
    status: "Shipped",
    isPaid: true,
    paymentMethodType: "Cash",
    totalOrderPrice: 4500.00,
    shippingAddress: "Aswan, Egypt",
    customerNote: "Deliver to office address",
    adminNote: "Shipped via Aramex",
    cartItems: [
      {
        product: { title: "Bose SoundLink Micro", imageCover: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100" },
        quantity: 1,
        price: 3947.37
      }
    ],
    taxPrice: 552.63,
    shippingPrice: 0.00
  }
];