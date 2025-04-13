'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Receipt, Home, Palmtree, Warehouse } from 'lucide-react';
import TableComponent from '../TableComponent';
import OccupancyStats from '../OccupancyStats';
import { TableShape, TableSize, TableStatus, Section, TableData } from '@/types';

const sections: Section[] = [
  {
    id: 'garden',
    name: 'Bahçe',
    icon: Palmtree,
    tables: Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      number: `B${i + 1}`,
      seats: Math.random() > 0.5 ? 4 : 6,
      status: Math.random() > 0.6 ? 'occupied' : 'empty' as TableStatus,
      shape: Math.random() > 0.5 ? 'round' : 'square' as TableShape,
      size: (['small', 'medium', 'large'] as TableSize[])[Math.floor(Math.random() * 3)],
      position: {
        x: 50 + Math.cos(i * (2 * Math.PI / 15)) * 30,
        y: 50 + Math.sin(i * (2 * Math.PI / 15)) * 30,
        rotation: i * (360 / 15)
      },
      occupiedInfo: Math.random() > 0.6 ? {
        waiter: ['Ahmet', 'Mehmet', 'Ayşe', 'Fatma'][Math.floor(Math.random() * 4)],
        occupiedTime: Math.floor(Math.random() * 180),
        currentGuests: Math.floor(Math.random() * 4) + 1,
      } : undefined,
    })),
  },
  {
    id: 'salon',
    name: 'Salon',
    icon: Home,
    tables: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      number: `S${i + 1}`,
      seats: Math.random() > 0.5 ? 4 : 6,
      status: Math.random() > 0.6 ? 'occupied' : 'empty' as TableStatus,
      shape: Math.random() > 0.5 ? 'rectangle' : 'square' as TableShape,
      size: (['small', 'medium', 'large'] as TableSize[])[Math.floor(Math.random() * 3)],
      position: {
        x: 25 + (i % 5) * 20,
        y: 25 + Math.floor(i / 5) * 20,
        rotation: 0
      },
      occupiedInfo: Math.random() > 0.6 ? {
        waiter: ['Ahmet', 'Mehmet', 'Ayşe', 'Fatma'][Math.floor(Math.random() * 4)],
        occupiedTime: Math.floor(Math.random() * 180),
        currentGuests: Math.floor(Math.random() * 4) + 1,
      } : undefined,
    })),
  },
  {
    id: 'basement',
    name: 'Alt Kat',
    icon: Warehouse,
    tables: Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      number: `A${i + 1}`,
      seats: Math.random() > 0.5 ? 4 : 6,
      status: Math.random() > 0.6 ? 'occupied' : 'empty' as TableStatus,
      shape: 'oval' as TableShape,
      size: (['small', 'medium', 'large'] as TableSize[])[Math.floor(Math.random() * 3)],
      position: {
        x: 30 + (i % 4) * 25,
        y: 30 + Math.floor(i / 4) * 25,
        rotation: 0
      },
      occupiedInfo: Math.random() > 0.6 ? {
        waiter: ['Ahmet', 'Mehmet', 'Ayşe', 'Fatma'][Math.floor(Math.random() * 4)],
        occupiedTime: Math.floor(Math.random() * 180),
        currentGuests: Math.floor(Math.random() * 4) + 1,
      } : undefined,
    })),
  },
];

const TableLayoutPage: React.FC = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const currentSection = sections.find(s => s.id === activeSection) || sections[0];

  const handleTableClick = (tableNumber: string) => {
    router.push(`/order/${tableNumber}`);
  };

  // Calculate section and restaurant stats
  const calculateStats = (tables: TableData[]) => {
    return {
      totalTables: tables.length,
      occupiedTables: tables.filter(t => t.status === 'occupied').length,
      totalSeats: tables.reduce((sum, t) => sum + t.seats, 0),
      occupiedSeats: tables.filter(t => t.status === 'occupied')
        .reduce((sum, t) => sum + (t.occupiedInfo?.currentGuests || 0), 0),
    };
  };

  const sectionStats = calculateStats(currentSection.tables);
  const allTables = sections.flatMap(s => s.tables);
  const restaurantStats = calculateStats(allTables);

  return (
    <div className="min-h-screen bg-gray-900/70">
      <div className="flex h-screen">
        {/* Main Content */}
        <div className="flex-1 p-8 overflow-auto">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white">RobotPOS</h1>
          </div>

          {/* Tables Grid */}
          <div className="relative w-full h-[600px] bg-gray-800/50 rounded-xl p-8">
            {currentSection.id === 'garden' ? (
              <div className="relative w-full h-full">
                {currentSection.tables.map(table => (
                  <div
                    key={table.id}
                    style={{
                      position: 'absolute',
                      left: `${table.position.x}%`,
                      top: `${table.position.y}%`,
                      transform: `translate(-50%, -50%) rotate(${table.position.rotation}deg)`,
                    }}
                  >
                    <TableComponent
                      table={table}
                      onClick={handleTableClick}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-5 gap-4">
                {currentSection.tables.map(table => (
                  <div key={table.id} className="flex justify-center">
                    <TableComponent
                      table={table}
                      onClick={handleTableClick}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-96 bg-gray-900/90 border-l border-gray-800 overflow-auto">
          <div className="p-6 space-y-8">
            {/* Section Navigation */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold mb-4 px-2">Bölümler</h3>
              <div className="space-y-3">
                {sections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                      activeSection === section.id
                        ? 'bg-blue-600/90 text-white'
                        : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                    }`}
                  >
                    <section.icon className="h-5 w-5" />
                    <span>{section.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <OccupancyStats
              sectionStats={sectionStats}
              restaurantStats={restaurantStats}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableLayoutPage;
