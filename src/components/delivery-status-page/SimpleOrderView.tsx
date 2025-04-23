'use client';

import React from 'react';
import { OrderItem } from '../../types';

interface SimpleOrderViewProps {
  orderItems: OrderItem[];
  tableId: string;
}

const SimpleOrderView: React.FC<SimpleOrderViewProps> = ({ orderItems, tableId }) => {
  // Calculate total
  const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Order Items */}
      <div className="flex-1 overflow-auto p-2">
        <div className="space-y-2">
          {orderItems.map((item, index) => (
            <div 
              key={`${item.productId}-${index}`} 
              className="bg-gray-50 border border-gray-200 rounded-md p-2"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-baseline">
                    <span className="text-sm font-medium text-gray-800">{item.name}</span>
                    <span className="ml-2 text-xs text-gray-500">x{item.quantity}</span>
                  </div>
                  {item.notes && (
                    <div className="mt-1 text-xs text-gray-600 bg-yellow-50 p-1 rounded">
                      {item.notes}
                    </div>
                  )}
                  {item.options && item.options.length > 0 && (
                    <div className="mt-1">
                      {item.options.map((option, idx) => (
                        <span key={idx} className="text-xs text-blue-600 bg-blue-50 px-1 py-0.5 rounded mr-1">
                          {option}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium">{item.price.toFixed(2)} ₺</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Order Summary */}
      <div className="border-t border-gray-200 p-2">
        <div className="flex justify-between items-center py-1">
          <span className="text-sm font-medium">Ara Toplam:</span>
          <span className="text-sm">{total.toFixed(2)} ₺</span>
        </div>
        <div className="flex justify-between items-center py-1 font-bold">
          <span className="text-sm">Toplam:</span>
          <span className="text-sm">{total.toFixed(2)} ₺</span>
        </div>
      </div>
    </div>
  );
};

export default SimpleOrderView;
