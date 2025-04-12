'use client';

import React, { useState } from 'react';
import { BusinessSettings, SettingsTabs } from '@/types/settings';
import SettingsSidebar from '../../../../components/backoffice/settings/SettingsSidebar';
import SettingsSubTabs from '../../../../components/backoffice/settings/SettingsSubTabs';
import SettingsActionButtons from '../../../../components/backoffice/settings/SettingsActionButtons';
import BusinessInfoForm from '../../../../components/backoffice/settings/BusinessInfoForm';
import HappyHourForm from '../../../../components/backoffice/settings/HappyHourForm';

const tabs: SettingsTabs = {
  general: {
    label: 'Genel',
    subTabs: [
      { id: 'business-info', label: 'İşletme Bilgileri' },
      { id: 'happy-hour', label: 'Happy Hour' },
      { id: 'payment', label: 'Ödeme Ayarları' },
      { id: 'security', label: 'Güvenlik' }
    ]
  },
  services: {
    label: 'Hizmetler',
    subTabs: [
      { id: 'takeaway', label: 'Al Götür' },
      { id: 'table-service', label: 'Masa Servis' },
      { id: 'delivery', label: 'Paket Servis' },
      { id: 'counter', label: 'Tezgah Satış' }
    ]
  },
  printing: {
    label: 'Yazdırma',
    subTabs: [
      { id: 'printers', label: 'Yazıcılar' },
      { id: 'templates', label: 'Şablonlar' },
      { id: 'auto-print', label: 'Otomatik Yazdırma' },
      { id: 'labels', label: 'Etiketler' }
    ]
  },
  barcode: {
    label: 'Barkod',
    subTabs: [
      { id: 'barcode-types', label: 'BARKOD TİPLERİ' },
      { id: 'quantity', label: 'ADETLİ BARKOD' },
      { id: 'price', label: 'FİYATLI BARKOD' },
      { id: 'weight', label: 'AĞIRLIKLI BARKOD' }
    ]
  }
};

export default function BusinessSettingsPage() {
  const [activeMainTab, setActiveMainTab] = useState('general');
  const [activeSubTab, setActiveSubTab] = useState('business-info');
  const [searchTerm, setSearchTerm] = useState('');
  const [settings, setSettings] = useState<BusinessSettings>({
    // Default settings...
    happyHourActive: false,
    automaticHappyHourMode: false,
    happyHourStartTime: '00:00',
    happyHourEndTime: '00:00',
    happyHourExcludedSaleTypes: '',
    businessName: 'ROBOTPOS',
    businessAddress: '',
    district: '',
    businessPhone: '',
    callerIdCode: '',
    mapCity: '',
    mapDistrict: '',
    useRegisteredAddressProviders: false,
    messagingServiceAddress: '127.0.0.1',
    serverSocketAddress: 'ws://10.0.3.108:101',
    currency: 'TL',
    profiloEnabled: false,
    fiscalboxEnabled: false,
    pavoAndroidEnabled: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
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

  const renderActiveForm = () => {
    if (activeMainTab === 'general') {
      switch (activeSubTab) {
        case 'business-info':
          return <BusinessInfoForm settings={settings} onChange={handleChange} />;
        case 'happy-hour':
          return <HappyHourForm settings={settings} onChange={handleChange} />;
        default:
          return null;
      }
    }
    return null;
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
              <SettingsSubTabs
                subTabs={tabs[activeMainTab].subTabs}
                activeSubTab={activeSubTab}
                onSubTabChange={(subTab) => setActiveSubTab(subTab)}
              />

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-3">
                {renderActiveForm()}
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