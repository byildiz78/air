'use client';

import React from 'react';
import { Product, OrderItem } from '../types';

interface ProductGridProps {
  products: Product[];
  selectedProduct: string | null;
  orderItems: OrderItem[];
  onProductSelect: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedProduct,
  orderItems,
  onProductSelect,
}) => {
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      <div className="grid grid-cols-4 gap-3">
        {products.map(product => (
          <button
            key={product.id}
            onClick={() => onProductSelect(product)}
            className={`h-32 relative rounded-lg transition-all ${
              selectedProduct === product.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <div className="p-4 flex flex-col items-center">
              <product.icon size={32} className="mb-2" />
              <span className="text-lg">{product.name}</span>
              <span className="absolute bottom-2 right-2 text-sm font-bold">{product.price} TL</span>
            </div>
            {orderItems.find(item => item.productId === product.id)?.quantity && (
              <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {orderItems.find(item => item.productId === product.id)?.quantity}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
