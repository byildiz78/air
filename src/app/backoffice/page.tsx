'use client';

import React from 'react';
import { Building2, Users, ShoppingBag, DollarSign,Backpack } from 'lucide-react';
import StatsCard, { StatsCardProps } from '../../components/backoffice/StatsCard';
import ModuleCard from '../../components/backoffice/ModuleCard';

export default function BackofficePage() {
  const stats: StatsCardProps[] = [
    {
      title: 'Veritabanı Boyutu',
      value: '1.2 GB',
      icon: Building2,
      trend: '+2.5%',
      trendDirection: 'up'
    },
    {
      title: 'Müşteri Sayısı',
      value: '1,234',
      icon: Users,
      trend: '+12.5%',
      trendDirection: 'up'
    },
    {
      title: 'Sipariş Sayısı',
      value: '42',
      icon: ShoppingBag,
      trend: '+8.2%',
      trendDirection: 'up'
    },
    {
      title: 'Personel Sayısı',
      value: '34',
      icon: DollarSign,
      trend: '+0%',
      trendDirection: 'neutral'
    }
  ];

  const modules = [
    {
      title: 'Genel Ayarlar',
      description: 'İşletme bilgileri, terminal ve güvenlik ayarları',
      icon: Building2,
      href: '/backoffice/general/business'
    },
    {
      title: 'Personel Ayarları',
      description: 'Personel yönetimi ve yetkilendirme',
      icon: Users,
      href: '/backoffice/staff'
    },
    {
      title: 'Masa Ayarları',
      description: 'Masa grupları ve masa tanımlamaları',
      icon: ShoppingBag,
      href: '/backoffice/tables/definitions'
    },
    {
      title: 'Menü Ayarları',
      description: 'Ürünler, kategoriler ve fiyatlandırma',
      icon: DollarSign,
      href: '/backoffice/menu/products'
    },
    {
      title: 'Bakım İşlemleri',
      description: 'Bakım işlemlerini yönetin',
      icon: DollarSign,
      href: '/backoffice/maintenance'
    },
    {
      title: '<--- Satış Ekranına Dön',
      description: 'Satış ekranına dönmek için tıklayın',
      icon: Backpack,
      color: 'text-red-500',
      href: '/'
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Yönetim Paneli</h1>
      
      {/* Stats Grid */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Modules Grid */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Modüller</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((module, index) => (
            <ModuleCard key={index} {...module} />
          ))}
        </div>
      </div>
    </div>
  );
}