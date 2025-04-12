import React from 'react';
import { TerminalSettings } from '@/types/settings';

interface TerminalFormProps {
  settings: TerminalSettings;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const TerminalForm: React.FC<TerminalFormProps> = ({ settings, onChange }) => {
  return (
    <div className="divide-y divide-gray-200">
      {/* Section Header */}
      <div className="px-3 py-2.5 bg-gray-50">
        <h3 className="text-lg font-medium text-gray-900">Terminal Ayarları</h3>
        <p className="mt-1 text-sm text-gray-500">
          Terminal bilgilerini ve görünüm ayarlarını buradan yönetebilirsiniz.
        </p>
      </div>

      {/* Form Content */}
      <div className="p-3">
        <div className="grid grid-cols-1 gap-y-3">
          {/* Basic Terminal Info */}
          <div className="space-y-4">
            <h4 className="text-base font-medium text-gray-900 border-b border-gray-200 pb-2">
              Terminal Bilgileri
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Terminal No
                </label>
                <input
                  type="text"
                  name="terminalNo"
                  value={settings.terminalNo}
                  onChange={onChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Terminal Adı
                </label>
                <input
                  type="text"
                  name="terminalName"
                  value={settings.terminalName}
                  onChange={onChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                />
              </div>
            </div>
          </div>

          {/* Display Settings */}
          <div className="space-y-4">
            <h4 className="text-base font-medium text-gray-900 border-b border-gray-200 pb-2">
              Görünüm Ayarları
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Terminal Arka Plan Resmi
                </label>
                <input
                  type="text"
                  name="backgroundImage"
                  value={settings.backgroundImage}
                  onChange={onChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Terminal Yan Bar Resmi
                </label>
                <input
                  type="text"
                  name="sidebarImage"
                  value={settings.sidebarImage}
                  onChange={onChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Varsayılan Salon Planı
                </label>
                <select
                  name="defaultFloorPlan"
                  value={settings.defaultFloorPlan}
                  onChange={onChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                >
                  <option value="SALON">Salon</option>
                  <option value="BAHÇE">Bahçe</option>
                  <option value="TERAS">Teras</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Terminal Arayüzü
                </label>
                <select
                  name="terminalInterface"
                  value={settings.terminalInterface}
                  onChange={onChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                >
                  <option value="OFFICE_2010_BLUE">Office 2010 Blue</option>
                  <option value="MODERN_DARK">Modern Dark</option>
                  <option value="CLASSIC">Classic</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Terminal Dili
              </label>
              <select
                name="language"
                value={settings.language}
                onChange={onChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              >
                <option value="TR">Türkçe</option>
                <option value="EN">English</option>
                <option value="DE">Deutsch</option>
              </select>
            </div>
          </div>

          {/* Additional Settings */}
          <div className="space-y-4">
            <h4 className="text-base font-medium text-gray-900 border-b border-gray-200 pb-2">
              Ek Ayarlar
            </h4>
            
            <div className="flex items-center bg-blue-50 p-4 rounded-lg">
              <input
                type="checkbox"
                name="showQRMenuNotifications"
                checked={settings.showQRMenuNotifications}
                onChange={onChange}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-blue-700">
                Garson Kasasında QR Menü Bildirimlerini Göster
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalForm;