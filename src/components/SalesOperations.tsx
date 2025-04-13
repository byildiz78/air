'use client';

import React from 'react';
import { Grid, Box, Clipboard, Package } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SalesOperations: React.FC = () => {
  const router = useRouter();

  return (
    <div className="glass-darker rounded-lg p-3 shadow-xl flex-1 min-h-0 overflow-hidden">
      <div className="flex flex-col h-full">
        <h2 className="text-lg font-bold text-white mb-2">Satış İşlemleri</h2>
        <div className="grid grid-cols-2 gap-2 min-h-0">
          <Link href="/table-layout" className="btn-blue flex flex-col items-center justify-center text-white p-2 rounded-lg">
            <Grid size={24} className="mb-1" />
            <span className="text-xs">Masa Modu</span>
          </Link>
          <Link href="/takeaway" className="btn-blue flex flex-col items-center justify-center text-white p-2 rounded-lg">
            <Box size={24} className="mb-1" />
            <span className="text-xs">Al Götür</span>
          </Link>
          <button className="btn-blue flex flex-col items-center justify-center text-white p-2 rounded-lg">
            <Clipboard size={24} className="mb-1" />
            <span className="text-xs">Tezgah Satış</span>
          </button>
          <Link 
            href="/delivery-customer"
            className="btn-blue flex flex-col items-center justify-center text-white p-2 rounded-lg"
          >
            <Package size={24} className="mb-1" />
            <span className="text-xs">Paket Satış</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SalesOperations;
