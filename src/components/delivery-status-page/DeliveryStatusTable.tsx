'use client';

import React, { useState } from 'react';
import { ChevronUp, ChevronDown, MoreHorizontal, Phone } from 'lucide-react';

interface Order {
  id: number;
  name: string;
  street?: string;
  avenue?: string;
  amount: string;
  status: 'Hazır' | 'teslimatta' | 'tamamlanmis';
  statusColor: string;
}

interface DeliveryStatusTableProps {
  filterStatus: string;
  searchTerm: string;
}

const DeliveryStatusTable: React.FC<DeliveryStatusTableProps> = ({ filterStatus, searchTerm }) => {
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  
  // Sample data based on the image
  const orders: Order[] = [
    { id: 1, name: 'Robotpos', amount: '194,00', status: 'Hazır', statusColor: '195' },
    { id: 2, name: 'Robotpos', amount: '194,00', status: 'teslimatta', statusColor: '194' },
    { id: 3, name: 'Robotpos', amount: '194,00', status: 'teslimatta', statusColor: '194' },
    { id: 4, name: 'Robotpos', amount: '242,00', status: 'teslimatta', statusColor: '194' },
    { id: 8, name: 'Robotpos', amount: '272,00', status: 'teslimatta', statusColor: '194' },
    { id: 13, name: 'Robotpos', amount: '272,00', status: 'teslimatta', statusColor: '194' },
    { id: 14, name: 'Robotpos', amount: '199,00', status: 'teslimatta', statusColor: '194' },
    { id: 16, name: 'Robotpos', amount: '194,00', status: 'teslimatta', statusColor: '194' },
    { id: 28, name: 'Robotpos', amount: '258,00', status: 'teslimatta', statusColor: '194' },
    { id: 29, name: 'Robotpos', amount: '272,00', status: 'teslimatta', statusColor: '194' },
    { id: 31, name: 'Robotpos', amount: '442,00', status: 'teslimatta', statusColor: '194' },
    { id: 5, name: '5', amount: '180,00', status: 'tamamlanmis', statusColor: '181' },
    { id: 1236, name: '1236', amount: '210,00', status: 'tamamlanmis', statusColor: '181' },
    { id: 1001, name: 'ahmet yılmaz', amount: '248,00', status: 'tamamlanmis', statusColor: '168' },
  ];

  // Filter orders based on status and search term
  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = searchTerm === '' || 
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm);
    
    return matchesStatus && matchesSearch;
  });

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

  // Function to toggle order details
  const toggleOrderDetails = (id: number) => {
    if (selectedOrder === id) {
      setSelectedOrder(null);
    } else {
      setSelectedOrder(id);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-800 text-white">
        <thead>
          <tr className="text-left text-gray-400 border-b border-gray-700">
            <th className="px-4 py-3 w-16">FİŞ</th>
            <th className="px-4 py-3">ADI</th>
            <th className="px-4 py-3">SOKAK</th>
            <th className="px-4 py-3">CADDE</th>
            <th className="px-4 py-3 text-right">TUTAR</th>
            <th className="px-4 py-3 w-24 text-center">DURUM</th>
            <th className="px-4 py-3 w-16"></th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => {
            const statusInfo = getStatusInfo(order.status);
            const isSelected = selectedOrder === order.id;
            
            return (
              <React.Fragment key={order.id}>
                <tr 
                  className={`border-b border-gray-700 hover:bg-gray-700 cursor-pointer transition-colors ${
                    order.status === 'teslimatta' ? 'bg-gray-700' : ''
                  }`}
                  onClick={() => toggleOrderDetails(order.id)}
                >
                  <td className="px-4 py-3">{order.id}</td>
                  <td className="px-4 py-3">{order.name}</td>
                  <td className="px-4 py-3">{order.street || '-'}</td>
                  <td className="px-4 py-3">{order.avenue || '-'}</td>
                  <td className="px-4 py-3 text-right">{order.amount}</td>
                  <td className="px-4 py-3">
                    <div 
                      className={`${statusInfo.bgColor} ${statusInfo.textColor} text-xs px-2 py-1 rounded text-center`}
                      style={{ backgroundColor: `#${order.statusColor}` }}
                    >
                      {statusInfo.text}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {isSelected ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </td>
                </tr>
                
                {isSelected && (
                  <tr className="bg-gray-700">
                    <td colSpan={7} className="px-4 py-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold mb-2">Sipariş Detayı</h3>
                          <p className="text-sm text-gray-300">Çek No: {order.id}</p>
                          <p className="text-sm text-gray-300 flex items-center mt-1">
                            <Phone size={14} className="mr-1" /> Telefon: -
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                            Detaylar
                          </button>
                          <button className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                            Tamamlandı
                          </button>
                          <button className="px-3 py-1 bg-yellow-600 text-white rounded-lg text-sm hover:bg-yellow-700">
                            Teslimatta
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      
      {filteredOrders.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          Gösterilecek sipariş bulunamadı.
        </div>
      )}
      
      <div className="p-4 bg-gray-700 border-t border-gray-600 flex justify-between items-center">
        <div className="text-white">
          Toplam: <span className="font-bold">0.00</span>
        </div>
        <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          ÇIKIŞ
        </button>
      </div>
    </div>
  );
};

export default DeliveryStatusTable;
