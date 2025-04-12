'use client';

import dynamic from 'next/dynamic';

const TakeawayPage = dynamic(() => import('../../pages/TakeawayPage'), {
  ssr: false
});

export default function Takeaway() {
  return <TakeawayPage />;
}
