'use client';

import React from 'react';
import { Database, Save, Trash2, Activity, Settings } from 'lucide-react';
import BackofficeHeader from '@/components/backoffice/BackofficeHeader';

export default function MaintenancePage() {
  const maintenanceActions = [
    {
      title: 'Veritabanı Versiyonunu Güncelle',
      description: 'Veritabanı şemasını son sürüme günceller',
      icon: Database,
      onClick: () => {
        // TODO: Implement database update
        console.log('Database update clicked');
      }
    },
    {
      title: 'Verileri Yedekle',
      description: 'Tüm veritabanının yedeğini alır',
      icon: Save,
      onClick: () => {
        // TODO: Implement backup
        console.log('Backup clicked');
      }
    },
    {
      title: 'Veri Sıfırlama',
      description: 'Seçili verileri sıfırlar',
      icon: Trash2,
      onClick: () => {
        // TODO: Implement data reset
        console.log('Data reset clicked');
      }
    },
    {
      title: 'Veritabanı Sağlık Testi',
      description: 'Veritabanı bütünlüğünü kontrol eder',
      icon: Activity,
      onClick: () => {
        // TODO: Implement health check
        console.log('Health check clicked');
      }
    },
    {
      title: 'Veritabanını Optimize Et',
      description: 'Veritabanı performansını optimize eder',
      icon: Settings,
      onClick: () => {
        // TODO: Implement optimization
        console.log('Optimization clicked');
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      
      <main className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Warning Message */}
          <div className="mb-8 rounded-lg bg-yellow-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Dikkat</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>Bu sayfadaki işlemler veritabanınızı etkileyebilir. İşlem yapmadan önce yedek almanız önerilir.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {maintenanceActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.onClick}
                  className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-sm transition-all"
                >
                  <div className="flex-shrink-0">
                    <Icon className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-sm font-medium text-gray-900">{action.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{action.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
