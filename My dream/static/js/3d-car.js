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

        // 1. Нуарна дорога внизу
        ctx.fillStyle = '#050507';
        ctx.fillRect(0, roadY, canvas.width, 35);

        // Поребрик / бордюр
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

        // 2. Ретро-автомобіль 1930-х у стилі Sin City
        ctx.save();
        ctx.translate(xPos, roadY - 60);

        // Глибока тінь
        ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        ctx.beginPath();
        ctx.ellipse(150, 60, 140, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Потужне біле світло фар (промінь на дорогу)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.beginPath();
        ctx.moveTo(0, 32);
        ctx.lineTo(-180, -10);
        ctx.lineTo(-180, 55);
        ctx.closePath();
        ctx.fill();

        // Задне червоне габаритне світло
        ctx.fillStyle = '#ff0033';
        ctx.shadowColor = '#ff0033';
        ctx.shadowBlur = 10;
        ctx.fillRect(285, 30, 4, 8);
        ctx.shadowBlur = 0;

        // КУЗОВ РЕТРО-АВТО (Кислотно-зелений на монохромному фоні)
        const bodyGradient = ctx.createLinearGradient(0, 0, 0, 50);
        bodyGradient.addColorStop(0, '#8cff33');
        bodyGradient.addColorStop(0.4, '#00ff66');
        bodyGradient.addColorStop(1, '#006622');

        ctx.fillStyle = bodyGradient;
        ctx.shadowColor = '#00ff66';
        ctx.shadowBlur = 15;

        // Силует класичного ретро-купе (довгий капот, вигнутий дах)
        ctx.beginPath();
        ctx.moveTo(0, 35);           // Передня частина капота
        ctx.lineTo(15, 28);
        ctx.lineTo(100, 25);         // Довгий капот
        ctx.lineTo(140, 5);          // Лобове скло
        ctx.lineTo(200, 5);          // Дах
        ctx.lineTo(245, 25);         // Заднє скло
        ctx.lineTo(285, 28);         // Багажник
        ctx.lineTo(290, 45);
        ctx.lineTo(280, 50);
        ctx.lineTo(10, 50);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;

        // Велике вигнуте переднє крило (retro fender)
        ctx.fillStyle = '#00b344';
        ctx.beginPath();
        ctx.arc(60, 45, 22, Math.PI, 0, false);
        ctx.fill();

        // Заднє крило
        ctx.beginPath();
        ctx.arc(230, 45, 22, Math.PI, 0, false);
        ctx.fill();

        // Салон і скло
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.moveTo(143, 8);
        ctx.lineTo(197, 8);
        ctx.lineTo(235, 25);
        ctx.lineTo(108, 25);
        ctx.closePath();
        ctx.fill();

        // Хромована решітка та радіатор
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-2, 28, 4, 18);

        // Велика кругла фара зпереду
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(2, 32, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Колеса (Широкі білі ободи ретро-стилю)
        drawRetroWheel(60, 48, wheelAngle);
        drawRetroWheel(230, 48, wheelAngle);

        ctx.restore();

        // Переміщення машини вліво
        xPos -= speed;
        wheelAngle -= speed * 0.05;

        if (xPos < -310) {
            xPos = canvas.width + 50;
        }

        requestAnimationFrame(animate);
    }

    // Малювання ретро-колеса з білими боковинами (White Wall Tires)
    function drawRetroWheel(x, y, angle) {
        ctx.save();
        ctx.translate(x, y);

        // Чорна резина
        ctx.fillStyle = '#0a0a0c';
        ctx.beginPath();
        ctx.arc(0, 0, 18, 0, Math.PI * 2);
        ctx.fill();

        // Біла ретро-смуга (Classic White Wall)
        ctx.fillStyle = '#e6e6e6';
        ctx.beginPath();
        ctx.arc(0, 0, 13, 0, Math.PI * 2);
        ctx.fill();

        // Чорний центр диска
        ctx.fillStyle = '#111115';
        ctx.beginPath();
        ctx.arc(0, 0, 9, 0, Math.PI * 2);
        ctx.fill();

        // Обертові неонові спиці
        ctx.rotate(angle);
        ctx.strokeStyle = '#00ff66';
        ctx.lineWidth = 2;
        for (let i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos((i * Math.PI) / 2) * 8, Math.sin((i * Math.PI) / 2) * 8);
            ctx.stroke();
        }

        // Хромований ковпак у центрі
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    animate();
}