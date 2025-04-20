import React, { useState } from 'react';
import { X, MessageSquare, Clock, AlertTriangle, Coffee, Check } from 'lucide-react';
import TouchKeyboard from '../TouchKeyboard';

interface OrderNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialNote: string;
  onSave: (note: string) => void;
}

const OrderNoteModal: React.FC<OrderNoteModalProps> = ({
  isOpen,
  onClose,
  initialNote,
  onSave,
}) => {
  const [note, setNote] = useState(initialNote);
  
  // Hızlı notlar ve ikonları
  const quickNotes = [
    { text: 'Misafirin acelesi var', icon: <Clock size={16} className="text-red-500" /> },
    { text: 'Ayrı servis isteniyor', icon: <MessageSquare size={16} className="text-blue-500" /> },
    { text: 'İçecekler önce gelsin', icon: <Coffee size={16} className="text-amber-500" /> },
    { text: 'Özel gün kutlaması', icon: <Check size={16} className="text-green-500" /> },
  ];

  const handleSave = () => {
    onSave(note);
    onClose();
  };

  const handleQuickNoteClick = (quickNote: string) => {
    setNote(prevNote => {
      // Eğer mevcut not boşsa, direkt hızlı notu ekle
      if (!prevNote.trim()) return quickNote;
      // Değilse, mevcut notun sonuna ekle
      return `${prevNote}, ${quickNote}`;
    });
  };

  const handleClearNote = () => {
    setNote('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-hidden">
      <div className="bg-white w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-2 border-b border-gray-200 bg-blue-50">
          <div className="flex items-center">
            <MessageSquare size={20} className="text-blue-600 mr-2" />
            <h2 className="text-lg font-bold text-gray-800">Sipariş Notu</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content - Tek bir kart içinde birleştirilmiş içerik */}
        <div className="p-2 bg-gray-50 flex-1 overflow-auto">
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
            {/* Not Alanı */}
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="orderNote" className="text-sm font-medium text-gray-700">
                Sipariş Notu
              </label>
              {note && (
                <button 
                  onClick={handleClearNote}
                  className="text-xs text-gray-500 hover:text-red-500 px-1.5 py-0.5 rounded border border-gray-300 hover:border-red-300"
                >
                  Temizle
                </button>
              )}
            </div>
            <textarea
              id="orderNote"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full h-20 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 text-sm"
              placeholder="Sipariş ile ilgili notunuzu buraya yazın..."
            />

            {/* Hızlı Notlar */}
            <div className="mt-3">
              <h3 className="text-sm font-medium text-gray-700 mb-1.5 flex items-center">
                <Clock size={16} className="mr-1.5 text-blue-500" />
                Hızlı Notlar
              </h3>
              <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                {quickNotes.map((quickNote, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickNoteClick(quickNote.text)}
                    className="flex items-center p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded text-xs transition-colors border border-blue-100 hover:border-blue-300"
                  >
                    <div className="mr-1">{quickNote.icon}</div>
                    <span className="truncate">{quickNote.text}</span>
                  </button>
                ))}
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
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm"
            >
              Kaydet
            </button>
          </div>
          <TouchKeyboard
            onInput={(value) => setNote(prev => prev + value)}
            onBackspace={() => setNote(prev => prev.slice(0, -1))}
          />
        </div>

      </div>
    </div>
  );
};

export default OrderNoteModal;
