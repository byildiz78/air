// SaleTypeHeader: Fişli/Faturalı Satış + Servis Tipi header
import React from 'react';

interface SaleTypeHeaderProps {
  saleType: 'Fişli Satış' | 'Faturalı Satış';
  setSaleType: (type: 'Fişli Satış' | 'Faturalı Satış') => void;
  serviceType: string;
  onServiceTypeClick: () => void;
}

const SaleTypeHeader: React.FC<SaleTypeHeaderProps> = ({
  saleType,
  setSaleType,
  serviceType,
  onServiceTypeClick,
}) => (
  <div className="px-2 pt-2 pb-1 border-b border-gray-200 bg-white flex items-center gap-2 select-none justify-between">
    <div className="flex items-center gap-2 flex-1">
      <div
        className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[15px]
          ${saleType === 'Fişli Satış' ? 'bg-green-500 text-white' : 'bg-yellow-400 text-yellow-900 border border-yellow-500'}`}
      >
        {saleType === 'Fişli Satış' ? 'F' : 'FT'}
      </div>
      <span
        className="text-[16px] font-extrabold tracking-wide text-gray-800 cursor-pointer"
        onClick={() => setSaleType(saleType === 'Fişli Satış' ? 'Faturalı Satış' : 'Fişli Satış')}
      >
        {saleType}
      </span>
    </div>
    <span
      className="px-2 py-1 rounded bg-blue-50 text-blue-700 text-[13px] font-bold border border-blue-200 cursor-pointer hover:bg-blue-100 transition select-none"
      onClick={onServiceTypeClick}
      style={{ minWidth: 92, textAlign: 'right' }}
    >
      {serviceType}
    </span>
  </div>
);

export default SaleTypeHeader;
