import React, { useState, useEffect } from 'react';
import { X, Check, Utensils, Coffee, Info, AlertCircle, ChevronRight, Sandwich, Pizza } from 'lucide-react';
import { ComboOptions, ComboItem, Product } from '../types';

interface ComboSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  comboOptions: ComboOptions;
  onComplete: (selections: { mainItem: ComboItem; side: ComboItem; drink: ComboItem; quantity: number }) => void;
  selectedComboProduct: Product; 
}

const ComboSelectionModal: React.FC<ComboSelectionModalProps> = ({
  isOpen,
  onClose,
  comboOptions,
  onComplete,
  selectedComboProduct,
}) => {
  const [selectedMain, setSelectedMain] = useState<ComboItem | null>(null);
  const [selectedSide, setSelectedSide] = useState<ComboItem | null>(null);
  const [selectedDrink, setSelectedDrink] = useState<ComboItem | null>(null);
  const [quantity, setQuantity] = useState(1);

  const mainItemsSelectionType = comboOptions.mainItemsSelectionType || 'required';
  const sidesSelectionType = comboOptions.sidesSelectionType || 'required';
  const drinksSelectionType = comboOptions.drinksSelectionType || 'required';

  const getSelectionTypeText = (type: string) => {
    switch(type) {
      case 'required': return 'Zorunlu Seçim';
      case 'optional': return 'Opsiyonel Seçim';
      case 'multiple': return 'Serbest Seçim';
      default: return '';
    }
  };

  const getSelectionTypeColor = (type: string) => {
    switch(type) {
      case 'required': return 'bg-red-100 text-red-600 border-red-200';
      case 'optional': return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      case 'multiple': return 'bg-green-100 text-green-600 border-green-200';
      default: return '';
    }
  };

  const getSelectionTypeIcon = (type: string) => {
    switch(type) {
      case 'required': return <AlertCircle size={14} className="text-red-500" />;
      case 'optional': return <Info size={14} className="text-yellow-500" />;
      case 'multiple': return <Check size={14} className="text-green-500" />;
      default: return null;
    }
  };

  if (!isOpen) return null;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const getSelectedComboName = () => {
    if (!selectedMain || !selectedSide || !selectedDrink) return null;
    return `${selectedMain.name} + ${selectedSide.name} + ${selectedDrink.name}`;
  };
  const getSelectedComboPrice = () => {
    if (!selectedMain || !selectedSide || !selectedDrink || !selectedComboProduct) return null;
    const basePrice = selectedComboProduct.price;
    const extra = (selectedMain.extraPrice || 0) + (selectedSide.extraPrice || 0) + (selectedDrink.extraPrice || 0);
    return (basePrice + extra) * quantity;
  };
  const getUnitPrice = () => {
    if (!selectedMain || !selectedSide || !selectedDrink || !selectedComboProduct) return null;
    const basePrice = selectedComboProduct.price;
    const extra = (selectedMain.extraPrice || 0) + (selectedSide.extraPrice || 0) + (selectedDrink.extraPrice || 0);
    return basePrice + extra;
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(q => Math.max(1, q + delta));
  };

  const canComplete = () => {
    const mainItemValid = mainItemsSelectionType === 'optional' ? true : !!selectedMain;
    const sideItemValid = sidesSelectionType === 'optional' ? true : !!selectedSide;
    const drinkItemValid = drinksSelectionType === 'optional' ? true : !!selectedDrink;
    return mainItemValid && sideItemValid && drinkItemValid;
  };

  const handleComplete = () => {
    // Opsiyonel seçimler için null değer kullan
    const finalMainItem = mainItemsSelectionType === 'optional' && !selectedMain ? null : selectedMain;
    const finalSideItem = sidesSelectionType === 'optional' && !selectedSide ? null : selectedSide;
    const finalDrinkItem = drinksSelectionType === 'optional' && !selectedDrink ? null : selectedDrink;
    
    // Eğer tüm zorunlu seçimler tamamlanmışsa
    if (canComplete()) {
      onComplete({
        mainItem: finalMainItem || comboOptions.mainItems[0], // Zorunlu ama seçilmemişse ilk öğeyi kullan
        side: finalSideItem || comboOptions.sides[0], // Zorunlu ama seçilmemişse ilk öğeyi kullan
        drink: finalDrinkItem || comboOptions.drinks[0], // Zorunlu ama seçilmemişse ilk öğeyi kullan
        quantity,
      });
      onClose();
    }
  };

  // Kategoriler için ikon seçimi
  const getCategoryIcon = (category: string) => {
    switch(category.toLowerCase()) {
      case 'ana ürün': return <Sandwich size={20} className="mr-2" />;
      case 'yan ürün': return <Pizza size={20} className="mr-2" />;
      case 'içecek': return <Coffee size={20} className="mr-2" />;
      default: return <Utensils size={20} className="mr-2" />;
    }
  };

  const renderOptionCard = (item: ComboItem, isSelected: boolean, onSelect: () => void) => (
    <button
      key={item.id}
      onClick={onSelect}
      className={`relative group w-full transition-all duration-300 transform ${
        isSelected ? 'scale-103 shadow-xl ring-2 ring-blue-400' : 'hover:scale-101 hover:shadow'
      }`}
      style={{ minHeight: 72 }}
    >
      <div className={`
        relative p-2 rounded-xl border transition-all duration-300 flex flex-col items-center shadow
        ${isSelected 
          ? 'bg-gradient-to-br from-blue-500 to-blue-600 border-blue-300'
          : 'bg-white border-gray-300 group-hover:border-blue-300'}
      `}>
        <div className="absolute top-2 right-2">
          <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-300 ${
            isSelected ? 'border-blue-300 bg-blue-500' : 'border-gray-400 bg-gray-100'
          }`}>
            {isSelected && <Check size={10} className="text-white" />}
          </div>
        </div>

        {item.isRequired && (
          <div className="absolute top-2 left-2">
            <div className="w-4 h-4 rounded-full bg-red-100 border border-red-300 flex items-center justify-center">
              <span className="text-red-500 text-[8px] font-bold">!</span>
            </div>
          </div>
        )}

        {item.isOptional && (
          <div className="absolute top-2 left-2">
            <div className="w-4 h-4 rounded-full bg-yellow-100 border border-yellow-300 flex items-center justify-center">
              <span className="text-yellow-500 text-[8px] font-bold">?</span>
            </div>
          </div>
        )}

        <div className="mb-1">
          <Utensils size={16} className={`${isSelected ? 'text-white drop-shadow' : 'text-gray-500'}`} />
        </div>

        <h3 className={`text-sm font-bold mb-1 text-center ${isSelected ? 'text-white' : 'text-gray-700'}`}>
          {item.name}
        </h3>

        {item.extraPrice && (
          <div className={`inline-block px-1.5 py-0.5 rounded-full text-xs font-semibold mt-1 ${
            isSelected ? 'bg-blue-400 text-white border border-blue-300' : 'bg-gray-100 text-gray-700 border border-gray-300'
          }`}>
            +{item.extraPrice} TL
          </div>
        )}
      </div>
    </button>
  );

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50 w-screen h-screen" style={{ minHeight: '100vh', minWidth: '100vw' }}>
      <div className="w-full h-full flex flex-col rounded-none shadow-none border-none bg-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-3 border-b border-gray-300 bg-white shadow-sm" style={{minHeight:56}}>
          <div>
            <div className="flex items-center">
              <Sandwich size={24} className="text-blue-500 mr-2" />
              <h2 className="text-xl font-extrabold text-gray-800 tracking-tight">{selectedComboProduct?.name || 'Menü Seçimi'}</h2>
            </div>
            {getSelectedComboName() && (
              <div className="mt-1 flex items-center gap-2">
                <div className="flex items-center">
                  <ChevronRight size={14} className="text-blue-500 mr-1" />
                  <span className="text-base font-bold text-blue-600">{getSelectedComboName()}</span>
                </div>
                <div className="flex gap-2">
                  <span className="inline-block px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-bold text-sm">Birim: {getUnitPrice()} TL</span>
                  <span className="inline-block px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-bold text-sm">Toplam: {getSelectedComboPrice()} TL</span>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => handleQuantityChange(-1)} className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 text-lg font-bold flex items-center justify-center">-</button>
            <span className="text-lg font-bold text-gray-800 w-7 text-center">{quantity}</span>
            <button onClick={() => handleQuantityChange(1)} className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold flex items-center justify-center">+</button>
            <button
              onClick={onClose}
              className="ml-4 text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-200 transition-colors text-lg"
            >
              <X size={22} />
            </button>
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 flex flex-row gap-4 px-6 py-4 overflow-y-auto bg-gray-100" style={{ minHeight: 0 }}>
          {/* Main Items */}
          <div className="flex-1 flex flex-col items-center">
            <div className="mb-2 w-full">
              <div className="flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200 rounded-t-lg px-3 py-2 border-b border-blue-300">
                <Sandwich size={18} className="text-blue-600 mr-2" />
                <h3 className="text-base font-bold text-blue-700 text-center">Ana Ürün</h3>
              </div>
              <div className={`text-xs text-center px-2 py-1 rounded-b-md mb-2 flex items-center justify-center gap-1 ${getSelectionTypeColor(mainItemsSelectionType)}`}>
                {getSelectionTypeIcon(mainItemsSelectionType)}
                <span>{getSelectionTypeText(mainItemsSelectionType)}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full max-w-[180px]">
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
          <div className="flex-1 flex flex-col items-center">
            <div className="mb-2 w-full">
              <div className="flex items-center justify-center bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-t-lg px-3 py-2 border-b border-yellow-300">
                <Pizza size={18} className="text-yellow-600 mr-2" />
                <h3 className="text-base font-bold text-yellow-700 text-center">Yan Ürün</h3>
              </div>
              <div className={`text-xs text-center px-2 py-1 rounded-b-md mb-2 flex items-center justify-center gap-1 ${getSelectionTypeColor(sidesSelectionType)}`}>
                {getSelectionTypeIcon(sidesSelectionType)}
                <span>{getSelectionTypeText(sidesSelectionType)}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full max-w-[180px]">
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
          <div className="flex-1 flex flex-col items-center">
            <div className="mb-2 w-full">
              <div className="flex items-center justify-center bg-gradient-to-r from-green-100 to-green-200 rounded-t-lg px-3 py-2 border-b border-green-300">
                <Coffee size={18} className="text-green-600 mr-2" />
                <h3 className="text-base font-bold text-green-700 text-center">İçecek</h3>
              </div>
              <div className={`text-xs text-center px-2 py-1 rounded-b-md mb-2 flex items-center justify-center gap-1 ${getSelectionTypeColor(drinksSelectionType)}`}>
                {getSelectionTypeIcon(drinksSelectionType)}
                <span>{getSelectionTypeText(drinksSelectionType)}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full max-w-[180px]">
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
        {/* Footer */}
        <div className="flex justify-between items-center px-6 py-3 border-t border-gray-300 bg-white shadow-sm" style={{minHeight:48}}>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-gray-800 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
          >
            İptal
          </button>
          <div className="flex items-center">
            {!canComplete() && (
              <div className="mr-3 text-yellow-600 text-xs flex items-center">
                <AlertCircle size={14} className="mr-1" />
                <span>Lütfen zorunlu seçimleri tamamlayın</span>
              </div>
            )}
            <button
              onClick={handleComplete}
              disabled={!canComplete()}
              className={`px-6 py-2 rounded-lg font-bold text-sm transition-colors shadow ${canComplete() ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              {mainItemsSelectionType === 'optional' && !selectedMain || 
               sidesSelectionType === 'optional' && !selectedSide || 
               drinksSelectionType === 'optional' && !selectedDrink ? 
                'Seçimsiz Tamamla' : 'Tamamla'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComboSelectionModal;
