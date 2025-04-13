'use client';

import { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { ProductMessageGrid } from '@/components/backoffice/menu/ProductMessageGrid';
import { ProductMessageModal } from '@/components/backoffice/menu/ProductMessageModal';
import { MenuGroupsList } from '@/components/backoffice/menu/MenuGroupsList';
import { ProductMessage } from '@/types/productMessage';

// Sample data for menu groups
const initialMenuGroups = [
  {
    id: '1',
    name: 'ÜRÜN MESAJ GRUBU 1',
    color: '#4CAF50'
  },
  {
    id: '2',
    name: 'ÜRÜN MESAJ GRUBU 2',
    color: '#9C27B0'
  }
];

// Sample data for messages
const initialMessages: ProductMessage[] = [
  {
    id: '1',
    name: 'Ekstra İstekler',
    extraPrice: 0,
    selectedByDefault: false,
    isKitchenAddMessage: true,
    isKitchenSendMessage: false,
    isPizzaProduction: false,
    isAutomaticForKgProducts: false,
    isDepositMessage: false,
    hideMessage: false,
    groupId: '1',
    groupColor: '#4CAF50',
    isActive: true
  },
  {
    id: '2',
    name: 'Özel Notlar',
    extraPrice: 5,
    selectedByDefault: true,
    isKitchenAddMessage: false,
    isKitchenSendMessage: true,
    isPizzaProduction: false,
    isAutomaticForKgProducts: false,
    isDepositMessage: false,
    hideMessage: false,
    groupId: '1',
    groupColor: '#4CAF50',
    isActive: true
  }
];

export default function ProductMessagesPage() {
  const [messages, setMessages] = useState<ProductMessage[]>(initialMessages);
  const [menuGroups, setMenuGroups] = useState(initialMenuGroups);
  const [selectedMessage, setSelectedMessage] = useState<ProductMessage | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [pages, setPages] = useState<{ id: number; messages: (ProductMessage | null)[] }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [draggedItem, setDraggedItem] = useState<{ messageId: string, pageId: number, index: number } | null>(null);
  const [dragOverItem, setDragOverItem] = useState<{ pageId: number, index: number } | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  // Hide footer when this component mounts
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.style.display = 'none';
    }
    
    return () => {
      if (footer) {
        footer.style.display = 'block';
      }
    };
  }, []);

  // Filter messages based on selected group
  const filteredMessages = selectedGroupId
    ? messages.filter(message => message.groupId === selectedGroupId)
    : messages;

  // Initialize pages with messages
  useEffect(() => {
    const totalPages = Math.ceil(filteredMessages.length / 32) || 1;
    const newPages = [];
    
    for (let i = 0; i < totalPages; i++) {
      const pageMessages = filteredMessages.slice(i * 32, (i + 1) * 32);
      newPages.push({ id: i + 1, messages: pageMessages });
    }
    
    setPages(newPages);
    
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredMessages, currentPage]);

  // Handle opening the modal for a message
  const handleMessageClick = (message: ProductMessage) => {
    setSelectedMessage(message);
    setShowModal(true);
  };

  // Handle creating a new message
  const handleNewMessage = () => {
    const newMessage: ProductMessage = {
      id: Date.now().toString(),
      name: 'YENİ MESAJ',
      extraPrice: 0,
      selectedByDefault: false,
      isKitchenAddMessage: false,
      isKitchenSendMessage: false,
      isPizzaProduction: false,
      isAutomaticForKgProducts: false,
      isDepositMessage: false,
      hideMessage: false,
      groupId: selectedGroupId || '',
      groupColor: selectedGroupId 
        ? menuGroups.find(g => g.id === selectedGroupId)?.color 
        : undefined,
      isActive: true,
    };
    
    setSelectedMessage(newMessage);
    setShowModal(true);
  };

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, messageId: string, pageId: number, index: number) => {
    setDraggedItem({ messageId, pageId, index });
    e.dataTransfer.effectAllowed = 'move';
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent, pageId: number, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (!draggedItem) return;
    
    if (draggedItem.pageId === pageId && draggedItem.index === index) return;
    
    setDragOverItem({ pageId, index });
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent, targetPageId: number, targetIndex: number) => {
    e.preventDefault();
    
    if (!draggedItem) return;
    
    const { messageId, pageId: sourcePageId, index: sourceIndex } = draggedItem;
    
    if (sourcePageId === targetPageId && sourceIndex === targetIndex) return;
    
    const newPages = [...pages];
    
    const sourcePage = newPages.find(page => page.id === sourcePageId);
    const targetPage = newPages.find(page => page.id === targetPageId);
    
    if (!sourcePage || !targetPage) return;
    
    const sourceMessage = sourcePage.messages[sourceIndex];
    if (!sourceMessage) return;
    
    sourcePage.messages[sourceIndex] = null;
    
    const targetMessage = targetPage.messages[targetIndex];
    if (targetMessage) {
      sourcePage.messages[sourceIndex] = targetMessage;
    }
    
    targetPage.messages[targetIndex] = sourceMessage;
    
    setPages(newPages);
    
    const allMessages: ProductMessage[] = [];
    newPages.forEach(page => {
      page.messages.forEach(message => {
        if (message) {
          allMessages.push(message);
        }
      });
    });
    
    setMessages(allMessages);
    handleDragEnd();
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMessage(null);
  };

  // Handle saving the message changes
  const handleSaveMessage = (updatedMessage: ProductMessage) => {
    const isNewMessage = !messages.some(m => m.id === updatedMessage.id);
    
    if (isNewMessage) {
      setMessages(prev => [...prev, updatedMessage]);
    } else {
      setMessages(prev => 
        prev.map(m => m.id === updatedMessage.id ? updatedMessage : m)
      );
    }
    
    setShowModal(false);
    setSelectedMessage(null);
  };

  // Handle deleting a message
  const handleDeleteMessage = (messageId: string) => {
    setMessages(prev => prev.filter(m => m.id !== messageId));
    setShowModal(false);
    setSelectedMessage(null);
  };

  // Change page
  const handlePageChange = (pageId: number) => {
    setCurrentPage(pageId);
  };

  // Handle group selection
  const handleGroupSelect = (groupId: string | null) => {
    setSelectedGroupId(groupId);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left sidebar with menu groups */}
      <div className="w-56 flex-shrink-0 p-1">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[calc(100vh-8px)]">
          <div className="p-2 border-b border-gray-100">
            <h2 className="text-sm font-medium text-gray-900">MENÜ GRUPLARI</h2>
          </div>
          <MenuGroupsList 
            groups={menuGroups}
            selectedGroupId={selectedGroupId}
            onGroupSelect={handleGroupSelect}
          />
          <button
            className="w-full p-2 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 flex items-center justify-center gap-1"
            onClick={() => {/* TODO: Implement group edit */}}
          >
            GRUPLARI DÜZENLE
          </button>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-grow p-1">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[calc(100vh-48px)] flex flex-col">
          {pages.map(page => (
            <div key={page.id} className={`${page.id === currentPage ? 'block flex-grow' : 'hidden'}`}>
              <div className="p-2 border-b border-gray-100">
                <h2 className="text-sm font-medium text-gray-900">SAYFA {page.id}</h2>
              </div>
              
              <div className="overflow-auto">
                <ProductMessageGrid
                  messages={page.messages}
                  pageId={page.id}
                  draggedItem={draggedItem}
                  dragOverItem={dragOverItem}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onDragEnd={handleDragEnd}
                  onMessageClick={handleMessageClick}
                  onEmptyClick={handleNewMessage}
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center mt-1">
          <div className="flex gap-1">
            {pages.map(page => (
              <button
                key={page.id}
                className={`w-6 h-6 flex items-center justify-center rounded text-xs transition-colors duration-200 ${
                  page.id === currentPage
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => handlePageChange(page.id)}
              >
                {page.id}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Message Modal */}
      {showModal && selectedMessage && (
        <ProductMessageModal
          isOpen={showModal}
          onClose={handleCloseModal}
          onSave={handleSaveMessage}
          onDelete={handleDeleteMessage}
          message={selectedMessage}
        />
      )}
    </div>
  );
}
