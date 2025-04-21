import React from 'react';
import { User, Terminal, Code, Settings, Clock, MonitorPlay } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer: React.FC = () => {
  const pathname = usePathname();
  
  // Check if we're in backoffice or kitchen display based on the URL path
  const isBackoffice = pathname?.startsWith('/backoffice');
  const isKitchenDisplay = pathname?.startsWith('/kitchen-display');
  
  // Don't render the footer in backoffice or kitchen display
  if (isBackoffice || isKitchenDisplay) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900/95 to-gray-800/95 border-t border-gray-700/50 backdrop-blur-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-gray-400">
            <Code size={14} />
            <span className="text-xs">v1.0.3</span>
          </div>
          <Link 
            href="/backoffice"
            className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors"
          >
            <Settings size={14} />
            <span className="text-xs">Arka Ofis</span>
          </Link>
          <Link 
            href="/zamankarti"
            className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors"
          >
            <Clock size={14} />
            <span className="text-xs">Zaman Kartı</span>
          </Link>
          <Link 
            href="/kitchen-display"
            className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors"
          >
            <MonitorPlay size={14} />
            <span className="text-xs">KDS</span>
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* User Info */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-gray-800/50 px-2 py-1 rounded-full">
              <User size={14} className="text-blue-400" />
              <span className="text-white text-xs font-medium">Ahmet Yılmaz</span>
              <span className="text-gray-400 text-xs">(Baş Kasiyer)</span>
            </div>
          </div>

          {/* Terminal Info */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-gray-800/50 px-2 py-1 rounded-full">
              <Terminal size={14} className="text-green-400" />
              <span className="text-white text-xs font-medium">Terminal #2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;