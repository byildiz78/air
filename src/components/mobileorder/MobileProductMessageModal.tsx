import React, { useState, useEffect } from 'react';
import { ProductMessage } from '../../types/productMessage';
import { OrderItem } from '../../types';
import { MessageSquare, X, ShoppingCart, Grid, ChevronLeft } from 'lucide-react';

interface OrderItemWithMessages extends OrderItem {
  messages?: { id: string; name: string }[];
}

interface MobileProductMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderItems: OrderItemWithMessages[];
  productMessages: ProductMessage[];
  messageGroups: { id: string; name: string }[];
  onAssignMessages: (productId: string, selectedMsgs: string[]) => void;
  selectedProductId?: string;
  productMessageSelections?: { [productId: string]: string[] };
}

const MobileProductMessageModal: React.FC<MobileProductMessageModalProps> = ({
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
  const [view, setView] = useState<'groups' | 'messages' | 'products'>('groups');

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
    if (initialSelectedProductId) {
      setSelectedProductId(initialSelectedProductId);
    }
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

  if (!isOpen) return null;

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    setView('messages');
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
      const selectedMsgIds = Array.isArray(selectedMessages[selectedProductId])
        ? selectedMessages[selectedProductId].filter(Boolean)
        : [];
      onAssignMessages(selectedProductId, selectedMsgIds);
      onClose();
    }
  };

  const filteredMessages = productMessages.filter(m => m.groupId === activeGroupId);
  const selectedProduct = orderItems.find(item => item.productId === selectedProductId);

  const renderHeader = () => {
    let title = 'Ürün Mesajları';
    let leftButton = null;

    if (view === 'messages') {
      title = messageGroups.find(g => g.id === activeGroupId)?.name || 'Mesajlar';
      leftButton = (
        <button 
          onClick={() => setView('groups')} 
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      );
    } else if (view === 'products') {
      title = 'Sepet Ürünleri';
      leftButton = (
        <button 
          onClick={() => setView('groups')} 
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      );
    }

    return (
      <div className="bg-white text-gray-900 text-lg font-bold py-3 px-4 flex items-center justify-center shadow-md relative border-b border-gray-200">
        {leftButton}
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          <span>{title}</span>
        </div>
        <button 
          onClick={onClose} 
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    );
  };

  const renderGroups = () => (
    <div className="flex-1 overflow-y-auto p-3">
      <div className="grid grid-cols-1 gap-2">
        {messageGroups.map((group, i) => (
          <button
            key={group.id}
            className="w-full py-3 rounded-lg font-semibold text-base flex items-center gap-2 px-4 transition-all border bg-white text-gray-800 border-gray-200 hover:bg-blue-50 shadow-sm"
            onClick={() => {
              setActiveGroupId(group.id);
              setView('messages');
            }}
          >
            <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              {i + 1}
            </span>
            <span className="flex-1 text-left">{group.name}</span>
          </button>
        ))}
      </div>

      <div className="mt-4">
        <button
          className="w-full py-3 rounded-lg font-semibold text-base flex items-center gap-2 px-4 transition-all border bg-white text-gray-800 border-gray-200 hover:bg-blue-50 shadow-sm"
          onClick={() => setView('products')}
        >
          <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <ShoppingCart className="w-4 h-4" />
          </span>
          <span className="flex-1 text-left">Sepet Ürünleri</span>
        </button>
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="flex-1 overflow-y-auto p-3">
      <div className="mb-3">
        <div className="text-sm text-gray-500 mb-1">Seçili Ürün:</div>
        <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 flex items-center">
          <span className="font-medium">{selectedProduct?.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {filteredMessages.map(msg => (
          <button
            key={msg.id}
            className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
              selectedProductId && selectedMessages[selectedProductId]?.includes(msg.id) 
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                : 'bg-white text-gray-800 border-gray-200 hover:bg-blue-50'
            }`}
            onClick={() => handleToggleMessage(msg)}
          >
            {msg.name}
          </button>
        ))}
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="flex-1 overflow-y-auto p-3">
      <div className="grid grid-cols-1 gap-2">
        {orderItems.map(item => (
          <button
            key={item.productId}
            className={`p-3 rounded-lg border transition-all ${
              selectedProductId === item.productId 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 bg-white hover:border-blue-300'
            }`}
            onClick={() => handleSelectProduct(item.productId)}
          >
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {item.quantity}
              </span>
              <span className="flex-1 font-medium text-sm">{item.name}</span>
              <span className="font-bold text-sm">{(item.price * item.quantity).toFixed(2)} ₺</span>
            </div>
            
            {/* Selected messages */}
            {selectedMessages[item.productId] && selectedMessages[item.productId].length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedMessages[item.productId].map(msgId => {
                  const msg = productMessages.find(m => m.id === msgId);
                  return msg ? (
                    <span key={msg.id} className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">
                      {msg.name}
                    </span>
                  ) : null;
                })}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (view) {
      case 'groups':
        return renderGroups();
      case 'messages':
        return renderMessages();
      case 'products':
        return renderProducts();
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      {renderHeader()}
      {renderContent()}
      <div className="p-3 border-t border-gray-200 bg-gray-50">
        <button 
          onClick={handleSave} 
          className="w-full py-3 rounded-lg bg-blue-600 text-white font-bold shadow-sm"
        >
          Kaydet
        </button>
      </div>
    </div>
  );
};

export default MobileProductMessageModal;
