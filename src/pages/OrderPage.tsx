'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProductGrid from '../components/ProductGrid';
import Cart from '../components/Cart';
import FooterActions from '../components/order/FooterActions';
import OrderModals from '../components/order/OrderModals';
import ComboSelectionModal from '../components/ComboSelectionModal';
import SplitOrderModal from '../components/order/SplitOrderModal';
import OrderNoteModal from '../components/order/OrderNoteModal';
import OpenCustomerDisplayButton from '../components/OpenCustomerDisplayButton';
import { categories } from '../data/categories';
import { Product, OrderItem, ComboItem, Payment } from '../types';
import LeftMenu from '../components/order/LeftMenu';
import { sendToDisplay } from '../utils/displayChannel';

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
  const [isSplitOrderModalOpen, setIsSplitOrderModalOpen] = useState(false);
  const [splitOrderItems, setSplitOrderItems] = useState<OrderItem[][]>([]);
  const [isOrderNoteModalOpen, setIsOrderNoteModalOpen] = useState(false);
  const [orderNote, setOrderNote] = useState('');
  const [isCustomerDisplayOpen, setIsCustomerDisplayOpen] = useState(false);

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

  const handleComboComplete = (selections: { mainItem: ComboItem | null; side: ComboItem | null; drink: ComboItem | null; quantity: number }) => {
    if (!selectedComboProduct) return;
    
    // Opsiyonel seçimler için güvenli erişim
    const extraCost = (
      (selections.mainItem?.extraPrice || 0) +
      (selections.side?.extraPrice || 0) +
      (selections.drink?.extraPrice || 0)
    );

    // Ana ürün adını oluştur - eğer ana ürün seçilmişse onun adını kullan
    const mainItemName = selections.mainItem ? ` (${selections.mainItem.name})` : '';
    const comboName = `${selectedComboProduct.name}${mainItemName}`;
    
    // Seçimleri temizle - null değerleri filtrele
    const cleanSelections = {
      mainItem: selections.mainItem,
      side: selections.side,
      drink: selections.drink,
      quantity: selections.quantity
    };

    setOrderItems(prev => [...prev, {
      productId: selectedComboProduct.id,
      name: comboName,
      price: selectedComboProduct.price + extraCost,
      quantity: selections.quantity,
      comboSelections: cleanSelections
    }]);

    setSelectedComboProduct(null);
    setIsComboModalOpen(false);
  };

  const handleSplitOrder = (splitItems: OrderItem[][]) => {
    setSplitOrderItems(splitItems);
    setIsSplitOrderModalOpen(false);
  };

  const handleIncrement = (productId: string) => {
    let product: Product | undefined;
    for (const category of categories) {
      const found = category.products.find(p => p.id === productId);
      if (found) {
        product = found;
        break;
      }
    }
    if (product) addToOrder(product);
  };

  const handleDecrement = (productId: string) => {
    removeFromOrder(productId);
  };

  useEffect(() => {
    if (isCustomerDisplayOpen) {
      if (orderItems.length > 0) {
        // Sipariş varsa, sipariş bilgilerini gönder
        sendToDisplay({
          type: 'ORDER_UPDATE',
          orderItems,
          customerName,
          orderNote,
          checkDiscount,
          productDiscount,
          total: orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) - checkDiscount - productDiscount
        });
      } else {
        // Sipariş yoksa, karşılama ekranını göster
        sendToDisplay({
          type: 'SHOW_WELCOME'
        });
      }
    }
  }, [orderItems, customerName, orderNote, checkDiscount, productDiscount, isCustomerDisplayOpen]);

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
        <div className="flex-1 overflow-hidden">
          <div className="flex justify-between items-center p-2 bg-gray-800">
            <h2 className="text-white text-lg font-medium">Ürünler</h2>
            <OpenCustomerDisplayButton 
              isDisplayOpen={isCustomerDisplayOpen}
              setIsDisplayOpen={setIsCustomerDisplayOpen}
            />
          </div>
          <ProductGrid
            products={selectedCategory.products}
            selectedProduct={selectedProduct}
            orderItems={orderItems}
            onProductSelect={addToOrder}
            onBarcodeSubmit={handleBarcodeSubmit}
          />
        </div>
        
        <FooterActions
          onCheckDiscount={() => setIsCheckDiscountOpen(true)}
          onProductDiscount={() => setIsProductDiscountOpen(true)}
          onCustomerName={() => setIsCustomerNameOpen(true)}
          onOtherOptions={() => setIsOtherOptionsOpen(true)}
          onSplitOrder={() => setIsSplitOrderModalOpen(true)}
          onOrderNote={() => setIsOrderNoteModalOpen(true)}
          showTableActions={true}
          selectedProductId={selectedProduct}
          hasProductInCart={!!(selectedProduct && orderItems.some(item => item.productId === selectedProduct))}
        />
      </div>

      {/* Cart */}
      <Cart
        orderItems={orderItems}
        payments={payments || []}
        tableId={tableId || ''}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onPayment={() => {}}
        onBarcodeSubmit={handleBarcodeSubmit}
        customerName={customerName}
        checkDiscount={checkDiscount}
        productDiscount={productDiscount}
        onCheckDiscount={() => setIsCheckDiscountOpen(true)}
        orderNote={orderNote}
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
            setSelectedComboProduct(null);
            setIsComboModalOpen(false);
          }}
          comboOptions={selectedComboProduct?.comboOptions!}
          onComplete={handleComboComplete}
          selectedComboProduct={selectedComboProduct}
        />
      )}

      {/* Split Order Modal */}
      {isSplitOrderModalOpen && (
        <SplitOrderModal
          isOpen={isSplitOrderModalOpen}
          onClose={() => setIsSplitOrderModalOpen(false)}
          orderItems={orderItems}
          onSplitComplete={handleSplitOrder}
        />
      )}

      {/* Order Note Modal */}
      <OrderNoteModal
        isOpen={isOrderNoteModalOpen}
        onClose={() => setIsOrderNoteModalOpen(false)}
        initialNote={orderNote}
        onSave={(note) => setOrderNote(note)}
      />
    </div>
  );
};

export default OrderPage;