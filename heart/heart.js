const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const settings = {
    // ⭐ ОРТАДАҒЫ НЕГІЗГІ МӘТІН ⭐
    mainText: "I LOVE YOU",
    mainTextSize: 80,
    mainPulseSpeed: 0.02,
    mainPulseAmount: 0.05,
    mainColor: "#FFFFFF", // Чистый белый
    shadowColor: "#FF69B4", // Мягкий розовый shadow
    mainGlow: true,
    
    // ⭐ АРТТАҒЫ ЖҮРЕК АНИМАЦИЯСЫ ⭐
    heartText: "♥",
    heartTextCount: 50,
    heartTextSize: 18,
    heartSize: 20,
    heartSpeed: 0.001,
    heartColor: "rgba(255, 105, 180, 0.4)",
    heartOpacity: 0.12,
    
    // Жалпы
    currentTime: 0,
    heartAngle: 0,
    particlesCount: 15,
    
    // ⭐ ЕКІ АНИМАЦИЯНЫ БАСҚАРУ ⭐
    showMainText: true,
    showHeart: true,
    showParticles: true
};

// ⭐ БӨЛШЕКТЕР - УЛУЧШЕННЫЕ ⭐
class Particle {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.angle = Math.random() * Math.PI * 2;
        this.distance = 80 + Math.random() * 200;
        this.speed = 0.3 + Math.random() * 0.8;
        this.size = 2 + Math.random() * 3;
        this.opacity = 0.3 + Math.random() * 0.5;
        this.color = this.getRandomColor();
    }
    
    getRandomColor() {
        const colors = [
            'rgba(255, 182, 193, 0.6)',  // Светло-розовый
            'rgba(255, 105, 180, 0.6)',  // Ярко-розовый
            'rgba(255, 20, 147, 0.6)',   // Deep pink
            'rgba(255, 228, 225, 0.6)',  // Нежный розовый
            'rgba(219, 112, 147, 0.6)'   // Палевый розовый
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
        this.angle += 0.008;
        this.distance += Math.sin(settings.currentTime * 0.003 + this.angle) * 0.3;
        
        // Пульсация размера
        this.size = 2 + Math.sin(settings.currentTime * 0.02 + this.angle) * 1.5;
    }
    
    draw(centerX, centerY) {
        const x = centerX + Math.cos(this.angle) * this.distance;
        const y = centerY + Math.sin(this.angle) * this.distance;
        
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.arc(x, y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;
    }
}

const particles = [];
for (let i = 0; i < settings.particlesCount; i++) {
    particles.push(new Particle());
}

// ⭐ ЖҮРЕК ФОРМАСЫ (АРТТАҒЫ АНИМАЦИЯ) ⭐
function heartPosition(t) {
    const x = 12.5 * Math.pow(Math.sin(t), 3);
    const y = 10.2 * Math.cos(t) - 
              2.7 * Math.cos(2*t) - 
              2.3 * Math.cos(3*t) - 
              0.001 * Math.cos(4*t);
    
    return { x, y: -y };
}

// ⭐ АРТТАҒЫ ЖҮРЕК АНИМАЦИЯСЫ - УЛУЧШЕННАЯ ⭐
function drawHeartAnimation() {
    if (!settings.showHeart) return;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    const wave = Math.sin(settings.currentTime * 0.004) * 0.08;
    
    for (let i = 0; i < settings.heartTextCount; i++) {
        const localOffset = (i / settings.heartTextCount) * Math.PI * 2;
        let t = (settings.heartAngle + localOffset) % (Math.PI * 2);
        
        const pos = heartPosition(t);
        
        // Радужный эффект
        const hue = (t * 50 + settings.currentTime * 0.5) % 60 + 320;
        const opacity = settings.heartOpacity * (0.5 + 0.5 * Math.sin(t * 3 + settings.currentTime * 0.015));
        
        const x = centerX + pos.x * (settings.heartSize * (1 + wave));
        const y = centerY + pos.y * (settings.heartSize * (1 + wave));
        
        // Сердечки с градиентом
        ctx.font = `${settings.heartTextSize}px Arial`;
        ctx.fillStyle = `hsla(${hue}, 100%, 70%, ${opacity})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        // Легкое свечение
        ctx.shadowBlur = 15;
        ctx.shadowColor = `hsla(${hue}, 100%, 70%, ${opacity * 0.5})`;
        ctx.fillText(settings.heartText, x, y);
    }
    
    ctx.shadowBlur = 0;
    settings.heartAngle += settings.heartSpeed;
}

// ⭐ ОРТАДАҒЫ НЕГІЗГІ МӘТІН - МИНИМАЛИСТІК ⭐
function drawMainText() {
    if (!settings.showMainText) return;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    const pulse = 1 + Math.sin(settings.currentTime * settings.mainPulseSpeed) * settings.mainPulseAmount;
    const fontSize = settings.mainTextSize * pulse;
    
    // Простой элегантный стиль
    ctx.save();
    
    // Мягкое свечение
    ctx.shadowColor = settings.shadowColor;
    ctx.shadowBlur = 25 * pulse;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    ctx.font = `${fontSize}px 'Arial', sans-serif`;
    ctx.fillStyle = settings.mainColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.letterSpacing = '5px';
    
    // Легкое вращение
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(Math.sin(settings.currentTime * 0.0008) * 0.02);
    ctx.fillText(settings.mainText, 0, 0);
    ctx.restore();
    
    ctx.restore();
}

// ⭐ БӨЛШЕКТЕР ⭐
function drawParticles() {
    if (!settings.showParticles) return;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    particles.forEach(particle => {
        particle.update();
        particle.draw(centerX, centerY);
    });
}

// ⭐ ФОН ЭФФЕКТІ - МИНИМАЛИСТІК ⭐
function drawBackground() {
    // Простой градиент
    const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 1.5
    );
    
    gradient.addColorStop(0, 'rgba(30, 10, 20, 0.1)');
    gradient.addColorStop(0.5, 'rgba(50, 20, 40, 0.2)');
    gradient.addColorStop(1, 'rgba(60, 25, 50, 0.3)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Меньше звездочек
    for (let i = 0; i < 30; i++) {
        const x = (Math.sin(settings.currentTime * 0.0006 + i) * 0.5 + 0.5) * canvas.width;
        const y = (Math.cos(settings.currentTime * 0.0005 + i * 0.7) * 0.5 + 0.5) * canvas.height;
        const size = Math.sin(settings.currentTime * 0.01 + i) * 0.5 + 0.8;
        
        const hue = (i * 20 + settings.currentTime * 0.2) % 60 + 310;
        const opacity = 0.2 + Math.sin(settings.currentTime * 0.008 + i) * 0.2;
        
        ctx.beginPath();
        ctx.fillStyle = `hsla(${hue}, 70%, 65%, ${opacity})`;
        ctx.shadowBlur = 5;
        ctx.shadowColor = `hsla(${hue}, 70%, 65%, ${opacity * 0.5})`;
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
    
    ctx.shadowBlur = 0;
}

// ⭐ БАСТАПҚЫ ФОН ⭐
function clearCanvas() {
    ctx.fillStyle = "rgba(10, 5, 15, 0.12)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// ⭐ НЕГІЗГІ АНИМАЦИЯ ⭐
function animate() {
    clearCanvas();
    drawBackground();
    drawHeartAnimation();
    drawParticles();
    drawMainText();
    
    settings.currentTime += 1;
    requestAnimationFrame(animate);
}

// ⭐ КЛАВИАТУРА БАСҚАРУЫ ⭐
window.addEventListener('keydown', (e) => {
    switch(e.key) {
        case '+':
            settings.mainTextSize += 5;
            break;
        case '-':
            settings.mainTextSize = Math.max(20, settings.mainTextSize - 5);
            break;
        case 'h':
        case 'H':
            settings.heartSize += 2;
            break;
        case 'j':
        case 'J':
            settings.heartSize = Math.max(10, settings.heartSize - 2);
            break;
        case 'k':
        case 'K':
            settings.heartSpeed += 0.0005;
            break;
        case 'l':
        case 'L':
            settings.heartSpeed = Math.max(0.0001, settings.heartSpeed - 0.0005);
            break;
        case 'u':
        case 'U':
            settings.heartOpacity = Math.min(1, settings.heartOpacity + 0.05);
            break;
        case 'i':
        case 'I':
            settings.heartOpacity = Math.max(0.05, settings.heartOpacity - 0.05);
            break;
        case '1':
            settings.showMainText = !settings.showMainText;
            console.log('Негізгі мәтін: ' + (settings.showMainText ? 'ҚОСЫЛҒАН' : 'ӨШІРІЛГЕН'));
            break;
        case '2':
            settings.showHeart = !settings.showHeart;
            console.log('Жүрек анимациясы: ' + (settings.showHeart ? 'ҚОСЫЛҒАН' : 'ӨШІРІЛГЕН'));
            break;
        case '3':
            settings.showParticles = !settings.showParticles;
            console.log('Бөлшектер: ' + (settings.showParticles ? 'ҚОСЫЛҒАН' : 'ӨШІРІЛГЕН'));
            break;
        case 'w':
        case 'W':
            settings.mainPulseSpeed += 0.005;
            break;
        case 's':
        case 'S':
            settings.mainPulseSpeed = Math.max(0.001, settings.mainPulseSpeed - 0.005);
            break;
        case 't':
        case 'T':
            settings.mainText = settings.mainText === "Anel" ? "I love you" : "Anel";
            console.log('Мәтін өзгерді: ' + settings.mainText);
            break;
        case '0':
            settings.mainText = "Anel";
            settings.mainTextSize = 70;
            settings.mainPulseSpeed = 0.01;
            settings.mainPulseAmount = 0.05;
            settings.mainColor = "#FFFFFF";
            settings.shadowColor = "#FF69B4";
            settings.heartSize = 20;
            settings.heartSpeed = 0.001;
            settings.heartOpacity = 0.12;
            settings.showMainText = true;
            settings.showHeart = true;
            settings.showParticles = true;
            adjustForMobile();
            console.log('БАРЛЫҒЫ ҚАЛПЫНА КЕЛТІРІЛДІ');
            break;
        case ' ':
            console.log("============= АҚПАРАТ =============");
            console.log("Мәтін: " + settings.mainText);
            console.log("Мәтін өлшемі: " + settings.mainTextSize);
            console.log("Жүрек өлшемі: " + settings.heartSize);
            console.log("Жүрек жылдамдығы: " + settings.heartSpeed);
            console.log("Жүрек мөлдірлігі: " + settings.heartOpacity);
            console.log("===================================");
            break;
    }
});

// БАСТАУ
animate();

// Браузер өлшемі өзгергенде
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Мобильная адаптация
    adjustForMobile();
});

// ⭐ МОБИЛЬНАЯ АДАПТАЦИЯ ⭐
function adjustForMobile() {
    const isMobile = window.innerWidth < 768;
    const isSmallMobile = window.innerWidth < 500;
    
    if (isSmallMobile) {
        settings.mainTextSize = 20;
        settings.heartTextCount = 50;
        settings.heartSize = 15;
        settings.heartTextSize = 14;
        settings.particlesCount = 10;
    } else if (isMobile) {
        settings.mainTextSize = 20;
        settings.heartTextCount = 50;
        settings.heartSize = 18;
        settings.heartTextSize = 16;
        settings.particlesCount = 14;
    } else {
        settings.mainTextSize = 20;
        settings.heartTextCount = 50;
        settings.heartSize = 20;
        settings.heartTextSize = 18;
        settings.particlesCount = 17;
    }
    
    // Обновляем частицы
    particles.length = 0;
    for (let i = 0; i < settings.particlesCount; i++) {
        particles.push(new Particle());
    }
}

// Первичная адаптация
adjustForMobile();

console.log("=========================================");
console.log("💖 ANEL - МИНИМАЛИСТІК АНИМАЦИЯ");
console.log("=========================================");
console.log("✨ Жай және элегантты стиль");
console.log("💕 Ақ түс + розовый жарық");
console.log("⭐ Қарапайым сердечки мен жұлдызшалар");
console.log("");
console.log("🎮 БАСҚАРУ:");
console.log("   +/- - Мәтін өлшемі");
console.log("   H/J - Жүрек өлшемі");
console.log("   1/2/3 - Элементтерді қосу/өшіру");
console.log("   T - Мәтін өзгерту");
console.log("   0 - Қалпына келтіру");
console.log("=========================================");
