import requests
from flask import Flask, render_template, request

app = Flask(__name__)

# Твої дані для Telegram
TELEGRAM_BOT_TOKEN = "8839377652:AAFsnfqOxhcLz-VGU8BHC8v-z8KGFEGQsT4"
TELEGRAM_CHAT_ID = "964047948"  # Наприклад: "123456789"


def send_telegram_message(message_text):
    """Функція надсилає сповіщення у твій Telegram"""
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {"chat_id": TELEGRAM_CHAT_ID, "text": message_text, "parse_mode": "HTML"}
    try:
        requests.post(url, data=payload)
    except Exception as e:
        print(f"Помилка відправки в Telegram: {e}")


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/booking", methods=["POST"])
def booking():
    client_name = request.form.get("client_name")
    client_phone = request.form.get("client_phone")
    service_type = request.form.get("service_type")

    # Формуємо текст повідомлення для Telegram
    telegram_text = (
        f"<b>📩 НОВЕ ЗАПИСАННЯ НА СЕРВІС!</b>\n\n"
        f"<b>👤 Клієнт:</b> {client_name}\n"
        f"<b>📞 Телефон:</b> {client_phone}\n"
        f"<b>🛠 Послуга:</b> {service_type}"
    )

    # Відправляємо в Telegram
    send_telegram_message(telegram_text)

    # Друк у консоль PyCharm для перевірки
    print("=" * 40)
    print(f"Заявка від {client_name} відправлена в Telegram!")
    print("=" * 40)

    return f"<h3>Дякуємо, {client_name}! Ваша заявка прийнята. Ми зателефонуємо вам за номером {client_phone}.</h3>"


if __name__ == "__main__":
    app.run(debug=True, port=5000)