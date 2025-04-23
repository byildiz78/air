import React from 'react';
import { Clock } from 'lucide-react';
import BarcodeInput from './BarcodeInput';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  tableId?: string;
  title?: string;
  onBarcodeSubmit?: (barcode: string) => void;
}

const Header: React.FC<HeaderProps> = ({ tableId, title = 'RobotPOS', onBarcodeSubmit }) => {
  const pathname = usePathname();
  
  // Check if we're in kitchen display based on the URL path
  const isKitchenDisplay = pathname?.startsWith('/kitchen-display');
  const isDeliveryStatus = pathname?.startsWith('/delivery-status');
  
  // Don't render the header in kitchen display
  if (isKitchenDisplay || isDeliveryStatus) {
    return null;
  }

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm p-4">
      <div className="container mx-auto flex justify-between items-center text-gray-800">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">{title}</h1>
          {tableId && <span className="text-lg">Masa {tableId}</span>}
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-blue-500" />
            <span>{new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div className="ml-4">
            <BarcodeInput onSubmit={onBarcodeSubmit ?? (() => {})} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
