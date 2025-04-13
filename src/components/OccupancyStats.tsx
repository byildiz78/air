import React from 'react';
import { Coffee, Clock } from 'lucide-react';

interface Stats {
  totalTables: number;
  occupiedTables: number;
  totalSeats: number;
  occupiedSeats: number;
}

interface OccupancyStatsProps {
  sectionStats: Stats;
  restaurantStats: Stats;
}

const OccupancyStats: React.FC<OccupancyStatsProps> = ({ 
  sectionStats,
  restaurantStats
}) => {
  const calculateOccupancyRate = (occupied: number, total: number) => {
    return total > 0 ? Math.round((occupied / total) * 100) : 0;
  };

  const tableOccupancyRate = calculateOccupancyRate(sectionStats.occupiedTables, sectionStats.totalTables);
  const restaurantOccupancyRate = calculateOccupancyRate(restaurantStats.occupiedTables, restaurantStats.totalTables);

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
    <div className="space-y-4">
      {/* Section Stats */}
      <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg p-4 border border-blue-500/20">
        <h3 className="text-sm font-medium text-gray-300 mb-3">Bölüm Doluluk</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-2xl font-semibold text-white">
              {tableOccupancyRate}%
            </div>
            <div className="text-sm text-gray-400">
              {sectionStats.occupiedTables} / {sectionStats.totalTables} Masa
            </div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-white">
              {calculateOccupancyRate(sectionStats.occupiedSeats, sectionStats.totalSeats)}%
            </div>
            <div className="text-sm text-gray-400">
              {sectionStats.occupiedSeats} / {sectionStats.totalSeats} Kişi
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Stats */}
      <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 rounded-lg p-4 border border-emerald-500/20">
        <h3 className="text-sm font-medium text-gray-300 mb-3">Restoran Doluluk</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-2xl font-semibold text-white">
              {restaurantOccupancyRate}%
            </div>
            <div className="text-sm text-gray-400">
              {restaurantStats.occupiedTables} / {restaurantStats.totalTables} Masa
            </div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-white">
              {calculateOccupancyRate(restaurantStats.occupiedSeats, restaurantStats.totalSeats)}%
            </div>
            <div className="text-sm text-gray-400">
              {restaurantStats.occupiedSeats} / {restaurantStats.totalSeats} Kişi
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OccupancyStats;