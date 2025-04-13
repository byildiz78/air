import React, { ReactNode } from 'react';

interface BackofficeFooterProps {
  children?: ReactNode;
}

const BackofficeFooter: React.FC<BackofficeFooterProps> = ({ children }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md z-50">
      <div className="container mx-auto px-4 py-2">
        {children}
      </div>
    </footer>
  );
};

export default BackofficeFooter;
