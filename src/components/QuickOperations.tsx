import React from 'react';
import { useRouter } from 'next/navigation';
import { Search, Clipboard, DollarSign, FileX } from 'lucide-react';

const QuickOperations: React.FC = () => {
  const router = useRouter();

  return (
    <div className="glass-darker h-full rounded-lg p-4 shadow-xl">
      <h2 className="text-xl font-bold text-white mb-4">Hızlı İşlemler</h2>
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => router.push('/recall')}
          className="btn-green flex flex-col items-center justify-center text-white p-4 rounded-lg"
        >
          <Search size={32} className="mb-2" />
          <span className="text-sm">Çağır</span>
        </button>
        <button className="btn-green flex flex-col items-center justify-center text-white p-4 rounded-lg">
          <Clipboard size={32} className="mb-2" />
          <span className="text-sm">Paket Durumu</span>
        </button>
        <button 
          onClick={() => router.push('/expenses')}
          className="btn-green flex flex-col items-center justify-center text-white p-4 rounded-lg"
        >
          <DollarSign size={32} className="mb-2" />
          <span className="text-sm">Ödeme</span>
        </button>
        <button className="btn-green flex flex-col items-center justify-center text-white p-4 rounded-lg">
          <FileX size={32} className="mb-2" />
          <span className="text-sm">Çek Kapat</span>
        </button>
      </div>
    </div>
  );
};

export default QuickOperations;
