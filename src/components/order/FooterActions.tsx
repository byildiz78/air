import React from 'react';
import { Percent, FileText, GitMerge, MoreHorizontal, Users, Coins } from 'lucide-react';

interface FooterActionsProps {
  onCheckDiscount: () => void;
  onProductDiscount: () => void;
  onCustomerName: () => void;
  onOtherOptions: () => void;
  onSplitOrder?: () => void;
  onOrderNote?: () => void;
  showTableActions?: boolean;
  selectedProductId?: string | null;
  hasProductInCart?: boolean;
}

const FooterActions: React.FC<FooterActionsProps> = ({
  onCheckDiscount,
  onProductDiscount,
  onCustomerName,
  onOtherOptions,
  onSplitOrder = () => {},
  onOrderNote = () => {},
  showTableActions = true,
  selectedProductId = null,
  hasProductInCart = false,
}) => {
  const buttonClass = "w-full flex items-center justify-center gap-1.5 transition-all duration-150 bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-gray-100 py-2 px-2 rounded-lg text-xs font-medium shadow-sm";
  const iconClass = "shrink-0 opacity-80";

  return (
    <div className="w-[100%] bg-gray-900/95 border-t border-gray-800 p-1.5 space-y-1.5">
      {/* First Row */}
      <div className="grid grid-cols-4 gap-1.5">
        <button 
          onClick={onCheckDiscount}
          className={`${buttonClass} hover:bg-emerald-800 active:bg-emerald-700`}
        >
          <Percent size={15} className={iconClass} />
          <span className="truncate">ÇEK İND.</span>
        </button>
        <button 
          onClick={hasProductInCart ? onProductDiscount : undefined}
          disabled={!hasProductInCart}
          className={`${buttonClass} hover:bg-emerald-800 active:bg-emerald-700 ${!hasProductInCart ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          <Percent size={15} className={iconClass} />
          <span className="truncate">ÜRÜN İND.</span>
        </button>
        <button 
          onClick={onCustomerName}
          className={`${buttonClass} hover:bg-blue-800 active:bg-blue-700`}
        >
          <Users size={15} className={iconClass} />
          <span className="truncate">MÜŞTERİ</span>
        </button>
        <button className={`${buttonClass} hover:bg-amber-800 active:bg-amber-700`}>
          <Coins size={15} className={iconClass} />
          <span className="truncate">P.PUAN</span>
        </button>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-4 gap-1.5">
        <button 
          onClick={onOrderNote}
          className={`${buttonClass} hover:bg-blue-800 active:bg-blue-700`}
        >
          <FileText size={15} className={iconClass} />
          <span className="truncate">SİP.NOT</span>
        </button>
        {showTableActions ? (
          <>
            <button 
              onClick={onSplitOrder}
              className={`${buttonClass} hover:bg-purple-800 active:bg-purple-700`}
            >
              <GitMerge size={15} className={iconClass} />
              <span className="truncate">AYIR</span>
            </button>
            <button className={`${buttonClass} hover:bg-purple-800 active:bg-purple-700`}>
              <GitMerge size={15} className={`${iconClass} rotate-180`} />
              <span className="truncate">BİRLEŞTİR</span>
            </button>
            <button 
              onClick={onOtherOptions}
              className={`${buttonClass} hover:bg-gray-700 active:bg-gray-600`}
            >
              <MoreHorizontal size={15} className={iconClass} />
              <span className="truncate">Diğer</span>
            </button>
          </>
        ) : (
          <button 
            onClick={onOtherOptions}
            className={`${buttonClass} hover:bg-gray-700 active:bg-gray-600`}
          >
            <MoreHorizontal size={15} className={iconClass} />
            <span className="truncate">Diğer</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default FooterActions;
