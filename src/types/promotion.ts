export interface Promotion {
  id: string;
  name: string;
  description?: string;
  discountType: 'PERCENTAGE' | 'FIXED';
  discountValue: number;
  startDate?: string;
  endDate?: string;
  timeRangeEnabled: boolean;
  timeRangeStart?: number;
  timeRangeEnd?: number;
  minimumAmount?: number;
  minimumAmountEnabled: boolean;
  daysEnabled: boolean;
  activeDays: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  buttonImage?: string;
  discountCode?: string;
  securityLevel: number;
  isActive: boolean;
  isProductDiscount: boolean;
  isCheckDiscount: boolean;
  excludeDiscountedItems: boolean;
  includedProducts: string[];
  excludedProducts: string[];
  includedGroups: string[];
  excludedGroups: string[];
}

export interface ProductGroup {
  id: string;
  name: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  groupId?: string;
  price: number;
}

export const initialGroups: ProductGroup[] = [
  { id: '1', name: 'Ana Yemekler' },
  { id: '2', name: 'İçecekler' },
  { id: '3', name: 'Tatlılar' }
];

export const initialProducts: Product[] = [
  { id: '1', name: 'Köfte', groupId: '1', price: 120 },
  { id: '2', name: 'Pilav', groupId: '1', price: 50 },
  { id: '3', name: 'Kola', groupId: '2', price: 30 },
  { id: '4', name: 'Baklava', groupId: '3', price: 80 }
];

export const initialPromotions: Promotion[] = [
  {
    id: '1',
    name: 'ÖZEL MÜŞTERİ %10',
    description: 'Özel müşteriler için %10 indirim',
    discountType: 'PERCENTAGE',
    discountValue: 10,
    securityLevel: 5,
    isActive: true,
    isProductDiscount: true,
    isCheckDiscount: false,
    excludeDiscountedItems: true,
    timeRangeEnabled: false,
    minimumAmountEnabled: false,
    daysEnabled: false,
    activeDays: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    },
    includedProducts: [],
    excludedProducts: [],
    includedGroups: [],
    excludedGroups: []
  },
  {
    id: '2',
    name: 'İKRAM',
    description: 'İkram indirimi',
    discountType: 'PERCENTAGE',
    discountValue: 100,
    securityLevel: 5,
    isActive: true,
    isProductDiscount: true,
    isCheckDiscount: false,
    excludeDiscountedItems: false,
    timeRangeEnabled: false,
    minimumAmountEnabled: false,
    daysEnabled: false,
    activeDays: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    },
    includedProducts: [],
    excludedProducts: [],
    includedGroups: [],
    excludedGroups: []
  }
];
