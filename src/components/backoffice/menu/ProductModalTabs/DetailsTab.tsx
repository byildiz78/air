import React from 'react';
import { X } from 'lucide-react';
import { Product } from '../../../../types/product';
import { FormField } from '../ui/FormField';
import { ProductPreview } from '../ui/ProductPreview';

interface DetailsTabProps {
  product: Product;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onGroupChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  menuGroups: { id: string; name: string; color: string }[];
}

export const DetailsTab: React.FC<DetailsTabProps> = ({
  product,
  onChange,
  onGroupChange,
  menuGroups
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left column */}
      <div className="space-y-4">
        <FormField
          label="ÜRÜNLER AYNI ÖZELLİKLERE SAHİP"
          type="select"
          options={[{ value: '', label: 'Seçiniz' }]}
        />
        
        <div className="flex items-center">
          <div className="text-sm font-medium text-gray-700 w-8">0</div>
        </div>
        
        <FormField
          label="ÜRÜNÜN TAM ADI"
          type="text"
          name="name"
          value={product.name}
          onChange={onChange}
        />
        
        <FormField
          label="MENÜ KATEGORİSİ"
          type="text-with-button"
          buttonText="EKLE"
          readOnly
        />
        
        <FormField
          label="MENÜ GRUBU"
          type="select-with-button"
          name="groupId"
          value={product.groupId}
          onChange={onGroupChange}
          buttonText="EKLE"
          options={[
            { value: '', label: 'Grup Seçiniz' },
            ...menuGroups.map(group => ({ value: group.id, label: group.name }))
          ]}
        />
        
        <FormField
          label="KDV GRUBU"
          type="select-with-button"
          name="taxGroup"
          buttonText="EKLE"
          options={[
            { value: '', label: 'Seçiniz' },
            { value: '1', label: '%8' },
            { value: '2', label: '%18' }
          ]}
        />
        
        <FormField
          label="RESİM"
          type="file-input"
          name="image"
          value={product.image || ''}
          onChange={onChange}
          placeholder="Resim seçilmedi"
        />
      </div>
      
      {/* Right column */}
      <div className="space-y-4">
        <ProductPreview 
          name={product.name} 
          price={product.price} 
          color={product.groupColor} 
        />
        
        <FormField
          label="GEÇERLİ ÜRÜN FİYATI"
          type="number"
          name="price"
          value={product.price}
          onChange={onChange}
          step="0.01"
        />
        
        <FormField
          label="YOLLANACAK YAZICI"
          type="select"
          options={[{ value: '', label: '-' }]}
        />
        
        <FormField
          label="MESAJ GRUBU"
          type="text-with-buttons"
          buttonText="EKLE"
          readOnly
          hasCloseButton
        />
        
        <FormField
          label="ZORUNLU MESAJ GRUBU"
          type="text-with-buttons"
          buttonText="EKLE"
          readOnly
          hasCloseButton
        />
        
        <FormField
          label="KOMBO MENÜ"
          type="text-with-buttons"
          buttonText="EKLE"
          readOnly
          hasCloseButton
        />
        
        <FormField
          label="MULTİ KOMBO MENÜ"
          type="text-with-buttons"
          buttonText="EKLE"
          readOnly
          hasCloseButton
        />
        
        <FormField
          label="BARKOD"
          type="text"
          name="barcode"
          value={product.barcode || ''}
          onChange={onChange}
        />
        
        <div className="flex items-center mt-2">
          <input 
            type="checkbox" 
            id="weightOrder"
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mr-2"
          />
          <label htmlFor="weightOrder" className="text-sm text-gray-700">AĞIRLIĞA GÖRE SİPARİŞ ET</label>
          
          <div className="ml-auto flex items-center">
            <label className="text-sm font-medium text-gray-700 mr-2">GÜVENLİK SEVİYESİ</label>
            <div className="relative">
              <select
                name="securityLevel"
                className="border border-gray-300 rounded-md px-3 py-2 w-16 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                value={product.securityLevel || 0}
                onChange={onChange}
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <span className="text-gray-500">▼</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
