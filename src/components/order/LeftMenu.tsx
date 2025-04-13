import React from 'react';
import { X } from 'lucide-react';
import { Category } from '../../types';
import PageNavigation from '../PageNavigation';
import CategoryList from '../CategoryList';

interface LeftMenuProps {
  currentPage: number;
  currentCategories: Category[];
  selectedCategory: Category;
  onPageChange: (page: number) => void;
  onCategorySelect: (category: Category) => void;
  onCancel: () => void;
}

const LeftMenu: React.FC<LeftMenuProps> = ({
  currentPage,
  currentCategories,
  selectedCategory,
  onPageChange,
  onCategorySelect,
  onCancel,
}) => {
  return (
    <div className="w-[20%] bg-gray-900/90 border-r border-gray-800 flex flex-col">
      <PageNavigation currentPage={currentPage} onPageChange={onPageChange} />
      
      <CategoryList
        categories={currentCategories}
        selectedCategory={selectedCategory}
        onCategorySelect={onCategorySelect}
      />

      <div className="p-2 border-t border-gray-800">
        <button
          onClick={onCancel}
          className="w-full h-8 bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center justify-center text-xs"
        >
          <X size={14} className="mr-1" />
          İptal
        </button>
      </div>
    </div>
  );
};

export default LeftMenu;