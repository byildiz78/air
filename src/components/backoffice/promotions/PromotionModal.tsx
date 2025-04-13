'use client';

import { useState } from 'react';
import { Tag, X, Save, Calendar, Clock, DollarSign } from 'lucide-react';
import { Promotion, Product, ProductGroup, initialProducts, initialGroups } from '@/types/promotion';
import ProductSelector from '@/components/ui/ProductSelector';

interface PromotionModalProps {
  promotion?: Promotion;
  editMode: 'new' | 'edit';
  onClose: () => void;
  onSubmit: (promotion: Promotion) => void;
}

export default function PromotionModal({
  promotion,
  editMode,
  onClose,
  onSubmit
}: PromotionModalProps) {
  const [includedProducts, setIncludedProducts] = useState<string[]>(promotion?.includedProducts || []);
  const [excludedProducts, setExcludedProducts] = useState<string[]>(promotion?.excludedProducts || []);
  const [includedGroups, setIncludedGroups] = useState<string[]>(promotion?.includedGroups || []);
  const [excludedGroups, setExcludedGroups] = useState<string[]>(promotion?.excludedGroups || []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const updatedPromotion: Promotion = {
      id: promotion?.id || '',
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      discountType: formData.get('discountType') as 'PERCENTAGE' | 'FIXED',
      discountValue: parseFloat(formData.get('discountValue') as string),
      startDate: formData.get('startDate') as string || undefined,
      endDate: formData.get('endDate') as string || undefined,
      timeRangeEnabled: formData.get('timeRangeEnabled') === 'true',
      timeRangeStart: formData.get('timeRangeStart') ? parseInt(formData.get('timeRangeStart') as string) : undefined,
      timeRangeEnd: formData.get('timeRangeEnd') ? parseInt(formData.get('timeRangeEnd') as string) : undefined,
      minimumAmount: formData.get('minimumAmount') ? parseFloat(formData.get('minimumAmount') as string) : undefined,
      minimumAmountEnabled: formData.get('minimumAmountEnabled') === 'true',
      daysEnabled: formData.get('daysEnabled') === 'true',
      activeDays: {
        monday: formData.get('monday') === 'true',
        tuesday: formData.get('tuesday') === 'true',
        wednesday: formData.get('wednesday') === 'true',
        thursday: formData.get('thursday') === 'true',
        friday: formData.get('friday') === 'true',
        saturday: formData.get('saturday') === 'true',
        sunday: formData.get('sunday') === 'true'
      },
      buttonImage: formData.get('buttonImage') as string || undefined,
      discountCode: formData.get('discountCode') as string || undefined,
      securityLevel: parseInt(formData.get('securityLevel') as string),
      isActive: formData.get('isActive') === 'true',
      isProductDiscount: formData.get('isProductDiscount') === 'true',
      isCheckDiscount: formData.get('isCheckDiscount') === 'true',
      excludeDiscountedItems: formData.get('excludeDiscountedItems') === 'true',
      includedProducts,
      excludedProducts,
      includedGroups,
      excludedGroups
    };

    onSubmit(updatedPromotion);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden border border-gray-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b bg-gradient-to-r from-blue-500/10 to-emerald-500/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Tag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
                  {editMode === 'new' ? 'Yeni İndirim' : 'İndirim Düzenle'}
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  {editMode === 'new' ? 'Yeni bir indirim tanımı ekleyin' : 'İndirim tanımını güncelleyin'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 p-1 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-4 overflow-y-auto max-h-[calc(90vh-180px)]">
            <div className="space-y-8">
              {/* Genel Bilgiler */}
              <div>
                <h3 className="flex items-center gap-2 text-base font-medium text-gray-900 mb-4">
                  <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
                  Genel Bilgiler
                </h3>
                <div className="space-y-4 bg-gray-50/50 p-4 rounded-lg border border-gray-100">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">İndirim Adı</label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={promotion?.name}
                      required
                      className="w-full px-3 py-2 bg-white border rounded-md focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                    <textarea
                      name="description"
                      defaultValue={promotion?.description}
                      rows={3}
                      className="w-full px-3 py-2 bg-white border rounded-md focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">İndirim Tipi</label>
                      <select
                        name="discountType"
                        defaultValue={promotion?.discountType || 'PERCENTAGE'}
                        required
                        className="w-full px-3 py-2 bg-white border rounded-md focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      >
                        <option value="PERCENTAGE">Yüzde (%)</option>
                        <option value="FIXED">Tutar (TL)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">İndirim Değeri</label>
                      <input
                        type="number"
                        name="discountValue"
                        defaultValue={promotion?.discountValue}
                        required
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 bg-white border rounded-md focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Güvenlik Seviyesi</label>
                    <select
                      name="securityLevel"
                      defaultValue={promotion?.securityLevel || 1}
                      required
                      className="w-full px-3 py-2 bg-white border rounded-md focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>Seviye {i + 1}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Geçerlilik */}
              <div>
                <h3 className="flex items-center gap-2 text-base font-medium text-gray-900 mb-4">
                  <div className="w-1 h-5 bg-purple-500 rounded-full"></div>
                  Geçerlilik
                </h3>
                <div className="space-y-4 bg-gray-50/50 p-4 rounded-lg border border-gray-100">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Başlangıç Tarihi</label>
                      <input
                        type="date"
                        name="startDate"
                        defaultValue={promotion?.startDate}
                        className="w-full px-3 py-2 bg-white border rounded-md focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bitiş Tarihi</label>
                      <input
                        type="date"
                        name="endDate"
                        defaultValue={promotion?.endDate}
                        className="w-full px-3 py-2 bg-white border rounded-md focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        name="timeRangeEnabled"
                        defaultChecked={promotion?.timeRangeEnabled}
                        className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">Saat Aralığı</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4 ml-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Başlangıç Saati</label>
                        <input
                          type="time"
                          name="timeRangeStart"
                          defaultValue={promotion?.timeRangeStart?.toString()}
                          className="w-full px-3 py-2 bg-white border rounded-md focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bitiş Saati</label>
                        <input
                          type="time"
                          name="timeRangeEnd"
                          defaultValue={promotion?.timeRangeEnd?.toString()}
                          className="w-full px-3 py-2 bg-white border rounded-md focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        name="minimumAmountEnabled"
                        defaultChecked={promotion?.minimumAmountEnabled}
                        className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">Minimum Tutar</span>
                    </label>
                    <div className="ml-6">
                      <input
                        type="number"
                        name="minimumAmount"
                        defaultValue={promotion?.minimumAmount}
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 bg-white border rounded-md focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        name="daysEnabled"
                        defaultChecked={promotion?.daysEnabled}
                        className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">Geçerli Günler</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2 ml-6">
                      {[
                        { name: 'monday', label: 'Pazartesi' },
                        { name: 'tuesday', label: 'Salı' },
                        { name: 'wednesday', label: 'Çarşamba' },
                        { name: 'thursday', label: 'Perşembe' },
                        { name: 'friday', label: 'Cuma' },
                        { name: 'saturday', label: 'Cumartesi' },
                        { name: 'sunday', label: 'Pazar' }
                      ].map((day) => (
                        <label key={day.name} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            name={day.name}
                            defaultChecked={promotion?.activeDays[day.name as keyof typeof promotion.activeDays]}
                            className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500/20"
                          />
                          <span className="text-sm text-gray-700">{day.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Diğer Ayarlar */}
              <div>
                <h3 className="flex items-center gap-2 text-base font-medium text-gray-900 mb-4">
                  <div className="w-1 h-5 bg-amber-500 rounded-full"></div>
                  Diğer Ayarlar
                </h3>
                <div className="space-y-4 bg-gray-50/50 p-4 rounded-lg border border-gray-100">
                  <div className="grid grid-cols-1 gap-3">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="isActive"
                        defaultChecked={promotion?.isActive}
                        className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                      <span className="text-sm text-gray-700">Aktif</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="isProductDiscount"
                        defaultChecked={promotion?.isProductDiscount}
                        className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                      <span className="text-sm text-gray-700">Ürün İndirimi</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="isCheckDiscount"
                        defaultChecked={promotion?.isCheckDiscount}
                        className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                      <span className="text-sm text-gray-700">Çek İndirimi</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="excludeDiscountedItems"
                        defaultChecked={promotion?.excludeDiscountedItems}
                        className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                      <span className="text-sm text-gray-700">İndirimli Ürünlere Uygulanmaz</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">İndirim Kodu</label>
                    <input
                      type="text"
                      name="discountCode"
                      defaultValue={promotion?.discountCode}
                      className="w-full px-3 py-2 bg-white border rounded-md focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Ürün ve Grup Seçimi */}
              <div>
                <h3 className="flex items-center gap-2 text-base font-medium text-gray-900 mb-4">
                  <div className="w-1 h-5 bg-amber-500 rounded-full"></div>
                  Ürün ve Grup Seçimi
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <ProductSelector
                      title="Dahil Edilecek Ürün ve Gruplar"
                      products={initialProducts}
                      groups={initialGroups}
                      selectedProducts={includedProducts}
                      selectedGroups={includedGroups}
                      onProductsChange={setIncludedProducts}
                      onGroupsChange={setIncludedGroups}
                    />
                  </div>
                  <div>
                    <ProductSelector
                      title="Hariç Tutulacak Ürün ve Gruplar"
                      products={initialProducts}
                      groups={initialGroups}
                      selectedProducts={excludedProducts}
                      selectedGroups={excludedGroups}
                      onProductsChange={setExcludedProducts}
                      onGroupsChange={setExcludedGroups}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-md transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow-sm transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
