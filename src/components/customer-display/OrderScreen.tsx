import React, { useState, useEffect, useRef, useMemo } from 'react';
import { OrderItem } from '../../types';
import { Video } from '../../utils/videoManager';

// Combo menü tipleri
interface ComboOption {
  id: string;
  name: string;
}

interface ComboItem {
  id: string;
  name: string;
  options?: ComboOption[];
}

// OrderItem tipini genişlet
interface ExtendedOrderItem extends OrderItem {
  comboItems?: ComboItem[];
  comboSelections?: {
    mainItem: ComboItem | null;
    side: ComboItem | null;
    drink: ComboItem | null;
  };
}

interface OrderData {
  orderItems: ExtendedOrderItem[];
  customerName?: string;
  orderNote?: string;
  checkDiscount?: number;
  productDiscount?: number;
  total: number;
  paymentInfo?: {
    paidAmount: number;
    changeAmount: number;
    paymentMethod: string;
  };
}

interface OrderScreenProps {
  orderData: OrderData | null;
  videos: Video[];
  onResetCustomerDisplay?: () => void;
}

const OrderScreen: React.FC<OrderScreenProps> = ({ orderData, videos, onResetCustomerDisplay }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [animateItems, setAnimateItems] = useState(false);
  const orderListRef = useRef<HTMLDivElement>(null);
  const lastItemRef = useRef<HTMLDivElement>(null);
  const prevOrderItemsLength = useRef<number>(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Saat güncellemesi
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Video değiştirme - sadece videos değiştiğinde çalışır
  useEffect(() => {
    if (videos.length === 0) return;
    
    // İlk video indeksini ayarla
    setCurrentVideoIndex(0);
    
    const videoTimer = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    }, 300000); // Her 5 dakikada bir video değiştir (süreyi uzattık)

    return () => clearInterval(videoTimer);
  }, [videos]); // Sadece videos değiştiğinde çalışır

  // Ürün animasyonları için
  useEffect(() => {
    if (orderData) {
      // Ürünlerin animasyonla görünmesi için kısa bir gecikme
      setTimeout(() => {
        setAnimateItems(true);
      }, 300);
    }
    return () => setAnimateItems(false);
  }, [orderData]);

  // Son eklenen ürüne scroll yapma
  useEffect(() => {
    if (!orderData) return;
    
    const currentLength = orderData.orderItems.length;
    
    // Yeni ürün eklendiyse
    if (currentLength > prevOrderItemsLength.current && lastItemRef.current) {
      // Son eklenen ürüne scroll yap
      lastItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Son eklenen ürünü vurgula
      lastItemRef.current.classList.add('highlight-item');
      
      // Vurgulamayı kaldır
      setTimeout(() => {
        if (lastItemRef.current) {
          lastItemRef.current.classList.remove('highlight-item');
        }
      }, 2000);
    }
    
    // Önceki uzunluğu güncelle
    prevOrderItemsLength.current = currentLength;
  }, [orderData?.orderItems.length]);

  // Ödeme bilgisi geldiğinde modal'ı göster
  useEffect(() => {
    if (orderData?.paymentInfo) {
      setShowPaymentModal(true);
      
      // 5 saniye sonra ekranı sıfırla
      const timer = setTimeout(() => {
        setShowPaymentModal(false);
        if (onResetCustomerDisplay) {
          onResetCustomerDisplay();
        }
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [orderData?.paymentInfo, onResetCustomerDisplay]);

  if (!orderData) {
    return <div className="flex items-center justify-center h-full">Sipariş bilgisi yükleniyor...</div>;
  }

  const { orderItems, customerName, orderNote, checkDiscount, productDiscount, total, paymentInfo } = orderData;

  // Toplam hesaplama
  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalDiscount = (checkDiscount || 0) + (productDiscount || 0);
  const finalTotal = subtotal - totalDiscount;

  // Tarih formatı
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    return date.toLocaleDateString('tr-TR', options);
  };

  // Mevcut videoyu useMemo ile hesapla - gereksiz yeniden render'ları önler
  const currentVideo = useMemo(() => {
    if (videos.length === 0) {
      return {
        id: 'default',
        title: 'Tanıtım Videosu',
        url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        isYoutube: false
      };
    }
    return videos[currentVideoIndex];
  }, [videos, currentVideoIndex]);

  // Video oynatıcı bileşeni - useMemo ile optimize edildi
  const VideoPlayer = useMemo(() => {
    if (currentVideo.isYoutube) {
      // YouTube videosu için sabit bir URL oluştur
      const embedUrl = `${currentVideo.url}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1`;
      
      return (
        <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            ref={iframeRef}
            src={embedUrl}
            className="w-full h-full rounded-2xl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={currentVideo.title}
            frameBorder="0"
          ></iframe>
        </div>
      );
    } else {
      return (
        <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-2xl">
          <video 
            ref={videoRef}
            src={currentVideo.url}
            className="w-full h-full object-cover rounded-2xl"
            autoPlay
            muted
            loop
            playsInline
            onError={(e) => {
              const target = e.target as HTMLVideoElement;
              target.style.display = 'none';
              const errorDiv = document.createElement('div');
              errorDiv.className = 'w-full h-full flex items-center justify-center bg-gray-900 text-white text-xl rounded-2xl';
              errorDiv.textContent = 'Video oynatılamıyor';
              target.parentNode?.appendChild(errorDiv);
            }}
          />
        </div>
      );
    }
  }, [currentVideo]); // Sadece currentVideo değiştiğinde yeniden render edilir

  // Combo menü içeriğini görüntülemek için yardımcı fonksiyon
  const renderComboDetails = (item: ExtendedOrderItem) => {
    // Combo seçimleri varsa onları göster
    if (item.comboSelections) {
      const { mainItem, side, drink } = item.comboSelections;
      return (
        <div className="ml-4 mt-1 space-y-1">
          {mainItem && (
            <div className="flex items-center text-xs text-gray-600">
              <div className="w-1 h-1 bg-blue-400 rounded-full mr-2"></div>
              <span>Ana Ürün: {mainItem.name}</span>
            </div>
          )}
          {side && (
            <div className="flex items-center text-xs text-gray-600">
              <div className="w-1 h-1 bg-green-400 rounded-full mr-2"></div>
              <span>Yan Ürün: {side.name}</span>
            </div>
          )}
          {drink && (
            <div className="flex items-center text-xs text-gray-600">
              <div className="w-1 h-1 bg-amber-400 rounded-full mr-2"></div>
              <span>İçecek: {drink.name}</span>
            </div>
          )}
        </div>
      );
    }
    
    // Eski tip combo ürünleri için
    if (item.comboItems && item.comboItems.length > 0) {
      return (
        <div className="ml-4 mt-1 space-y-1">
          {item.comboItems.map((comboItem, idx) => (
            <div key={idx} className="flex items-center text-xs text-gray-600">
              <div className="w-1 h-1 bg-blue-400 rounded-full mr-2"></div>
              <span>{comboItem.name}</span>
              {comboItem.options && comboItem.options.length > 0 && (
                <span className="ml-1 text-gray-500">
                  ({comboItem.options.map(opt => opt.name).join(', ')})
                </span>
              )}
            </div>
          ))}
        </div>
      );
    }
    
    return null;
  };

  // Sabit yükseklik değerleri
  const HEADER_HEIGHT = 50; // Başlık yüksekliği
  const CUSTOMER_INFO_HEIGHT = 70; // Müşteri bilgisi yüksekliği (varsa)
  const FOOTER_HEIGHT = 40; // Alt bilgi yüksekliği
  const TOTALS_HEIGHT = 120; // Toplam bilgisi yüksekliği

  // Toplam alt kısım yüksekliği
  const BOTTOM_SECTION_HEIGHT = TOTALS_HEIGHT + FOOTER_HEIGHT + 10; // 10px for margins

  return (
    <div className="flex h-full bg-gradient-to-br from-gray-50 to-gray-100 max-h-screen" style={{ maxWidth: '1024px', margin: '0 auto' }}>
      {/* Para Üstü Modalı */}
      {showPaymentModal && paymentInfo && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-md animate-fade-in"></div>
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-4/5 max-w-2xl z-10 animate-scale-in">
            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-3">Ödeme Tamamlandı</h2>
              <p className="text-xl text-gray-600 mb-8">Teşekkür ederiz!</p>
              
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl text-gray-600">Ödeme Yöntemi:</span>
                  <span className="text-xl font-semibold text-gray-800">{paymentInfo.paymentMethod}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl text-gray-600">Ödenen Tutar:</span>
                  <span className="text-xl font-semibold text-gray-800">{paymentInfo.paidAmount.toFixed(2)} ₺</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t-2 border-gray-200">
                  <span className="text-2xl font-medium text-gray-700">Para Üstü:</span>
                  <span className="text-4xl font-bold text-green-600 animate-pulse-subtle">{paymentInfo.changeAmount.toFixed(2)} ₺</span>
                </div>
              </div>
              
              <p className="text-lg text-gray-500">Bu ekran otomatik olarak kapanacaktır.</p>
            </div>
          </div>
        </div>
      )}

      {/* Sol Kısım - Sipariş Bilgileri */}
      <div className="w-1/2 h-full p-2 relative">
        {/* Başlık */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-xl shadow-lg mb-2 animate-fade-in" style={{ height: `${HEADER_HEIGHT}px` }}>
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center">
              <div className="w-1 h-8 bg-white rounded-full mr-2"></div>
              <h1 className="text-xl font-bold">SİPARİŞİNİZ</h1>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-80">{formatDate(currentTime)}</p>
              <p className="text-lg font-bold">{currentTime.toLocaleTimeString('tr-TR')}</p>
            </div>
          </div>
        </div>

        {/* Müşteri Bilgisi ve Sipariş Notu - Daha kompakt */}
        {(customerName || orderNote) && (
          <div className="flex flex-col space-y-1 mb-2 animate-fade-in">
            {customerName && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-1.5 rounded-lg border-l-4 border-blue-500 shadow-sm">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <p className="text-blue-800 text-sm">
                    <span className="font-bold">Müşteri:</span> {customerName}
                  </p>
                </div>
              </div>
            )}

            {orderNote && (
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-1.5 rounded-lg border-l-4 border-yellow-500 shadow-sm">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-yellow-600 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <p className="text-yellow-800 text-sm">
                    <span className="font-bold">Not:</span> {orderNote}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Sipariş İçeriği - Scrollable */}
        <div 
          className="animate-fade-in" 
          style={{ 
            height: `calc(100vh - ${HEADER_HEIGHT + (customerName || orderNote ? CUSTOMER_INFO_HEIGHT : 0) + BOTTOM_SECTION_HEIGHT + 20}px)` 
          }}
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col h-full">
            {/* Sabit başlık */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-1.5 border-b border-gray-200 z-10 flex-shrink-0">
              <div className="flex justify-between items-center text-gray-700 font-semibold text-sm">
                <div className="w-1/2 text-left">Ürün</div>
                <div className="w-1/6 text-center">Adet</div>
                <div className="w-1/6 text-right">Fiyat</div>
                <div className="w-1/6 text-right">Toplam</div>
              </div>
            </div>
            
            {/* Kaydırılabilir içerik */}
            <div 
              ref={orderListRef}
              className="overflow-y-auto flex-grow"
            >
              <div className="divide-y divide-gray-100">
                {orderItems.map((item, index) => (
                  <div 
                    key={`${item.productId}-${index}`} 
                    ref={index === orderItems.length - 1 ? lastItemRef : null}
                    className={`flex flex-col p-1.5 hover:bg-blue-50 transition-all duration-200 ${
                      animateItems ? 'animate-fade-in-right' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${Math.min(index, 5) * 50}ms` }}
                  >
                    <div className="flex items-center w-full">
                      <div className="w-1/2 font-medium text-gray-800 flex items-center text-sm">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5 flex-shrink-0"></div>
                        <span className="truncate">{item.name}</span>
                      </div>
                      <div className="w-1/6 text-center">
                        <span className="inline-block px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded-md font-medium text-sm">
                          {item.quantity} x
                        </span>
                      </div>
                      <div className="w-1/6 text-right text-gray-600 text-sm">{item.price.toFixed(2)} ₺</div>
                      <div className="w-1/6 text-right font-bold text-blue-700 text-sm">{(item.price * item.quantity).toFixed(2)} ₺</div>
                    </div>
                    
                    {/* Combo menü detayları */}
                    {renderComboDetails(item)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Toplam Bilgisi - Sabit Alt Kısım */}
        <div className="absolute bottom-2 left-2 right-2">
          <div className="bg-white rounded-xl shadow-lg p-2 border border-gray-100 animate-fade-in-up" style={{ height: `${TOTALS_HEIGHT}px` }}>
            <div className="flex justify-end">
              <div className="w-48">
                <div className="flex justify-between py-1 text-gray-600 text-sm">
                  <span>Ara Toplam:</span>
                  <span className="font-medium">{subtotal.toFixed(2)} ₺</span>
                </div>
                
                {totalDiscount > 0 && (
                  <div className="flex justify-between py-1 text-red-600 text-sm">
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z" clipRule="evenodd" />
                      </svg>
                      İndirim:
                    </span>
                    <span className="font-medium">-{totalDiscount.toFixed(2)} ₺</span>
                  </div>
                )}
                
                <div className="flex justify-between py-2 border-t border-gray-200 mt-1">
                  <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">TOPLAM:</span>
                  <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{finalTotal.toFixed(2)} ₺</span>
                </div>
              </div>
            </div>
          </div>

          {/* Alt Bilgi */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-1.5 rounded-xl shadow-lg mt-1 text-center animate-fade-in" style={{ height: `${FOOTER_HEIGHT}px` }}>
            <p className="text-sm font-medium">Afiyet olsun! Teşekkür ederiz.</p>
          </div>
        </div>
      </div>

      {/* Sağ Kısım - Video Oynatıcı */}
      <div className="w-1/2 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-3">
        <div className="w-full h-full relative animate-fade-in">
          {VideoPlayer}
          <div className="absolute bottom-3 left-3 right-3 bg-gradient-to-r from-black/80 to-black/60 backdrop-blur-md text-white p-2 rounded-lg">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-1.5 animate-pulse"></div>
              <p className="text-sm font-medium truncate">{currentVideo.title}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// CSS için animasyon sınıfları
const styles = `
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-in-up {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-right {
  from { 
    opacity: 0;
    transform: translateX(-20px);
  }
  to { 
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes highlight-pulse {
  0% { background-color: rgba(59, 130, 246, 0.1); }
  50% { background-color: rgba(59, 130, 246, 0.2); }
  100% { background-color: transparent; }
}

@keyframes scale-in {
  from { 
    opacity: 0;
    transform: scale(0.95);
  }
  to { 
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes pulse-subtle {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out forwards;
}

.animate-fade-in-right {
  animation: fade-in-right 0.5s ease-out forwards;
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out forwards;
}

.animate-pulse-subtle {
  animation: pulse-subtle 2s infinite ease-in-out;
}

.highlight-item {
  animation: highlight-pulse 2s ease-out;
}
`;

export default OrderScreen;
