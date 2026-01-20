import { NextRequest, NextResponse } from "next/server";
import { CartItem, CustomerInfo } from "@/types";

interface OrderRequest {
  customerInfo: CustomerInfo;
  items: CartItem[];
  totalPrice: number;
  orderId: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: OrderRequest = await request.json();
    const { customerInfo, items, totalPrice, orderId } = body;

    // Получаем токен бота и chat_id из переменных окружения
    const botToken = process.env.BOT_TOKEN;
    const adminIdsString = process.env.ADMIN_IDS;

    if (!botToken || !adminIdsString) {
      return NextResponse.json(
        { error: "Telegram bot configuration is missing" },
        { status: 500 }
      );
    }

    // Парсим массив администраторов из строки
    let adminIds: number[];
    try {
      adminIds = JSON.parse(adminIdsString);
      if (!Array.isArray(adminIds)) {
        throw new Error("ADMIN_IDS must be an array");
      }
    } catch (error) {
      console.error("Error parsing ADMIN_IDS:", error);
      return NextResponse.json(
        { error: "Invalid ADMIN_IDS format. Expected JSON array like [123456789,987654321]" },
        { status: 500 }
      );
    }

    // Формируем сообщение в нужном формате
    const orderItems = items
      .map((item) => {
        // Используем русское название по умолчанию, можно изменить на другой язык
        const productName = item.name.ru || item.name.en || item.name.tr || item.name.uk;
        return `   • ${productName} x${item.quantity} = ${item.price * item.quantity} TL`;
      })
      .join("\n");

    const message = `🆕 Новый заказ!

👤 Клиент:
   ID: ${customerInfo.phone.replace(/\D/g, "")}
   Имя: ${customerInfo.name}
   Телефон: ${customerInfo.phone}

📦 Заказ:
${orderItems}

💰 Итого: ${totalPrice} TL

🆔 ID заказа: #${orderId}`;

    // Отправляем сообщение каждому администратору
    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const sendPromises = adminIds.map(async (adminId) => {
      try {
        const response = await fetch(telegramApiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: adminId,
            text: message,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error(`Telegram API error for chat_id ${adminId}:`, errorData);
          return { success: false, adminId, error: errorData };
        }

        return { success: true, adminId };
      } catch (error) {
        console.error(`Error sending message to admin ${adminId}:`, error);
        return { success: false, adminId, error };
      }
    });

    const results = await Promise.all(sendPromises);
    const successCount = results.filter((r) => r.success).length;

    // Если хотя бы одно сообщение отправлено успешно, считаем операцию успешной
    if (successCount > 0) {
      return NextResponse.json({
        success: true,
        sentTo: successCount,
        total: adminIds.length
      });
    } else {
      // Если ни одно сообщение не отправлено, возвращаем ошибку
      return NextResponse.json(
        {
          error: "Failed to send order to Telegram",
          details: results
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing order:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
