import React, { useState } from 'react';
import { Clock, User, MapPin, AlertTriangle, CheckCircle, Coffee, Eye } from 'lucide-react';
import { Order, OrderItem } from '../../types';

interface OrderCardProps {
  order: Order;
  urgency: 'normal' | 'warning' | 'critical';
  onSelect: () => void;
  onStatusChange: (orderId: string, newStatus: Order['status']) => void;
  onShowDetails: (order: Order) => void;
  viewMode: 'grid' | 'list';
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  urgency,
  onSelect,
  onStatusChange,
  onShowDetails,
  viewMode
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
      return `${diffMinutes} dk`;
    } else {
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;
      return `${hours} sa ${minutes} dk`;
    }
  };

  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

  // Get next status based on current status
  const getNextStatus = (): string | null => {
    const statusFlow: Record<string, string> = {
      'pending': 'in-progress',
      'in-progress': 'ready',
      'ready': 'completed'
    };
    return statusFlow[order.status] || null;
  };

  // Toggle item completion status
  const toggleItemStatus = (itemIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();
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

  // Handle show details button click
  const handleShowDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShowDetails(order);
  };

  // Determine if order is from a specific location
  const getOrderSource = (): string => {
    if (order.type === 'dine-in') {
      return `Masa: ${order.tableId}`;
    } else if (order.type === 'delivery') {
      return `Kurye: ${order.deliveryAddress ? '✓' : '?'}`;
    } else {
      return 'Gelir Merkezi';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header with order number and time */}
      <div className="bg-gray-100 px-4 py-2 flex justify-between items-center border-b border-gray-200">
        <div className="flex items-center">
          <span className="font-bold text-gray-700">#{order.orderNumber}</span>
          {order.priority > 1 && (
            <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              !
            </span>
          )}
        </div>
        <div className="text-gray-500 text-sm flex items-center">
          <Clock size={14} className="mr-1" />
          <span>{getTimeElapsed()}</span>
        </div>
      </div>
      
      {/* Order source info */}
      <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          {getOrderSource()}
        </div>
        <div className="text-sm text-gray-600">
          {order.type === 'dine-in' ? `Kurye: ${order.waiter || '-'}` : `${order.customerName || 'Müşteri'}`}
        </div>
      </div>
      
      {/* Order items */}
      <div className="px-4 py-3">
        <ul className="space-y-3">
          {order.items.map((item, index) => (
            <li 
              key={index} 
              className="flex justify-between items-center"
              onClick={(e) => toggleItemStatus(index, e)}
            >
              <div className="flex items-center">
                <span className="text-gray-700 font-medium mr-2">{item.quantity}</span>
                <span className={itemStatus[`${order.id}-${index}`] ? 'text-gray-400' : 'text-gray-800'}>
                  {item.name}
                </span>
              </div>
              <div className="w-6 h-6">
                {itemStatus[`${order.id}-${index}`] && (
                  <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Footer with action buttons */}
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex items-center justify-between">
        <div></div>
        
        <div className="flex space-x-2">
          {order.status === 'pending' && (
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange(order.id, 'in-progress');
              }}
            >
              Hazırla
            </button>
          )}
          
          {order.status === 'in-progress' && (
            <button
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange(order.id, 'ready');
              }}
            >
              Hazırlandı
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
