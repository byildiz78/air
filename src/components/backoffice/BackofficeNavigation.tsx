'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Settings, Users, Layout, Menu, Tag, Package,
  Search, Database, Smartphone, FileText, ChevronDown,
  Building2, Shield, Monitor, CreditCard, ShoppingBag, Tablet, Printer, Globe
} from 'lucide-react';

interface NavItem {
  title: string;
  icon: any;
  href: string;
  items?: NavItem[];
}

const navigation: NavItem[] = [
  {
    title: 'Genel Ayarlar',
    icon: Settings,
    href: '/backoffice/general',
    items: [
      { title: 'İşletme Ayarları', icon: Building2, href: '/backoffice/general/business' },
      { title: 'Merkezi Yönetim Ayarları', icon: Globe, href: '/backoffice/general/central' },
      { title: 'Terminal Ayarları', icon: Monitor, href: '/backoffice/general/terminal' },
      { title: 'Güvenlik Ayarları', icon: Shield, href: '/backoffice/general/security' },
    ]
  },
  {
    title: 'Personel Ayarları',
    icon: Users,
    href: '/backoffice/staff'
  },
  {
    title: 'Masa Ayarları',
    icon: Layout,
    href: '/backoffice/tables',
    items: [
      { title: 'Masa Grupları', icon: Package, href: '/backoffice/tables/groups' },
      { title: 'Masa Tanımları', icon: Layout, href: '/backoffice/tables/definitions' }
    ]
  },
  {
    title: 'Menü Ayarları',
    icon: Menu,
    href: '/backoffice/menu',
    items: [
      { title: 'Menü Grupları', icon: Package, href: '/backoffice/menu/groups' },
      { title: 'Ürünler', icon: Tag, href: '/backoffice/menu/products' },
      { title: 'Kombo Menüler', icon: Package, href: '/backoffice/menu/combos' }
    ]
  },
  {
    title: 'İndirim & Promosyon',
    icon: Tag,
    href: '/backoffice/promotions'
  },
  {
    title: 'Arama',
    icon: Search,
    href: '/backoffice/search'
  },
  {
    title: 'Veritabanı',
    icon: Database,
    href: '/backoffice/database'
  },
  {
    title: 'Android Yazarkasa',
    icon: Smartphone,
    href: '/backoffice/android'
  },
  {
    title: 'Özel İptal Sebepleri',
    icon: FileText,
    href: '/backoffice/cancellation'
  }
];

const BackofficeNavigation = () => {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (title: string) => {
    setExpandedItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => pathname === href;

  const renderNavItem = (item: NavItem, depth = 0) => {
    const hasSubItems = item.items && item.items.length > 0;
    const isExpanded = expandedItems.includes(item.title);
    const Icon = item.icon;

    return (
      <div key={item.href}>
        <Link
          href={item.href}
          className={`
            flex items-center px-4 py-2.5 text-sm font-medium rounded-lg
            ${isActive(item.href)
              ? 'bg-blue-500 text-white'
              : 'text-gray-700 hover:bg-gray-100'
            }
            ${depth > 0 ? 'ml-4' : ''}
          `}
          onClick={(e) => {
            if (hasSubItems) {
              e.preventDefault();
              toggleExpand(item.title);
            }
          }}
        >
          <Icon size={20} className={depth > 0 ? 'mr-2' : 'mr-3'} />
          <span className="flex-1">{item.title}</span>
          {hasSubItems && (
            <ChevronDown
              size={16}
              className={`transform transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          )}
        </Link>
        
        {hasSubItems && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.items.map(subItem => renderNavItem(subItem, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center mb-8">
          <span className="text-2xl font-bold text-gray-800">
            robot<span className="text-blue-600">POS Air</span>
          </span>
        </div>

        <div className="space-y-1">
          {navigation.map(item => renderNavItem(item))}
        </div>
      </div>
    </nav>
  );
};

export default BackofficeNavigation;