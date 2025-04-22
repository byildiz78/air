'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCw, Users, Scissors, GitMerge } from 'lucide-react';

interface TableOperationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChangeTable: () => void;
  onChangeWaiter: () => void;
  onSplitTable: () => void;
  onMergeTables: () => void;
}

const TableOperationsModal: React.FC<TableOperationsModalProps> = ({
  isOpen,
  onClose,
  onChangeTable,
  onChangeWaiter,
  onSplitTable,
  onMergeTables
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl z-50 overflow-hidden"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-lg font-bold">Masa İşlemleri</h2>
              <button 
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Options */}
            <div className="p-2">
              <motion.button
                className="w-full flex items-center p-4 mb-2 bg-white rounded-lg border border-gray-200"
                whileTap={{ scale: 0.98 }}
                onClick={onChangeTable}
              >
                <RefreshCw size={20} className="mr-3 text-blue-600" />
                <span className="font-medium">Masa Değiştir</span>
              </motion.button>
              
              <motion.button
                className="w-full flex items-center p-4 mb-2 bg-white rounded-lg border border-gray-200"
                whileTap={{ scale: 0.98 }}
                onClick={onChangeWaiter}
              >
                <Users size={20} className="mr-3 text-blue-600" />
                <span className="font-medium">Garson Değiştir</span>
              </motion.button>
              
              <motion.button
                className="w-full flex items-center p-4 mb-2 bg-white rounded-lg border border-gray-200"
                whileTap={{ scale: 0.98 }}
                onClick={onSplitTable}
              >
                <Scissors size={20} className="mr-3 text-blue-600" />
                <span className="font-medium">Masa Ayır</span>
              </motion.button>
              
              <motion.button
                className="w-full flex items-center p-4 mb-2 bg-white rounded-lg border border-gray-200"
                whileTap={{ scale: 0.98 }}
                onClick={onMergeTables}
              >
                <GitMerge size={20} className="mr-3 text-blue-600" />
                <span className="font-medium">Masa Birleştir</span>
              </motion.button>
            </div>
            
            {/* Safe area padding for mobile */}
            <div className="h-6" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TableOperationsModal;
