import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, CloudSun, Sun, TrendingUp, DollarSign, Users, Clock, Bell } from 'lucide-react';
import SalesOperations from '../SalesOperations';
import QuickOperations from '../QuickOperations';
import CallList from '../CallList';
import CashierOperations from '../CashierOperations';
import Footer from '../Footer';

const HomePage: React.FC = () => {
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

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Debug için hava durumu verilerini kontrol et
    console.log('Weather state:', weather);
    
    // Test için farklı hava durumlarını dene
    setTimeout(() => {
      setWeather(prev => ({
        ...prev,
        condition: 'cloudy'
      }));
    }, 2000);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getWeatherIcon = () => {
    console.log('Weather condition:', weather.condition); // Debug için
    switch (weather.condition) {
      case 'rainy':
        return <CloudRain size={20} className="text-blue-400 shrink-0" />;
      case 'cloudy':
        return <Cloud size={20} className="text-gray-400 shrink-0" />;
      case 'partly':
        return <CloudSun size={20} className="text-yellow-400 shrink-0" />;
      default:
        return <Sun size={20} className="text-yellow-400 shrink-0" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900/70 to-gray-800/70">
      {/* Header Bar */}
      <div className="bg-gradient-to-b from-gray-900/90 to-gray-900/50 py-2 border-b border-white/10 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo & Time */}
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-white tracking-tight">
                Robot<span className="text-blue-500">POS</span>
                <span className="ml-2 text-gray-400 text-sm">Air</span>
              </h1>
              <div className="flex items-center gap-1.5 bg-gray-800/50 px-2 py-1 rounded-lg border border-gray-700/50">
                <Clock size={14} className="text-blue-400" />
                <span className="text-lg font-bold text-white">
                  {currentTime.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>

            {/* Weather & Notifications */}
            <div className="flex items-center gap-2 relative z-20">
              <div className="bg-gray-800/50 rounded-lg p-1.5 flex items-center gap-2 border border-gray-700/50">
                <div className="w-5 h-5 flex items-center justify-center bg-gray-700/30 rounded relative">
                  {getWeatherIcon()}
                </div>
                <div className="text-white flex items-center gap-2 relative">
                  <span className="text-lg font-bold leading-none whitespace-nowrap">{weather.temp}°C</span>
                  <span className="text-gray-400 text-xs leading-none whitespace-nowrap">%{weather.humidity}</span>
                </div>
              </div>
              <button className="relative p-1.5 bg-gray-800/50 rounded-lg border border-gray-700/50 text-white hover:bg-gray-700/50 transition-colors">
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-[10px] flex items-center justify-center">3</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="container mx-auto px-4 py-2">
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-2 border border-blue-500/20">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="p-1 bg-blue-500/20 rounded-lg">
                <DollarSign size={16} className="text-blue-400" />
              </div>
              <span className="text-gray-300 text-xs">Günlük Satış</span>
            </div>
            <div className="text-lg font-bold text-white">{stats.dailySales.toLocaleString('tr-TR')} TL</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-2 border border-green-500/20">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="p-1 bg-green-500/20 rounded-lg">
                <Users size={16} className="text-green-400" />
              </div>
              <span className="text-gray-300 text-xs">Müşteri Sayısı</span>
            </div>
            <div className="text-lg font-bold text-white">{stats.customerCount}</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl p-2 border border-purple-500/20">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="p-1 bg-purple-500/20 rounded-lg">
                <TrendingUp size={16} className="text-purple-400" />
              </div>
              <span className="text-gray-300 text-xs">Ortalama Sepet</span>
            </div>
            <div className="text-lg font-bold text-white">{stats.avgOrderValue.toLocaleString('tr-TR')} TL</div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl p-2 border border-orange-500/20">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="p-1 bg-orange-500/20 rounded-lg">
                <Clock size={16} className="text-orange-400" />
              </div>
              <span className="text-gray-300 text-xs">Aktif Siparişler</span>
            </div>
            <div className="text-lg font-bold text-white">{stats.activeOrders}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-2 mb-8">
        <div className="grid grid-cols-3 gap-2 max-w-[1600px] mx-auto h-full">
          {/* Left Column */}
          <div className="space-y-2 flex flex-col">
            <div className="flex-1 min-h-0 h-[calc(100vh-32rem)] max-h-[calc(100vh-20rem)]">
              <SalesOperations />
            </div>
            <div className="h-28 shrink-0">
              <CashierOperations />
            </div>
          </div>

          {/* Middle Column */}
          <div className="h-[calc(100vh-24rem)] max-h-[calc(100vh-16rem)]">
            <QuickOperations />
          </div>

          {/* Right Column */}
          <div className="h-[calc(100vh-24rem)] max-h-[calc(100vh-16rem)]">
            <CallList />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center mt-6">
        <a href="/zamankarti" className="inline-block px-6 py-4 rounded-lg bg-purple-600 text-white text-xl font-bold shadow hover:bg-purple-700 transition">
          Zaman Kartı
        </a>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
