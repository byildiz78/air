import React from 'react';
import { X, Trash2, Save } from 'lucide-react';

interface ProductMessageGroup {
  id?: string;
  name: string;
  secondLanguageName: string;
  isActive: boolean;
  showHeader: boolean;
  securityLevel: number;
  color: string;
}

interface ProductMessageGroupsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (group: ProductMessageGroup) => void;
  group?: ProductMessageGroup;
}

const colorOptions = [
  '#3B82F6', '#F59E0B', '#EF4444', '#22C55E', 
  '#8B5CF6', '#6B7280', '#EC4899'
];

export default function ProductMessageGroupsModal({
  isOpen,
  onClose,
  onSave,
  group
}: ProductMessageGroupsModalProps) {
  const [formData, setFormData] = React.useState<ProductMessageGroup>({
    name: '',
    secondLanguageName: '',
    isActive: true,
    showHeader: true,
    securityLevel: 1,
    color: '#3B82F6'
  });

  const handleSave = () => {
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-lg w-[600px] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-medium text-gray-900">
            {group?.id ? 'Mesaj Grubu Düzenle' : 'Yeni Mesaj Grubu'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Ana Bilgiler */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Grup Adı
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Grup adını girin"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                İkinci Dil
              </label>
              <input
                type="text"
                value={formData.secondLanguageName}
                onChange={(e) => setFormData(prev => ({ ...prev, secondLanguageName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="İkinci dildeki adını girin"
              />
            </div>
          </div>

          {/* Ayarlar */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Güvenlik Seviyesi
              </label>
              <select
                value={formData.securityLevel}
                onChange={(e) => setFormData(prev => ({ ...prev, securityLevel: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                {[1, 2, 3, 4, 5].map(level => (
                  <option key={level} value={level}>Seviye {level}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Renk
              </label>
              <div className="flex gap-2">
                {colorOptions.map(color => (
                  <button
                    key={color}
                    onClick={() => setFormData(prev => ({ ...prev, color }))}
                    className={`w-8 h-8 rounded-full transition-all ${
                      formData.color === color 
                        ? 'ring-2 ring-offset-2 ring-blue-500' 
                        : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Aktif</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.showHeader}
                  onChange={(e) => setFormData(prev => ({ ...prev, showHeader: e.target.checked }))}
                  className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Başlık Göster</span>
              </label>
            </div>
          </div>

          {/* Önizleme */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Önizleme
            </label>
            <div 
              className="h-20 rounded-lg flex items-center justify-center text-white transition-colors shadow-sm"
              style={{ backgroundColor: formData.color }}
            >
              <div className="text-center">
                <div className="font-medium">{formData.name || 'Grup Adı'}</div>
                {formData.secondLanguageName && (
                  <div className="text-sm opacity-80">{formData.secondLanguageName}</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-gray-50 flex justify-between">
          {group?.id && (
            <button 
              onClick={onClose}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-700 hover:text-red-800"
            >
              <Trash2 className="h-4 w-4 mr-1.5" />
              Sil
            </button>
          )}
          <div className="flex gap-3 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
            >
              İptal
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              <Save className="h-4 w-4 mr-1.5" />
              Kaydet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
