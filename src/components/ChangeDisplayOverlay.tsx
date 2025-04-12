import React, { useEffect, useState } from 'react';
import { DollarSign, ArrowRight, Check } from 'lucide-react';

interface ChangeDisplayOverlayProps {
  isVisible: boolean;
  paidAmount: number;
  totalAmount: number;
  onComplete: () => void;
}

const ChangeDisplayOverlay: React.FC<ChangeDisplayOverlayProps> = ({
  isVisible,
  paidAmount,
  totalAmount,
  onComplete,
}) => {
  const [showAmounts, setShowAmounts] = useState(false);
  const [showChange, setShowChange] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Reset states
      setShowAmounts(false);
      setShowChange(false);
      setShowCheck(false);

      // Start animation sequence
      setTimeout(() => setShowAmounts(true), 100);
      setTimeout(() => setShowChange(true), 800);
      setTimeout(() => setShowCheck(true), 1500);
      setTimeout(() => onComplete(), 3000);
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  const change = paidAmount - totalAmount;

  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    const [whole, decimal] = amount.toFixed(2).split('.');
    return (
      <span className="font-mono">
        <span className="text-3xl">{whole}</span>
        <span className="text-xl">.{decimal}</span>
        <span className="ml-2 text-2xl">TL</span>
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50">
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl w-[700px] p-10 border border-gray-700 shadow-2xl overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-repeat" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l7.9-7.9h-.828zm5.656 0L19.515 8.485 17.343 10.657l7.9-7.9h2.757zm5.656 0l-6.485 6.485L25.515 8.14l7.9-7.9h-.714zm5.657 0l-4.243 4.242L33.414 5.656 41.314 0h-2.313zM45.97 0l-2 2-1.414-1.414L44.9 0h1.07zM40.313 0L42.556 2.243 41.14 3.657 39.9 0h.414zM32.9 0l3.9 3.9-1.414 1.415L31.5 0h1.4zm-3.656 0l8.485 8.485-1.414 1.414L25.172 0h4.07z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")` 
          }} />
        </div>

        <div className="relative flex flex-col items-center">
          {/* Title */}
          <div className="mb-8 text-center">
            <div className="inline-block bg-green-500/20 p-4 rounded-full mb-4 animate-bounce">
              <DollarSign size={36} className="text-green-400" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Para Üstü
            </h2>
          </div>

          {/* Amounts Display */}
          <div className="w-full space-y-6 mb-10">
            <div 
              className={`transform transition-all duration-500 ${
                showAmounts ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
              }`}
            >
              <div className="flex items-center justify-between bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-6 rounded-2xl border border-gray-700/50">
                <span className="text-lg text-gray-400">Ödenen</span>
                <span className="text-2xl font-bold text-white">{formatCurrency(paidAmount)}</span>
              </div>
            </div>

            <div 
              className={`transform transition-all duration-500 delay-200 ${
                showAmounts ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
              }`}
            >
              <div className="flex items-center justify-between bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-6 rounded-2xl border border-gray-700/50">
                <span className="text-lg text-gray-400">Tutar</span>
                <span className="text-2xl font-bold text-white">-{formatCurrency(totalAmount)}</span>
              </div>
            </div>

            {/* Separator */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center">
                <div className="bg-gray-900 px-4">
                  <ArrowRight size={24} className="text-gray-600" />
                </div>
              </div>
            </div>

            {/* Change Amount */}
            <div 
              className={`transform transition-all duration-700 ${
                showChange ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="flex items-center justify-between bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-8 rounded-2xl border border-green-500/30">
                <span className="text-xl font-medium text-green-400">Para Üstü</span>
                <span className="text-4xl font-bold text-green-400">{formatCurrency(change)}</span>
              </div>
            </div>
          </div>

          {/* Success Check */}
          <div 
            className={`absolute bottom-0 right-0 transform transition-all duration-500 ${
              showCheck ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="bg-green-500 rounded-full p-2">
              <Check size={24} className="text-white" />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="w-full bg-gray-800/50 h-1">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-3000 ease-linear"
                style={{ width: '100%', animation: 'progress 3s linear' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeDisplayOverlay;