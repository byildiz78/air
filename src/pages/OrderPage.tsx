'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductGrid from '../components/ProductGrid';
import Cart from '../components/Cart';
import FooterActions from '../components/order/FooterActions';
import OrderModals from '../components/order/OrderModals';
import ComboSelectionModal from '../components/ComboSelectionModal';
import { categories } from '../data/categories';
import { Product, OrderItem, ComboItem, Payment } from '../types';
import LeftMenu from '../components/order/LeftMenu';

const OrderPage: React.FC<{ tableId?: string }> = ({ tableId }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isOtherOptionsOpen, setIsOtherOptionsOpen] = useState(false);
  const [isCheckDiscountOpen, setIsCheckDiscountOpen] = useState(false);
  const [isProductDiscountOpen, setIsProductDiscountOpen] = useState(false);
  const [isCustomerNameOpen, setIsCustomerNameOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [isComboModalOpen, setIsComboModalOpen] = useState(false);
  const [selectedComboProduct, setSelectedComboProduct] = useState<Product | null>(null);
  const [checkDiscount, setCheckDiscount] = useState(0);
  const [productDiscount, setProductDiscount] = useState(0);

  const findProductByBarcode = (barcode: string): Product | null => {
    for (const category of categories) {
      const product = category.products.find(p => p.barcode === barcode);
      if (product) return product;
    }
    return null;
  };

  const handleBarcodeSubmit = (barcode: string) => {
    const product = findProductByBarcode(barcode);
    if (product) {
      addToOrder(product);
    } else {
      console.log('Ürün bulunamadı:', barcode);
    }
  };

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

  const handlePayment = (type: 'cash' | 'card' | 'multinet' | 'sodexo', amount: number) => {
    const now = new Date();
    const payment: Payment = {
      type,
      amount,
      timestamp: now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    };
    
    setPayments(prev => [...prev, payment]);

    // Calculate total paid amount
    const totalPaid = [...payments, payment].reduce((sum, p) => sum + p.amount, 0);
    const totalAmount = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Only navigate to table layout if fully paid
    if (totalPaid >= totalAmount) {
      router.push('/table-layout');
    }
  };

  const handleCheckDiscount = (amount: number) => {
    setCheckDiscount(amount);
    setIsCheckDiscountOpen(false);
  };

  const handleProductDiscount = (percentage: number) => {
    setProductDiscount(percentage);
    setIsProductDiscountOpen(false);
  };

  const handleCustomerName = (name: string) => {
    setCustomerName(name);
  };

  const handleComboComplete = (selections: { mainItem: ComboItem; side: ComboItem; drink: ComboItem }) => {
    if (!selectedComboProduct) return;
    
    const extraCost = (
      (selections.mainItem.extraPrice || 0) +
      (selections.side.extraPrice || 0) +
      (selections.drink.extraPrice || 0)
    );

    const comboName = `${selectedComboProduct.name} (${selections.mainItem.name})`;

    setOrderItems(prev => [...prev, {
      productId: selectedComboProduct.id,
      name: comboName,
      price: selectedComboProduct.price + extraCost,
      quantity: 1,
      comboSelections: selections
    }]);

    setSelectedComboProduct(null);
    setIsComboModalOpen(false);
  };

  return (
    <div className="flex h-screen">
      <LeftMenu
        currentPage={currentPage}
        currentCategories={currentCategories}
        selectedCategory={selectedCategory}
        onPageChange={setCurrentPage}
        onCategorySelect={setSelectedCategory}
        onCancel={() => router.push('/table-layout')}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        <ProductGrid
          products={selectedCategory.products}
          selectedProduct={selectedProduct}
          orderItems={orderItems}
          onProductSelect={addToOrder}
        />
        
        <FooterActions
          onCheckDiscount={() => setIsCheckDiscountOpen(true)}
          onProductDiscount={() => setIsProductDiscountOpen(true)}
          onCustomerName={() => setIsCustomerNameOpen(true)}
          onOtherOptions={() => setIsOtherOptionsOpen(true)}
          showTableActions={false}
          selectedProductId={selectedProduct}
          hasProductInCart={!!(selectedProduct && orderItems.some(item => item.productId === selectedProduct))}
        />
      </div>

      {/* Cart */}
      <Cart
        orderItems={orderItems}
        payments={payments}
        onIncrement={productId => {
          // Fix: Search all categories for the product, not just selectedCategory
          let product: Product | undefined;
          for (const category of categories) {
            const found = category.products.find(p => p.id === productId);
            if (found) {
              product = found;
              break;
            }
          }
          if (product) addToOrder(product);
        }}
        onDecrement={removeFromOrder}
        onPayment={(type, amount) => {
          setPayments(prev => [
            ...prev,
            {
              type: (type as any) as 'cash' | 'card' | 'multinet' | 'sodexo',
              amount,
              timestamp: new Date().toISOString(),
            } as Payment
          ]);
        }}
        tableId={tableId || ''}
        onBarcodeSubmit={handleBarcodeSubmit}
        checkDiscount={checkDiscount}
        productDiscount={productDiscount}
      />

      {/* Modals */}
      <OrderModals
        isOtherOptionsOpen={isOtherOptionsOpen}
        isCheckDiscountOpen={isCheckDiscountOpen}
        isProductDiscountOpen={isProductDiscountOpen}
        isCustomerNameOpen={isCustomerNameOpen}
        onOtherOptionsClose={() => setIsOtherOptionsOpen(false)}
        onCheckDiscountClose={() => setIsCheckDiscountOpen(false)}
        onProductDiscountClose={() => setIsProductDiscountOpen(false)}
        onCustomerNameClose={() => setIsCustomerNameOpen(false)}
        onCheckDiscount={handleCheckDiscount}
        onProductDiscount={handleProductDiscount}
        onCustomerName={handleCustomerName}
      />

      {/* Combo Modal */}
      {selectedComboProduct && (
        <ComboSelectionModal
          isOpen={isComboModalOpen}
          onClose={() => {
            setIsComboModalOpen(false);
            setSelectedComboProduct(null);
          }}
          comboOptions={selectedComboProduct.comboOptions!}
          onComplete={handleComboComplete}
        />
      )}
    </div>
  );
};

export default OrderPage;