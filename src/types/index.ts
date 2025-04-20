import type { LucideIcon } from 'lucide-react';

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
  mainItems: ComboItem[];
  sides: ComboItem[];
  drinks: ComboItem[];
  mainItemsSelectionType?: 'required' | 'optional' | 'multiple';
  sidesSelectionType?: 'required' | 'optional' | 'multiple';
  drinksSelectionType?: 'required' | 'optional' | 'multiple';
}

export interface ComboItem {
  id: string;
  name: string;
  extraPrice?: number;
  isRequired?: boolean;
  isOptional?: boolean;
  maxSelections?: number;
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
  comboSelections?: {
    mainItem: ComboItem | null;
    side: ComboItem | null;
    drink: ComboItem | null;
    quantity?: number;
  };
}

export interface CartDiscount {
  amount: number;
  type: 'check' | 'product';
  appliedTo?: string;
}

export interface Payment {
  type: 'cash' | 'card' | 'multinet' | 'sodexo';
  amount: number;
  timestamp: string;
}