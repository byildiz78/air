import React, { useState, useEffect } from 'react';
import { X, Circle, Square, RectangleHorizontal as Rectangle } from 'lucide-react';

interface TableSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tableId: string;
  onSave: (settings: TableSettings) => void;
  initialShape: 'round' | 'square' | 'rectangle';
  initialSize: 'small' | 'medium' | 'large';
}

interface TableSettings {
  id: string;
  name: string;
  capacity: number;
  averageSeatingDuration: number;
  isSmokingArea: boolean;
  isWindowSide: boolean;
  isLoca: boolean;
  isSpecialArea: boolean;
  postalCode: string;
  securityLevel: number;
  noDiscountAllowed: boolean;
  shape: 'round' | 'square' | 'rectangle';
  size: 'small' | 'medium' | 'large';
}

const TableSettingsModal: React.FC<TableSettingsModalProps> = ({
  isOpen,
  onClose,
  tableId,
  onSave,
  initialShape,
  initialSize
}) => {
  const [settings, setSettings] = useState<TableSettings>({
    id: tableId,
    name: tableId,
    capacity: 4,
    averageSeatingDuration: 60,
    isSmokingArea: false,
    isWindowSide: false,
    isLoca: false,
    isSpecialArea: false,
    postalCode: '1',
    securityLevel: 3,
    noDiscountAllowed: false,
    shape: initialShape,
    size: initialSize
  });

  useEffect(() => {
    setSettings(prev => ({
      ...prev,
      id: tableId,
      shape: initialShape,
      size: initialSize
    }));
  }, [tableId, initialShape, initialSize]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = () => {
    onSave(settings);
    onClose();
  };

  const shapes = [
    { id: 'round', label: 'Yuvarlak', icon: Circle },
    { id: 'square', label: 'Kare', icon: Square },
    { id: 'rectangle', label: 'Dikdörtgen', icon: Rectangle }
  ];

  const sizes = [
    { id: 'small', label: 'Küçük' },
    { id: 'medium', label: 'Orta' },
    { id: 'large', label: 'Büyük' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[500px]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Masa Düzenleme</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Table Shape Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Masa Şekli
            </label>
            <div className="grid grid-cols-3 gap-3">
              {shapes.map(shape => {
                const Icon = shape.icon;
                return (
                  <button
                    key={shape.id}
                    type="button"
                    onClick={() => setSettings(prev => ({ ...prev, shape: shape.id as any }))}
                    className={`
                      flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all
                      ${settings.shape === shape.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-200'
                      }
                    `}
                  >
                    <Icon 
                      size={24} 
                      className={settings.shape === shape.id ? 'text-blue-500' : 'text-gray-400'} 
                    />
                    <span className={`text-sm ${settings.shape === shape.id ? 'text-blue-500' : 'text-gray-500'}`}>
                      {shape.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Table Size Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Masa Boyutu
            </label>
            <div className="grid grid-cols-3 gap-3">
              {sizes.map(size => (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => setSettings(prev => ({ ...prev, size: size.id as any }))}
                  className={`
                    p-3 rounded-lg border-2 transition-all
                    ${settings.size === size.id
                      ? 'border-blue-500 bg-blue-50 text-blue-500'
                      : 'border-gray-200 text-gray-500 hover:border-blue-200'
                    }
                  `}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Masa Adı
              </label>
              <input
                type="text"
                name="name"
                value={settings.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Oturma Kapasitesi
              </label>
              <input
                type="number"
                name="capacity"
                value={settings.capacity}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ortalama Oturma Süresi (dakika)
              </label>
              <input
                type="number"
                name="averageSeatingDuration"
                value={settings.averageSeatingDuration}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Table Features */}
          <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isSmokingArea"
                name="isSmokingArea"
                checked={settings.isSmokingArea}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="isSmokingArea" className="ml-2 text-sm text-gray-700">
                Sigara içilebilen bölüm
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isWindowSide"
                name="isWindowSide"
                checked={settings.isWindowSide}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="isWindowSide" className="ml-2 text-sm text-gray-700">
                Pencere kenarı
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isLoca"
                name="isLoca"
                checked={settings.isLoca}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="isLoca" className="ml-2 text-sm text-gray-700">
                Loca
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isSpecialArea"
                name="isSpecialArea"
                checked={settings.isSpecialArea}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="isSpecialArea" className="ml-2 text-sm text-gray-700">
                Özel alan
              </label>
            </div>
          </div>

          {/* Additional Settings */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Posta Numarası
              </label>
              <select
                name="postalCode"
                value={settings.postalCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Güvenlik Seviyesi
              </label>
              <select
                name="securityLevel"
                value={settings.securityLevel}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="noDiscountAllowed"
                name="noDiscountAllowed"
                checked={settings.noDiscountAllowed}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="noDiscountAllowed" className="ml-2 text-sm text-gray-700">
                İndirim Yapılamaz
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            İptal
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Tamam
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableSettingsModal;