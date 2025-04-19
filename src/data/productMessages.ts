import { ProductMessage } from '../types/productMessage';

export const productMessages: ProductMessage[] = [
  { id: 'chocolate', name: 'Çikolatalı Sos', extraPrice: 0, selectedByDefault: false, isKitchenAddMessage: false, isKitchenSendMessage: false, isPizzaProduction: false, isAutomaticForKgProducts: false, isDepositMessage: false, hideMessage: false, groupId: 'sauces', isActive: true },
  { id: 'strawberry', name: 'Çilekli Sos', extraPrice: 0, selectedByDefault: false, isKitchenAddMessage: false, isKitchenSendMessage: false, isPizzaProduction: false, isAutomaticForKgProducts: false, isDepositMessage: false, hideMessage: false, groupId: 'sauces', isActive: true },
  { id: 'cream', name: 'Kaymak', extraPrice: 0, selectedByDefault: false, isKitchenAddMessage: false, isKitchenSendMessage: false, isPizzaProduction: false, isAutomaticForKgProducts: false, isDepositMessage: false, hideMessage: false, groupId: 'sauces', isActive: true },
  { id: 'test', name: 'Test Mesajı', extraPrice: 0, selectedByDefault: false, isKitchenAddMessage: false, isKitchenSendMessage: false, isPizzaProduction: false, isAutomaticForKgProducts: false, isDepositMessage: false, hideMessage: false, groupId: 'test', isActive: true },
];

export const productMessageGroups = [
  { id: 'sauces', name: 'Soslar' },
  { id: 'test', name: 'Test Grubu' },
];
