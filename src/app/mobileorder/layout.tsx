'use client';

import React from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function MobileOrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} min-h-screen bg-gray-100`}>
      <div className="max-w-md mx-auto bg-white shadow-md min-h-screen">
        {children}
      </div>
    </div>
  );
}
