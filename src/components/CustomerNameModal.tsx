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

  const handleClear = () => {
    setName('');
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-hidden">
      <div className="bg-white w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-2 border-b border-gray-200 bg-blue-50">
          <div className="flex items-center">
            <User size={20} className="text-blue-600 mr-2" />
            <h2 className="text-lg font-bold text-gray-800">Müşteri Adı</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-2 bg-gray-50 flex-1 overflow-auto">
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="customerName" className="text-sm font-medium text-gray-700">
                Müşteri Adı
              </label>
              {name && (
                <button 
                  onClick={handleClear}
                  className="text-xs text-gray-500 hover:text-red-500 px-1.5 py-0.5 rounded border border-gray-300 hover:border-red-300"
                >
                  Temizle
                </button>
              )}
            </div>
            <div className="relative">
              <input
                id="customerName"
                type="text"
                value={name}
                readOnly
                className="w-full bg-white text-gray-800 text-base border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Müşteri adını giriniz"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <User size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Keyboard */}
        <div className="p-2 border-t border-gray-200 bg-gray-100">
          <div className="flex justify-between items-center mb-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200 font-medium text-sm"
            >
              İptal
            </button>
            <button
              onClick={handleSubmit}
              disabled={!name.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Kaydet
            </button>
          </div>
          <TouchKeyboard onInput={handleKeyboardInput} />
        </div>
      </div>
    </div>
  );
};

export default CustomerNameModal;
