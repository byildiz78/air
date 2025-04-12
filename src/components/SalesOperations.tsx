'use client';

import React from 'react';
import { Grid, Box, Clipboard, Package } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SalesOperations: React.FC = () => {
  const router = useRouter();

  return (
    <div className="glass-darker h-full rounded-lg p-4 shadow-xl">
      <h2 className="text-xl font-bold text-white mb-4">Satış İşlemleri</h2>
      <div className="grid grid-cols-2 gap-4">
        <Link href="/table-layout" className="btn-blue flex flex-col items-center justify-center text-white p-4 rounded-lg">
          <Grid size={32} className="mb-2" />
          <span className="text-sm">Masa Modu</span>
        </Link>
        <Link href="/takeaway" className="btn-blue flex flex-col items-center justify-center text-white p-4 rounded-lg">
          <Box size={32} className="mb-2" />
          <span className="text-sm">Al Götür</span>
        </Link>
        <button className="btn-blue flex flex-col items-center justify-center text-white p-4 rounded-lg">
          <Clipboard size={32} className="mb-2" />
          <span className="text-sm">Tezgah Satış</span>
        </button>
        <Link 
          href="/delivery-customer"
          className="btn-blue flex flex-col items-center justify-center text-white p-4 rounded-lg"
        >
          <Package size={32} className="mb-2" />
          <span className="text-sm">Paket Satış</span>
        </Link>
      </div>
    </div>
  );
};

export default SalesOperations;
