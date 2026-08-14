from functools import reduce
import telebot
from telebot import types

TOKEN = "8839377652:AAFsnfqOxhcLz-VGU8BHC8v-z8KGFEGQsT4"
bot = telebot.TeleBot(TOKEN)


# --- 1. КЛАС ТОВАРУ ---
class Product:

  def __init__(self, name: str, price: float, quantity: int):
    self.name = name
    self.price = price
    self.quantity = quantity


# База даних товарів (список об'єктів)
products_list = [
    Product("Laptop", 1200.0, 10),
    Product("Smartphone", 800.0, 25),
    Product("TV", 2100.0, 5),
    Product("Monitor", 450.0, 15),
]


# --- 2. МЕНЮ З КНОПКАМИ ---
@bot.message_handler(commands=["start"])
def send_welcome(message):
  markup = types.ReplyKeyboardMarkup(resize_keyboard=True)
  btn1 = types.KeyboardButton("📦 Усі товари")
  btn2 = types.KeyboardButton("💎 Найдорожчий товар")
  btn3 = types.KeyboardButton("🔍 Пошук товару")  # Додали нову кнопку

  markup.add(btn1, btn2)
  markup.add(btn3)

  bot.send_message(
      message.chat.id,
      f"Привіт, {message.from_user.first_name}! Обери дію з меню:",
      reply_markup=markup,
  )


# --- 3. ПОКАЗ УСІХ ТОВАРІВ ---
@bot.message_handler(func=lambda message: message.text == "📦 Усі товари")
def show_all_products(message):
  text = "<b>Список товарів на складі:</b>\n\n"
  for p in products_list:
    text += f"• <b>{p.name}</b> | Ціна: ${p.price} | Кількість: {p.quantity} шт.\n"

  bot.send_message(message.chat.id, text, parse_mode="HTML")


# --- 4. ПОКАЗ НАЙДОРОЖЧОГО ТОВАРУ (REDUCE + LAMBDA) ---
@bot.message_handler(func=lambda message: message.text == "💎 Найдорожчий товар")
def show_most_expensive(message):
  compare_price = lambda p1, p2: p1 if p1.price > p2.price else p2
  best_product = reduce(compare_price, products_list)

  text = (
      f"<b>Найдорожчий товар:</b>\n\n"
      f"Назва: {best_product.name}\n"
      f"Ціна: ${best_product.price}\n"
      f"Залишок: {best_product.quantity} шт."
  )
  bot.send_message(message.chat.id, text, parse_mode="HTML")


# --- 5. ПОШУК ТОВАРУ: КРОК 1 (ЗАПИТАННЯ ВІД БОТА) ---
@bot.message_handler(func=lambda message: message.text == "🔍 Пошук товару")
def ask_product_name(message):
  # 1. Відправляємо підказку користувачу
  msg = bot.send_message(
      message.chat.id, "Введіть назву товару (або її частину) для пошуку:"
  )

  # 2. Вказуємо боту, що наступний текст від користувача має обробити функція process_product_search
  bot.register_next_step_handler(msg, process_product_search)


# --- 6. ПОШУК ТОВАРУ: КРОК 2 (ОБРОБКА ТЕКСТУ ТА FILTER + LAMBDA) ---
def process_product_search(message):
  # Отримуємо введений текст і переводимо його в нижній регістр (щоб не зважати на великі/малі літери)
  search_query = message.text.strip().lower()

  # Фільтруємо список: перевіряємо, чи входить введений текст у назву товару (p.name.lower())
  found_products = list(
      filter(lambda p: search_query in p.name.lower(), products_list)
  )

  # Формуємо відповідь залежно від результату
  if found_products:
    response = "<b>Знайдені товари:</b>\n\n"
    for p in found_products:
      response += (
          f"• <b>{p.name}</b> | Ціна: ${p.price} | Залишок: {p.quantity} шт.\n"
      )
  else:
    response = (
        f"❌ На жаль, товар із назвою <i>'{message.text}'</i> не знайдено."
    )

  bot.send_message(message.chat.id, response, parse_mode="HTML")


# Запуск бота
bot.infinity_polling()