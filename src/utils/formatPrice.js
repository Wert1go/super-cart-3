/**
 * Форматирует цену в рублях
 * @param {number} price - Цена в рублях
 * @returns {string} Форматированная цена с символом рубля
 */
export const formatPrice = (price) => `${price}₽`;

/**
 * Парсит строку с ценой в число
 * @param {string} priceStr - Строка с ценой (например, "499₽")
 * @returns {number} Числовое значение цены
 */
export const parsePrice = (priceStr) => {
  return parseInt(priceStr.replace(/[^\d]/g, ''), 10) || 0;
};

export default formatPrice;

