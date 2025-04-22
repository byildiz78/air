'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Percent, FileText, GitMerge, MoreHorizontal, Users, Coins } from 'lucide-react';
import { categories } from '@/data/categories';
import { Product, Category, OrderItem, CartDiscount, ComboItem, Payment } from '@/types';
import Header from '@/components/Header';
import PageNavigation from '@/components/PageNavigation';
import CategoryList from '@/components/CategoryList';
import ProductGrid from '@/components/ProductGrid';
import Cart from '@/components/Cart';
import OtherOptionsModal from '@/components/OtherOptionsModal';
import CheckDiscountModal from '@/components/CheckDiscountModal';
import ProductDiscountModal from '@/components/ProductDiscountModal';
import CustomerNameModal from '@/components/CustomerNameModal';
import ComboSelectionModal from '@/components/ComboSelectionModal';
import FooterActions from '@/components/order/FooterActions';

interface OrderPageProps {
  tableId: string;
}

const OrderPage: React.FC<OrderPageProps> = ({ tableId }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isOtherOptionsOpen, setIsOtherOptionsOpen] = useState(false);
  const [isCheckDiscountOpen, setIsCheckDiscountOpen] = useState(false);
  const [isProductDiscountOpen, setIsProductDiscountOpen] = useState(false);
  const [isCustomerNameOpen, setIsCustomerNameOpen] = useState(false);
  const [isComboModalOpen, setIsComboModalOpen] = useState(false);
  const [selectedComboProduct, setSelectedComboProduct] = useState<Product | null>(null);
  const [cartDiscount, setCartDiscount] = useState<CartDiscount | undefined>();
  const [payments, setPayments] = useState<Payment[]>([]);

  const currentCategories = categories.filter(cat => cat.page === currentPage);

  const addToOrder = (product: Product) => {
    if (product.isCombo && product.comboOptions) {
      setSelectedComboProduct(product);
      setIsComboModalOpen(true);
      return;
    }

    const now = new Date();
    const formattedTime = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    const currentStaff = 'Ahmet Yılmaz';

    setOrderItems(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        addedAt: formattedTime,
        addedBy: currentStaff
      }];
    });
    setSelectedProduct(product.id);
  };

  const removeFromOrder = (productId: string) => {
    setOrderItems(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing && existing.quantity > 1) {
        return prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prev.filter(item => item.productId !== productId);
    });
  };

  const handlePayment = (type: string) => {
    console.log(`Processing ${type} payment`);
    router.push('/table-layout');
  };

  const handleComboComplete = (selections: { 
    mainItem: ComboItem | null; 
    side: ComboItem | null; 
    drink: ComboItem | null; 
    quantity: number 
  }) => {
    if (!selectedComboProduct) return;

    const now = new Date();
    const formattedTime = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    const currentStaff = 'Ahmet Yılmaz';

    // Calculate extra cost only for non-null selections
    const extraCost = 
      (selections.mainItem?.extraPrice || 0) +
      (selections.side?.extraPrice || 0) +
      (selections.drink?.extraPrice || 0);

    // Create a descriptive name for the combo
    const mainItemName = selections.mainItem ? ` (${selections.mainItem.name})` : '';
    const comboName = `${selectedComboProduct.name}${mainItemName}`;

    setOrderItems(prev => [...prev, {
      productId: selectedComboProduct.id,
      name: comboName,
      price: selectedComboProduct.price + extraCost,
      quantity: selections.quantity || 1, // Use provided quantity or default to 1
      addedAt: formattedTime,
      addedBy: currentStaff,
      comboSelections: selections
    }]);

    setIsComboModalOpen(false);
    setSelectedComboProduct(null);
  };

  const handleBarcodeSubmit = (barcode: string) => {
    // Find product by barcode and add it to order
    const product = selectedCategory.products.find(p => p.barcode === barcode);
    if (product) {
      addToOrder(product);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900/70">
      <Header tableId={tableId} onBarcodeSubmit={handleBarcodeSubmit} />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Menu */}
        <div className="w-64 bg-gray-900/90 border-r border-gray-800 flex flex-col">
          <PageNavigation currentPage={currentPage} onPageChange={setCurrentPage} />
          
          <CategoryList
            categories={currentCategories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />

          <div className="p-4 border-t border-gray-800">
            <button
              onClick={() => router.push('/table-layout')}
              className="w-full h-12 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
            >
              <X size={20} className="mr-2" />
              İptal
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <ProductGrid
            products={selectedCategory.products}
            selectedProduct={selectedProduct}
            orderItems={orderItems}
            onProductSelect={addToOrder}
          />
          
          {/* Footer */}
          <FooterActions
            onCheckDiscount={() => setIsCheckDiscountOpen(true)}
            onProductDiscount={() => setIsProductDiscountOpen(true)}
            onCustomerName={() => setIsCustomerNameOpen(true)}
            onOtherOptions={() => setIsOtherOptionsOpen(true)}
            hasProductInCart={orderItems.length > 0}
          />
        </div>

        {/* Cart */}
        <Cart
          orderItems={orderItems}
          payments={payments}
          discount={cartDiscount}
          tableId={tableId}
          onIncrement={productId => {
            const product = selectedCategory.products.find(p => p.id === productId);
            if (product) addToOrder(product);
          }}
          onDecrement={removeFromOrder}
          onPayment={(type, amount) => {
            setPayments(prev => [...prev, { 
              type, 
              amount, 
              timestamp: new Date().toISOString() 
            }]);
            handlePayment(type);
          }}
          onBarcodeSubmit={handleBarcodeSubmit}
          onCheckDiscount={() => setIsCheckDiscountOpen(true)}
          style={{ maxWidth: '288px', minWidth: '234px', width: '28.8vw' }}
        />

        {/* Modals */}
        <OtherOptionsModal 
          isOpen={isOtherOptionsOpen}
          onClose={() => setIsOtherOptionsOpen(false)}
        />
        <CheckDiscountModal
          isOpen={isCheckDiscountOpen}
          onClose={() => setIsCheckDiscountOpen(false)}
          onApply={(amount) => {
            setCartDiscount({ amount, type: 'check' });
            setIsCheckDiscountOpen(false);
          }}
        />
        <ProductDiscountModal
          isOpen={isProductDiscountOpen}
          onClose={() => setIsProductDiscountOpen(false)}
          onApply={(percentage) => {
            // Handle product discount
            setIsProductDiscountOpen(false);
          }}
        />
        <CustomerNameModal
          isOpen={isCustomerNameOpen}
          onClose={() => setIsCustomerNameOpen(false)}
          onSave={(name) => {
            // Handle customer name
            setIsCustomerNameOpen(false);
          }}
        />
        {selectedComboProduct && (
          <ComboSelectionModal
            isOpen={isComboModalOpen}
            onClose={() => {
              setIsComboModalOpen(false);
              setSelectedComboProduct(null);
            }}
            comboOptions={selectedComboProduct.comboOptions!}
            onComplete={handleComboComplete}
            selectedComboProduct={selectedComboProduct}
          />
        )}
      </div>
    </div>
  );
};

export default OrderPage;
