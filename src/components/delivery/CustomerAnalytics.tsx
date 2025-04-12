import React from 'react';
import { DollarSign, Package, Clock } from 'lucide-react';

const CustomerAnalytics: React.FC = () => {
  return (
    <div className="bg-gray-800/50 rounded-xl p-4">
      <h2 className="text-xl font-bold text-green-500 mb-6">ANALİZ</h2>
      
      <div className="space-y-6">
        {/* Total Spending */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">TOPLAM HARCAMA</span>
            <span className="text-2xl font-bold text-white">248,00 TL</span>
          </div>
        </div>

        {/* Total Orders */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">TOPLAM SİPARİŞ ADEDİ</span>
            <span className="text-2xl font-bold text-white">1 Adet</span>
          </div>
        </div>

        {/* Debt */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">BORÇ</span>
            <span className="text-2xl font-bold text-white">0,00</span>
          </div>
        </div>

        {/* Remaining Points */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">KALAN PARA PUAN</span>
            <span className="text-2xl font-bold text-white">0,00</span>
          </div>
        </div>

        {/* Last Order Time */}
        <div>
          <div className="text-center">
            <span className="text-gray-400 block mb-2">SON SİPARİŞ ZAMANI</span>
            <span className="text-xl font-bold text-white">27 Aralık, 24 GÜN ÖNCE</span>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-gray-400 block mb-1">İSKONTO (%)</span>
            <div className="flex items-center justify-between bg-gray-700/50 rounded-lg p-3">
              <span className="text-white font-bold">0</span>
              <button className="text-yellow-400">
                <Clock size={18} />
              </button>
            </div>
          </div>
          <div>
            <span className="text-gray-400 block mb-1">CARİ SATIŞA İZİN VER</span>
            <div className="flex items-center justify-between bg-gray-700/50 rounded-lg p-3">
              <span className="text-white font-bold">HAYIR</span>
              <button className="text-yellow-400">
                <Clock size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Order Status */}
        <div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">SON SİPARİŞ DURUMU</span>
            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
              HAZIR
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAnalytics;
