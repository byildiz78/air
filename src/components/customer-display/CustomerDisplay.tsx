import React, { useState, useEffect, useMemo } from 'react';
import WelcomeScreen from './WelcomeScreen';
import OrderScreen from './OrderScreen';
import { OrderItem } from '../../types';
import { Video, loadVideos } from '../../utils/videoManager';
import { createDisplayChannel } from '../../utils/displayChannel';
import type { DisplayMessage } from '../../utils/displayChannel';

interface CustomerDisplayProps {
  orderItems?: OrderItem[];
  customerName?: string;
  orderNote?: string;
  checkDiscount?: number;
  productDiscount?: number;
  total?: number;
}

const CustomerDisplay: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [orderData, setOrderData] = useState<{
    orderItems: OrderItem[];
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
  } | null>(null);

  // Video verilerini yükle
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videoData = await loadVideos();
        setVideos(videoData);
      } catch (error) {
        console.error('Video yüklenirken hata oluştu:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();

    // Her 5 dakikada bir videoları yenile
    const refreshTimer = setInterval(() => {
      fetchVideos();
    }, 5 * 60 * 1000);

    return () => clearInterval(refreshTimer);
  }, []);

  // İletişim kanalını oluştur ve mesajları dinle
  useEffect(() => {
    // İletişim kanalını oluştur
    const channel = createDisplayChannel();
    
    // Mesajları dinle
    channel.onmessage = (event) => {
      const data = event.data as DisplayMessage;
      
      if (data.type === 'ORDER_UPDATE' && data.orderItems && data.orderItems.length > 0) {
        setOrderData({
          orderItems: data.orderItems,
          customerName: data.customerName,
          orderNote: data.orderNote,
          checkDiscount: data.checkDiscount,
          productDiscount: data.productDiscount,
          total: data.total || 0,
          paymentInfo: data.paymentInfo
        });
      } else if (data.type === 'PAYMENT_COMPLETE' && data.paymentInfo && orderData) {
        // Ödeme tamamlandığında, mevcut sipariş verisine ödeme bilgilerini ekle
        setOrderData({
          ...orderData,
          paymentInfo: data.paymentInfo
        });
      } else if (data.type === 'SHOW_WELCOME' || (data.type === 'ORDER_UPDATE' && (!data.orderItems || data.orderItems.length === 0))) {
        setOrderData(null);
      }
    };
    
    // Temizleme fonksiyonu
    return () => {
      channel.close();
    };
  }, [orderData]);

  // Müşteri ekranını sıfırla
  const handleResetCustomerDisplay = () => {
    setOrderData(null);
  };

  // Yükleme ekranı
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-xl text-blue-800 font-medium">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full h-full transition-all duration-500 ease-in-out">
        {orderData ? (
          <div className="animate-fade-in">
            <OrderScreen 
              orderData={orderData} 
              videos={videos} 
              onResetCustomerDisplay={handleResetCustomerDisplay}
            />
          </div>
        ) : (
          <div className="animate-fade-in">
            <WelcomeScreen videos={videos} />
          </div>
        )}
      </div>
    </div>
  );
};

// CSS animasyonları
const styles = `
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}
`;

export default CustomerDisplay;
