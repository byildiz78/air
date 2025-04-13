import React from 'react';
import { Phone, Clock, User, ShoppingBag } from 'lucide-react';

const CallList: React.FC = () => {
  const calls = [
    { 
      number: '+90 (555) 123-45-60', 
      time: '14:30',
      customer: 'Ahmet Yılmaz',
      status: 'incoming' // incoming, missed, completed
    },
    { 
      number: '+90 (555) 123-45-61', 
      time: '14:31',
      customer: 'Mehmet Demir',
      status: 'missed'
    },
    { 
      number: '+90 (555) 123-45-62', 
      time: '14:32',
      customer: 'Ayşe Kaya',
      status: 'completed'
    },
    { 
      number: '+90 (555) 123-45-63', 
      time: '14:33',
      customer: 'Fatma Şahin',
      status: 'incoming'
    },
  ];

  const notifications = [
    {
      platform: 'Yemek Sepeti',
      message: '250 TL Sipariş Geldi',
      time: '2 dk',
      type: 'new_order'
    },
    {
      platform: 'Trendyol',
      message: 'Sipariş İptal',
      time: '3 dk',
      type: 'cancel'
    },
    {
      platform: 'Getir',
      message: '180 TL Yeni Sipariş',
      time: '1 dk',
      type: 'new_order'
    },
    {
      platform: 'Yemek Sepeti',
      message: 'Kurye Atandı',
      time: '30 sn',
      type: 'courier'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'incoming':
        return 'bg-blue-500/20 text-blue-400';
      case 'missed':
        return 'bg-red-500/20 text-red-400';
      case 'completed':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'new_order':
        return 'bg-emerald-500/20 text-emerald-400';
      case 'cancel':
        return 'bg-red-500/20 text-red-400';
      case 'courier':
        return 'bg-blue-500/20 text-blue-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getNotificationAnimation = (type: string) => {
    switch (type) {
      case 'new_order':
        return 'animate-[glow_1.5s_ease-in-out_infinite]';
      case 'cancel':
        return 'animate-[bounce_0.5s_ease-in-out_infinite]';
      case 'courier':
        return 'animate-[scale_2s_ease-in-out_infinite]';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Calls Section */}
      <div className="glass-darker rounded-lg p-3 shadow-xl flex-[1.2] min-h-0">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold text-white">TÜM ARAMALAR</h2>
            <span className="px-1.5 py-0.5 bg-blue-500/20 rounded-lg text-blue-400 text-xs shrink-0 ml-2">
              {calls.length} arama
            </span>
          </div>
          
          <div className="grid grid-cols-1 gap-1.5 overflow-y-auto">
            {calls.map((call, index) => (
              <div 
                key={index} 
                className="flex flex-col bg-gray-800/50 p-2 rounded-lg border border-white/5 hover:border-blue-500/30 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className={`p-1 rounded-lg shrink-0 ${getStatusColor(call.status)}`}>
                      <Phone size={14} />
                    </div>
                    <div className="min-w-0 overflow-hidden">
                      <div className="text-white text-xs font-medium truncate">{call.number}</div>
                      <div className="text-gray-400 text-xs flex items-center gap-1">
                        <User size={10} className="shrink-0" />
                        <span className="truncate">{call.customer}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 text-xs shrink-0 ml-1.5">
                    <Clock size={10} />
                    <span>{call.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="glass-darker rounded-lg p-3 shadow-xl flex-1 min-h-0">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold text-white">Platform Bildirimleri</h2>
            <span className="px-1.5 py-0.5 bg-emerald-500/20 rounded-lg text-emerald-400 text-xs shrink-0 ml-2">
              {notifications.length} bildirim
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1.5 overflow-y-auto">
            {notifications.map((notification, index) => (
              <div 
                key={index} 
                className={`flex justify-between items-center bg-gray-800/50 p-1.5 rounded-lg border ${
                  notification.type === 'new_order' 
                    ? 'border-emerald-500/30' 
                    : notification.type === 'cancel'
                    ? 'border-red-500/30'
                    : notification.type === 'courier'
                    ? 'border-blue-500/30'
                    : 'border-white/5'
                } ${getNotificationAnimation(notification.type)} transition-colors`}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className={`p-1 rounded-lg shrink-0 ${getNotificationColor(notification.type)}`}>
                    <ShoppingBag size={12} />
                  </div>
                  <div className="min-w-0 overflow-hidden">
                    <div className="text-white text-xs font-medium truncate">{notification.platform}</div>
                    <div className="text-gray-400 text-xs truncate">{notification.message}</div>
                  </div>
                </div>
                <div className="text-gray-400 text-xs flex items-center gap-1 shrink-0 ml-1.5">
                  <Clock size={10} />
                  <span>{notification.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallList;
