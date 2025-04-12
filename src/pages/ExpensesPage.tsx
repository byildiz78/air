'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FileText, Users, Wallet, Receipt, ClipboardList, 
  Calendar, Search, Filter, ArrowUp, ArrowDown,
  DollarSign, TrendingUp, CreditCard, Clock,
  Plus, Download, Printer, ArrowLeft
} from 'lucide-react';

type ExpenseType = 'GENERAL' | 'PERSONNEL_ADVANCE' | 'CURRENT_REFUND' | 'CURRENT_COLLECTION' | 'COLLECTION_WITH_ADISYON';
type PaymentMethod = 'CASH' | 'CREDIT_CARD' | 'BANK_TRANSFER';
type DateRange = 'TODAY' | 'YESTERDAY' | 'THIS_WEEK' | 'THIS_MONTH' | 'CUSTOM';

interface Expense {
  id: string;
  type: ExpenseType;
  amount: number;
  description: string;
  date: string;
  time: string;
  staff: string;
  paymentMethod: PaymentMethod;
  vat?: number;
  category?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

const ExpensesPage: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'EXPENSES' | 'COLLECTIONS'>('EXPENSES');
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>('TODAY');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<ExpenseType | ''>('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | ''>('');

  // Sample data
  const expenses: Expense[] = [
    {
      id: 'EXP001',
      type: 'GENERAL',
      amount: 1250.00,
      description: 'Mutfak malzemeleri alımı',
      date: '2024-02-20',
      time: '14:30',
      staff: 'Ahmet Yılmaz',
      paymentMethod: 'CASH',
      vat: 18,
      category: 'Kitchen',
      status: 'APPROVED'
    },
    {
      id: 'EXP002',
      type: 'PERSONNEL_ADVANCE',
      amount: 2500.00,
      description: 'Personel maaş avansı',
      date: '2024-02-20',
      time: '15:45',
      staff: 'Mehmet Demir',
      paymentMethod: 'BANK_TRANSFER',
      status: 'PENDING'
    },
    // Add more sample data
  ];

  const stats = {
    totalExpenses: expenses.reduce((sum, exp) => sum + exp.amount, 0),
    averageExpense: expenses.reduce((sum, exp) => sum + exp.amount, 0) / expenses.length,
    pendingCount: expenses.filter(exp => exp.status === 'PENDING').length,
    todayCount: expenses.filter(exp => exp.date === '2024-02-20').length
  };

  const expenseTypes = [
    {
      id: 'GENERAL' as ExpenseType,
      title: 'GENEL MASRAF',
      description: 'İşletme giderlerini kaydetmek için kullanılır',
      icon: FileText,
      color: 'blue'
    },
    {
      id: 'PERSONNEL_ADVANCE' as ExpenseType,
      title: 'PERSONEL AVANS',
      description: 'Personel avans ödemelerini kaydetmek için kullanılır',
      icon: Users,
      color: 'green'
    },
    {
      id: 'CURRENT_REFUND' as ExpenseType,
      title: 'CARİ HESAP PARA İADE',
      description: 'Cari hesaplara yapılan para iadelerini kaydetmek için kullanılır',
      icon: Wallet,
      color: 'red'
    },
    {
      id: 'CURRENT_COLLECTION' as ExpenseType,
      title: 'CARİ TAHSİLAT',
      description: 'Cari hesaplardan tahsilat almak için kullanılır',
      icon: Receipt,
      color: 'purple'
    },
    {
      id: 'COLLECTION_WITH_ADISYON' as ExpenseType,
      title: 'ADİSYON İLE CARİ TAHSİLAT',
      description: 'Adisyon numarası ile cari hesaplardan tahsilat almak için kullanılır',
      icon: ClipboardList,
      color: 'orange'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-500/20 text-green-400';
      case 'REJECTED':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-yellow-500/20 text-yellow-400';
    }
  };

  const getPaymentMethodDetails = (method: PaymentMethod) => {
    switch (method) {
      case 'CASH':
        return { icon: DollarSign, color: 'text-green-400', bg: 'bg-green-500/20' };
      case 'CREDIT_CARD':
        return { icon: CreditCard, color: 'text-blue-400', bg: 'bg-blue-500/20' };
      case 'BANK_TRANSFER':
        return { icon: Wallet, color: 'text-purple-400', bg: 'bg-purple-500/20' };
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header Stats */}
      <div className="bg-gray-900/90 border-b border-gray-800">
        <div className="container mx-auto px-6 py-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-4 border border-blue-500/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <DollarSign size={20} className="text-blue-400" />
                </div>
                <span className="text-gray-300">Toplam Masraf</span>
              </div>
              <div className="text-2xl font-bold text-white">{stats.totalExpenses.toLocaleString('tr-TR')} TL</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-4 border border-green-500/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <TrendingUp size={20} className="text-green-400" />
                </div>
                <span className="text-gray-300">Ortalama Masraf</span>
              </div>
              <div className="text-2xl font-bold text-white">{stats.averageExpense.toLocaleString('tr-TR')} TL</div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-xl p-4 border border-yellow-500/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Clock size={20} className="text-yellow-400" />
                </div>
                <span className="text-gray-300">Bekleyen İşlem</span>
              </div>
              <div className="text-2xl font-bold text-white">{stats.pendingCount}</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl p-4 border border-purple-500/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Calendar size={20} className="text-purple-400" />
                </div>
                <span className="text-gray-300">Bugünkü İşlem</span>
              </div>
              <div className="text-2xl font-bold text-white">{stats.todayCount}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          {/* Filters and Search */}
          <div className="mb-6 flex gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            {/* Date Range Filter */}
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value as DateRange)}
              className="bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
            >
              <option value="TODAY">Bugün</option>
              <option value="YESTERDAY">Dün</option>
              <option value="THIS_WEEK">Bu Hafta</option>
              <option value="THIS_MONTH">Bu Ay</option>
              <option value="CUSTOM">Özel Tarih</option>
            </select>

