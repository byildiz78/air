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
    <div className="bg-gray-900/90 border-t border-gray-800">
      {/* First Row */}
      <div className="grid grid-cols-4 gap-1 p-1">
        <button 
          onClick={onCheckDiscount}
          className="flex items-center justify-center gap-2 bg-blue-600/90 hover:bg-blue-700/90 text-white p-2 rounded"
        >
          <Percent size={18} />
          <span>ÇEK İNDİRİMİ</span>
        </button>
        <button 
          onClick={onProductDiscount}
          className="flex items-center justify-center gap-2 bg-blue-600/90 hover:bg-blue-700/90 text-white p-2 rounded"
        >
          <Percent size={18} />
          <span>ÜRÜN İNDİRİMİ</span>
        </button>
        <button 
          onClick={onCustomerName}
          className="flex items-center justify-center gap-2 bg-blue-600/90 hover:bg-blue-700/90 text-white p-2 rounded"
        >
          <Users size={18} />
          <span>MÜŞTERİ ADI</span>
        </button>
        <button className="flex items-center justify-center gap-2 bg-blue-600/90 hover:bg-blue-700/90 text-white p-2 rounded">
          <Coins size={18} />
          <span>PARA PUAN</span>
        </button>
      </div>
      {/* Second Row */}
      <div className="grid grid-cols-4 gap-1 p-1">
        <button className="flex items-center justify-center gap-2 bg-blue-600/90 hover:bg-blue-700/90 text-white p-2 rounded">
          <FileText size={18} />
          <span>SİPARİŞ NOTU</span>
        </button>
        {showTableActions ? (
          <>
            <button className="flex items-center justify-center gap-2 bg-blue-600/90 hover:bg-blue-700/90 text-white p-2 rounded">
              <GitMerge size={18} />
              <span>AYIR</span>
            </button>
            <button className="flex items-center justify-center gap-2 bg-blue-600/90 hover:bg-blue-700/90 text-white p-2 rounded">
              <GitMerge size={18} className="rotate-180" />
              <span>BİRLEŞTİR</span>
            </button>
            <button 
              onClick={onOtherOptions}
              className="flex items-center justify-center gap-2 bg-blue-600/90 hover:bg-blue-700/90 text-white p-2 rounded"
            >
              <MoreHorizontal size={18} />
              <span>DİĞER</span>
            </button>
          </>
        ) : (
          <button 
            onClick={onOtherOptions}
            className="flex items-center justify-center gap-2 bg-blue-600/90 hover:bg-blue-700/90 text-white p-2 rounded col-span-3"
          >
            <MoreHorizontal size={18} />
            <span>DİĞER</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default FooterActions;
