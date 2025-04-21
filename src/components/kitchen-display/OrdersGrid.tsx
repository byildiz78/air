import React from 'react';
import OrderCard from './OrderCard';
import { Order, OrderItem, KitchenDisplaySettings } from '../../types';

// Geçici tip tanımlamaları
interface OrderOption {
  name: string;
  value: string;
}

interface OrdersGridProps {
  groupedOrders: Record<string, Order[]>;
  onStatusChange: (orderId: string, newStatus: Order['status']) => void;
  onShowDetails: (order: Order) => void;
  settings: KitchenDisplaySettings;
}

const OrdersGrid: React.FC<OrdersGridProps> = ({
  groupedOrders,
  onStatusChange,
  onShowDetails,
  settings
}) => {
  // Function to determine order urgency based on time elapsed
  const getOrderUrgency = (order: Order): 'normal' | 'warning' | 'critical' => {
    const orderTime = new Date(order.createdAt).getTime();
    const now = new Date().getTime();
    const minutesElapsed = Math.floor((now - orderTime) / (1000 * 60));
    
    if (minutesElapsed >= settings.criticalThreshold) {
      return 'critical';
    } else if (minutesElapsed >= settings.alertThreshold) {
      return 'warning';
    }
    return 'normal';
  };

  // Function to translate group names to Turkish
  const translateGroupName = (name: string): string => {
    const translations: Record<string, string> = {
      'pending': 'Beklemede',
      'in-progress': 'Hazırlanıyor',
      'ready': 'Hazır',
      'completed': 'Tamamlandı',
      'cancelled': 'İptal Edildi',
      'dine-in': 'Masa Servis',
      'takeaway': 'Paket Servis',
      'delivery': 'Kurye',
      'All Orders': 'Tüm Siparişler'
    };
    return translations[name] || name;
  };

  return (
    <div className="space-y-8">
      {Object.entries(groupedOrders).map(([groupName, orders]) => (
        <div key={groupName} className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            {translateGroupName(groupName)}
            <span className="ml-2 bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-sm">
              {orders.length}
            </span>
          </h2>
          
          <div className={`grid ${settings.viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6' : 'grid-cols-1 gap-4'}`}>
            {orders.map(order => (
              <OrderCard
                key={order.id}
                order={order}
                urgency={getOrderUrgency(order)}
                onSelect={() => {}} // Boş fonksiyon, artık kullanılmıyor
                onShowDetails={onShowDetails}
                onStatusChange={onStatusChange}
                viewMode={settings.viewMode}
              />
            ))}
          </div>
        </div>
      ))}
      
      {Object.keys(groupedOrders).length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Gösterilecek sipariş bulunamadı.</p>
          <p className="text-gray-400">Filtrelerinizi değiştirmeyi deneyin.</p>
        </div>
      )}
    </div>
  );
};

export default OrdersGrid;
