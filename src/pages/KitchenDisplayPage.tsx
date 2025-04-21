import React, { useState, useEffect } from 'react';
import KitchenDisplayHeader from '../components/kitchen-display/KitchenDisplayHeader';
import OrdersGrid from '../components/kitchen-display/OrdersGrid';
import OrderDetailPanel from '../components/kitchen-display/OrderDetailPanel';
import KitchenDisplayFilters from '../components/kitchen-display/KitchenDisplayFilters';
import KitchenDisplayStats from '../components/kitchen-display/KitchenDisplayStats';
import { mockOrders } from '../data/mockOrders'; // Temporary mock data
import { Order, OrderItem, KitchenDisplaySettings } from '../types';

// Geçici tip tanımlamaları
interface OrderOption {
  name: string;
  value: string;
}

const KitchenDisplayPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [settings, setSettings] = useState<KitchenDisplaySettings>({
    showCompletedOrders: false,
    autoRefreshInterval: 30, // seconds
    sortBy: 'time',
    groupBy: 'status',
    viewMode: 'grid',
    alertThreshold: 10, // minutes
    criticalThreshold: 20, // minutes
  });
  const [filters, setFilters] = useState({
    status: ['pending', 'in-progress', 'ready'],
    orderTypes: ['dine-in', 'takeaway', 'delivery'],
    timeRange: 'all', // Varsayılan değer, artık UI'da gösterilmiyor
  });

  // Auto-refresh orders
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, this would fetch from API
      // For now, just simulate by updating the timestamps
      setOrders(prevOrders => 
        prevOrders.map(order => ({
          ...order,
          lastUpdated: new Date().toISOString(),
        }))
      );
    }, settings.autoRefreshInterval * 1000);

    return () => clearInterval(interval);
  }, [settings.autoRefreshInterval]);

  // Filter and sort orders based on settings and filters
  const filteredOrders = orders.filter(order => {
    // Filter by status
    if (!filters.status.includes(order.status)) return false;
    
    // Filter by order type
    if (!filters.orderTypes.includes(order.type)) return false;
    
    // Don't show completed orders unless setting is enabled
    if (order.status === 'completed' && !settings.showCompletedOrders) return false;
    
    return true;
  });

  // Sort orders based on settings
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (settings.sortBy === 'time') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (settings.sortBy === 'priority') {
      return b.priority - a.priority;
    } else if (settings.sortBy === 'table') {
      return a.tableId.localeCompare(b.tableId);
    }
    return 0;
  });

  // Group orders if needed
  const groupedOrders = settings.groupBy === 'none' 
    ? { 'All Orders': sortedOrders } 
    : sortedOrders.reduce((groups, order) => {
        const key = settings.groupBy === 'status' 
          ? order.status 
          : settings.groupBy === 'type' 
            ? order.type 
            : 'Other';
        
        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(order);
        return groups;
      }, {} as Record<string, Order[]>);

  const handleShowOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const handleCloseOrderDetails = () => {
    setShowDetailModal(false);
  };

  const handleStatusChange = (orderId: string, newStatus: 'pending' | 'in-progress' | 'ready' | 'completed' | 'cancelled') => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus, lastUpdated: new Date().toISOString() } 
          : order
      )
    );
    
    // Update selected order if it's the one being changed
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => prev ? { ...prev, status: newStatus, lastUpdated: new Date().toISOString() } : null);
    }
  };

  const handleSettingsChange = (newSettings: Partial<KitchenDisplaySettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const handleFiltersChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <KitchenDisplayHeader 
        settings={settings} 
        onSettingsChange={handleSettingsChange} 
      />
      
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col w-52 bg-white border-r border-gray-200 p-4">
          <KitchenDisplayFilters 
            filters={filters} 
            onFiltersChange={handleFiltersChange} 
          />
          <div className="mt-auto">
            <KitchenDisplayStats orders={filteredOrders} />
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-4">
          <OrdersGrid 
            groupedOrders={groupedOrders} 
            onShowDetails={handleShowOrderDetails}
            onStatusChange={handleStatusChange}
            settings={settings}
          />
        </div>
        
        {/* Modal sipariş detayları */}
        {showDetailModal && selectedOrder && (
          <OrderDetailPanel 
            order={selectedOrder} 
            onStatusChange={handleStatusChange} 
            onClose={handleCloseOrderDetails}
            isModal={true}
          />
        )}
      </div>
    </div>
  );
};

export default KitchenDisplayPage;
