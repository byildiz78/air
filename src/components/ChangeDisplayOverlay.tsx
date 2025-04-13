import React, { useEffect, useState } from 'react';
import { DollarSign, ArrowRight, Check } from 'lucide-react';

interface ChangeDisplayOverlayProps {
  amount: number;
  onComplete: () => void;
}

const ChangeDisplayOverlay: React.FC<ChangeDisplayOverlayProps> = ({
  amount,
  onComplete,
}) => {
  const [showAmounts, setShowAmounts] = useState(false);
  const [showChange, setShowChange] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

  useEffect(() => {
    // Reset states
    setShowAmounts(false);
    setShowChange(false);
    setShowCheck(false);

    // Start animation sequence
    setTimeout(() => setShowAmounts(true), 100);
    setTimeout(() => setShowChange(true), 800);
    setTimeout(() => setShowCheck(true), 1500);
    setTimeout(() => onComplete(), 3000);
  }, [onComplete]);

  // Helper function to format currency
  const formatCurrency = (value: number) => {
    const [whole, decimal] = value.toFixed(2).split('.');
    return (
      <span className="font-mono">
        <span className="text-xl">{whole}</span>
        <span className="text-base">.{decimal}</span>
        <span className="ml-1 text-lg">TL</span>
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50">
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl w-[400px] p-6 text-center">
        <div className="space-y-4">
          {/* Change Amount */}
          <div className={`transition-all duration-500 ${showAmounts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="text-base text-gray-400 mb-2">Para Üstü</div>
            <div className="text-white">{formatCurrency(amount)}</div>
          </div>

          {/* Arrow */}
          <div className={`transition-all duration-500 ${showChange ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="flex justify-center">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <ArrowRight size={20} className="text-green-400" />
              </div>
            </div>
          </div>

          {/* Success Check */}
          <div className={`transition-all duration-500 ${showCheck ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="flex justify-center">
              <div className="p-2 bg-green-500/20 rounded-full">
                <Check size={20} className="text-green-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeDisplayOverlay;