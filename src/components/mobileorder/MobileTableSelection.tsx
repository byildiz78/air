'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, User, Bell, LogOut, CheckCircle2, ChefHat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Define section configs from TableLayoutPage.tsx
const sectionConfigs = [
  {
    id: 'garden',
    name: 'Bahçe',
    tableCount: 12,
    prefix: 'B',
    color: {
      primary: '#10b981', // green-500
      dark: '#065f46', // green-800
      light: '#d1fae5', // green-100
      border: '#6ee7b7', // green-300
    }
  },
  {
    id: 'salon',
    name: 'Salon',
    tableCount: 14,
    prefix: 'S',
    color: {
      primary: '#3b82f6', // blue-500
      dark: '#1e40af', // blue-800
      light: '#dbeafe', // blue-100
      border: '#93c5fd', // blue-300
    }
  },
  {
    id: 'basement',
    name: 'Alt Kat',
    tableCount: 10,
    prefix: 'A',
    color: {
      primary: '#8b5cf6', // purple-500
      dark: '#5b21b6', // purple-800
      light: '#ede9fe', // purple-100
      border: '#c4b5fd', // purple-300
    }
  },
  {
    id: 'terrace',
    name: 'Teras',
    tableCount: 10,
    prefix: 'T',
    color: {
      primary: '#f59e0b', // amber-500
      dark: '#92400e', // amber-800
      light: '#fef3c7', // amber-100
      border: '#fcd34d', // amber-300
    }
  },
  {
    id: 'roof',
    name: 'Çatı Katı',
    tableCount: 5,
    prefix: 'R',
    color: {
      primary: '#ef4444', // red-500
      dark: '#b91c1c', // red-800
      light: '#fee2e2', // red-100
      border: '#fca5a5', // red-300
    }
  }
];

// Define table status
type TableStatus = 'empty' | 'occupied';

// Define table data structure
interface TableData {
  id: number;
  number: string;
  section: string;
  isAdmin?: boolean;
  status: TableStatus;
  occupiedInfo?: {
    waiter: string;
    occupiedTime: number; // in minutes
    currentGuests: number;
  };
}

// Define kitchen notification structure
interface KitchenNotification {
  id: number;
  tableNumber: string;
  itemName: string;
  readyTime: Date;
  isRead: boolean;
}

// Generate sample tables based on section configs
const generateTables = (): TableData[] => {
  const tables: TableData[] = [];
  let id = 1;
  
  sectionConfigs.forEach(section => {
    for (let i = 1; i <= section.tableCount; i++) {
      const tableNumber = `${section.prefix}${i}`;
      const isOccupied = Math.random() > 0.6; // 40% chance of being occupied
      
      tables.push({
        id: id++,
        number: tableNumber,
        section: section.name,
        status: isOccupied ? 'occupied' : 'empty',
        ...(isOccupied && {
          occupiedInfo: {
            waiter: ['Ahmet', 'Mehmet', 'Ayşe', 'Fatma', 'Ali', 'Zeynep', 'Can', 'Elif'][Math.floor(Math.random() * 8)],
            occupiedTime: Math.floor(Math.random() * 180) + 5, // 5-185 minutes
            currentGuests: Math.floor(Math.random() * 6) + 1, // 1-6 guests
          }
        }),
        ...(Math.random() < 0.1 && { isAdmin: true }) // 10% chance of being admin
      });
    }
  });
  
  return tables;
};

// Generate sample kitchen notifications
const generateKitchenNotifications = (tables: TableData[]): KitchenNotification[] => {
  const notifications: KitchenNotification[] = [];
  const occupiedTables = tables.filter(table => table.status === 'occupied');
  
  // Generate 3-7 random notifications
  const notificationCount = Math.floor(Math.random() * 5) + 3;
  
  for (let i = 0; i < notificationCount; i++) {
    if (occupiedTables.length === 0) break;
    
    const randomTableIndex = Math.floor(Math.random() * occupiedTables.length);
    const randomTable = occupiedTables[randomTableIndex];
    
    const foodItems = [
      'Karışık Pizza', 'Cheeseburger', 'Tavuk Şiş', 'Adana Kebap', 
      'Lahmacun', 'Izgara Köfte', 'Mantı', 'Karnıyarık',
      'Etli Ekmek', 'Tavuklu Salata', 'Balık Izgara', 'Patates Kızartması'
    ];
    
    const randomFoodIndex = Math.floor(Math.random() * foodItems.length);
    
    notifications.push({
      id: i + 1,
      tableNumber: randomTable.number,
      itemName: foodItems[randomFoodIndex],
      readyTime: new Date(Date.now() - Math.floor(Math.random() * 10 * 60000)), // 0-10 minutes ago
      isRead: Math.random() > 0.7 // 30% chance of being unread
    });
    
    // Remove the table to avoid duplicate notifications for the same table
    occupiedTables.splice(randomTableIndex, 1);
  }
  
  return notifications;
};

