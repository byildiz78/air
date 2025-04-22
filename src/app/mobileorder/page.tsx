'use client';

import React, { useState, useEffect } from 'react';
import MobileTableSelection from '../../components/mobileorder/MobileTableSelection';
import PageTransition from '../../components/mobileorder/PageTransition';

export default function MobileOrderPage() {
  const [location, setLocation] = useState('tables');

  // Listen for route changes to update the location state
  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname;
      if (path === '/mobileorder') {
        setLocation('tables');
      } else if (path.startsWith('/mobileorder/')) {
        setLocation('order');
      }
    };

    // Initialize on mount
    handleRouteChange();

    // Add event listener for route changes
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <PageTransition location={location}>
      <div className="flex-1 overflow-auto">
        <MobileTableSelection />
      </div>
    </PageTransition>
  );
}
