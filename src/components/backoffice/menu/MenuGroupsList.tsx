import React from 'react';
import { Settings } from 'lucide-react';

interface MenuGroup {
  id: string;
  name: string;
  color: string;
}

interface MenuGroupsListProps {
  groups: MenuGroup[];
  selectedGroupId: string | null;
  onGroupSelect: (groupId: string | null) => void;
}

export const MenuGroupsList: React.FC<MenuGroupsListProps> = ({
  groups,
  selectedGroupId,
  onGroupSelect
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 h-full flex flex-col">
      <div className="bg-gray-100 px-3 py-1 border-b border-gray-200 flex-shrink-0">
        <h2 className="text-base font-semibold text-gray-800">MENÜ GRUPLARI</h2>
      </div>
      
      <div className="p-1 flex-grow overflow-auto">
        <div className="space-y-1">
          {groups.map((group) => (
            <button
              key={group.id}
              className={`w-full text-left px-2 py-1 rounded-md flex items-center transition-colors duration-200 text-sm ${
                selectedGroupId === group.id
                  ? 'bg-blue-100 text-blue-800 border-l-2 border-blue-500'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => onGroupSelect(group.id)}
            >
              <div 
                className="w-3 h-3 rounded-full mr-1 flex-shrink-0" 
                style={{ backgroundColor: group.color }}
              />
              <span className="truncate">{group.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-50 p-1 border-t border-gray-200 flex-shrink-0">
        <button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1 rounded-md flex items-center justify-center gap-1 transition-colors duration-200 text-sm"
          onClick={() => window.location.href = '/backoffice/menu/groups'}
        >
          <Settings size={14} />
          GRUPLARI DÜZENLE
        </button>
      </div>
    </div>
  );
};
