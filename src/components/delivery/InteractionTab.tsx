'use client';

import React from 'react';

interface InteractionTabProps {
  focusedInput: string | null;
  setFocusedInput: React.Dispatch<React.SetStateAction<string | null>>;
  showKeyboard: boolean;
  setShowKeyboard: React.Dispatch<React.SetStateAction<boolean>>;
}

const InteractionTab: React.FC<InteractionTabProps> = ({
  focusedInput,
  setFocusedInput,
  showKeyboard,
  setShowKeyboard
}) => {
  return (
    <div className="p-4">
      <div className="bg-gray-800/80 rounded-lg p-3 border-l-4 border-orange-500 shadow-md">
        <h2 className="text-white text-sm font-medium mb-3 border-b border-gray-700/50 pb-1 flex items-center">
          <span className="bg-orange-500 text-white px-2 py-0.5 rounded mr-2 text-xs">ETKİLEŞİM</span>
        </h2>
        
        <div className="text-gray-400 text-sm">
          Bu bölümde müşteri ile yapılan etkileşimler ve iletişim geçmişi yer alacaktır.
        </div>
      </div>
    </div>
  );
};

export default InteractionTab;
