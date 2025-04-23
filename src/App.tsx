import React from 'react';
import Footer from './components/Footer';
import { usePathname } from 'next/navigation';

const App: React.FC = () => {
  const pathname = usePathname();
  
  // Check if we're in backoffice or kitchen display based on the URL path
  const isBackoffice = pathname?.startsWith('/backoffice');
  const isKitchenDisplay = pathname?.startsWith('/kitchen-display');
  const isMobileOrder = pathname?.startsWith('/mobileorder');
  const isDeliveryStatus = pathname?.startsWith('/delivery-status');
  
  // Don't render the footer in backoffice or kitchen display
  const showFooter = !isBackoffice && !isKitchenDisplay && !isMobileOrder && !isDeliveryStatus;
  
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Next.js handles routing through the pages directory */}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default App;
