export interface Product {
  id: string;
  name: string;
  price: number;
  groupId: string;
  groupColor?: string;
  image?: string;
  barcode?: string;
  isActive: boolean;
  isCombo: boolean;
  isTopLevel: boolean;
  isOpen: boolean;
  securityLevel: number;
  
  // Page 2 fields
  tablePrice?: number;
  barPrice?: number;
  cashRegisterPrice?: number;
  counterPrice?: number;
  packagePrice?: number;
  kitchenDisplays?: number;
  foodBasketCode?: string;
  discountable?: boolean;
  accountingCode?: string;
  printLabel?: boolean;
  noWaiterService?: boolean;
  timeAdjustable?: boolean;
  
  // Page 3 fields
  secondLanguageName?: string;
  packageFee?: number;
  packageGift?: number;
  minPrice?: number;
  maxDiscountPrice?: number;
  barcode2?: string;
  printer2?: string;
  printer3?: string;
  assumedPackageProduct?: boolean;
  timing?: boolean;
  
  // Kitchen Screens fields
  kitchenScreens?: {
    screen1?: boolean;
    screen2?: boolean;
    screen3?: boolean;
    screen4?: boolean;
    screen5?: boolean;
    screen6?: boolean;
    screen7?: boolean;
    screen8?: boolean;
  };
  
  // Sizes fields
  mainSizeProduct?: string;
  size?: string;
}
