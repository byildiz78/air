'use client';

import React, { useState, useEffect } from 'react';
import { Code, Terminal, User, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const pathname = usePathname();
  const isBackoffice = pathname?.startsWith('/backoffice');
  
  const plainBackgroundPages = ['/expenses', '/recall', '/delivery-customer'];
  const hideBackground = plainBackgroundPages.includes(pathname || '');
  const isOrderPage = pathname?.startsWith('/order');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`flex flex-col h-screen ${!hideBackground ? 'bg-[url(/images/bg.jpg)] bg-cover bg-center' : 'bg-gray-900'}`}>
      {/* Header - Hidden in order pages */}
      {!isOrderPage && (
        <header className="h-16 shrink-0 bg-gray-900/90 border-b border-gray-800 px-6 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue">robotPOS Air</div>
          <div className="text-gray-400">
            {currentTime.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1 min-h-0 overflow-hidden">
        {children}
      </main>

      {/* Footer - Hidden in backoffice and order pages */}
      {!isBackoffice && !isOrderPage && (
        <footer className="h-14 shrink-0 bg-gray-900/90 border-t border-gray-800 px-6 flex items-center">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2 text-gray-400">
            <Code size={16} />
            <span>RobotPOS Air v1.0.3</span>
            <a href="/backoffice" className="flex items-center gap-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 px-3 py-1.5 rounded-full transition-all duration-200 ml-2">
              <Settings size={14} />
              <span>Arka Ofis</span>
            </a>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1.5 rounded-full">
                <User size={16} className="text-blue-400" />
                <span className="text-white font-medium">Ahmet Yılmazz</span>
                <span className="text-gray-400 text-sm">(Baş Kasiyer)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1.5 rounded-full">
                <Terminal size={16} className="text-green-400" />
                <span className="text-white font-medium">Terminal #2</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      )}
    </div>
  );
};

export default MainLayout;
