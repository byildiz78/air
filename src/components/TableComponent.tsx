import React from 'react';
import { Users, Clock, User } from 'lucide-react';
import { TableData, TableStatus, TableShape, TableSize } from '../types';

interface TableProps {
  table: TableData;
  onClick: (tableNumber: string) => void;
}

const TableComponent: React.FC<TableProps> = ({ table, onClick }) => {
  const getStatusColor = (status: TableStatus) => {
    return status === 'occupied'
      ? 'bg-blue-900/90 border-blue-400/50 hover:bg-blue-800/90'
      : 'bg-gray-100/5 border-gray-300/20 hover:bg-gray-100/10';
  };

  const getTableShape = (shape: TableShape, size: TableSize) => {
    const baseClasses = 'transition-all duration-300 border-2';
    const sizeClasses = {
      small: 'w-20 h-20',
      medium: 'w-24 h-24',
      large: 'w-28 h-28'
    }[size];

    switch (shape) {
      case 'round':
        return `${baseClasses} ${sizeClasses} rounded-full`;
      case 'oval':
        return `${baseClasses} ${sizeClasses} rounded-full scale-x-150`;
      case 'rectangle':
        return `${baseClasses} ${sizeClasses} rounded-lg scale-x-150`;
      default:
        return `${baseClasses} ${sizeClasses} rounded-lg`;
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}s ${mins}d`;
  };

  // Calculate transform origin for better rotation
  const tableStyle = {
    transform: `translate(-50%, -50%) rotate(${table.position.rotation || 0}deg)`,
    position: 'absolute' as const,
    left: `${table.position.x}%`,
    top: `${table.position.y}%`,
    transformOrigin: 'center center',
  };

  // Keep content upright regardless of table rotation
  const contentStyle = {
    transform: `rotate(${-(table.position.rotation || 0)}deg)`,
  };

  return (
    <div
      style={tableStyle}
      onClick={() => onClick(table.number)}
      className={`
        cursor-pointer transform hover:scale-105
        ${getStatusColor(table.status)}
        ${getTableShape(table.shape, table.size)}
      `}
    >
      <div style={contentStyle} className="relative h-full flex flex-col items-center justify-center">
        {table.status === 'occupied' && table.occupiedInfo ? (
          <>
            {/* Customer Info */}
            <div className="absolute -top-1 -left-1">
              <div className="bg-blue-800/50 rounded px-1.5 py-0.5 flex items-center space-x-1">
                <Users size={12} className="text-blue-300" />
                <span className="text-white text-xs font-medium">
                  {table.occupiedInfo.currentGuests}/{table.seats}
                </span>
              </div>
            </div>

            {/* Time Info */}
            <div className="absolute -bottom-1 -right-1">
              <div className="bg-blue-800/40 rounded px-1.5 py-0.5 flex items-center space-x-1">
                <Clock size={12} className="text-blue-300" />
                <span className="text-white text-xs font-medium">
                  {formatTime(table.occupiedInfo.occupiedTime)}
                </span>
              </div>
            </div>

            {/* Table Number and Waiter */}
            <span className="text-xl font-bold text-white mb-0.5">{table.number}</span>
            <div className="bg-blue-800/30 rounded px-1.5 py-0.5 flex items-center space-x-1">
              <User size={12} className="text-blue-300" />
              <span className="text-xs font-medium text-white">{table.occupiedInfo.waiter}</span>
            </div>
          </>
        ) : (
          <>
            <span className="text-lg font-bold text-gray-400">{table.number}</span>
            <div className="text-center mt-0.5">
              <div className="flex items-center justify-center space-x-1">
                <Users size={12} className="text-gray-500" />
                <span className="text-gray-400 text-xs">{table.seats} Kişilik</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TableComponent;