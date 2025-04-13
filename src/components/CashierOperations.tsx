import React from 'react';
import { LogIn, LogOut } from 'lucide-react';

const CashierOperations: React.FC = () => {
  return (
    <div className="glass-darker rounded-lg p-3 shadow-xl flex-1 min-h-0">
      <div className="flex flex-col h-full">
        <h2 className="text-lg font-bold text-white mb-2">Kasiyer İşlemleri</h2>
        <div className="grid grid-cols-2 gap-2">
          <button className="btn-blue flex flex-col items-center justify-center text-white p-2 rounded-lg">
            <LogIn size={24} className="mb-1" />
            <span className="text-xs">Kasiyer Giriş</span>
          </button>
          <button className="btn-red flex flex-col items-center justify-center text-white p-2 rounded-lg">
            <LogOut size={24} className="mb-1" />
            <span className="text-xs">Kasiyer Çıkış</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CashierOperations;
