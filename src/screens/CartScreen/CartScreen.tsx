import React, { useState } from 'react';

// Types
import type { Store, CartItem, RecommendedProduct, TabItem } from '../../types';

// Layout Components
import { DeviceFrame } from '../../components/layout/DeviceFrame';
import { SafeAreaTop, SafeAreaBottom } from '../../components/layout/SafeArea';
import { StatusBar } from '../../components/layout/StatusBar';
import { Header } from '../../components/layout/Header';
import { TabBar } from '../../components/layout/TabBar';

// Feature Components
import { StoreSelector } from '../../components/delivery/StoreSelector';
import { DeliverySummary } from '../../components/delivery/DeliverySummary';
import { CartList } from '../../components/cart/CartList';
import { RecommendationsList } from '../../components/recommendations/RecommendationsList';
import { CheckoutBlock } from '../../components/checkout/CheckoutBlock';

// Hooks
import { useCart, useDelivery, useDiscount, useCheckout } from '../../hooks';

import './CartScreen.css';

// ===== Static Data =====
const STORES: Store[] = [
  { id: 'small-store', name: 'Лавка у дома', deliveryTime: '15-30 мин' },
  { id: 'big-store', name: 'Большая Лавка', deliveryTime: '60-90 мин' }
];

const RECOMMENDATIONS: RecommendedProduct[] = [
  { id: 'rec-1', name: 'Сникерс', image: 'Assets/figma/components/recommended-product-1.png', addButton: 'Assets/figma/icons/add-button-1.png', price: '279₽', priceNum: 279 },
  { id: 'rec-2', name: 'M&Ms', image: 'Assets/figma/components/recommended-product-2.png', addButton: 'Assets/figma/icons/add-button-2.png', price: '238₽', priceNum: 238 },
  { id: 'rec-3', name: 'Orbit', image: 'Assets/figma/components/recommended-product-3.png', addButton: 'Assets/figma/icons/add-button-3.png', price: '50₽', priceNum: 50 },
  { id: 'rec-4', name: 'M&Ms большой', image: 'Assets/figma/components/recommended-product-4.png', addButton: 'Assets/figma/icons/add-button-4.png', price: '159₽', priceNum: 159 },
  { id: 'rec-5', name: 'Сухарики', image: 'Assets/figma/components/recommended-product-5.png', addButton: 'Assets/figma/icons/add-button-5.png', price: '109₽', priceNum: 109 }
];

const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 'product-1',
    image: 'Assets/figma/components/product-ice-cream.png',
    name: 'Мороженое миндальное Из Лавки с печеньем',
    priceNum: 499,
    weight: '330Г',
    quantity: 1
  },
  {
    id: 'product-2',
    image: 'Assets/figma/components/product-drink.png',
    name: 'Напиток Drive Me Max Оригинальный',
    priceNum: 99,
    weight: '449 мл',
    quantity: 1
  }
];

const TABS: Omit<TabItem, 'badge'>[] = [
  { id: 'lavka', icon: 'Assets/figma/icons/lavka-tab-icon.png' },
  { id: 'grocery', icon: 'Assets/figma/icons/grocery-tab-icon.png' },
  { id: 'food', icon: 'Assets/figma/icons/food-tab-icon.png' },
  { id: 'cart', icon: 'Assets/figma/icons/cart-tab-icon.png' }
];

// ===== Main Cart Screen Component =====
export const CartScreen: React.FC = () => {
  // ===== UI State =====
  const [selectedStore, setSelectedStore] = useState<string>('big-store');
  const [activeTab, setActiveTab] = useState<string>('cart');

  // ===== Business Logic Hooks =====
  const cart = useCart(INITIAL_CART_ITEMS);
  const delivery = useDelivery(cart.subtotal);
  const discount = useDiscount(cart.subtotal);
  const checkout = useCheckout({
    subtotal: cart.subtotal,
    deliveryPrice: delivery.price,
    discountAmount: discount.amount,
    items: cart.items,
    totalCount: cart.totalCount
  });

  // ===== Derived Data =====
  const selectedStoreData = STORES.find(s => s.id === selectedStore);
  const deliveryTime = selectedStoreData?.deliveryTime || '60-90 мин';

  // ===== Handlers =====
  const handleClearCart = (): void => {
    if (!cart.isEmpty && window.confirm('Очистить корзину?')) {
      cart.clearCart();
      discount.reset();
    }
  };

  // ===== Render Data =====
  const tabs: TabItem[] = TABS.map(tab => ({
    ...tab,
    badge: tab.id === 'cart' ? cart.totalCount : 0
  }));

  const discountData = {
    text: `${discount.maxAmount}₽ при заказе от ${discount.minOrder}₽`,
    promoText: 'Другие промокоды',
    badge: '+6',
    enabled: discount.enabled,
    canApply: discount.canApply,
    discountAmount: discount.maxAmount
  };

  const checkoutData = {
    deliveryTime,
    label: 'К оплате',
    total: checkout.totalFormatted,
    disabled: cart.isEmpty
  };

  // ===== Render =====
  return (
    <DeviceFrame>
      {/* ===== FIXED TOP ===== */}
      <SafeAreaTop />
      <StatusBar />
      <Header 
        title="Корзина"
        itemsCount={cart.totalCount}
        onShare={checkout.share}
        onSearch={() => alert('Поиск товаров')}
        onTrash={handleClearCart}
      />

      {/* ===== SCROLLABLE CONTENT ===== */}
      <div className="content-area">
        <StoreSelector 
          stores={STORES}
          selectedId={selectedStore}
          onSelect={setSelectedStore}
        />
        
        <DeliverySummary 
          deliveryTime={deliveryTime}
          deliveryPrice={delivery.basePrice}
          freeDeliveryRemaining={delivery.freeDeliveryRemaining}
          progressPercent={delivery.progressPercent}
          isFreeDelivery={delivery.isFree}
        />
        
        <CartList 
          items={cart.items}
          onUpdateQuantity={cart.updateQuantity}
        />
        
        <RecommendationsList
          title="Порадовать себя"
          items={RECOMMENDATIONS}
          onAddProduct={cart.addItem}
          cartItemIds={cart.itemIds}
        />
      </div>

      {/* ===== FIXED BOTTOM ===== */}
      <div className="bottom-block">
        <CheckoutBlock
          discount={discountData}
          checkout={checkoutData}
          onToggleDiscount={discount.toggle}
          onCheckout={checkout.checkout}
        />
        
        <TabBar
          tabs={tabs}
          activeId={activeTab}
          onSelect={setActiveTab}
        />
        
        <SafeAreaBottom />
      </div>
    </DeviceFrame>
  );
};

export default CartScreen;
