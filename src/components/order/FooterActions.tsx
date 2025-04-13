import React from 'react';
import { Percent, FileText, GitMerge, MoreHorizontal, Users, Coins } from 'lucide-react';

interface FooterActionsProps {
  onCheckDiscount: () => void;
  onProductDiscount: () => void;
  onCustomerName: () => void;
  onOtherOptions: () => void;
  showTableActions?: boolean;
}

const FooterActions: React.FC<FooterActionsProps> = ({
  onCheckDiscount,
  onProductDiscount,
  onCustomerName,
  onOtherOptions,
  showTableActions = true,
}) => {
  return (
    <div className="w-[100%] bg-gray-900/90 border-t border-gray-800">
      {/* First Row */}
      <div className="grid grid-cols-4 gap-0.5 p-0.5">
        <button 
          onClick={onCheckDiscount}
          className="w-full flex items-center justify-center gap-1 bg-blue-600/90 hover:bg-blue-700/90 text-white py-1 px-1.5 rounded text-xs"
        >
          <Percent size={14} className="shrink-0" />
          <span className="truncate">ÇEK İND.</span>
        </button>
        <button 
          onClick={onProductDiscount}
          className="w-full flex items-center justify-center gap-1 bg-blue-600/90 hover:bg-blue-700/90 text-white py-1 px-1.5 rounded text-xs"
        >
          <Percent size={14} className="shrink-0" />
          <span className="truncate">ÜRÜN İND.</span>
        </button>
        <button 
          onClick={onCustomerName}
          className="w-full flex items-center justify-center gap-1 bg-blue-600/90 hover:bg-blue-700/90 text-white py-1 px-1.5 rounded text-xs"
        >
          <Users size={14} className="shrink-0" />
          <span className="truncate">MÜŞTERİ</span>
        </button>
        <button className="w-full flex items-center justify-center gap-1 bg-blue-600/90 hover:bg-blue-700/90 text-white py-1 px-1.5 rounded text-xs">
          <Coins size={14} className="shrink-0" />
          <span className="truncate">P.PUAN</span>
        </button>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-4 gap-0.5 p-0.5">
        <button className="w-full flex items-center justify-center gap-1 bg-blue-600/90 hover:bg-blue-700/90 text-white py-1 px-1.5 rounded text-xs">
          <FileText size={14} className="shrink-0" />
          <span className="truncate">SİP.NOT</span>
        </button>
        {showTableActions ? (
          <>
            <button className="w-full flex items-center justify-center gap-1 bg-blue-600/90 hover:bg-blue-700/90 text-white py-1 px-1.5 rounded text-xs">
              <GitMerge size={14} className="shrink-0" />
              <span className="truncate">AYIR</span>
            </button>
            <button className="w-full flex items-center justify-center gap-1 bg-blue-600/90 hover:bg-blue-700/90 text-white py-1 px-1.5 rounded text-xs">
              <GitMerge size={14} className="shrink-0 rotate-180" />
              <span className="truncate">BİRLEŞTİR</span>
            </button>
            <button 
              onClick={onOtherOptions}
              className="w-full flex items-center justify-center gap-1 bg-blue-600/90 hover:bg-blue-700/90 text-white py-1 px-1.5 rounded text-xs"
            >
              <MoreHorizontal size={14} className="shrink-0" />
              <span className="truncate">DİĞER</span>
            </button>
          </>
        ) : (
          <button 
            onClick={onOtherOptions}
            className="w-full flex items-center justify-center gap-1 bg-blue-600/90 hover:bg-blue-700/90 text-white py-1 px-1.5 rounded text-xs col-span-3"
          >
            <MoreHorizontal size={14} className="shrink-0" />
            <span className="truncate">DİĞER</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default FooterActions;
