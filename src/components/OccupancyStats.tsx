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

  // Ortalama oturma süresi (örnek veri)
  const averageSeatingTime = 45; // dakika
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours} sa ${mins} dk` : `${mins} dk`;
  };

  return (
    <div className="space-y-4">
      {/* Section Stats */}
      <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-md p-2 border border-blue-500/20">
        <h3 className="text-xs font-medium text-gray-300 mb-1">Bölüm Doluluk</h3>
        <div className="grid grid-cols-1 gap-2">
          <div>
            <div className="text-lg font-semibold text-white">
              {calculateOccupancyRate(sectionStats.occupiedSeats, sectionStats.totalSeats)}%
            </div>
            {/* Kişi sayısı gösterimi kaldırıldı */}
            <div className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
              <span className="font-semibold text-gray-300">Ø Oturma Süresi:</span>
              <span>{formatTime(averageSeatingTime)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Stats */}
      <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 rounded-md p-2 border border-emerald-500/20">
        <h3 className="text-xs font-medium text-gray-300 mb-1">Restoran Doluluk</h3>
        <div className="grid grid-cols-1 gap-2">
          <div>
            <div className="text-lg font-semibold text-white">
              {calculateOccupancyRate(restaurantStats.occupiedSeats, restaurantStats.totalSeats)}%
            </div>
            {/* Kişi sayısı gösterimi kaldırıldı */}
            <div className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
              <span className="font-semibold text-gray-300">Ø Oturma Süresi:</span>
              <span>{formatTime(averageSeatingTime)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OccupancyStats;