import React from 'react';

interface PageNavigationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PageNavigation: React.FC<PageNavigationProps> = ({ currentPage, onPageChange }) => {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-white/5">
      <div className="px-4 py-2">
        <div className="grid grid-cols-2 gap-4">
          {[1, 2].map(page => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`flex items-center justify-center rounded-lg transition-colors ${
                currentPage === page
                  ? 'bg-blue-500/20 text-blue-400 font-medium'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <span className="text-sm tracking-wider uppercase">Sayfa {page}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageNavigation;
