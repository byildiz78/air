'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Layout } from 'lucide-react';
import TableSettingsModal from '../../../../components/backoffice/tables/TableSettingsModal';

interface Table {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isDragging: boolean;
  startX?: number;
  startY?: number;
  shape: 'round' | 'square' | 'rectangle';
  size: 'small' | 'medium' | 'large';
}

export default function TableDefinitionsPage() {
  const [tables, setTables] = useState<Table[]>([]);
  const [tableCount, setTableCount] = useState(18);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [selectedTableForSettings, setSelectedTableForSettings] = useState<string | null>(null);

  const getTableDimensions = (size: 'small' | 'medium' | 'large', shape: 'round' | 'square' | 'rectangle') => {
    const baseSize = {
      small: { width: 80, height: 80 },
      medium: { width: 120, height: 120 },
      large: { width: 160, height: 160 }
    }[size];

    if (shape === 'rectangle') {
      return {
        width: baseSize.width * 1.5,
        height: baseSize.height
      };
    }

    return baseSize;
  };

  useEffect(() => {
    // Initialize tables in a grid layout
    const newTables: Table[] = [];
    const containerWidth = containerRef.current?.clientWidth || 1000;
    const containerHeight = containerRef.current?.clientHeight || 800;
    
    const cols = Math.ceil(Math.sqrt(tableCount));
    const cellWidth = containerWidth / cols;
    const cellHeight = 100;
    
    for (let i = 0; i < tableCount; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const dimensions = getTableDimensions('medium', 'square');
      
      newTables.push({
        id: `S${i + 1}`,
        x: col * cellWidth + 20,
        y: row * cellHeight + 20,
        width: dimensions.width,
        height: dimensions.height,
        isDragging: false,
        shape: 'square',
        size: 'medium'
      });
    }
    
    setTables(newTables);
  }, [tableCount]);

  const handleMouseDown = (e: React.MouseEvent, tableId: string) => {
    if (e.button === 2) { // Right mouse button
      e.preventDefault();
      const table = tables.find(t => t.id === tableId);
      if (table) {
        setTables(prev => prev.map(t => ({
          ...t,
          isDragging: t.id === tableId,
          startX: e.clientX - t.x,
          startY: e.clientY - t.y
        })));
        setSelectedTable(tableId);
      }
    } else if (e.button === 0) { // Left mouse button
      const table = tables.find(t => t.id === tableId);
      if (table) {
        setSelectedTableForSettings(tableId);
        setIsSettingsModalOpen(true);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (selectedTable) {
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (containerRect) {
        setTables(prev => prev.map(table => {
          if (table.id === selectedTable && table.startX !== undefined && table.startY !== undefined) {
            let newX = e.clientX - table.startX;
            let newY = e.clientY - table.startY;

            // Keep table within container bounds
            newX = Math.max(0, Math.min(newX, containerRect.width - table.width));
            newY = Math.max(0, Math.min(newY, containerRect.height - table.height));

            return {
              ...table,
              x: newX,
              y: newY
            };
          }
          return table;
        }));
      }
    }
  };

  const handleMouseUp = () => {
    setSelectedTable(null);
    setTables(prev => prev.map(t => ({ ...t, isDragging: false })));
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleTableSettingsSave = (settings: any) => {
    const dimensions = getTableDimensions(settings.size, settings.shape);
    setTables(prev => prev.map(table => 
      table.id === settings.id
        ? {
            ...table,
            shape: settings.shape,
            size: settings.size,
            width: dimensions.width,
            height: dimensions.height
          }
        : table
    ));
    setIsSettingsModalOpen(false);
  };

  const getTableStyle = (table: Table): React.CSSProperties => {
    let width = table.width;
    let height = table.height;
    let borderRadius = '12px';

    // Adjust dimensions and shape based on table type
    if (table.shape === 'round') {
      borderRadius = '50%';
    } else if (table.shape === 'rectangle') {
      width = table.width * 1.5;
    }

    return {
      position: 'absolute',
      left: table.x,
      top: table.y,
      width,
      height,
      cursor: table.isDragging ? 'grabbing' : 'grab',
      transition: table.isDragging ? 'none' : 'all 0.2s ease',
      zIndex: table.isDragging ? 100 : 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#EBF5FF',
      border: '2px solid #93C5FD',
      borderRadius,
      boxShadow: table.isDragging 
        ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      transform: table.isDragging ? 'scale(1.05)' : 'scale(1)'
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Layout size={24} className="text-blue-500" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">Masa Yerleşimi</h1>
          </div>

          <div className="flex items-center gap-4">
            <select
              value={tableCount}
              onChange={(e) => setTableCount(parseInt(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="9">9 MASA</option>
              <option value="18">18 MASA</option>
              <option value="24">24 MASA</option>
              <option value="36">36 MASA</option>
              <option value="48">48 MASA</option>
              <option value="72">72 MASA</option>
              <option value="108">108 MASA</option>
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>SALON</option>
              <option>BAHÇE</option>
              <option>TERAS</option>
            </select>
          </div>
        </div>

        {/* Table Layout Area */}
        <div
          ref={containerRef}
          className="relative w-full h-[600px] border-2 border-gray-200 rounded-lg bg-gray-50 overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onContextMenu={handleContextMenu}
        >
          {tables.map((table) => (
            <div
              key={table.id}
              onMouseDown={(e) => handleMouseDown(e, table.id)}
              style={getTableStyle(table)}
              className="hover:shadow-xl"
            >
              <span className="text-2xl font-semibold text-blue-900">{table.id}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-6">
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            KAYDET
          </button>
        </div>
      </div>

      {/* Settings Modal */}
      {selectedTableForSettings && (
        <TableSettingsModal
          isOpen={isSettingsModalOpen}
          onClose={() => setIsSettingsModalOpen(false)}
          tableId={selectedTableForSettings}
          onSave={handleTableSettingsSave}
          initialShape={tables.find(t => t.id === selectedTableForSettings)?.shape || 'square'}
          initialSize={tables.find(t => t.id === selectedTableForSettings)?.size || 'medium'}
        />
      )}
    </div>
  );
}