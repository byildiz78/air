'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Tag } from 'lucide-react';
import { Promotion, initialPromotions } from '@/types/promotion';
import { DataTable, Column } from '@/components/ui/DataTable';
import { nanoid } from 'nanoid';
import PromotionModal from '@/components/backoffice/promotions/PromotionModal';

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions);
  const [showModal, setShowModal] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | undefined>();
  const [editMode, setEditMode] = useState<'new' | 'edit'>('new');

  const handleNewPromotion = () => {
    setSelectedPromotion(undefined);
    setEditMode('new');
    setShowModal(true);
  };

  const handleEditPromotion = (promotion: Promotion) => {
    setSelectedPromotion(promotion);
    setEditMode('edit');
    setShowModal(true);
  };

  const handleDeletePromotion = (id: string) => {
    if (confirm('Bu indirimi silmek istediğinize emin misiniz?')) {
      setPromotions(promotions.filter(p => p.id !== id));
    }
  };

  const handleSubmit = (promotion: Promotion) => {
    if (editMode === 'new') {
      setPromotions([...promotions, { ...promotion, id: nanoid() }]);
    } else {
      setPromotions(promotions.map(p => p.id === promotion.id ? promotion : p));
    }
    setShowModal(false);
  };

  const columns: Column<Promotion>[] = [
    {
      header: 'İndirim Adı',
      accessor: (p) => (
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-blue-500" />
          <span>{p.name}</span>
        </div>
      ),
      sortable: true
    },
    {
      header: 'İndirim Tipi',
      accessor: (p) => (
        <span className="px-2 py-1 rounded bg-blue-50 text-blue-700 text-sm">
          {p.discountType === 'PERCENTAGE' ? `%${p.discountValue}` : `${p.discountValue} TL`}
        </span>
      )
    },
    {
      header: 'Güvenlik Seviyesi',
      accessor: (p) => (
        <span className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-sm">
          Seviye {p.securityLevel}
        </span>
      )
    },
    {
      header: 'Ürün & Grup Kapsamı',
      accessor: (p) => (
        <div className="flex flex-wrap gap-2">
          {p.includedProducts.length > 0 && (
            <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-700 text-xs">
              {p.includedProducts.length} Ürün Dahil
            </span>
          )}
          {p.includedGroups.length > 0 && (
            <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-700 text-xs">
              {p.includedGroups.length} Grup Dahil
            </span>
          )}
          {p.excludedProducts.length > 0 && (
            <span className="px-2 py-1 rounded bg-red-100 text-red-700 text-xs">
              {p.excludedProducts.length} Ürün Hariç
            </span>
          )}
          {p.excludedGroups.length > 0 && (
            <span className="px-2 py-1 rounded bg-red-100 text-red-700 text-xs">
              {p.excludedGroups.length} Grup Hariç
            </span>
          )}
        </div>
      )
    },
    {
      header: 'Durum',
      accessor: (p) => (
        <div className="flex flex-wrap gap-2">
          {p.isActive && (
            <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-700 text-xs">Aktif</span>
          )}
          {p.isProductDiscount && (
            <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs">Ürün İndirimi</span>
          )}
          {p.isCheckDiscount && (
            <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 text-xs">Çek İndirimi</span>
          )}
        </div>
      )
    },
    {
      header: 'İşlemler',
      accessor: (p) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEditPromotion(p)}
            className="text-blue-500 hover:text-blue-600 transition-colors"
            title="Düzenle"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleDeletePromotion(p.id)}
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
        <h1 className="text-2xl font-semibold text-gray-900">İndirim ve Promosyonlar</h1>
        <button
          onClick={handleNewPromotion}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Yeni İndirim
        </button>
      </div>

      <DataTable
        columns={columns}
        data={promotions}
      />

      {showModal && (
        <PromotionModal
          promotion={selectedPromotion}
          editMode={editMode}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
