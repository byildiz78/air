import React from 'react';
import OtherOptionsModal from '../OtherOptionsModal';
import CheckDiscountModal from '../CheckDiscountModal';
import ProductDiscountModal from '../ProductDiscountModal';
import CustomerNameModal from '../CustomerNameModal';

interface OrderModalsProps {
  isOtherOptionsOpen: boolean;
  isCheckDiscountOpen: boolean;
  isProductDiscountOpen: boolean;
  isCustomerNameOpen: boolean;
  onOtherOptionsClose: () => void;
  onCheckDiscountClose: () => void;
  onProductDiscountClose: () => void;
  onCustomerNameClose: () => void;
  onCheckDiscount: (amount: number) => void;
  onProductDiscount: (percentage: number) => void;
  onCustomerName: (name: string) => void;
}

const OrderModals: React.FC<OrderModalsProps> = ({
  isOtherOptionsOpen,
  isCheckDiscountOpen,
  isProductDiscountOpen,
  isCustomerNameOpen,
  onOtherOptionsClose,
  onCheckDiscountClose,
  onProductDiscountClose,
  onCustomerNameClose,
  onCheckDiscount,
  onProductDiscount,
  onCustomerName,
}) => {
  return (
    <>
      <OtherOptionsModal 
        isOpen={isOtherOptionsOpen}
        onClose={onOtherOptionsClose}
      />
      <CheckDiscountModal
        isOpen={isCheckDiscountOpen}
        onClose={onCheckDiscountClose}
        onApply={onCheckDiscount}
      />
      <ProductDiscountModal
        isOpen={isProductDiscountOpen}
        onClose={onProductDiscountClose}
        onApply={onProductDiscount}
      />
      <CustomerNameModal
        isOpen={isCustomerNameOpen}
        onClose={onCustomerNameClose}
        onSave={onCustomerName}
      />
    </>
  );
};

export default OrderModals;
