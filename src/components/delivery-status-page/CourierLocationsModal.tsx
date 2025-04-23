'use client';

import React, { useState } from 'react';
import { X, MapPin, Clock, ChevronLeft, ChevronRight, Search, Navigation, User } from 'lucide-react';
import { DeliveryPerson } from './DeliveryPersonnelPanel';

interface CourierLocationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  deliveryPersonnel: DeliveryPerson[];
}

const CourierLocationsModal: React.FC<CourierLocationsModalProps> = ({ 
  isOpen, 
  onClose, 
  deliveryPersonnel 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourierId, setSelectedCourierId] = useState<number | null>(null);

  if (!isOpen) return null;

  // Filter to only show personnel who are delivering
  const activePersonnel = deliveryPersonnel.filter(person => person.status === 'delivering');

  // Filter by search term if provided
  const filteredPersonnel = searchTerm 
    ? activePersonnel.filter(person => 
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : activePersonnel;

  // Sample location data - in a real app, this would come from a GPS tracking system
  const courierLocations = [
    { id: 1, lat: 41.015137, lng: 28.979530, minutes: 15, area: 'Taksim', color: '#3B82F6' },
    { id: 2, lat: 41.026920, lng: 28.977037, minutes: 8, area: 'Şişli', color: '#10B981' },
    { id: 3, lat: 41.041422, lng: 28.990255, minutes: 22, area: 'Levent', color: '#F59E0B' },
    { id: 4, lat: 41.052345, lng: 29.010123, minutes: 17, area: 'Maslak', color: '#EF4444' },
    { id: 5, lat: 41.031234, lng: 28.968765, minutes: 30, area: 'Beyoğlu', color: '#8B5CF6' },
  ];

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center">
          <button 
            onClick={onClose}
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <X size={24} className="text-gray-700" />
          </button>
          <h2 className="text-xl font-bold">Kurye Konumları</h2>
        </div>
        
        <div className="flex items-center">
          <div className="relative mr-4">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Kurye ara..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            {sidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Map Area */}
        <div className="flex-1 bg-blue-50 relative">
          {/* This would be a real map in a production app */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full relative">
              {/* Simulated map background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200"></div>
              
              {/* Simulated map grid lines */}
              <div className="absolute inset-0" style={{ 
                backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
              }}></div>
              
              {/* Simulated roads */}
              <div className="absolute top-1/4 left-0 right-0 h-2 bg-gray-300"></div>
              <div className="absolute top-2/4 left-0 right-0 h-3 bg-gray-400"></div>
              <div className="absolute bottom-1/4 left-0 right-0 h-2 bg-gray-300"></div>
              <div className="absolute left-1/4 top-0 bottom-0 w-2 bg-gray-300"></div>
              <div className="absolute left-2/4 top-0 bottom-0 w-3 bg-gray-400"></div>
              <div className="absolute right-1/4 top-0 bottom-0 w-2 bg-gray-300"></div>
              
              {/* Restaurant location */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">R</span>
                  </div>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow-md text-xs font-medium">
                  Restoran
                </div>
              </div>
              
              {/* Courier markers */}
              {filteredPersonnel.map((courier, index) => {
                const location = courierLocations[index % courierLocations.length];
                const isSelected = selectedCourierId === courier.id;
                
                // Calculate position (would be based on real coordinates in a real app)
                const positionStyles = {
                  top: `${15 + (index * 15)}%`,
                  left: `${20 + (index * 15)}%`,
                };
                
                return (
                  <div 
                    key={courier.id}
                    className="absolute"
                    style={positionStyles}
                    onClick={() => setSelectedCourierId(isSelected ? null : courier.id)}
                  >
                    <div className={`transition-all duration-200 ${isSelected ? 'scale-125' : 'scale-100'}`}>
                      <div className="relative">
                        <MapPin size={36} style={{ color: location.color }} className="drop-shadow-lg" />
                        <div 
                          className="absolute top-0 right-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md"
                          style={{ backgroundColor: location.color }}
                        >
                          {index + 1}
                        </div>
                      </div>
                      
                      {/* Info card */}
                      <div className={`mt-1 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-200 ${
                        isSelected ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 pointer-events-none'
                      }`}>
                        <div className="p-2 border-b border-gray-100">
                          <div className="font-medium text-sm">{courier.name}</div>
                          <div className="text-xs text-gray-500 flex items-center mt-1">
                            <MapPin size={10} className="mr-1" />
                            {location.area}
                          </div>
                        </div>
                        <div className="p-2 bg-gray-50">
                          <div className="flex justify-between items-center text-xs">
                            <span>Dışarıda:</span>
                            <span className="font-medium">{location.minutes} dk</span>
                          </div>
                          <div className="flex justify-between items-center text-xs mt-1">
                            <span>Teslimat:</span>
                            <span className="font-medium">{courier.deliveries}</span>
                          </div>
                          <button className="w-full mt-2 bg-blue-500 text-white text-xs py-1 rounded flex items-center justify-center">
                            <Navigation size={10} className="mr-1" />
                            Yol Tarifi
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Map controls - would be functional in a real app */}
          <div className="absolute right-4 top-4 bg-white rounded-lg shadow-md">
            <button className="p-2 hover:bg-gray-100 rounded-t-lg border-b border-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
            </button>
            <button className="p-2 hover:bg-gray-100 border-b border-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-b-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
          </div>
        </div>
        
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-700">Aktif Kuryeler ({filteredPersonnel.length})</h3>
            </div>
            
            <div className="flex-1 overflow-auto">
              {filteredPersonnel.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {filteredPersonnel.map((person, index) => {
                    // Find location data for this courier
                    const locationData = courierLocations[index % courierLocations.length];
                    const isSelected = selectedCourierId === person.id;
                    
                    return (
                      <div 
                        key={person.id} 
                        className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                          isSelected ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => setSelectedCourierId(isSelected ? null : person.id)}
                      >
                        <div className="flex items-start">
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white mr-3 flex-shrink-0"
                            style={{ backgroundColor: locationData.color }}
                          >
                            <User size={16} />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{person.name}</h4>
                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                  <MapPin size={12} className="mr-1" />
                                  <span>{locationData.area}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                <Clock size={12} className="mr-1" />
                                <span>{locationData.minutes} dk</span>
                              </div>
                            </div>
                            
                            <div className="mt-3 p-2 bg-gray-50 rounded-md">
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-500">Teslimat Sayısı:</span>
                                <span className="font-medium">{person.deliveries}</span>
                              </div>
                              <div className="flex justify-between text-xs mt-1">
                                <span className="text-gray-500">Dışarıda:</span>
                                <span className="font-medium">{person.waitingSince}</span>
                              </div>
                            </div>
                            
                            <div className="mt-2 flex">
                              <button className="flex-1 text-xs bg-blue-500 text-white py-1.5 rounded-l flex items-center justify-center">
                                <Navigation size={12} className="mr-1" />
                                Yol Tarifi
                              </button>
                              <button className="flex-1 text-xs bg-gray-100 text-gray-700 py-1.5 rounded-r flex items-center justify-center">
                                Detaylar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-6 text-gray-500">
                  <User size={48} className="mb-4 text-gray-300" />
                  <p className="text-center">Aktif kurye bulunmamaktadır</p>
                  {searchTerm && (
                    <p className="text-center mt-2 text-sm">
                      Arama kriterlerine uygun kurye bulunamadı.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="bg-white border-t border-gray-200 p-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Son güncelleme: {new Date().toLocaleTimeString()}
        </div>
        
        <button 
          onClick={onClose}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm flex items-center"
        >
          <X size={16} className="mr-2" />
          Kapat
        </button>
      </div>
    </div>
  );
};

export default CourierLocationsModal;
