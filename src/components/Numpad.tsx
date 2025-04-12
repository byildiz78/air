import React from 'react';
import { Delete } from 'lucide-react';

interface NumpadProps {
  onInput: (value: string) => void;
}

const Numpad: React.FC<NumpadProps> = ({ onInput }) => {
  const buttons = [
    '7', '8', '9',
    '4', '5', '6',
    '1', '2', '3',
    '0', '.', 'backspace'
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {buttons.map((btn, index) => (
        <button
          key={btn}
          onClick={() => onInput(btn)}
          className={`
            p-6 rounded-lg text-2xl font-semibold transition-colors
            ${btn === 'backspace' 
              ? 'bg-red-600/80 hover:bg-red-700/80 text-white flex items-center justify-center' 
              : 'bg-gray-800 hover:bg-gray-700 text-white'
            }
          `}
        >
          {btn === 'backspace' ? <Delete size={24} /> : btn}
        </button>
      ))}
    </div>
  );
};

export default Numpad;
