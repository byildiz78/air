import React from 'react';

interface ProductPreviewProps {
  name: string;
  price?: number;
  color?: string;
}

export const ProductPreview: React.FC<ProductPreviewProps> = ({
  name,
  price = 0,
  color = '#3B82F6'
}) => {
  return (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
      <div 
        className="w-full h-24 rounded-md flex items-center justify-center shadow-md transition-all duration-300"
        style={{ backgroundColor: color }}
      >
        <div className="text-center text-white">
          <div className="text-lg font-bold">{name || 'ÜRÜN ADI'}</div>
          <div className="text-sm mt-1">{price.toFixed(2) || '0.00'} ₺</div>
        </div>
      </div>
    </div>
  );
};
