import React from 'react';
import { Product } from '../../../types/product';

interface ProductItemProps {
  product: Product | null;
  index: number;
  onDragStart: (e: React.DragEvent, productId: string, index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  onDragEnd: () => void;
  onClick: (product: Product) => void;
  onEmptyClick: () => void;
  isDraggedOver: boolean;
}

export const ProductItem: React.FC<ProductItemProps> = ({
  product,
  index,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  onClick,
  onEmptyClick,
  isDraggedOver
}) => {
  const handleClick = () => {
    if (product) {
      onClick(product);
    } else {
      onEmptyClick();
    }
  };

  // For 8 rows in 600px height, each item should be around 75px (600px / 8)
  // Accounting for the header and minimal spacing, we'll set it to 72px
  return (
    <div 
      className={`border border-gray-200 rounded-md flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
        isDraggedOver ? 'bg-blue-100 border-blue-400 scale-105' : 
        product ? '' : 'bg-gray-50'
      }`}
      style={{ height: '72px' }}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={(e) => onDrop(e, index)}
      onClick={handleClick}
    >
      {product ? (
        <div
          className="w-full h-full rounded-md flex flex-col items-center justify-center"
          style={{ 
            backgroundColor: product.groupColor || '#3B82F6',
            color: 'white' 
          }}
          draggable
          onDragStart={(e) => onDragStart(e, product.id, index)}
          onDragEnd={onDragEnd}
        >
          <div className="font-bold truncate w-full text-center px-1 text-sm">{product.name}</div>
          {product.price && (
            <div className="text-xs leading-none">{product.price.toFixed(2)} ₺</div>
          )}
        </div>
      ) : (
        <span className="text-gray-400 text-xs">Boş</span>
      )}
    </div>
  );
};
