import React from 'react';
import { Filter } from 'lucide-react';

interface KitchenDisplayFiltersProps {
  filters: {
    status: string[];
    orderTypes: string[];
    timeRange: string;
  };
  onFiltersChange: (filters: Partial<{
    status: string[];
    orderTypes: string[];
    timeRange: string;
  }>) => void;
}

const KitchenDisplayFilters: React.FC<KitchenDisplayFiltersProps> = ({
  filters,
  onFiltersChange
}) => {
  // Toggle a value in an array filter
  const toggleArrayFilter = (filterName: 'status' | 'orderTypes', value: string) => {
    const currentValues = filters[filterName];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFiltersChange({ [filterName]: newValues });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Filter size={18} className="mr-2 text-gray-500" />
        <h2 className="text-lg font-medium">Filtreler</h2>
      </div>
      
      {/* Status filters */}
      <div>
        <h3 className="text-sm font-medium mb-2 text-gray-700">Sipariş Durumu</h3>
        <div className="space-y-2">
          {[
            { id: 'pending', label: 'Beklemede' },
            { id: 'in-progress', label: 'Hazırlanıyor' },
            { id: 'ready', label: 'Hazır' }
          ].map(status => (
            <label key={status.id} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={filters.status.includes(status.id)}
                onChange={() => toggleArrayFilter('status', status.id)}
              />
              <span className="text-sm text-gray-700">{status.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Order type filters */}
      <div>
        <h3 className="text-sm font-medium mb-2 text-gray-700">Sipariş Tipi</h3>
        <div className="space-y-2">
          {[
            { id: 'dine-in', label: 'Masa Servis' },
            { id: 'takeaway', label: 'Paket Servis' },
            { id: 'delivery', label: 'Kurye' }
          ].map(type => (
            <label key={type.id} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={filters.orderTypes.includes(type.id)}
                onChange={() => toggleArrayFilter('orderTypes', type.id)}
              />
              <span className="text-sm text-gray-700">{type.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KitchenDisplayFilters;
