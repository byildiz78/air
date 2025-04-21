import React, { useState, useEffect } from 'react';
import { Settings, RefreshCw, Clock, Grid3X3, List } from 'lucide-react';
import { KitchenDisplaySettings } from '../../types';

interface KitchenDisplayHeaderProps {
  settings: KitchenDisplaySettings;
  onSettingsChange: (settings: Partial<KitchenDisplaySettings>) => void;
}

const KitchenDisplayHeader: React.FC<KitchenDisplayHeaderProps> = ({ 
  settings, 
  onSettingsChange 
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  
  // Saati istemci tarafında güncellemek için useEffect kullanıyoruz
  useEffect(() => {
    // İlk render'da saati ayarla
    updateTime();
    
    // Her saniye saati güncelle
    const interval = setInterval(updateTime, 1000);
    
    // Component unmount olduğunda interval'i temizle
    return () => clearInterval(interval);
  }, []);
  
  // Saati güncelleyen fonksiyon
  const updateTime = () => {
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString('tr-TR', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    }));
  };
  
  const handleRefresh = () => {
    // This would trigger a manual refresh of orders
    console.log('Manual refresh triggered');
  };
  
  const toggleViewMode = () => {
    onSettingsChange({ 
      viewMode: settings.viewMode === 'grid' ? 'list' : 'grid' 
    });
  };
  
  return (
    <div className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">Mutfak Ekranı (KDS)</h1>
          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Aktif</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Clock size={18} />
            {/* Sadece istemci tarafında render edilecek saat */}
            {currentTime && <span>{currentTime}</span>}
          </div>
          
          <button 
            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
            onClick={toggleViewMode}
            title={settings.viewMode === 'grid' ? 'Liste Görünümü' : 'Izgara Görünümü'}
          >
            {settings.viewMode === 'grid' ? <List size={20} /> : <Grid3X3 size={20} />}
          </button>
          
          <button 
            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
            onClick={handleRefresh}
            title="Yenile"
          >
            <RefreshCw size={20} />
          </button>
          
          <button 
            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            title="Ayarlar"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>
      
      {isSettingsOpen && (
        <div className="container mx-auto mt-4 bg-gray-700 p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-3">Ekran Ayarları</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Otomatik Yenileme</label>
              <select 
                className="w-full bg-gray-600 border border-gray-500 rounded p-2 text-white"
                value={settings.autoRefreshInterval}
                onChange={(e) => onSettingsChange({ autoRefreshInterval: Number(e.target.value) })}
              >
                <option value={10}>10 saniye</option>
                <option value={30}>30 saniye</option>
                <option value={60}>1 dakika</option>
                <option value={300}>5 dakika</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Sıralama</label>
              <select 
                className="w-full bg-gray-600 border border-gray-500 rounded p-2 text-white"
                value={settings.sortBy}
                onChange={(e) => onSettingsChange({ sortBy: e.target.value as any })}
              >
                <option value="time">Zaman</option>
                <option value="priority">Öncelik</option>
                <option value="table">Masa No</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Gruplama</label>
              <select 
                className="w-full bg-gray-600 border border-gray-500 rounded p-2 text-white"
                value={settings.groupBy}
                onChange={(e) => onSettingsChange({ groupBy: e.target.value as any })}
              >
                <option value="none">Gruplama Yok</option>
                <option value="status">Durum</option>
                <option value="type">Sipariş Tipi</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Uyarı Eşiği (dk)</label>
              <input 
                type="number" 
                className="w-full bg-gray-600 border border-gray-500 rounded p-2 text-white"
                value={settings.alertThreshold}
                onChange={(e) => onSettingsChange({ alertThreshold: Number(e.target.value) })}
                min={1}
                max={60}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Kritik Eşik (dk)</label>
              <input 
                type="number" 
                className="w-full bg-gray-600 border border-gray-500 rounded p-2 text-white"
                value={settings.criticalThreshold}
                onChange={(e) => onSettingsChange({ criticalThreshold: Number(e.target.value) })}
                min={1}
                max={120}
              />
            </div>
            
            <div className="flex items-center">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="mr-2 h-5 w-5"
                  checked={settings.showCompletedOrders}
                  onChange={(e) => onSettingsChange({ showCompletedOrders: e.target.checked })}
                />
                <span>Tamamlanan Siparişleri Göster</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KitchenDisplayHeader;
