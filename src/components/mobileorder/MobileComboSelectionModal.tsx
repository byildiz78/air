'use client';

import React, { useState, useEffect } from 'react';
import { X, Check, ChevronRight, Coffee, Pizza, Salad, Utensils, CupSoda, ShoppingBag } from 'lucide-react';
import { Product, ComboItem } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileComboSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onComplete: (selections: {
    mainItem: ComboItem | null;
    sides: ComboItem[];
    drinks: ComboItem[];
  }) => void;
}

const MobileComboSelectionModal: React.FC<MobileComboSelectionModalProps> = ({
  isOpen,
  onClose,
  product,
  onComplete,
}) => {
  const [selectedMainItem, setSelectedMainItem] = useState<ComboItem | null>(null);
  const [selectedSides, setSelectedSides] = useState<ComboItem[]>([]);
  const [selectedDrinks, setSelectedDrinks] = useState<ComboItem[]>([]);
  const [isValid, setIsValid] = useState(false);
  const [totalExtraPrice, setTotalExtraPrice] = useState(0);

  // Check if selections are valid
  useEffect(() => {
    const mainItemRequired = product.comboOptions?.mainItemsSelectionType === 'required';
    const sideRequired = product.comboOptions?.sidesSelectionType === 'required';
    const drinkRequired = product.comboOptions?.drinksSelectionType === 'required';
    
    const mainValid = !mainItemRequired || selectedMainItem !== null;
    const sidesValid = !sideRequired || selectedSides.length > 0;
    const drinksValid = !drinkRequired || selectedDrinks.length > 0;
    
    setIsValid(mainValid && sidesValid && drinksValid);

    // Calculate total extra price
    let extraPrice = 0;
    if (selectedMainItem?.extraPrice) extraPrice += selectedMainItem.extraPrice;
    selectedSides.forEach(side => {
      if (side.extraPrice) extraPrice += side.extraPrice;
    });
    selectedDrinks.forEach(drink => {
      if (drink.extraPrice) extraPrice += drink.extraPrice;
    });
    setTotalExtraPrice(extraPrice);
  }, [selectedMainItem, selectedSides, selectedDrinks, product.comboOptions]);

  if (!isOpen) return null;

  const handleMainItemSelect = (item: ComboItem) => {
    // Always select the new item, replacing any previous selection
    setSelectedMainItem(item);
  };

  const handleSideSelect = (item: ComboItem) => {
    const isSelected = selectedSides.some(side => side.id === item.id);
    
    if (isSelected) {
      setSelectedSides(selectedSides.filter(side => side.id !== item.id));
    } else {
      // Check if we've reached the maximum number of sides
      const maxSides = product.comboOptions?.maxSides || 1;
      
      // If maxSides is 1, replace the current selection instead of adding
      if (maxSides === 1) {
        setSelectedSides([item]);
      } else if (selectedSides.length < maxSides) {
        // Otherwise, add to the selection if under the maximum
        setSelectedSides([...selectedSides, item]);
      }
    }
  };

  const handleDrinkSelect = (item: ComboItem) => {
    const isSelected = selectedDrinks.some(drink => drink.id === item.id);
    
    if (isSelected) {
      setSelectedDrinks(selectedDrinks.filter(drink => drink.id !== item.id));
    } else {
      // Check if we've reached the maximum number of drinks
      const maxDrinks = product.comboOptions?.maxDrinks || 1;
      
      // If maxDrinks is 1, replace the current selection instead of adding
      if (maxDrinks === 1) {
        setSelectedDrinks([item]);
      } else if (selectedDrinks.length < maxDrinks) {
        // Otherwise, add to the selection if under the maximum
        setSelectedDrinks([...selectedDrinks, item]);
      }
    }
  };

  const handleComplete = () => {
    // Check if required selections are made
    const mainItemRequired = product.comboOptions?.mainItemsSelectionType === 'required';
    const sideRequired = product.comboOptions?.sidesSelectionType === 'required';
    const drinkRequired = product.comboOptions?.drinksSelectionType === 'required';
    
    const mainValid = !mainItemRequired || selectedMainItem !== null;
    const sidesValid = !sideRequired || selectedSides.length > 0;
    const drinksValid = !drinkRequired || selectedDrinks.length > 0;
    
    if (mainValid && sidesValid && drinksValid) {
      onComplete({
        mainItem: selectedMainItem,
        sides: selectedSides,
        drinks: selectedDrinks,
      });
    }
  };

  // Check if steps are required
  const mainItemRequired = product.comboOptions?.mainItemsSelectionType === 'required';
  const sideRequired = product.comboOptions?.sidesSelectionType === 'required';
  const drinkRequired = product.comboOptions?.drinksSelectionType === 'required';

  // Check if there are items to select
  const hasMainItems = product.comboOptions?.mainItems && product.comboOptions.mainItems.length > 0;
  const hasSides = product.comboOptions?.sides && product.comboOptions.sides.length > 0;
  const hasDrinks = product.comboOptions?.drinks && product.comboOptions.drinks.length > 0;

  // Get appropriate icon for category
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'main':
        return <Utensils className="text-blue-500" size={20} />;
      case 'side':
        return <Salad className="text-amber-500" size={20} />;
      case 'drink':
        return <CupSoda className="text-emerald-500" size={20} />;
      default:
        return <ShoppingBag className="text-gray-500" size={20} />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white flex flex-col h-full w-full"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-3 flex items-center justify-between sticky top-0 z-10 shadow-md">
              <button 
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-blue-700 transition-colors"
              >
                <X size={20} />
              </button>
              <h2 className="text-base font-bold flex-1 text-center flex items-center justify-center gap-2">
                <ShoppingBag size={18} />
                {product.name}
              </h2>
              <div className="w-8"></div> {/* Spacer for alignment */}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto bg-gray-50 p-3">
              {/* Main Items */}
              {hasMainItems && (
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    {getCategoryIcon('main')}
                    <h3 className="text-base font-semibold ml-2 flex items-center">
                      Ana Ürün {mainItemRequired && <span className="text-red-500 ml-1">*</span>}
                    </h3>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                    <div className="divide-y divide-gray-100">
                      {product.comboOptions?.mainItems?.map((item) => (
                        <motion.button
                          key={item.id}
                          className={`p-3 w-full ${
                            selectedMainItem?.id === item.id
                              ? 'bg-blue-50'
                              : 'bg-white hover:bg-gray-50'
                          } flex items-center justify-between transition-colors`}
                          onClick={() => handleMainItemSelect(item)}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3
                              ${selectedMainItem?.id === item.id 
                                ? 'border-blue-500 bg-blue-500' 
                                : 'border-gray-300'}`}
                            >
                              {selectedMainItem?.id === item.id && (
                                <Check className="text-white" size={12} />
                              )}
                            </div>
                            <div className="flex flex-col items-start">
                              <span className="font-medium text-sm">{item.name}</span>
                              {item.extraPrice ? (
                                <span className="text-xs text-blue-600 font-semibold">+{item.extraPrice.toFixed(2)} ₺</span>
                              ) : null}
                            </div>
                          </div>
                          <ChevronRight size={16} className="text-gray-400" />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Sides */}
              {hasSides && (
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    {getCategoryIcon('side')}
                    <h3 className="text-base font-semibold ml-2 flex items-center">
                      Yan Ürün {sideRequired && <span className="text-red-500 ml-1">*</span>}
                      {product.comboOptions?.maxSides && product.comboOptions.maxSides > 1 && (
                        <span className="text-xs text-gray-500 ml-2 bg-gray-100 px-2 py-0.5 rounded-full">
                          Maks: {product.comboOptions.maxSides}
                        </span>
                      )}
                    </h3>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                    <div className="divide-y divide-gray-100">
                      {product.comboOptions?.sides?.map((item) => (
                        <motion.button
                          key={item.id}
                          className={`p-3 w-full ${
                            selectedSides.some(side => side.id === item.id)
                              ? 'bg-amber-50'
                              : 'bg-white hover:bg-gray-50'
                          } flex items-center justify-between transition-colors`}
                          onClick={() => handleSideSelect(item)}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3
                              ${selectedSides.some(side => side.id === item.id)
                                ? 'border-amber-500 bg-amber-500' 
                                : 'border-gray-300'}`}
                            >
                              {selectedSides.some(side => side.id === item.id) && (
                                <Check className="text-white" size={12} />
                              )}
                            </div>
                            <div className="flex flex-col items-start">
                              <span className="font-medium text-sm">{item.name}</span>
                              {item.extraPrice ? (
                                <span className="text-xs text-amber-600 font-semibold">+{item.extraPrice.toFixed(2)} ₺</span>
                              ) : null}
                            </div>
                          </div>
                          <ChevronRight size={16} className="text-gray-400" />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Drinks */}
              {hasDrinks && (
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    {getCategoryIcon('drink')}
                    <h3 className="text-base font-semibold ml-2 flex items-center">
                      İçecek {drinkRequired && <span className="text-red-500 ml-1">*</span>}
                      {product.comboOptions?.maxDrinks && product.comboOptions.maxDrinks > 1 && (
                        <span className="text-xs text-gray-500 ml-2 bg-gray-100 px-2 py-0.5 rounded-full">
                          Maks: {product.comboOptions.maxDrinks}
                        </span>
                      )}
                    </h3>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                    <div className="divide-y divide-gray-100">
                      {product.comboOptions?.drinks?.map((item) => (
                        <motion.button
                          key={item.id}
                          className={`p-3 w-full ${
                            selectedDrinks.some(drink => drink.id === item.id)
                              ? 'bg-emerald-50'
                              : 'bg-white hover:bg-gray-50'
                          } flex items-center justify-between transition-colors`}
                          onClick={() => handleDrinkSelect(item)}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3
                              ${selectedDrinks.some(drink => drink.id === item.id)
                                ? 'border-emerald-500 bg-emerald-500' 
                                : 'border-gray-300'}`}
                            >
                              {selectedDrinks.some(drink => drink.id === item.id) && (
                                <Check className="text-white" size={12} />
                              )}
                            </div>
                            <div className="flex flex-col items-start">
                              <span className="font-medium text-sm">{item.name}</span>
                              {item.extraPrice ? (
                                <span className="text-xs text-emerald-600 font-semibold">+{item.extraPrice.toFixed(2)} ₺</span>
                              ) : null}
                            </div>
                          </div>
                          <ChevronRight size={16} className="text-gray-400" />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Selection Summary & Footer */}
            <div className="border-t border-gray-200 bg-white shadow-lg">
              {/* Compact Selection Summary */}
              <div className="p-3 pb-0">
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {selectedMainItem && (
                    <div className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-100 flex items-center">
                      {getCategoryIcon('main')}
                      <span className="ml-1">{selectedMainItem.name}</span>
                    </div>
                  )}
                  
                  {selectedSides.map(side => (
                    <div key={side.id} className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-full border border-amber-100 flex items-center">
                      {getCategoryIcon('side')}
                      <span className="ml-1">{side.name}</span>
                    </div>
                  ))}
                  
                  {selectedDrinks.map(drink => (
                    <div key={drink.id} className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-100 flex items-center">
                      {getCategoryIcon('drink')}
                      <span className="ml-1">{drink.name}</span>
                    </div>
                  ))}
                </div>
                
                {totalExtraPrice > 0 && (
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    Ekstra ücret: <span className="text-blue-600">+{totalExtraPrice.toFixed(2)} ₺</span>
                  </div>
                )}
              </div>
              
              {/* Action Button */}
              <div className="p-3 pt-1">
                <motion.button
                  className={`w-full py-3 px-4 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    isValid
                      ? 'bg-green-500 text-white shadow-md'
                      : 'bg-gray-300 text-gray-500'
                  }`}
                  onClick={handleComplete}
                  disabled={!isValid}
                  whileHover={isValid ? { scale: 1.02 } : {}}
                  whileTap={isValid ? { scale: 0.98 } : {}}
                >
                  {isValid ? (
                    <>
                      <Check size={18} />
                      <span>Seçimi Tamamla</span>
                    </>
                  ) : (
                    'Lütfen Gerekli Seçimleri Yapın'
                  )}
                </motion.button>
                
                {!isValid && (
                  <div className="mt-2 text-xs text-red-500 text-center">
                    {!selectedMainItem && mainItemRequired && <span>Ana ürün</span>}
                    {selectedSides.length === 0 && sideRequired && <span> • Yan ürün</span>}
                    {selectedDrinks.length === 0 && drinkRequired && <span> • İçecek</span>}
                    {(!selectedMainItem && mainItemRequired) || 
                    (selectedSides.length === 0 && sideRequired) || 
                    (selectedDrinks.length === 0 && drinkRequired) ? <span> seçimi zorunludur</span> : null}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileComboSelectionModal;
