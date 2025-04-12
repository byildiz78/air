import React, { useState } from 'react';
import { X, User } from 'lucide-react';
import TouchKeyboard from './TouchKeyboard';

interface CustomerNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

const CustomerNameModal: React.FC<CustomerNameModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleKeyboardInput = (value: string) => {
    if (value === 'backspace') {
      setName(prev => prev.slice(0, -1));
    } else if (value === 'clear') {
      setName('');
    } else if (value === 'space') {
      setName(prev => prev + ' ');
    } else {
      setName(prev => prev + value);
    }
  };

  const handleSubmit = () => {
    if (name.trim()) {
      onSave(name.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl w-[800px] shadow-2xl">
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Müşteri Adı</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-2">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={name}
                readOnly
                className="w-full bg-gray-800 text-white text-2xl border border-gray-700 rounded-lg p-4 pl-12"
                placeholder="Müşteri adını giriniz"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <User size={24} />
              </div>
            </div>
          </div>

          <TouchKeyboard onInput={handleKeyboardInput} />
          
          <div className="flex gap-4 mt-6">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-700 text-white p-4 rounded-lg text-lg hover:bg-gray-600 transition-colors"
            >
              İptal
            </button>
            <button
              onClick={handleSubmit}
              disabled={!name.trim()}
              className="flex-1 bg-blue-600 text-white p-4 rounded-lg text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Kaydet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerNameModal;
