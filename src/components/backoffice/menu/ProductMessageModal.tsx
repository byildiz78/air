import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { ProductMessage } from '@/types/productMessage';

interface ProductMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (message: ProductMessage) => void;
  onDelete?: (messageId: string) => void;
  message: ProductMessage | null;
}

export function ProductMessageModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  message
}: ProductMessageModalProps) {
  const [formData, setFormData] = useState<ProductMessage>({
    id: '',
    name: '',
    extraPrice: 0,
    selectedByDefault: false,
    isKitchenAddMessage: false,
    isKitchenSendMessage: false,
    isPizzaProduction: false,
    isAutomaticForKgProducts: false,
    isDepositMessage: false,
    hideMessage: false,
    groupId: '',
    groupColor: '',
    isActive: true
  });

  useEffect(() => {
    if (message) {
      setFormData(message);
    }
  }, [message]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleDelete = () => {
    if (onDelete && message?.id) {
      onDelete(message.id);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[500px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
          <h2 className="text-base font-medium text-gray-900">
            {message?.id ? 'Mesaj Düzenle' : 'Yeni Mesaj'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  ÜRÜN MESAJI
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-8"
                  required
                />
              </div>

              <div>
                <label htmlFor="extraPrice" className="block text-sm font-medium text-gray-700">
                  EK FİYAT
                </label>
                <input
                  type="number"
                  id="extraPrice"
                  name="extraPrice"
                  value={formData.extraPrice}
                  onChange={handleChange}
                  className="mt-1 block w-[100px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-8"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="selectedByDefault"
                  name="selectedByDefault"
                  checked={formData.selectedByDefault}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="selectedByDefault" className="ml-2 block text-sm text-gray-900">
                  ÜRÜNDE SEÇİLİ GELSİN
                </label>
              </div>
            </div>

            {/* Special Options */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">GENEL</h3>
                <div className="text-sm text-gray-500">Özel alanlar</div>
              </div>
              <div className="space-y-2 border rounded p-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isKitchenAddMessage"
                    name="isKitchenAddMessage"
                    checked={formData.isKitchenAddMessage}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="isKitchenAddMessage" className="ml-2 block text-sm text-gray-900">
                    MUTFAK İLAVE MESAJIDIR
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isKitchenSendMessage"
                    name="isKitchenSendMessage"
                    checked={formData.isKitchenSendMessage}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="isKitchenSendMessage" className="ml-2 block text-sm text-gray-900">
                    MUTFAK GÖNDER MESAJIDIR
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPizzaProduction"
                    name="isPizzaProduction"
                    checked={formData.isPizzaProduction}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="isPizzaProduction" className="ml-2 block text-sm text-gray-900">
                    PİZZA ÜRETİMİ
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isAutomaticForKgProducts"
                    name="isAutomaticForKgProducts"
                    checked={formData.isAutomaticForKgProducts}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="isAutomaticForKgProducts" className="ml-2 block text-sm text-gray-900">
                    KG OLAN ÜRÜNLERE OTOMATİK EKLE
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isDepositMessage"
                    name="isDepositMessage"
                    checked={formData.isDepositMessage}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="isDepositMessage" className="ml-2 block text-sm text-gray-900">
                    DEPOZİTO MESAJIDIR
                  </label>
                </div>
              </div>
            </div>

            {/* Additional Options */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hideMessage"
                name="hideMessage"
                checked={formData.hideMessage}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="hideMessage" className="ml-2 block text-sm text-gray-900">
                ÜRÜN MESAJINI GİZLE
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            İPTAL
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onSave(formData);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            KAYDET
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            SEÇ
          </button>
        </div>
      </div>
    </div>
  );
}
