/**
 * Video yönetimi için yardımcı fonksiyonlar
 */

// YouTube video URL'sini embed URL'sine dönüştürme
export const getYoutubeEmbedUrl = (url: string): string => {
  // Eğer zaten embed URL ise, olduğu gibi döndür
  if (url.includes('youtube.com/embed/')) {
    return url;
  }
  
  // YouTube video ID'sini çıkar
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  
  // ID çıkarılamazsa, URL'yi olduğu gibi döndür
  return url;
};

// URL'nin YouTube URL'si olup olmadığını kontrol etme
export const isYoutubeUrl = (url: string): boolean => {
  return url.includes('youtube.com') || url.includes('youtu.be');
};

// Varsayılan videolar
export const DEFAULT_VIDEOS = [
  {
    id: '1',
    title: 'Tanıtım Videosu',
    url: 'https://www.youtube.com/embed/AJ9Ql0d8pfI',
    isDefault: true,
    isYoutube: true
  },
  {
    id: '2',
    title: 'Ürün Tanıtımı',
    url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    isDefault: true,
    isYoutube: false
  }
];

// Video türü
export interface Video {
  id: string;
  title: string;
  url: string;
  isDefault?: boolean;
  isYoutube?: boolean;
}

// Videoları localStorage'dan yükleme
export const loadVideos = (): Video[] => {
  try {
    const savedVideos = localStorage.getItem('customerDisplayVideos');
    if (savedVideos) {
      const videos = JSON.parse(savedVideos) as Video[];
      // Varsayılan videoları ekle (eğer yoksa)
      const hasDefaults = videos.some(v => v.isDefault);
      if (!hasDefaults) {
        return [...videos, ...DEFAULT_VIDEOS];
      }
      return videos;
    }
    return DEFAULT_VIDEOS;
  } catch (error) {
    console.error('Videolar yüklenirken hata oluştu:', error);
    return DEFAULT_VIDEOS;
  }
};

// Videoları localStorage'a kaydetme
export const saveVideos = (videos: Video[]): void => {
  try {
    localStorage.setItem('customerDisplayVideos', JSON.stringify(videos));
  } catch (error) {
    console.error('Videolar kaydedilirken hata oluştu:', error);
  }
};

// Yeni video ekleme
export const addVideo = (title: string, url: string): Video[] => {
  const videos = loadVideos();
  const newVideo: Video = {
    id: Date.now().toString(),
    title,
    url,
    isYoutube: isYoutubeUrl(url)
  };
  const updatedVideos = [...videos, newVideo];
  saveVideos(updatedVideos);
  return updatedVideos;
};

// Video silme
export const removeVideo = (id: string): Video[] => {
  const videos = loadVideos();
  const updatedVideos = videos.filter(video => video.id !== id || video.isDefault);
  saveVideos(updatedVideos);
  return updatedVideos;
};

// Video güncelleme
export const updateVideo = (id: string, title: string, url: string): Video[] => {
  const videos = loadVideos();
  const updatedVideos = videos.map(video => 
    video.id === id ? { ...video, title, url, isYoutube: isYoutubeUrl(url) } : video
  );
  saveVideos(updatedVideos);
  return updatedVideos;
};

// Aktif videoları ayarlama (gösterilecek videolar)
export const setActiveVideos = (videoIds: string[]): void => {
  try {
    localStorage.setItem('activeVideoIds', JSON.stringify(videoIds));
  } catch (error) {
    console.error('Aktif videolar kaydedilirken hata oluştu:', error);
  }
};

// Aktif videoları getirme
export const getActiveVideos = (): Video[] => {
  try {
    const activeIds = localStorage.getItem('activeVideoIds');
    const allVideos = loadVideos();
    
    if (activeIds) {
      const ids = JSON.parse(activeIds) as string[];
      const activeVideos = allVideos.filter(video => ids.includes(video.id));
      return activeVideos.length > 0 ? activeVideos : allVideos;
    }
    
    return allVideos;
  } catch (error) {
    console.error('Aktif videolar yüklenirken hata oluştu:', error);
    return loadVideos();
  }
};
