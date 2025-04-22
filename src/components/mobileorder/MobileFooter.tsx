'use client';

import React, { useState } from 'react';
import { ShoppingCart, Grid, Printer, Receipt, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import TableOperationsModal from './TableOperationsModal';

interface MobileFooterProps {
  showCart: boolean;
  onToggleCart: () => void;
  itemCount: number;
  totalAmount: number;
  onSendToKitchen?: () => void;
}

const MobileFooter: React.FC<MobileFooterProps> = ({
  showCart,
  onToggleCart,
  itemCount,
  totalAmount,
  onSendToKitchen = () => console.log('Send to kitchen'),
}) => {
  const router = useRouter();
  const [isTableOperationsOpen, setIsTableOperationsOpen] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [printingComplete, setPrintingComplete] = useState(false);
  const [sendingComplete, setSendingComplete] = useState(false);

  const handleChangeTable = () => {
    setIsTableOperationsOpen(false);
    // Add implementation for changing table
    console.log('Change table action');
  };

  const handleChangeWaiter = () => {
    setIsTableOperationsOpen(false);
    // Add implementation for changing waiter
    console.log('Change waiter action');
  };

  const handleSplitTable = () => {
    setIsTableOperationsOpen(false);
    // Add implementation for splitting table
    console.log('Split table action');
  };

  const handleMergeTables = () => {
    setIsTableOperationsOpen(false);
    // Add implementation for merging tables
    console.log('Merge tables action');
  };

  const handlePrintBill = () => {
    if (isPrinting) return;
    
    // Dokunuş geri bildirimini iyileştirmek için hemen görsel değişiklik
    setIsPrinting(true);
    
    // Küçük bir gecikme ile işlemi başlat
    setTimeout(() => {
      // First phase - printing
      setTimeout(() => {
        setPrintingComplete(true);
        
        // Second phase - show success and redirect
        setTimeout(() => {
          setIsPrinting(false);
          setPrintingComplete(false);
          // Navigate back to table selection
          router.push('/mobileorder');
        }, 1000);
      }, 1000);
    }, 50);
  };

  const handleSendToKitchen = () => {
    if (isSending) return;
    
    // Dokunuş geri bildirimini iyileştirmek için hemen görsel değişiklik
    setIsSending(true);
    
    // Küçük bir gecikme ile onSendToKitchen fonksiyonunu çağır
    // Bu, kullanıcıya dokunuşun algılandığını gösterir
    setTimeout(() => {
      // Call the onSendToKitchen function if provided
      if (onSendToKitchen) {
        onSendToKitchen();
      }
      
      // First phase - sending
      setTimeout(() => {
        setSendingComplete(true);
        
        // Second phase - show success and redirect
        setTimeout(() => {
          setIsSending(false);
          setSendingComplete(false);
          // Navigate back to table selection
          router.push('/mobileorder');
        }, 1000);
      }, 1000);
    }, 50);
  };

  return (
    <>
      <div className="bg-white border-t border-gray-200 shadow-lg">
        {/* Total Amount Display */}
        <div className="px-4 py-2 flex justify-between items-center bg-gray-50 border-b border-gray-200">
          <span className="text-gray-600 font-medium">Toplam</span>
          <span className="text-lg font-bold text-blue-600">{totalAmount.toFixed(2)} ₺</span>
        </div>
        
        {/* Action Buttons */}
        <div className="grid grid-cols-5 divide-x divide-gray-200">
          <motion.button
            className={`flex flex-col items-center justify-center py-3 px-1 ${showCart ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
            onClick={onToggleCart}
            whileTap={{ scale: 0.95 }}
            style={{ touchAction: "manipulation" }}
            aria-label="Ürünler"
          >
            <Grid size={20} />
            <span className="text-xs mt-1 font-medium">Ürünler</span>
          </motion.button>
          
          <motion.button
            className="flex flex-col items-center justify-center py-3 px-1 text-gray-600"
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsTableOperationsOpen(true)}
            style={{ touchAction: "manipulation" }}
            aria-label="İşlemler"
          >
            <Receipt size={20} />
            <span className="text-xs mt-1 font-medium">İşlemler</span>
          </motion.button>
          
          <motion.button
            className={`flex flex-col items-center justify-center py-3 px-1 relative ${!showCart ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
            onClick={onToggleCart}
            whileTap={{ scale: 0.95 }}
            style={{ touchAction: "manipulation" }}
            aria-label="Sepet"
          >
            <ShoppingCart size={20} />
            <span className="text-xs mt-1 font-medium">Sepet</span>
            {itemCount > 0 && (
              <motion.div 
                className="absolute top-1 right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                {itemCount}
              </motion.div>
            )}
          </motion.button>
          
          <motion.button
            className="flex flex-col items-center justify-center py-3 px-1 text-gray-600 relative overflow-hidden"
            whileTap={{ scale: 0.95 }}
            onClick={handlePrintBill}
            disabled={isPrinting}
            style={{ touchAction: "manipulation" }}
            aria-label="Hesap"
          >
            <AnimatePresence mode="wait">
              {printingComplete ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  <CheckCircle2 size={20} className="text-blue-600" />
                </motion.div>
              ) : (
                <motion.div
                  key="printer"
                  animate={isPrinting ? { 
                    scale: [1, 1.2], 
                    rotate: [-5, 5],
                    color: ['#4B5563', '#2563EB']
                  } : {}}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse",
                    duration: 1,
                    ease: "easeInOut"
                  }}
                >
                  <Printer size={20} />
                </motion.div>
              )}
            </AnimatePresence>
            <span className="text-xs mt-1 font-medium">Hesap</span>
            {isPrinting && !printingComplete && (
              <>
                <motion.div 
                  className="absolute inset-0 bg-blue-100 opacity-30"
                  initial={{ y: '100%' }}
                  animate={{ y: '-100%' }}
                  transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-0 bg-blue-50 opacity-20"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.5 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{ borderRadius: '50%', transformOrigin: 'center' }}
                />
              </>
            )}
          </motion.button>
          
          <motion.button
            className="flex flex-col items-center justify-center py-3 px-1 text-green-600 relative overflow-hidden"
            whileTap={{ scale: 0.95 }}
            onClick={handleSendToKitchen}
            disabled={isSending}
            style={{ touchAction: "manipulation" }}
            aria-label="Mutfağa"
          >
            <AnimatePresence mode="wait">
              {sendingComplete ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  <CheckCircle2 size={20} className="text-green-600" />
                </motion.div>
              ) : (
                <motion.div
                  key="send"
                  animate={isSending ? { 
                    scale: [1, 1.2], 
                    x: [0, 3],
                    color: ['#059669', '#10B981']
                  } : {}}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse",
                    duration: 0.8,
                    ease: "easeInOut"
                  }}
                >
                  <Send size={20} />
                </motion.div>
              )}
            </AnimatePresence>
            <span className="text-xs mt-1 font-medium">Mutfağa</span>
            {isSending && !sendingComplete && (
              <>
                <motion.div 
                  className="absolute inset-0 bg-green-100 opacity-30"
                  initial={{ y: '100%' }}
                  animate={{ y: '-100%' }}
                  transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-0 bg-green-50 opacity-20"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.5 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{ borderRadius: '50%', transformOrigin: 'center' }}
                />
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Table Operations Modal */}
      <TableOperationsModal 
        isOpen={isTableOperationsOpen}
        onClose={() => setIsTableOperationsOpen(false)}
        onChangeTable={handleChangeTable}
        onChangeWaiter={handleChangeWaiter}
        onSplitTable={handleSplitTable}
        onMergeTables={handleMergeTables}
      />

      {/* Printing/Sending Feedback */}
      <AnimatePresence>
        {isPrinting && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 500 }}
            >
              {printingComplete ? (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15, stiffness: 200 }}
                  >
                    <CheckCircle2 size={50} className="text-blue-600 mb-3" />
                  </motion.div>
                  <p className="text-lg font-bold">Hesap Yazdırıldı!</p>
                </>
              ) : (
                <>
                  <div className="relative">
                    <Printer size={50} className="text-blue-600 mb-3" />
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{ 
                        opacity: [0, 1],
                        y: [0, -10]
                      }}
                      transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
                    >
                      <div className="w-1 h-10 bg-blue-600 rounded-full" />
                    </motion.div>
                  </div>
                  <p className="text-lg font-bold">Hesap Yazdırılıyor...</p>
                  <div className="mt-3 flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-blue-600 rounded-full"
                        animate={{ y: [0, -5] }}
                        transition={{ 
                          repeat: Infinity, 
                          repeatType: "reverse",
                          duration: 0.6,
                          delay: i * 0.2,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}

        {isSending && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 500 }}
            >
              {sendingComplete ? (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15, stiffness: 200 }}
                  >
                    <CheckCircle2 size={50} className="text-green-600 mb-3" />
                  </motion.div>
                  <p className="text-lg font-bold">Mutfağa Gönderildi!</p>
                </>
              ) : (
                <>
                  <div className="relative">
                    <Send size={50} className="text-green-600 mb-3" />
                    <motion.div
                      className="absolute inset-0"
                      animate={{ 
                        x: [0, 10],
                        opacity: [1, 0]
                      }}
                      transition={{ repeat: Infinity, duration: 1.2 }}
                    >
                      <div className="w-10 h-1 bg-green-600 rounded-full transform -rotate-45 translate-x-5 translate-y-6" />
                    </motion.div>
                  </div>
                  <p className="text-lg font-bold">Mutfağa Gönderiliyor...</p>
                  <div className="mt-3 flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-green-600 rounded-full"
                        animate={{ y: [0, -5] }}
                        transition={{ 
                          repeat: Infinity, 
                          repeatType: "reverse",
                          duration: 0.6,
                          delay: i * 0.2,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileFooter;
