import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Video } from '../../utils/videoManager';

// Modern promosyon verileri
const promotions = [
  {
    id: 1,
    title: 'Günün Özel Menüsü',
    description: 'İki kişilik menü siparişlerinizde %20 indirim fırsatı',
    icon: '🍽️'
  },
  {
    id: 2,
    title: 'Tatlı Hediyesi',
    description: '150₺ üzeri siparişlerde bir tatlı ikramımız',
    icon: '🍰'
  },
  {
    id: 3,
    title: 'Hafta Sonu Keyfi',
    description: 'Cumartesi ve Pazar günleri tüm içeceklerde %25 indirim',
    icon: '🥂'
  },
  {
    id: 4,
    title: 'Doğum Günü Sürprizi',
    description: 'Doğum gününüzde size özel %30 indirim',
    icon: '🎂'
  }
];

interface WelcomeScreenProps {
  videos: Video[];
  restaurantName?: string;
  restaurantLogo?: string;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ 
  videos, 
  restaurantName = "GUSTO", 
  restaurantLogo = "/logo.png" 
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentPromotion, setCurrentPromotion] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [weatherInfo, setWeatherInfo] = useState({ temp: '22°', condition: 'Güneşli', icon: '☀️' });
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const promotionRef = useRef<HTMLDivElement>(null);
  
  // Yeni stilleri CSS'e ekle
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  // Saat güncellemesi
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Promosyon slider efekti
  useEffect(() => {
    const slider = setInterval(() => {
      if (promotionRef.current) {
        promotionRef.current.classList.add('opacity-0', 'transform', 'translate-y-4');
        
        setTimeout(() => {
          setCurrentPromotion((prev) => (prev + 1) % promotions.length);
          
          setTimeout(() => {
            if (promotionRef.current) {
              promotionRef.current.classList.remove('opacity-0', 'transform', 'translate-y-4');
            }
          }, 50);
        }, 300);
      }
    }, 8000);

    return () => clearInterval(slider);
  }, []);

  // Video değiştirme
  useEffect(() => {
    if (videos.length === 0) return;
    
    setCurrentVideoIndex(0);
    
    const videoTimer = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    }, 300000); // Her 5 dakikada bir video değişimi

    return () => clearInterval(videoTimer);
  }, [videos]);

  // Tarih formatı
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    };
    return date.toLocaleDateString('tr-TR', options);
  };

  // Saat formatı
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('tr-TR', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  // Mevcut videoyu useMemo ile hesapla
  const currentVideo = useMemo(() => {
    if (videos.length === 0) {
      return {
        id: 'default',
        title: 'Restoran Tanıtım Videosu',
        url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        isYoutube: false
      };
    }
    return videos[currentVideoIndex];
  }, [videos, currentVideoIndex]);

  // Video oynatıcı bileşeni
  const VideoPlayer = useMemo(() => {
    if (currentVideo.isYoutube) {
      const embedUrl = `${currentVideo.url}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1`;
      
      return (
        <div className="w-full h-full relative rounded-3xl overflow-hidden shadow-2xl">
          <iframe
            ref={iframeRef}
            src={embedUrl}
            className="w-full h-full rounded-3xl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={currentVideo.title}
            frameBorder="0"
          ></iframe>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
        </div>
      );
    } else {
      return (
        <div className="w-full h-full relative rounded-3xl overflow-hidden shadow-2xl">
          <video 
            ref={videoRef}
            src={currentVideo.url}
            className="w-full h-full object-cover rounded-3xl"
            autoPlay
            muted
            loop
            playsInline
            onError={(e) => {
              const target = e.target as HTMLVideoElement;
              target.style.display = 'none';
              const errorDiv = document.createElement('div');
              errorDiv.className = 'w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white text-xl rounded-3xl';
              errorDiv.textContent = 'Video oynatılamıyor';
              target.parentNode?.appendChild(errorDiv);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
        </div>
      );
    }
  }, [currentVideo]);

  return (
    <div className="flex h-full bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 text-white overflow-hidden">
      {/* Arkaplan Animasyonu */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
          <div className="absolute -bottom-32 right-0 w-96 h-96 bg-teal-600/20 rounded-full blur-3xl animate-blob animation-delay-6000"></div>
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="relative w-full flex flex-col lg:flex-row z-10 p-6 gap-6">
        {/* Sol Bölüm - Karşılama ve Bilgiler */}
        <div className="w-full lg:w-1/2 flex flex-col space-y-6">
          {/* Üst Kısım - Logo ve Karşılama */}
          <div className="flex flex-col items-center justify-center text-center bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-glass">
            <div className="relative mb-4">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative h-24 w-24 bg-gradient-to-r from-purple-500 to-blue-500 p-1 rounded-full shadow-xl">
                <div className="bg-black/20 backdrop-blur-sm h-full w-full rounded-full flex items-center justify-center">
                  <img 
                    src={restaurantLogo} 
                    alt="Restoran Logo" 
                    className="w-16 h-16 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItY29mZmVlIj48cGF0aCBkPSJNMTggOGgtMXYtMmMwLTEuMS0uOS0yLTItMkg4Yy0xLjEgMC0yIC45LTIgMnYyaC0xYy0xLjEgMC0yIC45LTIgMnYxYzAgMS4xLjkgMiAyIDJoMXY1YzAgMS4xLjkgMiAyIDJoMTBjMS4xIDAgMi0uOSAyLTJ2LTVoMWMxLjEgMCAyLS45IDItMnYtMWMwLTEuMS0uOS0yLTItMnoiPjwvcGF0aD48bGluZSB4MT0iNiIgeTE9IjEiIHgyPSI2IiB5Mj0iNCIgLz48bGluZSB4MT0iMTAiIHkxPSIxIiB4Mj0iMTAiIHkyPSI0IiAvPjxsaW5lIHgxPSIxNCIgeTE9IjEiIHgyPSIxNCIgeTI9IjQiIC8+PC9zdmc+';
                    }}
                  />
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              HOŞGELDİNİZ
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full my-3"></div>
            <h2 className="text-2xl font-bold text-white">{restaurantName}</h2>
          </div>

          {/* Orta Kısım - Promosyonlar */}
          <div 
            ref={promotionRef}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-glass transition-all duration-300 ease-in-out flex-grow"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white text-2xl">
                {promotions[currentPromotion].icon}
              </div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                {promotions[currentPromotion].title}
              </h3>
            </div>
            <p className="text-xl text-white/90 leading-relaxed">
              {promotions[currentPromotion].description}
            </p>
            <div className="mt-4 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-full relative">
              <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-full animate-progress"></div>
            </div>
          </div>

          {/* Alt Kısım - Tarih, Saat ve Hava Durumu */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-5 shadow-glass">
              <p className="text-sm font-medium text-blue-300 mb-1">TARİH</p>
              <p className="text-lg font-medium text-white">{formatDate(currentTime)}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-5 shadow-glass">
              <p className="text-sm font-medium text-purple-300 mb-1">SAAT</p>
              <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                {formatTime(currentTime)}
              </p>
            </div>
            <div className="col-span-2 bg-white/10 backdrop-blur-lg rounded-3xl p-5 shadow-glass flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-teal-300 mb-1">BUGÜN</p>
                <p className="text-lg text-white">{weatherInfo.condition}</p>
              </div>
              <div className="flex items-center">
                <span className="text-4xl mr-2">{weatherInfo.icon}</span>
                <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-400">
                  {weatherInfo.temp}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sağ Bölüm - Video Oynatıcı */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="h-full relative">
            {VideoPlayer}
            <div className="absolute bottom-6 left-6 right-6 bg-black/40 backdrop-blur-md text-white p-4 rounded-2xl shadow-glass border border-white/10">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-blue-300">ŞİMDİ OYNATILIYOR</p>
                  <p className="text-lg font-bold text-white">{currentVideo.title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Yeni animasyonlar ve stil için CSS
const styles = `
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

@keyframes progress {
  0% {
    width: 0%;
    opacity: 1;
  }
  50% {
    width: 100%;
    opacity: 1;
  }
  100% {
    width: 100%;
    opacity: 0;
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animation-delay-6000 {
  animation-delay: 6s;
}

.animate-progress {
  animation: progress 8s infinite;
}

.shadow-glass {
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
`;

export default WelcomeScreen;