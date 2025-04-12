import React from 'react';

interface PageNavigationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PageNavigation: React.FC<PageNavigationProps> = ({ currentPage, onPageChange }) => {
  return (
    <div className="p-4 border-b border-gray-800">
      <div className="grid grid-cols-2 gap-2">
        {[1, 2].map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`h-12 rounded-lg ${
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <span>Sayfa {page}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PageNavigation;
