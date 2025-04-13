import React, { useState } from 'react';
import { Search, Settings2, ChevronRight, Store, Clock, Tag, Users, Bell, Shield, Truck, Package, Percent, CreditCard } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface SettingsSidebarProps {
  tabs: {
    [key: string]: {
      label: string;
      subTabs: Array<{ id: string; label: string }>;
    };
  };
  activeMainTab: string;
  activeSubTab?: string;
  onMainTabChange: (tab: string) => void;
  onSubTabChange?: (mainTab: string, subTab: string) => void;
  searchTerm: string;
  onSearch: (term: string) => void;
}

// Büyük harfli metni düzeltme fonksiyonu
const formatText = (text: string) => {
  if (!text) return '';
  if (text === text.toUpperCase()) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  return text;
};

// Tab ikonlarını getir
const getTabIcon = (label: string): JSX.Element => {
  const icons: { [key: string]: JSX.Element } = {
    'Genel': <Settings2 className="w-4 h-4 text-blue-600" />,
    'İşletme': <Store className="w-4 h-4 text-indigo-600" />,
    'Çalışma Saatleri': <Clock className="w-4 h-4 text-purple-600" />,
    'Etiketler': <Tag className="w-4 h-4 text-pink-600" />,
    'Kullanıcılar': <Users className="w-4 h-4 text-orange-600" />,
    'Bildirimler': <Bell className="w-4 h-4 text-yellow-600" />,
    'Güvenlik': <Shield className="w-4 h-4 text-red-600" />,
    'Teslimat': <Truck className="w-4 h-4 text-green-600" />,
    'Ürünler': <Package className="w-4 h-4 text-cyan-600" />,
    'İndirimler': <Percent className="w-4 h-4 text-violet-600" />,
    'Ödeme': <CreditCard className="w-4 h-4 text-emerald-600" />
  };
  return icons[label] || <Settings2 className="w-4 h-4 text-gray-600" />;
};

export default function SettingsSidebar({
  tabs,
  activeMainTab,
  activeSubTab,
  onMainTabChange,
  onSubTabChange,
  searchTerm,
  onSearch,
}: SettingsSidebarProps) {
  const [expandedTabs, setExpandedTabs] = useState<Record<string, boolean>>({
    [activeMainTab]: true // Default to expanded for active tab
  });

  const toggleExpand = (tabKey: string) => {
    setExpandedTabs(prev => ({
      ...prev,
      [tabKey]: !prev[tabKey]
    }));
  };

  // Check if we're on the security page
  const isSecurityPage = activeMainTab === 'security' || activeMainTab?.includes('security');

  return (
    <div className="w-80 border-r border-gray-200 bg-white overflow-auto">
      {/* Başlık */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-lg font-semibold text-gray-900">Ayarlar</h1>
        <p className="mt-1 text-sm text-gray-500">
          İşletme ayarlarını yönetin
        </p>
      </div>

      {/* Arama */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Ayarlarda ara..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>
      </div>
      
      {/* Tab Listesi */}
      <div className="p-4">
        <nav className="space-y-2">
          {Object.entries(tabs).map(([key, tab]) => {
            const isActive = key === activeMainTab;
            const isExpanded = expandedTabs[key] || isActive;
            const showSubTabs = isSecurityPage && key === 'security';
            
            return (
              <div key={key} className="space-y-1">
                <button
                  onClick={() => {
                    onMainTabChange(key);
                    if (showSubTabs) {
                      toggleExpand(key);
                    }
                  }}
                  className={`
                    w-full flex items-center justify-between p-3 rounded-lg relative group
                    transition-all duration-200 ease-in-out
                    ${isActive
                      ? 'bg-gradient-to-r from-blue-50 to-white border border-blue-100 shadow-sm'
                      : 'hover:bg-gray-50 hover:border hover:border-gray-200'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    {/* İkon */}
                    <div className={`
                      p-2 rounded-lg
                      ${isActive 
                        ? 'bg-gradient-to-br from-blue-100 to-blue-50' 
                        : 'bg-gray-100 group-hover:bg-gray-200'
                      }
                    `}>
                      {getTabIcon(formatText(tab.label))}
                    </div>

                    {/* Label */}
                    <div className="flex flex-col min-w-0">
                      <span className={`
                        text-sm font-medium truncate
                        ${isActive ? 'text-blue-700' : 'text-gray-700'}
                      `}>
                        {formatText(tab.label)}
                      </span>
                      {showSubTabs && tab.subTabs.length > 0 && (
                        <span className="text-xs text-gray-500 mt-0.5">
                          {tab.subTabs.length} alt kategori
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Ok İkonu - Sadece security sayfasında göster */}
                  {showSubTabs && tab.subTabs.length > 0 && (
                    <ChevronRight 
                      size={16} 
                      className={`
                        shrink-0 transition-transform duration-300
                        ${isExpanded 
                          ? 'text-blue-500 rotate-90' 
                          : 'text-gray-400 group-hover:text-gray-500'
                        }
                      `}
                    />
                  )}

                  {/* Aktif Çizgi */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-r-full" />
                  )}
                </button>

                {/* Sub Tabs - Sadece security sayfasında göster */}
                {showSubTabs && isExpanded && tab.subTabs.length > 0 && (
                  <div className="ml-12 space-y-1 mt-1 mb-2">
                    {tab.subTabs.map((subTab) => {
                      const isSubActive = activeSubTab === subTab.id;
                      return (
                        <button
                          key={subTab.id}
                          onClick={() => onSubTabChange && onSubTabChange(key, subTab.id)}
                          className={`
                            w-full text-left px-4 py-2 rounded-lg text-sm transition-colors
                            ${isSubActive 
                              ? 'bg-blue-50 text-blue-700 font-medium' 
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }
                          `}
                        >
                          {formatText(subTab.label)}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}