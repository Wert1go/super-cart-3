import React, { useState, useMemo } from 'react';
import './CartScreen.css';

// ===== Constants =====
const FREE_DELIVERY_THRESHOLD = 2551; // Порог бесплатной доставки
const BASE_DELIVERY_PRICE = 249; // Базовая стоимость доставки
const DISCOUNT_MIN_ORDER = 2500; // Минимальный заказ для скидки
const DISCOUNT_AMOUNT = 200; // Размер скидки

// ===== Utility Functions =====
const formatPrice = (price) => `${price}₽`;
const parsePrice = (priceStr) => parseInt(priceStr.replace(/[^\d]/g, ''), 10) || 0;

// ===== Status Bar =====
const StatusBar = () => {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
  });

  return (
    <div className="status-bar">
      <span className="status-bar__time">{time}</span>
      <div className="status-bar__right">
        <img className="status-bar__signal" src="Assets/figma/icons/signal-icon.png" alt="signal" />
        <span className="status-bar__network">LTE</span>
        <img className="status-bar__battery" src="Assets/figma/icons/battery-icon.png" alt="battery" />
      </div>
    </div>
  );
};

// ===== Header =====
const Header = ({ title, onShare, onSearch, onTrash, itemsCount }) => (
  <header className="header">
    <h1 className="header__title">{title} {itemsCount > 0 && `(${itemsCount})`}</h1>
    <div className="header__actions">
      <img className="header__action" src="Assets/figma/icons/share-icon.png" alt="share" onClick={onShare} />
      <img className="header__action" src="Assets/figma/icons/search-icon.png" alt="search" onClick={onSearch} />
      <img className="header__action" src="Assets/figma/icons/trash-icon.png" alt="trash" onClick={onTrash} />
    </div>
  </header>
);

// ===== Store Button =====
const StoreButton = ({ name, deliveryTime, selected, onClick }) => (
  <div 
    className={`store-button ${selected ? 'store-button--active' : ''}`}
    onClick={onClick}
  >
    <div className="store-button__name">{name}</div>
    <div className="store-button__time">{deliveryTime}</div>
  </div>
);

// ===== Store Selector =====
const StoreSelector = ({ stores, selectedId, onSelect }) => (
  <div className="store-selector">
    {stores.map(store => (
      <StoreButton
        key={store.id}
        name={store.name}
        deliveryTime={store.deliveryTime}
        selected={store.id === selectedId}
        onClick={() => onSelect(store.id)}
      />
    ))}
  </div>
);

// ===== Delivery Summary =====
const DeliverySummary = ({ 
  deliveryTime, 
  deliveryPrice, 
  freeDeliveryRemaining, 
  progressPercent,
  currentPrice,
  isFreeDelivery 
}) => (
  <div className="delivery-summary">
    <div className="delivery-summary__header">
      <span className="delivery-summary__main">
        {deliveryTime}, {isFreeDelivery ? 'бесплатно' : deliveryPrice}
      </span>
      <img 
        className="delivery-summary__info-btn" 
        src="Assets/figma/icons/delivery-info-icon.png" 
        alt="info" 
      />
    </div>
    <div className="delivery-summary__subtitle">
      {isFreeDelivery 
        ? '🎉 Бесплатная доставка!' 
        : `До бесплатной доставки ${freeDeliveryRemaining}`
      }
    </div>
    <div className="delivery-summary__progress">
      <div className="delivery-summary__progress-track">
        <div 
          className="delivery-summary__progress-fill" 
          style={{ width: `${Math.min(progressPercent, 100)}%` }}
        />
      </div>
    </div>
    <div className="delivery-summary__progress-labels">
      <span className={`delivery-summary__progress-label ${isFreeDelivery ? 'delivery-summary__progress-label--success' : ''}`}>
        {currentPrice}
      </span>
      <span className="delivery-summary__progress-label delivery-summary__progress-label--end">0₽</span>
    </div>
  </div>
);

