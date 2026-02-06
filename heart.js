const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const settings = {
    // ⭐ ОРТАДАҒЫ НЕГІЗГІ МӘТІН ⭐
    mainText: "Котенчик",
    mainTextSize: 40,
    mainPulseSpeed: 0.015,
    mainPulseAmount: 0.05,
    mainColor: "#fe7dccbd", // Ақ түс
    shadowColor: "#f8175e", // Розовый shadow түсі
    mainGlow: true,
    
    // ⭐ АРТТАҒЫ ЖҮРЕК АНИМАЦИЯСЫ ⭐
    heartText: "I love you",
    heartTextCount: 70,
    heartTextSize: 16,
    heartSize: 24,
    heartSpeed: 0.002,
    heartColor: "rgba(255, 51, 102, 0.3)", // Ашық түс
    heartOpacity: 0.1, // Мөлдірлік
    
    // Жалпы
    currentTime: 0,
    heartAngle: 0,
    particlesCount: 20,
    
    // ⭐ ЕКІ АНИМАЦИЯНЫ БАСҚАРУ ⭐
    showMainText: true,      // Ортадағы мәтін
    showHeart: true,         // Арттағы жүрек
    showParticles: true      // Бөлшектер
};

// ⭐ БӨЛШЕКТЕР ⭐
class Particle {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.angle = Math.random() * Math.PI * 2;
        this.distance = 50 + Math.random() * 150;
        this.speed = 0.5 + Math.random() * 1;
        this.size = 2 + Math.random() * 4;
        this.opacity = 0.2 + Math.random() * 0.3;
    }
    
    update() {
        this.angle += 0.01;
        this.distance += Math.sin(settings.currentTime * 0.002 + this.angle) * 0.5;
    }
    
    draw(centerX, centerY) {
        const x = centerX + Math.cos(this.angle) * this.distance;
        const y = centerY + Math.sin(this.angle) * this.distance;
        
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 51, 102, ${this.opacity})`;
        ctx.arc(x, y, this.size, 0, Math.PI * 2);
        ctx.fill();
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

// ⭐ АРТТАҒЫ ЖҮРЕК АНИМАЦИЯСЫ ⭐
function drawHeartAnimation() {
    if (!settings.showHeart) return;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Жеңіл толқын эффектісі
    const wave = Math.sin(settings.currentTime * 0.005) * 0.05;
    
    for (let i = 0; i < settings.heartTextCount; i++) {
        const localOffset = (i / settings.heartTextCount) * Math.PI * 2;
        let t = (settings.heartAngle + localOffset) % (Math.PI * 2);
        
        const pos = heartPosition(t);
        
        // Мөлдірлік эффектісі
        const opacity = settings.heartOpacity * (0.7 + 0.3 * Math.sin(t * 2 + settings.currentTime * 0.01));
        
        const x = centerX + pos.x * (settings.heartSize * (1 + wave));
        const y = centerY + pos.y * (settings.heartSize * (1 + wave));
        
        // Мәтін сызу
        ctx.font = `${settings.heartTextSize}px Arial`;
        ctx.fillStyle = `rgba(255, 51, 102, ${opacity})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(settings.heartText, x, y);
    }
    
    settings.heartAngle += settings.heartSpeed;
}

