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
      <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
        <div className="p-1">
          <div className="mb-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={smsNotification}
                onChange={handleCheckboxChange}
                className="mr-1 h-3 w-3"
              />
              <span className="text-[10px] text-gray-700">SİPARİŞ SONRASI SMS İLE BİLDİRİM AKTİF</span>
            </label>
          </div>
          
          <div>
            <label className="text-[10px] text-gray-500 block mb-0.5">SMS MESAJI</label>
            <textarea 
              value={smsMessage}
              onChange={handleTextareaChange}
              onFocus={handleTextareaFocus}
              className="w-full border border-gray-300 rounded p-1 text-[10px] h-40 resize-none"
              placeholder="SMS metni girin..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmsTab;
