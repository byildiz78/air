'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MobileHeader from './MobileHeader';
import MobileProductGrid from './MobileProductGrid';
import MobileCart from './MobileCart';
import MobileFooter from './MobileFooter';
import MobileComboSelectionModal from './MobileComboSelectionModal';
import MobileProductMessageModal from './MobileProductMessageModal';
import { categories } from '../../data/categories';
import { Product, OrderItem, Payment, ComboItem } from '../../types';
import { productMessages, productMessageGroups } from '../../data/productMessages';
import { motion } from 'framer-motion';

interface MobileOrderPageProps {
  tableId: string;
}

const MobileOrderPage: React.FC<MobileOrderPageProps> = ({ tableId }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isCheckDiscountOpen, setIsCheckDiscountOpen] = useState(false);
  const [checkDiscount, setCheckDiscount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [isComboModalOpen, setIsComboModalOpen] = useState(false);
  const [selectedComboProduct, setSelectedComboProduct] = useState<Product | null>(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [selectedMessageProductId, setSelectedMessageProductId] = useState<string | null>(null);
  const [productMessageSelections, setProductMessageSelections] = useState<{ [productId: string]: string[] }>({});
  const [isEntering, setIsEntering] = useState(true);

  // Add animation effect on mount
  useEffect(() => {
    // Set a small timeout to ensure the animation runs after component is mounted
    const timer = setTimeout(() => {
      setIsEntering(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Get current category products
  const currentProducts = searchQuery
    ? categories.flatMap(cat => cat.products).filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.barcode?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : selectedCategory.products;

  // Find product by barcode
  const findProductByBarcode = (barcode: string): Product | null => {
    for (const category of categories) {
      const product = category.products.find(p => p.barcode === barcode);
      if (product) return product;
    }
    return null;
  };

  // Handle barcode submit
  const handleBarcodeSubmit = (barcode: string) => {
    const product = findProductByBarcode(barcode);
    if (product) {
      addToOrder(product);
    } else {
      console.log('Ürün bulunamadı:', barcode);
    }
  };

  // Add product to order
  const addToOrder = (product: Product) => {
    // If it's a combo product, open the combo selection modal
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

  // Remove product from order
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

  // Handle payment
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
      router.push('/mobileorder');
    }
  };

  // Handle send to kitchen
  const handleSendToKitchen = () => {
    // Implement kitchen sending logic here
    console.log('Sending order to kitchen:', orderItems);
    
    // Show a notification or feedback to the user
    alert('Sipariş mutfağa gönderildi!');
    // Clear the order items
    setOrderItems([]);
  };

  // Handle check discount
  const handleCheckDiscount = (amount: number) => {
    setCheckDiscount(amount);
    setIsCheckDiscountOpen(false);
  };

  // Handle increment
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

  // Handle decrement
  const handleDecrement = (productId: string) => {
    removeFromOrder(productId);
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Open message modal for a specific product
  const handleOpenMessageModal = (productId: string) => {
    setSelectedMessageProductId(productId);
    setIsMessageModalOpen(true);
  };

  // Handle assigning messages to a product
  const handleAssignMessages = (productId: string, selectedMsgs: string[]) => {
    setProductMessageSelections(prev => ({
      ...prev,
      [productId]: selectedMsgs
    }));
    setIsMessageModalOpen(false);
  };

  // Handle combo selection complete
  const handleComboComplete = (selections: {
    mainItem: ComboItem | null;
    sides: ComboItem[];
    drinks: ComboItem[];
  }) => {
    if (!selectedComboProduct) return;
    
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    const currentStaff = 'Ahmet Yılmaz';
    
    // Create a description of the combo
    const mainItemName = selections.mainItem?.name || 'No main item';
    const sidesNames = selections.sides.map(s => s.name).join(', ') || 'No sides';
    const drinksNames = selections.drinks.map(d => d.name).join(', ') || 'No drinks';
    const description = `${mainItemName} / ${sidesNames} / ${drinksNames}`;
    
    // Calculate any extra price
    const extraPrice = (selections.mainItem?.extraPrice || 0) +
      selections.sides.reduce((sum, item) => sum + (item.extraPrice || 0), 0) +
      selections.drinks.reduce((sum, item) => sum + (item.extraPrice || 0), 0);
    
    // Add to order items
    setOrderItems(prev => {
      const existing = prev.find(item => 
        item.productId === selectedComboProduct?.id && 
        item.comboDetails?.description === description
      );
      
      if (existing) {
        return prev.map(item =>
          (item.productId === selectedComboProduct?.id && 
           item.comboDetails?.description === description)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prev, {
        productId: selectedComboProduct.id,
        name: selectedComboProduct.name,
        price: selectedComboProduct.price + extraPrice,
        quantity: 1,
        addedAt: formattedTime,
        addedBy: currentStaff,
        isCombo: true,
        comboDetails: {
          description,
          mainItem: selections.mainItem,
          sides: selections.sides,
          drinks: selections.drinks
        }
      }];
    });
    
    setIsComboModalOpen(false);
  };

  // Toggle cart visibility
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <MobileHeader 
        title={`Masa ${tableId}`}
        onBack={() => router.push('/mobileorder')}
      />
      
      <motion.div 
        className="flex-1 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {showCart ? (
          <motion.div
            className="absolute inset-0 z-10"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <MobileCart
              orderItems={orderItems}
              payments={payments}
              tableId={tableId}
              checkDiscount={checkDiscount}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onPayment={handlePayment}
              onBarcodeSubmit={handleBarcodeSubmit}
              onCheckDiscount={() => setIsCheckDiscountOpen(true)}
              onClose={() => setShowCart(false)}
              onOpenMessageModal={handleOpenMessageModal}
              productMessageSelections={productMessageSelections}
              productMessages={productMessages}
            />
          </motion.div>
        ) : (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <MobileProductGrid 
              products={currentProducts}
              selectedProduct={selectedProduct}
              orderItems={orderItems}
              onProductSelect={addToOrder}
              onBarcodeSubmit={handleBarcodeSubmit}
              onSearch={handleSearch}
              searchQuery={searchQuery}
              categories={categories}
              onCategorySelect={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          </motion.div>
        )}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <MobileFooter 
          showCart={showCart}
          onToggleCart={toggleCart}
          itemCount={orderItems.length}
          totalAmount={orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
          onSendToKitchen={handleSendToKitchen}
          onCheckDiscount={() => setIsCheckDiscountOpen(true)}
        />
      </motion.div>

      {/* Combo Selection Modal */}
      {isComboModalOpen && selectedComboProduct && (
        <MobileComboSelectionModal
          isOpen={isComboModalOpen}
          onClose={() => setIsComboModalOpen(false)}
          product={selectedComboProduct}
          onComplete={handleComboComplete}
        />
      )}

      {/* Product Message Modal */}
      {isMessageModalOpen && (
        <MobileProductMessageModal
          isOpen={isMessageModalOpen}
          onClose={() => setIsMessageModalOpen(false)}
          orderItems={orderItems}
          productMessages={productMessages}
          messageGroups={productMessageGroups}
          onAssignMessages={handleAssignMessages}
          selectedProductId={selectedMessageProductId || undefined}
          productMessageSelections={productMessageSelections}
        />
      )}
    </div>
  );
};

export default MobileOrderPage;
