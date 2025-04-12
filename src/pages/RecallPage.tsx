import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Receipt, Printer, ArrowLeft, Search, Filter } from 'lucide-react';
import Header from '../components/Header';

interface Order {
  id: string;
  type: 'KIOSK' | 'MASA' | 'PAKET';
  status: 'AÇIK' | 'KAPALI';
  amount: number;
  time: string;
  tableNo?: string;
}

type SearchType = 'FIS_NO' | 'CEK_NO';

const RecallPage: React.FC = () => {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<'TÜMÜ' | 'MASA' | 'PAKET' | 'TEZGAH S' | 'AL GÖTÜR' | 'İŞLEME ÇEK'>('TÜMÜ');
  const [searchType, setSearchType] = useState<SearchType>('FIS_NO');
  const [searchValue, setSearchValue] = useState('');
  const [numpadValue, setNumpadValue] = useState('');

  // Örnek veri
  const orders: Order[] = [
    { id: 'F:(2) #12583', type: 'KIOSK', status: 'AÇIK', amount: 210.00, time: '18-12-2024 14:27:12', tableNo: 'KIOSK (Tablet)' },
    { id: 'F:(1) #12582', type: 'KIOSK', status: 'AÇIK', amount: 180.00, time: '18-12-2024 12:00:16', tableNo: 'KIOSK (Tablet)' },
  ];

  const handleNumpadClick = (value: number) => {
    setNumpadValue(prev => prev + value.toString());
  };

  const handleSearch = () => {
    setSearchValue(numpadValue);
    setNumpadValue('');
  };

  const handleClear = () => {
    setNumpadValue('');
  };

  const filteredOrders = orders.filter(order => {
    if (selectedFilter !== 'TÜMÜ' && order.type !== selectedFilter) return false;
    if (searchValue && !order.id.toLowerCase().includes(searchValue.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-900/70">
      <Header title="Çağır" />

      <div className="flex flex-1">
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6">
            {['TÜMÜ', 'MASA', 'PAKET', 'TEZGAH S', 'AL GÖTÜR', 'İŞLEME ÇEK'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter as any)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedFilter === filter
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Orders List */}
          <div className="space-y-3">
            {filteredOrders.map((order) => (
              <button
                key={order.id}
                className="w-full text-left bg-gray-800/50 rounded-xl border border-gray-700/50 p-4 flex items-center justify-between group hover:bg-gray-800/70 transition-colors hover:border-blue-500/50"
                onClick={() => {/* Handle order selection */}}
              >
                <div className="flex items-center gap-6">
                  <div className="bg-blue-500/20 p-3 rounded-lg">
                    <Receipt size={24} className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">{order.id}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-400">{order.tableNo}</span>
                      <span className="text-gray-400">{order.time}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'AÇIK' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold text-white">{order.amount.toFixed(2)} TL</span>
                  <button 
                    className="p-2 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle print
                    }}
                  >
                    <Printer size={20} />
                  </button>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel - Numpad */}
        <div className="w-96 bg-gray-900/90 border-l border-gray-700 p-6">
          {/* Search Type Selection */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            <button
              onClick={() => setSearchType('FIS_NO')}
              className={`py-3 rounded-lg font-medium transition-colors ${
                searchType === 'FIS_NO'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Fiş No
            </button>
            <button
              onClick={() => setSearchType('CEK_NO')}
              className={`py-3 rounded-lg font-medium transition-colors ${
                searchType === 'CEK_NO'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Çek No
            </button>
          </div>

          {/* Display Input */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={numpadValue}
                readOnly
                placeholder={searchType === 'FIS_NO' ? 'Fiş No Girin' : 'Çek No Girin'}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 text-xl text-right"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <span className="text-gray-500 font-medium">
                  {searchType === 'FIS_NO' ? 'Fiş:' : 'Çek:'}
                </span>
              </div>
            </div>
          </div>

          {/* Numpad */}
          <div className="grid grid-cols-3 gap-2">
            {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
              <button
                key={num}
                onClick={() => handleNumpadClick(num)}
                className="aspect-square bg-gray-800 hover:bg-gray-700 text-white text-2xl font-semibold rounded-lg transition-colors"
              >
                {num}
              </button>
            ))}
            <button
              onClick={handleClear}
              className="aspect-square bg-red-600/80 hover:bg-red-700/80 text-white text-lg font-medium rounded-lg transition-colors"
            >
              C
            </button>
            <button
              onClick={() => handleNumpadClick(0)}
              className="aspect-square bg-gray-800 hover:bg-gray-700 text-white text-2xl font-semibold rounded-lg transition-colors"
            >
              0
            </button>
            <button
              onClick={handleSearch}
              className="aspect-square bg-green-600 hover:bg-green-700 text-white text-xl font-medium rounded-lg transition-colors"
            >
              ARA
            </button>
          </div>

          <div className="mt-6">
            <button
              onClick={() => router.push('/')}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Ana Sayfaya Dön</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecallPage;
