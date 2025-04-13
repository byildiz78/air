'use client';

import React from 'react';
import { Edit2 } from 'lucide-react';

interface ProductMessageListProps {
  onEdit: (message: any) => void;
}

// Dummy data for demonstration
const dummyMessages = [
  {
    id: '1',
    name: 'Ekstra İstekler',
    secondLanguageName: 'Extra Requests',
    isActive: true,
    group: 'Ürün Mesaj Grubu 1',
    securityLevel: 1
  },
  {
    id: '2',
    name: 'Özel Notlar',
    secondLanguageName: 'Special Notes',
    isActive: true,
    group: 'Ürün Mesaj Grubu 2',
    securityLevel: 2
  }
];

export function ProductMessageList({ onEdit }: ProductMessageListProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-blue-600 to-blue-800">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">MESAJ ADI</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">İKİNCİ DİL ADI</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">GRUP</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">DURUM</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">GÜVENLİK SEVİYESİ</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-white">İŞLEMLER</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dummyMessages.map((message) => (
              <tr key={message.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{message.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{message.secondLanguageName}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{message.group}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    message.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {message.isActive ? 'AKTİF' : 'PASİF'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">SEVİYE {message.securityLevel}</td>
                <td className="px-6 py-4 text-sm text-gray-900 text-right">
                  <button
                    onClick={() => onEdit(message)}
                    className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  >
                    <Edit2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
