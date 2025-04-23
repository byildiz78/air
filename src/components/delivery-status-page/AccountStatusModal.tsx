'use client';

import React, { useState } from 'react';
import { X, Calendar, Search, Download, Printer, ChevronDown, CreditCard, Banknote, Check } from 'lucide-react';
import { DeliveryPerson } from './DeliveryPersonnelPanel';

interface Order {
  id: number;
  name: string;
  amount: string;
  status: 'Hazır' | 'teslimatta' | 'tamamlanmis';
  statusColor: string;
  minutes?: number;
  courier?: string;
  paymentMethod?: 'cash' | 'card';
  settled?: boolean;
  date?: string;
}

interface AccountStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  deliveryPersonnel: DeliveryPerson[];
  orders: Order[];
}

const AccountStatusModal: React.FC<AccountStatusModalProps> = ({
  isOpen,
  onClose,
  deliveryPersonnel,
  orders
}) => {
  const [selectedCourierId, setSelectedCourierId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<string>(getTodayDate());
  const [endDate, setEndDate] = useState<string>(getTodayDate());
  const [showSettled, setShowSettled] = useState<boolean>(false);
  const [selectedOrderIds, setSelectedOrderIds] = useState<number[]>([]);

  if (!isOpen) return null;

  // Get today's date in YYYY-MM-DD format
  function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  // Get the selected courier
  const selectedCourier = deliveryPersonnel.find(person => person.id === selectedCourierId);

  // Filter orders for the selected courier within the date range
  const courierOrders = orders.filter(order => {
    // Skip if no courier is selected or if the order doesn't belong to the selected courier
    if (!selectedCourierId || order.courier !== selectedCourier?.name) return false;
    
    // Skip if the order is not completed
    if (order.status !== 'tamamlanmis') return false;
    
    // Skip if we're not showing settled orders and this order is settled
    if (!showSettled && order.settled) return false;
    
    // Check if the order date is within the selected range
    // For demo purposes, we'll just assume all orders are within range
    // In a real app, you would check: order.date >= startDate && order.date <= endDate
    return true;
  });

  // Calculate totals
  const totalCash = courierOrders
    .filter((order: Order) => order.paymentMethod === 'cash')
    .reduce((sum: number, order: Order) => sum + parseFloat(order.amount.replace(',', '.')), 0);
  
  const totalCard = courierOrders
    .filter((order: Order) => order.paymentMethod === 'card')
    .reduce((sum: number, order: Order) => sum + parseFloat(order.amount.replace(',', '.')), 0);
  
  const totalAmount = totalCash + totalCard;

  // Generate sample payment data for demo
  const samplePaymentData: Order[] = courierOrders.length === 0 && selectedCourierId ? [
    { id: 1001, name: 'Ahmet Yılmaz', amount: '248,00', status: 'tamamlanmis', statusColor: '168', paymentMethod: 'cash', date: '2025-04-23' },
    { id: 1002, name: 'Mehmet Demir', amount: '156,50', status: 'tamamlanmis', statusColor: '168', paymentMethod: 'card', date: '2025-04-23' },
    { id: 1003, name: 'Ayşe Kaya', amount: '320,75', status: 'tamamlanmis', statusColor: '168', paymentMethod: 'cash', date: '2025-04-23' },
    { id: 1004, name: 'Fatma Şahin', amount: '195,25', status: 'tamamlanmis', statusColor: '168', paymentMethod: 'cash', date: '2025-04-22' },
    { id: 1005, name: 'Ali Yıldız', amount: '278,00', status: 'tamamlanmis', statusColor: '168', paymentMethod: 'card', date: '2025-04-22' }
  ] : [];

  const displayOrders = courierOrders.length > 0 ? courierOrders : samplePaymentData || [];

  // Calculate sample totals if using sample data
  const sampleTotalCash = samplePaymentData
    ? samplePaymentData.filter((order: Order) => order.paymentMethod === 'cash')
        .reduce((sum: number, order: Order) => sum + parseFloat(order.amount.replace(',', '.')), 0)
    : 0;
  
  const sampleTotalCard = samplePaymentData
    ? samplePaymentData.filter((order: Order) => order.paymentMethod === 'card')
        .reduce((sum: number, order: Order) => sum + parseFloat(order.amount.replace(',', '.')), 0)
    : 0;
  
  const sampleTotalAmount = sampleTotalCash + sampleTotalCard;

  // Use sample data if no real data is available
  const displayTotalCash = courierOrders.length > 0 ? totalCash : sampleTotalCash;
  const displayTotalCard = courierOrders.length > 0 ? totalCard : sampleTotalCard;
  const displayTotalAmount = courierOrders.length > 0 ? totalAmount : sampleTotalAmount;

  // Handle order selection
  const toggleOrderSelection = (orderId: number) => {
    setSelectedOrderIds(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId) 
        : [...prev, orderId]
    );
  };

  // Handle select all orders
  const toggleSelectAll = () => {
    if (selectedOrderIds.length === displayOrders.length) {
      setSelectedOrderIds([]);
    } else {
      setSelectedOrderIds(displayOrders.map(order => order.id));
    }
  };

  // Calculate selected totals
  const selectedOrdersTotalCash = displayOrders
    .filter((order: Order) => selectedOrderIds.includes(order.id) && order.paymentMethod === 'cash')
    .reduce((sum: number, order: Order) => sum + parseFloat(order.amount.replace(',', '.')), 0);
  
  const selectedOrdersTotalCard = displayOrders
    .filter((order: Order) => selectedOrderIds.includes(order.id) && order.paymentMethod === 'card')
    .reduce((sum: number, order: Order) => sum + parseFloat(order.amount.replace(',', '.')), 0);
  
  const selectedOrdersTotalAmount = selectedOrdersTotalCash + selectedOrdersTotalCard;

  // Handle settling selected orders
  const handleSettleOrders = () => {
    // In a real app, you would update the orders in the database
    // For now, we'll just close the modal
    alert(`${selectedOrderIds.length} sipariş hesabı kapatıldı.`);
    setSelectedOrderIds([]);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-white flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Hesap Durumu</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Courier Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kurye Seçin</label>
                <div className="relative">
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={selectedCourierId || ''}
                    onChange={(e) => {
                      setSelectedCourierId(e.target.value ? parseInt(e.target.value) : null);
                      setSelectedOrderIds([]);
                    }}
                  >
                    <option value="">Kurye seçin</option>
                    {deliveryPersonnel.map((person) => (
                      <option key={person.id} value={person.id}>
                        {person.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tarih Aralığı</label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <input
                      type="date"
                      className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <Calendar size={16} className="text-gray-400" />
                    </div>
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="date"
                      className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <Calendar size={16} className="text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Show Settled Toggle */}
              <div className="flex items-end">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={showSettled}
                    onChange={() => setShowSettled(!showSettled)}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-700">Kapatılmış Siparişleri Göster</span>
                </label>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          {selectedCourierId && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-gray-50">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {selectedCourier?.name} - Sipariş Listesi
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Sipariş Ara..."
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            checked={selectedOrderIds.length === displayOrders.length && displayOrders.length > 0}
                            onChange={toggleSelectAll}
                          />
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fiş No
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Müşteri
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tarih
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ödeme Yöntemi
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tutar
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Durum
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {displayOrders.map((order: Order) => (
                      <tr 
                        key={order.id} 
                        className={`hover:bg-gray-50 ${selectedOrderIds.includes(order.id) ? 'bg-blue-50' : ''}`}
                        onClick={() => toggleOrderSelection(order.id)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            checked={selectedOrderIds.includes(order.id)}
                            onChange={(e) => {
                              e.stopPropagation();
                              toggleOrderSelection(order.id);
                            }}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.paymentMethod === 'cash' ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <Banknote size={14} className="mr-1" />
                              Nakit
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              <CreditCard size={14} className="mr-1" />
                              Kart
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          {order.amount} ₺
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.settled ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              <Check size={14} className="mr-1" />
                              Kapatıldı
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Açık
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {selectedCourierId && (
          <div className="border-t bg-gray-50 p-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-col gap-2">
                <div className="text-sm text-gray-500 flex items-center">
                  <span>Seçili Siparişler: {selectedOrderIds.length}</span>
                </div>
                <div className="text-sm text-gray-500 flex items-center">
                  <Banknote size={16} className="mr-2 text-green-600" />
                  <span>Nakit Toplam:</span>
                  <span className="ml-2 font-medium">{selectedOrderIds.length > 0 ? selectedOrdersTotalCash.toFixed(2) : displayTotalCash.toFixed(2)} ₺</span>
                </div>
                <div className="text-sm text-gray-500 flex items-center">
                  <CreditCard size={16} className="mr-2 text-blue-600" />
                  <span>Kart Toplam:</span>
                  <span className="ml-2 font-medium">{selectedOrderIds.length > 0 ? selectedOrdersTotalCard.toFixed(2) : displayTotalCard.toFixed(2)} ₺</span>
                </div>
                <div className="text-sm font-medium flex items-center">
                  <span>Genel Toplam:</span>
                  <span className="ml-2 font-medium">{selectedOrderIds.length > 0 ? selectedOrdersTotalAmount.toFixed(2) : displayTotalAmount.toFixed(2)} ₺</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md flex items-center text-sm">
                  <Printer size={16} className="mr-2" />
                  Yazdır
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md flex items-center text-sm">
                  <Download size={16} className="mr-2" />
                  Dışa Aktar
                </button>
                <button 
                  className={`px-4 py-2 bg-blue-600 text-white rounded-md flex items-center text-sm ${selectedOrderIds.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={selectedOrderIds.length === 0}
                  onClick={handleSettleOrders}
                >
                  Hesabı Kapat
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountStatusModal;
