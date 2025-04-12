import React from 'react';
import { BusinessSettings } from '@/types/settings';

interface BusinessInfoFormProps {
  settings: BusinessSettings;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const BusinessInfoForm: React.FC<BusinessInfoFormProps> = ({ settings, onChange }) => {
  return (
    <div className="divide-y divide-gray-200">
      {/* Section Header */}
      <div className="px-3 py-2.5 bg-gray-50">
        <h3 className="text-lg font-medium text-gray-900">İşletme Bilgileri</h3>
        <p className="mt-1 text-sm text-gray-500">
          İşletmenizin temel bilgilerini ve iletişim detaylarını buradan yönetebilirsiniz.
        </p>
      </div>

      {/* Form Content */}
      <div className="p-3">
        <div className="grid grid-cols-1 gap-y-3">
          {/* Basic Info Section */}
          <div className="space-y-4">
            <h4 className="text-base font-medium text-gray-900 border-b border-gray-200 pb-2">
              Temel Bilgiler
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  İşletme Adı
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={settings.businessName}
                  onChange={onChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Semt
                </label>
                <input
                  type="text"
                  name="district"
                  value={settings.district}
                  onChange={onChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                İşletme Adresi
              </label>
              <textarea
                name="businessAddress"
                value={settings.businessAddress}
                onChange={onChange}
                rows={3}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              />
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="space-y-4">
            <h4 className="text-base font-medium text-gray-900 border-b border-gray-200 pb-2">
              İletişim Bilgileri
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  İşletme Telefonu
                </label>
                <input
                  type="text"
                  name="businessPhone"
                  value={settings.businessPhone}
                  onChange={onChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Caller ID Telefon Kodu
                </label>
                <input
                  type="text"
                  name="callerIdCode"
                  value={settings.callerIdCode}
                  onChange={onChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                />
              </div>
            </div>
          </div>

          {/* Location Info Section */}
          <div className="space-y-4">
            <h4 className="text-base font-medium text-gray-900 border-b border-gray-200 pb-2">
              Konum Bilgileri
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Harita İli
                </label>
                <input
                  type="text"
                  name="mapCity"
                  value={settings.mapCity}
                  onChange={onChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Harita İlçesi
                </label>
                <input
                  type="text"
                  name="mapDistrict"
                  value={settings.mapDistrict}
                  onChange={onChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                />
              </div>
            </div>

            <div className="flex items-center bg-blue-50 p-4 rounded-lg">
              <input
                type="checkbox"
                name="useRegisteredAddressProviders"
                checked={settings.useRegisteredAddressProviders}
                onChange={onChange}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-blue-700">
                Kayıtlı Adres Verilerini Kullan
              </label>
            </div>
          </div>

          {/* Integration Settings */}
          <div className="space-y-4">
            <h4 className="text-base font-medium text-gray-900 border-b border-gray-200 pb-2">
              Entegrasyon Ayarları
            </h4>
            
            <div className="grid grid-cols-1 gap-4 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="profiloEnabled"
                  checked={settings.profiloEnabled}
                  onChange={onChange}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Profilo Yazarkasa Kullanılıyor
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="fiscalboxEnabled"
                  checked={settings.fiscalboxEnabled}
                  onChange={onChange}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Fiscalbox Yazarkasa Kullanılıyor
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="pavoAndroidEnabled"
                  checked={settings.pavoAndroidEnabled}
                  onChange={onChange}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Pavo Android Yazarkasa Kullanılıyor
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfoForm;