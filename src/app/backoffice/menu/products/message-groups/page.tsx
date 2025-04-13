'use client';

import { useState, useEffect, useRef } from 'react';
import { Package, Plus } from 'lucide-react';
import ProductMessageGroupsModal from '../../../../../components/backoffice/menu/ProductMessageGroupsModal';

interface ProductMessageGroup {
  id?: string;
  name: string;
  secondLanguageName: string;
  image: string;
  isActive: boolean;
  showHeader: boolean;
  customCode1: string;
  customCode2: string;
  customCode3: string;
  customCode4: string;
  customCode5: string;
  securityLevel: number;
  color: string;
}

interface ProductMessageGroupFormData extends Partial<ProductMessageGroup> {
  name: string;
  color: string;
}

export default function ProductMessageGroupsPage() {
  const [groups, setGroups] = useState<ProductMessageGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<ProductMessageGroup | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [pages, setPages] = useState<{ id: number; groups: ProductMessageGroup[] }[]>([]);
  const [draggedItem, setDraggedItem] = useState<{ groupId: string, pageId: number, index: number } | null>(null);
  const [dragOverItem, setDragOverItem] = useState<{ groupId: string, pageId: number, index: number } | null>(null);
  const [newGroupColor, setNewGroupColor] = useState('#3B82F6');
  const dragItemRef = useRef<HTMLDivElement | null>(null);
  const colorOptions = ['#4CAF50', '#9C27B0', '#3B82F6', '#F59E0B', '#EF4444', '#10B981', '#6366F1', '#EC4899'];

  // Initialize pages with groups
  useEffect(() => {
    const page1Groups = groups.slice(0, 18);
    const page2Groups = groups.slice(18, 36);
    
    setPages([
      { id: 1, groups: page1Groups },
      { id: 2, groups: page2Groups.length > 0 ? page2Groups : [] }
    ]);
  }, [groups]);

  // Handle opening the modal for a group
  const handleGroupClick = (group: ProductMessageGroup) => {
    setSelectedGroup({...group});
    setShowModal(true);
  };

  // Handle creating a new group
  const handleCreateGroup = () => {
    const newGroup: ProductMessageGroup = {
      name: `Grup ${groups.length + 1}`,
      secondLanguageName: '',
      image: '',
      isActive: true,
      showHeader: true,
      customCode1: '',
      customCode2: '',
      customCode3: '',
      customCode4: '',
      customCode5: '',
      securityLevel: 0,
      color: newGroupColor
    };
    setGroups([...groups, newGroup]);
  };

  // Handle updating a group
  const handleUpdateGroup = (updatedGroup: ProductMessageGroup) => {
    if (!updatedGroup.id) return;
    
    setGroups(prevGroups => 
      prevGroups.map(group => 
        group.id === updatedGroup.id ? { ...group, ...updatedGroup } : group
      )
    );
    setShowModal(false);
  };

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, groupId: string, pageId: number, index: number) => {
    if (e.target instanceof HTMLElement) {
      dragItemRef.current = e.target as HTMLDivElement;
      dragItemRef.current.style.opacity = '0.5';
    }
    
    setDraggedItem({ groupId, pageId, index });
    e.dataTransfer.effectAllowed = 'move';
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent, groupId: string, pageId: number, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (!draggedItem) return;
    
    if (draggedItem.groupId === groupId && draggedItem.pageId === pageId && draggedItem.index === index) return;
    
    setDragOverItem({ groupId, pageId, index });
  };

  // Handle drag end
  const handleDragEnd = () => {
    if (dragItemRef.current) {
      dragItemRef.current.style.opacity = '1';
      dragItemRef.current = null;
    }
    
    setDraggedItem(null);
    setDragOverItem(null);
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent, targetGroupId: string, targetPageId: number, targetIndex: number) => {
    e.preventDefault();
    
    if (!draggedItem) return;
    
    const { groupId: sourceGroupId, pageId: sourcePageId, index: sourceIndex } = draggedItem;
    
    if (sourceGroupId === targetGroupId && sourcePageId === targetPageId && sourceIndex === targetIndex) return;
    
    const newPages = [...pages];
    
    const sourcePage = newPages.find(page => page.id === sourcePageId);
    const targetPage = newPages.find(page => page.id === targetPageId);
    
    if (!sourcePage || !targetPage) return;
    
    const sourceGroup = sourcePage.groups[sourceIndex];
    if (!sourceGroup) return;
    
    sourcePage.groups.splice(sourceIndex, 1);
    
    if (targetIndex >= targetPage.groups.length) {
      targetPage.groups.push(sourceGroup);
    } else {
      targetPage.groups.splice(targetIndex, 0, sourceGroup);
    }
    
    setPages(newPages);
    handleDragEnd();
  };

  // Handle drop on empty slot
  const handleDropOnEmptySlot = (e: React.DragEvent, pageId: number, index: number) => {
    e.preventDefault();
    
    if (!draggedItem) return;
    
    const { groupId: sourceGroupId, pageId: sourcePageId, index: sourceIndex } = draggedItem;
    
    const newPages = [...pages];
    
    const sourcePage = newPages.find(page => page.id === sourcePageId);
    const targetPage = newPages.find(page => page.id === pageId);
    
    if (!sourcePage || !targetPage) return;
    
    const sourceGroup = sourcePage.groups[sourceIndex];
    if (!sourceGroup) return;
    
    sourcePage.groups.splice(sourceIndex, 1);
    
    while (targetPage.groups.length < index) {
      targetPage.groups.push(null as any);
    }
    
    targetPage.groups[index] = sourceGroup;
    
    setPages(newPages);
    handleDragEnd();
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedGroup(null);
  };

  // Handle deleting a group
  const handleDeleteGroup = (groupId: string) => {
    const pageIndex = pages.findIndex(page => 
      page.groups.some(group => group && group.id === groupId)
    );
    
    if (pageIndex !== -1) {
      const newPages = [...pages];
      
      const groupIndex = newPages[pageIndex].groups.findIndex(
        group => group && group.id === groupId
      );
      
      if (groupIndex !== -1) {
        newPages[pageIndex].groups.splice(groupIndex, 1);
        setPages(newPages);
      }
    }
    
    setShowModal(false);
    setSelectedGroup(null);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Ürün Mesaj Grupları</h1>
        <button 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
          onClick={handleCreateGroup}
        >
          <Plus size={18} />
          Yeni Grup Ekle
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {pages.map(page => (
          <div key={page.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">SAYFA {page.id}</h2>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-2 auto-rows-min gap-x-4 gap-y-2">
                {Array.from({ length: 18 }).map((_, index) => {
                  const group = page.groups[index];
                  const isOver = dragOverItem && dragOverItem.pageId === page.id && dragOverItem.index === index;
                  
                  return (
                    <div 
                      key={index}
                      className={`border rounded-lg p-1 h-10 flex items-center justify-center cursor-pointer transition-all duration-200 ${
                        isOver ? 'bg-blue-100 border-blue-400 scale-105' : 
                        group ? 'bg-blue-50 hover:shadow-md' : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => group && handleGroupClick(group)}
                      onDragOver={(e) => handleDragOver(e, group?.id || '', page.id, index)}
                      onDrop={(e) => group 
                        ? handleDrop(e, group.id || '', page.id, index)
                        : handleDropOnEmptySlot(e, page.id, index)
                      }
                    >
                      {group ? (
                        <div
                          className="w-full h-full rounded flex items-center justify-center text-white font-bold shadow-sm text-xs"
                          style={{ backgroundColor: group.color }}
                          draggable
                          onDragStart={(e) => {
                            if (group.id) {
                              handleDragStart(e, group.id, page.id, index);
                            }
                          }}
                          onDragEnd={handleDragEnd}
                        >
                          {group.name}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">Boş</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <ProductMessageGroupsModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSave={handleUpdateGroup}
        group={selectedGroup || undefined}
      />
    </div>
  );
}
