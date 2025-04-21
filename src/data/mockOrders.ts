import { Order } from '../types';

// Helper function to generate random past time
const getRandomPastTime = (maxMinutesAgo: number = 60): string => {
  const now = new Date();
  const minutesAgo = Math.floor(Math.random() * maxMinutesAgo) + 1;
  now.setMinutes(now.getMinutes() - minutesAgo);
  return now.toISOString();
};

// Helper function to generate a random time between two dates
const getRandomTimeBetween = (start: Date, end: Date): string => {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const randomTime = startTime + Math.random() * (endTime - startTime);
  return new Date(randomTime).toISOString();
};

// Generate mock orders
export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: '1001',
    tableId: '12',
    status: 'pending',
    type: 'dine-in',
    items: [
      {
        productId: 'p1',
        name: 'Karışık Pizza',
        price: 120,
        quantity: 1,
        status: 'pending',
        options: ['İnce Hamur', 'Ekstra Peynir']
      },
      {
        productId: 'p2',
        name: 'Coca Cola',
        price: 15,
        quantity: 2,
        status: 'pending'
      }
    ],
    createdAt: getRandomPastTime(15),
    lastUpdated: getRandomPastTime(10),
    priority: 1,
    waiter: 'Ahmet Yılmaz'
  },
  {
    id: '2',
    orderNumber: '1002',
    tableId: '5',
    status: 'in-progress',
    type: 'dine-in',
    items: [
      {
        productId: 'p3',
        name: 'Köfte Porsiyon',
        price: 85,
        quantity: 1,
        status: 'in-progress',
        notes: 'Az pişmiş olsun'
      },
      {
        productId: 'p4',
        name: 'Pilav',
        price: 25,
        quantity: 1,
        status: 'completed'
      },
      {
        productId: 'p5',
        name: 'Ayran',
        price: 10,
        quantity: 1,
        status: 'completed'
      }
    ],
    createdAt: getRandomPastTime(30),
    lastUpdated: getRandomPastTime(5),
    notes: 'Müşteri acele ediyor',
    priority: 2,
    waiter: 'Mehmet Demir'
  },
  {
    id: '3',
    orderNumber: '1003',
    tableId: '0',
    customerName: 'Ali Yılmaz',
    status: 'ready',
    type: 'takeaway',
    items: [
      {
        productId: 'p6',
        name: 'Tavuk Döner Dürüm',
        price: 45,
        quantity: 2,
        status: 'completed'
      },
      {
        productId: 'p7',
        name: 'Patates Kızartması',
        price: 20,
        quantity: 1,
        status: 'completed'
      }
    ],
    createdAt: getRandomPastTime(25),
    lastUpdated: getRandomPastTime(2),
    priority: 1
  },
  {
    id: '4',
    orderNumber: '1004',
    tableId: '0',
    customerName: 'Ayşe Kaya',
    deliveryAddress: 'Atatürk Mah. Cumhuriyet Cad. No:12 D:5',
    status: 'pending',
    type: 'delivery',
    items: [
      {
        productId: 'p8',
        name: 'Adana Kebap',
        price: 90,
        quantity: 1,
        status: 'pending'
      },
      {
        productId: 'p9',
        name: 'Lahmacun',
        price: 25,
        quantity: 2,
        status: 'pending'
      },
      {
        productId: 'p10',
        name: 'Baklava',
        price: 45,
        quantity: 1,
        status: 'pending'
      }
    ],
    createdAt: getRandomPastTime(10),
    lastUpdated: getRandomPastTime(10),
    notes: 'Kapıda kredi kartı ile ödeme yapılacak',
    priority: 1
  },
  {
    id: '5',
    orderNumber: '1005',
    tableId: '8',
    status: 'in-progress',
    type: 'dine-in',
    items: [
      {
        productId: 'p11',
        name: 'İskender',
        price: 95,
        quantity: 1,
        status: 'in-progress'
      },
      {
        productId: 'p12',
        name: 'Çoban Salata',
        price: 30,
        quantity: 1,
        status: 'completed'
      }
    ],
    createdAt: getRandomPastTime(45),
    lastUpdated: getRandomPastTime(15),
    priority: 1,
    waiter: 'Zeynep Şahin'
  },
  {
    id: '6',
    orderNumber: '1006',
    tableId: '3',
    status: 'completed',
    type: 'dine-in',
    items: [
      {
        productId: 'p13',
        name: 'Mantı',
        price: 65,
        quantity: 2,
        status: 'completed'
      },
      {
        productId: 'p14',
        name: 'Mercimek Çorbası',
        price: 25,
        quantity: 2,
        status: 'completed'
      }
    ],
    createdAt: getRandomPastTime(120),
    lastUpdated: getRandomPastTime(30),
    priority: 1,
    waiter: 'Ahmet Yılmaz'
  },
  {
    id: '7',
    orderNumber: '1007',
    tableId: '0',
    customerName: 'Mustafa Demir',
    status: 'cancelled',
    type: 'takeaway',
    items: [
      {
        productId: 'p15',
        name: 'Hamburger',
        price: 55,
        quantity: 1,
        status: 'pending'
      }
    ],
    createdAt: getRandomPastTime(60),
    lastUpdated: getRandomPastTime(55),
    notes: 'Müşteri iptal etti',
    priority: 1
  },
  {
    id: '8',
    orderNumber: '1008',
    tableId: '15',
    status: 'pending',
    type: 'dine-in',
    items: [
      {
        productId: 'p16',
        name: 'Karışık Izgara',
        price: 150,
        quantity: 1,
        status: 'pending'
      },
      {
        productId: 'p17',
        name: 'Cacık',
        price: 20,
        quantity: 1,
        status: 'pending'
      },
      {
        productId: 'p18',
        name: 'Künefe',
        price: 40,
        quantity: 1,
        status: 'pending'
      }
    ],
    createdAt: getRandomPastTime(5),
    lastUpdated: getRandomPastTime(5),
    priority: 1,
    waiter: 'Mehmet Demir'
  },
  {
    id: '9',
    orderNumber: '1009',
    tableId: '0',
    customerName: 'Fatma Yıldız',
    deliveryAddress: 'Bahçelievler Mah. Gül Sok. No:5',
    status: 'in-progress',
    type: 'delivery',
    items: [
      {
        productId: 'p19',
        name: 'Tavuk Şiş',
        price: 75,
        quantity: 2,
        status: 'in-progress'
      },
      {
        productId: 'p20',
        name: 'Ayran',
        price: 10,
        quantity: 2,
        status: 'completed'
      }
    ],
    createdAt: getRandomPastTime(35),
    lastUpdated: getRandomPastTime(20),
    priority: 1
  },
  {
    id: '10',
    orderNumber: '1010',
    tableId: '7',
    status: 'ready',
    type: 'dine-in',
    items: [
      {
        productId: 'p21',
        name: 'Pide',
        price: 50,
        quantity: 3,
        status: 'completed'
      },
      {
        productId: 'p22',
        name: 'Şalgam',
        price: 12,
        quantity: 3,
        status: 'completed'
      }
    ],
    createdAt: getRandomPastTime(40),
    lastUpdated: getRandomPastTime(1),
    priority: 1,
    waiter: 'Zeynep Şahin'
  }
];

export default mockOrders;
