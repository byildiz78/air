'use client';

import React from 'react';
import { X, MapPin, Navigation } from 'lucide-react';
import { Order } from './OrderListPanel';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  // Sample address data - in a real app, this would come from the order data
  const address = {
    street: 'Atatürk Caddesi',
    number: '123',
    district: 'Beşiktaş',
    city: 'İstanbul',
    distance: '2.3 km',
    estimatedTime: '8 dk'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl overflow-hidden shadow-xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium">Sipariş Konumu</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex mb-4">
            <div className="w-1/3 pr-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center">
                  <MapPin size={16} className="mr-1 text-red-500" />
                  Teslimat Adresi
                </h4>
                <p className="text-sm text-gray-700 mb-1">Sipariş #{order.id}</p>
                <p className="text-sm text-gray-700 mb-1">{address.street} No: {address.number}</p>
                <p className="text-sm text-gray-700 mb-3">{address.district}, {address.city}</p>
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500">Uzaklık:</span>
                    <span className="text-sm font-medium">{address.distance}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Tahmini Süre:</span>
                    <span className="text-sm font-medium">{address.estimatedTime}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md flex items-center justify-center">
                  <Navigation size={16} className="mr-2" />
                  Yol Tarifi Al
                </button>
              </div>
            </div>
            
            <div className="w-2/3 bg-gray-200 rounded-lg flex items-center justify-center" style={{ height: '300px' }}>
              {/* This would be a real map in a production app */}
              <div className="text-center">
                <MapPin size={48} className="mx-auto mb-2 text-red-500" />
                <p className="text-gray-700">Harita burada görüntülenecek</p>
                <p className="text-sm text-gray-500 mt-1">Teslimat adresi: {address.street} No: {address.number}</p>
                <p className="text-sm text-gray-500">{address.district}, {address.city}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-100 p-4 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md text-sm"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
