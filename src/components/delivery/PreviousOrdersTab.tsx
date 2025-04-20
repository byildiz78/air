'use client';

import React from 'react';

interface PreviousOrdersTabProps {
  focusedInput: string | null;
  setFocusedInput: React.Dispatch<React.SetStateAction<string | null>>;
  showKeyboard: boolean;
  setShowKeyboard: React.Dispatch<React.SetStateAction<boolean>>;
}

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  time: string;
  total: number;
  items: OrderItem[];
}

const PreviousOrdersTab: React.FC<PreviousOrdersTabProps> = ({
  focusedInput,
  setFocusedInput,
  showKeyboard,
  setShowKeyboard
}) => {
  // Sample data for demonstration
  const sampleOrders: Order[] = [
    {
      id: "ORD-1235",
      date: "27/12/2024",
      time: "10:44",
      total: 248.00,
      items: [
        { id: 1, name: "PEYNİRLİ", quantity: 1, price: 180.00 }
      ]
    },
    {
      id: "ORD-1234",
      date: "20/10/2024",
      time: "12:34",
      total: 320.50,
      items: [
        { id: 1, name: "KARIŞIK PİZZA", quantity: 1, price: 200.00 },
        { id: 2, name: "KOLA", quantity: 2, price: 60.25 }
      ]
    }
  ];

  const handleCopyOrder = (orderId: string) => {
    console.log(`Copying order ${orderId}`);
    // Implement order copying functionality here
  };

  return (
    <div className="p-4 h-full">
      <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
        <div className="bg-green-600 text-white font-bold py-2 px-4 rounded-t-lg">
          FİŞ / SATIŞ
        </div>
        
        <div className="flex-1 overflow-auto">
          {sampleOrders.map((order) => (
            <div key={order.id} className="border-b border-gray-200 p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="text-xs text-gray-500">
                  {order.date} {order.time}
                </div>
                <div className="font-bold text-green-600">
                  {order.total.toFixed(2)} TL
                </div>
              </div>
              
              <div className="bg-gray-100 p-2 rounded mb-2">
                <table className="w-full text-sm">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="py-1 px-2 text-left w-8">#</th>
                      <th className="py-1 px-2 text-left">Ürün</th>
                      <th className="py-1 px-2 text-right w-16">Adet</th>
                      <th className="py-1 px-2 text-right w-24">Fiyat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item.id} className="border-t border-gray-200">
                        <td className="py-1 px-2">{item.id}</td>
                        <td className="py-1 px-2 font-medium">{item.name}</td>
                        <td className="py-1 px-2 text-right">{item.quantity}</td>
                        <td className="py-1 px-2 text-right">{item.price.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="font-bold">
                  TOPLAM: {order.total.toFixed(2)}
                </div>
                <button 
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
                  onClick={() => handleCopyOrder(order.id)}
                >
                  SİPARİŞİ KOPYALA
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {sampleOrders.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Bu müşteriye ait sipariş bulunamadı.
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviousOrdersTab;
