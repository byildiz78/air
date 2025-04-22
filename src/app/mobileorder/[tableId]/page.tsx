'use client';

import React from 'react';
import MobileOrderPage from '../../../components/mobileorder/MobileOrderPage';

export default function TableOrder({ params }: { params: { tableId: string } }) {
  return <MobileOrderPage tableId={params.tableId} />;
}
