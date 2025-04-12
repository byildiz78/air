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
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'rainy':
        return <CloudRain size={24} className="text-blue-400" />;
      case 'cloudy':
        return <Cloud size={24} className="text-gray-400" />;
      case 'partly':
        return <CloudSun size={24} className="text-yellow-400" />;
      default:
        return <Sun size={24} className="text-yellow-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900/70 to-gray-800/70">
      {/* Header Bar */}
      <div className="bg-gradient-to-b from-gray-900/90 to-gray-900/50 py-6 border-b border-white/10">
        <div className="container mx-auto px-8">
          <div className="flex justify-between items-center">
            {/* Logo & Time */}
            <div className="flex items-center gap-8">
              <h1 className="text-4xl font-bold text-white tracking-tight">
                Robot<span className="text-blue-500">POS</span>
                <span className="ml-2 text-gray-400 text-lg">Air</span>
              </h1>
              <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-xl border border-gray-700/50">
                <Clock size={20} className="text-blue-400" />
                <span className="text-2xl font-bold text-white">
                  {currentTime.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>

            {/* Weather & Notifications */}
            <div className="flex items-center gap-4">
              <div className="bg-gray-800/50 rounded-xl p-3 flex items-center gap-4 border border-gray-700/50">
                {getWeatherIcon()}
                <div className="text-white">
                  <span className="text-2xl font-bold">{weather.temp}°C</span>
                  <span className="text-gray-400 text-sm ml-2">Nem: %{weather.humidity}</span>
                </div>
              </div>
              <button className="relative p-3 bg-gray-800/50 rounded-xl border border-gray-700/50 text-white hover:bg-gray-700/50 transition-colors">
                <Bell size={24} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">3</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="container mx-auto px-8 py-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-4 border border-blue-500/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <DollarSign size={20} className="text-blue-400" />
              </div>
              <span className="text-gray-300">Günlük Satış</span>
            </div>
            <div className="text-2xl font-bold text-white">{stats.dailySales.toLocaleString('tr-TR')} TL</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-4 border border-green-500/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Users size={20} className="text-green-400" />
              </div>
              <span className="text-gray-300">Müşteri Sayısı</span>
            </div>
            <div className="text-2xl font-bold text-white">{stats.customerCount}</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl p-4 border border-purple-500/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <TrendingUp size={20} className="text-purple-400" />
              </div>
              <span className="text-gray-300">Ortalama Sepet</span>
            </div>
            <div className="text-2xl font-bold text-white">{stats.avgOrderValue.toLocaleString('tr-TR')} TL</div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl p-4 border border-orange-500/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Clock size={20} className="text-orange-400" />
              </div>
              <span className="text-gray-300">Aktif Siparişler</span>
            </div>
            <div className="text-2xl font-bold text-white">{stats.activeOrders}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-8 py-8 mb-16">
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="h-[calc(100vh-24rem)] transition-all duration-300 hover:transform hover:scale-[1.02]">
              <SalesOperations />
            </div>
            <div className="h-64 transition-all duration-300 hover:transform hover:scale-[1.02]">
              <CashierOperations />
            </div>
          </div>

          {/* Middle Column */}
          <div className="h-[calc(100vh-16rem)] transition-all duration-300 hover:transform hover:scale-[1.02]">
            <QuickOperations />
          </div>

          {/* Right Column */}
          <div className="h-[calc(100vh-16rem)] transition-all duration-300 hover:transform hover:scale-[1.02]">
            <CallList />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
