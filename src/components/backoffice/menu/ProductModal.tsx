import React from 'react';
import { Product } from '../../../types/product';
import { X, Save, Trash2 } from 'lucide-react';
import { TabContent, TabSelector, TabType } from './ProductModalTabs';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onSave: (product: Product) => void;
  onDelete: (productId: string) => void;
  menuGroups: { id: string; name: string; color: string }[];
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onSave,
  onDelete,
  menuGroups
}) => {
  const [editedProduct, setEditedProduct] = React.useState<Product>(product);
  const [activeTab, setActiveTab] = React.useState<TabType>('details');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setEditedProduct(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setEditedProduct(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setEditedProduct(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleGroupChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const selectedGroup = menuGroups.find(g => g.id === value);
    
    setEditedProduct(prev => ({
      ...prev,
      groupId: value,
      groupColor: selectedGroup?.color || '#3B82F6'
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-8">
      <div className="bg-white rounded-lg shadow-lg w-[1280px] h-[800px] flex flex-col">
        {/* Header */}
        <div className="shrink-0 px-8 py-5 flex justify-between items-center border-b bg-white">
          <h2 className="text-xl font-medium text-gray-900">
            {product.id ? 'Ürün Düzenle' : 'Yeni Ürün'}
          </h2>
          <button 
            className="text-gray-400 hover:text-gray-500"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Main Content */}
        <div className="flex flex-1 min-h-0">
          {/* Left Content */}
          <div className="flex-1 min-w-0 border-r border-gray-200">
            <div className="h-full overflow-y-auto px-8 py-6">
              <TabContent 
                product={editedProduct}
                onChange={handleChange}
                onGroupChange={handleGroupChange}
                menuGroups={menuGroups}
                activeTab={activeTab}
              />
            </div>
          </div>
          
          {/* Right Sidebar */}
          <div className="w-56 shrink-0 bg-gray-50">
            <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>
        
        {/* Footer */}
        <div className="shrink-0 px-8 py-5 border-t bg-gray-50 flex items-center">
          <div className="flex gap-6 flex-1">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                id="isActive"
                name="isActive"
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                checked={editedProduct.isActive}
                onChange={handleChange}
              />
              <span className="ml-2 text-sm text-gray-700">Aktif</span>
            </label>
            
            <label className="flex items-center">
              <input 
                type="checkbox" 
                id="isTopLevel"
                name="isTopLevel"
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                checked={editedProduct.isTopLevel}
                onChange={handleChange}
              />
              <span className="ml-2 text-sm text-gray-700">Üst Seviye</span>
            </label>
            
            <label className="flex items-center">
              <input 
                type="checkbox" 
                id="isOpen"
                name="isOpen"
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                checked={editedProduct.isOpen}
                onChange={handleChange}
              />
              <span className="ml-2 text-sm text-gray-700">Açık Ürün</span>
            </label>
            
            <label className="flex items-center">
              <input 
                type="checkbox" 
                id="isCombo"
                name="isCombo"
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                checked={editedProduct.isCombo}
                onChange={handleChange}
              />
              <span className="ml-2 text-sm text-gray-700">Kombo Menü</span>
            </label>
          </div>
          
          <div className="flex gap-4 ml-6">
            {product.id && (
              <button 
                className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-red-700 hover:text-red-800"
                onClick={() => onDelete(product.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Sil
              </button>
            )}
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-800"
            >
              İptal
            </button>
            <button
              onClick={() => onSave(editedProduct)}
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              <Save className="h-4 w-4 mr-2" />
              Kaydet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
