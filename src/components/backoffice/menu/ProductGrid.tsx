import React from 'react';
import { Product } from '../../../types/product';
import { ProductItem } from './ProductItem';

interface ProductGridProps {
  products: (Product | null)[];
  pageId: number;
  draggedItem: { productId: string, pageId: number, index: number } | null;
  dragOverItem: { pageId: number, index: number } | null;
  onDragStart: (e: React.DragEvent, productId: string, pageId: number, index: number) => void;
  onDragOver: (e: React.DragEvent, pageId: number, index: number) => void;
  onDrop: (e: React.DragEvent, pageId: number, index: number) => void;
  onDragEnd: () => void;
  onProductClick: (product: Product) => void;
  onEmptyClick: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  pageId,
  draggedItem,
  dragOverItem,
  onDragStart,
  onDragOver,
  onDragOver: handleDragOver,
  onDrop,
  onDragEnd,
  onProductClick,
  onEmptyClick
}) => {
  // Ensure we have exactly 32 items in the grid
  const gridItems = [...products];
  while (gridItems.length < 32) {
    gridItems.push(null);
  }

  // Create rows of 4 items each
  const rows = [];
  for (let i = 0; i < 8; i++) {
    rows.push(gridItems.slice(i * 4, (i + 1) * 4));
  }

  return (
    <div className="h-full flex flex-col justify-between" style={{ height: '576px' }}>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((product, colIndex) => {
            const index = rowIndex * 4 + colIndex;
            const isDraggedOver = dragOverItem?.pageId === pageId && dragOverItem?.index === index;
            
            return (
              <div key={colIndex} className="flex-1" style={{ marginRight: colIndex < 3 ? '1px' : 0 }}>
                <ProductItem
                  product={product}
                  index={index}
                  onDragStart={(e, productId) => onDragStart(e, productId, pageId, index)}
                  onDragOver={(e, idx) => handleDragOver(e, pageId, idx)}
                  onDrop={(e, idx) => onDrop(e, pageId, idx)}
                  onDragEnd={onDragEnd}
                  onClick={onProductClick}
                  onEmptyClick={onEmptyClick}
                  isDraggedOver={isDraggedOver}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
