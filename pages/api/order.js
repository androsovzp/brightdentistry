import { sendTelegramOrder } from '@/lib/telegram';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { customer, items, totalPrice, paymentMethod, deliveryMethod } = req.body;

    if (!customer || !items || items.length === 0) {
      return res.status(400).json({ error: 'Некоректні дані замовлення' });
    }

    const orderId = `BD-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderData = {
      orderId,
      customer,
      items,
      totalPrice,
      paymentMethod: paymentMethod || 'Оплата при отриманні',
      deliveryMethod: deliveryMethod || 'Нова Пошта',
      createdAt: new Date().toISOString(),
    };

    // Send order to Telegram Bot
    await sendTelegramOrder(orderData);

    return res.status(200).json({
      success: true,
      orderId,
      message: 'Замовлення успішно створено та відправлено!',
    });
  } catch (error) {
    console.error('Error processing order:', error);
    return res.status(500).json({
      error: 'Помилка при відправці замовлення. Будь ласка, спробуйте ще раз.',
      details: error.message,
    });
  }
}
