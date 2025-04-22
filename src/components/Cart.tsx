import React, { useEffect, useRef, useState } from 'react';
import { Plus, Minus, Store, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { OrderItem, CartDiscount, Payment } from '../types';
import PaymentModal from './PaymentModal';
import ProductMessageModal from './ProductMessageModal';
import ProductDiscountModal from './ProductDiscountModal';
import SaleTypeHeader from './SaleTypeHeader';
import ServiceTypeModal from './ServiceTypeModal';
import CartInfoHeader from './CartInfoHeader';
import CartItemList from './CartItemList';
import CartSummary from './CartSummary';
import CartActionBar from './CartActionBar';
import CartPaymentButtons from './CartPaymentButtons';
import SettlementModal, { PaymentType } from './SettlementModal';
import { productMessages, productMessageGroups } from '../data/productMessages';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ReplayIcon from '@mui/icons-material/Replay';
import PercentIcon from '@mui/icons-material/Percent';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import PaymentIcon from '@mui/icons-material/Payment';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptIcon from '@mui/icons-material/Receipt';
import MessageIcon from '@mui/icons-material/Message';
import PrintIcon from '@mui/icons-material/Print';

interface CartProps {
  orderItems: OrderItem[];
  payments: Payment[];
  discount?: CartDiscount;
  tableId: string;
  checkDiscount?: number;
  productDiscount?: number;
  customerName?: string;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
  onPayment: (type: PaymentType, amount: number) => void;
  onBarcodeSubmit: (barcode: string) => void;
  onCheckDiscount?: () => void;
  orderNote?: string;
}

interface OrderItemWithMessages extends OrderItem {
  messages?: { id: string; name: string }[];
}

const paymentButtons = [
  { key: 'cash', label: 'NAKİT', color: 'bg-green-600 hover:bg-green-700', text: 'text-white' },
  { key: 'card', label: 'KREDİ KARTI', color: 'bg-red-600 hover:bg-red-700', text: 'text-white' },
  { key: 'hesap', label: 'HESAP', color: 'bg-blue-500 hover:bg-blue-600', text: 'text-white' },
  { key: 'cek_kapat', label: 'ÇEK KAPAT', color: 'bg-blue-800 hover:bg-blue-900', text: 'text-white' },
  { key: 'Yemek Çeki', label: 'Yemek Çeki', color: 'bg-yellow-500 hover:bg-yellow-600 text-black', icon: <RestaurantIcon fontSize="medium" /> },
  { key: 'mesajlar', label: 'MESAJLAR', color: 'bg-yellow-400 hover:bg-yellow-500', text: 'text-black' },
  { key: 'tamam', label: 'TAMAM', color: 'bg-green-600 hover:bg-green-700', text: 'text-white' },
  { key: 'multinet', label: 'Multinet', color: 'bg-neutral-800 hover:bg-neutral-700', text: 'text-white', icon: <RestaurantIcon fontSize="medium" /> },
  { key: 'ticket', label: 'Ticket', color: 'bg-neutral-900 hover:bg-neutral-700', text: 'text-white', icon: <CardGiftcardIcon fontSize="medium" /> },
  { key: 'sodexo', label: 'Sodexo', color: 'bg-neutral-800 hover:bg-neutral-700', text: 'text-white', icon: <FastfoodIcon fontSize="medium" /> },
  { key: 'setcard', label: 'Setcard', color: 'bg-neutral-900 hover:bg-neutral-700', text: 'text-white', icon: <LocalDiningIcon fontSize="medium" /> },
];

const paymentIconMap: Record<string, React.ReactNode> = {
  cash: <PaymentIcon fontSize="small" />,
  card: <CreditCardIcon fontSize="small" />,
  hesap: <PrintIcon fontSize="small" />,
  cek_kapat: <ReceiptIcon fontSize="small" />,
  mesajlar: <MessageIcon fontSize="small" />,
  tamam: null,
  'Yemek Çeki': <RestaurantIcon fontSize="small" />,
};

const Cart: React.FC<CartProps & { style?: React.CSSProperties }> = ({
  orderItems,
  payments,
  discount,
  tableId,
  checkDiscount = 0,
  productDiscount = 0,
  customerName = '',
  onIncrement,
  onDecrement,
  onPayment,
  onBarcodeSubmit,
  onCheckDiscount,
  orderNote,
  style
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [refundMode, setRefundMode] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPaymentType, setSelectedPaymentType] = useState<string | null>(null);
  const [isProductMessageModalOpen, setIsProductMessageModalOpen] = useState(false);
  const [isProductDiscountModalOpen, setIsProductDiscountModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isSettlementModalOpen, setIsSettlementModalOpen] = useState(false);
  const [productMessageSelections, setProductMessageSelections] = useState<{ [productId: string]: string[] }>({});
  const [productDiscounts, setProductDiscounts] = useState<{ [productId: string]: number }>({});
  const cartItemsRef = useRef<HTMLDivElement>(null);
  const lastItemRef = useRef<HTMLDivElement>(null);
  const [isMealTicketModalOpen, setIsMealTicketModalOpen] = useState(false);

  const now = new Date();
  const formattedTime = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [saleType, setSaleType] = useState<'Fişli Satış' | 'Faturalı Satış'>('Fişli Satış');
  const [serviceType, setServiceType] = useState('MASA SERVİS');
  const serviceTypes = [
    'MASA SERVİS',
    'RESTORAN SATIŞ',
    'TEZGAH SATIŞ',
    'PAKET SATIŞ',
  ];
  const gelirMerkezi = 'Robotpos';
  const cekNo = '0';
  const terminalNo = '1';
  const acilisSaati = formattedTime;

  const totalDiscount = (checkDiscount || 0) + (productDiscount || 0);

  // Calculate net total considering per-product discounts
  const netTotal = orderItems.reduce((sum, item) => {
    const productDiscountPercent = productDiscounts[item.productId] || 0;
    const productDiscountAmount = item.price * productDiscountPercent / 100;
    const checkDiscountAmount = checkDiscount > 0 ? (item.price * checkDiscount / 100) : 0;
    const discountedPrice = Math.max(0, item.price - productDiscountAmount - checkDiscountAmount);
    return sum + discountedPrice * item.quantity;
  }, 0);

  // Calculate per-product and total product discount for summary
  const totalProductDiscount = orderItems.reduce((sum, item) => {
    const productDiscountPercent = productDiscounts[item.productId] || 0;
    const discountAmount = item.price * (productDiscountPercent / 100) * item.quantity;
    return sum + discountAmount;
  }, 0);

  const handleSelect = (idx: number) => setSelectedIndex(idx);
  const handleExpand = (idx: number) => setExpandedIndex(expandedIndex === idx ? null : idx);
  const handlePaymentClick = (type: string) => {
    if (type === 'cek_kapat') {
      setIsSettlementModalOpen(true);
    } else {
      setSelectedPaymentType(type);
      setIsPaymentModalOpen(true);
    }
  };
  const handlePaymentComplete = (amount: number) => {
    setIsPaymentModalOpen(false);
    if (selectedPaymentType) {
      onPayment(selectedPaymentType as PaymentType, amount);
    }
  };

  const handleOpenProductMessageModal = () => setIsProductMessageModalOpen(true);
  const handleCloseProductMessageModal = () => setIsProductMessageModalOpen(false);
  const handleAssignMessages = (productId: string, selectedMsgs: string[]) => {
    setProductMessageSelections(prev => ({ ...prev, [productId]: selectedMsgs }));
    // Burada istenirse orderItems'e mesajlar eklenebilir veya üst componente iletilebilir
  };

  const handleMealTicketClick = () => setIsMealTicketModalOpen(true);
  const handleMealTicketClose = () => setIsMealTicketModalOpen(false);

  const handleCompleteClick = () => {
    handlePaymentClick('complete');
  };

  const paymentButtonsForComponent = paymentButtons.filter(btn => !['multinet','ticket','sodexo','setcard'].includes(btn.key)).map(btn => ({
    label: btn.label,
    color: btn.color,
    icon: paymentIconMap[btn.key] || btn.icon,
    onClick: btn.key === 'mesajlar' ? handleOpenProductMessageModal : btn.key === 'tamam' ? handleCompleteClick : btn.key === 'Yemek Çeki' ? handleMealTicketClick : () => handlePaymentClick(btn.key),
    disabled: 'disabled' in btn ? Boolean((btn as any).disabled) : false,
    doubleHeight: btn.key === 'card',
  }));

  useEffect(() => {
    if (lastItemRef.current) {
      lastItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [orderItems.length]);

  useEffect(() => {
    setSelectedIndex(null);
  }, [orderItems.length]);

  // Ürün bazında indirim desteği: orderItems dizisindeki her item için item.discount veya item.discountPercent kullanılabilir.
  // Çek indirimi: checkDiscount tüm ürünlere eşit oranda dağıtılır.

  // Her ürün için çek indirimi payı:
  const checkDiscountPerItem = orderItems.length > 0 ? (checkDiscount || 0) / orderItems.length : 0;

  // Sepet ürünleri, mesajlar ile birlikte gösterilecek şekilde hazırlanıyor
  const orderItemsWithMessages: OrderItemWithMessages[] = orderItems.map(item => ({
    ...item,
    messages: Array.isArray(productMessageSelections[item.productId])
      ? productMessageSelections[item.productId].map(msgId => {
          const msg = productMessages.find(m => m.id === msgId);
          return msg ? { id: msg.id, name: msg.name } : null;
        }).filter(Boolean) as { id: string; name: string }[]
      : [],
  }));

  return (
    <div
      className="bg-gray-50 flex flex-col h-full border-l border-gray-200 relative overflow-hidden"
      style={{height:'100vh', ...style}}
    >
      {/* Fişli/Faturalı Satış başlığı ve servis tipi */}
      <SaleTypeHeader
        saleType={saleType}
        setSaleType={setSaleType}
        serviceType={serviceType}
        onServiceTypeClick={() => setIsServiceModalOpen(true)}
      />
      {/* Servis Tipi Modal */}
      <ServiceTypeModal
        isOpen={isServiceModalOpen}
        serviceTypes={serviceTypes}
        serviceType={serviceType}
        setServiceType={setServiceType}
        onClose={() => setIsServiceModalOpen(false)}
      />
      {/* üst bilgi */}
      <CartInfoHeader
        tableId={tableId}
        acilisSaati={acilisSaati}
        cekNo={cekNo}
        terminalNo={terminalNo}
      />
      
      {/* Müşteri Adı */}
      {customerName && (
        <div className="bg-blue-100 border border-blue-200 p-1.5 mb-1 rounded-md flex items-start max-w-full">
          <div className="bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded mr-1.5 shrink-0">MÜŞTERİ</div>
          <span className="text-blue-800 text-xs font-medium break-words overflow-hidden">{customerName}</span>
        </div>
      )}
      
      {/* Sipariş notu */}
      {orderNote && (
        <div className="bg-yellow-100 border border-yellow-200 p-1.5 mb-1 rounded-md flex items-start max-w-full">
          <div className="bg-yellow-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded mr-1.5 shrink-0">NOT</div>
          <span className="text-yellow-800 text-xs break-words overflow-hidden">{orderNote}</span>
        </div>
      )}
      {/* Cart Items & Watermark */}
      <CartItemList
        orderItems={orderItemsWithMessages}
        selectedIndex={selectedIndex}
        handleSelect={handleSelect}
        lastItemRef={lastItemRef}
        productDiscounts={productDiscounts}
        checkDiscount={checkDiscount}
        setIsProductDiscountModalOpen={setIsProductDiscountModalOpen}
        setIsProductMessageModalOpen={setIsProductMessageModalOpen}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />
      {/* +, - ve İade Modu Butonları */}
      <CartActionBar
        onIncrement={selectedIndex !== null && orderItems[selectedIndex] ? () => onIncrement(orderItems[selectedIndex].productId) : () => {}}
        onDecrement={selectedIndex !== null && orderItems[selectedIndex] ? () => onDecrement(orderItems[selectedIndex].productId) : () => {}}
        refundMode={refundMode}
        setRefundMode={setRefundMode}
        disableDecrement={selectedIndex === null}
        disableIncrement={selectedIndex === null}
        onCheckDiscount={onCheckDiscount || (() => {})}
      />
      {/* Toplam ve indirimler */}
      <CartSummary
        checkDiscount={checkDiscount}
        totalProductDiscount={totalProductDiscount}
        netTotal={netTotal}
      />
      {/* Ödeme butonları */}
      <CartPaymentButtons 
        paymentButtons={paymentButtonsForComponent}
        onCompleteClick={handleCompleteClick}
        onMessageClick={handleOpenProductMessageModal}
      />
      {/* Tam ekran ürün mesajları modali */}
      {isProductMessageModalOpen && selectedIndex !== null && orderItems[selectedIndex] && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="w-screen h-screen flex items-center justify-center">
            <ProductMessageModal
              isOpen={true}
              onClose={() => setIsProductMessageModalOpen(false)}
              orderItems={orderItems}
              selectedProductId={orderItems[selectedIndex].productId}
              productMessages={productMessages}
              messageGroups={productMessageGroups}
              onAssignMessages={(productId, selectedMsgs) => {
                setProductMessageSelections((prev) => ({
                  ...prev,
                  [productId]: Array.isArray(selectedMsgs) ? selectedMsgs : [],
                }));
                setIsProductMessageModalOpen(false);
              }}
              productMessageSelections={productMessageSelections}
            />
          </div>
        </div>
      )}
      {/* Ürün İndirim Modalı */}
      {isProductDiscountModalOpen && selectedIndex !== null && orderItems[selectedIndex] && (
        <ProductDiscountModal
          isOpen={true}
          onClose={() => setIsProductDiscountModalOpen(false)}
          onApply={(discount) => {
            const productId = orderItems[selectedIndex].productId;
            setProductDiscounts((prev) => ({ ...prev, [productId]: discount }));
            setIsProductDiscountModalOpen(false);
          }}
        />
      )}
      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onConfirm={handlePaymentComplete}
        totalAmount={netTotal}
      />
      {/* Settlement Modal */}
      <SettlementModal
        isOpen={isSettlementModalOpen}
        onClose={() => setIsSettlementModalOpen(false)}
        orderItems={orderItems}
        payments={payments}
        discount={discount}
        tableId={tableId}
        checkDiscount={checkDiscount}
        productDiscount={productDiscount}
        customerName={customerName}
        onPayment={onPayment}
        orderNote={orderNote}
      />
      {/* Yemek Çeki Modal */}
      {isMealTicketModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl p-8 min-w-[400px] max-w-[98vw] border-4 border-yellow-400 flex flex-col items-center relative">
            <div className="flex items-center gap-3 mb-6">
              <RestaurantIcon className="text-yellow-500" fontSize="large" />
              <span className="font-extrabold text-2xl md:text-3xl text-gray-800 tracking-wide drop-shadow">Yemek Çeki ile Öde</span>
            </div>
            <div className="grid grid-cols-2 gap-6 w-full mb-6">
              {paymentButtons.filter(btn => ['multinet', 'ticket', 'sodexo', 'setcard'].includes(btn.key)).map(opt => (
                <button
                  key={opt.key}
                  className={`flex flex-col items-center justify-center h-24 md:h-32 w-full px-2 py-4 rounded-2xl font-bold shadow-xl transition-all text-lg md:text-2xl ${opt.color} ${opt.text} hover:scale-105 focus:ring-4 focus:ring-yellow-400 border-2 border-yellow-200`}
                  onClick={() => { handlePaymentClick(opt.key); handleMealTicketClose(); }}
                  style={{ minHeight: 96 }}
                >
                  <span className="mb-2 text-4xl md:text-5xl drop-shadow">{opt.icon}</span>
                  <span className="drop-shadow">{opt.label}</span>
                </button>
              ))}
            </div>
            <button className="mt-2 w-full px-4 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold shadow transition-all text-lg" onClick={handleMealTicketClose}>
              Vazgeç
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;