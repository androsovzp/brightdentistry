/**
 * Utility to send order notifications to Telegram Bot
 */
export async function sendTelegramOrder(orderData) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN || '8786929715:AAHVrOXFi6LrjN7U0KU-TEmGoISgTZu9xQ0';
  const chatId = process.env.TELEGRAM_CHAT_ID || '-1003957665828';

  if (!botToken || !chatId) {
    throw new Error('Telegram Bot Token or Chat ID is missing');
  }

  const { orderId, customer, items, totalPrice, paymentMethod, deliveryMethod } = orderData;

  // Format Items list
  const itemsText = items
    .map(
      (item, idx) =>
        `<b>${idx + 1}. ${escapeHtml(item.product.title)}</b>\n   • Код: <code>${item.product.code}</code> | ${item.quantity} шт x ${item.product.price} грн = <b>${item.quantity * item.product.price} грн</b>`
    )
    .join('\n\n');

  const message = `
<b>🛍 НОВЕ ЗАМОВЛЕННЯ #${orderId}</b>
<i>Клініка Bright Dentistry</i>
----------------------------------
<b>👤 Клієнт:</b> ${escapeHtml(customer.firstName)} ${escapeHtml(customer.lastName)}
<b>📞 Телефон:</b> <code>${escapeHtml(customer.phone)}</code>
<b>🚚 Доставка:</b> ${escapeHtml(deliveryMethod)} (${escapeHtml(customer.city)}, ${escapeHtml(customer.warehouse)})
<b>💳 Спосіб оплати:</b> ${escapeHtml(paymentMethod)}
${customer.notes ? `<b>📝 Коментар:</b> ${escapeHtml(customer.notes)}\n` : ''}
----------------------------------
<b>📦 Склад замовлення:</b>

${itemsText}

----------------------------------
<b>💰 ЗАГАЛЬНА СУМА: ${totalPrice} грн</b>
  `.trim();

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML',
    }),
  });

  const data = await response.json();
  if (!data.ok) {
    console.error('Telegram API error:', data);
    throw new Error(`Telegram error: ${data.description || 'Unknown error'}`);
  }

  return data;
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
