import React, { useState, useEffect, useRef } from 'react';
import { X, DollarSign, Check, AlertCircle } from 'lucide-react';
import ChangeDisplayOverlay from './ChangeDisplayOverlay';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number) => void;
  totalAmount: number;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  totalAmount,
}) => {
  const [inputAmount, setInputAmount] = useState('0.00');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showChange, setShowChange] = useState(false);
  const [numericInput, setNumericInput] = useState('');
  const successTimeoutRef = useRef<NodeJS.Timeout>();
  const autoCompleteTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isOpen) {
      setInputAmount('0.00');
      setSelectedAmount(null);
      setShowSuccess(false);
      setShowChange(false);
      setNumericInput('');
    }
    return () => {
      if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
      if (autoCompleteTimeoutRef.current) clearTimeout(autoCompleteTimeoutRef.current);
    };
  }, [isOpen]);

  const getQuickAmounts = (amount: number): number[] => {
    const roundTo = (n: number, precision: number) => {
      return Math.ceil(n / precision) * precision;
    };

    const next5 = roundTo(amount, 5);
    const next10 = roundTo(amount, 10);
    const next50 = roundTo(amount, 50);
    const next100 = roundTo(amount, 100);
    const next200 = roundTo(amount, 200);

    return Array.from(new Set([
      amount,
      next5,
      next10,
      next50,
      next100,
      next200,
      1000
    ])).sort((a, b) => a - b);
  };

  const handlePaymentSuccess = (amount: number) => {
    if (amount > totalAmount) {
      setShowChange(true);
    } else {
      onConfirm(amount);
      onClose();
    }
  };

  const handleChangeDisplayComplete = () => {
    setShowChange(false);
    onConfirm(selectedAmount || 0);
    onClose();
  };

  const handleNumberClick = (num: number | string) => {
    if (num === 'backspace') {
      setNumericInput(prev => {
        const newValue = prev.slice(0, -1) || '';
        const amount = parseFloat((parseInt(newValue) || 0) / 100);
        setInputAmount(amount.toFixed(2));
        setSelectedAmount(amount);
        return newValue;
      });
    } else if (num === 'clear') {
      setNumericInput('');
      setInputAmount('0.00');
      setSelectedAmount(0);
    } else if (num === '.') {
      // Ignore decimal point as we're always treating input as decimal
      return;
    } else {
      setNumericInput(prev => {
        const newValue = prev + num;
        const amount = parseFloat((parseInt(newValue) || 0) / 100);
        setInputAmount(amount.toFixed(2));
        setSelectedAmount(amount);
        return newValue;
      });
    }
  };

  const handleQuickAmountClick = (amount: number) => {
    const numericValue = Math.round(amount * 100).toString();
    setNumericInput(numericValue);
    setSelectedAmount(amount);
    setInputAmount(amount.toFixed(2));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl w-[800px] shadow-2xl border border-gray-700">
        {/* Success Overlay */}
        {showSuccess && (
          <div className="absolute inset-0 bg-green-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
            <div className="bg-green-500 rounded-full p-4 animate-bounce">
              <Check size={48} className="text-white" />
            </div>
          </div>
        )}

        {/* Header */}
        <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-gradient-to-r from-gray-900 to-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <DollarSign size={24} className="text-yellow-500" />
            </div>
            <h2 className="text-2xl font-bold text-white">Nakit Ödeme</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-2">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          {/* Amount Display */}
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-4">
              {/* Total Amount */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-4 border border-gray-600/30">
                <div className="text-sm text-gray-400 mb-2">Ödenecek Tutar</div>
                <div className="text-3xl font-bold text-white">
                  {totalAmount.toFixed(2)} TL
                </div>
              </div>
              
              {/* Input Amount */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-4 border border-gray-600/30">
                <div className="text-sm text-gray-400 mb-2">Alınan</div>
                <div className={`text-3xl font-bold ${selectedAmount && selectedAmount >= totalAmount ? 'text-green-400' : 'text-white'}`}>
                  {inputAmount} TL
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Tuşlanan: {numericInput || '0'}
                </div>
              </div>
            </div>

            {/* Status Message */}
            {selectedAmount !== null && selectedAmount > 0 && (
              <div className="mt-4">
                <div className={`p-3 rounded-lg flex items-center gap-2 ${
                  selectedAmount >= totalAmount 
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  <AlertCircle size={20} />
                  <span>
                    {selectedAmount >= totalAmount
                      ? selectedAmount > totalAmount 
                        ? `Para üstü: ${(selectedAmount - totalAmount).toFixed(2)} TL`
                        : 'Ödeme tutarı yeterli'
                      : `Eksik ödeme: ${(totalAmount - selectedAmount).toFixed(2)} TL`}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Numpad */}
            <div className="grid grid-cols-3 gap-2">
              {[7, 8, 9, 4, 5, 6, 1, 2, 3].map(num => (
                <button
                  key={num}
                  onClick={() => handleNumberClick(num)}
                  className="aspect-square bg-gradient-to-br from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500
                    text-white text-2xl font-semibold rounded-xl transition-all duration-200 transform hover:scale-105
                    border border-gray-500/30 shadow-lg"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => handleNumberClick('clear')}
                className="aspect-square bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800
                  text-white text-xl font-medium rounded-xl transition-all duration-200 transform hover:scale-105
                  border border-red-500/30 shadow-lg"
              >
                C
              </button>
              <button
                onClick={() => handleNumberClick(0)}
                className="aspect-square bg-gradient-to-br from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500
                  text-white text-2xl font-semibold rounded-xl transition-all duration-200 transform hover:scale-105
                  border border-gray-500/30 shadow-lg"
              >
                0
              </button>
              <button
                onClick={() => handleNumberClick('backspace')}
                className="aspect-square bg-gradient-to-br from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800
                  text-white text-xl font-medium rounded-xl transition-all duration-200 transform hover:scale-105
                  border border-orange-500/30 shadow-lg"
              >
                ←
              </button>
            </div>

            {/* Quick Amounts */}
            <div className="space-y-2">
              {getQuickAmounts(totalAmount).map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleQuickAmountClick(amount)}
                  className={`w-full p-4 rounded-xl text-xl font-medium transition-all duration-200 transform hover:scale-105
                    border ${
                    selectedAmount === amount
                      ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white border-blue-500/30'
                      : 'bg-gradient-to-br from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-gray-200 border-gray-600/30'
                  }`}
                >
                  {amount.toFixed(2)} TL
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700 flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors"
          >
            İptal
          </button>
          
          {selectedAmount && selectedAmount > 0 && (
            <button
              onClick={() => handlePaymentSuccess(selectedAmount)}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors"
            >
              Tamam
            </button>
          )}
        </div>
      </div>

      {/* Change Display Overlay */}
      <ChangeDisplayOverlay
        isVisible={showChange}
        paidAmount={selectedAmount || 0}
        totalAmount={totalAmount}
        onComplete={handleChangeDisplayComplete}
      />
    </div>
  );
};

export default PaymentModal;