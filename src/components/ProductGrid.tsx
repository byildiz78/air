'use client';

import React from 'react';
import { Product, OrderItem } from '../types';
import { Layers } from 'lucide-react';
import BarcodeInput from './BarcodeInput';

interface ProductGridProps {
  products: Product[];
  selectedProduct: string | null;
  orderItems: OrderItem[];
  onProductSelect: (product: Product) => void;
  onBarcodeSubmit?: (barcode: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedProduct,
  orderItems,
  onProductSelect,
  onBarcodeSubmit,
}) => {
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
        return 'bg-white border-gray-200 text-gray-800 hover:bg-gray-50';
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header Info */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-white/5">
        <div className="px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="text-gray-400 text-xs tracking-wider uppercase">Personel</span>
              <span className="text-white font-medium">Ahmet</span>
            </div>
            <div className="w-px h-4 bg-gray-700/50"></div>
            <div className="flex items-center gap-1.5">
              <span className="text-gray-400 text-xs tracking-wider uppercase">Masa</span>
              <span className="text-white font-medium">B7</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <BarcodeInput onSubmit={onBarcodeSubmit ?? (() => {})} />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1 p-2 overflow-y-auto">
        <div className="grid grid-cols-4 gap-2">
          {products.map(product => {
            const orderItem = orderItems.find(item => item.productId === product.id);
            
            return (
              <button
                key={product.id}
                onClick={() => onProductSelect(product)}
                className={`relative h-20 rounded-lg border-2 transition-all duration-150
                  ${getButtonColors(product)}
                  ${product.isCombo ? 'shadow-md hover:shadow-lg' : ''}`}
              >
                <div className="h-full w-full p-2 flex flex-col">
                  {/* Product name and combo indicator */}
                  <div className="flex-1 flex items-center justify-between gap-1">
                    <span className="text-sm font-semibold leading-tight text-left break-words">
                      {product.name}
                    </span>
                    {product.isCombo && (
                      <Layers size={14} className="shrink-0 text-purple-500" />
                    )}
                  </div>
                  
                  {/* Price */}
                  <div className="text-right">
                    <span className={`text-sm font-bold ${product.isCombo ? 'text-purple-700' : ''}`}>
                      {product.price.toFixed(2)} ₺
                    </span>
                  </div>
                </div>

                {/* Quantity badge */}
                {orderItem?.quantity && (
                  <div className={`absolute top-1 right-1 w-5 h-5 
                    rounded-full flex items-center justify-center text-xs font-bold
                    ${product.isCombo 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-blue-500 text-white'}`}
                  >
                    {orderItem.quantity}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
