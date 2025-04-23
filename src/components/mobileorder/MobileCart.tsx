'use client';

import React from 'react';
import { Minus, Plus, MessageCircle, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { OrderItem, Payment } from '../../types';
import { ProductMessage } from '../../types/productMessage';

interface MobileCartProps {
  orderItems: OrderItem[];
  payments: Payment[];
  tableId: string;
  checkDiscount: number;
  onIncrement: (itemId: string) => void;
  onDecrement: (itemId: string) => void;
  onPayment: (type: 'cash' | 'card' | 'multinet' | 'sodexo', amount: number) => void;
  onBarcodeSubmit: (barcode: string) => void;
  onCheckDiscount: () => void;
  onClose: () => void;
  onOpenMessageModal: (productId: string) => void;
  productMessageSelections: { [productId: string]: string[] };
  productMessages: ProductMessage[];
}

const MobileCart: React.FC<MobileCartProps> = ({
  orderItems,
  payments,
  tableId,
  checkDiscount,
  onIncrement,
  onDecrement,
  onPayment,
  onBarcodeSubmit,
  onCheckDiscount,
  onClose,
  onOpenMessageModal,
  productMessageSelections,
  productMessages,
}) => {
  const [expandedItems, setExpandedItems] = React.useState<{ [key: string]: boolean }>({});

  const toggleItemExpand = (itemId: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // Calculate total
  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = checkDiscount;
  const total = subtotal - discount;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Cart Header */}
      <div className="bg-white p-3 border-b border-gray-200 flex justify-between items-center sticky top-0 z-10">
        <h2 className="text-lg font-bold">Sepet - Masa {tableId}</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          Kapat
        </button>
      </div>

      {/* Cart Items - Always scrollable regardless of content amount */}
      <div className="flex-1 overflow-y-auto p-2 pb-36">
        {orderItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p>Sepetiniz boş</p>
            <p className="text-sm mt-2">Ürün eklemek için ürünlere tıklayın</p>
          </div>
        ) : (
          <div className="space-y-2">
            {orderItems.map((item, index) => {
              const isCombo = item.isCombo && item.comboDetails;
              const hasMessages = productMessageSelections[item.productId]?.length > 0;
              const isExpanded = expandedItems[item.productId] || false;
              
              return (
                <div 
                  key={item.productId} 
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
                >
                  <div className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.price.toFixed(2)} ₺ × {item.quantity} = {(item.price * item.quantity).toFixed(2)} ₺</div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => onDecrement(item.productId)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => onIncrement(item.productId)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                        >
                          +
                        </button>
                        <button
                          onClick={() => onOpenMessageModal(item.productId)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 ml-1"
                          title="Ürün mesajı ekle"
                        >
                          <MessageSquare size={16} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Display selected messages as tags */}
                    {productMessageSelections[item.productId]?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {productMessageSelections[item.productId].map(msgId => {
                          const message = productMessages.find(m => m.id === msgId);
                          return message ? (
                            <span key={msgId} className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">
                              {message.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    )}
                    
                    {/* Compact Combo Details - Always visible */}
                    {isCombo && item.comboDetails && (
                      <div className="mt-2 border-t border-gray-200 pt-2">
                        <div className="flex items-center">
                          <span className="text-xs font-medium text-purple-700 mr-2">Menü:</span>
                          <div className="flex flex-wrap gap-1">
                            {item.comboDetails.mainItem && (
                              <span className="text-xs bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded border border-purple-100">
                                {item.comboDetails.mainItem.name}
                              </span>
                            )}
                            
                            {item.comboDetails.sides && item.comboDetails.sides.map((side, idx) => (
                              <span key={idx} className="text-xs bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded border border-amber-100">
                                {side.name}
                              </span>
                            ))}
                            
                            {item.comboDetails.drinks && item.comboDetails.drinks.map((drink, idx) => (
                              <span key={idx} className="text-xs bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-100">
                                {drink.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Cart Summary - Fixed at bottom, positioned above footer */}
      <div className="fixed bottom-[104px] left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-10">
        <div className="p-0">
          {/* Only show discount if applicable */}
          {discount > 0 && (
            <div className="p-3 border-b border-gray-200">
              <div className="flex justify-between text-green-600">
                <span>İndirim:</span>
                <span>-{discount.toFixed(2)} ₺</span>
              </div>
            </div>
          )}
          
          {/* Total */}
          <div className="p-3">
            <div className="flex justify-between items-center">
              <span className="font-bold">Toplam:</span>
              <span className="font-bold text-lg">{total.toFixed(2)} ₺</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileCart;
