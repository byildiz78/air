import React from 'react';
import { SecuritySettings } from '@/types/settings';
import { Shield } from 'lucide-react';

interface SecurityFormProps {
  settings: SecuritySettings;
  onChange: (name: string, field: string, value: number | boolean) => void;
  activeTab: string;
}

const SecurityForm: React.FC<SecurityFormProps> = ({ settings, onChange, activeTab }) => {
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

  const renderSecurityItem = (
    name: keyof SecuritySettings,
    label: string,
    setting: SecuritySettings[keyof SecuritySettings]
  ) => {
    return (
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-blue-500/30 transition-colors">
        <div className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h5 className="text-base font-medium text-gray-900 mb-1">{label}</h5>
              <div className="mb-3">
                {renderLevelIndicator(setting.level)}
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={setting.level}
                  onChange={(e) => onChange(name, 'level', parseInt(e.target.value))}
                  className={`
                    px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors
                    ${getLevelTextColor(setting.level)} border-gray-300 
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
                    checked={setting.required}
                    onChange={(e) => onChange(name, 'required', e.target.checked)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">Zorunlu</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  checked={setting.manager}
                  onChange={(e) => onChange(name, 'manager', e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Müdür</span>
              </label>
              <label className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  checked={setting.cashier}
                  onChange={(e) => onChange(name, 'cashier', e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Kasiyer</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const securityItems = {
    general: [
      { key: 'barkodModu', label: 'Barkod Modu Kullanımı' },
      { key: 'siparisNotu', label: 'Sipariş Notu Kullanımı' },
      { key: 'satisTipi', label: 'Satış Tipini Değiştirme' },
      { key: 'indirimDuzenleme', label: 'İndirimleri Düzenleme' },
      { key: 'foyDuzenleme', label: 'Föy Düzenleme' }
    ],
    payment: [
      { key: 'paraCekmecesi', label: 'Para Çekmecesi Açma' },
      { key: 'cariHesap', label: 'Cari Hesap Tahsilatları' }
    ],
    package: [
      { key: 'paketciHesap', label: 'Paketçi Hesap Durumu' },
      { key: 'paketSiparisler', label: 'Paket Siparişleri Sıra Değiştirme' }
    ],
    sales: [
      { key: 'iadeModu', label: 'İade Modu' },
      { key: 'ayirEkrani', label: 'Ayır Ekranında Ödeme Alma' },
      { key: 'hesapYazdirma', label: 'Hesabı Yazdırılan Masalar' }
    ],
    tablet: [
      { key: 'terminalDegistirme', label: 'Terminal Değiştirebilme' }
    ],
    printer: [
      { key: 'kagitAdisyon', label: 'Kağıt Adisyon Yönetimi' }
    ]
  };

  return (
    <div className="divide-y divide-gray-200">
      {/* Section Header */}
      <div className="px-4 py-3 bg-gray-50">
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

      {/* Form Content */}
      <div className="p-4">
        <div className="space-y-3">
          {securityItems[activeTab]?.map(item => (
            <div key={item.key}>
              {renderSecurityItem(
                item.key as keyof SecuritySettings,
                item.label,
                settings[item.key as keyof SecuritySettings]
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityForm;