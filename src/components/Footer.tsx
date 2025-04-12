import React from 'react';
import { User, Terminal, Code, Settings } from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900/95 to-gray-800/95 border-t border-gray-700/50 backdrop-blur-md">
      <div className="container mx-auto px-8 py-3 flex justify-between items-center">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Code size={16} />
            <span className="text-sm">RobotPOS Air v1.0.3</span>
          </div>
          <Link 
            href="/backoffice"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <Settings size={16} />
            <span className="text-sm">Arka Ofis</span>
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          {/* User Info */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1.5 rounded-full">
              <User size={16} className="text-blue-400" />
              <span className="text-white font-medium">Ahmet Yılmaz</span>
              <span className="text-gray-400 text-sm">(Baş Kasiyer)</span>
            </div>
          </div>

          {/* Terminal Info */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1.5 rounded-full">
              <Terminal size={16} className="text-green-400" />
              <span className="text-white font-medium">Terminal #2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;