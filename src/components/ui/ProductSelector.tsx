'use client';

import { useState } from 'react';
import { Product, ProductGroup } from '@/types/promotion';
import { Plus, X } from 'lucide-react';

interface ProductSelectorProps {
  title: string;
  products: Product[];
  groups: ProductGroup[];
  selectedProducts: string[];
  selectedGroups: string[];
  onProductsChange: (products: string[]) => void;
  onGroupsChange: (groups: string[]) => void;
}

export default function ProductSelector({
  title,
  products,
  groups,
  selectedProducts,
  selectedGroups,
  onProductsChange,
  onGroupsChange
}: ProductSelectorProps) {
  const [showProductModal, setShowProductModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);

  const handleRemoveProduct = (productId: string) => {
    onProductsChange(selectedProducts.filter(id => id !== productId));
  };

  const handleRemoveGroup = (groupId: string) => {
    onGroupsChange(selectedGroups.filter(id => id !== groupId));
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-50 p-4 border-b">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      </div>
      
      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {/* Seçili Ürünler */}
          {selectedProducts.map(id => {
            const product = products.find(p => p.id === id);
            if (!product) return null;
            return (
              <div
                key={id}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-sm"
              >
                <span>{product.name}</span>
                <button
                  onClick={() => handleRemoveProduct(id)}
                  className="w-4 h-4 hover:text-blue-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}
          {/* Seçili Gruplar */}
          {selectedGroups.map(id => {
            const group = groups.find(g => g.id === id);
            if (!group) return null;
            return (
              <div
                key={id}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm"
              >
                <span>{group.name}</span>
                <button
                  onClick={() => handleRemoveGroup(id)}
                  className="w-4 h-4 hover:text-emerald-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowProductModal(true)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            Ürün Ekle
          </button>
          <button
            type="button"
            onClick={() => setShowGroupModal(true)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            Grup Ekle
          </button>
        </div>
      </div>

      {/* Ürün Seçme Modalı */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-[60]">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-4 border-b">
              <h3 className="text-lg font-medium">Ürün Seç</h3>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto">
              <div className="space-y-2">
                {products
                  .filter(p => !selectedProducts.includes(p.id))
                  .map(product => (
                    <label
                      key={product.id}
                      className="flex items-center p-2 rounded hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => {
                          onProductsChange([...selectedProducts, product.id]);
                          setShowProductModal(false);
                        }}
                        className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500/20"
                      />
                      <div className="ml-3 flex-1">
                        <span className="text-sm font-medium text-gray-900">{product.name}</span>
                        <span className="ml-2 text-sm text-gray-500">
                          {groups.find(g => g.id === product.groupId)?.name}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {product.price.toFixed(2)} TL
                      </span>
                    </label>
                  ))}
              </div>
            </div>
            <div className="p-4 border-t">
              <button
                type="button"
                onClick={() => setShowProductModal(false)}
                className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grup Seçme Modalı */}
      {showGroupModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-[60]">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-4 border-b">
              <h3 className="text-lg font-medium">Grup Seç</h3>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto">
              <div className="space-y-2">
                {groups
                  .filter(g => !selectedGroups.includes(g.id))
                  .map(group => (
                    <label
                      key={group.id}
                      className="flex items-center p-2 rounded hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedGroups.includes(group.id)}
                        onChange={() => {
                          onGroupsChange([...selectedGroups, group.id]);
                          setShowGroupModal(false);
                        }}
                        className="w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500/20"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-900">{group.name}</span>
                    </label>
                  ))}
              </div>
            </div>
            <div className="p-4 border-t">
              <button
                type="button"
                onClick={() => setShowGroupModal(false)}
                className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
