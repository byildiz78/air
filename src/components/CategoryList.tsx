import React from 'react';
import { Category } from '../types';

interface CategoryListProps {
  categories: Category[];
  selectedCategory: Category;
  onCategorySelect: (category: Category) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  // Kategoriye göre renk belirleyici
  const getCategoryStyle = (category: Category, isSelected: boolean) => {
    const name = category.name.toLowerCase();
    if (name.includes('kahve') || name === 'coffee') {
      return isSelected
        ? 'bg-orange-100 text-orange-700 border-orange-400 shadow-orange-200'
        : 'bg-orange-50 text-orange-800 border-orange-200 hover:bg-orange-100 hover:border-orange-300';
    }
    if (name.includes('içecek') || name.includes('icecek') || name === 'beverages') {
      return isSelected
        ? 'bg-teal-100 text-teal-700 border-teal-400 shadow-teal-200'
        : 'bg-teal-50 text-teal-800 border-teal-200 hover:bg-teal-100 hover:border-teal-300';
    }
    if (name.includes('tatlı') || name.includes('tatli') || name === 'dessert') {
      return isSelected
        ? 'bg-pink-100 text-pink-700 border-pink-400 shadow-pink-200'
        : 'bg-pink-50 text-pink-800 border-pink-200 hover:bg-pink-100 hover:border-pink-300';
    }
    if (name.includes('ana') || name.includes('main') || name === 'pizza') {
      return isSelected
        ? 'bg-red-100 text-red-700 border-red-400 shadow-red-200'
        : 'bg-red-50 text-red-800 border-red-200 hover:bg-red-100 hover:border-red-300';
    }
    if (name.includes('salata') || name === 'salad') {
      return isSelected
        ? 'bg-green-100 text-green-700 border-green-400 shadow-green-200'
        : 'bg-green-50 text-green-800 border-green-200 hover:bg-green-100 hover:border-green-300';
    }
    return isSelected
      ? 'bg-indigo-100 text-indigo-700 border-indigo-400 shadow-indigo-200'
      : 'bg-indigo-50 text-indigo-800 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300';
  };

  return (
    <div className="h-full overflow-y-auto">
      {/* Çok minimal ve satır içi kategori seçiniz ibaresi */}
      <div className="flex items-center justify-center py-0.5">
        <span className="flex items-center gap-1 text-gray-300 text-xs font-medium">
          <span className="w-3 h-3 flex items-center justify-center"><span className="text-[11px]"></span></span>
          
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 p-2">
        {categories.map(category => {
          const isSelected = selectedCategory.id === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category)}
              className={`
                group relative h-20 min-h-[80px] rounded-xl border-2 font-bold text-base flex items-center justify-center transition-all duration-300
                ${getCategoryStyle(category, isSelected)}
                ${isSelected ? 'scale-[1.03] shadow-lg' : ''}
              `}
              style={{letterSpacing: '0.02em'}}
            >
              <span className={`w-full text-center break-words leading-tight ${isSelected ? 'font-extrabold' : ''}`}>{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;