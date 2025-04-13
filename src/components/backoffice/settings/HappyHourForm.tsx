import React from 'react';
import { BusinessSettings } from '@/types/settings';

interface HappyHourFormProps {
  settings: BusinessSettings;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const HappyHourForm: React.FC<HappyHourFormProps> = ({ settings, onChange }) => {
  // Helper function to safely convert settings value to boolean
  const getBooleanValue = (value: string | number | boolean | null): boolean => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value.toLowerCase() === 'true';
    if (typeof value === 'number') return value !== 0;
    return false;
  };

  // Helper function to safely convert settings value to string
  const getStringValue = (value: string | number | boolean | null): string => {
    if (value === null) return '';
    return String(value);
  };

  return (
    <div className="divide-y divide-gray-200">
      {/* Section Header */}
      <div className="px-3 py-2.5 bg-gray-50">
        <h3 className="text-lg font-medium text-gray-900">Happy Hour</h3>
        <p className="mt-1 text-sm text-gray-500">
          Happy hour ayarlarını ve zamanlamalarını buradan yönetebilirsiniz.
        </p>
      </div>

      {/* Form Content */}
      <div className="p-3">
        <div className="space-y-4">
          {/* Happy Hour Status */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="happyHourActive"
              name="happyHourActive"
              checked={getBooleanValue(settings.happyHourActive)}
              onChange={onChange}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="happyHourActive" className="ml-2 text-sm font-medium text-gray-700">
              Happy Hours Aktif
            </label>
          </div>

          {/* Automatic Mode */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="automaticHappyHourMode"
              name="automaticHappyHourMode"
              checked={getBooleanValue(settings.automaticHappyHourMode)}
              onChange={onChange}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="automaticHappyHourMode" className="ml-2 text-sm font-medium text-gray-700">
              Otomatik Happy Hour Modu Aktif
            </label>
          </div>

          {/* Happy Hour Start Time */}
          <div>
            <label htmlFor="happyHourStartTime" className="block text-sm font-medium text-gray-700">
              Başlangıç Saati
            </label>
            <input
              type="time"
              id="happyHourStartTime"
              name="happyHourStartTime"
              value={getStringValue(settings.happyHourStartTime)}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          {/* Happy Hour End Time */}
          <div>
            <label htmlFor="happyHourEndTime" className="block text-sm font-medium text-gray-700">
              Bitiş Saati
            </label>
            <input
              type="time"
              id="happyHourEndTime"
              name="happyHourEndTime"
              value={getStringValue(settings.happyHourEndTime)}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          {/* Happy Hour Discount Rate */}
          <div>
            <label htmlFor="happyHourDiscountRate" className="block text-sm font-medium text-gray-700">
              İndirim Oranı (%)
            </label>
            <input
              type="number"
              id="happyHourDiscountRate"
              name="happyHourDiscountRate"
              value={getStringValue(settings.happyHourDiscountRate)}
              onChange={onChange}
              min="0"
              max="100"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          {/* Excluded Sale Types */}
          <div>
            <label htmlFor="happyHourExcludedSaleTypes" className="block text-sm font-medium text-gray-700">
              Happy Hour Kullanılmayacak Satış Tipleri(1;2;5;)
            </label>
            <input
              type="text"
              id="happyHourExcludedSaleTypes"
              name="happyHourExcludedSaleTypes"
              value={getStringValue(settings.happyHourExcludedSaleTypes)}
              onChange={onChange}
              placeholder="Örnek: 1;2;5"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HappyHourForm;