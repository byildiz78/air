'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Filter, Search, CheckCircle, ChevronRight, Check, CheckSquare, Square } from 'lucide-react';

// Define types for the order data
export interface Order {
  id: number;
  name: string;
  amount: string;
  status: 'Hazır' | 'teslimatta' | 'tamamlanmis';
  statusColor: string;
  minutes?: number;
  courier?: string;
}

interface OrderListPanelProps {
  orders: Order[];
  filteredOrders: Order[];
  selectedOrders: number[];
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  toggleOrderSelection: (orderId: number) => void;
  selectAllOrders: () => void;
  selectedPersonId: number | null;
}

const OrderListPanel: React.FC<OrderListPanelProps> = ({
  orders,
  filteredOrders,
  selectedOrders,
  filterStatus,
  setFilterStatus,
  toggleOrderSelection,
  selectAllOrders,
  selectedPersonId
}) => {
  // Function to get status text and color
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'Hazır':
        return { text: 'Hazır', bgColor: 'bg-green-500', textColor: 'text-white' };
      case 'teslimatta':
        return { text: 'Teslimatta', bgColor: 'bg-yellow-500', textColor: 'text-white' };
      case 'tamamlanmis':
        return { text: 'Tamamlanmış', bgColor: 'bg-blue-500', textColor: 'text-white' };
      default:
        return { text: 'BİLİNMİYOR', bgColor: 'bg-gray-500', textColor: 'text-white' };
    }
  };

  // Calculate statistics for the analysis tab
  const totalOrders = orders.length;
  const hazirOrders = orders.filter(order => order.status === 'Hazır').length;
  const teslimattaOrders = orders.filter(order => order.status === 'teslimatta').length;
  const tamamlanmisOrders = orders.filter(order => order.status === 'tamamlanmis').length;

  // Get the current date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  // State for search input
  const [searchTerm, setSearchTerm] = useState('');

  // Reference for the barcode input field
  const barcodeInputRef = useRef<HTMLInputElement>(null);

  // Focus the barcode input on initial render
  useEffect(() => {
    focusBarcodeInput();
  }, []);

  // Focus the barcode input after filter status changes
  useEffect(() => {
    focusBarcodeInput();
  }, [filterStatus]);

  // Function to focus the barcode input
  const focusBarcodeInput = () => {
    if (barcodeInputRef.current) {
      barcodeInputRef.current.focus();
    }
  };

  // Function to handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Function to handle barcode scanning (Enter key press)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      // Try to find an order with the matching ID
      const orderId = parseInt(searchTerm);
      if (!isNaN(orderId)) {
        const matchingOrder = orders.find(order => order.id === orderId);
        if (matchingOrder) {
          // Add to selection without clearing previous selections
          if (!selectedOrders.includes(orderId)) {
            toggleOrderSelection(orderId);
          }
          
          // Set filter status to match the order's status if not already on that tab
          if (filterStatus !== matchingOrder.status) {
            setFilterStatus(matchingOrder.status);
          }
        }
      }
      
      // Clear the search input
      setSearchTerm('');
      
      // Re-focus the input
      setTimeout(focusBarcodeInput, 0);
    }
  };

  return (
    <div className="w-[calc(75%-200px)] flex flex-col overflow-hidden bg-gray-100">
      {/* Filter Tabs */}
      <div className="bg-gradient-to-r from-gray-200 to-gray-100 flex p-2 shadow-sm">
        <button 
          className={`px-4 py-2 text-xs font-medium rounded-md transition-all flex items-center ${
            filterStatus === 'Hazır' 
              ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-md' 
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
          }`}
          onClick={() => setFilterStatus('Hazır')}
        >
          <CheckCircle size={12} className="mr-1" />
          Hazır
        </button>
        <button 
          className={`px-4 py-2 text-xs font-medium rounded-md ml-2 transition-all flex items-center ${
            filterStatus === 'teslimatta' 
              ? 'bg-gradient-to-r from-yellow-600 to-yellow-500 text-white shadow-md' 
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
          }`}
          onClick={() => setFilterStatus('teslimatta')}
        >
          <ChevronRight size={12} className="mr-1" />
          Teslimatta
        </button>
        <button 
          className={`px-4 py-2 text-xs font-medium rounded-md ml-2 transition-all flex items-center ${
            filterStatus === 'tamamlanmis' 
              ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md' 
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
          }`}
          onClick={() => setFilterStatus('tamamlanmis')}
        >
          <Check size={12} className="mr-1" />
          Tamamlanmış
        </button>
        
        <div className="ml-auto flex items-center">
          <div className="bg-white px-3 py-1 rounded-md border border-gray-300 text-xs font-medium text-gray-700 flex items-center">
            <span className="mr-2">Toplam: {filteredOrders.length}</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
              {selectedOrders.length} Seçili
            </span>
          </div>
          
          <button 
            className={`px-4 py-2 text-xs font-medium rounded-md ml-2 transition-all flex items-center ${
              filterStatus === 'all' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
            onClick={() => setFilterStatus('all')}
          >
            <Filter size={12} className="mr-1" />
            Analiz
          </button>
        </div>
      </div>
      
      {/* Barcode Search and Selection Controls */}
      <div className="p-2 flex items-center gap-2 bg-white border-b border-gray-200">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder="BARKOD"
            className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
            ref={barcodeInputRef}
          />
          <button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-gray-200 p-1 rounded-md">
            <Search size={16} />
          </button>
        </div>
        
        <button 
          onClick={selectAllOrders}
          className="flex items-center bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-300 px-3 py-1.5 rounded-md text-xs font-medium transition-all"
        >
          {selectedOrders.length === filteredOrders.length && filteredOrders.length > 0 ? (
            <>
              <Square size={14} className="mr-1" />
              SEÇİMİ KALDIR
            </>
          ) : (
            <>
              <CheckSquare size={14} className="mr-1" />
              TÜMÜNÜ SEÇ
            </>
          )}
        </button>
      </div>
      
      {/* Order List or Analysis View */}
      {filterStatus === 'all' ? (
        <div className="flex-1 overflow-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-bold">Paket Durumu Analizi</div>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                value={formattedDate}
                readOnly
                className="border border-gray-300 rounded px-2 py-1 text-center text-sm"
              />
              <span>-</span>
              <input 
                type="text" 
                value={formattedDate}
                readOnly
                className="border border-gray-300 rounded px-2 py-1 text-center text-sm"
              />
              <button className="bg-green-500 text-white p-2 rounded">
                <Check size={16} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-black text-white p-2">
              <div className="text-center text-xs font-bold mb-1">TOPLAM PAKET</div>
              <div className="text-center text-4xl font-bold">{totalOrders}</div>
            </div>
            <div className="bg-black text-white p-2">
              <div className="text-center text-xs font-bold mb-1">Hazır PAKET</div>
              <div className="text-center text-4xl font-bold">{hazirOrders}</div>
            </div>
            <div className="bg-black text-white p-2">
              <div className="text-center text-xs font-bold mb-1">Teslimatta PAKET</div>
              <div className="text-center text-4xl font-bold">{teslimattaOrders}</div>
            </div>
            <div className="bg-black text-white p-2">
              <div className="text-center text-xs font-bold mb-1">Tamamlanmış PAKET</div>
              <div className="text-center text-4xl font-bold">{tamamlanmisOrders}</div>
            </div>
          </div>
          
          <div className="flex justify-between mb-2">
            <div className="text-sm font-bold">8 DK ÜSTÜ BEKLEYENLER</div>
            <div className="text-sm font-bold">20 DK ÜSTÜ HALA TESLİM EDİLMEMİŞLER</div>
          </div>
          
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase border-r">ÇEK NO</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase border-r">ADI</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase border-r">SOKAK</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase border-r">CADDE</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">ALINDI</th>
              </tr>
            </thead>
            <tbody>
              {/* Empty rows for demonstration */}
              <tr className="border-t">
                <td colSpan={6} className="px-4 py-20"></td>
              </tr>
            </tbody>
          </table>
          
          <div className="mt-4 text-right text-sm font-bold">
            0 ADET
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-auto p-2">
          <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">
            <thead className="bg-gradient-to-r from-gray-100 to-gray-50">
              <tr>
                <th className="w-10 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seç
                </th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fiş No
                </th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Müşteri
                </th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Süre
                </th>
                <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tutar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => {
                const isSelected = selectedOrders.includes(order.id);
                const statusInfo = getStatusInfo(order.status);
                
                return (
                  <tr 
                    key={order.id}
                    onClick={() => toggleOrderSelection(order.id)}
                    className={`cursor-pointer transition-all ${
                      isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                    } ${
                      order.status === 'Hazır' ? 'bg-green-50 hover:bg-green-100' : 
                      order.status === 'teslimatta' ? 'bg-yellow-50 hover:bg-yellow-100' : 
                      order.status === 'tamamlanmis' ? 'bg-blue-50 hover:bg-blue-100' : ''
                    }`}
                  >
                    <td className="px-2 py-2 whitespace-nowrap">
                      <div className="flex items-center justify-center">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected 
                            ? 'border-blue-500 bg-blue-500 shadow-sm' 
                            : 'border-gray-300 hover:border-blue-400'
                        }`}>
                          {isSelected && <Check size={12} className="text-white" />}
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order.id}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                      {order.name}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      {order.status === 'Hazır' ? (
                        <div className="flex items-center">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800`}>
                            {order.minutes} dk
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col">
                          <span className={`text-xs font-medium ${
                            order.status === 'teslimatta' ? 'text-yellow-600' : 'text-blue-600'
                          }`}>
                            {order.minutes} dk
                          </span>
                          {order.courier && (
                            <span className="text-xs text-gray-500 mt-1">
                              {order.courier}
                            </span>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                      {order.amount} ₺
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderListPanel;
