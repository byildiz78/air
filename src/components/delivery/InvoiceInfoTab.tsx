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
      <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
        <div className="bg-blue-100 py-0.5 px-1">
          <h2 className="font-bold text-blue-900 text-[10px]">FATURA BİLGİLERİ</h2>
        </div>
        
        <div className="p-1">
          <div className="space-y-1 text-[10px]">
            <div>
              <label className="text-[10px] text-gray-500 block">CARİ ÜNVANI</label>
              <input
                type="text"
                name="cariUnvani"
                value={formData.cariUnvani}
                onChange={handleInputChange}
                onFocus={() => handleInputFocus('cariUnvani')}
                onBlur={handleInputBlur}
                className="border border-gray-300 py-0.5 px-1 rounded w-full text-[10px] h-5"
              />
            </div>
            
            <div>
              <label className="text-[10px] text-gray-500 block">İL ADI</label>
              <input
                type="text"
                name="ilAdi"
                value={formData.ilAdi}
                onChange={handleInputChange}
                onFocus={() => handleInputFocus('ilAdi')}
                onBlur={handleInputBlur}
                className="border border-gray-300 py-0.5 px-1 rounded w-full text-[10px] h-5"
              />
            </div>
            
            <div>
              <label className="text-[10px] text-gray-500 block">VERGİ DAİRESİ</label>
              <input
                type="text"
                name="vergiDairesi"
                value={formData.vergiDairesi}
                onChange={handleInputChange}
                onFocus={() => handleInputFocus('vergiDairesi')}
                onBlur={handleInputBlur}
                className="border border-gray-300 py-0.5 px-1 rounded w-full text-[10px] h-5"
              />
            </div>
            
            <div>
              <label className="text-[10px] text-gray-500 block">VERGİ NO</label>
              <input
                type="text"
                name="vergiNo"
                value={formData.vergiNo}
                onChange={handleInputChange}
                onFocus={() => handleInputFocus('vergiNo')}
                onBlur={handleInputBlur}
                className="border border-gray-300 py-0.5 px-1 rounded w-full text-[10px] h-5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceInfoTab;
