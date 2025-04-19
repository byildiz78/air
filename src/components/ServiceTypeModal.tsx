// ServiceTypeModal: Modal for selecting service type
import React from 'react';

interface ServiceTypeModalProps {
  isOpen: boolean;
  serviceTypes: string[];
  serviceType: string;
  setServiceType: (type: string) => void;
  onClose: () => void;
}

const ServiceTypeModal: React.FC<ServiceTypeModalProps> = ({
  isOpen,
  serviceTypes,
  serviceType,
  setServiceType,
  onClose,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-40 bg-black/60 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl p-4 min-w-[260px] flex flex-col items-center">
        <div className="text-base font-bold mb-3 text-gray-800">Sipariş tipini seçiniz</div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {serviceTypes.map(type => (
            <button
              key={type}
              className={`px-3 py-2 rounded-lg text-[13px] font-bold border-2 transition-all
                ${serviceType === type ? 'bg-blue-600 text-white border-blue-700 scale-105' : 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 hover:border-blue-400'}`}
              onClick={() => {
                setServiceType(type);
                onClose();
              }}
            >
              {type}
            </button>
          ))}
        </div>
        <button
          className="mt-1 px-6 py-2 rounded-lg bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition"
          onClick={onClose}
        >
          İPTAL
        </button>
      </div>
    </div>
  );
};

export default ServiceTypeModal;
