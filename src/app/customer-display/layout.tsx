'use client';

import React, { useEffect } from 'react';

export default function CustomerDisplayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Tam ekran modunu etkinleştirme
  useEffect(() => {
    const enableFullscreen = async () => {
      try {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        }
      } catch (error) {
        console.log('Tam ekran modu etkinleştirilemedi:', error);
      }
    };

    // Sayfa yüklendiğinde tam ekran modunu etkinleştirmeyi dene
    const fullscreenButton = document.createElement('button');
    fullscreenButton.textContent = 'Tam Ekran';
    fullscreenButton.className = 'fixed top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-lg z-50 opacity-30 hover:opacity-100 transition-opacity';
    fullscreenButton.onclick = enableFullscreen;
    document.body.appendChild(fullscreenButton);

    // Temizleme fonksiyonu
    return () => {
      document.body.removeChild(fullscreenButton);
    };
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      {children}
    </div>
  );
}
