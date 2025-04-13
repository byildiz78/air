export interface TaxGroup {
  id: string;
  name: string;
  rate: number;
}

export interface SalesType {
  id: string;
  name: string;
}

export interface ProductTaxMapping {
  id: string;
  productId: string;
  productName: string;
  masaKdvId: string | null;
  alGoturKdvId: string | null;
  paketServisKdvId: string | null;
}

// Örnek satış tipleri
export const SALES_TYPES: SalesType[] = [
  { id: 'masa', name: 'Masa' },
  { id: 'alGotur', name: 'Al Götür' },
  { id: 'paketServis', name: 'Paket Servis' }
];
