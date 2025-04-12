import React from 'react';
import { BusinessSettings } from '@/types/settings';

interface HappyHourFormProps {
  settings: BusinessSettings;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const HappyHourForm: React.FC<HappyHourFormProps> = ({ settings, onChange }) => {
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
              checked={settings.happyHourActive}
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
              checked={settings.automaticHappyHourMode}
              onChange={onChange}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="automaticHappyHourMode" className="ml-2 text-sm font-medium text-gray-700">
              Otomatik Happy Hour Modu Aktif
            </label>
          </div>

          {/* Time Settings */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="happyHourStartTime" className="block text-sm font-medium text-gray-700 mb-1">
                Happy Hour Başlama Saati
              </label>
              <input
                type="time"
                id="happyHourStartTime"
                name="happyHourStartTime"
                value={settings.happyHourStartTime}
                onChange={onChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              />
            </div>

            <div>
              <label htmlFor="happyHourEndTime" className="block text-sm font-medium text-gray-700 mb-1">
                Happy Hour Bitiş Saati
              </label>
              <input
                type="time"
                id="happyHourEndTime"
                name="happyHourEndTime"
                value={settings.happyHourEndTime}
                onChange={onChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              />
            </div>
          </div>

          {/* Excluded Sale Types */}
          <div>
            <label htmlFor="happyHourExcludedSaleTypes" className="block text-sm font-medium text-gray-700 mb-1">
              Happy Hour Kullanılmayacak Satış Tipleri(1;2;5;)
            </label>
            <input
              type="text"
              id="happyHourExcludedSaleTypes"
              name="happyHourExcludedSaleTypes"
              value={settings.happyHourExcludedSaleTypes}
              onChange={onChange}
              placeholder="Örnek: 1;2;5"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HappyHourForm;