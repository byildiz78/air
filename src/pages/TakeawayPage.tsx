import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { categories } from '../data/categories';
import { Product, OrderItem, ComboItem } from '../types';
import Header from '../components/Header';
import ProductGrid from '../components/ProductGrid';
import Cart from '../components/Cart';
import LeftMenu from '../components/order/LeftMenu';
import FooterActions from '../components/order/FooterActions';
import OrderModals from '../components/order/OrderModals';
import ComboSelectionModal from '../components/ComboSelectionModal';

const TakeawayPage: React.FC = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isOtherOptionsOpen, setIsOtherOptionsOpen] = useState(false);
  const [isCheckDiscountOpen, setIsCheckDiscountOpen] = useState(false);
  const [isProductDiscountOpen, setIsProductDiscountOpen] = useState(false);
  const [isCustomerNameOpen, setIsCustomerNameOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [isComboModalOpen, setIsComboModalOpen] = useState(false);
  const [selectedComboProduct, setSelectedComboProduct] = useState<Product | null>(null);

  // Function to find product by barcode across all categories
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
      // TODO: Add error notification
      console.log('Ürün bulunamadı:', barcode);
    }
  };

  // Filter categories based on current page
  const currentCategories = categories.filter(cat => cat.page === currentPage);

  const addToOrder = (product: Product) => {
    if (product.isCombo && product.comboOptions) {
      setSelectedComboProduct(product);
      setIsComboModalOpen(true);
      return;
    }

    setOrderItems(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId: product.id, name: product.name, price: product.price, quantity: 1 }];
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
    router.push('/');
  };

  const handleCheckDiscount = (amount: number) => {
    console.log('Applying check discount:', amount);
    // Implement discount logic
  };

  const handleProductDiscount = (percentage: number) => {
    console.log('Applying product discount:', percentage);
    // Implement discount logic
  };

  const handleCustomerName = (name: string) => {
    setCustomerName(name);
  };

  const handleComboComplete = (selections: { mainItem: ComboItem; side: ComboItem; drink: ComboItem }) => {
    if (!selectedComboProduct) return;
    
    // Calculate any extra costs from selections
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
    <div className="min-h-screen flex flex-col bg-gray-900/70">
      <Header title="Paket Sipariş" />

      <div className="flex flex-1 overflow-hidden">
        <LeftMenu
          currentPage={currentPage}
          currentCategories={currentCategories}
          selectedCategory={selectedCategory}
          onPageChange={setCurrentPage}
          onCategorySelect={setSelectedCategory}
          onCancel={() => router.push('/')}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
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
          />
        </div>

        {/* Cart */}
        <Cart
          orderItems={orderItems}
          onIncrement={productId => {
            const product = selectedCategory.products.find(p => p.id === productId);
            if (product) addToOrder(product);
          }}
          onDecrement={removeFromOrder}
          onPayment={handlePayment}
          tableId=""
          onBarcodeSubmit={handleBarcodeSubmit}
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
    </div>
  );
};

export default TakeawayPage;
