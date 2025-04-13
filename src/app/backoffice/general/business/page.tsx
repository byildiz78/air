'use client';

import React from 'react';
import BusinessInfoForm from '@/components/backoffice/settings/BusinessInfoForm';
import SettingsSidebar from '@/components/backoffice/settings/SettingsSidebar';
import SettingsSubTabs from '@/components/backoffice/settings/SettingsSubTabs';
import SettingsActionButtons from '@/components/backoffice/settings/SettingsActionButtons';
import { StoreSetting } from '@/types/settings';

export default function BusinessSettingsPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeMainTab, setActiveMainTab] = React.useState('GENEL');
  const [activeSubTab, setActiveSubTab] = React.useState('İŞLETME');
  const [storeSettings, setStoreSettings] = React.useState<StoreSetting[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isSearchActive, setIsSearchActive] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState<{
    [key: string]: string[];
  }>({});

  // Verileri yükle
  React.useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch('/store_settings.json');
        const data = await response.json();
        setStoreSettings(data);
      } catch (error) {
        console.error('Error loading settings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Ayarları grupla ve filtrele
  const groupedSettings = React.useMemo(() => {
    const grouped: { [key: string]: { [key: string]: StoreSetting[] } } = {};

    storeSettings.forEach((setting) => {
      if (!grouped[setting.TabName]) {
        grouped[setting.TabName] = {};
      }
      if (!grouped[setting.TabName][setting.GroupName]) {
        grouped[setting.TabName][setting.GroupName] = [];
      }
      grouped[setting.TabName][setting.GroupName].push(setting);
    });

    return grouped;
  }, [storeSettings]);

  // Ana sekmeleri hazırla
  const mainTabs = React.useMemo(() => {
    const tabs: { [key: string]: { label: string; subTabs: Array<{ id: string; label: string }> } } = {};

    Object.keys(groupedSettings).forEach((tabName) => {
      tabs[tabName] = {
        label: tabName,
        subTabs: Object.keys(groupedSettings[tabName]).map((groupName) => ({
          id: groupName,
          label: groupName,
        })),
      };
    });

    return tabs;
  }, [groupedSettings]);

  // Alt sekmeleri hazırla
  const subTabs = React.useMemo(() => {
    if (!activeMainTab || !groupedSettings[activeMainTab]) return [];

    return Object.keys(groupedSettings[activeMainTab]).map((groupName) => ({
      id: groupName,
      label: groupName,
    }));
  }, [activeMainTab, groupedSettings]);

  // Aktif ayarları filtrele
  const activeSettings = React.useMemo(() => {
    if (
      !activeMainTab ||
      !activeSubTab ||
      !groupedSettings[activeMainTab] ||
      !groupedSettings[activeMainTab][activeSubTab]
    ) {
      return [];
    }

    return groupedSettings[activeMainTab][activeSubTab];
  }, [activeMainTab, activeSubTab, groupedSettings]);

  // Arama fonksiyonu
  React.useEffect(() => {
    if (!searchTerm.trim()) {
      setIsSearchActive(false);
      setSearchResults({});
      return;
    }

    setIsSearchActive(true);
    const searchTermLower = searchTerm.toLowerCase();
    const results: { [key: string]: string[] } = {};

    // Tüm ayarları ara
    Object.keys(groupedSettings).forEach((tabName) => {
      results[tabName] = [];
      
      Object.keys(groupedSettings[tabName]).forEach((groupName) => {
        groupedSettings[tabName][groupName].forEach((setting) => {
          // ParamName, ParamKey ve ParamValue içinde ara
          if (
            setting.ParamName.toLowerCase().includes(searchTermLower) ||
            setting.ParamKey.toLowerCase().includes(searchTermLower) ||
            setting.ParamValue.toLowerCase().includes(searchTermLower)
          ) {
            // Eğer bu tab için henüz sonuç yoksa, ekle
            if (!results[tabName].includes(groupName)) {
              results[tabName].push(groupName);
            }
          }
        });
      });
      
      // Eğer bu tab için sonuç yoksa, bu tabı sonuçlardan çıkar
      if (results[tabName].length === 0) {
        delete results[tabName];
      }
    });

    setSearchResults(results);

    // Eğer arama sonuçları varsa, ilk sonuca git
    const tabsWithResults = Object.keys(results);
    if (tabsWithResults.length > 0) {
      const firstTabWithResults = tabsWithResults[0];
      const firstGroupWithResults = results[firstTabWithResults][0];
      
      if (activeMainTab !== firstTabWithResults || activeSubTab !== firstGroupWithResults) {
        setActiveMainTab(firstTabWithResults);
        setActiveSubTab(firstGroupWithResults);
      }
    }
  }, [searchTerm, groupedSettings, activeMainTab, activeSubTab]);

  // Ayar değişikliklerini işle
  const handleSettingChange = React.useCallback((setting: StoreSetting, newValue: string | boolean | number) => {
    console.log('Setting changed:', {
      id: setting.SettingsID,
      name: setting.ParamName,
      oldValue: setting.ParamValue,
      newValue,
    });

    // State'i güncelle
    setStoreSettings(prevSettings => 
      prevSettings.map(s => {
        if (s.SettingsID === setting.SettingsID) {
          // Convert the value to string to match the StoreSetting type
          const stringValue = typeof newValue === 'boolean' 
            ? (newValue ? '1' : '0') 
            : String(newValue);
            
          return { ...s, ParamValue: stringValue };
        }
        return s;
      })
    );
  }, []);

  const handleSave = () => {
    console.log('Settings saved:', storeSettings);
    // Here you would typically send the updated settings to your backend
  };

  const handleCancel = () => {
    console.log('Settings cancelled');
    // Reload the original settings
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-gray-50 h-full">
        <div className="text-gray-500">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex flex-1 overflow-hidden">
        {/* Sol Sidebar - Now in a container that doesn't force full height */}
        <div className="bg-white border-r border-gray-200">
          <SettingsSidebar
            tabs={mainTabs}
            activeMainTab={activeMainTab}
            onMainTabChange={setActiveMainTab}
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
          />
        </div>

        {/* Sağ İçerik */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Arama Sonuçları */}
          {isSearchActive && Object.keys(searchResults).length > 0 && (
            <div className="m-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-blue-700 font-medium mb-2">
                "{searchTerm}" için arama sonuçları
              </p>
              {Object.entries(searchResults).map(([tabName, groupNames]) => (
                <div key={tabName} className="mb-2">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">
                    {tabName}:
                  </h4>
                  <ul className="pl-4 text-sm text-gray-600">
                    {groupNames.map((groupName) => (
                      <li key={groupName} className="mb-1">
                        • {groupName}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Üst Tablar */}
          <SettingsSubTabs
            tabs={subTabs}
            activeSubTab={activeSubTab}
            onSubTabChange={setActiveSubTab}
          />

          {/* Form İçeriği */}
          <div className="flex-1 overflow-auto px-8 pb-20">
            <BusinessInfoForm
              settings={activeSettings}
              onChange={handleSettingChange}
            />
          </div>
          
          {/* Fixed Action Buttons */}
          <div className="flex-none sticky bottom-0 left-0 right-0 z-10">
            <SettingsActionButtons
              onCancel={handleCancel}
              onSave={handleSave}
            />
          </div>
        </div>
      </div>
    </div>
  );
}