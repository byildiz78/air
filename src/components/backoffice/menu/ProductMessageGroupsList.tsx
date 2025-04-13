import React from 'react';
import { Settings } from 'lucide-react';

interface ProductMessageGroup {
  id: string;
  name: string;
  secondLanguageName: string;
  image: string;
  isActive: boolean;
  showHeader: boolean;
  customCode1: string;
  customCode2: string;
  customCode3: string;
  customCode4: string;
  customCode5: string;
  securityLevel: number;
}

interface ProductMessageGroupsListProps {
  groups: ProductMessageGroup[];
  selectedGroupId: string | null;
  onGroupSelect: (groupId: string | null) => void;
}

export const ProductMessageGroupsList: React.FC<ProductMessageGroupsListProps> = ({
  groups,
  selectedGroupId,
  onGroupSelect
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 h-full flex flex-col">
      <div className="bg-gray-100 px-3 py-1 border-b border-gray-200 flex-shrink-0">
        <h2 className="text-base font-semibold text-gray-800">ÜRÜN MESAJ GRUPLARI</h2>
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
              {group.image && (
                <img 
                  src={group.image} 
                  alt={group.name}
                  className="w-4 h-4 rounded mr-1 flex-shrink-0 object-cover" 
                />
              )}
              <span className="truncate">{group.name}</span>
              {group.secondLanguageName && (
                <span className="text-xs text-gray-500 ml-1">({group.secondLanguageName})</span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-50 p-1 border-t border-gray-200 flex-shrink-0">
        <button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1 rounded-md flex items-center justify-center gap-1 transition-colors duration-200 text-sm"
          onClick={() => window.location.href = '/backoffice/menu/products/message-groups'}
        >
          <Settings size={14} />
          GRUPLARI DÜZENLE
        </button>
      </div>
    </div>
  );
};
