import React from 'react';
import { SettingsTab } from '@/types/settings';

interface SettingsSubTabsProps {
  subTabs: SettingsTab[];
  activeSubTab: string;
  onSubTabChange: (subTabId: string) => void;
}

const SettingsSubTabs: React.FC<SettingsSubTabsProps> = ({
  subTabs,
  activeSubTab,
  onSubTabChange,
}) => {
  return (
    <div className="mb-3 pb-2 border-b border-gray-200">
      <div className="flex space-x-1">
        {subTabs.map((subTab) => (
          <button
            key={subTab.id}
            type="button"
            onClick={() => onSubTabChange(subTab.id)}
            className={`
              px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200
              ${activeSubTab === subTab.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }
            `}
          >
            {subTab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingsSubTabs;