import React, { useState, useRef } from 'react';
import { OrderItem, CartDiscount } from '../types';
import { X, Delete, Trash2 } from 'lucide-react';
import CartItemList from './CartItemList';
import CartSummary from './CartSummary';
import CartInfoHeader from './CartInfoHeader';
import SaleTypeHeader from './SaleTypeHeader';
import Numpad from './Numpad';
import PaymentIcon from '@mui/icons-material/Payment';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import PrintIcon from '@mui/icons-material/Print';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CloseIcon from '@mui/icons-material/Close';
import MoneyIcon from '@mui/icons-material/Money';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Define all possible payment types
export type PaymentType = 'cash' | 'card' | 'multinet' | 'sodexo' | 'ticket' | 'setcard' | 'metropol' | 'avm_kupon' | 'cari_hesaba_kapanis' | 'kupon' | 'para_puan';

// Define the Payment interface
interface Payment {
  type: PaymentType;
  amount: number;
  timestamp: string;
}

interface SettlementModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderItems: OrderItem[];
  payments: Payment[];
  discount?: CartDiscount;
  tableId: string;
  checkDiscount?: number;
  productDiscount?: number;
  customerName?: string;
  onPayment: (type: PaymentType, amount: number) => void;
  orderNote?: string;
}

// Ödeme seçeneklerini gruplandırma
const paymentOptions = {
  mainOptions: [
    { key: 'cash', label: 'NAKİT', color: 'bg-gray-800 hover:bg-gray-700', text: 'text-white', icon: <MoneyIcon fontSize="large" />, description: 'Nakit ödeme' },
    { key: 'card', label: 'KREDİ KARTI', color: 'bg-gray-800 hover:bg-gray-700', text: 'text-white', icon: <CreditCardIcon fontSize="large" />, description: 'Kredi kartı ile ödeme' },
  ],
  mealTickets: [
    { key: 'multinet', label: 'MULTINET', color: 'bg-gray-700 hover:bg-gray-600', text: 'text-white', icon: <RestaurantIcon fontSize="medium" /> },
    { key: 'ticket', label: 'TICKET', color: 'bg-gray-700 hover:bg-gray-600', text: 'text-white', icon: <CardGiftcardIcon fontSize="medium" /> },
    { key: 'sodexo', label: 'SODEXO', color: 'bg-gray-700 hover:bg-gray-600', text: 'text-white', icon: <FastfoodIcon fontSize="medium" /> },
    { key: 'setcard', label: 'SETCARD', color: 'bg-gray-700 hover:bg-gray-600', text: 'text-white', icon: <LocalDiningIcon fontSize="medium" /> },
  ],
  other: [
    { key: 'metropol', label: 'METROPOL', color: 'bg-gray-600 hover:bg-gray-500', text: 'text-white', icon: <PaymentIcon fontSize="medium" /> },
    { key: 'avm_kupon', label: 'AVM KUPON', color: 'bg-gray-600 hover:bg-gray-500', text: 'text-white', icon: <ReceiptIcon fontSize="medium" /> },
    { key: 'cari_hesaba_kapanis', label: 'CARİ HESABA KAPANIŞ', color: 'bg-gray-600 hover:bg-gray-500', text: 'text-white', icon: <PrintIcon fontSize="medium" /> },
    { key: 'kupon', label: 'KUPON', color: 'bg-gray-600 hover:bg-gray-500', text: 'text-white', icon: <ReceiptIcon fontSize="medium" /> },
    { key: 'para_puan', label: 'PARA PUAN', color: 'bg-gray-600 hover:bg-gray-500', text: 'text-white', icon: <PaymentIcon fontSize="medium" /> },
  ]
};

