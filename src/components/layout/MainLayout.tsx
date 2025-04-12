'use client';

import React, { useState, useEffect } from 'react';
import { Code, Terminal, User } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="h-16 shrink-0 bg-gray-900/90 border-b border-gray-800 px-6 flex items-center justify-between">
        <div className="text-2xl font-bold text-white">Infinia</div>
        <div className="text-gray-400">
          {currentTime.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 min-h-0 overflow-hidden">
        {children}
      </main>

      {/* Footer */}
      <footer className="h-14 shrink-0 bg-gray-900/90 border-t border-gray-800 px-6 flex items-center">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2 text-gray-400">
            <Code size={16} />
            <span>RobotPOS Air v1.0.3</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1.5 rounded-full">
                <User size={16} className="text-blue-400" />
                <span className="text-white font-medium">Ahmet Yılmaz</span>
                <span className="text-gray-400 text-sm">(Baş Kasiyer)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1.5 rounded-full">
                <Terminal size={16} className="text-green-400" />
                <span className="text-white font-medium">Terminal #2</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
