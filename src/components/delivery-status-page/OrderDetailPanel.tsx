'use client';

import React, { useState } from 'react';
import { OrderItem } from '../../types';
import SimpleOrderView from './SimpleOrderView';
import { ShoppingCart, ArrowLeft, Map } from 'lucide-react';
import MapModal from './MapModal';
import { Order } from './OrderListPanel';

interface OrderDetailPanelProps {
  selectedOrders: number[];
  orderItems: OrderItem[];
  orders: Order[];
}

const OrderDetailPanel: React.FC<OrderDetailPanelProps> = ({
  selectedOrders,
  orderItems,
  orders
}) => {
  const [showMapModal, setShowMapModal] = useState(false);
  
  // Get the first selected order for the map modal
  const selectedOrder = selectedOrders.length > 0 
    ? orders.find(o => o.id === selectedOrders[0]) || null
    : null;

  return (
    <>
      <div className="w-[25%] bg-white">
        {selectedOrders.length > 0 ? (
          <div className="h-full flex flex-col">
            <div className="p-3 bg-gray-100 border-b border-gray-200">
              <h3 className="text-sm font-medium">SİPARİŞ DETAYI</h3>
              <div className="text-xs text-gray-600 mt-1">
                <p>Robotpos</p>
                <p>Çek No: {selectedOrders[0]}</p>
                <p>Telefon: -</p>
                {selectedOrders.length > 1 && (
                  <p className="text-blue-600 font-medium mt-1">+ {selectedOrders.length - 1} sipariş daha seçildi</p>
                )}
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <SimpleOrderView 
                orderItems={orderItems}
                tableId={selectedOrders[0].toString()}
              />
            </div>
            <div className="p-3 bg-gray-100 border-t border-gray-200">
              <div className="flex justify-end">
                <button 
                  onClick={() => setShowMapModal(true)}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-300 px-4 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <Map size={16} className="mr-2" />
                  Haritada Göster
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center bg-gray-50 p-6">
            <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-xs">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <ShoppingCart size={40} className="text-blue-500" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Sipariş Seçilmedi</h3>
              <p className="text-gray-600 mb-4">
                Sipariş detayını görüntülemek için sol taraftan bir sipariş seçin
              </p>
              <div className="flex items-center justify-center text-blue-600 text-sm">
                <ArrowLeft size={16} className="mr-1" />
                <span>Listeden sipariş seçin</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Map Modal */}
      <MapModal 
        isOpen={showMapModal} 
        onClose={() => setShowMapModal(false)} 
        order={selectedOrder}
      />
    </>
  );
};

export default OrderDetailPanel;
