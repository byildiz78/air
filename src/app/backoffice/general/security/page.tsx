'use client';

import React, { useState, useEffect } from 'react';
import { SettingsTabs } from '@/types/settings';
import SettingsSidebar from '../../../../components/backoffice/settings/SettingsSidebar';
import SettingsActionButtons from '../../../../components/backoffice/settings/SettingsActionButtons';
import SecurityForm from '../../../../components/backoffice/settings/SecurityForm';

interface SecuritySettingItem {
  AuthorityID: number;
  GroupName: string;
  AuthorityKey: string;
  AuthorityText: string;
  AuthorityDescription: string | null;
  DefaultLevel: number;
  NeedAllways: string;
  AllowManager: string;
  AllowCashier: string;
  EditKey: string;
  SyncKey: string;
  BranchID: string | null;
  UpdateDateTime: string;
  AuthorityListKey: string;
}

export default function SecuritySettingsPage() {
  const [activeMainTab, setActiveMainTab] = useState('security');
  const [activeSubTab, setActiveSubTab] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [securityGroups, setSecurityGroups] = useState<string[]>([]);
  const [activeSecurityGroup, setActiveSecurityGroup] = useState<string>('');
  const [securityItems, setSecurityItems] = useState<SecuritySettingItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<SecuritySettingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [tabs, setTabs] = useState<SettingsTabs>({
    security: {
      label: 'Güvenlik',
      subTabs: []
    }
  });

  useEffect(() => {
    const fetchSecuritySettings = async () => {
      try {
        const response = await fetch('/user_security_settings.json');
        const data: SecuritySettingItem[] = await response.json();
        
        // Extract unique groups
        const uniqueGroups = Array.from(new Set(data.map(item => item.GroupName)));
        setSecurityGroups(uniqueGroups);
        
        // Set initial active group
        if (uniqueGroups.length > 0 && !activeSecurityGroup) {
          setActiveSecurityGroup(uniqueGroups[0]);
          setActiveSubTab(uniqueGroups[0].toLowerCase());
        }
        
        // Update tabs with security groups
        const updatedTabs: SettingsTabs = {
          security: {
            label: 'Güvenlik',
            subTabs: uniqueGroups.map(group => ({
              id: group.toLowerCase(),
              label: group
            }))
          }
        };
        setTabs(updatedTabs);
        
        setSecurityItems(data);
        setFilteredItems(data.filter(item => item.GroupName === uniqueGroups[0]));
        setLoading(false);
      } catch (error) {
        console.error('Error loading security settings:', error);
        setLoading(false);
      }
    };

    fetchSecuritySettings();
  }, []);

  // Handle search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      // If search is empty, show only items from active group
      setIsSearchActive(false);
      setFilteredItems(securityItems.filter(item => item.GroupName === activeSecurityGroup));
      return;
    }

    // If there's a search term, filter across all groups
    setIsSearchActive(true);
    const searchTermLower = searchTerm.toLowerCase();
    
    const filtered = securityItems.filter(item => {
      const textMatch = item.AuthorityText.toLowerCase().includes(searchTermLower);
      const descMatch = item.AuthorityDescription 
        ? item.AuthorityDescription.toLowerCase().includes(searchTermLower) 
        : false;
      const keyMatch = item.AuthorityKey.toLowerCase().includes(searchTermLower);
      
      return textMatch || descMatch || keyMatch;
    });
    
    setFilteredItems(filtered);
  }, [searchTerm, activeSecurityGroup, securityItems]);

  // Update filtered items when active group changes (only if not searching)
  useEffect(() => {
    if (!isSearchActive) {
      setFilteredItems(securityItems.filter(item => item.GroupName === activeSecurityGroup));
    }
  }, [activeSecurityGroup, securityItems, isSearchActive]);

  const handleSecurityChange = (item: SecuritySettingItem, field: string, value: number | boolean | string) => {
    setSecurityItems(prev => {
      return prev.map(prevItem => {
        if (prevItem.AuthorityID === item.AuthorityID) {
          return { ...prevItem, [field]: value };
        }
        return prevItem;
      });
    });
  };

  const handleSave = () => {
    console.log('Security settings saved:', securityItems);
    // Here you would typically send the updated settings to your backend
  };

  const handleCancel = () => {
    console.log('Settings cancelled');
    // Reload the original settings
  };

  const handleMainTabChange = (mainTab: string) => {
    setActiveMainTab(mainTab);
  };

  const handleSubTabChange = (mainTab: string, subTab: string) => {
    setActiveMainTab(mainTab);
    setActiveSubTab(subTab);
    
    // Find the matching group (case insensitive)
    const matchingGroup = securityGroups.find(
      group => group.toLowerCase() === subTab.toLowerCase()
    );
    
    if (matchingGroup) {
      setActiveSecurityGroup(matchingGroup);
      // Clear search when changing tabs
      setSearchTerm('');
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Group filtered items by GroupName for display when searching
  const groupedFilteredItems = isSearchActive 
    ? filteredItems.reduce<Record<string, SecuritySettingItem[]>>((acc, item) => {
        if (!acc[item.GroupName]) {
          acc[item.GroupName] = [];
        }
        acc[item.GroupName].push(item);
        return acc;
      }, {})
    : { [activeSecurityGroup]: filteredItems };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="flex flex-1 overflow-hidden">
        {/* Main Settings Sidebar - Now in a container that doesn't force full height */}
        <div className="bg-white border-r border-gray-200">
          <SettingsSidebar
            tabs={tabs}
            activeMainTab={activeMainTab}
            activeSubTab={activeSubTab}
            onMainTabChange={handleMainTabChange}
            onSubTabChange={handleSubTabChange}
            searchTerm={searchTerm}
            onSearch={handleSearch}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-4">Güvenlik Ayarları</h1>
              <p className="text-gray-600 mb-6">
                {isSearchActive 
                  ? `"${searchTerm}" için arama sonuçları (${filteredItems.length} sonuç)`
                  : 'Kullanıcı yetkilendirme ve güvenlik ayarlarını buradan yönetebilirsiniz.'
                }
              </p>
              
              {loading ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
                  Yükleniyor...
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
                  <p className="text-gray-500">Sonuç bulunamadı.</p>
                </div>
              ) : (
                <>
                  {Object.entries(groupedFilteredItems).map(([groupName, items]) => (
                    <div key={groupName} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
                      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900">{groupName}</h2>
                      </div>
                      <div className="p-4">
                        <SecurityForm 
                          onChange={handleSecurityChange}
                          items={items}
                        />
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
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