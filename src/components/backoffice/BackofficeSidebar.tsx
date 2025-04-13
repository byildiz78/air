import React from 'react';
import { Package } from 'lucide-react';

interface SidebarItem {
  title: string;
  icon: React.ElementType;
  href: string;
}

interface BackofficeSidebarProps {
  items: SidebarItem[];
}

const BackofficeSidebar: React.FC<BackofficeSidebarProps> = ({ items }) => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg group"
              >
                <Icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                {item.title}
              </a>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};

export default BackofficeSidebar;
