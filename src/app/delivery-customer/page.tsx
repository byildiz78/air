'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Keyboard, User, History, Star, FileText, MessageSquare, Send } from 'lucide-react';
import TouchKeyboard from '@/components/TouchKeyboard';

// Import tab components
import CustomerInfoTab from '@/components/delivery/CustomerInfoTab';
import PreviousOrdersTab from '@/components/delivery/PreviousOrdersTab';
import RegularCustomerTab from '@/components/delivery/RegularCustomerTab';
import InvoiceInfoTab from '@/components/delivery/InvoiceInfoTab';
import InteractionTab from '@/components/delivery/InteractionTab';
import SmsTab from '@/components/delivery/SmsTab';
import CustomerAnalysis from '@/components/delivery/CustomerAnalysis';

const DeliveryCustomerPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('MÜŞTERİ BİLGİLERİ');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});

  const tabs = [
    { id: 'MÜŞTERİ BİLGİLERİ', icon: User, color: 'blue' },
    { id: 'ÖNCEKİ SİPARİŞLER', icon: History, color: 'purple' },
    { id: 'SÜREKLİ MÜŞTERİ', icon: Star, color: 'yellow' },
    { id: 'FATURA BİLGİLERİ', icon: FileText, color: 'orange' },
    { id: 'ETKİLEŞİM', icon: MessageSquare, color: 'green' },
    { id: 'SMS', icon: Send, color: 'red' }
  ];

  // Klavye input handler
  const handleKeyboardInput = (value: string) => {
    if (!focusedInput) return;

    setInputValues(prev => {
      const currentValue = prev[focusedInput] || '';
      
      if (value === 'backspace') {
        return {
          ...prev,
          [focusedInput]: currentValue.slice(0, -1)
        };
      }
      
      if (value === 'capslock') {
        return {
          ...prev,
          [focusedInput]: currentValue.split('').map(char => 
            char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
          ).join('')
        };
      }

      return {
        ...prev,
        [focusedInput]: currentValue + value
      };
    });
  };

  // Backspace handler
  const handleBackspace = () => {
    if (!focusedInput) return;

    setInputValues(prev => ({
      ...prev,
      [focusedInput]: (prev[focusedInput] || '').slice(0, -1)
    }));
  };

  // Custom setShowKeyboard function that prevents automatic keyboard display
  const customSetShowKeyboard = (value: boolean | ((prevState: boolean) => boolean)) => {
    // Only allow keyboard to be shown through the explicit button click
    // This effectively disables automatic keyboard display on input focus
    if (typeof value === 'function') {
      // Ignore functional updates from components
      return;
    } else if (value === false) {
      // Always allow hiding the keyboard
      setShowKeyboard(false);
    }
    // Ignore requests to show keyboard from components
  };

  // Render active tab content
  const renderTabContent = () => {
    const commonProps = {
      inputValues,
      setInputValues,
      focusedInput,
      setFocusedInput,
      showKeyboard,
      setShowKeyboard: customSetShowKeyboard // Use the custom function
    };

    switch (activeTab) {
      case 'MÜŞTERİ BİLGİLERİ':
        return <CustomerInfoTab {...commonProps} />;
      case 'ÖNCEKİ SİPARİŞLER':
        return <PreviousOrdersTab {...commonProps} />;
      case 'SÜREKLİ MÜŞTERİ':
        return <RegularCustomerTab {...commonProps} />;
      case 'FATURA BİLGİLERİ':
        return <InvoiceInfoTab {...commonProps} />;
      case 'ETKİLEŞİM':
        return <InteractionTab {...commonProps} />;
      case 'SMS':
        return <SmsTab {...commonProps} />;
      default:
        return <CustomerInfoTab {...commonProps} />;
    }
  };

  // Get the color for the active tab indicator
  const getActiveTabColor = () => {
    const activeTabObj = tabs.find(tab => tab.id === activeTab);
    return activeTabObj ? activeTabObj.color : 'blue';
  };

  // Get color class based on color name
  const getColorClass = (color: string, type: 'bg' | 'text' | 'border') => {
    const colorMap: Record<string, Record<string, string>> = {
      blue: { bg: 'bg-blue-500', text: 'text-blue-400', border: 'border-blue-500' },
      purple: { bg: 'bg-purple-500', text: 'text-purple-400', border: 'border-purple-500' },
      yellow: { bg: 'bg-yellow-500', text: 'text-yellow-400', border: 'border-yellow-500' },
      orange: { bg: 'bg-orange-500', text: 'text-orange-400', border: 'border-orange-500' },
      green: { bg: 'bg-green-500', text: 'text-green-400', border: 'border-green-500' },
      red: { bg: 'bg-red-500', text: 'text-red-400', border: 'border-red-500' }
    };

    return colorMap[color]?.[type] || colorMap.blue[type];
  };

  return (
    <div className="flex flex-col min-h-screen max-h-screen overflow-hidden bg-gradient-to-br from-gray-900/70 to-gray-800/70">
      {/* Tabs */}
      <div className="flex-none bg-gray-900 shadow-md">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 py-2 transition-all duration-200 relative ${
                  isActive 
                    ? `text-white font-medium` 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <div className="flex flex-col items-center">
                  <tab.icon 
                    size={isActive ? 20 : 16} 
                    className={`mb-1 transition-all ${isActive ? getColorClass(tab.color, 'text') : ''}`} 
                  />
                  <span className="text-xs whitespace-nowrap">{tab.id}</span>
                </div>
                
                {/* Active indicator line */}
                {isActive && (
                  <div className={`absolute bottom-0 left-0 right-0 h-1 ${getColorClass(tab.color, 'bg')}`}></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content with colored border based on active tab */}
      <div 
        className={`flex-grow overflow-hidden border-t-2 ${getColorClass(getActiveTabColor(), 'border')}`} 
        style={{ height: showKeyboard ? 'calc(50vh - 70px)' : 'calc(100vh - 70px)' }}
      >
        <div className="flex h-full">
          {/* Main Form Area */}
          <div className={`${activeTab === 'MÜŞTERİ BİLGİLERİ' ? 'w-[calc(100%-200px)]' : 'w-full'} p-2 overflow-auto transition-all duration-300`}>
            {renderTabContent()}
          </div>

          {/* Analysis Panel - Only visible on MÜŞTERİ BİLGİLERİ tab */}
          {activeTab === 'MÜŞTERİ BİLGİLERİ' && (
            <CustomerAnalysis />
          )}
        </div>
      </div>
      
      {/* Keyboard Toggle Button */}
      <div className="flex-none border-t border-gray-700/50 bg-gray-900 p-1 flex justify-between items-center">
        <button 
          onClick={() => setShowKeyboard(!showKeyboard)}
          className="flex items-center gap-1 px-3 py-1.5 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors"
        >
          <Keyboard size={16} />
          <span className="text-sm">{showKeyboard ? 'KLAVYEYİ GİZLE' : 'KLAVYEYİ GÖSTER'}</span>
        </button>
        <div className="text-xs text-gray-500">1024x768 uyumlu</div>
      </div>

      {/* Keyboard */}
      {showKeyboard && (
        <div className="flex-none">
          <TouchKeyboard 
            onInput={handleKeyboardInput} 
            onBackspace={handleBackspace} 
          />
        </div>
      )}
    </div>
  );
};

export default DeliveryCustomerPage;
