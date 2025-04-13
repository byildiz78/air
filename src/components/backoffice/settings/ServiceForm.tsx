'use client';

import React, { useState } from 'react';
import { Settings2 } from 'lucide-react';

interface ServiceFormProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, section?: string) => void;
  settings: {
    general: {
      enableTableService: boolean;
      enableSelfService: boolean;
      enableTakeaway: boolean;
      enableDelivery: boolean;
      autoAssignWaiter: boolean;
      requireCustomerInfo: boolean;
      showCourseManagement: boolean;
      enableTableTransfer: boolean;
      enableGuestCount: boolean;
      defaultGuestCount: number;
    };
    other: {
      showOrderNotes: boolean;
      enableDiscounts: boolean;
      requireReasonForDiscount: boolean;
      enableSplitBill: boolean;
      enablePartialPayment: boolean;
      showOrderHistory: boolean;
      printReceiptAutomatically: boolean;
      enableTips: boolean;
      defaultTipPercentage: number;
    };
  };
  activeTab?: string;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ onChange, settings, activeTab = 'general' }) => {
  const [activeSection, setActiveSection] = useState<string>(activeTab);

  const handleTabChange = (tab: string) => {
    setActiveSection(tab);
  };

  return (
    <div className="flex flex-col">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          type="button"
          onClick={() => handleTabChange('general')}
          className={`px-4 py-2 text-sm font-medium ${
            activeSection === 'general'
              ? 'text-blue-600 border-b-2 border-blue-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          GENEL
        </button>
        <button
          type="button"
          onClick={() => handleTabChange('other')}
          className={`px-4 py-2 text-sm font-medium ${
            activeSection === 'other'
              ? 'text-blue-600 border-b-2 border-blue-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          DİĞER
        </button>
      </div>

      {/* General Settings */}
      {activeSection === 'general' && (
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900">MASA SERVİSİ AYARLARI</h3>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  name="enableTableService"
                  checked={settings.general.enableTableService}
                  onChange={(e) => onChange(e, 'general')}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">MASA SERVİSİNİ ETKİNLEŞTİR</span>
              </label>
              <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  name="enableSelfService"
                  checked={settings.general.enableSelfService}
                  onChange={(e) => onChange(e, 'general')}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">SELF SERVİSİ ETKİNLEŞTİR</span>
              </label>
              <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  name="enableTakeaway"
                  checked={settings.general.enableTakeaway}
                  onChange={(e) => onChange(e, 'general')}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">PAKET SERVİSİ ETKİNLEŞTİR</span>
              </label>
              <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  name="enableDelivery"
                  checked={settings.general.enableDelivery}
                  onChange={(e) => onChange(e, 'general')}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">TESLİMAT ETKİNLEŞTİR</span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900">GARSON AYARLARI</h3>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  name="autoAssignWaiter"
                  checked={settings.general.autoAssignWaiter}
                  onChange={(e) => onChange(e, 'general')}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">GARSON OTOMATİK ATA</span>
              </label>
              <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  name="requireCustomerInfo"
                  checked={settings.general.requireCustomerInfo}
                  onChange={(e) => onChange(e, 'general')}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">MÜŞTERİ BİLGİSİ GEREKLİ</span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900">MASA YÖNETİMİ</h3>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  name="showCourseManagement"
                  checked={settings.general.showCourseManagement}
                  onChange={(e) => onChange(e, 'general')}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">KURS YÖNETİMİNİ GÖSTER</span>
              </label>
              <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  name="enableTableTransfer"
                  checked={settings.general.enableTableTransfer}
                  onChange={(e) => onChange(e, 'general')}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">MASA TRANSFERİNİ ETKİNLEŞTİR</span>
              </label>
              <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  name="enableGuestCount"
                  checked={settings.general.enableGuestCount}
                  onChange={(e) => onChange(e, 'general')}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">MİSAFİR SAYISINI ETKİNLEŞTİR</span>
              </label>
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-1">VARSAYILAN MİSAFİR SAYISI</label>
                <select
                  name="defaultGuestCount"
                  value={settings.general.defaultGuestCount}
                  onChange={(e) => onChange(e, 'general')}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other Settings */}
      {activeSection === 'other' && (
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900">SİPARİŞ AYARLARI</h3>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  name="showOrderNotes"
                  checked={settings.other.showOrderNotes}
                  onChange={(e) => onChange(e, 'other')}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">SİPARİŞ NOTLARINI GÖSTER</span>
              </label>
              <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  name="showOrderHistory"
                  checked={settings.other.showOrderHistory}
                  onChange={(e) => onChange(e, 'other')}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">SİPARİŞ GEÇMİŞİNİ GÖSTER</span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900">ÖDEME AYARLARI</h3>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  name="enableDiscounts"
                  checked={settings.other.enableDiscounts}
                  onChange={(e) => onChange(e, 'other')}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">İNDİRİMLERİ ETKİNLEŞTİR</span>
              </label>
              <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  name="requireReasonForDiscount"
                  checked={settings.other.requireReasonForDiscount}
                  onChange={(e) => onChange(e, 'other')}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">İNDİRİM İÇİN SEBEP GEREKLİ</span>
              </label>
              <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  name="enableSplitBill"
                  checked={settings.other.enableSplitBill}
                  onChange={(e) => onChange(e, 'other')}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">HESAP BÖLMEYİ ETKİNLEŞTİR</span>
              </label>
              <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  name="enablePartialPayment"
                  checked={settings.other.enablePartialPayment}
                  onChange={(e) => onChange(e, 'other')}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">KISMİ ÖDEMEYİ ETKİNLEŞTİR</span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900">MAKBUZ AYARLARI</h3>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  name="printReceiptAutomatically"
                  checked={settings.other.printReceiptAutomatically}
                  onChange={(e) => onChange(e, 'other')}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">MAKBUZU OTOMATİK YAZDIR</span>
              </label>
              <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  name="enableTips"
                  checked={settings.other.enableTips}
                  onChange={(e) => onChange(e, 'other')}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">BAHŞİŞLERİ ETKİNLEŞTİR</span>
              </label>
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-1">VARSAYILAN BAHŞİŞ YÜZDESİ</label>
                <select
                  name="defaultTipPercentage"
                  value={settings.other.defaultTipPercentage}
                  onChange={(e) => onChange(e, 'other')}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {[5, 10, 15, 20, 25].map(num => (
                    <option key={num} value={num}>{num}%</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceForm;