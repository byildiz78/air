'use client';

import React, { useState } from 'react';

interface InvoiceInfoTabProps {
  focusedInput: string | null;
  setFocusedInput: React.Dispatch<React.SetStateAction<string | null>>;
  showKeyboard: boolean;
  setShowKeyboard: React.Dispatch<React.SetStateAction<boolean>>;
}

const InvoiceInfoTab: React.FC<InvoiceInfoTabProps> = ({
  focusedInput,
  setFocusedInput,
  showKeyboard,
  setShowKeyboard
}) => {
  const [formData, setFormData] = useState({
    cariUnvani: '',
    ilAdi: '',
    vergiDairesi: '',
    vergiNo: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setFocusedInput(name);
    setShowKeyboard(true);
  };

  const handleInputFocus = (name: string) => {
    setFocusedInput(name);
    setShowKeyboard(true);
  };

  const handleInputBlur = () => {
    // Keep keyboard open if needed
  };

  return (
    <div className="p-0.5 h-full overflow-auto">
      <div className="bg-white rounded-md shadow-sm h-full flex flex-col">
        <div className="bg-blue-500 text-white py-1 px-2 rounded-t-md">
          <h2 className="font-bold text-xs">Fatura Bilgileri</h2>
        </div>
        
        <div className="p-2">
          <div className="space-y-2 text-xs">
            <div>
              <label className="text-xs text-gray-600 block mb-0.5">Cari Ünvanı</label>
              <input
                type="text"
                name="cariUnvani"
                value={formData.cariUnvani}
                onChange={handleInputChange}
                onFocus={() => handleInputFocus('cariUnvani')}
                onBlur={handleInputBlur}
                className="border border-gray-200 py-1 px-2 rounded-md w-full text-xs"
              />
            </div>
            
            <div>
              <label className="text-xs text-gray-600 block mb-0.5">İl Adı</label>
              <input
                type="text"
                name="ilAdi"
                value={formData.ilAdi}
                onChange={handleInputChange}
                onFocus={() => handleInputFocus('ilAdi')}
                onBlur={handleInputBlur}
                className="border border-gray-200 py-1 px-2 rounded-md w-full text-xs"
              />
            </div>
            
            <div>
              <label className="text-xs text-gray-600 block mb-0.5">Vergi Dairesi</label>
              <input
                type="text"
                name="vergiDairesi"
                value={formData.vergiDairesi}
                onChange={handleInputChange}
                onFocus={() => handleInputFocus('vergiDairesi')}
                onBlur={handleInputBlur}
                className="border border-gray-200 py-1 px-2 rounded-md w-full text-xs"
              />
            </div>
            
            <div>
              <label className="text-xs text-gray-600 block mb-0.5">Vergi No</label>
              <input
                type="text"
                name="vergiNo"
                value={formData.vergiNo}
                onChange={handleInputChange}
                onFocus={() => handleInputFocus('vergiNo')}
                onBlur={handleInputBlur}
                className="border border-gray-200 py-1 px-2 rounded-md w-full text-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceInfoTab;
