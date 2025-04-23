'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { OrderItem } from '../../types';

// Import our new components
import DeliveryPersonnelPanel, { DeliveryPerson, PersonOnLeave } from './DeliveryPersonnelPanel';
import OrderListPanel, { Order } from './OrderListPanel';
import OrderDetailPanel from './OrderDetailPanel';
import ConfirmationModal from './ConfirmationModal';
import ActionFooter from './ActionFooter';

const DeliveryStatusPage: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Hazır');
  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
  const [activePersonnelTab, setActivePersonnelTab] = useState<string>('waiting');
  const [selectedPersonId, setSelectedPersonId] = useState<number | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMode, setConfirmationMode] = useState<'Teslim Al' | 'varis' | 'geriAl' | null>(null);
  const [barcodeInputValue, setBarcodeInputValue] = useState('');
  const barcodeInputRef = useRef<HTMLInputElement | null>(null);

  // Sample data based on the image
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, name: 'Robotpos', amount: '194,00', status: 'Hazır', statusColor: '195', minutes: 5 },
    { id: 2, name: 'Robotpos', amount: '194,00', status: 'Hazır', statusColor: '194', minutes: 7 },
    { id: 3, name: 'Robotpos', amount: '194,00', status: 'Hazır', statusColor: '194', minutes: 3 },
    { id: 4, name: 'Robotpos', amount: '242,00', status: 'Hazır', statusColor: '194', minutes: 8 },
    { id: 8, name: 'Robotpos', amount: '272,00', status: 'Hazır', statusColor: '194', minutes: 2 },
    { id: 13, name: 'Robotpos', amount: '272,00', status: 'Hazır', statusColor: '194', minutes: 6 },
    { id: 14, name: 'Robotpos', amount: '199,00', status: 'teslimatta', statusColor: '194', minutes: 12, courier: 'Ahmet Y.' },
    { id: 16, name: 'Robotpos', amount: '194,00', status: 'teslimatta', statusColor: '194', minutes: 15, courier: 'Mehmet D.' },
    { id: 28, name: 'Robotpos', amount: '258,00', status: 'teslimatta', statusColor: '194', minutes: 18, courier: 'Ali K.' },
    { id: 29, name: 'Robotpos', amount: '272,00', status: 'teslimatta', statusColor: '194', minutes: 20, courier: 'Ahmet Y.' },
    { id: 31, name: 'Robotpos', amount: '442,00', status: 'teslimatta', statusColor: '194', minutes: 25, courier: 'Mehmet D.' },
    { id: 5, name: '5', amount: '180,00', status: 'tamamlanmis', statusColor: '181', minutes: 32, courier: 'Ali K.' },
    { id: 1236, name: '1236', amount: '210,00', status: 'tamamlanmis', statusColor: '181', minutes: 28, courier: 'Ahmet Y.' },
    { id: 1001, name: 'ahmet yılmaz', amount: '248,00', status: 'tamamlanmis', statusColor: '168', minutes: 35, courier: 'Mehmet D.' },
  ]);

  // Sample waiting delivery personnel
  const waitingPersonnel: DeliveryPerson[] = [
    { id: 1, name: 'Ahmet Yılmaz', status: 'available', waitingSince: '09:15', deliveries: 5 },
    { id: 2, name: 'Mehmet Demir', status: 'delivering', waitingSince: '10:30', deliveries: 3 },
    { id: 3, name: 'Ali Kaya', status: 'available', waitingSince: '11:45', deliveries: 7 },
    { id: 4, name: 'Ayşe Yıldız', status: 'available', waitingSince: '12:20', deliveries: 2 },
  ];

  // Sample personnel on leave
  const personnelOnLeave: PersonOnLeave[] = [
    { id: 5, name: 'Fatma Şahin', reason: 'Annual Leave', until: '28 April' },
    { id: 6, name: 'Mustafa Öztürk', reason: 'Sick Leave', until: '25 April' },
    { id: 7, name: 'Zeynep Kara', reason: 'Personal Day', until: '24 April' },
  ];

  // Filter orders based on status and search term
  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'Hazır' && order.status === 'Hazır') ||
      (filterStatus === 'teslimatta' && order.status === 'teslimatta') ||
      (filterStatus === 'tamamlanmis' && order.status === 'tamamlanmis');
    
    const matchesSearch = searchTerm === '' || 
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm);
    
    return matchesStatus && matchesSearch;
  });

  // Sample order items for the SimpleOrderView component
  const sampleOrderItems: OrderItem[] = [
    { productId: '1', name: 'Hamburger', price: 120, quantity: 1 },
    { productId: '2', name: 'Patates Kızartması', price: 45, quantity: 1 },
    { productId: '3', name: 'Kola', price: 29, quantity: 1 },
  ];

  // Toggle order selection
  const toggleOrderSelection = (orderId: number) => {
    setSelectedOrders(prev => {
      if (prev.includes(orderId)) {
        return prev.filter(id => id !== orderId);
      } else {
        return [...prev, orderId];
      }
    });
  };

  // Select all orders
  const selectAllOrders = () => {
    if (selectedOrders.length === filteredOrders.length) {
      // If all are selected, deselect all
      setSelectedOrders([]);
    } else {
      // Otherwise, select all filtered orders
      setSelectedOrders(filteredOrders.map(order => order.id));
    }
  };

  // Get the selected courier name
  const selectedCourierName = waitingPersonnel.find(p => p.id === selectedPersonId)?.name || '';

  // Handle confirmation for "TESLİM AL" action
  const handleTeslimAl = () => {
    setConfirmationMode('Teslim Al');
  };

  // Handle confirmation for "VARIŞ" action
  const handleVaris = () => {
    setConfirmationMode('varis');
  };

  // Handle confirmation for "GERİ AL" action
  const handleGeriAl = () => {
    setConfirmationMode('geriAl');
  };

  // Handle confirmation
  const handleConfirm = () => {
    if (confirmationMode === 'Teslim Al') {
      // Update the status of selected orders to "teslimatta" and assign the courier
      setOrders(prevOrders => 
        prevOrders.map(order => 
          selectedOrders.includes(order.id) && order.status === 'Hazır'
            ? { ...order, status: 'teslimatta', statusColor: 'warning', courier: selectedCourierName }
            : order
        )
      );
    } else if (confirmationMode === 'varis') {
      // Update the status of selected orders to "tamamlanmis"
      setOrders(prevOrders => 
        prevOrders.map(order => 
          selectedOrders.includes(order.id) && order.status === 'teslimatta'
            ? { ...order, status: 'tamamlanmis', statusColor: 'success' }
            : order
        )
      );
    } else if (confirmationMode === 'geriAl') {
      // Update the status of selected orders back to "Hazır" and remove courier assignment
      setOrders(prevOrders => 
        prevOrders.map(order => 
          selectedOrders.includes(order.id) && (order.status === 'teslimatta' || order.status === 'tamamlanmis')
            ? { ...order, status: 'Hazır', statusColor: 'danger', courier: undefined }
            : order
        )
      );
    }

    // Clear selected orders and close confirmation modal
    setSelectedOrders([]);
    setConfirmationMode(null);

    // Refocus the barcode input after confirmation
    setTimeout(() => {
      if (barcodeInputRef.current) {
        barcodeInputRef.current.focus();
      }
    }, 100);
  };

  // Cancel confirmation
  const cancelConfirmation = () => {
    setConfirmationMode(null);
    
    // Focus the barcode input
    setTimeout(() => {
      if (barcodeInputRef.current) {
        barcodeInputRef.current.focus();
      }
    }, 0);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Main Content - Three Column Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Column - Personnel List */}
        <DeliveryPersonnelPanel 
          waitingPersonnel={waitingPersonnel}
          personnelOnLeave={personnelOnLeave}
          activeTab={activePersonnelTab}
          onTabChange={(tab) => setActivePersonnelTab(tab)}
          selectedPersonId={selectedPersonId}
          onSelectPerson={(id) => setSelectedPersonId(id)}
        />
        
        {/* Middle Column - Order List Panel */}
        <OrderListPanel
          orders={orders}
          filteredOrders={filteredOrders}
          selectedOrders={selectedOrders}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          toggleOrderSelection={toggleOrderSelection}
          selectAllOrders={selectAllOrders}
          selectedPersonId={selectedPersonId}
        />
        
        {/* Right Column - Order Detail Panel */}
        <OrderDetailPanel 
          selectedOrders={selectedOrders}
          orderItems={sampleOrderItems}
          orders={orders}
        />
      </div>
      
      {/* Footer */}
      <ActionFooter
        selectedOrders={selectedOrders}
        orders={orders}
        onTeslimAl={handleTeslimAl}
        onVaris={handleVaris}
        onGeriAl={handleGeriAl}
        onExit={() => router.back()}
        waitingPersonnel={waitingPersonnel}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal 
        show={confirmationMode !== null}
        action={confirmationMode}
        orderCount={selectedOrders.length}
        onConfirm={handleConfirm}
        onCancel={cancelConfirmation}
        selectedCourierName={selectedCourierName}
      />
    </div>
  );
};

export default DeliveryStatusPage;
