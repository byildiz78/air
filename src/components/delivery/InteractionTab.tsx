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
      <div className="bg-white rounded-md p-3 border-l-4 border-orange-500 shadow-sm">
        <h2 className="text-gray-800 text-sm font-medium mb-3 border-b border-gray-200 pb-1 flex items-center">
          <span className="bg-orange-500 text-white px-2 py-0.5 rounded-md mr-2 text-xs">Etkileşim</span>
        </h2>
        
        <div className="text-gray-600 text-sm">
          Bu bölümde müşteri ile yapılan etkileşimler ve iletişim geçmişi yer alacaktır.
        </div>
      </div>
    </div>
  );
};

export default InteractionTab;
