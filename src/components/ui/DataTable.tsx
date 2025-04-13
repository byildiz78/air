import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  sortable?: boolean;
}

interface DataTableProps<T extends Record<string, any>> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
}

export function DataTable<T extends Record<string, any>>({ columns, data, onRowClick }: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sorting
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (aValue === bValue) return 0;
      
      if (sortConfig.direction === 'asc') {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });
  }, [data, sortConfig]);

  // Filtering
  const filteredData = React.useMemo(() => {
    if (!searchTerm) return sortedData;

    return sortedData.filter(item => 
      Object.entries(item).some(([key, value]) => {
        if (typeof value === 'string' || typeof value === 'number') {
          return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
      })
    );
  }, [sortedData, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (accessor: Column<T>['accessor']) => {
    if (typeof accessor === 'function') return;
    
    setSortConfig(current => {
      if (!current || current.key !== accessor) {
        return { key: accessor, direction: 'asc' };
      }
      if (current.direction === 'asc') {
        return { key: accessor, direction: 'desc' };
      }
      return null;
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Search */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Ara..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  onClick={() => column.sortable && typeof column.accessor === 'string' && handleSort(column.accessor)}
                  style={{ cursor: column.sortable && typeof column.accessor === 'string' ? 'pointer' : 'default' }}
                >
                  <div className="flex items-center gap-1">
                    {column.header}
                    {column.sortable && typeof column.accessor === 'string' && (
                      <div className="flex flex-col">
                        <ChevronUp className={`w-3 h-3 ${
                          sortConfig?.key === column.accessor && sortConfig.direction === 'asc'
                            ? 'text-blue-500'
                            : 'text-gray-400'
                        }`} />
                        <ChevronDown className={`w-3 h-3 -mt-1 ${
                          sortConfig?.key === column.accessor && sortConfig.direction === 'desc'
                            ? 'text-blue-500'
                            : 'text-gray-400'
                        }`} />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedData.map((item, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 ${onRowClick ? 'cursor-pointer' : ''}`}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {typeof column.accessor === 'function'
                      ? column.accessor(item)
                      : String(item[column.accessor])
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Toplam {filteredData.length} kayıt
        </div>
        <div className="flex gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 flex items-center justify-center rounded text-sm transition-colors ${
                currentPage === page
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
