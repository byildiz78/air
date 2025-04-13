import React from 'react';
import { Plus } from 'lucide-react';
import { ProductMessage } from '@/types/productMessage';

interface ProductMessageGridProps {
  messages: (ProductMessage | null)[];
  pageId: number;
  draggedItem: { messageId: string; pageId: number; index: number } | null;
  dragOverItem: { pageId: number; index: number } | null;
  onDragStart: (e: React.DragEvent, messageId: string, pageId: number, index: number) => void;
  onDragOver: (e: React.DragEvent, pageId: number, index: number) => void;
  onDrop: (e: React.DragEvent, pageId: number, index: number) => void;
  onDragEnd: () => void;
  onMessageClick: (message: ProductMessage) => void;
  onEmptyClick: () => void;
}

export function ProductMessageGrid({
  messages,
  pageId,
  draggedItem,
  dragOverItem,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  onMessageClick,
  onEmptyClick
}: ProductMessageGridProps) {
  // Create a 4x8 grid with 32 cells
  const gridCells = Array(32).fill(null).map((_, index) => messages[index] || null);

  return (
    <div className="grid grid-cols-4 gap-1 p-1">
      {gridCells.map((message, index) => (
        <div
          key={index}
          className={`h-[60px] rounded-lg overflow-hidden ${
            message
              ? 'cursor-pointer'
              : 'bg-gray-50 hover:bg-gray-100 cursor-pointer flex items-center justify-center'
          } ${
            draggedItem?.messageId === message?.id
              ? 'opacity-50'
              : ''
          } ${
            dragOverItem?.pageId === pageId && dragOverItem?.index === index
              ? 'ring-2 ring-blue-500'
              : ''
          }`}
          style={message ? {
            backgroundColor: message.groupColor || '#E5E7EB'
          } : undefined}
          draggable={!!message}
          onDragStart={(e) => message && onDragStart(e, message.id, pageId, index)}
          onDragOver={(e) => onDragOver(e, pageId, index)}
          onDrop={(e) => onDrop(e, pageId, index)}
          onDragEnd={onDragEnd}
          onClick={() => message ? onMessageClick(message) : onEmptyClick()}
        >
          {message ? (
            <div className="h-full p-2 flex flex-col justify-center items-center text-white">
              <div className="text-center">
                <div className="text-sm font-medium">{message.name}</div>
                {message.extraPrice > 0 && (
                  <div className="text-xs mt-0.5">+{message.extraPrice.toFixed(2)} ₺</div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-xs text-gray-400">Boş</div>
          )}
        </div>
      ))}
    </div>
  );
}
