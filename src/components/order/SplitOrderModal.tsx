import React, { useState } from 'react';
import { X, Plus, Trash2, ArrowRight, ArrowLeft, Printer, CreditCard } from 'lucide-react';
import { OrderItem } from '../../types';

interface SplitOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderItems: OrderItem[];
  onSplitComplete: (splits: OrderItem[][]) => void;
}

const SplitOrderModal: React.FC<SplitOrderModalProps> = ({
  isOpen,
  onClose,
  orderItems,
  onSplitComplete,
}) => {
  // Bölünmüş sepetleri tutan state
  // İlk sepet orijinal sepet, diğerleri yeni sepetler
  const [splits, setSplits] = useState<OrderItem[][]>([
    [...orderItems], // Orijinal sepet
    [], // İlk yeni sepet
  ]);

  // Yeni boş sepet ekle
  const addNewCart = () => {
    setSplits([...splits, []]);
  };

  // Sepeti kaldır
  const removeCart = (index: number) => {
    if (index === 0 || splits.length <= 2) return; // Orijinal sepet ve ilk yeni sepet kaldırılamaz
    
    // Sepetteki ürünleri orijinal sepete geri aktar
    const itemsToReturn = [...splits[index]];
    
    const newSplits = splits.filter((_, i) => i !== index);
    newSplits[0] = [...newSplits[0], ...itemsToReturn];
    
    setSplits(newSplits);
  };

  // Ürünü bir sepetten diğerine taşı
  const moveItem = (itemId: string, fromCartIndex: number, toCartIndex: number) => {
    // Taşınacak ürünü bul
    const itemIndex = splits[fromCartIndex].findIndex(item => item.productId === itemId);
    if (itemIndex === -1) return;
    
    const item = splits[fromCartIndex][itemIndex];
    
    // Eğer ürün miktarı 1'den fazlaysa, miktarı azalt
    if (item.quantity > 1) {
      // Ürünün bir kopyasını oluştur ve miktarını 1 yap
      const newItem = { ...item, quantity: 1 };
      // Orijinal üründen 1 miktar azalt
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      
      // Sepetleri güncelle
      const newSplits = [...splits];
      newSplits[fromCartIndex] = [
        ...newSplits[fromCartIndex].slice(0, itemIndex),
        updatedItem,
        ...newSplits[fromCartIndex].slice(itemIndex + 1)
      ];
      
      // Hedef sepette aynı ürün var mı kontrol et
      const existingItemIndex = newSplits[toCartIndex].findIndex(i => i.productId === itemId);
      if (existingItemIndex !== -1) {
        // Varsa miktarını artır
        newSplits[toCartIndex] = [
          ...newSplits[toCartIndex].slice(0, existingItemIndex),
          {
            ...newSplits[toCartIndex][existingItemIndex],
            quantity: newSplits[toCartIndex][existingItemIndex].quantity + 1
          },
          ...newSplits[toCartIndex].slice(existingItemIndex + 1)
        ];
      } else {
        // Yoksa yeni ekle
        newSplits[toCartIndex] = [...newSplits[toCartIndex], newItem];
      }
      
      setSplits(newSplits);
    } else {
      // Ürün miktarı 1 ise, direkt taşı
      const newSplits = [...splits];
      newSplits[fromCartIndex] = newSplits[fromCartIndex].filter(i => i.productId !== itemId);
      
      // Hedef sepette aynı ürün var mı kontrol et
      const existingItemIndex = newSplits[toCartIndex].findIndex(i => i.productId === itemId);
      if (existingItemIndex !== -1) {
        // Varsa miktarını artır
        newSplits[toCartIndex] = [
          ...newSplits[toCartIndex].slice(0, existingItemIndex),
          {
            ...newSplits[toCartIndex][existingItemIndex],
            quantity: newSplits[toCartIndex][existingItemIndex].quantity + 1
          },
          ...newSplits[toCartIndex].slice(existingItemIndex + 1)
        ];
      } else {
        // Yoksa yeni ekle
        newSplits[toCartIndex] = [...newSplits[toCartIndex], item];
      }
      
      setSplits(newSplits);
    }
  };

  // Sepet toplamını hesapla
  const calculateCartTotal = (items: OrderItem[]) => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  // Bölme işlemini tamamla
  const handleComplete = () => {
    // Boş sepetleri filtrele
    const nonEmptySplits = splits.filter(cart => cart.length > 0);
    onSplitComplete(nonEmptySplits);
    onClose();
  };

  // Hesap yazdır
  const handlePrintBill = (index: number) => {
    console.log(`Çek ${index} için hesap yazdırılıyor...`);
    // Burada yazdırma işlemi yapılabilir
  };

  // Ödeme al
  const handleTakePayment = (index: number) => {
    console.log(`Çek ${index} için ödeme alınıyor...`);
    // Burada ödeme işlemi yapılabilir
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-hidden">
      <div className="bg-gray-100 w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-300 bg-white shadow-sm">
          <h2 className="text-xl font-bold text-gray-800">Siparişi Böl</h2>
          <div className="flex items-center gap-2">
            <div className="text-gray-600 text-sm">
              <span>Toplam Çek: {splits.filter(cart => cart.length > 0).length}</span>
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-3 bg-gray-50">
          <div className="flex flex-wrap gap-4">
            {/* Çekler */}
            {splits.map((cart, index) => (
              <div 
                key={index} 
                className="flex flex-col w-[300px] h-[calc(100vh-180px)] bg-white rounded-lg border border-gray-300 overflow-hidden shadow-sm"
              >
                {/* Çek Başlığı */}
                <div className="p-3 bg-blue-50 text-gray-800 font-bold flex justify-between items-center border-b border-gray-300">
                  <div className="flex items-center">
                    <span>{index === 0 ? 'Orijinal Çek' : `Yeni Çek ${index}`}</span>
                    <span className="ml-2 bg-blue-100 px-2 py-0.5 rounded-full text-xs text-blue-800">
                      {cart.length} ürün
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 px-2 py-0.5 rounded-full text-xs text-blue-800">
                      {calculateCartTotal(cart).toFixed(2)} ₺
                    </span>
                    {index > 0 && splits.length > 2 && (
                      <button 
                        onClick={() => removeCart(index)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded-full"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Çek İçeriği */}
                <div className="flex-1 overflow-auto p-2 bg-white">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                      <div className="text-3xl mb-2 opacity-30">🧾</div>
                      <div className="text-sm">Bu çek boş</div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {cart.map((item) => (
                        <div 
                          key={item.productId}
                          className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-300 hover:border-blue-400 cursor-pointer group transition-all hover:scale-[1.02] hover:shadow-md"
                          onClick={() => {
                            // Orijinal çekteki ürünlere tıklandığında sağdaki çeke taşı
                            if (index === 0 && splits.length > 1) {
                              moveItem(item.productId, 0, 1);
                            }
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 flex items-center justify-center bg-blue-100 rounded-full text-xs font-bold text-blue-800">
                              {item.quantity}
                            </span>
                            <span className="font-medium text-gray-800 text-sm truncate max-w-[140px]">{item.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-semibold text-gray-800 text-xs">{(item.price * item.quantity).toFixed(2)}</span>
                            
                            {/* Taşıma Butonları */}
                            <div className="flex">
                              {/* Sadece sağ ve sol ok butonları */}
                              {index > 0 && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Sol ok - bir önceki çeke taşı
                                    moveItem(item.productId, index, index - 1);
                                  }}
                                  className="p-1.5 rounded-full ml-1 text-green-600 bg-green-100"
                                  title="Önceki Çeke Taşı"
                                >
                                  <ArrowLeft size={20} />
                                </button>
                              )}
                              
                              {index < splits.length - 1 && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Sağ ok - bir sonraki çeke taşı
                                    moveItem(item.productId, index, index + 1);
                                  }}
                                  className="p-1.5 rounded-full ml-1 text-blue-600 bg-blue-100"
                                  title="Sonraki Çeke Taşı"
                                >
                                  <ArrowRight size={20} />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Çek Butonları */}
                {cart.length > 0 && (
                  <div className="p-2 border-t border-gray-300 bg-gray-50 flex gap-2">
                    <button 
                      onClick={() => handlePrintBill(index)}
                      className="flex-1 flex items-center justify-center gap-1 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition-colors"
                    >
                      <Printer size={14} />
                      <span className="text-xs font-medium">Hesap Yazdır</span>
                    </button>
                    <button 
                      onClick={() => handleTakePayment(index)}
                      className="flex-1 flex items-center justify-center gap-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
                    >
                      <CreditCard size={14} />
                      <span className="text-xs font-medium">Ödeme Al</span>
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Yeni Çek Ekleme Butonu */}
            <div className="flex items-center justify-center w-[300px] h-[calc(100vh-180px)] bg-white/50 rounded-lg border border-gray-300 border-dashed">
              <button 
                onClick={addNewCart}
                className="flex flex-col items-center justify-center p-4 rounded-lg bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-colors shadow-sm"
              >
                <Plus size={32} className="mb-2" />
                <span>Yeni Çek Ekle</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-300 flex justify-between items-center bg-white">
          <div className="text-sm text-gray-600">
            <span>Ürünlere tıklayarak çekler arasında taşıyabilirsiniz</span>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              İptal
            </button>
            <button 
              onClick={handleComplete}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Bölmeyi Tamamla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplitOrderModal;
