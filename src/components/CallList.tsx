import React from 'react';
import { Phone, Clock, User } from 'lucide-react';

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

  return (
    <div className="glass-darker h-full rounded-lg p-4 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">TÜM ARAMALAR</h2>
        <span className="px-2 py-1 bg-blue-500/20 rounded-lg text-blue-400 text-sm">
          {calls.length} arama
        </span>
      </div>
      
      <div className="space-y-3 overflow-auto h-[calc(100%-5rem)]">
        {calls.map((call, index) => (
          <div 
            key={index} 
            className="flex flex-col bg-gray-800/50 p-4 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${getStatusColor(call.status)}`}>
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-white font-medium">{call.number}</div>
                  <div className="text-gray-400 text-sm flex items-center gap-2">
                    <User size={14} />
                    <span>{call.customer}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-gray-400 text-sm">
                <Clock size={14} />
                <span>{call.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CallList;
