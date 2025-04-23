'use client';

import React, { useState } from 'react';

interface SmsTabProps {
  focusedInput: string | null;
  setFocusedInput: React.Dispatch<React.SetStateAction<string | null>>;
  showKeyboard: boolean;
  setShowKeyboard: React.Dispatch<React.SetStateAction<boolean>>;
}

const SmsTab: React.FC<SmsTabProps> = ({
  focusedInput,
  setFocusedInput,
  showKeyboard,
  setShowKeyboard
}) => {
  const [smsNotification, setSmsNotification] = useState(false);
  const [smsMessage, setSmsMessage] = useState('');

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSmsNotification(e.target.checked);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSmsMessage(e.target.value);
    setFocusedInput('smsMessage');
    setShowKeyboard(true);
  };

  const handleTextareaFocus = () => {
    setFocusedInput('smsMessage');
    setShowKeyboard(true);
  };

  return (
    <div className="p-0.5 h-full overflow-auto">
      <div className="bg-white rounded-md shadow-sm h-full flex flex-col">
        <div className="bg-purple-500 text-white py-1 px-2 rounded-t-md">
          <h2 className="font-bold text-xs">SMS Bildirimleri</h2>
        </div>
        
        <div className="p-2">
          <div className="mb-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={smsNotification}
                onChange={handleCheckboxChange}
                className="mr-2 h-4 w-4"
              />
              <span className="text-xs text-gray-700">Sipariş Sonrası SMS ile Bildirim Aktif</span>
            </label>
          </div>
          
          <div>
            <label className="text-xs text-gray-600 block mb-1">SMS Mesajı</label>
            <textarea 
              value={smsMessage}
              onChange={handleTextareaChange}
              onFocus={handleTextareaFocus}
              className="w-full border border-gray-200 rounded-md p-2 text-xs h-40 resize-none"
              placeholder="SMS metni girin..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmsTab;
