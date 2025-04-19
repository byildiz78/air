'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Receipt, Home, Palmtree, Warehouse, Users } from 'lucide-react';
import TableComponent from '../components/TableComponent';
import OccupancyStats from '../components/OccupancyStats';
import { Section, TableData, TableStatus, TableShape, TableSize } from '../types';

// Size configurations for collision detection
const tableSizes = {
  small: { width: 80, height: 80 },
  medium: { width: 96, height: 96 },
  large: { width: 112, height: 112 },
};

const shapes: TableShape[] = ['round', 'rectangle', 'square', 'oval'];
const sizes: TableSize[] = ['small', 'medium', 'large'];

// Check if two tables overlap using more precise collision detection
const doTablesOverlap = (table1: TableData, table2: TableData) => {
  const size1 = tableSizes[table1.size];
  const size2 = tableSizes[table2.size];
  
  // Daha küçük padding ile masaları yakınlaştır
  const padding = 48;
  
  // Calculate dimensions considering shape
  const width1 = table1.shape === 'rectangle' || table1.shape === 'oval' ? size1.width * 1.5 : size1.width;
  const width2 = table2.shape === 'rectangle' || table2.shape === 'oval' ? size2.width * 1.5 : size2.width;
  
  // Convert percentages to actual pixels
  const x1 = (table1.position.x / 100) * window.innerWidth;
  const y1 = (table1.position.y / 100) * window.innerHeight;
  const x2 = (table2.position.x / 100) * window.innerWidth;
  const y2 = (table2.position.y / 100) * window.innerHeight;

  // Calculate centers
  const center1 = {
    x: x1 + width1 / 2,
    y: y1 + size1.height / 2
  };
  const center2 = {
    x: x2 + width2 / 2,
    y: y2 + size2.height / 2
  };

  // Calculate distance between centers
  const distance = Math.sqrt(
    Math.pow(center2.x - center1.x, 2) + 
    Math.pow(center2.y - center1.y, 2)
  );

  // Minimum distance to prevent overlap
  const minDistance = Math.max(
    Math.max(width1, size1.height),
    Math.max(width2, size2.height)
  ) / 2 + padding;

  return distance < minDistance;
};

// Generate a valid position for a new table
const generateValidPosition = (existingTables: TableData[], newTable: Partial<TableData>): { x: number; y: number; rotation: number } => {
  let attempts = 0;
  const maxAttempts = 100;
  
  // Define zones for better distribution
  const zones = [
    { x: 10, y: 10, width: 35, height: 35 },
    { x: 55, y: 10, width: 35, height: 35 },
    { x: 10, y: 55, width: 35, height: 35 },
    { x: 55, y: 55, width: 35, height: 35 },
  ];
  
  while (attempts < maxAttempts) {
    // Select a random zone
    const zone = zones[Math.floor(Math.random() * zones.length)];
    
    const position = {
      x: zone.x + Math.random() * zone.width,
      y: zone.y + Math.random() * zone.height,
      // Limit rotation to reasonable angles
      rotation: Math.floor(Math.random() * 8) * 45 // 45-degree increments
    };

    const tableWithPosition = {
      ...newTable,
      position,
    } as TableData;

    const hasOverlap = existingTables.some(existingTable => 
      doTablesOverlap(existingTable, tableWithPosition)
    );

    if (!hasOverlap) {
      return position;
    }

    attempts++;
  }

  // Fallback to grid layout with slight randomization
  const gridSize = Math.ceil(Math.sqrt(existingTables.length + 1));
  const index = existingTables.length;
  const row = Math.floor(index / gridSize);
  const col = index % gridSize;
  
  return {
    x: (col / gridSize) * 70 + 15 + (Math.random() * 5),
    y: (row / gridSize) * 70 + 15 + (Math.random() * 5),
    rotation: Math.floor(Math.random() * 8) * 45
  };
};

const sectionConfigs = [
  {
    id: 'garden',
    name: 'Bahçe',
    icon: Palmtree,
    tableCount: 12,
    prefix: 'B'
  },
  {
    id: 'salon',
    name: 'Salon',
    icon: Home,
    tableCount: 14,
    prefix: 'S'
  },
  {
    id: 'basement',
    name: 'Alt Kat',
    icon: Warehouse,
    tableCount: 10,
    prefix: 'A'
  }
] as const;