            {/* Payment Method Filter */}
            <select
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value as PaymentMethod)}
              className="bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
            >
              <option value="">Tüm Ödeme Yöntemleri</option>
              <option value="CASH">Nakit</option>
              <option value="CREDIT_CARD">Kredi Kartı</option>
              <option value="BANK_TRANSFER">Banka Transferi</option>
            </select>

            {/* Action Buttons */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-xl flex items-center gap-2">
              <Download size={20} />
              <span>Dışa Aktar</span>
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 rounded-xl flex items-center gap-2">
              <Printer size={20} />
              <span>Yazdır</span>
            </button>
          </div>

          {/* Expenses Table */}
          <div className="bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800/50">
                  <th className="text-left p-4 text-gray-400 font-medium">İŞLEM NO</th>
                  <th className="text-left p-4 text-gray-400 font-medium">TİP</th>
                  <th className="text-left p-4 text-gray-400 font-medium">AÇIKLAMA</th>
                  <th className="text-left p-4 text-gray-400 font-medium">PERSONEL</th>
                  <th className="text-left p-4 text-gray-400 font-medium">TARİH</th>
                  <th className="text-left p-4 text-gray-400 font-medium">ÖDEME</th>
                  <th className="text-left p-4 text-gray-400 font-medium">DURUM</th>
                  <th className="text-right p-4 text-gray-400 font-medium">TUTAR</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => {
                  const paymentMethod = getPaymentMethodDetails(expense.paymentMethod);
                  const PaymentIcon = paymentMethod.icon;

                  return (
                    <tr key={expense.id} className="border-t border-gray-800 hover:bg-gray-800/30 transition-colors">
                      <td className="p-4">
                        <span className="text-white font-medium">{expense.id}</span>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">
                          <FileText size={14} />
                          <span>{expense.type}</span>
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-gray-300">{expense.description}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                            <span className="text-white text-sm">
                              {expense.staff.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="text-white">{expense.staff}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-gray-400">
                          <div>{expense.date}</div>
                          <div className="text-sm">{expense.time}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${paymentMethod.bg} ${paymentMethod.color} text-sm`}>
                          <PaymentIcon size={14} />
                          <span>{expense.paymentMethod}</span>
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${getStatusColor(expense.status)}`}>
                          {expense.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <span className="text-white font-bold">
                          {expense.amount.toLocaleString('tr-TR')} TL
                        </span>
                        {expense.vat && (
                          <div className="text-sm text-gray-400">+%{expense.vat} KDV</div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-96 bg-gray-900/90 border-l border-gray-800 p-6">
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white mb-6">Masraf İşlemleri</h2>
            
            {/* Expense Type Buttons */}
            {expenseTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`w-full p-4 rounded-xl border transition-all ${
                  selectedType === type.id
                    ? 'bg-blue-600/20 border-blue-500/50'
                    : 'bg-gray-800/50 border-gray-700 hover:border-blue-500/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${
                    selectedType === type.id ? 'bg-blue-500/30' : 'bg-blue-500/20'
                  }`}>
                    <type.icon size={24} className="text-blue-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-base font-medium text-white">{type.title}</h3>
                    <p className="text-sm text-gray-400">{type.description}</p>
                  </div>
                </div>
              </button>
            ))}

            {/* Return Button */}
            <button
              onClick={() => router.push('/')}
              className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white p-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Ana Sayfaya Dön</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensesPage;
