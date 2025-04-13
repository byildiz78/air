'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, CreditCard, Save, X } from 'lucide-react';
import { PaymentMethod, initialPaymentMethods } from '@/types/paymentMethod';
import { DataTable, Column } from '@/components/ui/DataTable';
import { nanoid } from 'nanoid';

export default function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(initialPaymentMethods);
  const [showModal, setShowModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | undefined>();
  const [editMode, setEditMode] = useState<'new' | 'edit'>('new');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleNewPaymentMethod = () => {
    setSelectedPaymentMethod(undefined);
    setEditMode('new');
    setShowModal(true);
  };

  const handleEditPaymentMethod = (paymentMethod: PaymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
    setEditMode('edit');
    setShowModal(true);
  };

  const handleDeletePaymentMethod = (id: string) => {
    if (confirm('Bu ödeme tipini silmek istediğinize emin misiniz?')) {
      setPaymentMethods(paymentMethods.filter(pm => pm.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const paymentMethod: PaymentMethod = {
      id: selectedPaymentMethod?.id || nanoid(),
      name: formData.get('name') as string,
      displayOrder: parseInt(formData.get('displayOrder') as string),
      securityLevel: parseInt(formData.get('securityLevel') as string),
      isHidden: formData.get('isHidden') === 'true',
      isPrinterDisabled: formData.get('isPrinterDisabled') === 'true',
      isCustomerNameRequired: formData.get('isCustomerNameRequired') === 'true',
      isCouponPayment: formData.get('isCouponPayment') === 'true',
      accountingCode: formData.get('accountingCode') as string,
      isFixedAmount: formData.get('isFixedAmount') === 'true',
      opensCashDrawer: formData.get('opensCashDrawer') === 'true',
      isForeignCurrency: formData.get('isForeignCurrency') === 'true',
      isCampusCard: formData.get('isCampusCard') === 'true',
      mobileEftPos: formData.get('mobileEftPos') as string || undefined,
      link: formData.get('link') as string || undefined,
      bankCode: formData.get('bankCode') as string || undefined,
      exchangeRate: formData.get('exchangeRate') ? parseFloat(formData.get('exchangeRate') as string) : undefined
    };

    if (editMode === 'new') {
      setPaymentMethods([...paymentMethods, paymentMethod]);
    } else {
      setPaymentMethods(paymentMethods.map(pm => 
        pm.id === paymentMethod.id ? paymentMethod : pm
      ));
    }

    setShowModal(false);
  };

  const columns: Column<PaymentMethod>[] = [
    {
      header: 'Sıra No',
      accessor: (pm) => pm.displayOrder,
      sortable: true
    },
    {
      header: 'Ödeme Tipi',
      accessor: (pm) => pm.name,
      sortable: true
    },
    {
      header: 'Güvenlik Seviyesi',
      accessor: (pm) => (
        <span className="px-2 py-1 rounded bg-blue-50 text-blue-700 text-sm font-medium">
          Seviye {pm.securityLevel}
        </span>
      ),
      sortable: true
    },
    {
      header: 'Muhasebe Kodu',
      accessor: (pm) => pm.accountingCode
    },
    {
      header: 'Özellikler',
      accessor: (pm) => (
        <div className="flex flex-wrap gap-2">
          {pm.isHidden && (
            <span className="px-2 py-1 rounded bg-gray-100 text-gray-600 text-xs">Gizli</span>
          )}
          {pm.isPrinterDisabled && (
            <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-600 text-xs">Fiş Yazdırılmaz</span>
          )}
          {pm.isCustomerNameRequired && (
            <span className="px-2 py-1 rounded bg-purple-100 text-purple-600 text-xs">Müşteri Adı Zorunlu</span>
          )}
          {pm.isCouponPayment && (
            <span className="px-2 py-1 rounded bg-green-100 text-green-600 text-xs">Kupon Ödemesi</span>
          )}
          {pm.opensCashDrawer && (
            <span className="px-2 py-1 rounded bg-blue-100 text-blue-600 text-xs">Para Çekmecesi</span>
          )}
          {pm.isForeignCurrency && (
            <span className="px-2 py-1 rounded bg-orange-100 text-orange-600 text-xs">Döviz</span>
          )}
          {pm.isCampusCard && (
            <span className="px-2 py-1 rounded bg-indigo-100 text-indigo-600 text-xs">Kampüs Kart</span>
          )}
        </div>
      )
    },
    {
      header: 'İşlemler',
      accessor: (pm) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEditPaymentMethod(pm)}
            className="text-blue-500 hover:text-blue-600 transition-colors"
            title="Düzenle"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleDeletePaymentMethod(pm.id)}
            className="text-red-500 hover:text-red-600 transition-colors"
            title="Sil"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Ödeme Tipleri</h1>
        <button
          onClick={handleNewPaymentMethod}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Yeni Ödeme Tipi
        </button>
      </div>

      <DataTable
        columns={columns}
        data={paymentMethods}
      />

      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden border border-gray-100"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b bg-gradient-to-r from-blue-500/10 to-emerald-500/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
                      {editMode === 'new' ? 'Yeni Ödeme Tipi' : 'Ödeme Tipi Düzenle'}
                    </h2>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {editMode === 'new' ? 'Yeni bir ödeme tipi ekleyin' : 'Ödeme tipi bilgilerini güncelleyin'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-500 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Kapat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="px-6 py-4 overflow-y-auto max-h-[calc(90vh-180px)]">
                {/* Ana Form */}
                <div className="space-y-8">
                  {/* Genel Bilgiler */}
                  <div>
                    <h3 className="flex items-center gap-2 text-base font-medium text-gray-900 mb-4">
                      <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
                      Genel Bilgiler
                    </h3>
                    <div className="space-y-4 bg-gray-50/50 p-4 rounded-lg border border-gray-100">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ödeme Tipi Adı</label>
                        <input
                          type="text"
                          name="name"
                          defaultValue={selectedPaymentMethod?.name}
                          required
                          className="w-full px-3 py-2 bg-white border rounded-md focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Sıra No</label>
                          <input
                            type="number"
                            name="displayOrder"
                            defaultValue={selectedPaymentMethod?.displayOrder || paymentMethods.length + 1}
                            required
                            min="1"
                            className="w-full px-3 py-2 bg-white border rounded-md focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Güvenlik Seviyesi</label>
                          <select
                            name="securityLevel"
                            defaultValue={selectedPaymentMethod?.securityLevel || 1}
                            required
                            className="w-full px-3 py-2 bg-white border rounded-md focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                          >
                            {[...Array(10)].map((_, i) => (
                              <option key={i + 1} value={i + 1}>Seviye {i + 1}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Muhasebe Kodu</label>
                        <input
                          type="text"
                          name="accountingCode"
                          defaultValue={selectedPaymentMethod?.accountingCode}
                          className="w-full px-3 py-2 bg-white border rounded-md focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Özellikler */}
                  <div>
                    <h3 className="flex items-center gap-2 text-base font-medium text-gray-900 mb-4">
                      <div className="w-1 h-5 bg-emerald-500 rounded-full"></div>
                      Özellikler
                    </h3>
                    <div className="grid grid-cols-2 gap-3 bg-gray-50/50 p-4 rounded-lg border border-gray-100">
                      {[
                        { name: 'isHidden', label: 'Ödeme Tipini Gizle' },
                        { name: 'isPrinterDisabled', label: 'Yazarkasa Fişi Yazdırılmaz' },
                        { name: 'isCustomerNameRequired', label: 'Müşteri Adını Sor' },
                        { name: 'isCouponPayment', label: 'Kupon Ödeme Tipidir' },
                        { name: 'isFixedAmount', label: 'Para Üstü Hesaplanmaz' },
                        { name: 'opensCashDrawer', label: 'Para Çekmecesini Aç' },
                        { name: 'isForeignCurrency', label: 'Döviz Ödemesidir' },
                        { name: 'isCampusCard', label: 'Kampüs Kart' }
                      ].map((option) => (
                        <label key={option.name} className="flex items-center space-x-2 p-2 hover:bg-white rounded transition-colors">
                          <input
                            type="checkbox"
                            name={option.name}
                            defaultChecked={selectedPaymentMethod?.[option.name as keyof PaymentMethod] as boolean}
                            className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500/20"
                          />
                          <span className="text-sm text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Ek Ayarlar */}
                  <div>
                    <h3 className="flex items-center gap-2 text-base font-medium text-gray-900 mb-4">
                      <div className="w-1 h-5 bg-purple-500 rounded-full"></div>
                      Ek Ayarlar
                    </h3>
                    <div className="grid grid-cols-2 gap-4 bg-gray-50/50 p-4 rounded-lg border border-gray-100">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mobil EFT POS</label>
                        <select
                          name="mobileEftPos"
                          defaultValue={selectedPaymentMethod?.mobileEftPos || ''}
                          className="w-full px-3 py-2 bg-white border rounded-md focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                        >
                          <option value="">Seçiniz</option>
                          <option value="YKBPOS">YKB POS</option>
                          <option value="ZIRAAT">Ziraat</option>
                          <option value="INGENICO">Ingenico</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Banka Kodu</label>
                        <input
                          type="text"
                          name="bankCode"
                          defaultValue={selectedPaymentMethod?.bankCode}
                          className="w-full px-3 py-2 bg-white border rounded-md focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
                        <input
                          type="text"
                          name="link"
                          defaultValue={selectedPaymentMethod?.link}
                          className="w-full px-3 py-2 bg-white border rounded-md focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Döviz Kuru</label>
                        <input
                          type="number"
                          name="exchangeRate"
                          defaultValue={selectedPaymentMethod?.exchangeRate}
                          step="0.01"
                          className="w-full px-3 py-2 bg-white border rounded-md focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-md transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow-sm transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
