import React from 'react';
import { TerminalSettings } from '@/types/settings';
import { FolderOpen, Settings2, Phone, CreditCard } from 'lucide-react';

interface TerminalFormProps {
  settings: TerminalSettings;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const TerminalForm: React.FC<TerminalFormProps> = ({ settings, onChange }) => {
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="grid gap-6">
        {/* Terminal Ayarları */}
        <section className="bg-white rounded-xl border border-gray-200/75 shadow-sm overflow-hidden">
          <div className="border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg shadow-sm">
                <Settings2 className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Terminal Ayarları</h2>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Terminal Bilgileri */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">
                  TERMİNAL NO
                </label>
                <input
                  type="text"
                  name="terminalNo"
                  defaultValue="1"
                  onChange={onChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-150"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">
                  TERMİNAL ADI
                </label>
                <input
                  type="text"
                  name="terminalName"
                  defaultValue="KASA"
                  onChange={onChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-150"
                />
              </div>
            </div>

            {/* Terminal Görünüm */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">
                  TERMİNAL ARKA PLAN RESMİ
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="backgroundImage"
                    defaultValue="C:\projeler\wpf\Infinia\infinia\bin\Debug\Media\5031"
                    onChange={onChange}
                    className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-150"
                  />
                  <button className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-200 transition-colors duration-150 group">
                    <FolderOpen className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">
                  TERMİNAL YAN BAR RESMİ
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="sidebarImage"
                    onChange={onChange}
                    className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-150"
                  />
                  <button className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-200 transition-colors duration-150 group">
                    <FolderOpen className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
                  </button>
                </div>
              </div>
            </div>

            {/* Terminal Ayarları */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">
                  DİREK GİRİŞ EKRANI VARSAYILANI
                </label>
                <select
                  name="defaultScreen"
                  defaultValue="MASA SATIŞ"
                  onChange={onChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-150"
                >
                  <option value="MASA SATIŞ">MASA SATIŞ</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">
                  VARSAYILAN SALON PLANI
                </label>
                <select
                  name="defaultFloorPlan"
                  defaultValue="SALON"
                  onChange={onChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-150"
                >
                  <option value="SALON">SALON</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">
                  TERMİNAL ARAYÜZÜ
                </label>
                <select
                  name="terminalInterface"
                  defaultValue="Office 2010 Blue"
                  onChange={onChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-150"
                >
                  <option value="Office 2010 Blue">Office 2010 Blue</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">
                  TERMİNAL DİLİ
                </label>
                <select
                  name="language"
                  defaultValue="-"
                  onChange={onChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-150"
                >
                  <option value="-">-</option>
                </select>
              </div>
            </div>

            {/* QR Menu */}
            <div className="border-t border-gray-100 pt-6">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="showQRMenuNotifications"
                  onChange={onChange}
                  className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500/20"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  GARSON KASASINDA QR MENU BİLDİRİMLERİNİ GÖSTER
                </span>
              </label>
            </div>
          </div>
        </section>

        {/* Çağrı Merkezi */}
        <section className="bg-white rounded-xl border border-gray-200/75 shadow-sm overflow-hidden">
          <div className="border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg shadow-sm">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Çağrı Merkezi Ayarları</h2>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Eski Çağrı Merkezi */}
            <div className="space-y-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="callCenterEnabled"
                  onChange={onChange}
                  className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500/20"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  ÇAĞRI MERKEZİ SERVİSİ MODU AKTİF
                </span>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">
                  ÇAĞRI MERKEZİ SERVİSİ ADRESİ
                </label>
                <input
                  type="text"
                  name="callCenterAddress"
                  defaultValue="TEST E"
                  onChange={onChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-150"
                />
              </div>
            </div>

            {/* Yeni Çağrı Merkezi */}
            <div className="border-t border-gray-100 pt-6 space-y-4">
              <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="newCallCenterEnabled"
                    onChange={onChange}
                    className="w-5 h-5 text-emerald-500 border-emerald-300 rounded focus:ring-2 focus:ring-emerald-500/20"
                  />
                  <span className="ml-2 text-sm font-medium text-emerald-800">
                    ÇAĞRI MERKEZİ SERVİSİ MODU AKTİF (YENİ)
                  </span>
                </label>
              </div>

              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="autoApproveOrders"
                  onChange={onChange}
                  className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500/20"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  ÇAĞRI MERKEZİ SİPARİŞLERİNİ ONAYLADIKTAN SONRA KAYDET
                </span>
              </label>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1.5">
                    ÇAĞRI MERKEZİ SERVİSİ ADRESİ
                  </label>
                  <input
                    type="text"
                    name="newCallCenterAddress"
                    defaultValue="https://robotpos.hdholding.com/Pidem/CallCenter/cfEST E"
                    onChange={onChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-150"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1.5">
                    ÇAĞRI MERKEZİ ŞUBE NO
                  </label>
                  <input
                    type="text"
                    name="callCenterBranchNo"
                    defaultValue="0"
                    onChange={onChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-150"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1.5">
                    ÇAĞRI MERKEZİ SİPARİŞ SES DOSYASI (.wav)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="callCenterSoundFile"
                      onChange={onChange}
                      className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-150"
                    />
                    <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-200 transition-colors duration-150">
                      <span className="text-sm font-medium text-gray-700">SEÇ</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TSM EFT-POS */}
        <section className="bg-white rounded-xl border border-gray-200/75 shadow-sm overflow-hidden">
          <div className="border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg shadow-sm">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">TSM EFT-POS SİCİL NUMARASI TANIMLAMA</h2>
              </div>
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-200 transition-colors duration-150">
                <span className="text-sm font-medium text-gray-700">ANIML</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TerminalForm;