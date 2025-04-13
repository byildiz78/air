'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Percent, Save, X } from 'lucide-react';
import { TaxGroup, ProductTaxMapping } from '@/types/taxGroup';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Tabs } from '@/components/ui/Tabs';
import { nanoid } from 'nanoid';

// Örnek veri
const initialTaxGroups: TaxGroup[] = [
  { id: '1', name: 'YİYECEK %1', rate: 1 },
  { id: '2', name: 'YİYECEK %8', rate: 8 },
  { id: '3', name: 'YİYECEK %18', rate: 18 },
  { id: '4', name: 'İÇECEK %8', rate: 8 },
  { id: '5', name: 'İÇECEK %18', rate: 18 },
  { id: '6', name: 'ALKOLLÜ %18', rate: 18 },
  { id: '7', name: 'TATLI %8', rate: 8 },
  { id: '8', name: 'TATLI %18', rate: 18 },
  { id: '9', name: 'KDV %0', rate: 0 },
  { id: '10', name: 'YİYECEK %10', rate: 10 },
  { id: '11', name: 'YİYECEK %20', rate: 20 },
  { id: '12', name: 'YİYECEK %24', rate: 24 }
];

// Örnek ürünler ve eşleştirmeler
const initialMappings: ProductTaxMapping[] = [
  { 
    id: '1', 
    productId: '1', 
    productName: 'Hamburger',
    masaKdvId: '3',
    alGoturKdvId: '3',
    paketServisKdvId: '2'
  },
  { 
    id: '2', 
    productId: '2', 
    productName: 'Pizza',
    masaKdvId: '3',
    alGoturKdvId: '3',
    paketServisKdvId: '2'
  },
  { 
    id: '3', 
    productId: '3', 
    productName: 'Kola',
    masaKdvId: '5',
    alGoturKdvId: '5',
    paketServisKdvId: '5'
  },
  { 
    id: '4', 
    productId: '4', 
    productName: 'Ayran',
    masaKdvId: '4',
    alGoturKdvId: '4',
    paketServisKdvId: '4'
  },
  { 
    id: '5', 
    productId: '5', 
    productName: 'Baklava',
    masaKdvId: '8',
    alGoturKdvId: '8',
    paketServisKdvId: '7'
  }
];

const tabs = [
  { id: 'groups', title: 'KDV Grupları' },
  { id: 'mappings', title: 'Satış Tipine Göre Eşleştirme' }
];

