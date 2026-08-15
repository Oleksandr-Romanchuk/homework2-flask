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

// Малювання цегляної стіни (стиль Нідерланди / NRW)
function drawBrickWall() {
    const wallHeight = 110;
    const yStart = canvas.height / 2 - 80;

    // Базовий терракотово-цегляний колір
    ctx.fillStyle = '#2b1810';
    ctx.fillRect(0, yStart, canvas.width, wallHeight);

    // Розшивка швів
    ctx.strokeStyle = '#1a0e0a';
    ctx.lineWidth = 1;

    const brickWidth = 20;
    const brickHeight = 8;

    for (let y = yStart; y < yStart + wallHeight; y += brickHeight) {
        let row = Math.floor((y - yStart) / brickHeight);
        let xOffset = (row % 2 === 0) ? 0 : brickWidth / 2;

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();

        for (let x = xOffset; x < canvas.width; x += brickWidth) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + brickHeight);
            ctx.stroke();
        }
    }

    // Декоративне неонове графіті на стіні
    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = '#00ff66';
    ctx.shadowColor = '#00ff66';
    ctx.shadowBlur = 8;
    ctx.fillText('M-POWER CUSTOMS', 120, yStart + 40);
    ctx.shadowBlur = 0;
}

// Малювання будівлі СТО ліворуч (куди прямує авто)
function drawGarage(yBase) {
    const gWidth = 140;
    const gHeight = 100;
    const xGar = 10;
    const yGar = yBase - 60;

    // Споруда гаража
    ctx.fillStyle = '#151922';
    ctx.fillRect(xGar, yGar, gWidth, gHeight);

    // Ворота СТО
    ctx.fillStyle = '#0a0d12';
    ctx.strokeStyle = '#00ff66';
    ctx.lineWidth = 2;
    ctx.fillRect(xGar + 15, yGar + 30, gWidth - 30, gHeight - 30);
    ctx.strokeRect(xGar + 15, yGar + 30, gWidth - 30, gHeight - 30);

    // Неоновий вказівник "GARAGE / SERVICE"
    ctx.fillStyle = '#00ff66';
    ctx.shadowColor = '#00ff66';
    ctx.shadowBlur = 10;
    ctx.fillRect(xGar + 20, yGar + 10, gWidth - 40, 14);

    ctx.fillStyle = '#000000';
    ctx.font = 'bold 9px sans-serif';
    ctx.fillText('ENTRANCE ➔', xGar + 30, yGar + 21);
    ctx.shadowBlur = 0;
}

// Вуличні ліхтарі та дерева
function drawUrbanElements(yBase) {
    // Дерева на задньому плані
    [280, 480].forEach(xTree => {
        ctx.fillStyle = '#112211';
        ctx.beginPath();
        ctx.arc(xTree, yBase - 50, 25, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#1a0e0a';
        ctx.fillRect(xTree - 3, yBase - 30, 6, 30);
    });

    // Ліхтар із конусом світла
    const xLamp = 220;
    const yLamp = yBase - 90;

    ctx.strokeStyle = '#444';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(xLamp, yBase);
    ctx.lineTo(xLamp, yLamp);
    ctx.lineTo(xLamp - 15, yLamp);
    ctx.stroke();

    // Світловий конус
    ctx.fillStyle = 'rgba(255, 255, 200, 0.08)';
    ctx.beginPath();
    ctx.moveTo(xLamp - 15, yLamp);
    ctx.lineTo(xLamp - 50, yBase);
    ctx.lineTo(xLamp + 20, yBase);
    ctx.closePath();
    ctx.fill();
}

function drawBackground() {
    const yBase = canvas.height / 2 + 35;

    // 1. Цегляна стіна
    drawBrickWall();

    // 2. Дерева та ліхтарі
    drawUrbanElements(yBase);

    // 3. Дорога
    ctx.fillStyle = '#121418';
    ctx.fillRect(0, yBase - 15, canvas.width, 50);

    // Дорожня розмітка
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.setLineDash([15, 15]);
    ctx.beginPath();
    ctx.moveTo(0, yBase + 10);
    ctx.lineTo(canvas.width, yBase + 10);
    ctx.stroke();
    ctx.setLineDash([]); // Скидання пунктиру

    // 4. СТО / Гараж
    drawGarage(yBase);
}

function drawRealisticCar(x, y) {
    ctx.save();
    ctx.translate(x, y);

    // Тінь
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.ellipse(140, 95, 130, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Кислотно-салатовий кузов
    const bodyGradient = ctx.createLinearGradient(0, 20, 0, 80);
    bodyGradient.addColorStop(0, '#7eff33');
    bodyGradient.addColorStop(0.4, '#00ff66');
    bodyGradient.addColorStop(1, '#00b344');

    ctx.fillStyle = bodyGradient;
    ctx.shadowColor = '#00ff66';
    ctx.shadowBlur = 15;

    ctx.beginPath();
    ctx.moveTo(10, 75);
    ctx.lineTo(25, 50);
    ctx.lineTo(70, 45);
    ctx.lineTo(110, 15);
    ctx.lineTo(190, 15);
    ctx.lineTo(230, 45);
    ctx.lineTo(270, 55);
    ctx.lineTo(275, 75);
    ctx.lineTo(260, 85);
    ctx.lineTo(20, 85);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;

    // Скло
    ctx.fillStyle = '#111622';
    ctx.beginPath();
    ctx.moveTo(112, 18);
    ctx.lineTo(188, 18);
    ctx.lineTo(222, 45);
    ctx.lineTo(75, 45);
    ctx.closePath();
    ctx.fill();

    // Світло фар (промінь на дорогу)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.moveTo(5, 56);
    ctx.lineTo(-80, 40);
    ctx.lineTo(-80, 75);
    ctx.closePath();
    ctx.fill();

    // Передні фари
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 10;
    ctx.fillRect(5, 52, 12, 8);
    ctx.shadowBlur = 0;

    // Колеса
    drawWheel(65, 85, wheelAngle);
    drawWheel(215, 85, wheelAngle);

    ctx.restore();
}

function drawWheel(x, y, angle) {
    ctx.save();
    ctx.translate(x, y);

    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.arc(0, 0, 26, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#111111';
    ctx.beginPath();
    ctx.arc(0, 0, 17, 0, Math.PI * 2);
    ctx.fill();

    ctx.rotate(angle);
    ctx.strokeStyle = '#00ff66';
    ctx.lineWidth = 3;
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos((i * Math.PI * 2) / 5) * 16, Math.sin((i * Math.PI * 2) / 5) * 16);
        ctx.stroke();
    }

    ctx.fillStyle = '#00ff66';
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Малюємо весь урбаністичний фон
    drawBackground();

    const yPos = canvas.height / 2 - 40;
    drawRealisticCar(xPos, yPos);

    xPos -= speed;
    wheelAngle -= speed * 0.05;

    // Перезапуск циклу руху
    if (xPos < -300) {
        xPos = canvas.width + 50;
    }

    requestAnimationFrame(animate);
}

animate();