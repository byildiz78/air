'use client';

import React, { useState } from 'react';
import { Globe, Server } from 'lucide-react';

interface CentralSettings {
  menuManagementEnabled: boolean;
  menuManagementAddress: string;
  promotionManagementEnabled: boolean;
  staffManagementEnabled: boolean;
  discountManagementEnabled: boolean;
  authorizationManagementEnabled: boolean;
  paymentTypeManagementEnabled: boolean;
  expenseGroupManagementEnabled: boolean;
}

export default function CentralManagementPage() {
  const [settings, setSettings] = useState<CentralSettings>({
    menuManagementEnabled: true,
    menuManagementAddress: 'http://10.0.3.108:101',
    promotionManagementEnabled: false,
    staffManagementEnabled: false,
    discountManagementEnabled: false,
    authorizationManagementEnabled: false,
    paymentTypeManagementEnabled: false,
    expenseGroupManagementEnabled: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    console.log('Settings saved:', settings);
  };

  const handleCancel = () => {
    console.log('Settings cancelled');
  };

  const managementItems = [
    {
      id: 'menu',
      title: 'MERKEZİ MENÜ YÖNETİMİ',
      enabledKey: 'menuManagementEnabled',
      showAddress: true
    },
    {
      id: 'promotion',
      title: 'MERKEZİ PROMOSYON YÖNETİMİ',
      enabledKey: 'promotionManagementEnabled',
      showAddress: false
    },
    {
      id: 'staff',
      title: 'MERKEZİ PERSONEL YÖNETİMİ',
      enabledKey: 'staffManagementEnabled',
      showAddress: false
    },
    {
      id: 'discount',
      title: 'MERKEZİ İNDİRİM YÖNETİMİ',
      enabledKey: 'discountManagementEnabled',
      showAddress: false
    },
    {
      id: 'authorization',
      title: 'MERKEZİ YETKİ YÖNETİMİ',
      enabledKey: 'authorizationManagementEnabled',
      showAddress: false
    },
    {
      id: 'paymentType',
      title: 'MERKEZİ ÖDEME TİPİ YÖNETİMİ',
      enabledKey: 'paymentTypeManagementEnabled',
      showAddress: false
    },
    {
      id: 'expenseGroup',
      title: 'MERKEZİ MASRAF GRUBU YÖNETİMİ',
      enabledKey: 'expenseGroupManagementEnabled',
      showAddress: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Globe size={24} className="text-blue-500" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Merkezi Yönetim Ayarları</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Merkezi yönetim sisteminin ayarlarını buradan yapılandırabilirsiniz.
                </p>
              </div>
            </div>
          </div>

          {/* Settings List */}
          <div className="p-6 space-y-4">
            {managementItems.map(item => (
              <div key={item.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`${item.id}Enabled`}
                      name={item.enabledKey}
                      checked={settings[item.enabledKey]}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor={`${item.id}Enabled`} className="ml-2 text-sm font-medium text-gray-900">
                      {item.title} KULLANILIYOR
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Server size={18} className="text-gray-400 mr-2" />
                  </div>
                </div>

                {settings[item.enabledKey] && item.showAddress && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Adres
                    </label>
                    <input
                      type="text"
                      name="menuManagementAddress"
                      value={settings.menuManagementAddress}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="http://..."
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                İptal
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}