import {
  Coffee,
  Pizza,
  Utensils,
  Salad,
  Beer,
  IceCream,
  Soup,
  Fish,
  Beef,
  Croissant,
  Wine,
  Sandwich
} from 'lucide-react';
import { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'coffee',
    name: 'Kahve',
    icon: Coffee,
    page: 1,
    products: [
      { id: 'espresso', name: 'Espresso', price: 15, icon: Coffee, barcode: '8680001', category: 'İçecek' },
      { id: 'latte', name: 'Latte', price: 20, icon: Coffee, barcode: '8680002', category: 'İçecek' },
      { id: 'cappuccino', name: 'Cappuccino', price: 22, icon: Coffee, barcode: '8680003', category: 'İçecek' },
      { id: 'americano', name: 'Americano', price: 18, icon: Coffee, barcode: '8680004', category: 'İçecek' },
      { id: 'mocha', name: 'Mocha', price: 25, icon: Coffee, barcode: '8680005', category: 'İçecek' },
      { id: 'turkish-coffee', name: 'Türk Kahvesi', price: 15, icon: Coffee, barcode: '8680006', category: 'İçecek' },
    ]
  },
  {
    id: 'combos',
    name: 'Menüler',
    icon: Sandwich,
    page: 1,
    products: [
      {
        id: 'classic-burger-menu',
        name: 'Klasik Burger Menü',
        price: 150,
        icon: Sandwich,
        category: 'Ana Yemek',
        isCombo: true,
        comboOptions: {
          mainItems: [
            { id: 'classic-burger', name: 'Klasik Burger' },
            { id: 'cheese-burger', name: 'Cheese Burger', extraPrice: 10 },
            { id: 'double-burger', name: 'Double Burger', extraPrice: 25 }
          ],
          sides: [
            { id: 'regular-fries', name: 'Patates Kızartması' },
            { id: 'curly-fries', name: 'Çıtır Patates', extraPrice: 5 },
            { id: 'onion-rings', name: 'Soğan Halkası', extraPrice: 8 }
          ],
          drinks: [
            { id: 'cola', name: 'Kola' },
            { id: 'fanta', name: 'Fanta' },
            { id: 'sprite', name: 'Sprite' },
            { id: 'ayran', name: 'Ayran' }
          ]
        }
      },
      {
        id: 'chicken-menu',
        name: 'Tavuk Menü',
        price: 120,
        icon: Sandwich,
        category: 'Ana Yemek',
        isCombo: true,
        comboOptions: {
          mainItems: [
            { id: 'grilled-chicken', name: 'Izgara Tavuk' },
            { id: 'crispy-chicken', name: 'Çıtır Tavuk', extraPrice: 10 },
            { id: 'spicy-chicken', name: 'Acılı Tavuk', extraPrice: 10 }
          ],
          sides: [
            { id: 'regular-fries', name: 'Patates Kızartması' },
            { id: 'rice', name: 'Pilav', extraPrice: 5 },
            { id: 'salad', name: 'Salata', extraPrice: 8 }
          ],
          drinks: [
            { id: 'cola', name: 'Kola' },
            { id: 'fanta', name: 'Fanta' },
            { id: 'sprite', name: 'Sprite' },
            { id: 'ayran', name: 'Ayran' }
          ]
        }
      }
    ]
  },
  {
    id: 'pizza',
    name: 'Pizza',
    icon: Pizza,
    page: 1,
    products: [
      { id: 'margherita', name: 'Margarita', price: 45, icon: Pizza, barcode: '8680010', category: 'Pizza' },
      { id: 'pepperoni', name: 'Pepperoni', price: 55, icon: Pizza, barcode: '8680011', category: 'Pizza' },
      { id: 'veggie', name: 'Vejeteryan', price: 50, icon: Pizza, barcode: '8680012', category: 'Pizza' },
      { id: 'bbq-chicken', name: 'BBQ Tavuk', price: 60, icon: Pizza, barcode: '8680013', category: 'Pizza' },
      { id: 'four-cheese', name: 'Dört Peynirli', price: 65, icon: Pizza, barcode: '8680014', category: 'Pizza' },
    ]
  },
  {
    id: 'main',
    name: 'Ana Yemek',
    icon: Utensils,
    page: 1,
    products: [
      { id: 'steak', name: 'Biftek', price: 120, icon: Beef, category: 'Ana Yemek' },
      { id: 'salmon', name: 'Somon', price: 90, icon: Fish, category: 'Ana Yemek' },
      { id: 'chicken', name: 'Tavuk', price: 70, icon: Utensils, category: 'Ana Yemek' },
      { id: 'meatballs', name: 'Köfte', price: 65, icon: Utensils, category: 'Ana Yemek' },
    ]
  },
  {
    id: 'salads',
    name: 'Salatalar',
    icon: Salad,
    page: 1,
    products: [
      { id: 'caesar', name: 'Sezar', price: 40, icon: Salad, category: 'Salata' },
      { id: 'greek', name: 'Akdeniz', price: 35, icon: Salad, category: 'Salata' },
      { id: 'tuna', name: 'Ton Balıklı', price: 45, icon: Salad, category: 'Salata' },
    ]
  },
  {
    id: 'soups',
    name: 'Çorbalar',
    icon: Soup,
    page: 2,
    products: [
      { id: 'lentil', name: 'Mercimek', price: 25, icon: Soup, category: 'Çorba' },
      { id: 'tomato', name: 'Domates', price: 25, icon: Soup, category: 'Çorba' },
      { id: 'chicken-soup', name: 'Tavuk', price: 30, icon: Soup, category: 'Çorba' },
    ]
  },
  {
    id: 'breakfast',
    name: 'Kahvaltı',
    icon: Croissant,
    page: 2,
    products: [
      { id: 'full', name: 'Serpme Kahvaltı', price: 120, icon: Croissant, category: 'Kahvaltı' },
      { id: 'english', name: 'İngiliz Kahvaltı', price: 90, icon: Croissant, category: 'Kahvaltı' },
      { id: 'continental', name: 'Kontinental', price: 70, icon: Croissant, category: 'Kahvaltı' },
    ]
  },
  {
    id: 'drinks',
    name: 'İçecekler',
    icon: Beer,
    page: 2,
    products: [
      { id: 'beer', name: 'Bira', price: 35, icon: Beer, category: 'İçecek' },
      { id: 'wine', name: 'Şarap', price: 45, icon: Wine, category: 'İçecek' },
      { id: 'raki', name: 'Rakı', price: 40, icon: Beer, category: 'İçecek' },
    ]
  },
  {
    id: 'desserts',
    name: 'Tatlılar',
    icon: IceCream,
    page: 2,
    products: [
      { id: 'kunefe', name: 'Künefe', price: 45, icon: IceCream, barcode: '8680013', category: 'Tatlı' },
      { id: 'baklava', name: 'Baklava', price: 40, icon: IceCream, barcode: '8680014', category: 'Tatlı' },
      { id: 'sutlac', name: 'Sütlaç', price: 30, icon: IceCream, barcode: '8680015', category: 'Tatlı' },
      { id: 'kazandibi', name: 'Kazandibi', price: 35, icon: IceCream, barcode: '8680016', category: 'Tatlı' },
      { id: 'dondurma', name: 'Dondurma', price: 25, icon: IceCream, barcode: '8680017', category: 'Tatlı' },
    ]
  },
];
