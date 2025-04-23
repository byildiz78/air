import React from 'react';
import { DollarSign, Package, Clock } from 'lucide-react';

const CustomerAnalytics: React.FC = () => {
  return (
    <div className="bg-gray-800/50 rounded-md p-4">
      <h2 className="text-xl font-bold text-green-500 mb-6">Analiz</h2>
      
      <div className="space-y-6">
        {/* Total Spending */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Toplam Harcama</span>
            <span className="text-2xl font-bold text-white">248,00 TL</span>
          </div>
        </div>

        {/* Total Orders */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Toplam Sipariş Adedi</span>
            <span className="text-2xl font-bold text-white">1 Adet</span>
          </div>
        </div>

        {/* Debt */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Borç</span>
            <span className="text-2xl font-bold text-white">0,00</span>
          </div>
        </div>

        {/* Remaining Points */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Kalan Para Puan</span>
            <span className="text-2xl font-bold text-white">0,00</span>
          </div>
        </div>

        {/* Last Order Time */}
        <div>
          <div className="text-center">
            <span className="text-gray-400 block mb-2">Son Sipariş Zamanı</span>
            <span className="text-xl font-bold text-white">27 Aralık, 24 gün önce</span>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-gray-400 block mb-1">İskonto (%)</span>
            <div className="flex items-center justify-between bg-gray-700/50 rounded-md p-3">
              <span className="text-white font-bold">0</span>
              <button className="text-yellow-400">
                <Clock size={18} />
              </button>
            </div>
          </div>
          <div>
            <span className="text-gray-400 block mb-1">Cari Satışa İzin Ver</span>
            <div className="flex items-center justify-between bg-gray-700/50 rounded-md p-3">
              <span className="text-white font-bold">Hayır</span>
              <button className="text-yellow-400">
                <Clock size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Order Status */}
        <div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Son Sipariş Durumu</span>
            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-md text-sm">
              Hazır
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAnalytics;
