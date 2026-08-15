const container = document.getElementById('car-3d-container');

// Створюємо Canvas для малювання
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
container.appendChild(canvas);

function resizeCanvas() {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Параметри машини
let xPos = -300; // Початкова позиція за межами екрана ліворуч
const speed = 2.5; // Швидкість руху
let wheelAngle = 0; // Кут обертання коліс

function drawRealisticCar(x, y) {
    ctx.save();
    ctx.translate(x, y);

    // 1. Тінь під машиною
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.beginPath();
    ctx.ellipse(140, 95, 130, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // 2. Кузов машини (Спортивний седан BMW)
    const bodyGradient = ctx.createLinearGradient(0, 20, 0, 80);
    bodyGradient.addColorStop(0, '#ffffff');
    bodyGradient.addColorStop(0.5, '#e6e6e6');
    bodyGradient.addColorStop(1, '#b0b5bc');

    ctx.fillStyle = bodyGradient;
    ctx.beginPath();
    ctx.moveTo(10, 75);
    ctx.lineTo(25, 50);
    ctx.lineTo(70, 45);
    ctx.lineTo(110, 15); // Лобове скло
    ctx.lineTo(190, 15); // Дах
    ctx.lineTo(230, 45); // Заднє скло
    ctx.lineTo(270, 55); // Багажник
    ctx.lineTo(275, 75);
    ctx.lineTo(260, 85);
    ctx.lineTo(20, 85);
    ctx.closePath();
    ctx.fill();

    // 3. Тоноване скло
    ctx.fillStyle = '#111622';
    ctx.beginPath();
    ctx.moveTo(112, 18);
    ctx.lineTo(188, 18);
    ctx.lineTo(222, 45);
    ctx.lineTo(75, 45);
    ctx.closePath();
    ctx.fill();

    // Світловий відблиск на склі
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(130, 22);
    ctx.lineTo(100, 42);
    ctx.stroke();

    // 4. Передні фари (LED сяйво)
    ctx.fillStyle = '#00ff66';
    ctx.shadowColor = '#00ff66';
    ctx.shadowBlur = 15;
    ctx.fillRect(5, 52, 12, 8);
    ctx.shadowBlur = 0; // Скидання тіні

    // 5. Колеса з реалістичним обертанням
    drawWheel(65, 85, wheelAngle);  // Переднє колесо
    drawWheel(215, 85, wheelAngle); // Заднє колесо

    ctx.restore();
}

// Функція малювання колеса з правильним обертанням спиць
function drawWheel(x, y, angle) {
    ctx.save();
    ctx.translate(x, y);

    // Шина (Резина)
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.arc(0, 0, 26, 0, Math.PI * 2);
    ctx.fill();

    // Диск (Метал)
    ctx.fillStyle = '#cccccc';
    ctx.beginPath();
    ctx.arc(0, 0, 17, 0, Math.PI * 2);
    ctx.fill();

    // Обертання спиць диска навколо власної осі
    ctx.rotate(angle);
    ctx.strokeStyle = '#111111';
    ctx.lineWidth = 3;
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos((i * Math.PI * 2) / 5) * 16, Math.sin((i * Math.PI * 2) / 5) * 16);
        ctx.stroke();
    }

    // Центр диска (Супорт)
    ctx.fillStyle = '#00ff66';
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

// Головний цикл анімації
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Центрування по висоті контейнера
    const yPos = canvas.height / 2 - 40;

    drawRealisticCar(xPos, yPos);

    // Рух машини та обертання коліс
    xPos += speed;
    wheelAngle += speed * 0.05; // Швидкість обертання коліс прив'язана до швидкості руху

    // Повернення на початок
    if (xPos > canvas.width + 50) {
        xPos = -300;
    }

    requestAnimationFrame(animate);
}

animate();