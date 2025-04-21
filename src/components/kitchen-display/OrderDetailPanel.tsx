import React, { useState } from 'react';
import { X, Clock, User, MapPin, CheckCircle, AlertTriangle, Printer, MessageSquare } from 'lucide-react';
import { Order, OrderItem } from '../../types';

// Geçici tip tanımlamaları
interface OrderOption {
  name: string;
  value: string;
}

interface OrderDetailPanelProps {
  order: Order;
  onStatusChange: (orderId: string, newStatus: Order['status']) => void;
  onClose: () => void;
  isModal?: boolean;
}

const OrderDetailPanel: React.FC<OrderDetailPanelProps> = ({
  order,
  onStatusChange,
  onClose,
  isModal = false
}) => {
  const [itemStatus, setItemStatus] = useState<Record<string, boolean>>(
    order.items.reduce((acc, item, index) => {
      acc[`${order.id}-${index}`] = item.status === 'completed';
      return acc;
    }, {} as Record<string, boolean>)
  );

  // Function to get appropriate status label in Turkish
  const getStatusLabel = (status: string): string => {
    const statusMap: Record<string, string> = {
      'pending': 'Beklemede',
      'in-progress': 'Hazırlanıyor',
      'ready': 'Hazır',
      'completed': 'Tamamlandı',
      'cancelled': 'İptal Edildi'
    };
    return statusMap[status] || status;
  };

  // Function to get appropriate order type label in Turkish
  const getOrderTypeLabel = (type: string): string => {
    const typeMap: Record<string, string> = {
      'dine-in': 'Masa Servis',
      'takeaway': 'Paket Servis',
      'delivery': 'Kurye'
    };
    return typeMap[type] || type;
  };

  // Calculate time elapsed since order creation
  const getTimeElapsed = (): string => {
    const orderTime = new Date(order.createdAt).getTime();
    const now = new Date().getTime();
    const diffMinutes = Math.floor((now - orderTime) / (1000 * 60));
    
    if (diffMinutes < 60) {
      return `${diffMinutes} dakika önce`;
    } else {
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;
      return `${hours} saat ${minutes} dakika önce`;
    }
  };

  // Get next status based on current status
  const getNextStatus = (): Order['status'] | null => {
    const statusFlow: Record<Order['status'], Order['status']> = {
      'pending': 'in-progress',
      'in-progress': 'ready',
      'ready': 'completed',
      'completed': 'completed',
      'cancelled': 'cancelled'
    };
    return statusFlow[order.status] || null;
  };

  // Toggle item completion status
  const toggleItemStatus = (itemIndex: number) => {
    const itemKey = `${order.id}-${itemIndex}`;
    
    // Tüm ürünleri hazır yap
    if (!itemStatus[itemKey]) {
      const newStatus = { ...itemStatus };
      order.items.forEach((_, index) => {
        newStatus[`${order.id}-${index}`] = true;
      });
      setItemStatus(newStatus);
    } else {
      // Sadece bu ürünü hazır değil yap
      setItemStatus(prev => ({
        ...prev,
        [itemKey]: false
      }));
    }
  };

  // Check if all items are completed
  const areAllItemsCompleted = () => {
    return order.items.every((_, index) => itemStatus[`${order.id}-${index}`]);
  };

  const nextStatus = getNextStatus();
  const nextStatusLabel = nextStatus ? getStatusLabel(nextStatus) : null;

  // Handle modal click to prevent closing when clicking inside
  const handleModalContentClick = (e: React.MouseEvent) => {
    if (isModal) {
      e.stopPropagation();
    }
  };

  // Render the component as a modal or a panel based on isModal prop
  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
        <div 
          className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-auto" 
          onClick={handleModalContentClick}
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Sipariş #{order.orderNumber} Detayları</h2>
            <button 
              className="p-1 rounded-full hover:bg-gray-100" 
              onClick={onClose}
              aria-label="Kapat"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="p-6">
            {renderOrderDetails()}
          </div>
        </div>
      </div>
    );
  }

  // Otherwise render as a regular panel
  return (
    <div className="h-full flex flex-col">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Sipariş #{order.orderNumber}</h2>
        <button 
          className="p-1 rounded-full hover:bg-gray-100" 
          onClick={onClose}
          aria-label="Kapat"
        >
          <X size={24} />
        </button>
      </div>
      
      <div className="p-6 overflow-auto flex-1">
        {renderOrderDetails()}
      </div>
    </div>
  );

  // Helper function to render the order details content
  function renderOrderDetails() {
    return (
      <>
        {/* Order Meta Information */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className={`
                inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                ${order.status === 'pending' ? 'bg-gray-100 text-gray-800' : ''}
                ${order.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : ''}
                ${order.status === 'ready' ? 'bg-green-100 text-green-800' : ''}
                ${order.status === 'completed' ? 'bg-purple-100 text-purple-800' : ''}
                ${order.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
              `}>
                {getStatusLabel(order.status)}
              </span>
              
              {order.priority > 1 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  Öncelikli
                </span>
              )}
            </div>
            
            <div className="flex items-center text-gray-500">
              <Clock size={16} className="mr-1" />
              <span>{getTimeElapsed()}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="inline-flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mr-2">
                {getOrderTypeLabel(order.type)}
              </span>
              
              {order.type === 'dine-in' ? (
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1" />
                  <span className="font-medium">Masa {order.tableId}</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <User size={16} className="mr-1" />
                  <span className="font-medium">{order.customerName || 'Müşteri'}</span>
                </div>
              )}
            </div>
            
            <div className="text-sm text-gray-500">
              Sipariş Zamanı: {new Date(order.createdAt).toLocaleTimeString('tr-TR')}
            </div>
          </div>
          
          {order.notes && (
            <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm">
              <div className="font-medium mb-1 text-yellow-800">Sipariş Notu:</div>
              <p className="text-gray-700">{order.notes}</p>
            </div>
          )}
        </div>
        
        {/* Order Items */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Sipariş İçeriği</h3>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ürün
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Adet
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fiyat
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.items.map((item, index) => (
                  <tr key={index} className={itemStatus[`${order.id}-${index}`] ? 'bg-green-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      {item.options && item.options.length > 0 && (
                        <div className="text-xs text-gray-500 mt-1">
                          {Array.isArray(item.options) && item.options.map((option: string | OrderOption, i: number) => (
                            <span key={i} className="mr-2">
                              {typeof option === 'string' ? option : `${option.name}: ${option.value}`}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.quantity}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{(item.price * item.quantity).toFixed(2)} ₺</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          itemStatus[`${order.id}-${index}`] 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                        onClick={() => toggleItemStatus(index)}
                      >
                        <CheckCircle size={14} className="mr-1" />
                        {itemStatus[`${order.id}-${index}`] ? 'Hazır' : 'Hazırla'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan={2} className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                    Toplam:
                  </td>
                  <td className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    {order.items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)} ₺
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => {/* Print functionality would go here */}}
            >
              <Printer size={16} className="mr-2" />
              Yazdır
            </button>
            
            <button
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => {/* Message functionality would go here */}}
            >
              <MessageSquare size={16} className="mr-2" />
              Mesaj Gönder
            </button>
          </div>
          
          {nextStatus && (
            <button
              className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                areAllItemsCompleted() 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
              onClick={() => {
                if (nextStatus) {
                  onStatusChange(order.id, nextStatus);
                }
              }}
            >
              <CheckCircle size={16} className="mr-2" />
              {nextStatusLabel}
            </button>
          )}
        </div>
      </>
    );
  }
};

export default OrderDetailPanel;
