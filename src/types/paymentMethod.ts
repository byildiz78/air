export interface PaymentMethod {
  id: string;
  name: string;
  displayOrder: number;
  securityLevel: number;
  isHidden: boolean;
  isPrinterDisabled: boolean;
  isCustomerNameRequired: boolean;
  isCouponPayment: boolean;
  accountingCode: string;
  isFixedAmount: boolean;
  opensCashDrawer: boolean;
  isForeignCurrency: boolean;
  exchangeRate?: number;
  isCampusCard: boolean;
  mobileEftPos?: string;
  link?: string;
  bankCode?: string;
}

export const initialPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    name: 'NAKİT',
    displayOrder: 1,
    securityLevel: 5,
    isHidden: false,
    isPrinterDisabled: false,
    isCustomerNameRequired: false,
    isCouponPayment: false,
    accountingCode: '100.00.0',
    isFixedAmount: false,
    opensCashDrawer: true,
    isForeignCurrency: false,
    isCampusCard: false
  },
  {
    id: '2',
    name: 'KREDİ KARTI',
    displayOrder: 2,
    securityLevel: 5,
    isHidden: false,
    isPrinterDisabled: false,
    isCustomerNameRequired: false,
    isCouponPayment: false,
    accountingCode: '108.01.0',
    isFixedAmount: false,
    opensCashDrawer: false,
    isForeignCurrency: false,
    isCampusCard: false,
    bankCode: '0'
  }
];