// ===== Quantity Controller =====
const QuantityController = ({ quantity, onIncrement, onDecrement }) => (
  <div className="quantity-controller">
    <div className="quantity-controller__btn" onClick={onDecrement}>
      <img src="Assets/figma/icons/minus-icon.png" alt="minus" />
    </div>
    <span className="quantity-controller__value">{quantity}</span>
    <div className="quantity-controller__btn" onClick={onIncrement}>
      <img src="Assets/figma/icons/plus-icon.png" alt="plus" />
    </div>
  </div>
);

// ===== Cart Item =====
const CartItem = ({ image, name, price, priceNum, weight, quantity, onIncrement, onDecrement }) => (
  <div className="cart-item">
    <img className="cart-item__image" src={image} alt={name} />
    <div className="cart-item__info">
      <div className="cart-item__name">{name}</div>
      <div className="cart-item__meta">
        <span className="cart-item__price">{formatPrice(priceNum * quantity)}</span>
        <span className="cart-item__weight">{weight}</span>
        {quantity > 1 && (
          <span className="cart-item__unit-price">({formatPrice(priceNum)} × {quantity})</span>
        )}
      </div>
    </div>
    <QuantityController 
      quantity={quantity} 
      onIncrement={onIncrement}
      onDecrement={onDecrement}
    />
  </div>
);

// ===== Cart Items List =====
const CartItems = ({ items, onUpdateQuantity }) => (
  <div className="cart-items">
    {items.length === 0 ? (
      <div className="cart-items__empty">
        <p>Корзина пуста</p>
        <p className="cart-items__empty-hint">Добавьте товары из рекомендаций</p>
      </div>
    ) : (
      items.map(item => (
        <CartItem
          key={item.id}
          {...item}
          onIncrement={() => onUpdateQuantity(item.id, item.quantity + 1)}
          onDecrement={() => onUpdateQuantity(item.id, item.quantity - 1)}
        />
      ))
    )}
  </div>
);

// ===== Recommended Product =====
const RecommendedProduct = ({ image, addButton, price, priceNum, onAdd, inCart }) => (
  <div className={`recommended-product ${inCart ? 'recommended-product--in-cart' : ''}`}>
    <div className="recommended-product__image-wrapper">
      <img className="recommended-product__image" src={image} alt="Product" />
      <img 
        className="recommended-product__add" 
        src={addButton} 
        alt="Add" 
        onClick={onAdd} 
      />
      {inCart && <span className="recommended-product__in-cart-badge">✓</span>}
    </div>
    <span className="recommended-product__price">{price}</span>
  </div>
);

// ===== Recommendations =====
const Recommendations = ({ title, items, onAddProduct, cartItemIds }) => (
  <div className="recommendations">
    <h2 className="recommendations__title">{title}</h2>
    <div className="recommendations__list">
      {items.map(item => (
        <RecommendedProduct
          key={item.id}
          {...item}
          onAdd={() => onAddProduct(item)}
          inCart={cartItemIds.includes(item.id)}
        />
      ))}
    </div>
  </div>
);

// ===== Checkout Button =====
const CheckoutButton = ({ deliveryTime, label, total, onClick, disabled }) => (
  <div 
    className={`checkout-button ${disabled ? 'checkout-button--disabled' : ''}`} 
    onClick={disabled ? undefined : onClick}
  >
    <span className="checkout-button__time">{deliveryTime}</span>
    <span className="checkout-button__label">{label}</span>
    <span className="checkout-button__total">{total}</span>
  </div>
);

// ===== Discount Section =====
const DiscountSection = ({ 
  discountText, 
  promoText, 
  badge, 
  enabled, 
  onToggle, 
  canApply,
  discountAmount 
}) => (
  <div className={`discount-section ${!canApply ? 'discount-section--disabled' : ''}`}>
    <div className="discount-section__left">
      <div className="discount-section__icon-wrapper">
        <img className="discount-section__icon" src="Assets/figma/icons/discount-icon.png" alt="discount" />
        <span className="discount-section__badge">{badge}</span>
      </div>
      <div className="discount-section__info">
        <div className="discount-section__text">
          {enabled && canApply ? `−${discountAmount}₽ применено` : discountText}
        </div>
        <div className="discount-section__promo">
          {promoText}
          <img className="discount-section__promo-arrow" src="Assets/figma/icons/more-info-icon.png" alt="more" />
        </div>
      </div>
    </div>
    <div 
      className={`discount-section__toggle-wrapper ${enabled ? 'discount-section__toggle-wrapper--active' : ''}`}
      onClick={canApply ? onToggle : undefined}
    >
      <div className="discount-section__toggle-track">
        <div className="discount-section__toggle-thumb" />
      </div>
    </div>
  </div>
);

