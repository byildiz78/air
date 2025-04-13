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
        isSelected ? 'scale-102' : 'hover:scale-101'
      }`}
    >
      <div className={`
        relative p-2 rounded-lg border transition-all duration-300
        ${isSelected 
          ? 'bg-gradient-to-br from-blue-600/90 to-blue-700/90 border-blue-400'
          : 'bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700 group-hover:border-gray-500'}
      `}>
        <div className="absolute top-2 right-2">
          <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-300 ${
            isSelected ? 'border-blue-300 bg-blue-500' : 'border-gray-500'
          }`}>
            {isSelected && <Check size={10} className="text-white" />}
          </div>
        </div>

        <div className="mb-1.5">
          <Utensils size={16} className={`${isSelected ? 'text-blue-300' : 'text-gray-400'}`} />
        </div>

        <h3 className={`text-sm font-bold mb-1 ${isSelected ? 'text-white' : 'text-gray-200'}`}>
          {item.name}
        </h3>

        {item.extraPrice && (
          <div className={`inline-block px-1.5 py-0.5 rounded-full text-xs font-medium ${
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
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl w-[900px] max-h-[700px] shadow-xl border border-gray-700">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-gradient-to-r from-gray-900 to-gray-800">
          <h2 className="text-xl font-bold text-white">Menü Seçimi</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[580px]">
          <div className="grid grid-cols-3 gap-4">
            {/* Main Items */}
            <div className="space-y-3">
              <div className="text-center mb-3">
                <h3 className="text-base font-bold text-white mb-1">Ana Ürün</h3>
                <p className="text-gray-400 text-xs">Menünüz için ana ürünü seçin</p>
              </div>
              <div className="space-y-2">
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
            <div className="space-y-3">
              <div className="text-center mb-3">
                <h3 className="text-base font-bold text-white mb-1">Yan Ürün</h3>
                <p className="text-gray-400 text-xs">Menünüz için yan ürün seçin</p>
              </div>
              <div className="space-y-2">
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
            <div className="space-y-3">
              <div className="text-center mb-3">
                <h3 className="text-base font-bold text-white mb-1">İçecek</h3>
                <p className="text-gray-400 text-xs">Menünüz için içecek seçin</p>
              </div>
              <div className="space-y-2">
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
        <div className="p-4 border-t border-gray-700 bg-gradient-to-r from-gray-900 to-gray-800">
          <div className="flex justify-between items-center">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              İptal
            </button>
            <button
              onClick={handleComplete}
              disabled={!canComplete}
              className={`
                px-4 py-2 rounded-lg font-medium text-sm transition-colors
                ${canComplete
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }
              `}
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
