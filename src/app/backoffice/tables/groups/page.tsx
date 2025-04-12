'use client';

import React, { useState } from 'react';
import { Plus, Pencil, X } from 'lucide-react';

interface TableGroup {
  id: number;
  name: string;
}

export default function TableGroupsPage() {
  const [tableGroups, setTableGroups] = useState<TableGroup[]>([
    { id: 1, name: 'SALON' },
    { id: 2, name: 'BAHÇE' }
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleEdit = (group: TableGroup) => {
    setEditingId(group.id);
    setEditValue(group.name);
  };

  const handleSave = (id: number) => {
    setTableGroups(prev => 
      prev.map(group => 
        group.id === id ? { ...group, name: editValue } : group
      )
    );
    setEditingId(null);
    setEditValue('');
  };

  const handleDelete = (id: number) => {
    setTableGroups(prev => prev.filter(group => group.id !== id));
  };

  const handleAdd = () => {
    const newId = Math.max(...tableGroups.map(g => g.id), 0) + 1;
    setTableGroups(prev => [...prev, { id: newId, name: '' }]);
    setEditingId(newId);
    setEditValue('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">Masa Grupları</h1>
          </div>

          {/* Table Groups List */}
          <div className="divide-y divide-gray-200">
            {tableGroups.map((group, index) => (
              <div key={group.id} className="flex items-center px-6 py-4 hover:bg-gray-50">
                <div className="flex-none w-32">
                  <span className="text-gray-900 font-medium">Masa Grubu {index + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  {editingId === group.id ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSave(group.id)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      autoFocus
                    />
                  ) : (
                    <span className="text-gray-900">{group.name}</span>
                  )}
                </div>
                <div className="flex-none flex items-center gap-2 ml-4">
                  {editingId === group.id ? (
                    <button
                      onClick={() => handleSave(group.id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(group)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Pencil size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(group.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Group Button */}
          <div className="px-6 py-4 bg-gray-50">
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={18} />
              <span>Yeni Grup Ekle</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}