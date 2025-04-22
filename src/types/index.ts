import type { LucideIcon } from 'lucide-react';
import { PaymentType } from '../components/SettlementModal';

export type TableStatus = 'empty' | 'occupied';
export type TableShape = 'round' | 'rectangle' | 'square' | 'oval';
export type TableSize = 'small' | 'medium' | 'large';

export interface TableData {
  id: number;
  number: string;
  seats: number;
  status: TableStatus;
  shape: TableShape;
  size: TableSize;
  position: {
    x: number;
    y: number;
    rotation?: number;
  };
  occupiedInfo?: {
    waiter: string;
    occupiedTime: number;
    currentGuests: number;
  };
}

export interface Section {
  id: string;
  name: string;
  icon: LucideIcon;
  tables: TableData[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  icon: LucideIcon;
  barcode?: string;
  isCombo?: boolean;
  comboOptions?: ComboOptions;
  stock?: number;
  description?: string;
  category?: string;
}

export interface ComboOptions {
  mainItems?: ComboItem[];
  sides?: ComboItem[];
  drinks?: ComboItem[];
  mainItemsSelectionType?: 'required' | 'optional';
  sidesSelectionType?: 'required' | 'optional';
  drinksSelectionType?: 'required' | 'optional';
  maxSides?: number;
  maxDrinks?: number;
}

export interface ComboItem {
  id: string;
  name: string;
  extraPrice?: number;
  description?: string;
  isRequired?: boolean;
  isOptional?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  page: number;
  products: Product[];
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  addedAt?: string;
  addedBy?: string;
  discount?: number;
  isCombo?: boolean;
  comboDetails?: {
    description: string;
    mainItem: ComboItem | null;
    sides: ComboItem[];
    drinks: ComboItem[];
  };
  status?: 'pending' | 'in-progress' | 'completed';
  notes?: string;
  options?: string[];
}

export interface CartDiscount {
  amount: number;
  type: 'check' | 'product';
  appliedTo?: string;
}

export interface Payment {
  type: PaymentType;
  amount: number;
  timestamp: string;
}

// Kitchen Display System Types
export interface Order {
  id: string;
  orderNumber: string;
  tableId: string;
  customerName?: string;
  deliveryAddress?: string;
  status: 'pending' | 'in-progress' | 'ready' | 'completed' | 'cancelled';
  type: 'dine-in' | 'takeaway' | 'delivery';
  items: OrderItem[];
  createdAt: string;
  lastUpdated: string;
  notes?: string;
  priority: number;
  waiter?: string;
}

export interface KitchenDisplaySettings {
  showCompletedOrders: boolean;
  autoRefreshInterval: number; // in seconds
  sortBy: 'time' | 'priority' | 'table';
  groupBy: 'status' | 'type' | 'none';
  viewMode: 'grid' | 'list';
  alertThreshold: number; // minutes before order is marked as delayed
  criticalThreshold: number; // minutes before order is marked as critical
}

export interface ProductMessage {
  id: string;
  text: string;
  name: string;
  groupId?: string;
}

export interface ProductMessageGroup {
  id: string;
  name: string;
}