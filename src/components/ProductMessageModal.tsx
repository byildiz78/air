import React, { useState, useEffect } from 'react';
import { ProductMessage } from '../types/productMessage';
import { OrderItem } from '../types';
import { HiOutlineViewGrid, HiOutlineShoppingCart, HiOutlineChatAlt2, HiOutlineX } from 'react-icons/hi';

interface OrderItemWithMessages extends OrderItem {
  messages?: { id: string; name: string }[];
}

interface ProductMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderItems: OrderItemWithMessages[];
  productMessages: ProductMessage[];
  messageGroups: { id: string; name: string }[];
  onAssignMessages: (productId: string, selectedMsgs: string[]) => void;
  selectedProductId?: string;
  productMessageSelections?: { [productId: string]: string[] };
}

const icons = [HiOutlineViewGrid, HiOutlineChatAlt2, HiOutlineShoppingCart];

const ProductMessageModal: React.FC<ProductMessageModalProps> = ({
  isOpen,
  onClose,
  orderItems,
  productMessages,
  messageGroups,
  onAssignMessages,
  selectedProductId: initialSelectedProductId,
  productMessageSelections,
}) => {
  const [selectedProductId, setSelectedProductId] = useState(initialSelectedProductId || orderItems[0]?.productId || null);
  const [selectedMessages, setSelectedMessages] = useState<{ [productId: string]: string[] }>({});
  const [activeGroupId, setActiveGroupId] = useState<string>(messageGroups[0]?.id || '');

  useEffect(() => {
    const initial: { [productId: string]: string[] } = {};
    orderItems.forEach((item) => {
      if (item.messages && Array.isArray(item.messages)) {
        initial[item.productId] = item.messages.map((m) => m.id);
      }
    });
    setSelectedMessages(initial);
  }, [orderItems, isOpen]);

  useEffect(() => {
    if (initialSelectedProductId) setSelectedProductId(initialSelectedProductId);
  }, [initialSelectedProductId]);

  useEffect(() => {
    if (isOpen && selectedProductId && productMessageSelections) {
      setSelectedMessages((prev) => ({
        ...prev,
        [selectedProductId]: Array.isArray(productMessageSelections[selectedProductId])
          ? productMessageSelections[selectedProductId]
          : [],
      }));
    }
  }, [isOpen, selectedProductId, productMessageSelections]);

  useEffect(() => {
    if (selectedProductId && productMessageSelections) {
      setSelectedMessages((prev) => ({
        ...prev,
        [selectedProductId]: Array.isArray(productMessageSelections[selectedProductId])
          ? productMessageSelections[selectedProductId]
          : [],
      }));
    }
  }, [selectedProductId, productMessageSelections]);

  if (!isOpen) return null;

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
  };

  const handleToggleMessage = (msg: ProductMessage) => {
    if (!selectedProductId) return;
    setSelectedMessages(prev => {
      const prevMsgs = prev[selectedProductId] || [];
      const exists = prevMsgs.includes(msg.id);
      return {
        ...prev,
        [selectedProductId]: exists
          ? prevMsgs.filter(id => id !== msg.id)
          : [...prevMsgs, msg.id]
      };
    });
  };

  const handleSave = () => {
    if (selectedProductId) {
      // Sadece id dizisi döndür
      const selectedMsgIds = Array.isArray(selectedMessages[selectedProductId])
        ? selectedMessages[selectedProductId].filter(Boolean)
        : [];
      onAssignMessages(selectedProductId, selectedMsgIds);
      onClose();
    }
  };

  const filteredMessages = productMessages.filter(m => m.groupId === activeGroupId);

  return (
    <div className="fixed inset-0 z-50 flex flex-col w-screen h-screen bg-black/60 backdrop-blur-[2px]">
      {/* Modal overlay for depth */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      {/* Header */}
      <div className="w-full bg-white/95 text-gray-900 text-xl font-bold py-4 px-10 flex items-center justify-between shadow select-none border-b border-gray-200 relative" style={{letterSpacing:'0.03em'}}>
        <div className="flex items-center gap-2">
          <HiOutlineChatAlt2 className="w-6 h-6 text-blue-600/80" />
          <span>Ürün Mesajları</span>
        </div>
        <button onClick={onClose} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 rounded-full p-2 transition focus:outline-none focus:ring-2 focus:ring-blue-200"><HiOutlineX className="w-5 h-5" /></button>
      </div>
      <div className="flex flex-1 min-h-0 relative">
        {/* Left: Message Groups */}
        <div className="w-[220px] bg-white/90 flex flex-col border-r border-gray-200 p-4 shadow-none">
          <div className="flex flex-col gap-2 mb-2">
            {messageGroups.map((group, i) => {
              const Icon = icons[i % icons.length];
              return (
                <button
                  key={group.id}
                  className={`w-full py-2 rounded-lg font-semibold text-base flex items-center gap-2 px-3 transition-all border ${activeGroupId === group.id ? 'bg-blue-50 text-blue-700 border-blue-400 shadow-sm' : 'bg-white text-gray-800 border-gray-200 hover:bg-blue-50'} focus:outline-none focus:ring-2 focus:ring-blue-200`}
                  onClick={() => setActiveGroupId(group.id)}
                >
                  <Icon className="w-5 h-5 text-blue-400" />
                  {group.name}
                </button>
              );
            })}
          </div>
        </div>
        {/* Center: Messages */}
        <div className="flex-1 flex flex-col bg-white/95 p-8 rounded-none">
          <div className="flex flex-wrap gap-2 mb-6">
            {filteredMessages.map(msg => (
              <button
                key={msg.id}
                className={`px-4 py-2 rounded-lg text-base font-medium border transition-all focus:outline-none focus:ring-2 focus:ring-blue-200 ${selectedProductId && selectedMessages[selectedProductId]?.includes(msg.id) ? 'bg-blue-600 text-white border-blue-600 shadow' : 'bg-gray-50 text-gray-900 border-gray-200 hover:bg-blue-50'}`}
                onClick={() => handleToggleMessage(msg)}
              >
                {msg.name}
              </button>
            ))}
          </div>
        </div>
        {/* Right: Order Items */}
        <div className="w-[300px] bg-white/95 flex flex-col border-l border-gray-200 p-4 overflow-y-auto shadow-none">
          <div className="font-bold text-base mb-3 text-blue-900 text-center flex items-center gap-2 justify-center">
            <HiOutlineShoppingCart className="w-5 h-5 text-blue-600" />
            Sepet Ürünleri
          </div>
          <div className="flex flex-col gap-2">
            {orderItems.map(item => (
              <div
                key={item.productId}
                className={`rounded-xl px-4 py-3 font-semibold shadow border cursor-pointer transition-all flex flex-col items-center min-w-[140px] bg-white ${selectedProductId === item.productId ? 'border-blue-500 bg-blue-50 scale-105 shadow-md' : 'border-gray-200 hover:border-blue-300'}`}
                onClick={() => handleSelectProduct(item.productId)}
                style={{boxShadow: selectedProductId === item.productId ? '0 4px 16px 0 rgba(52, 144, 220, 0.10)' : '0 2px 8px 0 rgba(0,0,0,0.04)'}}
              >
                <div className="flex items-center gap-2 w-full justify-center">
                  <span className="text-[11px] font-bold bg-gray-800 rounded-full w-7 h-7 flex items-center justify-center text-white shadow-sm border-2 border-white/80">{item.quantity}</span>
                  <span className="text-[13px] font-semibold text-gray-800 truncate flex-1 drop-shadow-sm">{item.name}</span>
                  <span className="text-[13px] font-bold text-blue-900">{(item.price * item.quantity).toFixed(2)}</span>
                </div>
                {/* Selected messages */}
                {selectedMessages[item.productId] && selectedMessages[item.productId].length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedMessages[item.productId].map(msgId => {
                      const msg = productMessages.find(m => m.id === msgId);
                      return msg ? (
                        <span key={msg.id} className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[11px] font-semibold border border-blue-100 shadow-sm">{msg.name}</span>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Footer: Buttons */}
      <div className="flex justify-end gap-2 border-t border-gray-200 p-6 bg-white/95 rounded-b-xl shadow-none">
        <button onClick={onClose} className="px-6 py-2.5 rounded-lg bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300">İptal</button>
        <button onClick={handleSave} className="px-8 py-2.5 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow focus:outline-none focus:ring-2 focus:ring-blue-300">Kaydet</button>
      </div>
    </div>
  );
};

export default ProductMessageModal;