const generateTableData = (count: number, prefix: string): TableData[] => {
  const tables: TableData[] = [];

  for (let i = 0; i < count; i++) {
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    
    // Adjust seats based on table size and shape
    let baseSeats = shape === 'round' ? 4 : 6;
    if (size === 'small') baseSeats -= 2;
    if (size === 'large') baseSeats += 2;
    if (shape === 'rectangle' || shape === 'oval') baseSeats += 2;

    const newTable: Partial<TableData> = {
      id: i + 1,
      number: `${prefix}${i + 1}`,
      shape,
      size,
      seats: baseSeats,
      status: (Math.random() > 0.6 ? 'occupied' : 'empty') as TableStatus,
    };

    const position = generateValidPosition(tables, newTable);
    
    tables.push({
      ...newTable,
      position,
      occupiedInfo: Math.random() > 0.6 ? {
        waiter: ['Ahmet', 'Mehmet', 'Ayşe', 'Fatma', 'Ali', 'Zeynep', 'Can', 'Elif'][Math.floor(Math.random() * 8)],
        occupiedTime: Math.floor(Math.random() * 180),
        currentGuests: Math.floor(Math.random() * (baseSeats - 1)) + 1,
      } : undefined,
    } as TableData);
  }

  return tables;
};

const TableLayoutPage: React.FC = () => {
  const router = useRouter();
  const [sections, setSections] = useState<Section[]>([]);
  const [activeSection, setActiveSection] = useState('garden');

  useEffect(() => {
    const generatedSections = sectionConfigs.map(config => ({
      ...config,
      tables: generateTableData(config.tableCount, config.prefix)
    }));
    setSections(generatedSections);
  }, []);

  const currentSection = sections.find(s => s.id === activeSection) || sections[0] || { 
    id: '', 
    name: '', 
    icon: Palmtree, 
    tables: [] 
  };

  const handleTableClick = (tableNumber: string) => {
    router.push(`/order/${tableNumber}`);
  };

  return (
    <div className="flex h-[calc(100vh-7rem)]">
      {/* Tables Area */}
      <div 
        className="flex-1 relative bg-gray-900/10 rounded-lg m-2 bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(17, 24, 39, 0.7), rgba(17, 24, 39, 0.65)), url('/images/restaurant-bg.jpg')`,
          backgroundBlendMode: 'multiply'
        }}
      >
        {/* Table Container */}
        <div className="absolute inset-0 p-4">
          {currentSection.tables?.map(table => (
            <TableComponent
              key={table.number}
              table={table}
              onClick={handleTableClick}
            />
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-48 bg-gray-900/90 border-l border-gray-800 flex flex-col">
        <div className="p-3 space-y-3 flex-1">
          {/* Section Selector */}
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-medium text-white mb-1">Bölümler</h3>
            <div className="flex flex-col gap-1">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-1.5 px-2 py-1.5 rounded transition-colors text-sm ${
                    activeSection === section.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                  }`}
                >
                  <section.icon size={14} />
                  <span>{section.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section Stats */}
          <div className="bg-gray-800/50 p-2 rounded-lg">
            <h3 className="text-sm font-medium text-white mb-2">{currentSection.name}</h3>
            <OccupancyStats
              sectionStats={{
                occupiedTables: currentSection.tables?.filter(t => t.status === 'occupied').length || 0,
                totalTables: currentSection.tables?.length || 0,
                occupiedSeats: currentSection.tables?.reduce((sum, table) => 
                  sum + (table.occupiedInfo?.currentGuests || 0), 0) || 0,
                totalSeats: currentSection.tables?.reduce((sum, table) => sum + table.seats, 0) || 0
              }}
              restaurantStats={{
                occupiedTables: sections.flatMap(s => s.tables).filter(t => t.status === 'occupied').length,
                totalTables: sections.flatMap(s => s.tables).length,
                occupiedSeats: sections.flatMap(s => s.tables).reduce((sum, table) => 
                  sum + (table.occupiedInfo?.currentGuests || 0), 0),
                totalSeats: sections.flatMap(s => s.tables).reduce((sum, table) => sum + table.seats, 0)
              }}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-3 space-y-1.5 border-t border-gray-800">
          <button
            onClick={() => router.push('/takeaway')}
            className="w-full flex items-center justify-center gap-1.5 p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            <Receipt size={16} />
            <span>Hesap Yazdır</span>
          </button>
          <button className="w-full flex items-center justify-center gap-1.5 p-2 bg-purple-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            <Calendar size={16} />
            <span>İsme Çek Açma</span>
          </button>

          <button className="w-full flex items-center justify-center gap-1.5 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            <Calendar size={16} />
            <span>Rezervasyonlar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableLayoutPage;