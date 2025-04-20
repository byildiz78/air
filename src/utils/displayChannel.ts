/**
 * Müşteri ekranı ile ana uygulama arasında iletişim için kanal
 */

import { OrderItem } from '../types';

// Müşteri ekranı ile iletişim için kanal adı
const DISPLAY_CHANNEL_NAME = 'customer-display-channel';

// Müşteri ekranına gönderilecek mesaj tipleri
export type DisplayMessageType = 'SHOW_WELCOME' | 'ORDER_UPDATE' | 'PAYMENT_COMPLETE';

// Ödeme bilgisi tipi
export interface PaymentInfo {
  paidAmount: number;
  changeAmount: number;
  paymentMethod: string;
}

// Müşteri ekranına gönderilecek mesaj yapısı
export interface DisplayMessage {
  type: DisplayMessageType;
  orderItems?: OrderItem[];
  customerName?: string;
  orderNote?: string;
  checkDiscount?: number;
  productDiscount?: number;
  total?: number;
  paymentInfo?: PaymentInfo;
}

// Müşteri ekranı ile iletişim için kanal oluşturma
export const createDisplayChannel = (): BroadcastChannel => {
  return new BroadcastChannel(DISPLAY_CHANNEL_NAME);
};

// Müşteri ekranına mesaj gönderme
export const sendToDisplay = (message: DisplayMessage): void => {
  const channel = createDisplayChannel();
  channel.postMessage(message);
  channel.close();
};

// Müşteri ekranında karşılama ekranını gösterme
export const showWelcomeScreen = (): void => {
  sendToDisplay({ type: 'SHOW_WELCOME' });
};

// Müşteri ekranına ödeme tamamlandı mesajı gönderme
export const sendPaymentComplete = (
  paymentInfo: PaymentInfo
): void => {
  sendToDisplay({
    type: 'PAYMENT_COMPLETE',
    paymentInfo
  });
};

// Müşteri ekranında sipariş bilgilerini güncelleme
export const updateOrderDisplay = (
  orderItems: OrderItem[],
  customerName?: string,
  orderNote?: string,
  checkDiscount?: number,
  productDiscount?: number,
  total?: number
): void => {
  sendToDisplay({
    type: 'ORDER_UPDATE',
    orderItems,
    customerName,
    orderNote,
    checkDiscount,
    productDiscount,
    total: total || orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) - (checkDiscount || 0) - (productDiscount || 0)
  });
};
