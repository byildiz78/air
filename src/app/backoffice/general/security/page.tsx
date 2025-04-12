'use client';

import React, { useState } from 'react';
import { SecuritySettings, SettingsTabs } from '@/types/settings';
import SettingsSidebar from '../../../../components/backoffice/settings/SettingsSidebar';
import SettingsSubTabs from '../../../../components/backoffice/settings/SettingsSubTabs';
import SettingsActionButtons from '../../../../components/backoffice/settings/SettingsActionButtons';
import SecurityForm from '../../../../components/backoffice/settings/SecurityForm';

const tabs: SettingsTabs = {
  general: {
    label: 'Genel',
    subTabs: [
      { id: 'permissions', label: 'Yetkilendirme' }
    ]
  }
};

const securityTabs = [
  { id: 'general', label: 'Genel' },
  { id: 'payment', label: 'Ödeme' },
  { id: 'package', label: 'Paket' },
  { id: 'sales', label: 'Satış' },
  { id: 'tablet', label: 'Tablet' },
  { id: 'printer', label: 'Yazıcı' }
];

export default function SecuritySettingsPage() {
  const [activeMainTab, setActiveMainTab] = useState('general');
  const [activeSubTab, setActiveSubTab] = useState('permissions');
  const [activeSecurityTab, setActiveSecurityTab] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [settings, setSettings] = useState<SecuritySettings>({
    barkodModu: { level: 10, required: false, manager: false, cashier: true },
    siparisNotu: { level: 10, required: false, manager: false, cashier: true },
    satisTipi: { level: 10, required: true, manager: false, cashier: true },
    indirimDuzenleme: { level: 10, required: false, manager: true, cashier: true },
    foyDuzenleme: { level: 5, required: true, manager: true, cashier: true },
    paraCekmecesi: { level: 9, required: false, manager: false, cashier: false },
    terminalDegistirme: { level: 1, required: false, manager: false, cashier: false },
    personelEkleme: { level: 3, required: true, manager: false, cashier: false },
    hesapYazdirma: { level: 1, required: false, manager: false, cashier: false },
    zamanDolan: { level: 1, required: false, manager: false, cashier: false },
    kagitAdisyon: { level: 1, required: true, manager: false, cashier: false },
    personelMesai: { level: 1, required: false, manager: false, cashier: false },
    personelMesaiFormu: { level: 10, required: false, manager: false, cashier: false },
    saatlikRapor: { level: 10, required: false, manager: false, cashier: false },
    paketciHesap: { level: 1, required: false, manager: false, cashier: false },
    muhasebe: { level: 1, required: false, manager: false, cashier: false },
    iadeModu: { level: 1, required: true, manager: false, cashier: false },
    personelGorev: { level: 1, required: true, manager: false, cashier: false },
    paketSiparisler: { level: 1, required: true, manager: false, cashier: false },
    tarihDegistirme: { level: 10, required: true, manager: false, cashier: false },
    cariHesap: { level: 1, required: true, manager: false, cashier: false },
    ayirEkrani: { level: 1, required: false, manager: false, cashier: false }
  });

  const handleChange = (name: string, field: string, value: number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        [field]: value
      }
    }));
  };

  const handleTabChange = (mainTab: string, subTab: string) => {
    setActiveMainTab(mainTab);
    setActiveSubTab(subTab);
  };

  const handleSave = () => {
    console.log('Settings saved:', settings);
  };

  const handleCancel = () => {
    console.log('Settings cancelled');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <SettingsSidebar
          tabs={tabs}
          activeMainTab={activeMainTab}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onTabChange={handleTabChange}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto">
            <div className="p-3">
              {/* Security Tabs */}
              <div className="mb-4 border-b border-gray-200">
                <div className="flex space-x-1">
                  {securityTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSecurityTab(tab.id)}
                      className={`
                        px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-200
                        ${activeSecurityTab === tab.id
                          ? 'bg-white text-blue-600 border-t border-l border-r border-gray-200'
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                        }
                      `}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-3">
                <SecurityForm 
                  settings={settings} 
                  onChange={handleChange}
                  activeTab={activeSecurityTab}
                />
              </div>
            </div>
          </div>

          <SettingsActionButtons
            onCancel={handleCancel}
            onSave={handleSave}
          />
        </div>
      </div>
    </div>
  );
}