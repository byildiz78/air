import React from 'react';
import { LogIn, LogOut } from 'lucide-react';

const CashierOperations: React.FC = () => {
  return (
    <div className="glass-darker h-full rounded-lg p-4 shadow-xl">
      <h2 className="text-xl font-bold text-white mb-4">Kasiyer İşlemleri</h2>
      <div className="grid grid-cols-2 gap-4">
        <button className="btn-blue flex flex-col items-center justify-center text-white p-4 rounded-lg">
          <LogIn size={32} className="mb-2" />
          <span className="text-sm">Kasiyer Giriş</span>
        </button>
        <button className="btn-red flex flex-col items-center justify-center text-white p-4 rounded-lg">
          <LogOut size={32} className="mb-2" />
          <span className="text-sm">Kasiyer Çıkış</span>
        </button>
      </div>
    </div>
  );
};

export default CashierOperations;
