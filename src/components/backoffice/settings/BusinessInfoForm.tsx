import React from 'react';
import { StoreSetting } from '@/types/settings';
import { Settings2, AlertCircle, Key, Info, Check, X } from 'lucide-react';

interface BusinessInfoFormProps {
  settings: StoreSetting[];
  onChange: (setting: StoreSetting, newValue: string | boolean) => void;
}

// Büyük harfli metni düzeltme fonksiyonu
const formatText = (text: string) => {
  if (!text) return '';
  if (text === text.toUpperCase()) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  return text;
};

// Boolean değeri kontrol etme fonksiyonu
const isTrueValue = (value: string | null) => {
  if (!value) return false;
  return ['1', 'true', 'yes', 'evet'].includes(value.toLowerCase());
};

export default function BusinessInfoForm({ settings, onChange }: BusinessInfoFormProps) {
  const handleChange = (setting: StoreSetting, value: string | boolean) => {
    if (setting.ParamType === 'bool' || setting.ParamType === 'pbool') {
      onChange(setting, value ? '1' : '0');
    } else {
      onChange(setting, value);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Başlık */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg shadow-blue-100">
              <Settings2 className="w-7 h-7 text-white" />
            </div>
            <div>
          
              <p className="text-sm text-gray-500 mt-1 flex items-center">
                <span className="font-medium text-gray-900">{settings.length}</span>
                <span className="ml-1">ayar yapılandırması bulundu</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Kartları */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {settings.map((setting) => (
          <div
            key={setting.SettingsID}
            className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300"
          >
            {/* Kart Başlığı */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <label 
                  htmlFor={`setting-${setting.SettingsID}`}
                  className="text-base font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200"
                >
                  {formatText(setting.ParamName)}
                </label>
                <div className="flex items-center space-x-2">
                  {setting.DefaultValue !== setting.ParamValue && (
                    <div className="px-2.5 py-1 text-xs font-medium bg-amber-50 text-amber-700 rounded-full border border-amber-200/50 shadow-sm flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Değiştirildi
                    </div>
                  )}
                  <div className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full border border-gray-200/50">
                    {setting.ParamType}
                  </div>
                </div>
              </div>

              {/* Meta Bilgiler */}
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center px-2 py-1 rounded-md bg-gray-50">
                  <Key className="w-3 h-3 mr-1.5 text-gray-400" />
                  <span className="font-medium">{setting.ParamKey}</span>
                </div>
                {setting.DefaultValue && setting.DefaultValue !== setting.ParamValue && (
                  <div className="flex items-center px-2 py-1 rounded-md bg-gray-50">
                    <Info className="w-3 h-3 mr-1.5 text-gray-400" />
                    <span>Varsayılan: <span className="font-medium">{setting.DefaultValue}</span></span>
                  </div>
                )}
              </div>
            </div>

            {/* Form Alanı */}
            <div className="p-6">
              {(setting.ParamType === 'bool' || setting.ParamType === 'pbool') ? (
                <div className="flex items-center justify-between">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={isTrueValue(setting.ParamValue)}
                      onChange={(e) => handleChange(setting, e.target.checked)}
                    />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:shadow-sm after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-blue-600"></div>
                  </label>
                  <div className={`
                    flex items-center px-3 py-1 rounded-full text-xs font-medium
                    ${isTrueValue(setting.ParamValue) 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'bg-gray-100 text-gray-600'
                    }
                  `}>
                    {isTrueValue(setting.ParamValue) ? (
                      <>
                        <Check className="w-3.5 h-3.5 mr-1" />
                        Aktif
                      </>
                    ) : (
                      <>
                        <X className="w-3.5 h-3.5 mr-1" />
                        Pasif
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <input
                    type="text"
                    id={`setting-${setting.SettingsID}`}
                    value={setting.ParamValue || ''}
                    onChange={(e) => handleChange(setting, e.target.value)}
                    className="block w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 transition-all duration-200 placeholder-gray-400"
                    placeholder={setting.DefaultValue || 'Değer girin...'}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}