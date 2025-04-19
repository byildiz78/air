// CartInfoHeader: Çek No, Terminal, Masa, Açılış
import React from 'react';

interface CartInfoHeaderProps {
  cekNo: string;
  terminalNo: string;
  tableId: string;
  acilisSaati: string;
}

const CartInfoHeader: React.FC<CartInfoHeaderProps> = ({ cekNo, terminalNo, tableId, acilisSaati }) => (
  <div className="flex flex-col gap-0.5 px-2 pt-1 pb-1 text-[10px] font-semibold">
    <div className="grid grid-cols-2 gap-x-2 gap-y-1 bg-blue-50 border border-blue-200 rounded-lg shadow-sm px-1.5 py-1">
      <div className="flex items-center gap-1 text-blue-900">
        <span className="inline-flex items-center justify-center w-4 h-4 rounded bg-blue-200 text-blue-700 text-[10px] font-bold">#</span>
        <span className="font-bold">Çek No:</span>
        <span className="font-normal text-blue-900">{cekNo}</span>
      </div>
      <div className="flex items-center gap-1 text-blue-900">
        <span className="inline-flex items-center justify-center w-4 h-4 rounded bg-blue-200 text-blue-700 text-[10px] font-bold">T</span>
        <span className="font-bold">Terminal:</span>
        <span className="font-normal text-blue-900">{terminalNo}</span>
      </div>
      <div className="flex items-center gap-1 text-blue-900">
        <span className="inline-flex items-center justify-center w-4 h-4 rounded bg-blue-200 text-blue-700 text-[10px] font-bold">M</span>
        <span className="font-bold">Masa:</span>
        <span className="font-normal text-blue-900">{tableId}</span>
      </div>
      <div className="flex items-center gap-1 text-blue-900">
        <span className="inline-flex items-center justify-center w-4 h-4 rounded bg-blue-200 text-blue-700 text-[10px] font-bold">⏰</span>
        <span className="font-bold">Açılış:</span>
        <span className="font-normal text-blue-900">{acilisSaati}</span>
      </div>
    </div>
  </div>
);

export default CartInfoHeader;