// ===== Checkout Block =====
const CheckoutBlock = ({ discount, checkout, onToggleDiscount, onCheckout }) => (
  <div className="checkout-block">
    <DiscountSection
      discountText={discount.text}
      promoText={discount.promoText}
      badge={discount.badge}
      enabled={discount.enabled}
      onToggle={onToggleDiscount}
      canApply={discount.canApply}
      discountAmount={discount.discountAmount}
    />
    <CheckoutButton
      deliveryTime={checkout.deliveryTime}
      label={checkout.label}
      total={checkout.total}
      onClick={onCheckout}
      disabled={checkout.disabled}
    />
  </div>
);

// ===== Tab Bar Item =====
const TabBarItem = ({ icon, badge, active, onClick }) => (
  <div className={`tabbar__item ${active ? 'tabbar__item--active' : ''}`} onClick={onClick}>
    <img className="tabbar__icon" src={icon} alt="" />
    {badge > 0 && <span className="tabbar__badge">{badge}</span>}
  </div>
);

// ===== Tab Bar =====
const TabBar = ({ tabs, activeId, onSelect }) => (
  <nav className="tabbar">
    {tabs.map(tab => (
      <TabBarItem
        key={tab.id}
        icon={tab.icon}
        badge={tab.badge}
        active={tab.id === activeId}
        onClick={() => onSelect(tab.id)}
      />
    ))}
  </nav>
);

