import React from 'react';
import { PieChart, Clock, AlertTriangle } from 'lucide-react';
import { Order } from '../../types';

interface KitchenDisplayStatsProps {
  orders: Order[];
}

const KitchenDisplayStats: React.FC<KitchenDisplayStatsProps> = ({ orders }) => {
  // Calculate statistics
  const totalOrders = orders.length;
  
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const inProgressOrders = orders.filter(order => order.status === 'in-progress').length;
  const readyOrders = orders.filter(order => order.status === 'ready').length;
  
  // Calculate average preparation time (in minutes)
  const getPreparationTime = (order: Order): number => {
    if (order.status === 'ready' || order.status === 'completed') {
      const startTime = new Date(order.createdAt).getTime();
      const endTime = new Date(order.lastUpdated).getTime();
      return Math.floor((endTime - startTime) / (1000 * 60));
    }
    return 0;
  };
  
  const completedOrders = orders.filter(order => 
    order.status === 'ready' || order.status === 'completed'
  );
  
  const totalPrepTime = completedOrders.reduce((sum, order) => sum + getPreparationTime(order), 0);
  const avgPrepTime = completedOrders.length > 0 
    ? Math.floor(totalPrepTime / completedOrders.length) 
    : 0;
  
  // Calculate delayed orders (more than 20 minutes old and not completed)
  const delayedOrders = orders.filter(order => {
    if (order.status === 'completed') return false;
    
    const orderTime = new Date(order.createdAt).getTime();
    const now = new Date().getTime();
    const diffMinutes = Math.floor((now - orderTime) / (1000 * 60));
    
    return diffMinutes > 20;
  }).length;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center mb-4">
        <PieChart size={18} className="mr-2 text-gray-500" />
        <h2 className="text-lg font-medium">İstatistikler</h2>
      </div>
      
      <div className="space-y-4">
        {/* Order counts */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-500">Toplam Sipariş</span>
            <span className="font-medium">{totalOrders}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-yellow-500 font-medium">{pendingOrders}</div>
            <div className="text-xs text-gray-500">Beklemede</div>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-blue-500 font-medium">{inProgressOrders}</div>
            <div className="text-xs text-gray-500">Hazırlanıyor</div>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-green-500 font-medium">{readyOrders}</div>
            <div className="text-xs text-gray-500">Hazır</div>
          </div>
        </div>
        
        {/* Average preparation time */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600">
            <Clock size={16} className="mr-1" />
            <span className="text-sm">Ortalama Hazırlama</span>
          </div>
          <span className="font-medium">{avgPrepTime} dk</span>
        </div>
        
        {/* Delayed orders */}
        {delayedOrders > 0 && (
          <div className="flex items-center justify-between text-red-600">
            <div className="flex items-center">
              <AlertTriangle size={16} className="mr-1" />
              <span className="text-sm">Geciken Siparişler</span>
            </div>
            <span className="font-medium">{delayedOrders}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default KitchenDisplayStats;
