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

// Параметри машини: стартує справа за межами екрана
let xPos = canvas.width + 50;
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

    // 2. Кузов машини (кислотний неоново-салатовий градієнт з металевим відблиском)
    const bodyGradient = ctx.createLinearGradient(0, 20, 0, 80);
    bodyGradient.addColorStop(0, '#7eff33');
    bodyGradient.addColorStop(0.4, '#00ff66');
    bodyGradient.addColorStop(1, '#00b344');

    ctx.fillStyle = bodyGradient;
    ctx.shadowColor = '#00ff66';
    ctx.shadowBlur = 20; // Ефектне неонове світіння навколо кузова

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
    ctx.shadowBlur = 0; // Скидаємо тінь для інших елементів

    // 3. Тоноване скло
    ctx.fillStyle = '#111622';
    ctx.beginPath();
    ctx.moveTo(112, 18);
    ctx.lineTo(188, 18);
    ctx.lineTo(222, 45);
    ctx.lineTo(75, 45);
    ctx.closePath();
    ctx.fill();

    // Відблиск на склі
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(130, 22);
    ctx.lineTo(100, 42);
    ctx.stroke();

    // 4. Передні фари (яскравий білий LED)
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 15;
    ctx.fillRect(5, 52, 12, 8);
    ctx.shadowBlur = 0;

    // 5. Колеса
    drawWheel(65, 85, wheelAngle);  // Переднє колесо
    drawWheel(215, 85, wheelAngle); // Заднє колесо

    ctx.restore();
}

// Малювання колеса з обертанням
function drawWheel(x, y, angle) {
    ctx.save();
    ctx.translate(x, y);

    // Шина
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.arc(0, 0, 26, 0, Math.PI * 2);
    ctx.fill();

    // Диск
    ctx.fillStyle = '#111111';
    ctx.beginPath();
    ctx.arc(0, 0, 17, 0, Math.PI * 2);
    ctx.fill();

    // Спиці
    ctx.rotate(angle);
    ctx.strokeStyle = '#00ff66';
    ctx.lineWidth = 3;
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos((i * Math.PI * 2) / 5) * 16, Math.sin((i * Math.PI * 2) / 5) * 16);
        ctx.stroke();
    }

    // Центр диска
    ctx.fillStyle = '#00ff66';
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

// Головний цикл анімації
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const yPos = canvas.height / 2 - 40;

    drawRealisticCar(xPos, yPos);

    // Рух машини вліво
    xPos -= speed;
    wheelAngle -= speed * 0.05;

    // Коли машина виїжджає за ліву межу, повертаємо її направо
    if (xPos < -300) {
        xPos = canvas.width + 50;
    }

    requestAnimationFrame(animate);
}

animate();