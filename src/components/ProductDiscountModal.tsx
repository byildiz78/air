import React, { useState } from 'react';
import { X, Percent } from 'lucide-react';
import Numpad from './Numpad';

interface ProductDiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (percentage: number) => void;
}

const ProductDiscountModal: React.FC<ProductDiscountModalProps> = ({ isOpen, onClose, onApply }) => {
  const [percentage, setPercentage] = useState('');

  if (!isOpen) return null;

  const handleNumpadInput = (value: string) => {
    if (value === 'backspace') {
      setPercentage(prev => prev.slice(0, -1));
    } else if (value === 'clear') {
      setPercentage('');
    } else {
      setPercentage(prev => {
        const newValue = prev + value;
        const numValue = parseInt(newValue);
        if (numValue <= 100 && /^\d{1,3}$/.test(newValue)) {
          return newValue;
        }
        return prev;
      });
    }
  };

  const presetDiscounts = [5, 10, 15, 20, 25, 30, 40, 50];

  const handleSubmit = () => {
    if (percentage) {
      onApply(Number(percentage));
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl w-[500px] shadow-2xl">
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Ürün İndirimi</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-2">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={percentage}
                readOnly
                className="w-full bg-gray-800 text-white text-2xl border border-gray-700 rounded-lg p-4 text-right"
                placeholder="0"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Percent size={24} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-6">
            {presetDiscounts.map((discount) => (
              <button
                key={discount}
                onClick={() => setPercentage(discount.toString())}
                className="bg-gray-800 text-white p-4 rounded-lg text-lg hover:bg-gray-700 transition-colors"
              >
                %{discount}
              </button>
            ))}
          </div>

          <Numpad onInput={handleNumpadInput} />
          
          <div className="flex gap-4 mt-6">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-700 text-white p-4 rounded-lg text-lg hover:bg-gray-600 transition-colors"
            >
              İptal
            </button>
            <button
              onClick={handleSubmit}
              disabled={!percentage}
              className="flex-1 bg-blue-600 text-white p-4 rounded-lg text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Uygula
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDiscountModal;
