import React, { useState } from 'react';
import { X, Percent, Delete, ArrowLeft } from 'lucide-react';
import Numpad from './Numpad';

interface CheckDiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (amount: number) => void;
}

const CheckDiscountModal: React.FC<CheckDiscountModalProps> = ({ isOpen, onClose, onApply }) => {
  const [amount, setAmount] = useState('');

  if (!isOpen) return null;

  const handleNumpadInput = (value: string) => {
    if (value === 'backspace') {
      setAmount(prev => prev.slice(0, -1));
    } else if (value === 'clear') {
      setAmount('');
    } else {
      setAmount(prev => {
        const newValue = prev + value;
        // Validate decimal format
        if (/^\d*\.?\d{0,2}$/.test(newValue)) {
          return newValue;
        }
        return prev;
      });
    }
  };

  const handleSubmit = () => {
    if (amount) {
      onApply(Number(amount));
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl w-[500px] shadow-2xl">
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Çek İndirimi</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-2">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={amount}
                readOnly
                className="w-full bg-gray-800 text-white text-2xl border border-gray-700 rounded-lg p-4 text-right"
                placeholder="0.00"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Percent size={24} />
              </div>
            </div>
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
              disabled={!amount}
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

export default CheckDiscountModal;
