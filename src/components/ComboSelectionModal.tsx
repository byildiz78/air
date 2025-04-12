import React, { useState } from 'react';
import { X, Check, Utensils, Coffee } from 'lucide-react';
import { ComboOptions, ComboItem } from '../types';

interface ComboSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  comboOptions: ComboOptions;
  onComplete: (selections: { mainItem: ComboItem; side: ComboItem; drink: ComboItem }) => void;
}

const ComboSelectionModal: React.FC<ComboSelectionModalProps> = ({
  isOpen,
  onClose,
  comboOptions,
  onComplete,
}) => {
  const [selectedMain, setSelectedMain] = useState<ComboItem | null>(null);
  const [selectedSide, setSelectedSide] = useState<ComboItem | null>(null);
  const [selectedDrink, setSelectedDrink] = useState<ComboItem | null>(null);

  if (!isOpen) return null;

  const handleComplete = () => {
    if (selectedMain && selectedSide && selectedDrink) {
      onComplete({
        mainItem: selectedMain,
        side: selectedSide,
        drink: selectedDrink,
      });
      onClose();
    }
  };

  const renderOptionCard = (item: ComboItem, isSelected: boolean, onSelect: () => void) => (
    <button
      key={item.id}
      onClick={onSelect}
      className={`relative group w-full transition-all duration-300 transform ${
        isSelected ? 'scale-105' : 'hover:scale-102'
      }`}
    >
      <div className={`
        relative p-4 rounded-xl border-2 transition-all duration-300
        ${isSelected 
          ? 'bg-gradient-to-br from-blue-600/90 to-blue-700/90 border-blue-400'
          : 'bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700 group-hover:border-gray-500'}
      `}>
        <div className="absolute top-3 right-3">
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            isSelected ? 'border-blue-300 bg-blue-500' : 'border-gray-500'
          }`}>
            {isSelected && <Check size={12} className="text-white" />}
          </div>
        </div>

        <div className="mb-2">
          <Utensils size={24} className={`${isSelected ? 'text-blue-300' : 'text-gray-400'}`} />
        </div>

        <h3 className={`text-lg font-bold mb-1 ${isSelected ? 'text-white' : 'text-gray-200'}`}>
          {item.name}
        </h3>

        {item.extraPrice && (
          <div className={`inline-block px-2 py-0.5 rounded-full text-sm font-medium ${
            isSelected ? 'bg-blue-500/30 text-blue-200' : 'bg-gray-700 text-gray-300'
          }`}>
            +{item.extraPrice} TL
          </div>
        )}
      </div>
    </button>
  );

  const canComplete = selectedMain && selectedSide && selectedDrink;

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl w-[1200px] max-h-[90vh] shadow-2xl border border-gray-700">
        {/* Header */}
        <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-gradient-to-r from-gray-900 to-gray-800">
          <h2 className="text-3xl font-bold text-white">Menü Seçimi</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-8 overflow-y-auto">
          <div className="grid grid-cols-3 gap-8">
            {/* Main Items */}
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Ana Ürün</h3>
                <p className="text-gray-400 text-sm">Menünüz için ana ürünü seçin</p>
              </div>
              <div className="space-y-3">
                {comboOptions.mainItems.map((item) => (
                  renderOptionCard(
                    item,
                    selectedMain?.id === item.id,
                    () => setSelectedMain(item)
                  )
                ))}
              </div>
            </div>

            {/* Sides */}
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Yan Ürün</h3>
                <p className="text-gray-400 text-sm">Menünüz için yan ürün seçin</p>
              </div>
              <div className="space-y-3">
                {comboOptions.sides.map((item) => (
                  renderOptionCard(
                    item,
                    selectedSide?.id === item.id,
                    () => setSelectedSide(item)
                  )
                ))}
              </div>
            </div>

            {/* Drinks */}
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">İçecek</h3>
                <p className="text-gray-400 text-sm">Menünüz için içecek seçin</p>
              </div>
              <div className="space-y-3">
                {comboOptions.drinks.map((item) => (
                  renderOptionCard(
                    item,
                    selectedDrink?.id === item.id,
                    () => setSelectedDrink(item)
                  )
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700 bg-gradient-to-r from-gray-900 to-gray-800">
          <div className="flex justify-between items-center">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl text-white font-medium
                hover:bg-gray-800 transition-colors"
            >
              İptal
            </button>

            <button
              onClick={handleComplete}
              disabled={!canComplete}
              className="px-8 py-3 rounded-xl bg-blue-600 text-white font-medium
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:bg-blue-700 transition-colors"
            >
              Menüyü Tamamla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComboSelectionModal;
