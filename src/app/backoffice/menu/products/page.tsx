'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { ProductGrid } from '@/components/backoffice/menu/ProductGrid';
import { ProductModal } from '@/components/backoffice/menu/ProductModal';
import { MenuGroupsList } from '@/components/backoffice/menu/MenuGroupsList';
import { Plus } from 'lucide-react';

// Sample data for menu groups
const initialMenuGroups = [
  {
    id: '1',
    name: 'SICAK İÇECEKLER',
    color: '#4CAF50' // Green color
  },
  {
    id: '2',
    name: 'SOĞUK İÇECEKLER',
    color: '#9C27B0' // Purple color
  }
];

// Sample data for products
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Türk Kahvesi',
    price: 25.00,
    groupId: '1',
    groupColor: '#4CAF50',
    isActive: true,
    isCombo: false,
    isTopLevel: false,
    isOpen: false,
    securityLevel: 1
  },
  {
    id: '2',
    name: 'Filtre Kahve',
    price: 30.00,
    groupId: '1',
    groupColor: '#4CAF50',
    isActive: true,
    isCombo: false,
    isTopLevel: false,
    isOpen: false,
    securityLevel: 1
  },
  {
    id: '3',
    name: 'Espresso',
    price: 20.00,
    groupId: '1',
    groupColor: '#4CAF50',
    isActive: true,
    isCombo: false,
    isTopLevel: false,
    isOpen: false,
    securityLevel: 1
  },
  {
    id: '4',
    name: 'Limonata',
    price: 35.00,
    groupId: '2',
    groupColor: '#9C27B0',
    isActive: true,
    isCombo: false,
    isTopLevel: false,
    isOpen: false,
    securityLevel: 1
  },
  {
    id: '5',
    name: 'Portakal Suyu',
    price: 40.00,
    groupId: '2',
    groupColor: '#9C27B0',
    isActive: true,
    isCombo: false,
    isTopLevel: false,
    isOpen: false,
    securityLevel: 1
  }
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [menuGroups, setMenuGroups] = useState(initialMenuGroups);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [pages, setPages] = useState<{ id: number; products: (Product | null)[] }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [draggedItem, setDraggedItem] = useState<{ productId: string, pageId: number, index: number } | null>(null);
  const [dragOverItem, setDragOverItem] = useState<{ pageId: number, index: number } | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  // Hide footer when this component mounts
  useEffect(() => {
    // Hide footer
    const footer = document.querySelector('footer');
    if (footer) {
      footer.style.display = 'none';
    }
    
    // Restore footer when component unmounts
    return () => {
      if (footer) {
        footer.style.display = 'block';
      }
    };
  }, []);

  // Filter products based on selected group
  const filteredProducts = selectedGroupId
    ? products.filter(product => product.groupId === selectedGroupId)
    : products;

  // Initialize pages with products
  useEffect(() => {
    const totalPages = Math.ceil(filteredProducts.length / 32) || 1;
    const newPages = [];
    
    for (let i = 0; i < totalPages; i++) {
      const pageProducts = filteredProducts.slice(i * 32, (i + 1) * 32);
      newPages.push({ id: i + 1, products: pageProducts });
    }
    
    setPages(newPages);
    
    // Reset to first page when changing groups
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredProducts, currentPage]);

  // Handle opening the modal for a product
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // Handle creating a new product
  const handleNewProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: 'YENİ ÜRÜN',
      price: 0,
      groupId: selectedGroupId || '',
      groupColor: selectedGroupId 
        ? menuGroups.find(g => g.id === selectedGroupId)?.color 
        : undefined,
      isActive: true,
      isCombo: false,
      isTopLevel: false,
      isOpen: false,
      securityLevel: 0
    };
    
    setSelectedProduct(newProduct);
    setShowModal(true);
  };

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, productId: string, pageId: number, index: number) => {
    setDraggedItem({ productId, pageId, index });
    e.dataTransfer.effectAllowed = 'move';
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent, pageId: number, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (!draggedItem) return;
    
    // Don't do anything if hovering over the same item
    if (draggedItem.pageId === pageId && draggedItem.index === index) return;
    
    setDragOverItem({ pageId, index });
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent, targetPageId: number, targetIndex: number) => {
    e.preventDefault();
    
    if (!draggedItem) return;
    
    const { productId, pageId: sourcePageId, index: sourceIndex } = draggedItem;
    
    // Don't do anything if dropping onto the same item
    if (sourcePageId === targetPageId && sourceIndex === targetIndex) return;
    
    // Create a new array of pages
    const newPages = [...pages];
    
    // Find source and target page
    const sourcePage = newPages.find(page => page.id === sourcePageId);
    const targetPage = newPages.find(page => page.id === targetPageId);
    
    if (!sourcePage || !targetPage) return;
    
    // Get the source product
    const sourceProduct = sourcePage.products[sourceIndex];
    if (!sourceProduct) return;
    
    // Remove the source product from its original position
    sourcePage.products[sourceIndex] = null;
    
    // If the target position has a product, swap them
    const targetProduct = targetPage.products[targetIndex];
    if (targetProduct) {
      sourcePage.products[sourceIndex] = targetProduct;
    }
    
    // Place the source product at the target position
    targetPage.products[targetIndex] = sourceProduct;
    
    // Update the state
    setPages(newPages);
    
    // Update the products array based on the new page arrangement
    const allProducts: Product[] = [];
    newPages.forEach(page => {
      page.products.forEach(product => {
        if (product) {
          allProducts.push(product);
        }
      });
    });
    
    setProducts(allProducts);
    handleDragEnd();
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  // Handle saving the product changes
  const handleSaveProduct = (updatedProduct: Product) => {
    const isNewProduct = !products.some(p => p.id === updatedProduct.id);
    
    if (isNewProduct) {
      // Add the new product
      setProducts(prev => [...prev, updatedProduct]);
    } else {
      // Update the existing product
      setProducts(prev => 
        prev.map(p => p.id === updatedProduct.id ? updatedProduct : p)
      );
    }
    
    // Close the modal
    setShowModal(false);
    setSelectedProduct(null);
  };

  // Handle deleting a product
  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    setShowModal(false);
    setSelectedProduct(null);
  };

  // Change page
  const handlePageChange = (pageId: number) => {
    setCurrentPage(pageId);
  };

  // Handle group selection
  const handleGroupSelect = (groupId: string | null) => {
    setSelectedGroupId(groupId);
  };

  return (
    <div className="container mx-auto py-0 px-1 bg-gray-50 h-full overflow-hidden" style={{ height: 'calc(100vh - 64px)', maxHeight: 'calc(100vh - 64px)' }}>
      <div className="flex gap-1 h-full overflow-hidden">
        {/* Left sidebar with menu groups */}
        <div className="w-56 flex-shrink-0 overflow-hidden" style={{ maxHeight: '600px' }}>
          <MenuGroupsList 
            groups={menuGroups}
            selectedGroupId={selectedGroupId}
            onGroupSelect={handleGroupSelect}
          />
        </div>
        
        {/* Main content area */}
        <div className="flex-grow flex flex-col overflow-hidden">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 flex-grow flex flex-col" style={{ maxHeight: '600px' }}>
            {pages.map(page => (
              <div key={page.id} className={`${page.id === currentPage ? 'flex' : 'hidden'} flex-col h-full overflow-hidden`}>
                <div className="bg-gray-100 px-3 py-0.5 border-b border-gray-200 flex-shrink-0">
                  <h2 className="text-base font-semibold text-gray-800">SAYFA {page.id}</h2>
                </div>
                
                <div className="flex-grow overflow-hidden p-0">
                  <ProductGrid
                    products={page.products}
                    pageId={page.id}
                    draggedItem={draggedItem}
                    dragOverItem={dragOverItem}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onDragEnd={handleDragEnd}
                    onProductClick={handleProductClick}
                    onEmptyClick={handleNewProduct}
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center mt-0.5 mb-0 flex-shrink-0">
            <div className="flex space-x-1">
              {pages.map(page => (
                <button
                  key={page.id}
                  className={`w-6 h-6 flex items-center justify-center rounded-md transition-colors duration-200 text-sm ${
                    page.id === currentPage
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => handlePageChange(page.id)}
                >
                  {page.id}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Modal */}
      {showModal && selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onSave={handleSaveProduct}
          onDelete={handleDeleteProduct}
          menuGroups={menuGroups}
        />
      )}
    </div>
  );
}
