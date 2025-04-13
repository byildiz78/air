'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Settings2, CreditCard } from 'lucide-react';

interface CashierFormProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  settings: {
    enablePaymentFeatures: boolean;
    rememberCashierAndAskPassword: boolean;
    showCashDrawerButton: boolean;
    cashOverlayDisplayDuration: number;
    showMobilePaymentsOnCashierScreen: boolean;
    useDelicatessenKDVGroups: boolean;
    activityCashier: boolean;
    loadKDVNamesFromTaxgroups: boolean;
    useHuginCashRegister: boolean;
  };
}

export default function CashierForm({ onChange, settings }: CashierFormProps) {
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="grid gap-6">
        {/* Kasiyer Ayarları */}
        <section className="bg-white rounded-xl border border-gray-200/75 shadow-sm overflow-hidden">
          <div className="border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg shadow-sm">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Kasiyer Ayarları</h2>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Temel Ayarlar */}
            <div className="space-y-4">
              <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  name="enablePaymentFeatures"
                  checked={settings.enablePaymentFeatures}
                  onChange={onChange}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">ÖDEME ÖZELLİKLERİNİ ETKİNLEŞTİR</span>
              </label>

              <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  name="rememberCashierAndAskPassword"
                  checked={settings.rememberCashierAndAskPassword}
                  onChange={onChange}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">BU TERMİNALİN KASİYERİNİ HATIRLA VE ŞİFRE SORMA</span>
              </label>

              <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  name="showCashDrawerButton"
                  checked={settings.showCashDrawerButton}
                  onChange={onChange}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">PARA ÇEKMECESİ BUTONU GÖRÜNSÜN</span>
              </label>

              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">PARA ÜSTÜ EKRANI GÖRÜNME SÜRESİ (0 = görünmez)</span>
                <span className="text-sm font-medium text-gray-700">SANİYE</span>
                <input
                  type="number"
                  name="cashOverlayDisplayDuration"
                  value={settings.cashOverlayDisplayDuration}
                  onChange={onChange}
                  className="w-20 h-8 rounded border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-white"
                />
              </div>
            </div>

            {/* Diğer Ayarlar */}
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-2">
                <h3 className="text-base font-semibold text-gray-900">DİĞER AYARLAR</h3>
              </div>
              
              <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  name="showMobilePaymentsOnCashierScreen"
                  checked={settings.showMobilePaymentsOnCashierScreen}
                  onChange={onChange}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">KASİYER ÇIKIŞ EKRANINDA MOBİL ÖDEMELER GÖZÜKSÜN</span>
              </label>

              <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  name="useDelicatessenKDVGroups"
                  checked={settings.useDelicatessenKDVGroups}
                  onChange={onChange}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">ŞARKÜTERİ KDV GRUPLARI KULLANILSIN</span>
              </label>

              <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  name="activityCashier"
                  checked={settings.activityCashier}
                  onChange={onChange}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">ETKİNLİK KASASI</span>
              </label>

              <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  name="loadKDVNamesFromTaxgroups"
                  checked={settings.loadKDVNamesFromTaxgroups}
                  onChange={onChange}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">KDV İSİMLERİ TAXGROUPS TABLOSUNDAN BESLENSİN</span>
              </label>

              <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  name="useHuginCashRegister"
                  checked={settings.useHuginCashRegister}
                  onChange={onChange}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">HUGİN YAZARKASA KULLANIYOR</span>
              </label>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
