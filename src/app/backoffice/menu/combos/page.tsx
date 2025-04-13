'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { ComboMenu } from '@/types/comboMenu';
import { ComboMenuModal } from '@/components/backoffice/menu/ComboMenuModal';
import { DataTable, Column } from '@/components/ui/DataTable';

// Örnek veri
const initialCombos: ComboMenu[] = [
  {
    id: '1',
    name: 'Hamburger Menü',
    basePrice: 150.00,
    description: 'Hamburger + İçecek + Patates',
    isActive: true,
    selectionGroups: [
      {
        id: '1',
        name: 'Ana Yemek',
        minSelection: 1,
        maxSelection: 1,
        products: [
          { id: '1', name: 'Hamburger', price: 0 },
          { id: '2', name: 'Cheeseburger', price: 10 }
        ]
      },
      {
        id: '2',
        name: 'İçecek',
        minSelection: 1,
        maxSelection: 1,
        products: [
          { id: '3', name: 'Kola', price: 0 },
          { id: '4', name: 'Fanta', price: 0 },
          { id: '5', name: 'Sprite', price: 0 }
        ]
      },
      {
        id: '3',
        name: 'Yan Ürün',
        minSelection: 1,
        maxSelection: 1,
        products: [
          { id: '6', name: 'Patates Kızartması', price: 0 },
          { id: '7', name: 'Soğan Halkası', price: 5 }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Dürüm Menü',
    basePrice: 120.00,
    description: 'Dürüm + İçecek',
    isActive: true,
    selectionGroups: [
      {
        id: '4',
        name: 'Ana Yemek',
        minSelection: 1,
        maxSelection: 1,
        products: [
          { id: '8', name: 'Adana Dürüm', price: 0 },
          { id: '9', name: 'Urfa Dürüm', price: 0 }
        ]
      },
      {
        id: '5',
        name: 'İçecek',
        minSelection: 1,
        maxSelection: 1,
        products: [
          { id: '10', name: 'Kola', price: 0 },
          { id: '11', name: 'Ayran', price: 0 }
        ]
      }
    ]
  }
];

export default function CombosPage() {
  const [combos, setCombos] = useState<ComboMenu[]>(initialCombos);
  const [showModal, setShowModal] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState<ComboMenu | undefined>();

  const handleNewCombo = () => {
    setSelectedCombo(undefined);
    setShowModal(true);
  };

  const handleEditCombo = (combo: ComboMenu) => {
    setSelectedCombo(combo);
    setShowModal(true);
  };

  const handleDeleteCombo = (comboId: string) => {
    if (confirm('Bu kombo menüyü silmek istediğinize emin misiniz?')) {
      setCombos(combos.filter(c => c.id !== comboId));
    }
  };

  const handleSaveCombo = (combo: ComboMenu) => {
    if (selectedCombo) {
      // Düzenleme
      setCombos(combos.map(c => c.id === combo.id ? combo : c));
    } else {
      // Yeni ekleme
      setCombos([...combos, combo]);
    }
    setShowModal(false);
  };

  const columns: Column<ComboMenu>[] = [
    {
      header: 'Menü Adı',
      accessor: 'name' as keyof ComboMenu,
      sortable: true
    },
    {
      header: 'Fiyat',
      accessor: (combo: ComboMenu) => `${combo.basePrice.toFixed(2)} ₺`,
      sortable: true
    },
    {
      header: 'Açıklama',
      accessor: 'description' as keyof ComboMenu,
      sortable: true
    },
    {
      header: 'Grup Sayısı',
      accessor: (combo: ComboMenu) => combo.selectionGroups.length,
      sortable: true
    },
    {
      header: 'Toplam Ürün',
      accessor: (combo: ComboMenu) => combo.selectionGroups.reduce((sum, group) => sum + group.products.length, 0),
      sortable: true
    },
    {
      header: 'İşlemler',
      accessor: (combo: ComboMenu) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEditCombo(combo);
            }}
            className="text-blue-500 hover:text-blue-600 transition-colors"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteCombo(combo.id);
            }}
            className="text-red-500 hover:text-red-600 transition-colors"
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
        <h1 className="text-2xl font-semibold text-gray-900">Kombo Menüler</h1>
        <button
          onClick={handleNewCombo}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Yeni Kombo Menü
        </button>
      </div>

      <DataTable
        columns={columns}
        data={combos}
        onRowClick={handleEditCombo}
      />

      <ComboMenuModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveCombo}
        combo={selectedCombo}
      />
    </div>
  );
}
