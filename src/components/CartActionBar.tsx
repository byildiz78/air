// CartActionBar: plus, minus, refund mode
import React from 'react';
import { Plus, Minus, Percent } from 'lucide-react';
import AutorenewIcon from '@mui/icons-material/Autorenew';

interface CartActionBarProps {
  onIncrement: () => void;
  onDecrement: () => void;
  refundMode: boolean;
  setRefundMode: (val: boolean) => void;
  disableDecrement: boolean;
  disableIncrement: boolean;
  onCheckDiscount: () => void; // Yeni prop: çek indirimi fonksiyonu
}

const CartActionBar: React.FC<CartActionBarProps> = ({
  onIncrement,
  onDecrement,
  refundMode,
  setRefundMode,
  disableDecrement,
  disableIncrement,
  onCheckDiscount = () => {}, // Varsayılan fonksiyon
}) => (
  <div className="flex flex-row gap-1 py-1 bg-white border-t border-gray-200 px-1">
    {/* + ve - butonları birlikte bir kapsayıcıda, toplam genişlik flex-1 olacak şekilde */}
    <div className="flex flex-row flex-1 gap-1">
      <button
        className={`flex-1 flex items-center justify-center px-0 py-1 font-bold shadow transition-all bg-green-100 hover:bg-green-200 text-green-700 text-xl h-10 ${disableIncrement ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={onIncrement}
        disabled={disableIncrement}
        style={{ minWidth: 0, minHeight: 36, borderRadius: 0 }}
        aria-label="Ekle"
        title="Ürün Ekle"
      >
        <span className="w-8 h-8 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white shadow-lg text-2xl transition-all border-2 border-green-600" style={{ borderRadius: 0 }}>
          <Plus size={20} />
        </span>
      </button>
      <button
        className={`flex-1 flex items-center justify-center px-0 py-1 font-bold shadow transition-all bg-red-100 hover:bg-red-200 text-red-700 text-xl h-10 ${disableDecrement ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={onDecrement}
        disabled={disableDecrement}
        style={{ minWidth: 0, minHeight: 36, borderRadius: 0 }}
        aria-label="Çıkar"
        title="Ürün Çıkar"
      >
        <span className="w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white shadow-lg text-2xl transition-all border-2 border-red-600" style={{ borderRadius: 0 }}>
          <Minus size={20} />
        </span>
      </button>
    </div>
    {/* Çek İndirimi Butonu */}
    <button
      className="flex-1 flex items-center justify-center px-0 py-1 font-bold shadow transition-all bg-emerald-100 hover:bg-emerald-200 text-emerald-700 text-base h-10"
      onClick={onCheckDiscount}
      aria-label="Çek İndirimi"
      style={{ minWidth: 0, minHeight: 36, borderRadius: 0 }}
      title="Çek İndirimi"
    >
      <Percent size={20} className="opacity-80" />
    </button>
    {/* İade butonu ödeme butonları ile aynı genişlik ve yükseklikte */}
    <button
      className={`flex-1 flex items-center justify-center px-0 py-1 font-bold shadow transition-all h-10 ${refundMode ? 'bg-yellow-400 text-yellow-900' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'} text-base`}
      onClick={() => setRefundMode(!refundMode)}
      aria-label="İade Modu"
      style={{ minWidth: 0, minHeight: 36, borderRadius: 0 }}
      title="İade Modu"
    >
      <AutorenewIcon fontSize="medium" /> İade
    </button>
  </div>
);

export default CartActionBar;
