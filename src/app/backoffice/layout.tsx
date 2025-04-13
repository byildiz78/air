import React from 'react';
import BackofficeNavigation from '../../components/backoffice/BackofficeNavigation';
import BackofficeHeader from '../../components/backoffice/BackofficeHeader';

// We need to modify the Footer component directly instead of using CSS here

export default function BackofficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden" id="backoffice-layout">
      {/* Sidebar Navigation */}
      <BackofficeNavigation />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <BackofficeHeader />
        
        <main className="flex-1 overflow-auto bg-gray-100 relative">
          <div className="container mx-auto px-4 py-4 pb-20"> {/* Added padding at bottom for footer space */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}