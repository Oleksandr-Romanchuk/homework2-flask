const container = document.getElementById('car-3d-container');

if (container) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    container.appendChild(canvas);

    function resizeCanvas() {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let xPos = canvas.width + 100;
    const speed = 2.2;
    let wheelAngle = 0;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const roadY = canvas.height - 35;

        // 1. Дорога
        ctx.fillStyle = '#050507';
        ctx.fillRect(0, roadY, canvas.width, 35);

        ctx.fillStyle = '#111115';
        ctx.fillRect(0, roadY - 4, canvas.width, 4);

        // Дорожня розмітка
        ctx.strokeStyle = '#22222a';
        ctx.lineWidth = 2;
        ctx.setLineDash([25, 20]);
        ctx.beginPath();
        ctx.moveTo(0, roadY + 18);
        ctx.lineTo(canvas.width, roadY + 18);
        ctx.stroke();
        ctx.setLineDash([]);

        // 2. Ворота гаража зліва (куди в'їжджає авто)
        const doorWidth = 140;
        const doorHeight = 110;
        const doorY = roadY - doorHeight;

        // Темрява всередині гаража
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, doorY, doorWidth, doorHeight);

        // Неонова рамка воріт СТО
        ctx.strokeStyle = '#00ff66';
        ctx.shadowColor = '#00ff66';
        ctx.shadowBlur = 10;
        ctx.lineWidth = 3;
        ctx.strokeRect(0, doorY, doorWidth, doorHeight);
        ctx.shadowBlur = 0;

        // 3. Анімація авто
        ctx.save();

        // Кліпування: коли машина заїжджає ліворуч, вона зникає у воротах гаража
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.clip();

        ctx.translate(xPos, roadY - 60);

        // Тінь
        ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        ctx.beginPath();
        ctx.ellipse(150, 60, 140, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Промінь фари
        ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.beginPath();
        ctx.moveTo(0, 32);
        ctx.lineTo(-180, -10);
        ctx.lineTo(-180, 55);
        ctx.closePath();
        ctx.fill();

        // Червоний стоп-сигнал
        ctx.fillStyle = '#ff0033';
        ctx.shadowColor = '#ff0033';
        ctx.shadowBlur = 10;
        ctx.fillRect(285, 30, 4, 8);
        ctx.shadowBlur = 0;

        // Кислотно-зелений кузов ретро-авто
        const bodyGradient = ctx.createLinearGradient(0, 0, 0, 50);
        bodyGradient.addColorStop(0, '#8cff33');
        bodyGradient.addColorStop(0.4, '#00ff66');
        bodyGradient.addColorStop(1, '#006622');

        ctx.fillStyle = bodyGradient;
        ctx.shadowColor = '#00ff66';
        ctx.shadowBlur = 15;

        // Форма купе 1930-х
        ctx.beginPath();
        ctx.moveTo(0, 35);
        ctx.lineTo(15, 28);
        ctx.lineTo(100, 25);
        ctx.lineTo(140, 5);
        ctx.lineTo(200, 5);
        ctx.lineTo(245, 25);
        ctx.lineTo(285, 28);
        ctx.lineTo(290, 45);
        ctx.lineTo(280, 50);
        ctx.lineTo(10, 50);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;

        // Переднє крило
        ctx.fillStyle = '#00b344';
        ctx.beginPath();
        ctx.arc(60, 45, 22, Math.PI, 0, false);
        ctx.fill();

        // Заднє крило
        ctx.beginPath();
        ctx.arc(230, 45, 22, Math.PI, 0, false);
        ctx.fill();

        // Скло
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.moveTo(143, 8);
        ctx.lineTo(197, 8);
        ctx.lineTo(235, 25);
        ctx.lineTo(108, 25);
        ctx.closePath();
        ctx.fill();

        // Хромована решітка
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-2, 28, 4, 18);

        // Кругла фара
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(2, 32, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Ретро-колеса
        drawRetroWheel(60, 48, wheelAngle);
        drawRetroWheel(230, 48, wheelAngle);

        ctx.restore();

        // Рух машини вліво
        xPos -= speed;
        wheelAngle -= speed * 0.05;

        // Перезапуск, коли авто повністю заїхало в гараж
        if (xPos < -280) {
            xPos = canvas.width + 50;
        }

        requestAnimationFrame(animate);
    }

    function drawRetroWheel(x, y, angle) {
        ctx.save();
        ctx.translate(x, y);

        ctx.fillStyle = '#0a0a0c';
        ctx.beginPath();
        ctx.arc(0, 0, 18, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#e6e6e6';
        ctx.beginPath();
        ctx.arc(0, 0, 13, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#111115';
        ctx.beginPath();
        ctx.arc(0, 0, 9, 0, Math.PI * 2);
        ctx.fill();

        ctx.rotate(angle);
        ctx.strokeStyle = '#00ff66';
        ctx.lineWidth = 2;
        for (let i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos((i * Math.PI) / 2) * 8, Math.sin((i * Math.PI) / 2) * 8);
            ctx.stroke();
        }

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    animate();
}