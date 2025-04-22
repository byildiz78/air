'use client';

import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface MobileHeaderProps {
  title: string;
  onBack: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ title, onBack }) => {
  return (
    <div className="flex items-center bg-white border-b border-gray-200 py-1.5 px-2">
      <button 
        onClick={onBack}
        className="p-1 rounded-full hover:bg-gray-100 mr-2"
      >
        <ChevronLeft size={20} />
      </button>
      <h1 className="text-lg font-semibold">{title}</h1>
    </div>
  );
};

export default MobileHeader;
