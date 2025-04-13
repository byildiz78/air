import React from 'react';
import Link from 'next/link';
import { DivideIcon } from 'lucide-react';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: typeof DivideIcon;
  href: string;
  color?: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  icon: Icon,
  href,
  color
}) => {
  return (
    <Link 
      href={href}
      className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-200"
    >
      <div className="flex items-center">
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className={`h-6 w-6 ${color || 'text-blue-500'}`} />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ModuleCard;