import React, { useState } from 'react';

const initialActions = [
  { id: 1, label: 'CARİ HESAP EKLE' },
  { id: 2, label: 'SÜREKLİ MÜŞTERİ EKLE' },
  { id: 3, label: 'CARİ HESAPTAN TAHSİLAT AL' },
  { id: 4, label: 'CARİ HESAP TAHSİLATLARI' },
  { id: 5, label: 'Raporlar' },
  { id: 6, label: 'ŞUBE NOTU GÜNCELLE' },
  { id: 7, label: 'Geri Sayım' },
  { id: 8, label: 'Ürünleri' },
  { id: 9, label: 'TAMAM' },
];

const ActionsManagementPage: React.FC = () => {
  const [actions, setActions] = useState(initialActions);
  const [newLabel, setNewLabel] = useState('');

  const addAction = () => {
    if (newLabel.trim()) {
      setActions([...actions, { id: Date.now(), label: newLabel }]);
      setNewLabel('');
    }
  };

  const removeAction = (id: number) => {
    setActions(actions.filter(a => a.id !== id));
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-gray-900 p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-white">İşlemler Yönetimi</h2>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          className="flex-1 px-2 py-1 rounded text-black"
          placeholder="Yeni işlem adı"
          value={newLabel}
          onChange={e => setNewLabel(e.target.value)}
        />
        <button
          className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
          onClick={addAction}
        >Ekle</button>
      </div>
      <ul className="space-y-2">
        {actions.map(action => (
          <li key={action.id} className="flex items-center justify-between bg-gray-800 px-3 py-2 rounded">
            <span className="text-white">{action.label}</span>
            <button
              className="text-xs text-red-400 hover:text-red-600"
              onClick={() => removeAction(action.id)}
            >Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActionsManagementPage;
