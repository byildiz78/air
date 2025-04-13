import React from 'react';
import { Bell, User, Settings, Plus, Home } from 'lucide-react';
import Link from 'next/link';

interface BackofficeHeaderProps {
  title?: string;
  onAddNew?: () => void;
  addNewText?: string;
}

const BackofficeHeader: React.FC<BackofficeHeaderProps> = ({
  title = 'Backoffice',
  onAddNew,
  addNewText
}) => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link
              href="/backoffice"
              className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
            >
              <span className="sr-only">Ana Sayfa</span>
              <Home className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {onAddNew && (
              <button
                onClick={onAddNew}
                className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Plus size={16} />
                {addNewText || 'Yeni Ekle'}
              </button>
            )}

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

            {/* Profile */}
            <button className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none">
              <span className="sr-only">Profil</span>
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BackofficeHeader;