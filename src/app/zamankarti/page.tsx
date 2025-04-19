"use client";
import React, { useState } from 'react';
import { LogIn, LogOut, MessageSquare, Store, Home } from 'lucide-react';

const mockData = [
  { day: 'Pazartesi', giris: '08:59', cikis: '18:04' },
  { day: 'Salı', giris: '09:03', cikis: '18:01' },
  { day: 'Çarşamba', giris: '08:55', cikis: '17:55' },
  { day: 'Perşembe', giris: '09:01', cikis: '18:08' },
  { day: 'Cuma', giris: '08:58', cikis: '18:02' },
  { day: 'Cumartesi', giris: '09:05', cikis: '17:59' },
  { day: 'Pazar', giris: '-', cikis: '-' },
];

export default function ZamanKartiPage() {
  const [modal, setModal] = useState<null | 'start' | 'end' | 'open'>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#e9edfa] to-[#f8fafc] flex flex-col items-center py-10 relative">
      {/* Info Message */}
      <div className="w-full max-w-3xl mb-8 flex justify-center">
        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-8 py-4 rounded-xl shadow text-base font-medium flex items-center gap-3">
          Giriş Çıkış İşlemlerinizi buradan yapabilirsiniz.
        </div>
      </div>
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl flex flex-row gap-10 p-8 border border-gray-100">
        {/* Left: Buttons */}
        <div className="flex flex-col items-stretch justify-center gap-5 min-w-[200px] pt-2 relative">
          <SimpleButton icon={<LogIn size={20} />} label="İŞ BAŞI" onClick={() => setModal('start')} />
          <SimpleButton icon={<LogOut size={20} />} label="İŞ SONU" onClick={() => setModal('end')} />
          <SimpleButton icon={<MessageSquare size={18} />} label="MESAJ GÖNDER" />
          <SimpleButton icon={<Store size={18} />} label="MAĞAZA AÇILIŞ" onClick={() => setModal('open')} />
        </div>
        {/* Center: Mock Table - Card Style */}
        <div className="flex-1 flex flex-col items-center justify-start">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 mt-2">Bu Hafta Giriş / Çıkış Saatleri</h2>
          <div className="w-full max-w-md grid grid-cols-1 gap-3">
            {mockData.map((row, idx) => (
              <div key={row.day} className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-white rounded-lg shadow border border-blue-100 px-5 py-2">
                <span className="font-medium text-gray-600 w-32">{row.day}</span>
                <span className={`px-3 py-1 rounded text-sm font-semibold ${row.giris !== '-' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>{row.giris}</span>
                <span className={`px-3 py-1 rounded text-sm font-semibold ${row.cikis !== '-' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-400'}`}>{row.cikis}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Ana Sayfa Butonu sol alta sabit */}
        <a href="/" className="fixed left-10 bottom-10 z-50 w-full">
          <SimpleButton icon={<Home size={20} />} label="Ana Sayfa" type="main" fullWidth />
        </a>
      </div>
      {/* Onay Modalı */}
      {modal && (
        <Modal onClose={() => setModal(null)}>
          <div className="p-6 flex flex-col items-center">
            {modal === 'start' && (
              <>
                <div className="text-2xl font-semibold mb-2">İş Başı Onayı</div>
                <div className="text-lg text-gray-700 mb-4">
                  İş Başı saatiniz <span className="font-bold text-blue-700">10:45</span> olarak kaydedilecek. Onaylıyor musunuz?
                </div>
              </>
            )}
            {modal === 'end' && (
              <>
                <div className="text-2xl font-semibold mb-2">İş Sonu Onayı</div>
                <div className="text-lg text-gray-700 mb-4">
                  İş Sonu saatiniz <span className="font-bold text-blue-700">10:45</span> olarak kaydedilecek. Onaylıyor musunuz?
                </div>
              </>
            )}
            {modal === 'open' && (
              <>
                <div className="text-2xl font-semibold mb-2">Mağaza Açılış Onayı</div>
                <div className="text-lg text-gray-700 mb-4">
                  Mağaza açılış saatiniz <span className="font-bold text-blue-700">08:30</span> olarak kaydedilecek. Onaylıyor musunuz?
                </div>
              </>
            )}
            <div className="flex gap-4 mt-2">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition" onClick={() => setModal(null)}>Onayla</button>
              <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition" onClick={() => setModal(null)}>İptal</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

interface SimpleButtonProps {
  icon: React.ReactNode;
  label: string;
  type?: 'main';
  onClick?: () => void;
  fullWidth?: boolean;
}

function SimpleButton({ icon, label, type, onClick, fullWidth }: SimpleButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-6 py-3 rounded-lg border text-base font-medium shadow-sm transition-all duration-150
        ${type === 'main'
          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-none hover:from-purple-700 hover:to-blue-700'
          : 'bg-white text-gray-700 border-gray-200 hover:bg-blue-50'}
        ${fullWidth ? 'w-full justify-center' : 'w-full'}
      `}
      style={{ minHeight: 48, minWidth: 170, maxWidth: 220 }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-2xl p-0 min-w-[320px] max-w-[90vw] relative animate-fade-in">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
}
