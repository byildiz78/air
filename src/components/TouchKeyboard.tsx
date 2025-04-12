'use client';

import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

interface TouchKeyboardProps {
  onInput: (value: string) => void;
  onBackspace?: () => void;
}

const TouchKeyboard: React.FC<TouchKeyboardProps> = ({ onInput, onBackspace }) => {
  const keyboardLayout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Ğ', 'Ü'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ş', 'İ'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Ö', 'Ç'],
  ];

  const numericKeys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];

  // Klavye olaylarını dinle
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        onBackspace?.();
      } else if (e.key.length === 1) {
        onInput(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onInput, onBackspace]);

  return (
    <div className="bg-[#f0f8ff] p-2 select-none">
      <div className="flex gap-1">
        {/* Ana Klavye */}
        <div className="flex-1">
          {/* İlk 3 Sıra - Harfler */}
          {keyboardLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-1 mb-1">
              {rowIndex === 0 && <div className="w-2" />} {/* İlk sıra için boşluk */}
              {row.map((key) => (
                <button
                  key={key}
                  onClick={() => onInput(key)}
                  className="flex-1 h-14 bg-white rounded-lg text-gray-700 font-medium text-lg
                           hover:bg-gray-100 active:bg-gray-200 transition-colors
                           shadow-sm border border-gray-200"
                >
                  {key}
                </button>
              ))}
              {rowIndex === 0 && (
                <button
                  onClick={() => onBackspace?.()}
                  className="w-16 h-14 bg-orange-500 text-white rounded-lg
                           hover:bg-orange-600 active:bg-orange-700 transition-colors
                           shadow-sm flex items-center justify-center"
                >
                  <ArrowLeft size={24} />
                </button>
              )}
            </div>
          ))}

          {/* Son Sıra - Özel Tuşlar */}
          <div className="flex gap-1">
            <button
              onClick={() => onInput('capslock')}
              className="w-16 h-14 bg-green-500 text-white rounded-lg
                       hover:bg-green-600 active:bg-green-700 transition-colors shadow-sm"
            >
              Aa
            </button>
            <button
              onClick={() => onInput('↓')}
              className="w-12 h-14 bg-white rounded-lg text-gray-700
                       hover:bg-gray-100 active:bg-gray-200 transition-colors
                       shadow-sm border border-gray-200"
            >
              ↓
            </button>
            <button
              onClick={() => onInput(' ')}
              className="flex-1 h-14 bg-white rounded-lg text-gray-700
                       hover:bg-gray-100 active:bg-gray-200 transition-colors
                       shadow-sm border border-gray-200"
            >
              Space
            </button>
            <button
              onClick={() => onInput('-')}
              className="w-12 h-14 bg-white rounded-lg text-gray-700
                       hover:bg-gray-100 active:bg-gray-200 transition-colors
                       shadow-sm border border-gray-200"
            >
              -
            </button>
            <button
              onClick={() => onInput('@')}
              className="w-12 h-14 bg-blue-500 text-white rounded-lg
                       hover:bg-blue-600 active:bg-blue-700 transition-colors shadow-sm"
            >
              @
            </button>
          </div>
        </div>

        {/* Sayısal Tuş Takımı */}
        <div className="grid grid-cols-3 gap-1 w-48">
          {numericKeys.map((key) => (
            <button
              key={key}
              onClick={() => onInput(key)}
              className="h-14 bg-white rounded-lg text-gray-700 font-medium text-lg
                       hover:bg-gray-100 active:bg-gray-200 transition-colors
                       shadow-sm border border-gray-200"
            >
              {key}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TouchKeyboard;
