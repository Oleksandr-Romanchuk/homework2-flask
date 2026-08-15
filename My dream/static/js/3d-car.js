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

    let xPos = canvas.width + 120;
    const speed = 2.4;
    let wheelAngle = 0;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const roadY = canvas.height - 40;

        // 1. Силуети хмарочосів Sin City на задньому плані
        drawCitySkyline();

        // 2. Мокра нуарна дорога
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, roadY, canvas.width, 40);

        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, roadY - 3, canvas.width, 3);

        // Розмітка
        ctx.strokeStyle = '#2a2a2a';
        ctx.lineWidth = 2;
        ctx.setLineDash([30, 25]);
        ctx.beginPath();
        ctx.moveTo(0, roadY + 20);
        ctx.lineTo(canvas.width, roadY + 20);
        ctx.stroke();
        ctx.setLineDash([]);

        // 3. Вхід у гараж / тунель ліворуч
        const tunnelWidth = 120;
        const tunnelHeight = 130;
        const tunnelY = roadY - tunnelHeight;

        ctx.fillStyle = '#000000';
        ctx.fillRect(0, tunnelY, tunnelWidth, tunnelHeight);

        // Червоний рамковий неоновий контур входу СТО
        ctx.strokeStyle = '#ff0033';
        ctx.shadowColor = '#ff0033';
        ctx.shadowBlur = 12;
        ctx.lineWidth = 4;
        ctx.strokeRect(-5, tunnelY, tunnelWidth + 5, tunnelHeight);
        ctx.shadowBlur = 0;

        // 4. Малювання Кабріолета / Купе 50-х років (Sin City Red)
        ctx.save();

        // Машина зникає при заїзді в тунель
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.clip();

        ctx.translate(xPos, roadY - 70);

        // Глибока тінь
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.beginPath();
        ctx.ellipse(160, 68, 150, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Потужне біле світло фари на дорогу
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.beginPath();
        ctx.moveTo(-5, 38);
        ctx.lineTo(-220, -15);
        ctx.lineTo(-220, 65);
        ctx.closePath();
        ctx.fill();

        // КУЗОВ РЕТРО-АВТО (Криваво-червоний Sin City Cadillac/Buick)
        const bodyGrad = ctx.createLinearGradient(0, 0, 0, 60);
        bodyGrad.addColorStop(0, '#ff1a40');
        bodyGrad.addColorStop(0.5, '#dc143c');
        bodyGrad.addColorStop(1, '#660011');

        ctx.fillStyle = bodyGrad;
        ctx.shadowColor = '#ff0033';
        ctx.shadowBlur = 10;

        ctx.beginPath();
        ctx.moveTo(-5, 40);          // Бампер
        ctx.lineTo(15, 30);          // Довгий капот 50-х
        ctx.lineTo(110, 26);
        ctx.lineTo(145, 12);         // Рамка лобового скла
        ctx.lineTo(185, 12);         // Відкритий салон / Кабріолет
        ctx.lineTo(235, 22);         // Задне вигнуте крило
        ctx.lineTo(310, 10);         // ХАРАКТЕРНИЙ ПЛАВНИК (Tailfin)
        ctx.lineTo(315, 45);         // Задній бампер
        ctx.lineTo(300, 55);
        ctx.lineTo(10, 55);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;

        // Хромовані смуги на боковині кузова (Характерно для 50-х)
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(15, 42);
        ctx.lineTo(305, 42);
        ctx.stroke();

        // Червоні стоп-сигнали на плавниках
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ff0033';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(310, 15, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Лобове скло
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.moveTo(112, 26);
        ctx.lineTo(143, 13);
        ctx.lineTo(155, 26);
        ctx.closePath();
        ctx.fill();

        // Подвійна велика хромована фара
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.arc(-2, 38, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Хромований масивний бампер
        ctx.fillStyle = '#e6e6e6';
        ctx.fillRect(-6, 42, 6, 12);

        // Ретро-колеса з хромованими колпаками
        drawCadillacWheel(65, 55, wheelAngle);
        drawCadillacWheel(245, 55, wheelAngle);

        ctx.restore();

        // Рух машини
        xPos -= speed;
        wheelAngle -= speed * 0.05;

        if (xPos < -320) {
            xPos = canvas.width + 80;
        }

        requestAnimationFrame(animate);
    }

    // Малювання ретро-колеса з білою гумою та хромованим диском
    function drawCadillacWheel(x, y, angle) {
        ctx.save();
        ctx.translate(x, y);

        // Чорний протектор
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(0, 0, 20, 0, Math.PI * 2);
        ctx.fill();

        // Біла ретро-смуга (Whitewall)
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, 15, 0, Math.PI * 2);
        ctx.fill();

        // Хромований центр
        ctx.fillStyle = '#222222';
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, Math.PI * 2);
        ctx.fill();

        // Обертові хром-спиці
        ctx.rotate(angle);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        for (let i = 0; i < 6; i++) {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos((i * Math.PI) / 3) * 9, Math.sin((i * Math.PI) / 3) * 9);
            ctx.stroke();
        }

        // Хромована центральна куля
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    // Задній фон з міським силуетом
    function drawCitySkyline() {
        ctx.fillStyle = '#050508';
        ctx.fillRect(100, 80, 50, 280);
        ctx.fillRect(180, 40, 70, 320);
        ctx.fillRect(280, 110, 60, 250);

        // Тільки де-не-де світяться вікна в нуарному місті
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(195, 60, 6, 10);
        ctx.fillRect(220, 90, 6, 10);
        ctx.fillRect(120, 120, 5, 8);
    }

    animate();
}