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
    <div className="flex-1 p-1 overflow-y-auto">
      <div className="grid grid-cols-4 gap-1">
        {products.map(product => (
          <button
            key={product.id}
            onClick={() => onProductSelect(product)}
            className={`h-[72px] relative rounded transition-all ${
              selectedProduct === product.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <div className="p-2 h-full w-full flex flex-col relative">
              <span className="text-xs font-medium truncate text-left my-auto">{product.name}</span>
              <span className="absolute bottom-0 right-0 text-[10px] font-medium">{product.price} TL</span>
            </div>
            {orderItems.find(item => item.productId === product.id)?.quantity && (
              <div className="absolute top-1 right-1 bg-blue-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
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
