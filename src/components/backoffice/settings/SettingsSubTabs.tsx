import React from 'react';
import { Settings2, Store, Clock, Tag, Users, Bell, Shield, Truck, Package, Percent, CreditCard } from 'lucide-react';

export interface SettingsSubTabsProps {
  tabs: Array<{
    id: string;
    label: string;
  }>;
  activeSubTab: string;
  onSubTabChange: (subTab: string) => void;
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
    'Genel': <Settings2 className="w-4 h-4" />,
    'İşletme': <Store className="w-4 h-4" />,
    'Çalışma Saatleri': <Clock className="w-4 h-4" />,
    'Etiketler': <Tag className="w-4 h-4" />,
    'Kullanıcılar': <Users className="w-4 h-4" />,
    'Bildirimler': <Bell className="w-4 h-4" />,
    'Güvenlik': <Shield className="w-4 h-4" />,
    'Teslimat': <Truck className="w-4 h-4" />,
    'Ürünler': <Package className="w-4 h-4" />,
    'İndirimler': <Percent className="w-4 h-4" />,
    'Ödeme': <CreditCard className="w-4 h-4" />
  };
  return icons[label] || <Settings2 className="w-4 h-4" />;
};

export default function SettingsSubTabs({
  tabs = [], // Default empty array
  activeSubTab = '', // Default empty string
  onSubTabChange,
}: SettingsSubTabsProps) {
  // Eğer tabs yoksa veya boşsa, hiçbir şey render etme
  if (!tabs?.length) return null;

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-6xl mx-auto py-4">
        {/* Tabs */}
        <div className="flex items-center px-6 gap-1">
          {tabs.map((tab) => {
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSubTabChange(tab.id)}
                className={`
                  group relative py-4 px-5
                  inline-flex items-center gap-3
                  border-b-2 
                  text-sm font-medium
                  transition-all duration-200
                  hover:text-gray-700
                  ${isActive
                    ? 'border-blue-500'
                    : 'border-transparent hover:border-gray-300'
                  }
                `}
              >
                {/* İkon Container */}
                <div className={`
                  p-2 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-br from-blue-500/10 to-blue-600/5 text-blue-600'
                    : 'text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-600'
                  }
                `}>
                  {getTabIcon(formatText(tab.label))}
                </div>

                {/* Label */}
                <span className={`
                  relative transition-all duration-200
                  ${isActive 
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-600 group-hover:text-gray-900'
                  }
                `}>
                  {formatText(tab.label)}
                  
                  {/* Aktif Tab Göstergesi */}
                  {isActive && (
                    <span className="absolute -bottom-4 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" />
                  )}
                </span>

                {/* Hover Efekti */}
                <span className={`
                  absolute inset-0 rounded-lg transition-all duration-200 opacity-0 
                  bg-gradient-to-br from-blue-50 to-transparent
                  group-hover:opacity-100
                  ${isActive ? 'opacity-100' : ''}
                `} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}