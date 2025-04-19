import React from 'react';
import { Clock } from 'lucide-react';
import BarcodeInput from './BarcodeInput';

interface HeaderProps {
  tableId?: string;
  title?: string;
  onBarcodeSubmit?: (barcode: string) => void;
}

const Header: React.FC<HeaderProps> = ({ tableId, title = 'RobotPOS', onBarcodeSubmit }) => {
  return (
    <div className="bg-gray-900/90 border-b border-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center text-white">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">{title}</h1>
          {tableId && <span className="text-lg">Masa {tableId}</span>}
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-2">
            <Clock size={18} />
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
