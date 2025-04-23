'use client';

import React, { useState } from 'react';

interface RegularCustomerTabProps {
  focusedInput: string | null;
  setFocusedInput: React.Dispatch<React.SetStateAction<string | null>>;
  showKeyboard: boolean;
  setShowKeyboard: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegularCustomerTab: React.FC<RegularCustomerTabProps> = ({
  focusedInput,
  setFocusedInput,
  showKeyboard,
  setShowKeyboard
}) => {
  const [formData, setFormData] = useState({
    isRegularCustomer: true,
    kartNumarasi: '',
    musteriKartBilgileri: '',
    musteriOzelNotlari: '',
    bireyselIndirim: '0',
    paketUcreti: '0',
    servisUcreti: '0',
    minSiparisTutari: '0',
    siparisSayisi: '0',
    harcamaTutari: '0.00 TL',
    harcananParaPuani: '0',
    kalanParaPuani: '0',
    dogumGunu: '',
    yas: '',
    medeniHali: '',
    cinsiyet: '',
    emailAdresi: '',
    facebookHesabi: '',
    twitterHesabi: '',
    webSitesi: '',
    proximityCardId: '',
    krediLimiti: '0',
    krediDurumu: '',
    yaptigiOdemeToplami: '0',
    kalanBorcu: '0'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData({
      ...formData,
      [name]: newValue
    });
    
    if (type !== 'checkbox') {
      setFocusedInput(name);
      setShowKeyboard(true);
    }
  };

  const handleInputFocus = (name: string) => {
    setFocusedInput(name);
    setShowKeyboard(true);
  };

  const handleInputBlur = () => {
    // Keep keyboard open if needed
  };

  const handleSave = () => {
    console.log('Saving regular customer data:', formData);
    // Implement save functionality
  };

  return (
    <div className="p-0.5 h-full overflow-auto">
      <div className="bg-white rounded-md shadow-sm h-full flex flex-col">
        {/* Regular Customer Checkbox */}
        <div className="bg-blue-100 py-0.5 px-1">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isRegularCustomer"
              checked={formData.isRegularCustomer}
              onChange={handleInputChange}
              className="mr-1 h-3 w-3"
            />
            <span className="font-bold text-blue-900 text-[10px]">Sürekli Müşteri Özelliği Aktif</span>
          </label>
        </div>
        
        <div className="grid grid-cols-3 gap-0.5 p-0.5">
          {/* Left Column - Customer Info */}
          <div className="text-[10px]">
            <div className="mb-0.5">
              <label className="text-[10px] text-gray-500 block">Müşteri Kart Bilgileri</label>
              <input
                type="text"
                name="musteriKartBilgileri"
                value={formData.musteriKartBilgileri}
                onChange={handleInputChange}
                onFocus={() => handleInputFocus('musteriKartBilgileri')}
                onBlur={handleInputBlur}
                className="border border-gray-300 py-0.5 px-1 rounded-md w-full text-[10px] h-5"
              />
            </div>
            
            <div className="mb-0.5">
              <label className="text-[10px] text-gray-500 block">Müşteri Özel Notları</label>
              <textarea
                name="musteriOzelNotlari"
                value={formData.musteriOzelNotlari}
                onChange={handleInputChange}
                onFocus={() => handleInputFocus('musteriOzelNotlari')}
                onBlur={handleInputBlur}
                className="border border-gray-300 py-0.5 px-1 rounded-md w-full h-12 text-[10px] resize-none"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-0.5">
              <div>
                <label className="text-[10px] text-gray-500 block">Bireysel İndirim</label>
                <input
                  type="text"
                  name="bireyselIndirim"
                  value={formData.bireyselIndirim}
                  onChange={handleInputChange}
                  onFocus={() => handleInputFocus('bireyselIndirim')}
                  onBlur={handleInputBlur}
                  className="border border-gray-300 py-0.5 px-1 rounded-md w-full text-[10px] h-5"
                />
              </div>
              <div>
                <label className="text-[10px] text-gray-500 block">Paket Ücreti</label>
                <input
                  type="text"
                  name="paketUcreti"
                  value={formData.paketUcreti}
                  onChange={handleInputChange}
                  onFocus={() => handleInputFocus('paketUcreti')}
                  onBlur={handleInputBlur}
                  className="border border-gray-300 py-0.5 px-1 rounded-md w-full text-[10px] h-5"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-0.5 mt-0.5">
              <div>
                <label className="text-[10px] text-gray-500 block">Servis Ücreti</label>
                <input
                  type="text"
                  name="servisUcreti"
                  value={formData.servisUcreti}
                  onChange={handleInputChange}
                  onFocus={() => handleInputFocus('servisUcreti')}
                  onBlur={handleInputBlur}
                  className="border border-gray-300 py-0.5 px-1 rounded-md w-full text-[10px] h-5"
                />
              </div>
              <div>
                <label className="text-[10px] text-gray-500 block">Min. Sipariş</label>
                <input
                  type="text"
                  name="minSiparisTutari"
                  value={formData.minSiparisTutari}
                  onChange={handleInputChange}
                  onFocus={() => handleInputFocus('minSiparisTutari')}
                  onBlur={handleInputBlur}
                  className="border border-gray-300 py-0.5 px-1 rounded-md w-full text-[10px] h-5"
                />
              </div>
            </div>
          </div>
          
          {/* Middle Column - Statistics and Additional Fields */}
          <div className="text-[10px]">
            <div className="grid grid-cols-1 gap-0.5">
              <div>
                <label className="text-[10px] text-gray-500 block">Sipariş Sayısı</label>
                <input
                  type="text"
                  name="siparisSayisi"
                  value={formData.siparisSayisi}
                  onChange={handleInputChange}
                  onFocus={() => handleInputFocus('siparisSayisi')}
                  onBlur={handleInputBlur}
                  className="border border-gray-300 py-0.5 px-1 rounded-md w-full text-[10px] h-5 bg-gray-100"
                  readOnly
                />
              </div>
              
              <div>
                <label className="text-[10px] text-gray-500 block">Harcama Tutarı</label>
                <input
                  type="text"
                  name="harcamaTutari"
                  value={formData.harcamaTutari}
                  onChange={handleInputChange}
                  onFocus={() => handleInputFocus('harcamaTutari')}
                  onBlur={handleInputBlur}
                  className="border border-gray-300 py-0.5 px-1 rounded-md w-full text-[10px] h-5 bg-gray-100"
                  readOnly
                />
              </div>
              
              <div>
                <label className="text-[10px] text-gray-500 block">Harcanan Puan</label>
                <input
                  type="text"
                  name="harcananParaPuani"
                  value={formData.harcananParaPuani}
                  onChange={handleInputChange}
                  onFocus={() => handleInputFocus('harcananParaPuani')}
                  onBlur={handleInputBlur}
                  className="border border-gray-300 py-0.5 px-1 rounded-md w-full text-[10px] h-5 bg-gray-100"
                  readOnly
                />
              </div>
              
              <div>
                <label className="text-[10px] text-gray-500 block">Kalan Puan</label>
                <input
                  type="text"
                  name="kalanParaPuani"
                  value={formData.kalanParaPuani}
                  onChange={handleInputChange}
                  onFocus={() => handleInputFocus('kalanParaPuani')}
                  onBlur={handleInputBlur}
                  className="border border-gray-300 py-0.5 px-1 rounded-md w-full text-[10px] h-5 bg-gray-100"
                  readOnly
                />
              </div>
              
              <div>
                <label className="text-[10px] text-gray-500 block">Promosyon Kodu</label>
                <input
                  type="text"
                  className="border border-gray-300 py-0.5 px-1 rounded-md w-full text-[10px] h-5"
                />
              </div>
              
              <div>
                <label className="text-[10px] text-gray-500 block">Kart Numarası</label>
                <input
                  type="text"
                  name="kartNumarasi"
                  value={formData.kartNumarasi}
                  onChange={handleInputChange}
                  onFocus={() => handleInputFocus('kartNumarasi')}
                  onBlur={handleInputBlur}
                  className="border border-gray-300 py-0.5 px-1 rounded-md w-full text-[10px] h-5"
                />
              </div>
            </div>
            
            {/* Credit Information */}
            <div className="mt-0.5 border-t border-gray-200 pt-0.5">
              <h3 className="text-[10px] font-bold text-gray-700 mb-0.5">Kredi ve Bakiye</h3>
              
              <div>
                <label className="text-[10px] text-gray-500 block">Kredi Limiti</label>
                <input
                  type="text"
                  name="krediLimiti"
                  value={formData.krediLimiti}
                  onChange={handleInputChange}
                  onFocus={() => handleInputFocus('krediLimiti')}
                  onBlur={handleInputBlur}
                  className="border border-gray-300 py-0.5 px-1 rounded-md w-full text-[10px] h-5"
                />
              </div>
              
              <div>
                <label className="text-[10px] text-gray-500 block">Kredi Durumu</label>
                <select
                  name="krediDurumu"
                  value={formData.krediDurumu}
                  onChange={handleInputChange}
                  onFocus={() => handleInputFocus('krediDurumu')}
                  onBlur={handleInputBlur}
                  className="border border-gray-300 py-0.5 px-1 rounded-md w-full text-[10px] h-5 appearance-none bg-white"
                >
                  <option value="">-</option>
                  <option value="Aktif">Aktif</option>
                  <option value="Pasif">Pasif</option>
                </select>
              </div>
              
              <div>
                <label className="text-[10px] text-gray-500 block">Ödeme Toplamı</label>
                <input
                  type="text"
                  name="yaptigiOdemeToplami"
                  value={formData.yaptigiOdemeToplami}
                  onChange={handleInputChange}
                  onFocus={() => handleInputFocus('yaptigiOdemeToplami')}
                  onBlur={handleInputBlur}
                  className="border border-gray-300 py-0.5 px-1 rounded-md w-full text-[10px] h-5 bg-gray-100"
                  readOnly
                />
              </div>
              
              <div>
                <label className="text-[10px] text-gray-500 block">Kalan Borç</label>
                <input
                  type="text"
                  name="kalanBorcu"
                  value={formData.kalanBorcu}
                  onChange={handleInputChange}
                  onFocus={() => handleInputFocus('kalanBorcu')}
                  onBlur={handleInputBlur}
                  className="border border-gray-300 py-0.5 px-1 rounded-md w-full text-[10px] h-5 bg-gray-100"
                  readOnly
                />
              </div>
            </div>
          </div>
          
          {/* Right Column - Additional Customer Information */}
          <div className="text-[10px]">
            <h3 className="text-[10px] font-bold text-gray-700 mb-0.5 border-b border-gray-200 pb-0.5">Diğer Bilgiler</h3>
            
            <div className="grid grid-cols-1 gap-0.5">
              <div className="flex items-center">
                <label className="w-1/3 text-[10px] text-gray-600">Doğum Günü</label>
                <div className="w-2/3 flex">
                  <input
                    type="text"
                    name="dogumGunu"
                    value={formData.dogumGunu}
                    onChange={handleInputChange}
                    onFocus={() => handleInputFocus('dogumGunu')}
                    onBlur={handleInputBlur}
                    placeholder="Tarih seçiniz"
                    className="border border-gray-300 py-0.5 px-1 rounded-md w-full text-[10px] h-5"
                  />
                  <button className="bg-gray-200 border border-gray-300 px-0.5 ml-0.5 rounded-md">
                    <span className="text-[10px]">15</span>
                  </button>
                </div>
              </div>
              
              <div className="flex items-center">
                <label className="w-1/3 text-[10px] text-gray-600">Yaş</label>
                <input
                  type="text"
                  name="yas"
                  value={formData.yas}
                  onChange={handleInputChange}
                  onFocus={() => handleInputFocus('yas')}
                  onBlur={handleInputBlur}
                  className="w-2/3 border border-gray-300 py-0.5 px-1 rounded-md text-[10px] h-5"
                />
              </div>
              
              <div className="flex items-center">
                <label className="w-1/3 text-[10px] text-gray-600">Medeni Hali</label>
                <select
                  name="medeniHali"
                  value={formData.medeniHali}
                  onChange={handleInputChange}
                  onFocus={() => handleInputFocus('medeniHali')}
                  onBlur={handleInputBlur}
                  className="w-2/3 border border-gray-300 py-0.5 px-1 rounded-md text-[10px] h-5 appearance-none bg-white"
                >
                  <option value="">Seçiniz</option>
                  <option value="Evli">Evli</option>
                  <option value="Bekar">Bekar</option>
                  <option value="Boşanmış">Boşanmış</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <label className="w-1/3 text-[10px] text-gray-600">Cinsiyeti</label>
                <select
                  name="cinsiyet"
                  value={formData.cinsiyet}
                  onChange={handleInputChange}
                  onFocus={() => handleInputFocus('cinsiyet')}
                  onBlur={handleInputBlur}
                  className="w-2/3 border border-gray-300 py-0.5 px-1 rounded-md text-[10px] h-5 appearance-none bg-white"
                >
                  <option value="">Seçiniz</option>
                  <option value="Erkek">Erkek</option>
                  <option value="Kadın">Kadın</option>
                  <option value="Diğer">Diğer</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <label className="w-1/3 text-[10px] text-gray-600">Email</label>
                <input
                  type="email"
                  name="emailAdresi"
                  value={formData.emailAdresi}
                  onChange={handleInputChange}
                  onFocus={() => handleInputFocus('emailAdresi')}
                  onBlur={handleInputBlur}
                  className="w-2/3 border border-gray-300 py-0.5 px-1 rounded-md text-[10px] h-5"
                />
              </div>
              
              <div className="flex items-center">
                <label className="w-1/3 text-[10px] text-gray-600">Facebook</label>
                <input
                  type="text"
                  name="facebookHesabi"
                  value={formData.facebookHesabi}
                  onChange={handleInputChange}
                  onFocus={() => handleInputFocus('facebookHesabi')}
                  onBlur={handleInputBlur}
                  className="w-2/3 border border-gray-300 py-0.5 px-1 rounded-md text-[10px] h-5"
                />
              </div>
              
              <div className="flex items-center">
                <label className="w-1/3 text-[10px] text-gray-600">Twitter</label>
                <input
                  type="text"
                  name="twitterHesabi"
                  value={formData.twitterHesabi}
                  onChange={handleInputChange}
                  onFocus={() => handleInputFocus('twitterHesabi')}
                  onBlur={handleInputBlur}
                  className="w-2/3 border border-gray-300 py-0.5 px-1 rounded-md text-[10px] h-5"
                />
              </div>
              
              <div className="flex items-center">
                <label className="w-1/3 text-[10px] text-gray-600">Web Sitesi</label>
                <input
                  type="text"
                  name="webSitesi"
                  value={formData.webSitesi}
                  onChange={handleInputChange}
                  onFocus={() => handleInputFocus('webSitesi')}
                  onBlur={handleInputBlur}
                  className="w-2/3 border border-gray-300 py-0.5 px-1 rounded-md text-[10px] h-5"
                />
              </div>
              
              <div className="flex items-center">
                <label className="w-1/3 text-[10px] text-gray-600">Card ID</label>
                <input
                  type="text"
                  name="proximityCardId"
                  value={formData.proximityCardId}
                  onChange={handleInputChange}
                  onFocus={() => handleInputFocus('proximityCardId')}
                  onBlur={handleInputBlur}
                  className="w-2/3 border border-gray-300 py-0.5 px-1 rounded-md text-[10px] h-5"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Save Button */}
        <div className="mt-auto p-0.5 flex justify-end">
          <button 
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-0.5 px-3 rounded-md transition-colors text-[10px]"
            onClick={handleSave}
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegularCustomerTab;
