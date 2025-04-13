import React from 'react';
import { Coffee, Clock } from 'lucide-react';

interface OccupancyStatsProps {
  occupiedTables: number;
  totalTables: number;
  occupiedSeats: number;
  totalSeats: number;
}

const OccupancyStats: React.FC<OccupancyStatsProps> = ({ 
  occupiedTables, 
  totalTables, 
  occupiedSeats, 
  totalSeats 
}) => {
  const calculateOccupancyRate = (occupied: number, total: number) => {
    return total > 0 ? Math.round((occupied / total) * 100) : 0;
  };

  const tableOccupancyRate = calculateOccupancyRate(occupiedTables, totalTables);

  // Determine status colors based on occupancy rates
  const getStatusColor = (rate: number) => {
    if (rate < 30) return 'text-green-400';
    if (rate < 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStatusBg = (rate: number) => {
    if (rate < 30) return 'bg-green-400';
    if (rate < 70) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  // Calculate average seating time (example data)
  const averageSeatingTime = 45; // minutes
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}s ${mins}d` : `${mins}d`;
  };

  return (
    <div className="grid grid-cols-1 gap-1">
      {/* Table Occupancy Card */}
      <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded p-1.5 border border-blue-500/20">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1">
            <div className="p-0.5 bg-blue-500/20 rounded">
              <Coffee size={12} className="text-blue-400" />
            </div>
            <span className="text-[10px] text-gray-300">Masalar</span>
          </div>
          <span className={`text-[10px] font-bold ${getStatusColor(tableOccupancyRate)}`}>
            {tableOccupancyRate}%
          </span>
        </div>
        
        <div className="h-0.5 bg-gray-700/50 rounded-full overflow-hidden mb-1">
          <div 
            className={`h-full ${getStatusBg(tableOccupancyRate)} transition-all duration-500`}
            style={{ width: `${tableOccupancyRate}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-[8px]">
          <span className="text-gray-400">D:{occupiedTables}</span>
          <span className="text-gray-400">B:{totalTables - occupiedTables}</span>
        </div>
      </div>

      {/* Average Seating Time */}
      <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded p-1.5 border border-green-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="p-0.5 bg-green-500/20 rounded">
              <Clock size={12} className="text-green-400" />
            </div>
            <span className="text-[10px] text-gray-300">Süre</span>
          </div>
          <span className="text-[10px] font-bold text-white">
            {formatTime(averageSeatingTime)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OccupancyStats;