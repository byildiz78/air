'use client';

import React, { useEffect } from 'react';

export default function KitchenDisplayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Add a custom ID to the body to identify this layout
  useEffect(() => {
    document.body.id = 'kitchen-display-layout';
    
    // Add a style tag to hide any footer and header elements
    const style = document.createElement('style');
    style.innerHTML = `
      #kitchen-display-layout footer, 
      #kitchen-display-layout .fixed.bottom-0,
      #kitchen-display-layout header,
      #kitchen-display-layout .bg-gray-900\\/90.border-b {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.body.id = '';
      // Remove the style tag when component unmounts
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return (
    <div className="kitchen-display-layout h-screen overflow-hidden">
      {children}
    </div>
  );
}
