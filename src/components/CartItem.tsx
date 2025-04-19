// CartItem: single cart item, slide action bar, discounts, messages, combos
import React from 'react';

interface Message {
  id: string;
  name: string;
}

interface ComboSelection {
  mainItem: any;
  side: any;
  drink: any;
}

interface CartItemProps {
  item: any;
  idx: number;
  isSelected: boolean;
  onSelect: (idx: number) => void;
  lastItemRef: React.RefObject<HTMLDivElement> | null;
  productDiscounts: { [productId: string]: number };
  checkDiscount: number;
  setIsProductDiscountModalOpen: (open: boolean) => void;
  setIsProductMessageModalOpen: (open: boolean) => void;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  idx,
  isSelected,
  onSelect,
  lastItemRef,
  productDiscounts,
  checkDiscount,
  setIsProductDiscountModalOpen,
  setIsProductMessageModalOpen,
  onIncrement,
  onDecrement,
}) => {
  // Discount calculations
  const hasProductDiscount = typeof item.discount === 'number' && item.discount > 0;
  const hasCheckDiscount = typeof checkDiscount === 'number' && checkDiscount > 0;
  const productDiscountPercent = hasProductDiscount ? item.discount : 0;
  const checkDiscountPercent = hasCheckDiscount ? checkDiscount : 0;
  const productDiscountAmount = hasProductDiscount ? (item.price * productDiscountPercent / 100) : 0;
  const checkDiscountAmount = hasCheckDiscount ? (item.price * checkDiscountPercent / 100) : 0;
  const discountedPrice = Math.max(0, (item.price - productDiscountAmount - checkDiscountAmount));

  return (
    <div
      key={item.productId}
      ref={lastItemRef}
      className={`group cursor-pointer px-3 py-2 mb-1 transition-all border-2 shadow-sm
        ${isSelected ? 'border-2 border-blue-400 bg-gradient-to-r from-blue-100/60 via-blue-50/80 to-white/80 shadow-lg scale-[1.03] ring-2 ring-blue-200 ring-offset-2' : 'border-transparent hover:border-blue-200 hover:bg-blue-50/40'}
        rounded-2xl relative overflow-visible
      `}
      onClick={() => onSelect(idx)}
      style={{ minHeight: '44px', boxShadow: isSelected ? '0 4px 16px 0 rgba(37,99,235,0.10)' : undefined }}
    >
      <div className="relative">
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-bold bg-gray-700 rounded w-5 h-5 flex items-center justify-center text-white shadow">{item.quantity}</span>
          <span className="text-[11px] font-semibold text-gray-800 truncate flex-1 drop-shadow">{item.name}</span>
          {(hasProductDiscount || hasCheckDiscount) ? (
            <>
              <span className="text-[11px] font-bold text-gray-400 line-through">{(item.price * item.quantity).toFixed(2)}</span>
              <span className="text-[11px] font-bold text-green-700 ml-1">{(discountedPrice * item.quantity).toFixed(2)}</span>
            </>
          ) : (
            <span className="text-[11px] font-bold text-gray-900">{(item.price * item.quantity).toFixed(2)}</span>
          )}
          {productDiscounts[item.productId] && (
            <span className="ml-1 px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-bold">%{productDiscounts[item.productId]}</span>
          )}
        </div>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isSelected ? 'max-h-16 opacity-100 translate-y-0 mt-2' : 'max-h-0 opacity-0 translate-y-2'} flex items-center gap-2 justify-center`}
          style={{ willChange: 'opacity, transform' }}
        >
          <button
            className="rounded-full p-1.5 bg-green-100 hover:bg-green-200 text-green-700 shadow transition"
            onClick={e => { e.stopPropagation(); onIncrement(item.productId); }}
            title="Ürünü Artır (+)"
          >
            <span className="text-xs font-bold">+</span>
          </button>
          <button
            className="rounded-full p-1.5 bg-red-100 hover:bg-red-200 text-red-700 shadow transition"
            onClick={e => { e.stopPropagation(); onDecrement(item.productId); }}
            title="Ürünü Azalt (-)"
          >
            <span className="text-xs font-bold">-</span>
          </button>
          <button
            className="rounded-full p-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 shadow transition"
            onClick={e => { e.stopPropagation(); setIsProductDiscountModalOpen(true); }}
            title="Ürün İndirimi (%)"
          >
            <span className="text-xs font-bold">%</span>
          </button>
          <button
            className="rounded-full p-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 shadow transition"
            onClick={e => { e.stopPropagation(); setIsProductMessageModalOpen(true); }}
            title="Mesaj Ekle (M)"
          >
            <span className="text-xs font-bold">M</span>
          </button>
        </div>
      </div>
      {item.messages && item.messages.length > 0 && (
        <div className="flex flex-wrap gap-x-1 gap-y-0 mt-0.5 ml-10 w-full">
          {item.messages.map((msg: Message) => (
            <span key={msg.id} className="px-1.5 py-0 rounded bg-blue-50 text-blue-700 text-[9px] font-semibold border border-blue-200 leading-tight whitespace-nowrap">
              {msg.name}
            </span>
          ))}
        </div>
      )}
      {(hasProductDiscount || hasCheckDiscount) && (
        <div className="flex flex-wrap gap-1 mt-1 ml-10 text-[10px]">
          {hasProductDiscount && (
            <span className="px-1 py-0 rounded bg-emerald-100 text-emerald-700 font-semibold border border-emerald-200 min-w-[56px] text-center">
              Ürün İndirimi: %{productDiscountPercent}
            </span>
          )}
          {hasCheckDiscount && (
            <span className="px-1 py-0 rounded bg-rose-100 text-rose-700 font-semibold border border-rose-200 min-w-[56px] text-center">
              Çek İndirimi: %{checkDiscountPercent}
            </span>
          )}
        </div>
      )}
      {item.comboSelections && (
        <div className="mt-2 ml-8 space-y-1 bg-indigo-50/60 rounded p-1.5 animate-fade-in border border-indigo-100">
          {[item.comboSelections.mainItem, item.comboSelections.side, item.comboSelections.drink].map((sel: any, i: number) => (
            <div key={i} className="flex items-center gap-2 text-[11px] font-semibold text-indigo-700 bg-indigo-100/80 rounded px-2 py-1 shadow-sm mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400/70 shrink-0"></div>
              <span className="truncate flex-1">{sel.name}</span>
              {sel.extraPrice && sel.extraPrice > 0 && (
                <span className="ml-2 text-indigo-500 font-bold">+{sel.extraPrice}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartItem;
