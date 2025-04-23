import React from 'react';
import { useRouter } from 'next/navigation';
import { Search, Clipboard, DollarSign, FileX } from 'lucide-react';

const QuickOperations: React.FC = () => {
  const router = useRouter();

  return (
    <div className="glass-darker rounded-lg p-3 shadow-xl flex-1 min-h-0">
      <div className="flex flex-col h-full">
        <h2 className="text-lg font-bold text-white mb-2">Hızlı İşlemler</h2>
        <div className="grid grid-cols-2 gap-2 min-h-0">
          <button 
            onClick={() => router.push('/recall')}
            className="btn-green flex flex-col items-center justify-center text-white p-2 rounded-lg"
          >
            <Search size={24} className="mb-1" />
            <span className="text-xs">Çağır</span>
          </button>
          <button 
            onClick={() => router.push('/delivery-status')}
            className="btn-green flex flex-col items-center justify-center text-white p-2 rounded-lg"
          >
            <Clipboard size={24} className="mb-1" />
            <span className="text-xs">Paket Durumu</span>
          </button>
          <button 
            onClick={() => router.push('/expenses')}
            className="btn-green flex flex-col items-center justify-center text-white p-2 rounded-lg"
          >
            <DollarSign size={24} className="mb-1" />
            <span className="text-xs">Ödeme</span>
          </button>
          <button className="btn-green flex flex-col items-center justify-center text-white p-2 rounded-lg">
            <FileX size={24} className="mb-1" />
            <span className="text-xs">Çek Kapat</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickOperations;
