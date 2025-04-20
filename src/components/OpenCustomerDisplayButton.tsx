import React from 'react';
import { MonitorSmartphone } from 'lucide-react';

interface OpenCustomerDisplayButtonProps {
  isDisplayOpen: boolean;
  setIsDisplayOpen: (isOpen: boolean) => void;
}

const OpenCustomerDisplayButton: React.FC<OpenCustomerDisplayButtonProps> = ({
  isDisplayOpen,
  setIsDisplayOpen
}) => {
  const openCustomerDisplay = () => {
    if (!isDisplayOpen) {
      const displayWindow = window.open('/customer-display', 'customerDisplay', 'width=1024,height=768');
      if (displayWindow) {
        setIsDisplayOpen(true);
        
        // Pencere kapatıldığında durumu güncelle
        const checkIfClosed = setInterval(() => {
          if (displayWindow.closed) {
            setIsDisplayOpen(false);
            clearInterval(checkIfClosed);
          }
        }, 1000);
      }
    } else {
      // Zaten açıksa, odaklan
      window.open('/customer-display', 'customerDisplay');
    }
  };

  return (
    <button 
      onClick={openCustomerDisplay}
      className={`flex items-center gap-1.5 transition-all duration-150 ${
        isDisplayOpen 
          ? 'bg-green-600 hover:bg-green-700 active:bg-green-800' 
          : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
      } text-white py-2 px-3 rounded-lg text-sm font-medium shadow-sm`}
      title="Müşteri Ekranını Aç"
    >
      <MonitorSmartphone size={16} className="opacity-80" />
      <span className="truncate">
        {isDisplayOpen ? 'Müşteri Ekranı Açık' : 'Müşteri Ekranını Aç'}
      </span>
    </button>
  );
};

export default OpenCustomerDisplayButton;
