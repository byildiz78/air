'use client';

import { useState, useEffect } from 'react';
import { X, Plus, Trash2, DollarSign, Users, ShoppingCart, Layers } from 'lucide-react';
import { ComboMenu, ComboSelectionGroup, ComboProduct } from '@/types/comboMenu';
import { nanoid } from 'nanoid';

interface ComboMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (combo: ComboMenu) => void;
  combo?: ComboMenu;
}

const emptyGroup: Omit<ComboSelectionGroup, 'id'> = {
  name: '',
  minSelection: 1,
  maxSelection: 1,
  products: []
};

const emptyProduct: Omit<ComboProduct, 'id'> = {
  name: '',
  price: 0
};

export function ComboMenuModal({ isOpen, onClose, onSave, combo }: ComboMenuModalProps) {
  const [formData, setFormData] = useState<ComboMenu>({
    id: '',
    name: '',
    basePrice: 0,
    description: '',
    isActive: true,
    selectionGroups: []
  });

  useEffect(() => {
    if (combo) {
      setFormData(combo);
    } else {
      setFormData({
        id: nanoid(),
        name: '',
        basePrice: 0,
        description: '',
        isActive: true,
        selectionGroups: []
      });
    }
  }, [combo]);

  const handleAddGroup = () => {
    setFormData(prev => ({
      ...prev,
      selectionGroups: [
        ...prev.selectionGroups,
        {
          ...emptyGroup,
          id: nanoid(),
          products: []
        }
      ]
    }));
  };

  const handleRemoveGroup = (groupId: string) => {
    setFormData(prev => ({
      ...prev,
      selectionGroups: prev.selectionGroups.filter(g => g.id !== groupId)
    }));
  };

  const handleGroupChange = (groupId: string, field: keyof ComboSelectionGroup, value: any) => {
    setFormData(prev => ({
      ...prev,
      selectionGroups: prev.selectionGroups.map(group =>
        group.id === groupId
          ? { ...group, [field]: value }
          : group
      )
    }));
  };

  const handleAddProduct = (groupId: string) => {
    setFormData(prev => ({
      ...prev,
      selectionGroups: prev.selectionGroups.map(group =>
        group.id === groupId
          ? {
              ...group,
              products: [
                ...group.products,
                {
                  ...emptyProduct,
                  id: nanoid()
                }
              ]
            }
          : group
      )
    }));
  };

  const handleRemoveProduct = (groupId: string, productId: string) => {
    setFormData(prev => ({
      ...prev,
      selectionGroups: prev.selectionGroups.map(group =>
        group.id === groupId
          ? {
              ...group,
              products: group.products.filter(p => p.id !== productId)
            }
          : group
      )
    }));
  };

  const handleProductChange = (groupId: string, productId: string, field: keyof ComboProduct, value: any) => {
    setFormData(prev => ({
      ...prev,
      selectionGroups: prev.selectionGroups.map(group =>
        group.id === groupId
          ? {
              ...group,
              products: group.products.map(product =>
                product.id === productId
                  ? { ...product, [field]: value }
                  : product
              )
            }
          : group
      )
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-[800px] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-blue-500" />
            {combo ? 'Kombo Menü Düzenle' : 'Yeni Kombo Menü'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-auto">
          <div className="p-4 space-y-6">
            {/* Ana bilgiler */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-500" />
                  Temel Bilgiler
                </h3>
              </div>
              
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Menü Adı
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full h-10 rounded-lg bg-gray-50 border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Temel Fiyat
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        value={formData.basePrice}
                        onChange={e => setFormData(prev => ({ ...prev, basePrice: parseFloat(e.target.value) }))}
                        className="w-full h-10 rounded-lg bg-gray-50 border border-gray-300 pl-9 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Açıklama
                  </label>
                  <input
                    type="text"
                    value={formData.description || ''}
                    onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full h-10 rounded-lg bg-gray-50 border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </div>
              </div>
            </div>

            {/* Seçim grupları */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-500" />
                  Seçim Grupları
                </h3>
                <button
                  type="button"
                  onClick={handleAddGroup}
                  className="bg-emerald-500 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm hover:bg-emerald-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Grup Ekle
                </button>
              </div>

              <div className="p-4 space-y-4">
                {formData.selectionGroups.map((group, groupIndex) => (
                  <div key={group.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 flex justify-between items-center">
                      <h4 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-500" />
                        Grup #{groupIndex + 1}
                      </h4>
                      <button
                        type="button"
                        onClick={() => handleRemoveGroup(group.id)}
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="p-4 space-y-4">
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Grup Adı
                          </label>
                          <input
                            type="text"
                            value={group.name}
                            onChange={e => handleGroupChange(group.id, 'name', e.target.value)}
                            className="w-full h-10 rounded-lg bg-gray-50 border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            required
                          />
                        </div>
                        <div className="w-32">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Min Seçim
                          </label>
                          <input
                            type="number"
                            value={group.minSelection}
                            onChange={e => handleGroupChange(group.id, 'minSelection', parseInt(e.target.value))}
                            className="w-full h-10 rounded-lg bg-gray-50 border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            required
                            min="0"
                          />
                        </div>
                        <div className="w-32">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Max Seçim
                          </label>
                          <input
                            type="number"
                            value={group.maxSelection}
                            onChange={e => handleGroupChange(group.id, 'maxSelection', parseInt(e.target.value))}
                            className="w-full h-10 rounded-lg bg-gray-50 border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            required
                            min="1"
                          />
                        </div>
                      </div>

                      {/* Ürünler */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h5 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                            <ShoppingCart className="w-4 h-4 text-emerald-500" />
                            Ürünler
                          </h5>
                          <button
                            type="button"
                            onClick={() => handleAddProduct(group.id)}
                            className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                            Ürün Ekle
                          </button>
                        </div>

                        <div className="space-y-2">
                          {group.products.map((product, productIndex) => (
                            <div key={product.id} className="flex gap-2 items-start">
                              <div className="flex-1">
                                <input
                                  type="text"
                                  value={product.name}
                                  onChange={e => handleProductChange(group.id, product.id, 'name', e.target.value)}
                                  placeholder="Ürün adı"
                                  className="w-full h-10 rounded-lg bg-gray-50 border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                  required
                                />
                              </div>
                              <div className="w-32">
                                <div className="relative">
                                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                  <input
                                    type="number"
                                    value={product.price}
                                    onChange={e => handleProductChange(group.id, product.id, 'price', parseFloat(e.target.value))}
                                    placeholder="Ek ücret"
                                    className="w-full h-10 rounded-lg bg-gray-50 border border-gray-300 pl-9 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                    required
                                    min="0"
                                    step="0.01"
                                  />
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveProduct(group.id, product.id)}
                                className="text-red-500 hover:text-red-600 transition-colors h-10 px-2"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>

        <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            İptal
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}
