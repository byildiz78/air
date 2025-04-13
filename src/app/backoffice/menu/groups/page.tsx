'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { X, Save, Image, Plus, Trash2 } from 'lucide-react';

// Define the menu group type
interface MenuGroup {
  id: string;
  name: string;
  secondLanguageName: string;
  image: string;
  isActive: boolean;
  showHeader: boolean;
  hideInTableOrders: boolean;
  hideInBarSales: boolean;
  hideInCashierSales: boolean;
  hideInCounterSales: boolean;
  hideInPackageSales: boolean;
  securityLevel: number;
  color: string;
}

// Sample data for menu groups
const initialMenuGroups: MenuGroup[] = [
  {
    id: '1',
    name: 'SICAK İÇECEKLER',
    secondLanguageName: 'HOT DRINKS',
    image: '',
    isActive: true,
    showHeader: true,
    hideInTableOrders: false,
    hideInBarSales: false,
    hideInCashierSales: false,
    hideInCounterSales: false,
    hideInPackageSales: false,
    securityLevel: 1,
    color: '#4CAF50' // Green color
  },
  {
    id: '2',
    name: 'SOĞUK İÇECEKLER',
    secondLanguageName: 'COLD DRINKS',
    image: '',
    isActive: true,
    showHeader: true,
    hideInTableOrders: false,
    hideInBarSales: false,
    hideInCashierSales: false,
    hideInCounterSales: false,
    hideInPackageSales: false,
    securityLevel: 3,
    color: '#9C27B0' // Purple color
  }
];

