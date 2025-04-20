import React from 'react';
import PaymentIcon from '@mui/icons-material/Payment';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PrintIcon from '@mui/icons-material/Print';
import ReceiptIcon from '@mui/icons-material/Receipt';
import MessageIcon from '@mui/icons-material/Message';

interface PaymentButton {
  label: string;
  color: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  doubleHeight?: boolean;
}

interface CartPaymentButtonsProps {
  paymentButtons: PaymentButton[];
  onCompleteClick: () => void;
  onMessageClick: () => void;
}

const CartPaymentButtons: React.FC<CartPaymentButtonsProps> = ({ paymentButtons, onCompleteClick, onMessageClick }) => (
  <div className="w-full bg-gray-50 pb-1">
    <div className="grid grid-cols-2 gap-1 mt-1 mb-1 px-1">
      {paymentButtons.map((btn, i) => (
        <button
          key={i}
          className={`w-full px-2 py-2 rounded-sm text-[13px] font-bold shadow-sm transition-all ${btn.color} whitespace-nowrap flex items-center justify-center gap-1 ${btn.doubleHeight ? 'row-span-2 h-[104px] min-h-[104px]' : ''}`}
          onClick={btn.onClick}
          disabled={btn.disabled}
          style={{ opacity: btn.disabled ? 0.5 : 1, minHeight: btn.doubleHeight ? 104 : 50 }}
        >
          {btn.icon}
          {btn.label}
        </button>
      ))}

    </div>
  </div>
);

export default CartPaymentButtons;
