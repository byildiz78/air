'use client';

import React from 'react';
import { Edit2, Phone, Building2, Users, Plus, Trash2, MapPin, Send, ShoppingCart, X } from 'lucide-react';

interface CustomerInfoTabProps {
  inputValues: { [key: string]: string };
  setInputValues: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  focusedInput: string | null;
  setFocusedInput: React.Dispatch<React.SetStateAction<string | null>>;
  showKeyboard: boolean;
  setShowKeyboard: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomerInfoTab: React.FC<CustomerInfoTabProps> = ({
  inputValues,
  setInputValues,
  focusedInput,
  setFocusedInput,
  showKeyboard,
  setShowKeyboard
}) => {
  // Form fields for address information
  const formFields = [
    { name: 'name', label: 'Adı' },
    { name: 'district', label: 'İlçe/Semt' },
    { name: 'neighborhood', label: 'Mahalle' },
    { name: 'street', label: 'Cadde' },
    { name: 'avenue', label: 'Sokak' },
    { name: 'buildingNo', label: 'Bina No' },
    { name: 'apartmentNo', label: 'Daire No' },
    { name: 'region', label: 'Bölge' },
    { name: 'site', label: 'Site' },
    { name: 'block', label: 'Blok' },
    { name: 'apartmentName', label: 'Apt. Adı' },
    { name: 'description', label: 'Tarif' }
  ];

  const renderFormField = (field: { name: string, label: string }) => (
    <div key={field.name} className="group mb-1.5">
      <label className="text-xs text-gray-600 block mb-0.5 group-focus-within:text-blue-600">
        {field.label}
      </label>
      <input
        type="text"
        value={inputValues[field.name] || ''}
        onChange={(e) => setInputValues(prev => ({
          ...prev,
          [field.name]: e.target.value
        }))}
        className="w-full bg-white border border-gray-200 rounded-md px-2 py-1 text-gray-800 text-sm
                 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-300 transition-all duration-200"
        onFocus={() => {
          setFocusedInput(field.name);
          if (!showKeyboard) setShowKeyboard(true);
        }}
      />
    </div>
  );

  return (
    <div className="flex flex-wrap -mx-1">
      {/* Address Form */}
      <div className="w-full md:w-[65%] px-1">
        <div className="p-2 bg-white rounded-md mb-2 border-l-4 border-blue-500 shadow-sm">
          <h2 className="text-gray-800 text-sm font-medium mb-2 border-b border-gray-200 pb-1 flex items-center">
            <span className="bg-blue-500 text-white px-2 py-0.5 rounded-md mr-2 text-xs">Adres Bilgileri</span>
          </h2>
          <div className="grid grid-cols-2 gap-x-2">
            {formFields.map(renderFormField)}
          </div>
        </div>
      </div>
      
      {/* Contact Info Container */}
      <div className="w-full md:w-[35%] px-1">
        <div className="p-2 bg-white rounded-md mb-2 border-l-4 border-green-500 shadow-sm">
          <h2 className="text-gray-800 text-sm font-medium mb-2 border-b border-gray-200 pb-1 flex items-center">
            <span className="bg-green-500 text-white px-2 py-0.5 rounded-md mr-2 text-xs">İletişim Bilgileri</span>
          </h2>
          
          {/* Telefonlar */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1 bg-gray-100 px-1.5 py-0.5 rounded-md">
              <div className="flex items-center gap-1">
                <Phone size={12} className="text-blue-600" />
                <h3 className="text-gray-700 text-xs font-medium">Telefonlar</h3>
              </div>
              <button className="flex items-center gap-1 px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors text-xs">
                <Plus size={10} />
                <span>Ekle</span>
              </button>
            </div>
            <div className="bg-white border border-gray-200 rounded-md p-1.5 mb-2">
              <div className="flex gap-1 items-center">
                <input
                  type="text"
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-md px-2 py-1 text-gray-800 text-sm"
                  placeholder="1"
                  onFocus={() => {
                    setFocusedInput('phone');
                    if (!showKeyboard) setShowKeyboard(true);
                  }}
                />
                <button className="p-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Kurumlar */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1 bg-gray-100 px-1.5 py-0.5 rounded-md">
              <div className="flex items-center gap-1">
                <Building2 size={12} className="text-purple-600" />
                <h3 className="text-gray-700 text-xs font-medium">Kurumlar</h3>
              </div>
              <button className="flex items-center gap-1 px-1.5 py-0.5 bg-purple-100 text-purple-600 rounded-md hover:bg-purple-200 transition-colors text-xs">
                <Plus size={10} />
                <span>Ekle</span>
              </button>
            </div>
          </div>
          
          {/* Kişiler */}
          <div>
            <div className="flex justify-between items-center mb-1 bg-gray-100 px-1.5 py-0.5 rounded-md">
              <div className="flex items-center gap-1">
                <Users size={12} className="text-yellow-600" />
                <h3 className="text-gray-700 text-xs font-medium">Kişiler</h3>
              </div>
              <button className="flex items-center gap-1 px-1.5 py-0.5 bg-yellow-100 text-yellow-600 rounded-md hover:bg-yellow-200 transition-colors text-xs">
                <Plus size={10} />
                <span>Ekle</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Buttons Container - Separate container for buttons in a single row */}
      <div className="w-full px-1">
        <div className="p-2 bg-white rounded-md mb-2 border-l-4 border-purple-500 shadow-sm">
          <div className="flex justify-between items-center space-x-2 overflow-x-auto">
            <button className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-xs font-medium whitespace-nowrap">
              <MapPin size={14} />
              <span>Adres Zaten Var</span>
            </button>
            
            <button className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-xs font-medium whitespace-nowrap">
              <Send size={14} />
              <span>Başka Adrese Gönder</span>
            </button>
            
            <button className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors text-xs font-medium whitespace-nowrap">
              <ShoppingCart size={14} />
              <span>Yeni Sipariş Ver</span>
            </button>
            
            <button className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-xs font-medium whitespace-nowrap">
              <X size={14} />
              <span>İptal</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoTab;
