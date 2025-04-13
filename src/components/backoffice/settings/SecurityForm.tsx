import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';

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

interface SecurityFormProps {
  onChange: (item: SecuritySettingItem, field: string, value: number | boolean | string) => void;
  sidebarGroups?: string[]; // Optional array of groups to display in the sidebar
  items?: SecuritySettingItem[]; // Optional array of security items to display
}

const SecurityForm: React.FC<SecurityFormProps> = ({ onChange, sidebarGroups = [], items = [] }) => {
  const [securityItems, setSecurityItems] = useState<Record<string, SecuritySettingItem[]>>({});
  const [loading, setLoading] = useState(items.length === 0);
  const [activeGroup, setActiveGroup] = useState<string>("");
  const [groups, setGroups] = useState<string[]>(sidebarGroups);

  useEffect(() => {
    // If items are provided, use them directly
    if (items.length > 0) {
      setLoading(false);
      return;
    }

    // Otherwise fetch from the JSON file
    const fetchSecuritySettings = async () => {
      try {
        const response = await fetch('/user_security_settings.json');
        const data: SecuritySettingItem[] = await response.json();
        
        // Group items by GroupName
        const groupedItems: Record<string, SecuritySettingItem[]> = {};
        const uniqueGroups = new Set<string>();
        
        data.forEach(item => {
          const groupKey = item.GroupName;
          uniqueGroups.add(groupKey);
          
          if (!groupedItems[groupKey]) {
            groupedItems[groupKey] = [];
          }
          groupedItems[groupKey].push(item);
        });
        
        setSecurityItems(groupedItems);
        
        // If sidebarGroups is empty, use the groups from the data
        if (sidebarGroups.length === 0) {
          const groupsArray = Array.from(uniqueGroups);
          setGroups(groupsArray);
          
          // Set the first group as active by default
          if (groupsArray.length > 0 && !activeGroup) {
            setActiveGroup(groupsArray[0]);
          }
        } else if (!activeGroup && sidebarGroups.length > 0) {
          // If sidebarGroups is provided and no active group is set, use the first one
          setActiveGroup(sidebarGroups[0]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading security settings:', error);
        setLoading(false);
      }
    };

    fetchSecuritySettings();
  }, [activeGroup, sidebarGroups, items]);

  const getLevelColor = (level: number) => {
    if (level <= 3) return 'bg-green-500';
    if (level <= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getLevelTextColor = (level: number) => {
    if (level <= 3) return 'text-green-600';
    if (level <= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const renderLevelIndicator = (level: number) => {
    return (
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${getLevelColor(level)} transition-all duration-300`}
            style={{ width: `${(level / 10) * 100}%` }}
          />
        </div>
        <span className={`text-sm font-medium ${getLevelTextColor(level)}`}>
          {level}
        </span>
      </div>
    );
  };

  const renderSecurityItem = (item: SecuritySettingItem) => {
    const level = item.DefaultLevel;
    const isRequired = item.NeedAllways === "1";
    const allowManager = item.AllowManager === "1";
    const allowCashier = item.AllowCashier === "1";

    return (
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-blue-500/30 transition-colors">
        <div className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h5 className="text-base font-medium text-gray-900 mb-1">{item.AuthorityText}</h5>
              {item.AuthorityDescription && (
                <p className="text-sm text-gray-500 mb-3">{item.AuthorityDescription}</p>
              )}
              <div className="mb-3">
                {renderLevelIndicator(level)}
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={level}
                  onChange={(e) => onChange(item, 'DefaultLevel', parseInt(e.target.value))}
                  className={`
                    px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors
                    ${getLevelTextColor(level)} border-gray-300 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  `}
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Seviye {i + 1}
                    </option>
                  ))}
                </select>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isRequired}
                    onChange={(e) => onChange(item, 'NeedAllways', e.target.checked ? "1" : "0")}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    id={`required-${item.AuthorityID}`}
                  />
                  <label htmlFor={`required-${item.AuthorityID}`} className="text-sm text-gray-600">
                    Zorunlu (Her durumda şifre sorulsun)
                  </label>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  checked={allowManager}
                  onChange={(e) => onChange(item, 'AllowManager', e.target.checked ? "1" : "0")}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  id={`manager-${item.AuthorityID}`}
                />
                <label htmlFor={`manager-${item.AuthorityID}`} className="text-sm text-gray-700">
                  Müdür
                </label>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  checked={allowCashier}
                  onChange={(e) => onChange(item, 'AllowCashier', e.target.checked ? "1" : "0")}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  id={`cashier-${item.AuthorityID}`}
                />
                <label htmlFor={`cashier-${item.AuthorityID}`} className="text-sm text-gray-700">
                  Kasiyer
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="p-4 text-center">Yükleniyor...</div>;
  }

  // If items are provided directly, use them
  if (items.length > 0) {
    return (
      <div className="space-y-3">
        {items.map(item => (
          <div key={item.AuthorityID}>
            {renderSecurityItem(item)}
          </div>
        ))}
      </div>
    );
  }

  // Otherwise use the grouped items
  const currentItems = securityItems[activeGroup] || [];

  // This component only renders the content part, not the sidebar
  return (
    <div className="flex-1">
      {/* Header */}
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Shield size={20} className="text-blue-500" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Güvenlik Ayarları</h3>
            <p className="mt-1 text-sm text-gray-500">
              Kullanıcı yetkilendirme ve güvenlik ayarlarını buradan yönetebilirsiniz.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{activeGroup}</h2>
        <div className="space-y-3">
          {currentItems.length > 0 ? (
            currentItems.map(item => (
              <div key={item.AuthorityID}>
                {renderSecurityItem(item)}
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              Bu grup için güvenlik ayarı bulunamadı.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Export a sidebar component that can be used with SecurityForm
export const SecuritySidebar: React.FC<{
  groups: string[];
  activeGroup: string;
  onGroupChange: (group: string) => void;
}> = ({ groups, activeGroup, onGroupChange }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // Initialize expanded state for all groups
  useEffect(() => {
    const initialExpanded: Record<string, boolean> = {};
    groups.forEach(group => {
      initialExpanded[group] = true; // Default to expanded
    });
    setExpanded(initialExpanded);
  }, [groups]);

  const toggleExpand = (group: string) => {
    setExpanded(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  return (
    <div className="w-64 border-r border-gray-200 bg-white">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Ayarlar</h2>
        <p className="text-sm text-gray-500">İşletme ayarlarını yönetin</p>
      </div>
      
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Ayarlarda ara..."
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <nav className="p-2">
        <ul className="space-y-1">
          {groups.map((group) => (
            <li key={group} className="rounded-lg overflow-hidden">
              <button
                onClick={() => toggleExpand(group)}
                className={`w-full flex items-center justify-between px-4 py-2 text-sm font-medium ${
                  activeGroup === group
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <span className="mr-2 text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947z" clipRule="evenodd" />
                      <path d="M10 13a3 3 0 100-6 3 3 0 000 6z" />
                    </svg>
                  </span>
                  {group}
                </div>
                <span className={`transform transition-transform ${expanded[group] ? 'rotate-180' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              
              {expanded[group] && (
                <div className="pl-10 pr-4 py-1 bg-gray-50">
                  <button
                    onClick={() => onGroupChange(group)}
                    className={`w-full text-left py-1.5 px-2 rounded text-sm ${
                      activeGroup === group
                        ? 'font-medium text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {group} Ayarları
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SecurityForm;