import React from 'react';
import { Product } from '../../../../types/product';

// We'll implement all tabs in this file for simplicity
export type TabType = 'details' | 'page2' | 'page3' | 'kitchen' | 'sizes';

interface TabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  product: Product;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onGroupChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  menuGroups: { id: string; name: string; color: string }[];
}

// Form Field Component
const FormField: React.FC<{
  label: string;
  type: 'text' | 'number' | 'select' | 'text-with-button' | 'select-with-button' | 'text-with-buttons' | 'file-input';
  name?: string;
  value?: string | number;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  options?: { value: string; label: string }[];
  buttonText?: string;
  readOnly?: boolean;
  hasCloseButton?: boolean;
  step?: string;
}> = ({
  label,
  type,
  name,
  value,
  placeholder,
  onChange,
  options,
  buttonText,
  readOnly,
  hasCloseButton,
  step
}) => {
  const renderField = () => {
    switch (type) {
      case 'text':
        return (
          <input 
            type="text" 
            name={name}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm w-full"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            readOnly={readOnly}
          />
        );
      
      case 'number':
        return (
          <input 
            type="number" 
            name={name}
            step={step}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm w-full"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            readOnly={readOnly}
          />
        );
      
      case 'select':
        return (
          <div className="relative">
            <select
              name={name}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm w-full appearance-none"
              value={value}
              onChange={onChange}
            >
              {options?.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <span className="text-gray-500 text-xs">▼</span>
            </div>
          </div>
        );
      
      case 'text-with-button':
        return (
          <div className="relative">
            <input 
              type="text" 
              name={name}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm w-full pr-14"
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              readOnly={readOnly}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-1">
              <button className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                {buttonText}
              </button>
            </div>
          </div>
        );
      
      case 'select-with-button':
        return (
          <div className="relative">
            <select
              name={name}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm w-full appearance-none pr-14"
              value={value}
              onChange={onChange}
            >
              {options?.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-1">
              <button className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                {buttonText}
              </button>
            </div>
          </div>
        );
      
      case 'text-with-buttons':
        return (
          <div className="relative">
            <input 
              type="text" 
              name={name}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm w-full pr-14"
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              readOnly={readOnly}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-1">
              <button className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                {buttonText}
              </button>
              {hasCloseButton && (
                <button className="ml-1 text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>
          </div>
        );
      
      case 'file-input':
        return (
          <div className="flex">
            <input 
              type="text" 
              name={name}
              className="border border-gray-300 rounded-l-md px-2 py-1 text-sm flex-grow focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              value={value}
              onChange={onChange}
              readOnly
              placeholder={placeholder}
            />
            <button className="flex items-center justify-center bg-gray-100 border border-gray-300 border-l-0 rounded-r-md px-2 hover:bg-gray-200 transition-colors duration-200">
              <span className="text-gray-600 text-xs">...</span>
            </button>
            <button className="ml-1 flex items-center justify-center bg-gray-100 border border-gray-300 rounded-md px-2 hover:bg-gray-200 transition-colors duration-200">
              <span className="text-gray-600 text-xs">×</span>
            </button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col mb-2">
      <label className="text-xs font-medium text-gray-700 mb-1 capitalize">{label.toLowerCase()}</label>
      {renderField()}
    </div>
  );
};

// Section Header Component
const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <div className="border-b border-gray-200 pb-1 mb-2">
    <h3 className="text-sm font-medium text-blue-600 capitalize">{title}</h3>
  </div>
);

// Tab Navigation Component
const TabNavigation: React.FC<{ activeTab: string }> = ({ activeTab }) => (
  <div className="flex border-b border-gray-200 mb-4">
    <div className={`px-4 py-2 font-medium text-sm ${activeTab === 'details' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}>
      Ürün detayları
    </div>
    <div className={`px-4 py-2 font-medium text-sm ${activeTab === 'page2' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}>
      Sayfa 2
    </div>
    <div className={`px-4 py-2 font-medium text-sm ${activeTab === 'page3' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}>
      Sayfa 3
    </div>
    <div className={`px-4 py-2 font-medium text-sm ${activeTab === 'kitchen' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}>
      Mutfak ekranları
    </div>
    <div className={`px-4 py-2 font-medium text-sm ${activeTab === 'sizes' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}>
      Ebatlar
    </div>
  </div>
);

// Details Tab Component
const DetailsTab: React.FC<{
  product: Product;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onGroupChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  menuGroups: { id: string; name: string; color: string }[];
}> = ({
  product,
  onChange,
  onGroupChange,
  menuGroups
}) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Left column */}
      <div>
        {/* Basic Information */}
        <div className="mb-4">
          <SectionHeader title="Temel bilgiler" />
          <div className="space-y-2">
            <FormField
              label="Ürünün tam adı"
              type="text"
              name="name"
              value={product.name}
              onChange={onChange}
            />
            
            <FormField
              label="Geçerli ürün fiyatı"
              type="number"
              name="price"
              value={product.price}
              onChange={onChange}
              step="0.01"
            />
            
            <FormField
              label="Barkod"
              type="text"
              name="barcode"
              value={product.barcode || ''}
              onChange={onChange}
            />
            
            <div className="flex items-center mt-2">
              <input 
                type="checkbox" 
                id="weightOrder"
                className="w-3 h-3 text-blue-600 rounded focus:ring-blue-500 mr-1"
              />
              <label htmlFor="weightOrder" className="text-xs text-gray-700 capitalize">Ağırlığa göre sipariş et</label>
              
              <div className="ml-auto flex items-center">
                <label className="text-xs font-medium text-gray-700 mr-1 capitalize">Güvenlik seviyesi</label>
                <div className="relative">
                  <select
                    name="securityLevel"
                    className="border border-gray-300 rounded-md px-1 py-0.5 text-xs w-12 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    value={product.securityLevel || 0}
                    onChange={onChange}
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none">
                    <span className="text-gray-500 text-xs">▼</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Categorization */}
        <div className="mb-4">
          <SectionHeader title="Kategorizasyon" />
          <div className="space-y-2">
            <FormField
              label="Menü kategorisi"
              type="text-with-button"
              buttonText="Ekle"
              readOnly
            />
            
            <FormField
              label="Menü grubu"
              type="select-with-button"
              name="groupId"
              value={product.groupId}
              onChange={onGroupChange}
              buttonText="Ekle"
              options={[
                { value: '', label: 'Grup Seçiniz' },
                ...menuGroups.map(group => ({ value: group.id, label: group.name }))
              ]}
            />
            
            <FormField
              label="Kdv grubu"
              type="select-with-button"
              name="taxGroup"
              buttonText="Ekle"
              options={[
                { value: '', label: 'Seçiniz' },
                { value: '1', label: '%8' },
                { value: '2', label: '%18' }
              ]}
            />
          </div>
        </div>
      </div>
      
      {/* Right column */}
      <div>
        {/* Visual Elements */}
        <div className="mb-4">
          <SectionHeader title="Görsel öğeler" />
          <div className="space-y-2">
            <FormField
              label="Resim"
              type="file-input"
              name="image"
              value={product.image || ''}
              onChange={onChange}
              placeholder="Resim seçilmedi"
            />
            
            <FormField
              label="Ürünler aynı özelliklere sahip"
              type="select"
              options={[{ value: '', label: 'Seçiniz' }]}
            />
            
            <div className="flex items-center">
              <div className="text-xs font-medium text-gray-700 w-8">0</div>
            </div>
          </div>
        </div>
        
        {/* Integration */}
        <div className="mb-4">
          <SectionHeader title="Entegrasyon" />
          <div className="space-y-2">
            <FormField
              label="Yollanacak yazıcı"
              type="select"
              options={[{ value: '', label: '-' }]}
            />
          </div>
        </div>
        
        {/* Menu Options */}
        <div className="mb-4">
          <SectionHeader title="Menü seçenekleri" />
          <div className="space-y-2">
            <FormField
              label="Mesaj grubu"
              type="text-with-buttons"
              buttonText="Ekle"
              readOnly
              hasCloseButton
            />
            
            <FormField
              label="Zorunlu mesaj grubu"
              type="text-with-buttons"
              buttonText="Ekle"
              readOnly
              hasCloseButton
            />
            
            <FormField
              label="Kombo menü"
              type="text-with-buttons"
              buttonText="Ekle"
              readOnly
              hasCloseButton
            />
            
            <FormField
              label="Multi kombo menü"
              type="text-with-buttons"
              buttonText="Ekle"
              readOnly
              hasCloseButton
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Page 2 Tab Component - Based on the provided image
const Page2Tab: React.FC<{
  product: Product;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}> = ({
  product,
  onChange
}) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Left column */}
      <div className="space-y-3">
        <FormField
          label="Geçerli ürün fiyatı"
          type="number"
          name="price"
          value={product.price || 0}
          onChange={onChange}
          step="0.01"
        />
        
        <FormField
          label="Masa modu fiyatı"
          type="number"
          name="tablePrice"
          value={product.tablePrice || 0}
          onChange={onChange}
          step="0.01"
        />
        
        <FormField
          label="Bar çeki fiyatı"
          type="number"
          name="barPrice"
          value={product.barPrice || 0}
          onChange={onChange}
          step="0.01"
        />
        
        <FormField
          label="Kasa satış ürün fiyatı"
          type="number"
          name="cashRegisterPrice"
          value={product.cashRegisterPrice || 0}
          onChange={onChange}
          step="0.01"
        />
        
        <FormField
          label="Tezgah fiyatı"
          type="number"
          name="counterPrice"
          value={product.counterPrice || 0}
          onChange={onChange}
          step="0.01"
        />
        
        <FormField
          label="Paket fiyatı"
          type="number"
          name="packagePrice"
          value={product.packagePrice || 0}
          onChange={onChange}
          step="0.01"
        />
        
        <FormField
          label="Kullanılacak mutfak göstergeleri"
          type="number"
          name="kitchenDisplays"
          value={product.kitchenDisplays || 1}
          onChange={onChange}
        />
        
        <FormField
          label="Yemek sepeti kodu"
          type="text"
          name="foodBasketCode"
          value={product.foodBasketCode || ''}
          onChange={onChange}
        />
      </div>
      
      {/* Right column */}
      <div className="space-y-3">
        <div className="flex items-center mb-3">
          <input 
            type="checkbox" 
            id="discountable"
            name="discountable"
            className="w-3 h-3 text-blue-600 rounded focus:ring-blue-500 mr-1"
            checked={product.discountable}
            onChange={onChange}
          />
          <label htmlFor="discountable" className="text-xs text-gray-700 capitalize">Üründe indirim yapılabilir</label>
        </div>
        
        <FormField
          label="Muhasebe kodu"
          type="text"
          name="accountingCode"
          value={product.accountingCode || ''}
          onChange={onChange}
        />
        
        <div className="flex items-center mb-3">
          <input 
            type="checkbox" 
            id="printLabel"
            name="printLabel"
            className="w-3 h-3 text-blue-600 rounded focus:ring-blue-500 mr-1"
            checked={product.printLabel}
            onChange={onChange}
          />
          <label htmlFor="printLabel" className="text-xs text-gray-700 capitalize">Etiket yaz</label>
        </div>
        
        <div className="flex items-center mb-3">
          <input 
            type="checkbox" 
            id="noWaiterService"
            name="noWaiterService"
            className="w-3 h-3 text-blue-600 rounded focus:ring-blue-500 mr-1"
            checked={product.noWaiterService}
            onChange={onChange}
          />
          <label htmlFor="noWaiterService" className="text-xs text-gray-700 capitalize">Garsoniye uygulanmasın</label>
        </div>
        
        <div className="flex items-center mb-3">
          <input 
            type="checkbox" 
            id="timeAdjustable"
            name="timeAdjustable"
            className="w-3 h-3 text-blue-600 rounded focus:ring-blue-500 mr-1"
            checked={product.timeAdjustable}
            onChange={onChange}
          />
          <label htmlFor="timeAdjustable" className="text-xs text-gray-700 capitalize">Zaman ayarlı ürün</label>
        </div>
      </div>
    </div>
  );
};

// Page 3 Tab Component - Based on the provided image
const Page3Tab: React.FC<{
  product: Product;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}> = ({
  product,
  onChange
}) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Left column */}
      <div className="space-y-3">
        <FormField
          label="2. Dil adı"
          type="text"
          name="secondLanguageName"
          value={product.secondLanguageName || ''}
          onChange={onChange}
        />
        
        <div className="h-[200px] border border-gray-300 rounded-md">
          {/* Textarea for second language description */}
        </div>
        
        <FormField
          label="Yollanacak 2. yazıcı"
          type="select"
          name="printer2"
          value={product.printer2 || '-'}
          onChange={onChange}
          options={[{ value: '-', label: '-' }]}
        />
        
        <FormField
          label="Yollanacak 3. yazıcı"
          type="select"
          name="printer3"
          value={product.printer3 || '-'}
          onChange={onChange}
          options={[{ value: '-', label: '-' }]}
        />
        
        <div className="flex items-center mt-2">
          <input 
            type="checkbox" 
            id="assumedPackageProduct"
            name="assumedPackageProduct"
            className="w-3 h-3 text-blue-600 rounded focus:ring-blue-500 mr-1"
            checked={product.assumedPackageProduct || false}
            onChange={onChange}
          />
          <label htmlFor="assumedPackageProduct" className="text-xs text-gray-700">Paket satışta eklenecek varsayılan ürün</label>
        </div>
        
        <div className="flex items-center mt-2">
          <input 
            type="checkbox" 
            id="timing"
            name="timing"
            className="w-3 h-3 text-blue-600 rounded focus:ring-blue-500 mr-1"
            checked={product.timing || false}
            onChange={onChange}
          />
          <label htmlFor="timing" className="text-xs text-gray-700">Zamanlama</label>
        </div>
      </div>
      
      {/* Right column */}
      <div className="space-y-3">
        <FormField
          label="Ürün paket ücreti"
          type="number"
          name="packageFee"
          value={product.packageFee || 0}
          onChange={onChange}
          step="0.01"
        />
        
        <FormField
          label="Ürün paket ikramı"
          type="number"
          name="packageGift"
          value={product.packageGift || 0}
          onChange={onChange}
          step="0.01"
        />
        
        <FormField
          label="Ürün min fiyat"
          type="number"
          name="minPrice"
          value={product.minPrice || 0}
          onChange={onChange}
          step="0.01"
        />
        
        <FormField
          label="İndirim max fiyat"
          type="number"
          name="maxDiscountPrice"
          value={product.maxDiscountPrice || 0}
          onChange={onChange}
          step="0.01"
        />
        
        <FormField
          label="Barkod 2"
          type="text"
          name="barcode2"
          value={product.barcode2 || ''}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

// Kitchen Tab Component - Based on the provided image
const KitchenTab: React.FC<{
  product: Product;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}> = ({
  product,
  onChange
}) => {
  // Initialize kitchen screens if not already present
  const kitchenScreens = product.kitchenScreens || {
    screen1: false,
    screen2: false,
    screen3: false,
    screen4: false,
    screen5: false,
    screen6: false,
    screen7: false,
    screen8: false
  };

  // Handle kitchen screen checkbox changes
  const handleKitchenScreenChange = (screenNumber: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const updatedScreens = {
      ...kitchenScreens,
      [`screen${screenNumber}`]: isChecked
    };
    
    // Create a synthetic event to pass to the parent onChange handler
    const syntheticEvent = {
      target: {
        name: 'kitchenScreens',
        value: updatedScreens,
        type: 'custom'
      }
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    
    onChange(syntheticEvent);
  };

  return (
    <div className="p-2">
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-4">Kullanılacak mutfak göstergeleri</h3>
        
        <div className="grid grid-cols-2 gap-x-16 gap-y-3">
          {/* Left column */}
          <div className="space-y-3">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="screen1"
                className="w-3 h-3 text-blue-600 rounded focus:ring-blue-500 mr-2"
                checked={kitchenScreens.screen1 || false}
                onChange={handleKitchenScreenChange(1)}
              />
              <label htmlFor="screen1" className="text-xs text-gray-700">1 Nolu mutfak ekranı</label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="screen2"
                className="w-3 h-3 text-blue-600 rounded focus:ring-blue-500 mr-2"
                checked={kitchenScreens.screen2 || false}
                onChange={handleKitchenScreenChange(2)}
              />
              <label htmlFor="screen2" className="text-xs text-gray-700">2 Nolu mutfak ekranı</label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="screen3"
                className="w-3 h-3 text-blue-600 rounded focus:ring-blue-500 mr-2"
                checked={kitchenScreens.screen3 || false}
                onChange={handleKitchenScreenChange(3)}
              />
              <label htmlFor="screen3" className="text-xs text-gray-700">3 Nolu mutfak ekranı</label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="screen4"
                className="w-3 h-3 text-blue-600 rounded focus:ring-blue-500 mr-2"
                checked={kitchenScreens.screen4 || false}
                onChange={handleKitchenScreenChange(4)}
              />
              <label htmlFor="screen4" className="text-xs text-gray-700">4 Nolu mutfak ekranı</label>
            </div>
          </div>
          
          {/* Right column */}
          <div className="space-y-3">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="screen5"
                className="w-3 h-3 text-blue-600 rounded focus:ring-blue-500 mr-2"
                checked={kitchenScreens.screen5 || false}
                onChange={handleKitchenScreenChange(5)}
              />
              <label htmlFor="screen5" className="text-xs text-gray-700">5 Nolu mutfak ekranı</label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="screen6"
                className="w-3 h-3 text-blue-600 rounded focus:ring-blue-500 mr-2"
                checked={kitchenScreens.screen6 || false}
                onChange={handleKitchenScreenChange(6)}
              />
              <label htmlFor="screen6" className="text-xs text-gray-700">6 Nolu mutfak ekranı</label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="screen7"
                className="w-3 h-3 text-blue-600 rounded focus:ring-blue-500 mr-2"
                checked={kitchenScreens.screen7 || false}
                onChange={handleKitchenScreenChange(7)}
              />
              <label htmlFor="screen7" className="text-xs text-gray-700">7 Nolu mutfak ekranı</label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="screen8"
                className="w-3 h-3 text-blue-600 rounded focus:ring-blue-500 mr-2"
                checked={kitchenScreens.screen8 || false}
                onChange={handleKitchenScreenChange(8)}
              />
              <label htmlFor="screen8" className="text-xs text-gray-700">8 Nolu mutfak ekranı</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sizes Tab Component - Based on the provided image
const SizesTab: React.FC<{
  product: Product;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}> = ({
  product,
  onChange
}) => {
  return (
    <div className="p-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-700">Ebat ana ürün</label>
          <div className="flex">
            <input 
              type="text" 
              name="mainSizeProduct"
              className="border border-gray-300 rounded-l-md px-2 py-1 text-sm flex-grow focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              value={product.mainSizeProduct || ''}
              onChange={onChange}
              readOnly
            />
            <button className="flex items-center justify-center bg-gray-100 border border-gray-300 px-2 hover:bg-gray-200 transition-colors duration-200">
              <span className="text-gray-600 text-xs">...</span>
            </button>
            <button className="flex items-center justify-center bg-gray-100 border border-gray-300 border-l-0 rounded-r-md px-2 hover:bg-gray-200 transition-colors duration-200">
              <span className="text-gray-600 text-xs">×</span>
            </button>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-700">Ebat</label>
          <div className="flex">
            <input 
              type="text" 
              name="size"
              className="border border-gray-300 rounded-l-md px-2 py-1 text-sm flex-grow focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              value={product.size || ''}
              onChange={onChange}
              readOnly
            />
            <button className="flex items-center justify-center bg-gray-100 border border-gray-300 px-2 hover:bg-gray-200 transition-colors duration-200">
              <span className="text-gray-600 text-xs">...</span>
            </button>
            <button className="flex items-center justify-center bg-gray-100 border border-gray-300 border-l-0 rounded-r-md px-2 hover:bg-gray-200 transition-colors duration-200">
              <span className="text-gray-600 text-xs">×</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Placeholder Tabs
const PlaceholderTab: React.FC<{ title: string }> = ({ title }) => (
  <div className="h-[450px] flex items-center justify-center">
    <div className="text-center text-gray-500">
      <p className="text-sm capitalize">{title.toLowerCase()} içeriği henüz uygulanmadı</p>
    </div>
  </div>
);

export const TabContent: React.FC<{
  product: Product;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onGroupChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  menuGroups: { id: string; name: string; color: string }[];
  activeTab: TabType;
}> = ({
  product,
  onChange,
  onGroupChange,
  menuGroups,
  activeTab
}) => {
  return (
    <div className="h-full overflow-y-auto">
      <TabNavigation activeTab={activeTab} />
      
      {activeTab === 'details' && (
        <DetailsTab 
          product={product} 
          onChange={onChange} 
          onGroupChange={onGroupChange} 
          menuGroups={menuGroups} 
        />
      )}
      
      {activeTab === 'page2' && (
        <Page2Tab 
          product={product} 
          onChange={onChange}
        />
      )}
      
      {activeTab === 'page3' && (
        <Page3Tab 
          product={product} 
          onChange={onChange}
        />
      )}
      
      {activeTab === 'kitchen' && (
        <KitchenTab 
          product={product} 
          onChange={onChange}
        />
      )}
      
      {activeTab === 'sizes' && (
        <SizesTab 
          product={product} 
          onChange={onChange}
        />
      )}
    </div>
  );
};

export const TabSelector: React.FC<Omit<TabsProps, 'product' | 'onChange' | 'onGroupChange' | 'menuGroups'>> = ({
  activeTab,
  setActiveTab
}) => {
  const tabs = [
    { id: 'details', label: 'Ürün detayları' },
    { id: 'page2', label: 'Sayfa 2' },
    { id: 'page3', label: 'Sayfa 3' },
    { id: 'kitchen', label: 'Mutfak ekranları' },
    { id: 'sizes', label: 'Ebatlar' },
  ] as const;

  return (
    <div className="w-[180px] bg-gray-100 border-l border-gray-200 py-3">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`w-full text-left px-3 py-2 mb-1 rounded-md text-sm font-medium transition-colors ${
            activeTab === tab.id 
              ? 'bg-blue-500 text-white shadow-md mx-2 w-[calc(100%-16px)]' 
              : 'bg-white text-gray-700 hover:bg-gray-50 mx-2 w-[calc(100%-16px)]'
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
