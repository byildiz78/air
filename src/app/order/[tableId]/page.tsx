'use client';

import OrderPage from '../../../pages/OrderPage';

export default function Order({ params }: { params: { tableId: string } }) {
  return <OrderPage tableId={params.tableId} />;
}
