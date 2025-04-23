'use client';

import React, { useState } from 'react';
import { Order } from './OrderListPanel';
import { RotateCcw, Receipt, TruckIcon, CheckCircle, LogOut } from 'lucide-react';
import AccountStatusModal from './AccountStatusModal';
import { DeliveryPerson } from './DeliveryPersonnelPanel';

interface ActionFooterProps {
  selectedOrders: number[];
  orders: Order[];
  onTeslimAl: () => void;
  onVaris: () => void;
  onExit: () => void;
  onGeriAl: () => void;
  waitingPersonnel: DeliveryPerson[];
}

const ActionFooter: React.FC<ActionFooterProps> = ({
  selectedOrders,
  orders,
  onTeslimAl,
  onVaris,
  onExit,
  onGeriAl,
  waitingPersonnel
}) => {
  const [showAccountModal, setShowAccountModal] = useState(false);
  
  // Check if any selected order has the status 'Hazır'
  const hasHazirOrder = selectedOrders.some(id => 
    orders.find(o => o.id === id)?.status === 'Hazır'
  );
  
  // Check if any selected order has the status 'teslimatta'
  const hasTeslimattaOrder = selectedOrders.some(id => 
    orders.find(o => o.id === id)?.status === 'teslimatta'
  );

  // Check if any selected order has the status 'teslimatta' or 'tamamlanmis'
  const hasGeriAlOrder = selectedOrders.some(id => {
    const order = orders.find(o => o.id === id);
    return order?.status === 'teslimatta' || order?.status === 'tamamlanmis';
  });

  return (
    <>
      <div className="bg-gray-200 p-2 flex justify-between items-center">
        <div className="flex gap-2">
          <button 
            onClick={onExit}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md text-sm font-medium flex items-center"
          >
            <LogOut size={16} className="mr-2" />
            ÇIKIŞ
          </button>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={onGeriAl}
            className={`bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-md text-sm font-medium flex items-center ${
              selectedOrders.length === 0 || !hasGeriAlOrder ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={selectedOrders.length === 0 || !hasGeriAlOrder ? true : undefined}
          >
            <RotateCcw size={16} className="mr-2" />
            Geri Al
          </button>
          <button 
            onClick={() => setShowAccountModal(true)}
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-300 px-6 py-2 rounded-md text-sm font-medium flex items-center"
          >
            <Receipt size={16} className="mr-2" />
            Hesap Durumu
          </button>
          <button 
            onClick={onTeslimAl}
            className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium flex items-center ${
              selectedOrders.length === 0 || !hasHazirOrder ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={selectedOrders.length === 0 || !hasHazirOrder ? true : undefined}
          >
            <TruckIcon size={16} className="mr-2" />
            Teslim Al
          </button>
          <button 
            onClick={onVaris}
            className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium flex items-center ${
              selectedOrders.length === 0 || !hasTeslimattaOrder ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={selectedOrders.length === 0 || !hasTeslimattaOrder ? true : undefined}
          >
            <CheckCircle size={16} className="mr-2" />
            Varış
          </button>
        </div>
      </div>

      {/* Account Status Modal */}
      <AccountStatusModal 
        isOpen={showAccountModal}
        onClose={() => setShowAccountModal(false)}
        deliveryPersonnel={waitingPersonnel}
        orders={orders}
      />
    </>
  );
};

export default ActionFooter;
