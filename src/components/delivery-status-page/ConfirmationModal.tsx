'use client';

import React from 'react';
import { X } from 'lucide-react';

interface ConfirmationModalProps {
  show: boolean;
  action: 'Teslim Al' | 'varis' | 'geriAl' | null;
  orderCount: number;
  onConfirm: () => void;
  onCancel: () => void;
  selectedCourierName?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  show,
  action,
  orderCount,
  onConfirm,
  onCancel,
  selectedCourierName
}) => {
  if (!show) return null;

  let title = '';
  let message = '';
  let confirmButtonText = '';
  let confirmButtonClass = '';

  if (action === 'Teslim Al') {
    title = 'Teslimat Onayı';
    message = `${orderCount} adet siparişi ${selectedCourierName || 'kurye'} için teslimata çıkarmak istediğinize emin misiniz?`;
    confirmButtonText = 'TESLİM ET';
    confirmButtonClass = 'bg-blue-600 hover:bg-blue-700';
  } else if (action === 'varis') {
    title = 'Varış Onayı';
    message = `${orderCount} adet siparişin Teslim Al edildiğini onaylıyor musunuz?`;
    confirmButtonText = 'TAMAMLA';
    confirmButtonClass = 'bg-blue-600 hover:bg-blue-700';
  } else if (action === 'geriAl') {
    title = 'Geri Alma Onayı';
    message = `${orderCount} adet siparişi geri almak ve hazır durumuna getirmek istediğinize emin misiniz?`;
    confirmButtonText = 'Geri Al';
    confirmButtonClass = 'bg-amber-600 hover:bg-amber-700';
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md overflow-hidden shadow-xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium">{title}</h3>
          <button 
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-gray-700">{message}</p>
        </div>
        
        <div className="bg-gray-50 px-4 py-3 flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium"
          >
            İptal
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 ${confirmButtonClass} text-white rounded-md text-sm font-medium`}
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
