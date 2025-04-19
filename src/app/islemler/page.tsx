"use client";
import React from 'react';
import { UserPlus, Users, CreditCard, List, FileBarChart2, StickyNote, Clock, Package } from 'lucide-react';

const actions = [
  { id: 1, label: 'Cari Hesap Ekle', icon: UserPlus },
  { id: 2, label: 'Sürekli Müşteri Ekle', icon: Users },
  { id: 3, label: 'Cari Hesaptan Tahsilat Al', icon: CreditCard },
  { id: 4, label: 'Tahsilatları Listele', icon: List },
  { id: 5, label: 'Raporlar', icon: FileBarChart2 },
  { id: 6, label: 'Şube Notu Güncelle', icon: StickyNote },
  { id: 7, label: 'Geri Sayım Ürünleri', icon: Clock },
];

const IslemlerPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">İşlemler</h2>
          <nav>
            <ul className="space-y-2">
              {actions.map(action => (
                <li key={action.id} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 cursor-pointer group transition">
                  <action.icon className="w-5 h-5 text-blue-500 group-hover:text-blue-700 transition" />
                  <span className="text-gray-900 font-medium text-base group-hover:text-blue-700 transition">{action.label}</span>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="p-6 border-t border-gray-100 mt-auto">
          <nav className="space-y-2">
            <a href="/" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 font-medium border border-green-200 bg-green-100 text-center transition">Ana Sayfaya Dön</a>
            <a href="/backoffice" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium">Backoffice</a>
            <a href="/islemler" className="block px-3 py-2 rounded-lg text-blue-700 bg-blue-100 font-semibold">İşlemler</a>
          </nav>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center">
          <h1 className="text-2xl font-bold text-gray-900">İşlemler Yönetimi</h1>
        </header>
        <section className="flex-1 flex items-center justify-center">
          <div className="text-gray-500 text-lg">Sol menüden işlemleri görüntüleyebilirsiniz.</div>
        </section>
      </main>
    </div>
  );
};

export default IslemlerPage;
