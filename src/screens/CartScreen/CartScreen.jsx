import React, { useState, useMemo } from 'react';

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

// Utils & Constants
import { formatPrice } from '../../utils/formatPrice';
import { 
  FREE_DELIVERY_THRESHOLD, 
  BASE_DELIVERY_PRICE, 
  DISCOUNT_MIN_ORDER, 
  DISCOUNT_AMOUNT 
} from '../../constants/cart';

import './CartScreen.css';

// ===== Static Data =====
const STORES = [
  { id: 'small-store', name: 'Лавка у дома', deliveryTime: '15-30 мин' },
  { id: 'big-store', name: 'Большая Лавка', deliveryTime: '60-90 мин' }
];

const RECOMMENDATIONS = [
  { id: 'rec-1', name: 'Сникерс', image: 'Assets/figma/components/recommended-product-1.png', addButton: 'Assets/figma/icons/add-button-1.png', price: '279₽', priceNum: 279 },
  { id: 'rec-2', name: 'M&Ms', image: 'Assets/figma/components/recommended-product-2.png', addButton: 'Assets/figma/icons/add-button-2.png', price: '238₽', priceNum: 238 },
  { id: 'rec-3', name: 'Orbit', image: 'Assets/figma/components/recommended-product-3.png', addButton: 'Assets/figma/icons/add-button-3.png', price: '50₽', priceNum: 50 },
  { id: 'rec-4', name: 'M&Ms большой', image: 'Assets/figma/components/recommended-product-4.png', addButton: 'Assets/figma/icons/add-button-4.png', price: '159₽', priceNum: 159 },
  { id: 'rec-5', name: 'Сухарики', image: 'Assets/figma/components/recommended-product-5.png', addButton: 'Assets/figma/icons/add-button-5.png', price: '109₽', priceNum: 109 }
];

const INITIAL_CART_ITEMS = [
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

const TABS = [
  { id: 'lavka', icon: 'Assets/figma/icons/lavka-tab-icon.png' },
  { id: 'grocery', icon: 'Assets/figma/icons/grocery-tab-icon.png' },
  { id: 'food', icon: 'Assets/figma/icons/food-tab-icon.png' },
  { id: 'cart', icon: 'Assets/figma/icons/cart-tab-icon.png' }
];

// ===== Main Cart Screen Component =====
export const CartScreen = () => {
  // ===== State =====
  const [selectedStore, setSelectedStore] = useState('big-store');
  const [discountEnabled, setDiscountEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState('cart');
  const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS);

  // ===== Computed Values (Business Logic) =====
  const totalItemsCount = useMemo(() => 
    cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const subtotal = useMemo(() => 
    cartItems.reduce((sum, item) => sum + (item.priceNum * item.quantity), 0),
    [cartItems]
  );

  const deliveryPrice = useMemo(() => 
    subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : BASE_DELIVERY_PRICE,
    [subtotal]
  );

  const canApplyDiscount = subtotal >= DISCOUNT_MIN_ORDER;
  const appliedDiscount = (discountEnabled && canApplyDiscount) ? DISCOUNT_AMOUNT : 0;
  const totalPrice = subtotal + deliveryPrice - appliedDiscount;
  const freeDeliveryRemaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const deliveryProgressPercent = (subtotal / FREE_DELIVERY_THRESHOLD) * 100;
  const isFreeDelivery = deliveryPrice === 0;
  
  const selectedStoreData = STORES.find(s => s.id === selectedStore);
  const deliveryTime = selectedStoreData?.deliveryTime || '60-90 мин';
  const cartItemIds = cartItems.map(item => item.id);

  // ===== Handlers =====
  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(items => items.filter(item => item.id !== itemId));
    } else {
      setCartItems(items =>
        items.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleAddRecommended = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      handleUpdateQuantity(product.id, existingItem.quantity + 1);
    } else {
      setCartItems(items => [...items, {
        id: product.id,
        image: product.image,
        name: product.name,
        priceNum: product.priceNum,
        weight: '100Г',
        quantity: 1
      }]);
    }
  };

  const handleClearCart = () => {
    if (cartItems.length > 0 && window.confirm('Очистить корзину?')) {
      setCartItems([]);
      setDiscountEnabled(false);
    }
  };

  const handleToggleDiscount = () => {
    if (canApplyDiscount) {
      setDiscountEnabled(prev => !prev);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    alert(`Оформление заказа:\n\nТоваров: ${totalItemsCount}\nСумма: ${formatPrice(subtotal)}\nДоставка: ${isFreeDelivery ? 'бесплатно' : formatPrice(deliveryPrice)}\nСкидка: ${appliedDiscount > 0 ? `-${formatPrice(appliedDiscount)}` : 'нет'}\n\nИтого: ${formatPrice(totalPrice)}`);
  };

  const handleShare = () => {
    const cartText = cartItems.map(item => 
      `${item.name} × ${item.quantity} = ${formatPrice(item.priceNum * item.quantity)}`
    ).join('\n');
    
    if (navigator.share) {
      navigator.share({
        title: 'Моя корзина',
        text: `${cartText}\n\nИтого: ${formatPrice(totalPrice)}`
      });
    } else {
      alert(`Корзина:\n${cartText}\n\nИтого: ${formatPrice(totalPrice)}`);
    }
  };

  // ===== Render Data =====
  const tabs = TABS.map(tab => ({
    ...tab,
    badge: tab.id === 'cart' ? totalItemsCount : 0
  }));

  const discount = {
    text: `${DISCOUNT_AMOUNT}₽ при заказе от ${DISCOUNT_MIN_ORDER}₽`,
    promoText: 'Другие промокоды',
    badge: '+6',
    enabled: discountEnabled,
    canApply: canApplyDiscount,
    discountAmount: DISCOUNT_AMOUNT
  };

  const checkout = {
    deliveryTime: deliveryTime,
    label: 'К оплате',
    total: formatPrice(totalPrice),
    disabled: cartItems.length === 0
  };

  // ===== Render =====
  return (
    <DeviceFrame>
      {/* ===== FIXED TOP ===== */}
      <SafeAreaTop />
      <StatusBar />
      <Header 
        title="Корзина"
        itemsCount={totalItemsCount}
        onShare={handleShare}
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
          deliveryPrice={BASE_DELIVERY_PRICE}
          freeDeliveryRemaining={freeDeliveryRemaining}
          progressPercent={deliveryProgressPercent}
          isFreeDelivery={isFreeDelivery}
        />
        
        <CartList 
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
        />
        
        <RecommendationsList
          title="Порадовать себя"
          items={RECOMMENDATIONS}
          onAddProduct={handleAddRecommended}
          cartItemIds={cartItemIds}
        />
      </div>

      {/* ===== FIXED BOTTOM ===== */}
      <div className="bottom-block">
        <CheckoutBlock
          discount={discount}
          checkout={checkout}
          onToggleDiscount={handleToggleDiscount}
          onCheckout={handleCheckout}
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

