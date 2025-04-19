// CartItemList: list of cart items with watermark
import React, { RefObject } from 'react';
import { OrderItem } from '../types';
import CartItem from './CartItem';

interface Message {
  id: string;
  name: string;
}

interface ComboSelection {
  mainItem: any;
  side: any;
  drink: any;
}

interface OrderItemWithMessages extends OrderItem {
  messages?: Message[];
  comboSelections?: ComboSelection;
}

interface CartItemListProps {
  orderItems: OrderItemWithMessages[];
  selectedIndex: number | null;
  handleSelect: (idx: number) => void;
  lastItemRef: RefObject<HTMLDivElement>;
  productDiscounts: { [productId: string]: number };
  checkDiscount: number;
  setIsProductDiscountModalOpen: (open: boolean) => void;
  setIsProductMessageModalOpen: (open: boolean) => void;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
}

const CartItemList: React.FC<CartItemListProps> = ({
  orderItems,
  selectedIndex,
  handleSelect,
  lastItemRef,
  productDiscounts,
  checkDiscount,
  setIsProductDiscountModalOpen,
  setIsProductMessageModalOpen,
  onIncrement,
  onDecrement,
}) => (
  <div className="relative flex-1 overflow-y-auto bg-transparent p-0.5 divide-y divide-gray-200 z-10" style={{maxHeight:'calc(100vh - 330px)'}}>
    {/* Watermark tam ürünler alanının ortasında */}
    <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center pointer-events-none select-none z-0">
      <span className="text-[4vw] font-extrabold text-gray-200 opacity-60 tracking-widest" style={{letterSpacing:'0.2em'}}>SATIŞ</span>
    </div>
    <div className="relative z-10">
      {orderItems.map((item, idx) => (
        <CartItem
          key={item.productId}
          item={item}
          idx={idx}
          isSelected={selectedIndex === idx}
          onSelect={handleSelect}
          lastItemRef={idx === orderItems.length - 1 ? lastItemRef : null}
          productDiscounts={productDiscounts}
          checkDiscount={checkDiscount}
          setIsProductDiscountModalOpen={setIsProductDiscountModalOpen}
          setIsProductMessageModalOpen={setIsProductMessageModalOpen}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />
      ))}
    </div>
  </div>
);

export default CartItemList;
