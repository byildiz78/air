// CartSummary: discounts and net total
import React from 'react';

interface CartSummaryProps {
  checkDiscount: number;
  totalProductDiscount: number;
  netTotal: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ checkDiscount, totalProductDiscount, netTotal }) => (
  <div className="z-20 bg-gray-50 border-t border-gray-200 px-1.5 py-1.5 flex flex-col gap-0.5 shadow-inner rounded-b-xl select-none">
    {/* İndirimler sadece varsa göster */}
    {checkDiscount > 0 && (
      <div className="flex items-center justify-between text-[11px] text-rose-600 font-semibold">
        <span>Çek İndirimi</span>
        <span>-{checkDiscount.toLocaleString('tr-TR', {minimumFractionDigits:2})}</span>
      </div>
    )}
    {totalProductDiscount > 0 && (
      <div className="flex items-center justify-between text-[11px] text-emerald-600 font-semibold">
        <span>Ürün İndirimi</span>
        <span>-{totalProductDiscount.toLocaleString('tr-TR', {minimumFractionDigits:2})}</span>
      </div>
    )}
    {/* Net Toplam */}
    <div className="flex items-center justify-between mt-0.5">
      <div className="flex items-center gap-1 flex-1">
        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">i</span>
        <span className="text-gray-700 text-[13px] font-bold ml-1">TOPLAM :</span>
      </div>
      <span className="text-lg text-green-700 font-extrabold tabular-nums">{netTotal.toLocaleString('tr-TR', {minimumFractionDigits:2})}</span>
    </div>
  </div>
);

export default CartSummary;
