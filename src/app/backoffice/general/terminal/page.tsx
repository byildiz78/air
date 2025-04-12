'use client';

import React, { useState } from 'react';
import { TerminalSettings, SettingsTabs } from '@/types/settings';
import SettingsSidebar from '../../../../components/backoffice/settings/SettingsSidebar';
import SettingsSubTabs from '../../../../components/backoffice/settings/SettingsSubTabs';
import SettingsActionButtons from '../../../../components/backoffice/settings/SettingsActionButtons';
import TerminalForm from '../../../../components/backoffice/settings/TerminalForm';

const tabs: SettingsTabs = {
  general: {
    label: 'Genel',
    subTabs: [
      { id: 'terminal-info', label: 'Terminal Bilgileri' },
      { id: 'display', label: 'Görünüm' },
      { id: 'security', label: 'Güvenlik' }
    ]
  },
  services: {
    label: 'Servisler',
    subTabs: [
      { id: 'call-center', label: 'Çağrı Merkezi' },
      { id: 'integrations', label: 'Entegrasyonlar' }
    ]
  },
  printer: {
    label: 'Yazıcı',
    subTabs: [
      { id: 'printer-settings', label: 'Yazıcı Ayarları' },
      { id: 'templates', label: 'Şablonlar' }
    ]
  }
};

export default function TerminalSettingsPage() {
  const [activeMainTab, setActiveMainTab] = useState('general');
  const [activeSubTab, setActiveSubTab] = useState('terminal-info');
  const [searchTerm, setSearchTerm] = useState('');
  const [settings, setSettings] = useState<TerminalSettings>({
    terminalNo: '1',
    terminalName: 'KASA',
    backgroundImage: '',
    sidebarImage: '',
    defaultFloorPlan: 'SALON',
    terminalInterface: 'OFFICE_2010_BLUE',
    language: 'TR',
    showQRMenuNotifications: false
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
    if (activeMainTab === 'general' && activeSubTab === 'terminal-info') {
      return <TerminalForm settings={settings} onChange={handleChange} />;
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