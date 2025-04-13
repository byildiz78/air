'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { TerminalSettings, SettingsTabs, ServiceSettings, CashierSettings } from '@/types/settings';
import SettingsSidebar from '../../../../components/backoffice/settings/SettingsSidebar';
import SettingsSubTabs from '../../../../components/backoffice/settings/SettingsSubTabs';
import SettingsActionButtons from '../../../../components/backoffice/settings/SettingsActionButtons';
import TerminalForm from '../../../../components/backoffice/settings/TerminalForm';
import CashierForm from '../../../../components/backoffice/settings/CashierForm';
import ServiceForm from '../../../../components/backoffice/settings/ServiceForm';

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
    label: 'Kasiyer',
    subTabs: [
      { id: 'cashier-settings', label: 'Kasiyer Ayarları' },
      { id: 'integrations', label: 'Entegrasyonlar' }
    ]
  },
  service: {
    label: 'Servis',
    subTabs: [
      { id: 'general', label: 'Genel' },
      { id: 'other', label: 'Diğer' }
    ]
  }
};

const settingsLabels: Record<string, string> = {
  terminalNo: 'Terminal Numarası',
  terminalName: 'Terminal Adı',
  backgroundImage: 'Arka Plan Resmi',
  sidebarImage: 'Kenar Çubuğu Resmi',
  defaultFloorPlan: 'Varsayılan Kat Planı',
  terminalInterface: 'Terminal Arayüzü',
  language: 'Dil',
  showQRMenuNotifications: 'QR Menü Bildirimlerini Göster',
  
  enablePaymentFeatures: 'Ödeme Özelliklerini Etkinleştir',
  rememberCashierAndPassword: 'Kasiyer ve Şifre Hatırla',
  showPaymentDrawerButton: 'Para Çekmecesi Butonunu Göster',
  paymentScreenDisplayDuration: 'Para Üstü Ekranı Görünme Süresi',
  showMobilePaymentsInCashierScreen: 'Kasiyer Çıkış Ekranında Mobil Ödemeleri Göster',
  useKDVGroups: 'KDV Gruplarını Kullan',
  enableEtkinlikKasasi: 'Etkinlik Kasası',
  loadKDVFromTaxGroups: 'KDV İsimlerini TaxGroups Tablosundan Beslensin',
  useHuginIntegration: 'Hugin Yazarkasa Kullanıyor',
  
  enableTableService: 'Masa Servisini Etkinleştir',
  enableSelfService: 'Self Servisi Etkinleştir',
  enableTakeaway: 'Paket Servisi Etkinleştir',
  enableDelivery: 'Teslimat Etkinleştir',
  autoAssignWaiter: 'Garson Otomatik Ata',
  requireCustomerInfo: 'Müşteri Bilgisi Gerekli',
  showCourseManagement: 'Kurs Yönetimini Göster',
  enableTableTransfer: 'Masa Transferini Etkinleştir',
  enableGuestCount: 'Misafir Sayısını Etkinleştir',
  defaultGuestCount: 'Varsayılan Misafir Sayısı',
  
  showOrderNotes: 'Sipariş Notlarını Göster',
  enableDiscounts: 'İndirimleri Etkinleştir',
  requireReasonForDiscount: 'İndirim İçin Sebep Gerekli',
  enableSplitBill: 'Hesap Bölmeyi Etkinleştir',
  enablePartialPayment: 'Kısmi Ödemeyi Etkinleştir',
  showOrderHistory: 'Sipariş Geçmişini Göster',
  printReceiptAutomatically: 'Makbuzu Otomatik Yazdır',
  enableTips: 'Bahşişleri Etkinleştir',
  defaultTipPercentage: 'Varsayılan Bahşiş Yüzdesi'
};

interface SearchResults {
  general: string[];
  services: string[];
  service: string[];
}

interface TerminalSettingsState {
  terminalNo: string;
  terminalName: string;
  backgroundImage: string;
  sidebarImage: string;
  defaultFloorPlan: string;
  terminalInterface: string;
  language: string;
  showQRMenuNotifications: boolean;
  [key: string]: string | boolean | number;
}

interface CashierSettingsState extends CashierSettings {}

const initialCashierSettings: CashierSettingsState = {
  enablePaymentFeatures: false,
  rememberCashierAndAskPassword: false,
  showCashDrawerButton: false,
  cashOverlayDisplayDuration: 5,
  showMobilePaymentsOnCashierScreen: false,
  useDelicatessenKDVGroups: false,
  activityCashier: false,
  loadKDVNamesFromTaxgroups: false,
  useHuginCashRegister: false
};

interface ServiceSettingsState {
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
    [key: string]: boolean | number | string;
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
    [key: string]: boolean | number | string;
  };
  [key: string]: any;
}

