'use client';

import React, { useState } from 'react';
import { Clock, Users, Package, User, MapPin, Check } from 'lucide-react';
import CourierLocationsModal from './CourierLocationsModal';

// Define types for the personnel data
export interface DeliveryPerson {
  id: number;
  name: string;
  status: 'available' | 'delivering';
  waitingSince: string;
  deliveries: number;
}

export interface PersonOnLeave {
  id: number;
  name: string;
  reason: string;
  until: string;
}

interface DeliveryPersonnelPanelProps {
  waitingPersonnel: DeliveryPerson[];
  personnelOnLeave: PersonOnLeave[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  selectedPersonId: number | null;
  onSelectPerson: (id: number) => void;
}

const DeliveryPersonnelPanel: React.FC<DeliveryPersonnelPanelProps> = ({
  waitingPersonnel,
  personnelOnLeave,
  activeTab,
  onTabChange,
  selectedPersonId,
  onSelectPerson
}) => {
  const [showLocationsModal, setShowLocationsModal] = useState(false);

  return (
    <>
      <div className="w-[200px] bg-gray-100 border-r border-gray-300 flex flex-col">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-300">
          <button
            className={`flex-1 py-2 text-xs font-medium ${
              activeTab === 'waiting' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
            }`}
            onClick={() => onTabChange('waiting')}
          >
            <div className="flex flex-col items-center">
              <Users size={16} className="mb-1" />
              <span>Kurye</span>
            </div>
          </button>
          <button
            className={`flex-1 py-2 text-xs font-medium ${
              activeTab === 'onLeave' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
            }`}
            onClick={() => onTabChange('onLeave')}
          >
            <div className="flex flex-col items-center">
              <User size={16} className="mb-1" />
              <span>İzinli</span>
            </div>
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'waiting' ? (
            <div className="p-2">
              <div className="mt-4">
                <h3 className="text-xs font-medium text-gray-500 mb-2 px-2">Paketçiler</h3>
                <div className="space-y-2">
                  {waitingPersonnel.map(person => (
                    <div
                      key={person.id}
                      className={`p-2 rounded-md cursor-pointer transition-colors ${
                        selectedPersonId === person.id 
                          ? 'bg-blue-100 border border-blue-300' 
                          : person.status === 'available' 
                            ? 'bg-green-50 border border-green-100 hover:bg-green-100' 
                            : 'bg-yellow-50 border border-yellow-100 hover:bg-yellow-100'
                      }`}
                      onClick={() => onSelectPerson(person.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          {selectedPersonId === person.id && (
                            <Check size={14} className="text-blue-600 mr-1 mt-0.5 flex-shrink-0" />
                          )}
                          <div>
                            <h4 className="text-xs font-medium">{person.name}</h4>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {person.status === 'available' ? 'Bekliyor' : 'Teslimatta'}
                            </p>
                          </div>
                        </div>
                        <div className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${
                          selectedPersonId === person.id
                            ? 'bg-blue-200 text-blue-800'
                            : person.status === 'available' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {person.waitingSince}
                        </div>
                      </div>
                      
                      {person.status === 'delivering' && (
                        <div className="mt-1 text-xs text-gray-600">
                          Teslimat sayısı: {person.deliveries}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-2 space-y-2">
              <h3 className="text-xs font-medium text-gray-500 mb-2 px-2">İzinli</h3>
              {personnelOnLeave.map(person => (
                <div
                  key={person.id}
                  className="p-2 rounded-md bg-gray-50 border border-gray-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-medium">{person.name}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {person.reason}
                      </p>
                    </div>
                    <div className="text-xs font-medium px-1.5 py-0.5 rounded-full bg-gray-200 text-gray-800">
                      {person.until}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Show Locations Button */}
        <div className="p-3 bg-gray-100 border-t border-gray-300">
          <button 
            onClick={() => setShowLocationsModal(true)}
            className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-300 px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center"
          >
            <MapPin size={16} className="mr-2" />
            Konumlarını Göster
          </button>
        </div>
      </div>

      {/* Courier Locations Modal */}
      <CourierLocationsModal 
        isOpen={showLocationsModal}
        onClose={() => setShowLocationsModal(false)}
        deliveryPersonnel={waitingPersonnel}
      />
    </>
  );
};

export default DeliveryPersonnelPanel;
