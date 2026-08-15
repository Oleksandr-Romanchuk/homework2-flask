const container = document.getElementById('car-3d-container');

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
container.appendChild(canvas);

function resizeCanvas() {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let xPos = canvas.width + 50;
const speed = 2.5;
let wheelAngle = 0;

function drawSinCityScene() {
    const roadHeight = 45;
    const yRoad = canvas.height - roadHeight;

    // 1. Асфальтова дорога в самому низу екрана
    ctx.fillStyle = '#0a0a0c';
    ctx.fillRect(0, yRoad, canvas.width, roadHeight);

    // Розмітка дороги
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 2;
    ctx.setLineDash([20, 20]);
    ctx.beginPath();
    ctx.moveTo(0, yRoad + 20);
    ctx.lineTo(canvas.width, yRoad + 20);
    ctx.stroke();
    ctx.setLineDash([]);

    // 2. Фасад будівлі СТО (ліва частина екрана - стиль "Місто Гріхів")
    const buildingWidth = canvas.width * 0.45;

    // Темний силует монолітної будівлі
    ctx.fillStyle = '#0d0e12';
    ctx.fillRect(0, 0, buildingWidth, yRoad);

    // Фактурні вертикальні лінії фасаду (нуарний стиль)
    ctx.strokeStyle = '#161820';
    ctx.lineWidth = 1;
    for (let x = 0; x < buildingWidth; x += 15) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, yRoad);
        ctx.stroke();
    }

    // Арка заїзду (гаражні ворота, куди ховається авто)
    const garageWidth = 160;
    const garageHeight = 90;
    const yGarage = yRoad - garageHeight;
    const xGarage = buildingWidth - garageWidth;

    // Глибина гаража (темнота всередині)
    ctx.fillStyle = '#000000';
    ctx.fillRect(xGarage, yGarage, garageWidth, garageHeight);

    // Неонова рамка входу СТО в стилі Sin City
    ctx.strokeStyle = '#00ff66';
    ctx.shadowColor = '#00ff66';
    ctx.shadowBlur = 12;
    ctx.lineWidth = 3;
    ctx.strokeRect(xGarage, yGarage, garageWidth, garageHeight);
    ctx.shadowBlur = 0;
}

function drawSinCityCar(x, y) {
    ctx.save();
    ctx.translate(x, y);

    // Тінь
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.beginPath();
    ctx.ellipse(140, 85, 130, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Кузов (Кислотно-зелений на контрасті з чорним нуаром)
    const bodyGradient = ctx.createLinearGradient(0, 20, 0, 80);
    bodyGradient.addColorStop(0, '#7eff33');
    bodyGradient.addColorStop(0.4, '#00ff66');
    bodyGradient.addColorStop(1, '#008033');

    ctx.fillStyle = bodyGradient;
    ctx.shadowColor = '#00ff66';
    ctx.shadowBlur = 15;

    ctx.beginPath();
    ctx.moveTo(10, 65);
    ctx.lineTo(25, 40);
    ctx.lineTo(70, 35);
    ctx.lineTo(110, 10);
    ctx.lineTo(190, 10);
    ctx.lineTo(230, 35);
    ctx.lineTo(270, 45);
    ctx.lineTo(275, 65);
    ctx.lineTo(260, 75);
    ctx.lineTo(20, 75);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;

    // Глибоке тоноване скло
    ctx.fillStyle = '#050508';
    ctx.beginPath();
    ctx.moveTo(112, 13);
    ctx.lineTo(188, 13);
    ctx.lineTo(222, 35);
    ctx.lineTo(75, 35);
    ctx.closePath();
    ctx.fill();

    // Потужний промінь фари
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.moveTo(5, 48);
    ctx.lineTo(-120, 20);
    ctx.lineTo(-120, 70);
    ctx.closePath();
    ctx.fill();

    // Фара
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 12;
    ctx.fillRect(5, 44, 10, 8);
    ctx.shadowBlur = 0;

    // Колеса
    drawWheel(65, 75, wheelAngle);
    drawWheel(215, 75, wheelAngle);

    ctx.restore();
}

function drawWheel(x, y, angle) {
    ctx.save();
    ctx.translate(x, y);

    ctx.fillStyle = '#0a0a0c';
    ctx.beginPath();
    ctx.arc(0, 0, 22, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#1a1a1d';
    ctx.beginPath();
    ctx.arc(0, 0, 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.rotate(angle);
    ctx.strokeStyle = '#00ff66';
    ctx.lineWidth = 2.5;
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos((i * Math.PI * 2) / 5) * 13, Math.sin((i * Math.PI * 2) / 5) * 13);
        ctx.stroke();
    }

    ctx.fillStyle = '#00ff66';
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Малюємо нуарний фасад та дорогу внизу
    drawSinCityScene();

    // Позиція авто прив'язана до самої дороги внизу
    const yPos = canvas.height - 110;

    // Кліпування: машина виїжджає справа і заїжджає всередину будівлі ліворуч
    ctx.save();
    drawSinCityCar(xPos, yPos);
    ctx.restore();

    xPos -= speed;
    wheelAngle -= speed * 0.05;

    // Перезапуск анімації
    if (xPos < -200) {
        xPos = canvas.width + 50;
    }

    requestAnimationFrame(animate);
}

animate();