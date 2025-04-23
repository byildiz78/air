'use client';

import React, { useState } from 'react';
import { X, Plus, Edit2, Phone, Building2, User } from 'lucide-react';
import CustomerForm from './CustomerForm';
import CustomerAnalytics from './CustomerAnalytics';
import PhoneList from './PhoneList';
import TouchKeyboard from '../TouchKeyboard';

interface DeliveryCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeliveryCustomerModal: React.FC<DeliveryCustomerModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('Müşteri Bilgileri');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  if (!isOpen) return null;

  const tabs = [
    'Müşteri Bilgileri',
    'Önceki Siparişler',
    'Sürekli Müşteri',
    'Fatura Bilgileri',
    'Etkileşim',
    'SMS'
  ];

  return (
    <div className="fixed inset-0 z-50" style={{ marginTop: '4rem', marginBottom: '3.5rem' }}>
      {/* Main Container */}
      <div className="flex flex-col h-full bg-gray-900/95 backdrop-blur-md">
        {/* Header */}
        <div className="bg-gray-900 border-b border-gray-800 p-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:bg-gray-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-md text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Side - Form */}
          <div className="flex-1 p-6 overflow-auto">
            <CustomerForm
              onFocus={(inputName) => {
                setFocusedInput(inputName);
                setShowKeyboard(true);
              }}
            />
          </div>

          {/* Right Side - Phone & Analytics */}
          <div className="w-[500px] bg-gray-900/90 border-l border-gray-800 p-6 flex flex-col overflow-auto">
            {/* Phone List */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">Telefonlar</h2>
                <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center">
                  <Plus size={20} />
                </button>
              </div>
              <PhoneList />
            </div>

            {/* Company Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">Firma Seçimi</h2>
                <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center">
                  <Plus size={20} />
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-3 text-white"
                  placeholder="Firma seçin..."
                />
              </div>
            </div>

            {/* Authorities */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">Yetkililer</h2>
                <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center">
                  <Plus size={20} />
                </button>
              </div>
              <div className="space-y-2">
                {/* Authority list would go here */}
              </div>
            </div>

            {/* Analytics */}
            <div className="flex-1">
              <CustomerAnalytics />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-900 border-t border-gray-800 p-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium flex items-center gap-2">
                <Building2 size={16} className="mr-1" />
                Adres Zaten Var
              </button>
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium flex items-center gap-2">
                <User size={16} className="mr-1" />
                Başka Adrese Gönder
              </button>
            </div>
            <div className="flex gap-4">
              <button onClick={onClose} className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium">
                İptal
              </button>
              <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium">
                Yeni Sipariş Ver
              </button>
            </div>
          </div>
        </div>

        {/* Keyboard */}
        {showKeyboard && (
          <div className="bg-gray-800 border-t border-gray-700 h-[50vh]">
            <TouchKeyboard
              onInput={(value) => {
                // Handle input
                console.log(value);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryCustomerModal;