export default function MenuGroupsPage() {
  const [menuGroups, setMenuGroups] = useState<MenuGroup[]>(initialMenuGroups);
  const [selectedGroup, setSelectedGroup] = useState<MenuGroup | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [pages, setPages] = useState<{ id: number; groups: MenuGroup[] }[]>([]);
  const [draggedItem, setDraggedItem] = useState<{ groupId: string, pageId: number, index: number } | null>(null);
  const [dragOverItem, setDragOverItem] = useState<{ groupId: string, pageId: number, index: number } | null>(null);
  const [newGroupColor, setNewGroupColor] = useState('#3B82F6'); // Default blue color for new groups
  const dragItemRef = useRef<HTMLDivElement | null>(null);
  const colorOptions = ['#4CAF50', '#9C27B0', '#3B82F6', '#F59E0B', '#EF4444', '#10B981', '#6366F1', '#EC4899'];

  // Initialize pages with menu groups
  useEffect(() => {
    const page1Groups = menuGroups.slice(0, 18);
    const page2Groups = menuGroups.slice(18, 36);
    
    setPages([
      { id: 1, groups: page1Groups },
      { id: 2, groups: page2Groups.length > 0 ? page2Groups : [] }
    ]);
  }, [menuGroups]);

  // Handle opening the modal for a group
  const handleGroupClick = (group: MenuGroup) => {
    setSelectedGroup({...group});
    setShowModal(true);
  };

  // Handle creating a new group
  const handleNewGroup = () => {
    const newGroup: MenuGroup = {
      id: Date.now().toString(),
      name: 'YENİ GRUP',
      secondLanguageName: '',
      image: '',
      isActive: true,
      showHeader: true,
      hideInTableOrders: false,
      hideInBarSales: false,
      hideInCashierSales: false,
      hideInCounterSales: false,
      hideInPackageSales: false,
      securityLevel: 1,
      color: newGroupColor
    };
    
    setSelectedGroup(newGroup);
    setShowModal(true);
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
    
    // Don't do anything if hovering over the same item
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
    
    // Don't do anything if dropping onto the same item
    if (sourceGroupId === targetGroupId && sourcePageId === targetPageId && sourceIndex === targetIndex) return;
    
    // Create a new array of pages
    const newPages = [...pages];
    
    // Find source and target page
    const sourcePage = newPages.find(page => page.id === sourcePageId);
    const targetPage = newPages.find(page => page.id === targetPageId);
    
    if (!sourcePage || !targetPage) return;
    
    // Get the source group
    const sourceGroup = sourcePage.groups[sourceIndex];
    if (!sourceGroup) return;
    
    // Remove the source group from its original position
    sourcePage.groups.splice(sourceIndex, 1);
    
    // If the target position is empty, just add the group
    if (targetIndex >= targetPage.groups.length) {
      targetPage.groups.push(sourceGroup);
    } else {
      // Insert the source group at the target position
      targetPage.groups.splice(targetIndex, 0, sourceGroup);
    }
    
    // Update the state
    setPages(newPages);
    handleDragEnd();
  };

  // Handle drop on empty slot
  const handleDropOnEmptySlot = (e: React.DragEvent, pageId: number, index: number) => {
    e.preventDefault();
    
    if (!draggedItem) return;
    
    const { groupId: sourceGroupId, pageId: sourcePageId, index: sourceIndex } = draggedItem;
    
    // Create a new array of pages
    const newPages = [...pages];
    
    // Find source and target page
    const sourcePage = newPages.find(page => page.id === sourcePageId);
    const targetPage = newPages.find(page => page.id === pageId);
    
    if (!sourcePage || !targetPage) return;
    
    // Get the source group
    const sourceGroup = sourcePage.groups[sourceIndex];
    if (!sourceGroup) return;
    
    // Remove the source group from its original position
    sourcePage.groups.splice(sourceIndex, 1);
    
    // Ensure the target page has enough slots
    while (targetPage.groups.length < index) {
      targetPage.groups.push(null as any);
    }
    
    // Insert the source group at the target position
    targetPage.groups[index] = sourceGroup;
    
    // Update the state
    setPages(newPages);
    handleDragEnd();
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedGroup(null);
  };

  // Handle saving the group changes
  const handleSaveGroup = (updatedGroup: MenuGroup) => {
    const isNewGroup = !pages.some(page => 
      page.groups.some(group => group && group.id === updatedGroup.id)
    );
    
    if (isNewGroup) {
      // Add the new group to the first page with an empty slot
      const newPages = [...pages];
      let added = false;
      
      for (const page of newPages) {
        if (page.groups.length < 18) {
          page.groups.push(updatedGroup);
          added = true;
          break;
        }
      }
      
      // If no empty slot was found, add to the first page
      if (!added && newPages.length > 0) {
        newPages[0].groups.push(updatedGroup);
      }
      
      setPages(newPages);
    } else {
      // Find the page that contains the group
      const pageIndex = pages.findIndex(page => 
        page.groups.some(group => group && group.id === updatedGroup.id)
      );
      
      if (pageIndex !== -1) {
        // Create a new array of pages
        const newPages = [...pages];
        
        // Find the group index in the page
        const groupIndex = newPages[pageIndex].groups.findIndex(
          group => group && group.id === updatedGroup.id
        );
        
        if (groupIndex !== -1) {
          // Update the group
          newPages[pageIndex].groups[groupIndex] = updatedGroup;
          
          // Update the state
          setPages(newPages);
        }
      }
    }
    
    // Close the modal
    setShowModal(false);
    setSelectedGroup(null);
  };

  // Handle deleting a group
  const handleDeleteGroup = (groupId: string) => {
    // Find the page that contains the group
    const pageIndex = pages.findIndex(page => 
      page.groups.some(group => group && group.id === groupId)
    );
    
    if (pageIndex !== -1) {
      // Create a new array of pages
      const newPages = [...pages];
      
      // Find the group index in the page
      const groupIndex = newPages[pageIndex].groups.findIndex(
        group => group && group.id === groupId
      );
      
      if (groupIndex !== -1) {
        // Remove the group
        newPages[pageIndex].groups.splice(groupIndex, 1);
        
        // Update the state
        setPages(newPages);
      }
    }
    
    // Close the modal
    setShowModal(false);
    setSelectedGroup(null);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Menü Ekran Grupları</h1>
        <button 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
          onClick={handleNewGroup}
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
                      onDragOver={(e) => handleDragOver(e, group ? group.id : '', page.id, index)}
                      onDrop={(e) => group 
                        ? handleDrop(e, group.id, page.id, index)
                        : handleDropOnEmptySlot(e, page.id, index)
                      }
                    >
                      {group ? (
                        <div
                          className="w-full h-full rounded flex items-center justify-center text-white font-bold shadow-sm text-xs"
                          style={{ backgroundColor: group.color }}
                          draggable
                          onDragStart={(e) => handleDragStart(e, group.id, page.id, index)}
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
      
      {/* Modal for editing a group */}
      {showModal && selectedGroup && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-[600px] max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 flex justify-between items-center border-b">
              <h2 className="text-lg font-medium text-gray-900">
                {selectedGroup.id ? 'Menü Grubu Düzenle' : 'Yeni Menü Grubu'}
              </h2>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={handleCloseModal}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 overflow-y-auto">
              <div className="space-y-6">
                {/* Ana Bilgiler */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Grup Adı
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      value={selectedGroup.name}
                      onChange={(e) => setSelectedGroup({...selectedGroup, name: e.target.value})}
                      placeholder="Grup adını girin"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      İkinci Dil
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      value={selectedGroup.secondLanguageName}
                      onChange={(e) => setSelectedGroup({...selectedGroup, secondLanguageName: e.target.value})}
                      placeholder="İkinci dildeki adını girin"
                    />
                  </div>
                </div>

                {/* Ayarlar */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Güvenlik Seviyesi
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      value={selectedGroup.securityLevel}
                      onChange={(e) => setSelectedGroup({...selectedGroup, securityLevel: parseInt(e.target.value)})}
                    >
                      {[0, 1, 2, 3, 4, 5].map(level => (
                        <option key={level} value={level}>Seviye {level}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Renk
                    </label>
                    <div className="flex gap-2">
                      {colorOptions.map(color => (
                        <button
                          key={color}
                          onClick={() => setSelectedGroup({...selectedGroup, color})}
                          className={`w-8 h-8 rounded-full transition-all ${
                            selectedGroup.color === color 
                              ? 'ring-2 ring-offset-2 ring-blue-500' 
                              : 'hover:scale-110'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input 
                          type="checkbox"
                          className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                          checked={selectedGroup.isActive}
                          onChange={(e) => setSelectedGroup({...selectedGroup, isActive: e.target.checked})}
                        />
                        <span className="ml-2 text-sm text-gray-700">Aktif</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox"
                          className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                          checked={selectedGroup.showHeader}
                          onChange={(e) => setSelectedGroup({...selectedGroup, showHeader: e.target.checked})}
                        />
                        <span className="ml-2 text-sm text-gray-700">Başlık Göster</span>
                      </label>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input 
                          type="checkbox"
                          className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                          checked={selectedGroup.hideInTableOrders}
                          onChange={(e) => setSelectedGroup({...selectedGroup, hideInTableOrders: e.target.checked})}
                        />
                        <span className="ml-2 text-sm text-gray-700">Masa Siparişlerinde Gizle</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox"
                          className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                          checked={selectedGroup.hideInBarSales}
                          onChange={(e) => setSelectedGroup({...selectedGroup, hideInBarSales: e.target.checked})}
                        />
                        <span className="ml-2 text-sm text-gray-700">Bar Satışında Gizle</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox"
                          className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                          checked={selectedGroup.hideInCashierSales}
                          onChange={(e) => setSelectedGroup({...selectedGroup, hideInCashierSales: e.target.checked})}
                        />
                        <span className="ml-2 text-sm text-gray-700">Kasa Satışında Gizle</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox"
                          className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                          checked={selectedGroup.hideInCounterSales}
                          onChange={(e) => setSelectedGroup({...selectedGroup, hideInCounterSales: e.target.checked})}
                        />
                        <span className="ml-2 text-sm text-gray-700">Tezgah Satışlarda Gizle</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox"
                          className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                          checked={selectedGroup.hideInPackageSales}
                          onChange={(e) => setSelectedGroup({...selectedGroup, hideInPackageSales: e.target.checked})}
                        />
                        <span className="ml-2 text-sm text-gray-700">Paket Satışında Gizle</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Önizleme */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Önizleme
                  </label>
                  <div 
                    className="h-20 rounded-lg flex items-center justify-center text-white transition-colors shadow-sm"
                    style={{ backgroundColor: selectedGroup.color }}
                  >
                    <div className="text-center">
                      <div className="font-medium">{selectedGroup.name || 'Grup Adı'}</div>
                      {selectedGroup.secondLanguageName && (
                        <div className="text-sm opacity-80">{selectedGroup.secondLanguageName}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-between">
              {selectedGroup.id && (
                <button 
                  onClick={() => handleDeleteGroup(selectedGroup.id)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-700 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4 mr-1.5" />
                  Sil
                </button>
              )}
              <div className="flex gap-3 ml-auto">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  İptal
                </button>
                <button
                  onClick={() => handleSaveGroup(selectedGroup)}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  <Save className="h-4 w-4 mr-1.5" />
                  Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
