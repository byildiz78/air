'use client';

import React, { useState, useEffect } from 'react';
import { Code, Terminal, User, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState({
    temp: 24,
    condition: 'sunny', // sunny, cloudy, rainy
    humidity: 65
  });

  const [stats] = useState({
    dailySales: 12850.75,
    customerCount: 245,
    avgOrderValue: 52.45,
    activeOrders: 8
  });

  const pathname = usePathname();
  const isBackoffice = pathname?.startsWith('/backoffice');
  
  const plainBackgroundPages = ['/expenses', '/recall', '/delivery-customer'];
  const hideBackground = plainBackgroundPages.includes(pathname || '');
  const isOrderPage = pathname?.startsWith('/order');
  const isDeliveryCustomerPage = pathname === '/delivery-customer';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`flex flex-col h-screen ${!hideBackground ? 'bg-[url(/images/bg.jpg)] bg-cover bg-center' : 'bg-gray-900'}`}>
      {/* Header - Hidden in order pages and delivery-customer page */}
      {!isOrderPage && !isDeliveryCustomerPage && (
        <header className="h-16 shrink-0 bg-gray-900/90 border-b border-gray-800 px-6 flex items-center justify-between">
          <div className="text-2xl font-bold text-white">robotPOS Air</div>
          <div className="flex items-center gap-4">
            <div className="text-gray-400">
              {currentTime.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="flex items-center gap-2 bg-gray-800/50 px-2 py-1 rounded-full text-xs text-white">
              {/* Weather Icon */}
              {weather.condition === 'sunny' && <span title="Güneşli">☀️</span>}
              {weather.condition === 'cloudy' && <span title="Bulutlu">☁️</span>}
              {weather.condition === 'rainy' && <span title="Yağmurlu">🌧️</span>}
              <span>{weather.temp}°C</span>
              <span className="text-blue-300">/</span>
              <span className="text-gray-300">{weather.humidity}%</span>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1 min-h-0 overflow-hidden">
        {children}
      </main>

      {/* Footer - Hidden in backoffice, order pages, and delivery-customer page */}
      {!isBackoffice && !isOrderPage && !isDeliveryCustomerPage && (
        <footer className="h-12 shrink-0 bg-gray-900/90 border-t border-gray-800 px-3 flex items-center">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <Code size={14} />
             
              <a href="/backoffice" className="flex items-center gap-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 px-2 py-1 rounded-full transition-all duration-200 ml-1 text-xs">
                <Settings size={12} />
                <span>Arka Ofis</span>
              </a>
              <a href="/islemler" className="flex items-center gap-1 bg-green-500/10 hover:bg-green-500/20 text-green-500 hover:text-green-400 px-2 py-1 rounded-full transition-all duration-200 ml-1 text-xs">
                <span>İşlemler</span>
              </a>
              <a href="/zamankarti" className="flex items-center gap-1 bg-purple-500/10 hover:bg-purple-500/20 text-purple-500 hover:text-purple-400 px-2 py-1 rounded-full transition-all duration-200 ml-1 text-xs font-semibold">
                <span>Zaman Kartı</span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1 bg-gray-800/50 px-2 py-1 rounded-full">
                  <User size={14} className="text-blue-400" />
                  <span className="text-white font-medium text-xs">Ahmet Yılmazz</span>
                  <span className="text-gray-400 text-[10px]">(Baş Kasiyer)</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1 bg-gray-800/50 px-2 py-1 rounded-full">
                  <Terminal size={14} className="text-green-400" />
                  <span className="text-white font-medium text-xs">Terminal #2</span>
                </div>
                <div className="flex items-center gap-1 bg-gray-800/50 px-2 py-1 rounded-full">
                  <span className="text-white font-medium text-xs">RobotPOS Air v1.0.73</span>
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
