export interface ProductMessage {
  id: string;
  name: string;
  extraPrice: number;
  selectedByDefault: boolean;
  isKitchenAddMessage: boolean;
  isKitchenSendMessage: boolean;
  isPizzaProduction: boolean;
  isAutomaticForKgProducts: boolean;
  isDepositMessage: boolean;
  hideMessage: boolean;
  groupId: string;
  groupColor?: string;
  isActive: boolean;
}
