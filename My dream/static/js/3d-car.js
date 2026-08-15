const container = document.getElementById('car-3d-container');

// Створюємо Canvas для анімації
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
container.appendChild(canvas);

// Робимо Canvas на всю ширину та висоту його батьківського контейнера
function resizeCanvas() {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let xPos = canvas.width + 50;
const speed = 2.5;
let wheelAngle = 0;

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const roadY = canvas.height - 25;

    // 1. Рівна дорога в самому низу контейнера
    ctx.fillStyle = '#0a0a0c';
    ctx.fillRect(0, roadY, canvas.width, 25);

    // Дорожня розмітка
    ctx.strokeStyle = '#222225';
    ctx.lineWidth = 2;
    ctx.setLineDash([15, 15]);
    ctx.beginPath();
    ctx.moveTo(0, roadY + 12);
    ctx.lineTo(canvas.width, roadY + 12);
    ctx.stroke();
    ctx.setLineDash([]);

    // 2. Малювання автомобіля
    ctx.save();
    ctx.translate(xPos, roadY - 75);

    // Тінь під авто
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.ellipse(140, 80, 120, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Кузов машини (кислотно-салатовий градієнт)
    const bodyGradient = ctx.createLinearGradient(0, 20, 0, 70);
    bodyGradient.addColorStop(0, '#7eff33');
    bodyGradient.addColorStop(0.5, '#00ff66');
    bodyGradient.addColorStop(1, '#009933');

    ctx.fillStyle = bodyGradient;
    ctx.shadowColor = '#00ff66';
    ctx.shadowBlur = 12;

    ctx.beginPath();
    ctx.moveTo(10, 60);
    ctx.lineTo(25, 35);
    ctx.lineTo(70, 30);
    ctx.lineTo(110, 10);
    ctx.lineTo(190, 10);
    ctx.lineTo(230, 30);
    ctx.lineTo(270, 40);
    ctx.lineTo(275, 60);
    ctx.lineTo(260, 70);
    ctx.lineTo(20, 70);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;

    // Скло
    ctx.fillStyle = '#0f131a';
    ctx.beginPath();
    ctx.moveTo(112, 12);
    ctx.lineTo(188, 12);
    ctx.lineTo(222, 30);
    ctx.lineTo(75, 30);
    ctx.closePath();
    ctx.fill();

    // Фара та світловий промінь
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.moveTo(5, 45);
    ctx.lineTo(-90, 20);
    ctx.lineTo(-90, 65);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 10;
    ctx.fillRect(5, 42, 10, 8);
    ctx.shadowBlur = 0;

    // Колеса з обертанням
    drawWheel(65, 70, wheelAngle);
    drawWheel(215, 70, wheelAngle);

    ctx.restore();

    // Рух авто
    xPos -= speed;
    wheelAngle -= speed * 0.05;

    if (xPos < -300) {
        xPos = canvas.width + 50;
    }

    requestAnimationFrame(animate);
}

function drawWheel(x, y, angle) {
    ctx.save();
    ctx.translate(x, y);

    // Шина
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.arc(0, 0, 22, 0, Math.PI * 2);
    ctx.fill();

    // Диск
    ctx.fillStyle = '#1a1a1d';
    ctx.beginPath();
    ctx.arc(0, 0, 14, 0, Math.PI * 2);
    ctx.fill();

    // Спиці
    ctx.rotate(angle);
    ctx.strokeStyle = '#00ff66';
    ctx.lineWidth = 2.5;
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos((i * Math.PI * 2) / 5) * 13, Math.sin((i * Math.PI * 2) / 5) * 13);
        ctx.stroke();
    }

    // Центр
    ctx.fillStyle = '#00ff66';
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

animate();