const tables = generateTables();
const kitchenNotifications = generateKitchenNotifications(tables);

// Format time in minutes to hours and minutes
const formatTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}dk`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}s${mins > 0 ? ` ${mins}dk` : ''}`;
};

// Format date to relative time
const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'Az önce';
  if (diffMins < 60) return `${diffMins} dakika önce`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} saat önce`;
  
  return date.toLocaleDateString('tr-TR');
};

const MobileTableSelection: React.FC = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>(sectionConfigs[0].name);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isKitchenModalOpen, setIsKitchenModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<KitchenNotification[]>(kitchenNotifications);
  const [notificationRead, setNotificationRead] = useState<Record<number, boolean>>({});

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  // Handle table selection
  const handleTableSelect = (tableId: number) => {
    setSelectedTableId(tableId);
    setIsNavigating(true);
    
    // Delay navigation to allow animation to complete
    setTimeout(() => {
      router.push(`/mobileorder/${tableId}`);
    }, 500);
  };

  // Open kitchen notifications modal
  const handleOpenKitchenModal = () => {
    setIsKitchenModalOpen(true);
  };

  // Mark notification as read
  const handleMarkAsRead = (notificationId: number) => {
    setNotificationRead(prev => ({
      ...prev,
      [notificationId]: true
    }));
  };

  // Exit the app
  const handleExit = () => {
    router.push('/');
  };

  // Get current section config
  const currentSectionConfig = sectionConfigs.find(s => s.name === activeSection);

  // Filter tables by section
  const filteredTables = tables.filter(table => table.section === activeSection);

  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.isRead && !notificationRead[n.id]).length;

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Section Tabs */}
      <motion.div 
        className="bg-gray-900 shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="overflow-x-auto py-2 px-1">
          <div className="flex">
            {sectionConfigs.map((section) => {
              const isActive = activeSection === section.name;
              
              return (
                <motion.button
                  key={section.id}
                  className={`relative mx-1 px-5 py-3 rounded-lg transition-all ${isActive ? 'shadow-lg' : 'opacity-70'}`}
                  style={{ 
                    backgroundColor: isActive ? section.color.primary : 'rgba(255,255,255,0.08)',
                  }}
                  onClick={() => setActiveSection(section.name)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex flex-col items-center relative z-10">
                    <span className="text-base font-medium text-white">{section.name}</span>
                  </div>
                  {isActive && (
                    <motion.div 
                      className="absolute inset-0 rounded-lg"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: [0.5, 0.3, 0.5],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2,
                        ease: "easeInOut"
                      }}
                      style={{
                        backgroundColor: section.color.primary,
                        filter: 'blur(8px)',
                        zIndex: 0
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Section Header */}
      <motion.div
        className="px-4 py-3 bg-white border-b border-gray-200 mb-2 shadow-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        style={{ 
          borderLeftWidth: '5px',
          borderLeftColor: currentSectionConfig?.color.primary
        }}
      >
        <h2 className="text-lg font-bold" style={{ color: currentSectionConfig?.color.dark }}>
          {currentSectionConfig?.name} Bölümü
        </h2>
      </motion.div>

      {/* Table Grid */}
      <div className="flex-1 p-3 overflow-auto pb-16">
        <motion.div 
          className="grid grid-cols-3 gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {filteredTables.map((table, index) => {
            const sectionConfig = sectionConfigs.find(s => s.name === table.section);
            const isOccupied = table.status === 'occupied';
            const isSelected = selectedTableId === table.id;
            
            return (
              <motion.button
                key={table.id}
                className="relative flex flex-col rounded-lg overflow-hidden shadow-sm"
                style={{ 
                  backgroundColor: isOccupied ? sectionConfig?.color.light : 'white',
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  borderColor: isOccupied ? sectionConfig?.color.border : '#e5e7eb'
                }}
                onClick={() => handleTableSelect(table.id)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  scale: isSelected ? 1.05 : 1,
                  y: isSelected ? -5 : 0,
                  boxShadow: isSelected ? '0 10px 25px -5px rgba(0, 0, 0, 0.1)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                }}
                transition={{ 
                  duration: 0.2, 
                  delay: 0.05 * index,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
                exit={isSelected ? { scale: 1.1, opacity: 0 } : undefined}
              >
                {/* Table Number */}
                <div 
                  className="w-full text-center py-2 font-bold text-white text-lg"
                  style={{ 
                    backgroundColor: isOccupied ? sectionConfig?.color.primary : '#9ca3af'
                  }}
                >
                  {table.number}
                </div>
                
                {/* Table Content */}
                <div className="w-full p-2 text-center">
                  {isOccupied && table.occupiedInfo ? (
                    <div className="flex flex-col items-center">
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <Clock size={14} className="mr-1" />
                        <span>{formatTime(table.occupiedInfo.occupiedTime)}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <User size={14} className="mr-1" />
                        <span className="truncate max-w-[80px]">{table.occupiedInfo.waiter}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-3 text-sm text-gray-500">Boş</div>
                  )}
                </div>
                
                {/* Admin Indicator */}
                {table.isAdmin && (
                  <div className="absolute top-0 right-0 bg-yellow-400 text-[10px] px-1 rounded-bl-md font-bold">
                    ADMIN
                  </div>
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* Fixed Bottom Action Buttons */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 grid grid-cols-2 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <button
          className="flex items-center justify-center py-4 font-medium text-white relative"
          onClick={handleOpenKitchenModal}
          style={{ backgroundColor: '#3b82f6' }}
        >
          <ChefHat size={20} className="mr-2" />
          MUTFAK BİLDİRİMLERİ
          {unreadCount > 0 && (
            <motion.div
              className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              {unreadCount}
            </motion.div>
          )}
        </button>
        <button
          className="flex items-center justify-center py-4 font-medium text-white"
          onClick={handleExit}
          style={{ backgroundColor: '#ef4444' }}
        >
          <LogOut size={20} className="mr-2" />
          ÇIKIŞ
        </button>
      </motion.div>

      {/* Kitchen Notifications Modal */}
      <AnimatePresence>
        {isKitchenModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {/* Modal Header */}
            <div className="bg-blue-600 text-white p-4 flex items-center justify-between shadow-md">
              <div className="flex items-center">
                <ChefHat size={24} className="mr-2" />
                <h3 className="text-lg font-bold">Mutfak Bildirimleri</h3>
              </div>
              <div className="flex items-center">
                <span className="text-sm bg-white text-blue-600 px-2 py-1 rounded-full font-bold mr-2">
                  {notifications.length} bildirim
                </span>
                <button 
                  className="bg-white bg-opacity-20 p-2 rounded-full"
                  onClick={() => setIsKitchenModalOpen(false)}
                >
                  <LogOut size={20} />
                </button>
              </div>
            </div>
            
            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto" style={{ height: 'calc(100vh - 136px)' }}>
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-gray-500 h-full flex flex-col items-center justify-center">
                  <Bell size={60} className="mx-auto mb-4 opacity-20" />
                  <p className="text-lg">Bildirim bulunmuyor</p>
                  <p className="text-sm text-gray-400 mt-2">Yeni bildirimler burada görünecek</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {notifications.map((notification) => {
                    const isRead = notification.isRead || notificationRead[notification.id];
                    const sectionConfig = sectionConfigs.find(s => 
                      s.prefix === notification.tableNumber.charAt(0)
                    );
                    
                    return (
                      <motion.div
                        key={notification.id}
                        className={`p-5 ${isRead ? 'bg-white' : 'bg-blue-50'}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: 0.05 * notification.id }}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center">
                              <span 
                                className="font-bold text-lg mr-2 px-3 py-1 rounded text-white"
                                style={{ backgroundColor: sectionConfig?.color.primary || '#9ca3af' }}
                              >
                                {notification.tableNumber}
                              </span>
                              <span className="text-sm text-gray-500">
                                {formatRelativeTime(notification.readyTime)}
                              </span>
                            </div>
                            <p className="font-medium mt-2 text-lg">{notification.itemName} hazır!</p>
                            <p className="text-sm text-gray-600 mt-1">
                              Lütfen en kısa sürede servise alın.
                            </p>
                          </div>
                          
                          {!isRead && (
                            <motion.button
                              className="bg-green-500 text-white p-3 rounded-full flex items-center justify-center"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              <CheckCircle2 size={24} />
                            </motion.button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
            
            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 fixed bottom-0 left-0 right-0">
              <button
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium text-lg"
                onClick={() => setIsKitchenModalOpen(false)}
              >
                Kapat
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Screen Overlay for Navigation */}
      {isNavigating && (
        <motion.div
          className="fixed inset-0 bg-white z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1.5 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: sectionConfigs.find(s => s.name === activeSection)?.color.primary }}
          >
            <span className="text-white text-xl font-bold">
              {filteredTables.find(t => t.id === selectedTableId)?.number || ''}
            </span>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default MobileTableSelection;
