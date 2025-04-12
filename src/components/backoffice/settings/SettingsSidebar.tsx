import React from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { SettingsTabs } from '@/types/settings';

interface SettingsSidebarProps {
  tabs: SettingsTabs;
  activeMainTab: string;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onTabChange: (mainTab: string, subTab: string) => void;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  tabs,
  activeMainTab,
  searchTerm,
  onSearchChange,
  onTabChange,
}) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200">
      <div className="p-3">
        {/* Search */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Ayarlarda ara..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>

        {/* Main Categories */}
        <div className="space-y-0.5">
          {Object.entries(tabs).map(([key, tab]) => (
            <button
              key={key}
              onClick={() => onTabChange(key, tab.subTabs[0].id)}
              className={`
                w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-all duration-200
                ${activeMainTab === key
                  ? 'bg-blue-50 text-blue-600 shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              <span className="font-medium">{tab.label}</span>
              <ChevronRight 
                size={16} 
                className={`transform transition-transform duration-200 ${activeMainTab === key ? 'rotate-90' : ''}`} 
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsSidebar;