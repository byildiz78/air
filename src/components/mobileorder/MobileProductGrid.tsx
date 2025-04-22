'use client';

import React from 'react';
import { Search, X, Tag, Coffee, Pizza, Cake, Salad, Soup, Utensils, Sandwich } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product, OrderItem, Category } from '../../types';

interface MobileProductGridProps {
  products: Product[];
  selectedProduct: string | null;
  orderItems: OrderItem[];
  onProductSelect: (product: Product) => void;
  onBarcodeSubmit?: (barcode: string) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
  categories: Category[];
  onCategorySelect: (category: Category) => void;
  selectedCategory: Category;
}

const MobileProductGrid: React.FC<MobileProductGridProps> = ({
  products,
  selectedProduct,
  orderItems,
  onProductSelect,
  onBarcodeSubmit,
  onSearch,
  searchQuery,
  categories,
  onCategorySelect,
  selectedCategory,
}) => {
  // Get button colors based on product category
  const getButtonColors = (product: Product) => {
    if (selectedProduct === product.id) {
      return 'bg-blue-600 border-blue-400 text-white';
    }

    if (product.isCombo) {
      return 'bg-gradient-to-br from-indigo-50 to-purple-50 border-purple-200 text-purple-800 hover:from-indigo-100 hover:to-purple-100';
    }

    switch (product.category?.toLowerCase()) {
      case 'içecek':
      case 'icecek':
      case 'beverages':
        return 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100';
      case 'tatlı':
      case 'tatli':
      case 'dessert':
        return 'bg-pink-50 border-pink-200 text-pink-800 hover:bg-pink-100';
      case 'ana yemek':
      case 'pizza':
      case 'main':
        return 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100';
      case 'salata':
        return 'bg-lime-50 border-lime-200 text-lime-800 hover:bg-lime-100';
      case 'çorba':
      case 'corba':
        return 'bg-orange-50 border-orange-200 text-orange-800 hover:bg-orange-100';
      case 'kahvaltı':
      case 'kahvalti':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800 hover:bg-yellow-100';
      default:
        return 'bg-white border-gray-300 text-gray-800 hover:bg-gray-50';
    }
  };

  // Get category icon based on category name
  const getCategoryIcon = (category: Category) => {
    const name = category.name.toLowerCase();
    if (name.includes('içecek') || name.includes('icecek') || name.includes('beverages')) {
      return Coffee;
    } else if (name.includes('tatlı') || name.includes('tatli') || name.includes('dessert')) {
      return Cake;
    } else if (name.includes('pizza') || name.includes('ana yemek') || name.includes('main')) {
      return Pizza;
    } else if (name.includes('salata')) {
      return Salad;
    } else if (name.includes('çorba') || name.includes('corba')) {
      return Soup;
    } else if (name.includes('kahvaltı') || name.includes('kahvalti')) {
      return Sandwich;
    } else {
      return Utensils;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Enhanced Search Bar */}
      <div className="p-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="relative">
          <input
            type="text"
            placeholder="Ürün ara (isim, barkod veya kategori)"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full p-3 pl-10 pr-10 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" size={20} />
          {searchQuery && (
            <motion.button 
              onClick={() => onSearch('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
              whileTap={{ scale: 0.9 }}
            >
              <X size={16} />
            </motion.button>
          )}
        </div>
        {searchQuery && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-blue-600 font-medium"
          >
            Arama sonuçları: "{searchQuery}" ({products.length} ürün)
          </motion.div>
        )}
      </div>

      {/* Category Buttons */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="overflow-x-auto py-2">
          <div className="flex px-4 space-x-3 min-w-max">
            {categories.map((category) => {
              const isSelected = selectedCategory.id === category.id;
              const CategoryIcon = getCategoryIcon(category);
              
              return (
                <motion.button
                  key={category.id}
                  className={`px-4 py-2.5 rounded-lg flex items-center gap-2 whitespace-nowrap transition-all
                    ${isSelected 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  onClick={() => onCategorySelect(category)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <CategoryIcon size={18} />
                  <span className="font-medium">{category.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="grid grid-cols-2 gap-3">
          {products.map((product, index) => {
            const orderItem = orderItems.find(item => item.productId === product.id);
            const isSelected = selectedProduct === product.id;
            
            return (
              <motion.button
                key={product.id}
                onClick={() => onProductSelect(product)}
                className={`relative rounded-xl border shadow-sm overflow-hidden ${product.isCombo ? 'border-purple-300' : 'border-gray-200'} text-left
                  ${getButtonColors(product)}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Quantity Badge */}
                {orderItem?.quantity && (
                  <div className="absolute top-2 right-2 min-w-5 h-5 
                    rounded-full flex items-center justify-center text-xs font-bold
                    bg-blue-500 text-white shadow-sm px-1.5"
                  >
                    {orderItem.quantity}
                  </div>
                )}
                
                <div className="flex flex-col h-full">
                  {/* Product Header */}
                  <div className="p-3 pb-2">
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-sm line-clamp-2">{product.name}</span>
                      {product.isCombo && (
                        <div className="bg-purple-100 text-purple-800 text-xs px-1.5 py-0.5 rounded-full border border-purple-200 flex items-center ml-1">
                          <Tag size={10} className="mr-0.5" />
                          <span>Combo</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Product Footer */}
                  <div className="mt-auto p-3 pt-1 flex justify-between items-center">
                    <span className="text-sm font-bold">{product.price.toFixed(2)} ₺</span>
                    
                    {!orderItem?.quantity && (
                      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    )}
                  </div>
                </div>
                
                {/* Selection Indicator */}
                {isSelected && (
                  <div 
                    className="absolute inset-0 border-2 border-blue-500 rounded-xl pointer-events-none"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileProductGrid;
