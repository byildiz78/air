'use client';

import React from 'react';
import { Pencil } from 'lucide-react';

interface CustomerAnalysisProps {
  // Add any props needed for the analysis component
}

const CustomerAnalysis: React.FC<CustomerAnalysisProps> = () => {
  return (
    <div className="w-[250px] bg-white p-2 overflow-auto border-l border-gray-200 shadow-sm">
      <h2 className="text-green-600 font-bold text-xs uppercase mb-3 pb-1 flex items-center">
        <span className="bg-green-100 text-green-600 px-2 py-1 rounded mr-1 text-xs">ANALİZ</span>
      </h2>
      
      <div className="space-y-3">
        {/* Toplam Harcama */}
        <div className="bg-gray-50 rounded p-1.5 border-l-2 border-green-500 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-green-600 text-[10px]">TOPLAM HARCAMA</span>
            <span className="text-gray-800 font-bold text-xs">248,00 TL</span>
          </div>
        </div>
        
        {/* Toplam Sipariş Adedi */}
        <div className="bg-gray-50 rounded p-1.5 border-l-2 border-blue-500 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-blue-600 text-[10px]">TOPLAM SİPARİŞ ADEDİ</span>
            <span className="text-gray-800 font-bold text-xs">1 Adet</span>
          </div>
        </div>
        
        {/* Borç */}
        <div className="bg-gray-50 rounded p-1.5 border-l-2 border-red-500 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-red-600 text-[10px]">BORÇ</span>
            <span className="text-gray-800 font-bold text-xs">0,00</span>
          </div>
        </div>
        
        {/* Kalan Para Puan */}
        <div className="bg-gray-50 rounded p-1.5 border-l-2 border-purple-500 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-purple-600 text-[10px]">KALAN PARA PUAN</span>
            <span className="text-gray-800 font-bold text-xs">0,00</span>
          </div>
        </div>
        
        {/* Son Sipariş Zamanı */}
        <div className="bg-gray-50 rounded p-1.5 border-l-2 border-yellow-500 shadow-sm">
          <span className="text-yellow-600 text-[10px] block mb-1">SON SİPARİŞ ZAMANI</span>
          <span className="text-gray-800 font-bold text-xs">27 Aralık, 24 GÜN ÖNCE</span>
        </div>
        
        {/* İskonto */}
        <div className="bg-gray-50 rounded p-1.5 border-l-2 border-orange-500 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-orange-600 text-[10px]">İSKONTO (%)</span>
            <div className="flex items-center gap-1">
              <span className="text-gray-800 font-bold text-xs">0</span>
              <button className="text-yellow-400 hover:bg-yellow-500/20 p-0.5 rounded transition-colors">
                <Pencil size={10} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Cari Satışa İzin Ver */}
        <div className="bg-gray-50 rounded p-1.5 border-l-2 border-teal-500 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-teal-600 text-[10px]">CARİ SATIŞA İZİN VER</span>
            <div className="flex items-center gap-1">
              <span className="text-gray-800 font-bold text-xs">HAYIR</span>
              <button className="text-yellow-400 hover:bg-yellow-500/20 p-0.5 rounded transition-colors">
                <Pencil size={10} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Son Sipariş Durumu */}
        <div className="bg-gray-50 rounded p-1.5 border-l-2 border-green-500 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-green-600 text-[10px]">SON SİPARİŞ DURUMU</span>
            <span className="bg-green-100 text-green-600 text-[10px] px-2 py-0.5 rounded font-medium">HAZIR</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAnalysis;
