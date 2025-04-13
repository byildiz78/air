import React from 'react';
import { Save, X } from 'lucide-react';
import BackofficeFooter from '../BackofficeFooter';

interface SettingsActionButtonsProps {
  onCancel: () => void;
  onSave: () => void;
}

const SettingsActionButtons: React.FC<SettingsActionButtonsProps> = ({
  onCancel,
  onSave,
}) => {
  return (
    <BackofficeFooter>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center shadow-sm"
        >
          <X size={18} className="mr-2" />
          İPTAL
        </button>
        <button
          type="button"
          onClick={onSave}
          className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center shadow-sm"
        >
          <Save size={18} className="mr-2" />
          KAYDET VE KAPAT
        </button>
      </div>
    </BackofficeFooter>
  );
};

export default SettingsActionButtons;