import React, { useEffect, useRef, useState } from 'react';
import { Plus, Minus, CreditCard, Wallet, DollarSign, Percent, Clock, User, ChevronDown, ChevronUp, Receipt, Calendar, Store } from 'lucide-react';
import { OrderItem, CartDiscount, Payment } from '../types';
import BarcodeInput from './BarcodeInput';
import PaymentModal from './PaymentModal';

interface CartProps {
  orderItems: OrderItem[];
  payments: Payment[];
  discount?: CartDiscount;
  tableId: string;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
  onPayment: (type: 'cash' | 'card' | 'multinet' | 'sodexo', amount: number) => void;
  onBarcodeSubmit: (barcode: string) => void;
}

const Cart: React.FC<CartProps> = ({ 
  orderItems, 
  payments,
  discount, 
  tableId, 
  onIncrement, 
  onDecrement, 
  onPayment,
  onBarcodeSubmit 
}) => {
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPaymentType, setSelectedPaymentType] = useState<'cash' | 'card' | 'multinet' | 'sodexo'>('cash');
  const [saleType, setSaleType] = useState<'Fişli Satış' | 'Faturalı Satış'>('Fişli Satış');
  const cartItemsRef = useRef<HTMLDivElement>(null);
  const lastItemRef = useRef<HTMLDivElement>(null);

  // Get current date and time
  const now = new Date();
  const formattedDate = now.toLocaleDateString('tr-TR');
  const formattedTime = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

  useEffect(() => {
    if (orderItems.length > 0 && lastItemRef.current) {
      lastItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [orderItems]);

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const discountAmount = discount ? (discount.type === 'check' ? discount.amount : 0) : 0;
  const totalAmount = subtotal - discountAmount;
  const remainingAmount = totalAmount - totalPaid;

  const toggleExpand = (productId: string) => {
    setExpandedItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handlePaymentClick = (type: 'cash' | 'card' | 'multinet' | 'sodexo') => {
    setSelectedPaymentType(type);
    if (type === 'cash') {
      setIsPaymentModalOpen(true);
    } else {
      onPayment(type, remainingAmount);
    }
  };

  const handlePaymentComplete = (amount: number) => {
    setIsPaymentModalOpen(false);
    onPayment(selectedPaymentType, amount);
  };

  return (
    <div className="w-96 bg-gradient-to-br from-gray-900/95 to-gray-800/95 border-l border-white/10 flex flex-col h-full">
      {/* Cart Header */}
      <div className="flex-none border-b border-white/10">
        {/* Sale Type and Info Bar */}
        <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-3">
          <div className="flex items-center justify-between gap-2">
            <button 
              onClick={() => setSaleType(prev => prev === 'Fişli Satış' ? 'Faturalı Satış' : 'Fişli Satış')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-all duration-300 ${
                saleType === 'Fişli Satış'
                  ? 'bg-gradient-to-br from-green-500/90 to-green-600/90 hover:from-green-600/90 hover:to-green-700/90 text-white'
                  : 'bg-gradient-to-br from-blue-500/90 to-blue-600/90 hover:from-blue-600/90 hover:to-blue-700/90 text-white'
              }`}
            >
              <Receipt size={18} />
              <span className="font-medium">{saleType}</span>
            </button>
            <div className="flex items-center gap-1 bg-gray-900/50 px-3 py-2 rounded-lg border border-white/5">
              <Clock size={16} className="text-gray-400" />
              <span className="text-white">{formattedTime}</span>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div className="flex items-center gap-1 bg-gray-900/50 px-2 py-1.5 rounded-lg border border-white/5">
              <Receipt size={14} className="text-gray-400" />
              <span className="text-white text-sm">1234</span>
            </div>
            <div className="flex items-center gap-1 bg-gray-900/50 px-2 py-1.5 rounded-lg border border-white/5">
              <Calendar size={14} className="text-gray-400" />
              <span className="text-white text-sm">{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1 bg-gray-900/50 px-2 py-1.5 rounded-lg border border-white/5">
              <User size={14} className="text-gray-400" />
              <span className="text-white text-sm truncate">Ahmet Y.</span>
            </div>
          </div>
        </div>

        {/* Barcode Input */}
        <div className="p-2">
          <BarcodeInput onSubmit={onBarcodeSubmit} />
        </div>
      </div>

      {/* Cart Items */}
      <div ref={cartItemsRef} className="flex-1 overflow-y-auto p-3 space-y-2">
        {/* Payments Section */}
        {payments.length > 0 && (
          <div className="bg-green-900/20 rounded-xl p-3 border border-green-500/20 mb-4">
            <h3 className="text-green-400 font-medium mb-2">Ödemeler</h3>
            <div className="space-y-2">
              {payments.map((payment, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">{payment.type === 'cash' ? 'Nakit' : 'Kart'}</span>
                    <span className="text-gray-400">{payment.timestamp}</span>
                  </div>
                  <span className="text-green-400 font-medium">{payment.amount.toFixed(2)} TL</span>
                </div>
              ))}
              <div className="border-t border-green-500/20 mt-2 pt-2 flex justify-between">
                <span className="text-green-400">Toplam Ödenen</span>
                <span className="text-green-400 font-bold">{totalPaid.toFixed(2)} TL</span>
              </div>
            </div>
          </div>
        )}

        {orderItems.map((item, index) => (
          <div
            key={item.productId}
            ref={index === orderItems.length - 1 ? lastItemRef : null}
            className="bg-gradient-to-br from-gray-800/80 to-gray-700/80 rounded-xl border border-white/5 shadow-lg overflow-hidden"
          >
            {/* Item content */}
            <div className="p-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-medium text-white">{item.name}</span>
                      {item.comboSelections && (
                        <button
                          onClick={() => toggleExpand(item.productId)}
                          className="p-1 rounded-full hover:bg-gray-700/50"
                        >
                          {expandedItems.includes(item.productId) ? (
                            <ChevronUp size={16} className="text-blue-400" />
                          ) : (
                            <ChevronDown size={16} className="text-blue-400" />
                          )}
                        </button>
                      )}
                    </div>
                    <span className="text-blue-400 font-bold">{item.price} TL</span>
                  </div>
                  
                  {item.addedBy && item.addedAt && (
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <User size={12} />
                        <span>{item.addedBy}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{item.addedAt}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1 ml-3">
                  <button
                    onClick={() => onDecrement(item.productId)}
                    className="p-1 bg-red-500/80 hover:bg-red-600/80 text-white rounded-lg transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-6 text-center text-white font-medium text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onIncrement(item.productId)}
                    className="p-1 bg-green-500/80 hover:bg-green-600/80 text-white rounded-lg transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Combo Selections */}
            {item.comboSelections && expandedItems.includes(item.productId) && (
              <div className="bg-gray-900/50 border-t border-white/5 p-2">
                <div className="space-y-1 text-sm">
                  <div className="flex items-center justify-between text-gray-300">
                    <span>• {item.comboSelections.mainItem.name}</span>
                    {item.comboSelections.mainItem.extraPrice && (
                      <span className="text-blue-400">+{item.comboSelections.mainItem.extraPrice} TL</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-gray-300">
                    <span>• {item.comboSelections.side.name}</span>
                    {item.comboSelections.side.extraPrice && (
                      <span className="text-blue-400">+{item.comboSelections.side.extraPrice} TL</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-gray-300">
                    <span>• {item.comboSelections.drink.name}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Payment Section */}
      <div className="flex-none border-t border-white/10 bg-gradient-to-br from-gray-900/90 to-gray-800/90 p-3">
        {/* Totals */}
        <div className="mb-3 space-y-2">
          {discount && (
            <>
              <div className="flex justify-between items-center text-gray-300 bg-gray-800/50 p-2 rounded-lg">
                <span>Ara Toplam</span>
                <span>{subtotal.toFixed(2)} TL</span>
              </div>
              <div className="flex justify-between items-center text-green-400 bg-green-900/20 p-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Percent size={16} />
                  <span>İndirim</span>
                </div>
                <span>-{discountAmount.toFixed(2)} TL</span>
              </div>
            </>
          )}

          {payments.length > 0 && (
            <div className="flex justify-between items-center text-green-400 bg-green-900/20 p-2 rounded-lg">
              <span>Ödenen</span>
              <span>-{totalPaid.toFixed(2)} TL</span>
            </div>
          )}

          <div className="flex justify-between items-center p-3 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-xl border border-blue-500/20">
            <span className="text-lg text-gray-200">
              {payments.length > 0 ? 'Kalan' : 'Toplam'}
            </span>
            <span className="text-2xl font-bold text-white">{remainingAmount.toFixed(2)} TL</span>
          </div>
        </div>

        {/* Payment Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handlePaymentClick('cash')}
            className="flex items-center justify-center gap-2 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-3 rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg shadow-yellow-500/20"
          >
            <DollarSign size={20} />
            <span className="font-medium">Nakit</span>
          </button>
          <button
            onClick={() => handlePaymentClick('card')}
            className="flex items-center justify-center gap-2 bg-gradient-to-br from-blue-500 to-blue-600 text-white p-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/20"
          >
            <CreditCard size={20} />
            <span className="font-medium">Kredi Kartı</span>
          </button>
          <button
            onClick={() => handlePaymentClick('multinet')}
            className="flex items-center justify-center gap-2 bg-gradient-to-br from-green-500 to-green-600 text-white p-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg shadow-green-500/20"
          >
            <Wallet size={20} />
            <span className="font-medium">Multinet</span>
          </button>
          <button
            onClick={() => handlePaymentClick('sodexo')}
            className="flex items-center justify-center gap-2 bg-gradient-to-br from-purple-500 to-purple-600 text-white p-3 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-purple-500/20"
          >
            <Wallet size={20} />
            <span className="font-medium">Sodexo</span>
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onConfirm={handlePaymentComplete}
        totalAmount={remainingAmount}
      />
    </div>
  );
};

export default Cart;