import React from 'react';
import { Users, Percent } from 'lucide-react';

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

  return (
    <div className="space-y-3">
      <h3 className="text-white font-semibold mb-3 px-2">İstatistikler</h3>
      
      <div className="space-y-3">
        {/* Table Occupancy */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-300">
            <Users size={18} />
            <span className="text-sm">Masa Doluluk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-24 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${calculateOccupancyRate(occupiedTables, totalTables)}%` }}
              ></div>
            </div>
            <span className="text-white font-medium text-sm">
              {calculateOccupancyRate(occupiedTables, totalTables)}%
            </span>
          </div>
        </div>

        {/* Seat Occupancy */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-300">
            <Users size={18} />
            <span className="text-sm">Koltuk Doluluk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-24 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${calculateOccupancyRate(occupiedSeats, totalSeats)}%` }}
              ></div>
            </div>
            <span className="text-white font-medium text-sm">
              {calculateOccupancyRate(occupiedSeats, totalSeats)}%
            </span>
          </div>
        </div>

        {/* Current Customers */}
        <div className="text-gray-300 text-sm flex justify-between">
          <span>Mevcut Müşteri:</span>
          <span className="text-white">{occupiedSeats} / {totalSeats} kişi</span>
        </div>
        
        {/* Occupied Tables */}
        <div className="text-gray-300 text-sm flex justify-between">
          <span>Dolu Masa:</span>
          <span className="text-white">{occupiedTables} / {totalTables} masa</span>
        </div>
      </div>
    </div>
  );
};

export default OccupancyStats;