const SettlementModal: React.FC<SettlementModalProps> = ({
  isOpen,
  onClose,
  orderItems,
  payments: initialPayments,
  discount,
  tableId,
  checkDiscount = 0,
  productDiscount = 0,
  customerName = '',
  onPayment,
  orderNote,
}) => {
  const [saleType, setSaleType] = useState<'Fişli Satış' | 'Faturalı Satış'>('Fişli Satış');
  const [productDiscounts, setProductDiscounts] = useState<{ [productId: string]: number }>({});
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const lastItemRef = useRef<HTMLDivElement>(null);
  const [showNumpad, setShowNumpad] = useState(false);
  const [selectedPaymentType, setSelectedPaymentType] = useState<PaymentType | null>(null);
  const [paymentAmount, setPaymentAmount] = useState('0');
  const [payments, setPayments] = useState<Payment[]>(initialPayments);

  const now = new Date();
  const formattedDate = now.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const formattedTime = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  
  const gelirMerkezi = 'Robotpos';
  const cekNo = '12590';
  const terminalNo = '1';
  const acilisSaati = formattedTime;

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

  // Calculate total paid amount
  const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);
  
  // Calculate remaining amount
  const remainingAmount = Math.max(0, netTotal - totalPaid);

  const handlePaymentClick = (type: PaymentType) => {
    setSelectedPaymentType(type);
    setPaymentAmount('0');
    setShowNumpad(true);
  };

  const handleNumpadInput = (value: string) => {
    if (value === 'backspace') {
      setPaymentAmount(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
      return;
    }

    // Handle decimal point
    if (value === '.') {
      if (paymentAmount.includes('.')) return;
      setPaymentAmount(prev => prev + '.');
      return;
    }

    // Update amount
    setPaymentAmount(prev => {
      if (prev === '0') return value;
      return prev + value;
    });
  };

  const handleAddPayment = () => {
    if (!selectedPaymentType) return;
    
    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) return;
    
    // Add payment to local state
    const newPayment: Payment = {
      type: selectedPaymentType,
      amount,
      timestamp: new Date().toISOString()
    };
    
    setPayments(prev => [...prev, newPayment]);
    
    // Reset numpad state
    setShowNumpad(false);
    setSelectedPaymentType(null);
    setPaymentAmount('0');
  };

  const handleRemovePayment = (index: number) => {
    setPayments(prev => prev.filter((_, i) => i !== index));
  };

  const handleCompletePayment = () => {
    // Send all payments to parent component
    payments.forEach(payment => {
      onPayment(payment.type, payment.amount);
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <div className="bg-gray-100 w-full h-full flex overflow-hidden max-h-[768px] max-w-[1024px] mx-auto">
        {/* Left side - Payment options */}
        <div className="w-3/5 flex flex-col p-3 overflow-auto">
          {showNumpad ? (
            <div className="flex flex-col h-full">
              <div className="bg-gray-800 text-white text-center py-2 mb-3 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold tracking-wide">
                  {selectedPaymentType === 'cash' && 'NAKİT ÖDEME'}
                  {selectedPaymentType === 'card' && 'KREDİ KARTI ÖDEME'}
                  {selectedPaymentType === 'multinet' && 'MULTINET ÖDEME'}
                  {selectedPaymentType === 'sodexo' && 'SODEXO ÖDEME'}
                  {selectedPaymentType === 'ticket' && 'TICKET ÖDEME'}
                  {selectedPaymentType === 'setcard' && 'SETCARD ÖDEME'}
                </h2>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-4 mb-3">
                <div className="text-right text-3xl font-bold p-3 mb-3 bg-gray-100 rounded-lg border border-gray-300">
                  {parseFloat(paymentAmount).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
                </div>
                
                <Numpad onInput={handleNumpadInput} />
                
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <button 
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg text-lg font-bold"
                    onClick={() => setShowNumpad(false)}
                  >
                    İptal
                  </button>
                  <button 
                    className="bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg text-lg font-bold"
                    onClick={handleAddPayment}
                  >
                    Ekle
                  </button>
                </div>
                
                {/* Kalan tutar butonu */}
                <button
                  className="w-full mt-4 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg text-lg font-bold"
                  onClick={() => setPaymentAmount(remainingAmount.toFixed(2))}
                >
                  Kalan Tutar: {remainingAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-gray-800 text-white text-center py-3 mb-3 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold tracking-wide">ÖDEME TİPİNİ SEÇİNİZ</h2>
              </div>
              
              {/* Main Payment Options - Nakit & Kredi Kartı side by side */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                {paymentOptions.mainOptions.map((option) => (
                  <button
                    key={option.key}
                    className={`${option.color} ${option.text} py-4 text-xl font-bold rounded-xl flex flex-col items-center justify-center transition-all transform hover:scale-105 shadow-lg`}
                    onClick={() => handlePaymentClick(option.key as PaymentType)}
                  >
                    <div className="mb-2 text-3xl">{option.icon}</div>
                    <span className="mb-1">{option.label}</span>
                    <span className="text-xs opacity-80">{option.description}</span>
                  </button>
                ))}
              </div>
              
              {/* Yemek Çekleri - Smaller buttons */}
              <div className="mb-3">
                <div className="bg-gray-800 text-white p-2 rounded-t-lg shadow-lg">
                  <h3 className="text-base font-bold text-center flex items-center justify-center">
                    <RestaurantIcon className="mr-1" fontSize="small" />
                    YEMEK ÇEKLERİ
                  </h3>
                </div>
                <div className="bg-white p-2 rounded-b-lg shadow-lg">
                  <div className="grid grid-cols-4 gap-2">
                    {paymentOptions.mealTickets.map((option) => (
                      <button
                        key={option.key}
                        className={`${option.color} ${option.text} py-2 text-sm font-bold rounded-lg flex flex-col items-center justify-center transition-all transform hover:scale-105 shadow-md`}
                        onClick={() => handlePaymentClick(option.key as PaymentType)}
                      >
                        <div className="mb-1">{option.icon}</div>
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Diğer Ödeme Yöntemleri */}
              <div className="mb-3 flex-1">
                <div className="bg-gray-800 text-white p-2 rounded-t-lg shadow-lg">
                  <h3 className="text-base font-bold text-center flex items-center justify-center">
                    <AccountBalanceWalletIcon className="mr-1" fontSize="small" />
                    DİĞER ÖDEME YÖNTEMLERİ
                  </h3>
                </div>
                <div className="bg-white p-2 rounded-b-lg shadow-lg">
                  <div className="grid grid-cols-3 gap-2">
                    {paymentOptions.other.map((option) => (
                      <button
                        key={option.key}
                        className={`${option.color} ${option.text} py-2 text-sm font-bold rounded-lg flex items-center justify-center transition-all hover:scale-105 shadow-md`}
                        onClick={() => handlePaymentClick(option.key as PaymentType)}
                      >
                        <div className="mr-1">{option.icon}</div>
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* Alınan Ödemeler */}
          <div className={`${showNumpad ? 'mt-auto' : ''}`}>
            <div className="bg-gray-800 text-white text-center py-1 rounded-t-lg shadow-lg flex items-center justify-center">
              <AttachMoneyIcon className="mr-1" fontSize="small" />
              <h3 className="text-sm font-bold tracking-wide">ALINAN ÖDEMELER</h3>
            </div>
            
            <div className="bg-white rounded-b-lg shadow-lg overflow-hidden">
              <div className="p-2 text-gray-800">
                {payments.length === 0 ? (
                  <div className="flex items-center justify-center py-2">
                    <span className="text-gray-400 text-center text-sm">Henüz ödeme alınmadı</span>
                  </div>
                ) : (
                  <div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {payments.map((payment, index) => {
                        // Payment type colors
                        let bgColor = "bg-gray-100";
                        let textColor = "text-gray-800";
                        let borderColor = "border-gray-300";
                        
                        if (payment.type === 'cash') {
                          bgColor = "bg-green-50";
                          textColor = "text-green-800";
                          borderColor = "border-green-200";
                        } else if (payment.type === 'card') {
                          bgColor = "bg-blue-50";
                          textColor = "text-blue-800";
                          borderColor = "border-blue-200";
                        } else if (['multinet', 'ticket', 'sodexo', 'setcard'].includes(payment.type)) {
                          bgColor = "bg-yellow-50";
                          textColor = "text-yellow-800";
                          borderColor = "border-yellow-200";
                        } else {
                          bgColor = "bg-purple-50";
                          textColor = "text-purple-800";
                          borderColor = "border-purple-200";
                        }
                        
                        return (
                          <div 
                            key={index} 
                            className={`flex items-center ${bgColor} ${textColor} px-2 py-1 rounded-full border ${borderColor} shadow-sm text-xs`}
                          >
                            <div className="flex items-center">
                              {payment.type === 'cash' && <MoneyIcon className="mr-1" fontSize="small" />}
                              {payment.type === 'card' && <CreditCardIcon className="mr-1" fontSize="small" />}
                              {payment.type === 'multinet' && <RestaurantIcon className="mr-1" fontSize="small" />}
                              {payment.type === 'sodexo' && <FastfoodIcon className="mr-1" fontSize="small" />}
                              {payment.type === 'ticket' && <CardGiftcardIcon className="mr-1" fontSize="small" />}
                              {payment.type === 'setcard' && <LocalDiningIcon className="mr-1" fontSize="small" />}
                              <span className="font-medium mr-1">{payment.type.toUpperCase()}</span>
                              <span className="font-bold">{payment.amount.toFixed(2)} ₺</span>
                            </div>
                            <button 
                              onClick={() => handleRemovePayment(index)}
                              className="ml-1 p-0.5 rounded-full hover:bg-white/50 text-red-500"
                              aria-label="Ödemeyi kaldır"
                            >
                              <DeleteOutlineIcon fontSize="small" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Order summary */}
        <div className="w-2/5 bg-white border-l border-gray-300 flex flex-col shadow-2xl overflow-auto">
          <div className="flex-1 overflow-auto p-3">
            {/* Fişli/Faturalı Satış başlığı */}
            <SaleTypeHeader
              saleType={saleType}
              setSaleType={setSaleType}
              serviceType="RESTORAN SATIŞ"
              onServiceTypeClick={() => {}}
            />
            
            {/* Üst bilgi */}
            <div className="bg-gray-100 rounded-lg p-2 mb-2 shadow-sm text-sm">
              <CartInfoHeader
                tableId={tableId}
                acilisSaati={acilisSaati}
                cekNo={cekNo}
                terminalNo={terminalNo}
              />
            </div>
            
            {/* Müşteri Adı */}
            {customerName && (
              <div className="bg-blue-100 border border-blue-200 p-2 mb-2 rounded-lg flex items-start max-w-full shadow-sm">
                <div className="bg-blue-500 text-white text-xs font-bold px-1 py-0.5 rounded mr-1 shrink-0">MÜŞTERİ</div>
                <span className="text-blue-800 text-xs font-medium break-words overflow-hidden">{customerName}</span>
              </div>
            )}
            
            {/* Sipariş notu */}
            {orderNote && (
              <div className="bg-yellow-100 border border-yellow-200 p-2 mb-2 rounded-lg flex items-start max-w-full shadow-sm">
                <div className="bg-yellow-500 text-white text-xs font-bold px-1 py-0.5 rounded mr-1 shrink-0">NOT</div>
                <span className="text-yellow-800 text-xs break-words overflow-hidden">{orderNote}</span>
              </div>
            )}
            
            {/* Cart Items */}
            <div className="bg-white rounded-lg shadow-sm mb-2 overflow-hidden border border-gray-200">
              <div className="p-1 bg-gray-50 border-b border-gray-200">
                <h3 className="font-semibold text-gray-700 text-sm">Sipariş Kalemleri</h3>
              </div>
              <div className="p-2 max-h-[calc(100vh-450px)] overflow-auto">
                <CartItemList
                  orderItems={orderItems}
                  selectedIndex={selectedIndex}
                  handleSelect={setSelectedIndex}
                  lastItemRef={lastItemRef}
                  productDiscounts={productDiscounts}
                  checkDiscount={checkDiscount}
                  setIsProductDiscountModalOpen={() => {}}
                  setIsProductMessageModalOpen={() => {}}
                  onIncrement={() => {}}
                  onDecrement={() => {}}
                />
              </div>
            </div>
          </div>
          
          {/* Toplam ve indirimler */}
          <div className="p-3 border-t border-gray-200 bg-gray-50">
            <div className="bg-white rounded-lg shadow-lg p-2">
              <CartSummary
                checkDiscount={checkDiscount}
                totalProductDiscount={totalProductDiscount}
                netTotal={netTotal}
              />
            </div>
          </div>
          
          {/* Footer with action buttons */}
          <div className="p-3 border-t border-gray-200 bg-gray-50 sticky bottom-0">
            <div className="grid grid-cols-2 gap-2">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg text-base font-bold flex items-center justify-center"
                onClick={onClose}
              >
                <ArrowBackIcon className="mr-1" fontSize="small" />
                Satış Ekranına Dön
              </button>
              
              <button
                className={`bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg text-base font-bold flex items-center justify-center ${totalPaid === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleCompletePayment}
                disabled={totalPaid === 0}
              >
                <PaymentIcon className="mr-1" fontSize="small" />
                Ödemeyi Tamamla
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettlementModal;