export default function TaxDefinitionsPage() {
  const [activeTab, setActiveTab] = useState('groups');
  const [taxGroups, setTaxGroups] = useState<TaxGroup[]>(initialTaxGroups);
  const [mappings, setMappings] = useState<ProductTaxMapping[]>(initialMappings);
  const [showModal, setShowModal] = useState(false);
  const [selectedTaxGroup, setSelectedTaxGroup] = useState<TaxGroup | undefined>();
  const [editMode, setEditMode] = useState<'new' | 'edit'>('new');
  const [editingRows, setEditingRows] = useState<Set<string>>(new Set());
  const [tempMappings, setTempMappings] = useState<{ [key: string]: ProductTaxMapping }>({});

  const handleNewTaxGroup = () => {
    setSelectedTaxGroup(undefined);
    setEditMode('new');
    setShowModal(true);
  };

  const handleEditTaxGroup = (taxGroup: TaxGroup) => {
    setSelectedTaxGroup(taxGroup);
    setEditMode('edit');
    setShowModal(true);
  };

  const handleDeleteTaxGroup = (taxGroupId: string) => {
    if (confirm('Bu KDV grubunu silmek istediğinize emin misiniz?')) {
      setTaxGroups(taxGroups.filter(t => t.id !== taxGroupId));
      // İlgili eşleştirmeleri null yap
      setMappings(mappings.map(m => ({
        ...m,
        masaKdvId: m.masaKdvId === taxGroupId ? null : m.masaKdvId,
        alGoturKdvId: m.alGoturKdvId === taxGroupId ? null : m.alGoturKdvId,
        paketServisKdvId: m.paketServisKdvId === taxGroupId ? null : m.paketServisKdvId
      })));
    }
  };

  const handleSaveTaxGroup = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const taxGroup: TaxGroup = {
      id: selectedTaxGroup?.id || nanoid(),
      name: formData.get('name') as string,
      rate: parseFloat(formData.get('rate') as string)
    };

    if (editMode === 'edit') {
      setTaxGroups(taxGroups.map(t => t.id === taxGroup.id ? taxGroup : t));
    } else {
      setTaxGroups([...taxGroups, taxGroup]);
    }

    setShowModal(false);
  };

  const handleStartEdit = (mappingId: string) => {
    setEditingRows(prev => {
      const next = new Set(prev);
      next.add(mappingId);
      return next;
    });
    setTempMappings(prev => ({
      ...prev,
      [mappingId]: { ...mappings.find(m => m.id === mappingId)! }
    }));
  };

  const handleCancelEdit = (mappingId: string) => {
    setEditingRows(prev => {
      const next = new Set(prev);
      next.delete(mappingId);
      return next;
    });
    delete tempMappings[mappingId];
    setTempMappings({ ...tempMappings });
  };

  const handleSaveEdit = (mappingId: string) => {
    const tempMapping = tempMappings[mappingId];
    setMappings(mappings.map(m => m.id === mappingId ? tempMapping : m));
    handleCancelEdit(mappingId);
  };

  const handleTaxChange = (mappingId: string, field: 'masaKdvId' | 'alGoturKdvId' | 'paketServisKdvId', value: string) => {
    if (!editingRows.has(mappingId)) return;
    
    setTempMappings(prev => ({
      ...prev,
      [mappingId]: {
        ...prev[mappingId],
        [field]: value === '' ? null : value
      }
    }));
  };

  const TaxSelect = ({ 
    mappingId,
    field,
    value, 
    onChange 
  }: { 
    mappingId: string,
    field: 'masaKdvId' | 'alGoturKdvId' | 'paketServisKdvId',
    value: string | null, 
    onChange: (value: string) => void 
  }) => {
    const isEditing = editingRows.has(mappingId);
    const currentValue = isEditing ? tempMappings[mappingId][field] : value;

    return (
      <select
        value={currentValue || ''}
        onChange={(e) => onChange(e.target.value)}
        disabled={!isEditing}
        className={`w-full h-8 rounded bg-gray-50 border px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm ${
          isEditing 
            ? 'border-blue-300 bg-white' 
            : 'border-gray-300 bg-gray-50'
        } ${!isEditing && 'cursor-not-allowed opacity-75'}`}
      >
        <option value="">Seçiniz</option>
        {taxGroups.map(group => (
          <option key={group.id} value={group.id}>
            {group.name}
          </option>
        ))}
      </select>
    );
  };

  const taxGroupColumns: Column<TaxGroup>[] = [
    {
      header: 'Grup Adı',
      accessor: 'name',
      sortable: true
    },
    {
      header: 'KDV Oranı',
      accessor: (taxGroup: TaxGroup) => `%${taxGroup.rate}`,
      sortable: true
    },
    {
      header: 'İşlemler',
      accessor: (taxGroup: TaxGroup) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEditTaxGroup(taxGroup);
            }}
            className="text-blue-500 hover:text-blue-600 transition-colors"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteTaxGroup(taxGroup.id);
            }}
            className="text-red-500 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      )
    }
  ];

  const mappingColumns: Column<ProductTaxMapping>[] = [
    {
      header: 'Ürün',
      accessor: 'productName',
      sortable: true
    },
    {
      header: 'Masa',
      accessor: (mapping: ProductTaxMapping) => (
        <div className="flex items-center gap-2">
          <TaxSelect
            mappingId={mapping.id}
            field="masaKdvId"
            value={mapping.masaKdvId}
            onChange={(value) => handleTaxChange(mapping.id, 'masaKdvId', value)}
          />
        </div>
      )
    },
    {
      header: 'Al Götür',
      accessor: (mapping: ProductTaxMapping) => (
        <div className="flex items-center gap-2">
          <TaxSelect
            mappingId={mapping.id}
            field="alGoturKdvId"
            value={mapping.alGoturKdvId}
            onChange={(value) => handleTaxChange(mapping.id, 'alGoturKdvId', value)}
          />
        </div>
      )
    },
    {
      header: 'Paket Servis',
      accessor: (mapping: ProductTaxMapping) => (
        <div className="flex items-center gap-2">
          <TaxSelect
            mappingId={mapping.id}
            field="paketServisKdvId"
            value={mapping.paketServisKdvId}
            onChange={(value) => handleTaxChange(mapping.id, 'paketServisKdvId', value)}
          />
        </div>
      )
    },
    {
      header: 'İşlemler',
      accessor: (mapping: ProductTaxMapping) => {
        const isEditing = editingRows.has(mapping.id);
        
        return (
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={() => handleSaveEdit(mapping.id)}
                  className="text-emerald-500 hover:text-emerald-600 transition-colors"
                  title="Kaydet"
                >
                  <Save className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleCancelEdit(mapping.id)}
                  className="text-gray-500 hover:text-gray-600 transition-colors"
                  title="İptal"
                >
                  <X className="w-5 h-5" />
                </button>
              </>
            ) : (
              <button
                onClick={() => handleStartEdit(mapping.id)}
                className="text-blue-500 hover:text-blue-600 transition-colors"
                title="Düzenle"
              >
                <Edit className="w-5 h-5" />
              </button>
            )}
          </div>
        );
      }
    }
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">KDV Tanımları</h1>
      </div>

      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="mt-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-500">
            {activeTab === 'groups' ? 
              'KDV gruplarını ve oranlarını yönetin' : 
              'Ürünlerin satış tiplerine göre KDV gruplarını belirleyin'
            }
          </div>
          {activeTab === 'groups' && (
            <button
              onClick={handleNewTaxGroup}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Yeni KDV Grubu
            </button>
          )}
        </div>

        {activeTab === 'groups' ? (
          <DataTable
            columns={taxGroupColumns}
            data={taxGroups}
            onRowClick={handleEditTaxGroup}
          />
        ) : (
          <DataTable
            columns={mappingColumns}
            data={mappings}
          />
        )}
      </div>

      {/* KDV Grubu Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-[500px]">
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <Percent className="w-5 h-5 text-blue-500" />
                {editMode === 'edit' ? 'KDV Grubu Düzenle' : 'Yeni KDV Grubu'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTaxGroup} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Grup Adı
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={selectedTaxGroup?.name}
                  className="w-full h-10 rounded-lg bg-gray-50 border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  KDV Oranı (%)
                </label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    name="rate"
                    defaultValue={selectedTaxGroup?.rate}
                    className="w-full h-10 rounded-lg bg-gray-50 border border-gray-300 pl-9 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    required
                    min="0"
                    max="100"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
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
