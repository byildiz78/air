import React from 'react';
import { Bell, User, Settings } from 'lucide-react';

const BackofficeHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">Backoffice</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none">
              <span className="sr-only">Bildirimler</span>
              <Bell className="h-6 w-6" />
            </button>

            {/* Settings */}
            <button className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none">
              <span className="sr-only">Ayarlar</span>
              <Settings className="h-6 w-6" />
            </button>

            {/* Profile dropdown */}
            <div className="relative">
              <button className="flex items-center space-x-3 focus:outline-none">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <span className="text-sm font-medium text-gray-700">Admin</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BackofficeHeader;