// ===== Main Cart Screen Component =====
const CartScreen = () => {
  // ===== State =====
  const [selectedStore, setSelectedStore] = useState('big-store');
  const [discountEnabled, setDiscountEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState('cart');
  
  const [cartItems, setCartItems] = useState([
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
  ]);

  // ===== Static Data =====
  const stores = [
    { id: 'small-store', name: 'Лавка у дома', deliveryTime: '15-30 мин' },
    { id: 'big-store', name: 'Большая Лавка', deliveryTime: '60-90 мин' }
  ];

  const recommendations = [
    { id: 'rec-1', name: 'Сникерс', image: 'Assets/figma/components/recommended-product-1.png', addButton: 'Assets/figma/icons/add-button-1.png', price: '279₽', priceNum: 279 },
    { id: 'rec-2', name: 'M&Ms', image: 'Assets/figma/components/recommended-product-2.png', addButton: 'Assets/figma/icons/add-button-2.png', price: '238₽', priceNum: 238 },
    { id: 'rec-3', name: 'Orbit', image: 'Assets/figma/components/recommended-product-3.png', addButton: 'Assets/figma/icons/add-button-3.png', price: '50₽', priceNum: 50 },
    { id: 'rec-4', name: 'M&Ms большой', image: 'Assets/figma/components/recommended-product-4.png', addButton: 'Assets/figma/icons/add-button-4.png', price: '159₽', priceNum: 159 },
    { id: 'rec-5', name: 'Сухарики', image: 'Assets/figma/components/recommended-product-5.png', addButton: 'Assets/figma/icons/add-button-5.png', price: '109₽', priceNum: 109 }
  ];

  // ===== Computed Values (Business Logic) =====
  
  // Общее количество товаров в корзине
  const totalItemsCount = useMemo(() => 
    cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  // Сумма товаров (без доставки и скидки)
  const subtotal = useMemo(() => 
    cartItems.reduce((sum, item) => sum + (item.priceNum * item.quantity), 0),
    [cartItems]
  );

  // Стоимость доставки (зависит от суммы заказа)
  const deliveryPrice = useMemo(() => 
    subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : BASE_DELIVERY_PRICE,
    [subtotal]
  );

  // Можно ли применить скидку
  const canApplyDiscount = subtotal >= DISCOUNT_MIN_ORDER;

  // Размер применяемой скидки
  const appliedDiscount = (discountEnabled && canApplyDiscount) ? DISCOUNT_AMOUNT : 0;

  // Итоговая сумма к оплате
  const totalPrice = subtotal + deliveryPrice - appliedDiscount;

  // До бесплатной доставки осталось
  const freeDeliveryRemaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  // Прогресс до бесплатной доставки (в процентах)
  const deliveryProgressPercent = (subtotal / FREE_DELIVERY_THRESHOLD) * 100;

  // Бесплатная ли доставка
  const isFreeDelivery = deliveryPrice === 0;

  // Время доставки выбранного магазина
  const selectedStoreData = stores.find(s => s.id === selectedStore);
  const deliveryTime = selectedStoreData?.deliveryTime || '60-90 мин';

  // ID товаров в корзине (для отметки в рекомендациях)
  const cartItemIds = cartItems.map(item => item.id);

  // ===== Handlers =====
  
  // Обновление количества товара
  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      // Удаляем товар из корзины
      setCartItems(items => items.filter(item => item.id !== itemId));
    } else {
      setCartItems(items =>
        items.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  // Добавление рекомендованного товара в корзину
  const handleAddRecommended = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      // Увеличиваем количество существующего товара
      handleUpdateQuantity(product.id, existingItem.quantity + 1);
    } else {
      // Добавляем новый товар
      setCartItems(items => [...items, {
        id: product.id,
        image: product.image,
        name: product.name,
        priceNum: product.priceNum,
        weight: '100Г', // Дефолтный вес для рекомендаций
        quantity: 1
      }]);
    }
  };

  // Очистка корзины
  const handleClearCart = () => {
    if (cartItems.length > 0 && window.confirm('Очистить корзину?')) {
      setCartItems([]);
      setDiscountEnabled(false);
    }
  };

  // Переключение скидки
  const handleToggleDiscount = () => {
    if (canApplyDiscount) {
      setDiscountEnabled(prev => !prev);
    }
  };

  // Переход к оформлению заказа
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    alert(`Оформление заказа:\n\nТоваров: ${totalItemsCount}\nСумма: ${formatPrice(subtotal)}\nДоставка: ${isFreeDelivery ? 'бесплатно' : formatPrice(deliveryPrice)}\nСкидка: ${appliedDiscount > 0 ? `-${formatPrice(appliedDiscount)}` : 'нет'}\n\nИтого: ${formatPrice(totalPrice)}`);
  };

  // Шаринг корзины
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
  const tabs = [
    { id: 'lavka', icon: 'Assets/figma/icons/lavka-tab-icon.png', badge: 0 },
    { id: 'grocery', icon: 'Assets/figma/icons/grocery-tab-icon.png', badge: 0 },
    { id: 'food', icon: 'Assets/figma/icons/food-tab-icon.png', badge: 0 },
    { id: 'cart', icon: 'Assets/figma/icons/cart-tab-icon.png', badge: totalItemsCount }
  ];

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
    <div className="device-scale-wrapper">
      <div className="app-viewport">
        {/* ===== FIXED TOP ===== */}
        <div className="safe-area-top" />
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
            stores={stores}
            selectedId={selectedStore}
            onSelect={setSelectedStore}
          />
          
          <DeliverySummary 
            deliveryTime={deliveryTime}
            deliveryPrice={formatPrice(BASE_DELIVERY_PRICE)}
            freeDeliveryRemaining={formatPrice(freeDeliveryRemaining)}
            progressPercent={deliveryProgressPercent}
            currentPrice={formatPrice(deliveryPrice)}
            isFreeDelivery={isFreeDelivery}
          />
          
          <CartItems 
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
          />
          
          <Recommendations
            title="Порадовать себя"
            items={recommendations}
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
          
          <div className="safe-area-bottom">
            <div className="home-indicator" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