// ⭐ ОРТАДАҒЫ НЕГІЗГІ МӘТІН (АҚ ТҮС + РОЗОВЫЙ SHADOW) ⭐
function drawMainText() {
    if (!settings.showMainText) return;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Пульсация
    const pulse = 1 + Math.sin(settings.currentTime * settings.mainPulseSpeed) * settings.mainPulseAmount;
    const fontSize = settings.mainTextSize * pulse;
    
    // ⭐ 1. Бірінші қабат: Розовый shadow қатты версиясы ⭐
    ctx.save();
    ctx.shadowColor = settings.shadowColor;
    ctx.shadowBlur = 25 * pulse;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    ctx.fillStyle = settings.mainColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    // Өте жеңіл айналу
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(Math.sin(settings.currentTime * 0.001) * 0.03);
    ctx.fillText(settings.mainText, 0, 0);
    ctx.restore();
    
    ctx.restore();
    
    // ⭐ 2. Екінші қабат: Негізгі ақ мәтін (shadow жоқ) ⭐
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    ctx.fillStyle = settings.mainColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    // Өте жеңіл айналу
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(Math.sin(settings.currentTime * 0.001) * 0.03);
    ctx.fillText(settings.mainText, 0, 0);
    ctx.restore();
    
    // ⭐ 3. Үшінші қабат: Жеңіл glow эффекті ⭐
    ctx.save();
    ctx.globalCompositeOperation = "overlay";
    ctx.fillStyle = `rgba(255, 105, 180, 0.15)`;
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(Math.sin(settings.currentTime * 0.001) * 0.03);
    
    // Біраз ығысқан көшірме для glow эффекта
    const glowOffset = Math.sin(settings.currentTime * 0.02) * 3;
    ctx.fillText(settings.mainText, glowOffset, glowOffset);
    ctx.restore();
    ctx.restore();
    
    // Shadow қайта орнату
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
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

// ⭐ ФОН ЭФФЕКТІ ⭐
function drawBackground() {
    // Градиент фон
    const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
    );
    
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
    gradient.addColorStop(1, 'rgba(20, 0, 10, 0.3)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Жұлдызшалар
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < 50; i++) {
        const x = (Math.sin(settings.currentTime * 0.001 + i) * 0.5 + 0.5) * canvas.width;
        const y = (Math.cos(settings.currentTime * 0.001 + i * 0.7) * 0.5 + 0.5) * canvas.height;
        const size = Math.sin(settings.currentTime * 0.01 + i) * 0.5 + 1;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// ⭐ БАСТАПҚЫ ФОН ⭐
function clearCanvas() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// ⭐ НЕГІЗГІ АНИМАЦИЯ ⭐
function animate() {
    clearCanvas();
    drawBackground();
    drawHeartAnimation();    // ⭐ АРТТАҒЫ ЖҮРЕК ⭐
    drawParticles();
    drawMainText();          // ⭐ ОРТАДАҒЫ МӘТІН ⭐
    
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
        case 'g':
        case 'G':
            settings.mainGlow = !settings.mainGlow;
            console.log('Жарқыл эффектісі: ' + (settings.mainGlow ? 'ҚОСЫЛҒАН' : 'ӨШІРІЛГЕН'));
            break;
        case 't':
        case 'T':
            settings.mainText = settings.mainText === "Котенчик" ? "I love you" : "Котенчик";
            console.log('Мәтін өзгерді: ' + settings.mainText);
            break;
        case '0':
            // Барлығын қалпына келтіру
            settings.mainText = "Котенчик";
            settings.mainTextSize = 60;
            settings.mainPulseSpeed = 0.015;
            settings.mainPulseAmount = 0.05;
            settings.mainColor = "#FFFFFF";
            settings.shadowColor = "#FF69B4";
            settings.heartSize = 24;
            settings.heartSpeed = 0.002;
            settings.heartOpacity = 0.1;
            settings.showMainText = true;
            settings.showHeart = true;
            settings.showParticles = true;
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
});

console.log("=========================================");
console.log("❤️ КОТЕНЧИК - АҚ ТҮС + РОЗОВЫЙ SHADOW");
console.log("=========================================");
console.log("✅ Ортадағы мәтін: 'Котенчик'");
console.log("   • Ақ түсте");
console.log("   • Розовый shadow бар");
console.log("   • Пульсирует");
console.log("");
console.log("✅ Арттағы жүрек анимациясы");
console.log("   • 'I love you' мәтіні");
console.log("   • Жүрек формасында айналады");
console.log("   • Мөлдір, жеңіл");
console.log("");
console.log("🎮 БАСҚАРУ ПЕРНЕЛЕРІ:");
console.log("   +/- - Негізгі мәтін өлшемі");
console.log("   H/J - Жүрек өлшемі");
console.log("   K/L - Жүрек жылдамдығы");
console.log("   U/I - Жүрек мөлдірлігі");
console.log("");
console.log("   1 - Негізгі мәтінді қосу/өшіру");
console.log("   2 - Жүрек анимациясын қосу/өшіру");
console.log("   3 - Бөлшектерді қосу/өшіру");
console.log("");
console.log("   W/S - Пульсация жылдамдығы");
console.log("   G - Жарқыл эффектісі");
console.log("   T - Мәтін өзгерту (Котенчик ↔ I love you)");
console.log("   ПРОБЕЛ - Ақпаратты көрсету");
console.log("   0 - БАРЛЫҒЫН қалпына келтіру");
console.log("=========================================");