from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/booking', methods=['POST'])
def booking():
    client_name = request.form.get("client_name")
    client_phone = request.form.get("client_phone")
    service_type = request.form.get("service_type")

    return f"""
    <div style="background-color: #0d0f12; color: #00ff66; font-family: sans-serif; text-align: center; padding: 50px; min-height: 100vh;">
        <h1 style="font-size: 36px; margin-bottom: 20px;">Дякуємо, {client_name}!</h1>
        <p style="color: #fff; font-size: 20px;">Вашу заявку на послугу "<b>{service_type}</b>" успішно прийнято.</p>
        <p style="color: #a0a5b5; font-size: 16px; margin-top: 10px;">Ми зателефонуємо вам на номер <b>{client_phone}</b> протягом 5 хвилин.</p>
        <br><br>
        <a href="/" style="color: #00ff66; border: 2px solid #00ff66; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Повернутися на сайт</a>
    </div>
    """

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)