export default function TerminalSettingsPage() {
  const [activeMainTab, setActiveMainTab] = useState('services');
  const [activeSubTab, setActiveSubTab] = useState('cashier-settings');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults>({ 
    general: [], 
    services: [], 
    service: [] 
  });
  const [isSearchActive, setIsSearchActive] = useState(false);
  
  const [settings, setSettings] = useState<TerminalSettingsState>({
    terminalNo: '1',
    terminalName: 'KASA',
    backgroundImage: '',
    sidebarImage: '',
    defaultFloorPlan: 'SALON',
    terminalInterface: 'OFFICE_2010_BLUE',
    language: 'TR',
    showQRMenuNotifications: false
  });

  const [cashierSettings, setCashierSettings] = useState<CashierSettingsState>(initialCashierSettings);

  const [serviceSettings, setServiceSettings] = useState<ServiceSettingsState>({
    general: {
      enableTableService: true,
      enableSelfService: false,
      enableTakeaway: true,
      enableDelivery: true,
      autoAssignWaiter: false,
      requireCustomerInfo: false,
      showCourseManagement: true,
      enableTableTransfer: true,
      enableGuestCount: true,
      defaultGuestCount: 2
    },
    other: {
      showOrderNotes: true,
      enableDiscounts: true,
      requireReasonForDiscount: true,
      enableSplitBill: true,
      enablePartialPayment: true,
      showOrderHistory: true,
      printReceiptAutomatically: false,
      enableTips: true,
      defaultTipPercentage: 10
    }
  });

  useEffect(() => {
    if (!searchTerm.trim()) {
      setIsSearchActive(false);
      setSearchResults({ general: [], services: [], service: [] });
      return;
    }

    setIsSearchActive(true);
    const searchTermLower = searchTerm.toLowerCase();
    
    const generalResults = Object.keys(settings).filter(key => {
      const label = settingsLabels[key] || key;
      return label.toLowerCase().includes(searchTermLower);
    });
    
    const servicesResults = Object.keys(cashierSettings).filter(key => {
      const label = settingsLabels[key] || key;
      return label.toLowerCase().includes(searchTermLower);
    });
    
    const serviceGeneralResults = Object.keys(serviceSettings.general).filter(key => {
      const label = settingsLabels[key] || key;
      return label.toLowerCase().includes(searchTermLower);
    });
    
    const serviceOtherResults = Object.keys(serviceSettings.other).filter(key => {
      const label = settingsLabels[key] || key;
      return label.toLowerCase().includes(searchTermLower);
    });
    
    if (generalResults.length > 0 && activeMainTab !== 'general') {
      setActiveMainTab('general');
      setActiveSubTab('terminal-info');
    } else if (servicesResults.length > 0 && activeMainTab !== 'services') {
      setActiveMainTab('services');
      setActiveSubTab('cashier-settings');
    } else if ((serviceGeneralResults.length > 0 || serviceOtherResults.length > 0) && activeMainTab !== 'service') {
      setActiveMainTab('service');
      setActiveSubTab(serviceGeneralResults.length > 0 ? 'general' : 'other');
    }
    
    setSearchResults({
      general: generalResults,
      services: servicesResults,
      service: [...serviceGeneralResults, ...serviceOtherResults]
    });
    
  }, [searchTerm, activeMainTab]);

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : false;

    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCashierSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setCashierSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleServiceSettingsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, 
    section?: string
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : false;

    if (section) {
      setServiceSettings(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [name]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setServiceSettings(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value
      }));
    }
  };

  const handleTabChange = (mainTab: string, subTab: string) => {
    setActiveMainTab(mainTab);
    setActiveSubTab(subTab);
  };

  const handleSave = () => {
    console.log('Settings saved:', { 
      general: settings, 
      cashier: cashierSettings, 
      service: serviceSettings 
    });
  };

  const handleCancel = () => {
    console.log('Settings cancelled');
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const renderContent = () => {
    if (activeMainTab === 'services') {
      return <CashierForm onChange={handleCashierSettingsChange} settings={cashierSettings} />;
    }
    if (activeMainTab === 'service') {
      return <ServiceForm onChange={handleServiceSettingsChange} settings={serviceSettings} activeTab={activeSubTab} />;
    }
    return <TerminalForm onChange={handleSettingsChange} settings={settings} />;
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="flex flex-1 overflow-hidden">
        <div className="bg-white border-r border-gray-200">
          <SettingsSidebar
            tabs={tabs}
            activeMainTab={activeMainTab}
            activeSubTab={activeSubTab}
            onMainTabChange={setActiveMainTab}
            onSubTabChange={handleTabChange}
            searchTerm={searchTerm}
            onSearch={handleSearch}
          />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto">
            <div className="p-3">
              {isSearchActive && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-blue-700 font-medium mb-2">
                    "{searchTerm}" için arama sonuçları
                  </p>
                  {Object.entries(searchResults).map(([tab, results]) => (
                    results.length > 0 && (
                      <div key={tab} className="mb-2">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">
                          {tabs[tab as keyof typeof tabs].label}:
                        </h4>
                        <ul className="pl-4 text-sm text-gray-600">
                          {results.map((key: string) => (
                            <li key={key} className="mb-1">
                              • {settingsLabels[key] || key}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  ))}
                </div>
              )}
              
              <SettingsSubTabs
                tabs={tabs[activeMainTab as keyof typeof tabs].subTabs}
                activeSubTab={activeSubTab}
                onSubTabChange={(subTab) => setActiveSubTab(subTab)}
              />

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-3">
                {renderContent()}
              </div>
            </div>
          </div>

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