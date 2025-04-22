import React, { useState, useEffect } from 'react';
import { X, Check, Utensils, Coffee, Info, AlertCircle, ChevronRight, Sandwich, Pizza } from 'lucide-react';
import { ComboOptions, ComboItem, Product } from '../types';

interface ComboSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  comboOptions: ComboOptions;
  onComplete: (selections: { 
    mainItem: ComboItem | null; 
    side: ComboItem | null; 
    drink: ComboItem | null; 
    quantity: number 
  }) => void;
  selectedComboProduct: Product | null; 
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

  // Seçim yapılabilir mi kontrolü
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
        mainItem: finalMainItem || (comboOptions.mainItems && comboOptions.mainItems.length > 0 ? comboOptions.mainItems[0] : null),
        side: finalSideItem || (comboOptions.sides && comboOptions.sides.length > 0 ? comboOptions.sides[0] : null),
        drink: finalDrinkItem || (comboOptions.drinks && comboOptions.drinks.length > 0 ? comboOptions.drinks[0] : null),
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{selectedComboProduct?.name} - Seçimler</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          {/* Ana Ürün Seçimi */}
          {comboOptions.mainItems && comboOptions.mainItems.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  {getCategoryIcon('Ana Ürün')}
                  <h3 className="font-medium">Ana Ürün</h3>
                </div>
                <div className={`text-xs px-2 py-0.5 rounded-full border flex items-center gap-1 ${getSelectionTypeColor(mainItemsSelectionType)}`}>
                  {getSelectionTypeIcon(mainItemsSelectionType)}
                  <span>{getSelectionTypeText(mainItemsSelectionType)}</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 space-y-2">
                {comboOptions.mainItems.map((item) => (
                  <button
                    key={item.id}
                    className={`flex items-center justify-between w-full p-2 rounded-lg border ${
                      selectedMain?.id === item.id 
                        ? 'bg-blue-50 border-blue-300' 
                        : 'bg-white border-gray-200 hover:border-blue-200'
                    }`}
                    onClick={() => setSelectedMain(item)}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${
                        selectedMain?.id === item.id ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                      }`}>
                        {selectedMain?.id === item.id && <Check size={12} className="text-white" />}
                      </div>
                      <span>{item.name}</span>
                    </div>
                    {item.extraPrice && item.extraPrice > 0 && (
                      <span className="text-sm text-blue-600">+{item.extraPrice.toFixed(2)} ₺</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Yan Ürün Seçimi */}
          {comboOptions.sides && comboOptions.sides.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  {getCategoryIcon('Yan Ürün')}
                  <h3 className="font-medium">Yan Ürün</h3>
                </div>
                <div className={`text-xs px-2 py-0.5 rounded-full border flex items-center gap-1 ${getSelectionTypeColor(sidesSelectionType)}`}>
                  {getSelectionTypeIcon(sidesSelectionType)}
                  <span>{getSelectionTypeText(sidesSelectionType)}</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 space-y-2">
                {comboOptions.sides.map((item) => (
                  <button
                    key={item.id}
                    className={`flex items-center justify-between w-full p-2 rounded-lg border ${
                      selectedSide?.id === item.id 
                        ? 'bg-blue-50 border-blue-300' 
                        : 'bg-white border-gray-200 hover:border-blue-200'
                    }`}
                    onClick={() => setSelectedSide(item)}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${
                        selectedSide?.id === item.id ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                      }`}>
                        {selectedSide?.id === item.id && <Check size={12} className="text-white" />}
                      </div>
                      <span>{item.name}</span>
                    </div>
                    {item.extraPrice && item.extraPrice > 0 && (
                      <span className="text-sm text-blue-600">+{item.extraPrice.toFixed(2)} ₺</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* İçecek Seçimi */}
          {comboOptions.drinks && comboOptions.drinks.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  {getCategoryIcon('İçecek')}
                  <h3 className="font-medium">İçecek</h3>
                </div>
                <div className={`text-xs px-2 py-0.5 rounded-full border flex items-center gap-1 ${getSelectionTypeColor(drinksSelectionType)}`}>
                  {getSelectionTypeIcon(drinksSelectionType)}
                  <span>{getSelectionTypeText(drinksSelectionType)}</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 space-y-2">
                {comboOptions.drinks.map((item) => (
                  <button
                    key={item.id}
                    className={`flex items-center justify-between w-full p-2 rounded-lg border ${
                      selectedDrink?.id === item.id 
                        ? 'bg-blue-50 border-blue-300' 
                        : 'bg-white border-gray-200 hover:border-blue-200'
                    }`}
                    onClick={() => setSelectedDrink(item)}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${
                        selectedDrink?.id === item.id ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                      }`}>
                        {selectedDrink?.id === item.id && <Check size={12} className="text-white" />}
                      </div>
                      <span>{item.name}</span>
                    </div>
                    {item.extraPrice && item.extraPrice > 0 && (
                      <span className="text-sm text-blue-600">+{item.extraPrice.toFixed(2)} ₺</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Miktar Seçimi */}
          <div className="mb-4">
            <h3 className="font-medium mb-2">Miktar</h3>
            <div className="flex items-center">
              <button 
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-gray-100"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="mx-4 font-medium">{quantity}</span>
              <button 
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-gray-100"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="border-t p-4">
          <button
            className={`w-full py-2 rounded-lg font-medium ${
              canComplete()
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            onClick={handleComplete}
            disabled={!canComplete()}
          >
            Tamamla
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComboSelectionModal;
