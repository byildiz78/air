import React from 'react';
import { 
  X, Users, Clock, RefreshCcw, Lock, FileText, Timer, Database, 
  ArrowLeftRight, ArrowLeft, Percent, CreditCard, FileSpreadsheet,
  BarChart3, Undo, Calculator, Store, Gift, Package, Wallet,
  Receipt, Settings, FileBarChart
} from 'lucide-react';

interface OtherOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OtherOptionsModal: React.FC<OtherOptionsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const menuGroups = [
    {
      title: 'Masa İşlemleri',
      items: [
        { icon: ArrowLeftRight, title: 'MASA DEĞİŞTİR', color: 'blue' },
        { icon: Users, title: 'GARSON DEĞİŞTİR', color: 'blue' },
        { icon: Users, title: 'KİŞİ SAYISI DEĞİŞTİR', color: 'blue' },
        { icon: FileSpreadsheet, title: 'AYIR', color: 'blue' },
      ]
    },
    {
      title: 'Finansal İşlemler',
      items: [
        { icon: Percent, title: 'İNDİRİM', color: 'green' },
        { icon: CreditCard, title: 'ÖDEME AYIR', color: 'green' },
        { icon: CreditCard, title: 'EFT POS\'A GÖNDER', color: 'green' },
        { icon: CreditCard, title: 'EFT POS İPTAL', color: 'green' },
        { icon: Calculator, title: 'KDV HESAPLA', color: 'green' },
      ]
    },
    {
      title: 'Müşteri ve Satış',
      items: [
        { icon: Users, title: 'MÜŞTERİ BUL', color: 'purple' },
        { icon: Store, title: 'DİPLOMATİK SATIŞ', color: 'purple' },
        { icon: Package, title: 'PAKET BEDELİ', color: 'purple' },
        { icon: Database, title: 'CRM', color: 'purple' },
      ]
    },
    {
      title: 'Raporlar ve Kayıtlar',
      items: [
        { icon: FileText, title: 'SON FİŞLERİ GÖSTER', color: 'orange' },
        { icon: BarChart3, title: 'RAPORLAR', color: 'orange' },
        { icon: FileBarChart, title: 'GÜNLÜK RAPOR', color: 'orange' },
        { icon: Receipt, title: 'SATIŞ RAPORU', color: 'orange' },
      ]
    },
    {
      title: 'Sistem ve Güvenlik',
      items: [
        { icon: Lock, title: 'EKRANI KİLİTLE', color: 'red' },
        { icon: Timer, title: 'HAPPY HOUR AÇ/KAPAT', color: 'red' },
        { icon: Database, title: 'SUNUCUDAN MENÜLERİ AL', color: 'red' },
        { icon: RefreshCcw, title: '2. FİYATLARI KULLAN', color: 'red' },
        { icon: Undo, title: 'İADE MODU', color: 'red' },
      ]
    },
  ];

  const getGroupStyle = (color: string) => {
    const styles = {
      blue: 'from-blue-600/20 to-blue-700/20 border-blue-500/20',
      green: 'from-green-600/20 to-green-700/20 border-green-500/20',
      purple: 'from-purple-600/20 to-purple-700/20 border-purple-500/20',
      orange: 'from-orange-600/20 to-orange-700/20 border-orange-500/20',
      red: 'from-red-600/20 to-red-700/20 border-red-500/20',
    };
    return styles[color as keyof typeof styles];
  };

  const getButtonStyle = (color: string) => {
    const styles = {
      blue: 'from-blue-600/80 to-blue-700/80 hover:from-blue-700/80 hover:to-blue-800/80',
      green: 'from-green-600/80 to-green-700/80 hover:from-green-700/80 hover:to-green-800/80',
      purple: 'from-purple-600/80 to-purple-700/80 hover:from-purple-700/80 hover:to-purple-800/80',
      orange: 'from-orange-600/80 to-orange-700/80 hover:from-orange-700/80 hover:to-orange-800/80',
      red: 'from-red-600/80 to-red-700/80 hover:from-red-700/80 hover:to-red-800/80',
    };
    return styles[color as keyof typeof styles];
  };

  return (
    <div className="fixed inset-0 bg-gray-900/95 z-50 flex flex-col">
      {/* Header */}
      <div className="flex-none h-16 p-4 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Diğer İşlemler</h2>
      </div>
      
      {/* Content */}
      <div className="flex-1 grid grid-cols-2 gap-4 p-4">
        {/* Left Column */}
        <div className="grid grid-rows-3 gap-4">
          <div className={`bg-gradient-to-br rounded-xl p-3 border ${getGroupStyle('blue')}`}>
            <h3 className="text-lg font-semibold text-white mb-2">{menuGroups[0].title}</h3>
            <div className="grid grid-cols-2 gap-2">
              {menuGroups[0].items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  className={`bg-gradient-to-br ${getButtonStyle(item.color)} 
                    text-white p-2 rounded-lg flex flex-col items-center gap-1
                    transition-all duration-200 transform hover:scale-105`}
                >
                  <item.icon size={24} />
                  <span className="text-xs font-medium text-center">{item.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={`bg-gradient-to-br rounded-xl p-3 border ${getGroupStyle('green')}`}>
            <h3 className="text-lg font-semibold text-white mb-2">{menuGroups[1].title}</h3>
            <div className="grid grid-cols-3 gap-2">
              {menuGroups[1].items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  className={`bg-gradient-to-br ${getButtonStyle(item.color)} 
                    text-white p-2 rounded-lg flex flex-col items-center gap-1
                    transition-all duration-200 transform hover:scale-105`}
                >
                  <item.icon size={24} />
                  <span className="text-xs font-medium text-center">{item.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={`bg-gradient-to-br rounded-xl p-3 border ${getGroupStyle('purple')}`}>
            <h3 className="text-lg font-semibold text-white mb-2">{menuGroups[2].title}</h3>
            <div className="grid grid-cols-2 gap-2">
              {menuGroups[2].items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  className={`bg-gradient-to-br ${getButtonStyle(item.color)} 
                    text-white p-2 rounded-lg flex flex-col items-center gap-1
                    transition-all duration-200 transform hover:scale-105`}
                >
                  <item.icon size={24} />
                  <span className="text-xs font-medium text-center">{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="grid grid-rows-2 gap-4">
          <div className={`bg-gradient-to-br rounded-xl p-3 border ${getGroupStyle('orange')}`}>
            <h3 className="text-lg font-semibold text-white mb-2">{menuGroups[3].title}</h3>
            <div className="grid grid-cols-2 gap-2">
              {menuGroups[3].items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  className={`bg-gradient-to-br ${getButtonStyle(item.color)} 
                    text-white p-2 rounded-lg flex flex-col items-center gap-1
                    transition-all duration-200 transform hover:scale-105`}
                >
                  <item.icon size={24} />
                  <span className="text-xs font-medium text-center">{item.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={`bg-gradient-to-br rounded-xl p-3 border ${getGroupStyle('red')}`}>
            <h3 className="text-lg font-semibold text-white mb-2">{menuGroups[4].title}</h3>
            <div className="grid grid-cols-3 gap-2">
              {menuGroups[4].items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  className={`bg-gradient-to-br ${getButtonStyle(item.color)} 
                    text-white p-2 rounded-lg flex flex-col items-center gap-1
                    transition-all duration-200 transform hover:scale-105`}
                >
                  <item.icon size={24} />
                  <span className="text-xs font-medium text-center">{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex-none h-16 p-4 border-t border-gray-700">
        <button
          onClick={onClose}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Satış Ekranına Geri Dön</span>
        </button>
      </div>
    </div>
  );
};

export default OtherOptionsModal;