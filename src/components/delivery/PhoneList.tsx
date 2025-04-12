import React from 'react';
import { Phone, Plus, Trash2 } from 'lucide-react';

const PhoneList: React.FC = () => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white"
            placeholder="Telefon numarası..."
          />
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <button className="p-2 bg-red-600/80 hover:bg-red-700/80 text-white rounded-lg">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default PhoneList;
