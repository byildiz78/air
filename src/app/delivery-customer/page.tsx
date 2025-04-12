'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Edit2, Pencil, Phone, Building2, Users, Plus, Trash2 } from 'lucide-react';
import TouchKeyboard from '@/components/TouchKeyboard';

const DeliveryCustomerPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('MÜŞTERİ BİLGİLERİ');
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});

  const tabs = [
    'MÜŞTERİ BİLGİLERİ',
    'ÖNCEKİ SİPARİŞLER',
    'SÜREKLİ MÜŞTERİ',
    'FATURA BİLGİLERİ',
    'ETKİLEŞİM',
    'SMS'
  ];

  const formFields = [
    { name: 'name', label: 'ADI' },
    { name: 'tcPassport', label: 'TC/PASAPORT' },
    { name: 'district', label: 'İLÇE/SEMT' },
    { name: 'neighborhood', label: 'MAHALLE' },
    { name: 'street', label: 'CADDE' },
    { name: 'avenue', label: 'SOKAK' },
    { name: 'buildingNo', label: 'BİNA NO' },
    { name: 'apartmentNo', label: 'DAİRE NO' },
    { name: 'region', label: 'BÖLGE' },
    { name: 'site', label: 'SİTE' },
    { name: 'block', label: 'BLOK' },
    { name: 'apartmentName', label: 'APT. ADI' },
    { name: 'description', label: 'TARİF' }
  ];

  // Klavye input handler
  const handleKeyboardInput = (value: string) => {
    if (!focusedInput) return;

    setInputValues(prev => {
      const currentValue = prev[focusedInput] || '';
      
      if (value === 'backspace') {
        return {
          ...prev,
          [focusedInput]: currentValue.slice(0, -1)
        };
      }
      
      if (value === 'capslock') {
        return {
          ...prev,
          [focusedInput]: currentValue.split('').map(char => 
            char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
          ).join('')
        };
      }

      return {
        ...prev,
        [focusedInput]: currentValue + value
      };
    });
  };

  // Backspace handler
  const handleBackspace = () => {
    if (!focusedInput) return;

    setInputValues(prev => ({
      ...prev,
      [focusedInput]: (prev[focusedInput] || '').slice(0, -1)
    }));
  };

  return (
    <div className="flex flex-col min-h-screen max-h-screen overflow-hidden bg-gradient-to-br from-gray-900/70 to-gray-800/70">
      {/* Tabs */}
      <div className="flex-none border-b border-gray-700/50">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-blue-600 text-white font-medium'
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-none" style={{ height: 'calc(50vh - 90px)' }}>
        <div className="flex h-full">
          {/* Sol Form */}
          <div className="w-[400px] p-4 bg-gray-900/90 border-r border-gray-700/50 overflow-auto">
            <div className="space-y-3">
              {formFields.map((field) => (
                <div key={field.name} className="group">
                  <label className="text-xs text-gray-400 block mb-1 group-focus-within:text-blue-400">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    value={inputValues[field.name] || ''}
                    onChange={(e) => setInputValues(prev => ({
                      ...prev,
                      [field.name]: e.target.value
                    }))}
                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2 text-white 
                             focus:outline-none focus:border-blue-500/50 focus:bg-gray-800/80 transition-all duration-200"
                    onFocus={() => setFocusedInput(field.name)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Orta Bölüm */}
          <div className="flex-1 border-r border-gray-700/50 p-4 overflow-auto">
            {/* Telefonlar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <Phone size={18} className="text-blue-400" />
                  <h2 className="text-white font-medium">TELEFONLAR</h2>
                </div>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors">
                  <Plus size={16} />
                  <span className="text-sm">EKLE</span>
                </button>
              </div>
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-3">
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    className="flex-1 bg-gray-900/50 border border-gray-700/50 rounded-lg px-3 py-2 text-white"
                    placeholder="1"
                  />
                  <button className="p-2 text-blue-400 hover:bg-blue-600/20 rounded-lg transition-colors">
                    <Edit2 size={18} />
                  </button>
                  <button className="p-2 text-red-400 hover:bg-red-600/20 rounded-lg transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Firma Seçimi */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <Building2 size={18} className="text-blue-400" />
                  <h2 className="text-white font-medium">FİRMA SEÇİMİ</h2>
                </div>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors">
                  <Plus size={16} />
                  <span className="text-sm">EKLE</span>
                </button>
              </div>
              <input
                type="text"
                className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2 text-white"
                placeholder="ahmet yilmaz"
              />
            </div>

            {/* Yetkililer */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-blue-400" />
                  <h2 className="text-white font-medium">YETKİLİLER</h2>
                </div>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors">
                  <Plus size={16} />
                  <span className="text-sm">EKLE</span>
                </button>
              </div>
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-3 min-h-[200px]">
                {/* Authority list */}
              </div>
            </div>
          </div>

          {/* Sağ Analiz Bölümü */}
          <div className="w-[400px] bg-gray-900/90 p-4 overflow-auto">
            <h2 className="text-green-500 font-bold text-lg mb-6">ANALİZ</h2>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-3 border-b border-gray-700/50">
                <span className="text-green-500">TOPLAM HARCAMA</span>
                <span className="text-2xl text-white font-medium">248,00 TL</span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-gray-700/50">
                <span className="text-green-500">TOPLAM SİPARİŞ ADEDİ</span>
                <span className="text-2xl text-white font-medium">1 Adet</span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-gray-700/50">
                <span className="text-green-500">BORÇ</span>
                <span className="text-2xl text-white font-medium">0,00</span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-gray-700/50">
                <span className="text-green-500">KALAN PARA PUAN</span>
                <span className="text-2xl text-white font-medium">0,00</span>
              </div>
              
              <div className="text-center py-4 border-b border-gray-700/50">
                <span className="text-green-500 block mb-2">SON SİPARİŞ ZAMANI</span>
                <span className="text-xl text-white">27 Aralık, 24 GÜN ÖNCE</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-green-500 text-sm block mb-2">İSKONTO (%)</span>
                  <div className="flex justify-between items-center bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                    <span className="text-white">0</span>
                    <Pencil size={16} className="text-yellow-500" />
                  </div>
                </div>
                <div>
                  <span className="text-green-500 text-sm block mb-2">CARİ SATIŞA İZİN VER</span>
                  <div className="flex justify-between items-center bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                    <span className="text-white">HAYIR</span>
                    <Pencil size={16} className="text-yellow-500" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-green-500">SON SİPARİŞ DURUMU</span>
                <span className="bg-green-500/20 text-green-400 px-4 py-1.5 rounded-lg">HAZIR</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex-none border-t border-gray-700/50">
        <div className="flex justify-between p-3">
          <div className="flex gap-3">
            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              ADRES ZATEN VAR
            </button>
            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              BAŞKA ADRESE GÖNDER
            </button>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => router.push('/')}
              className="px-8 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              İPTAL
            </button>
            <button className="px-8 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              YENİ SİPARİŞ VER
            </button>
          </div>
        </div>
      </div>

      {/* Keyboard */}
      <div className="flex-none" style={{ height: 'calc(50vh - 32px)' }}>
        <TouchKeyboard 
          onInput={handleKeyboardInput}
          onBackspace={handleBackspace}
        />
      </div>
    </div>
  );
};

export default DeliveryCustomerPage;
