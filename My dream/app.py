from flask import Flask, render_template, request

app = Flask(__name__)

# 1. Головна сторінка сайту
@app.route('/')
def home():
    return render_template('index.html')

# 2. Обробка форми запису (саме цього маршруту не вистачало!)
@app.route('/booking', methods=['POST'])
def booking():
    # Отримуємо дані, які користувач ввів у вікні на сайті
    client_name = request.form.get("client_name")
    client_phone = request.form.get("client_phone")
    service_type = request.form.get("service_type")

    # Формуємо відповідь для користувача після успішного запису
    return f"""
    <div style="background-color: #0d0f12; color: #00ff66; font-family: sans-serif; text-align: center; padding: 50px; min-height: 100vh;">
        <h1>Дякуємо, {client_name}!</h1>
        <p style="color: #fff; font-size: 18px;">Вашу заявку на послугу "<b>{service_type}</b>" успішно прийнято.</p>
        <p style="color: #a0a5b5;">Ми зателефонуємо вам на номер <b>{client_phone}</b> протягом 5 хвилин.</p>
        <br><br>
        <a href="/" style="color: #00ff66; border: 1px solid #00ff66; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Повернутися на сайт</a>
    </div>
    """

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)