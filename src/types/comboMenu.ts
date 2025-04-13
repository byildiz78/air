export interface ComboSelectionGroup {
  id: string;
  name: string;
  minSelection: number;
  maxSelection: number;
  products: ComboProduct[];
}

export interface ComboProduct {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
}

export interface ComboMenu {
  id: string;
  name: string;
  basePrice: number;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  selectionGroups: ComboSelectionGroup[];
}
