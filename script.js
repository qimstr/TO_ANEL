// Love Card - JavaScript коды
// Барлық функциялар және анимациялар

// Глобальды айнымалылар
let animationEnabled = true;
let starsInterval;

// Документ жүктелгенде
document.addEventListener('DOMContentLoaded', function() {
    console.log("Love Card жүктелді ❤️");
    
    // Элементтерді табу
    const closedCard = document.getElementById('closedCard');
    const openedCard = document.getElementById('openedCard');
    
    // Бастапқы күйді орнату
    if (closedCard) {
        closedCard.style.opacity = '1';
        closedCard.style.transform = 'scale(1)';
        closedCard.style.display = 'block';
    }
    
    if (openedCard) {
        openedCard.style.opacity = '0';
        openedCard.style.transform = 'scale(0.9) translateY(20px)';
        openedCard.style.display = 'none';
    }
    
    // Бастапқы жұлдызшалар
    createStars(30);
    
    // Фондағы жұлдызшалар анимациясы
    starsInterval = setInterval(() => {
        if (Math.random() > 0.7) {
            createStars(3);
        }
    }, 3000);
    
    // Мобильдік түймелер үшін
    setupMobileEvents();
});

// Картаны ашу функциясы
function openCard() {
    if (!animationEnabled) return;
    
    const closedCard = document.getElementById('closedCard');
    const openedCard = document.getElementById('openedCard');
    
    if (!closedCard || !openedCard) return;
    
    console.log("Карта ашылуда...");
    
    // Анимацияны уақытша өшіру
    animationEnabled = false;
    
    // Жұлдызшалар эффектісі
    createStars(15);
    
    // Анимация жабу
    closedCard.style.animation = 'none';
    closedCard.style.transition = 'all 0.4s ease';
    closedCard.style.opacity = '0';
    closedCard.style.transform = 'scale(0.9) translateY(20px)';
    
    setTimeout(() => {
        closedCard.style.display = 'none';
        
        // Ашық картаны көрсету
        openedCard.style.display = 'block';
        openedCard.style.transition = 'all 0.4s ease 0.1s';
        
        // Анимация ашу
        setTimeout(() => {
            openedCard.style.opacity = '1';
            openedCard.style.transform = 'scale(1) translateY(0)';
            
            // Анимацияны қайта қосу
            setTimeout(() => {
                animationEnabled = true;
            }, 400);
        }, 50);
    }, 400);
}

// Картаны жабу функциясы
function closeCard() {
    if (!animationEnabled) return;
    
    const closedCard = document.getElementById('closedCard');
    const openedCard = document.getElementById('openedCard');
    
    if (!closedCard || !openedCard) return;
    
    console.log("Карта жабылуда...");
    
    // Анимацияны уақытша өшіру
    animationEnabled = false;
    
    // Жұлдызшалар эффектісі
    createStars(10);
    
    // Анимация жабу
    openedCard.style.animation = 'none';
    openedCard.style.transition = 'all 0.4s ease';
    openedCard.style.opacity = '0';
    openedCard.style.transform = 'scale(0.9) translateY(20px)';
    
    setTimeout(() => {
        openedCard.style.display = 'none';
        
        // Жабық картаны көрсету
        closedCard.style.display = 'block';
        closedCard.style.transition = 'all 0.4s ease 0.1s';
        
        // Анимация ашу
        setTimeout(() => {
            closedCard.style.opacity = '1';
            closedCard.style.transform = 'scale(1) translateY(0)';
            
            // Анимацияны қайта қосу
            setTimeout(() => {
                animationEnabled = true;
            }, 400);
        }, 50);
    }, 400);
}

// Жүректер бетіне өту функциясы
function goToHearts() {
    console.log("Жүректер бетіне өту...");
    
    const tapButton = document.querySelector('.tap-btn');
    
    // Түйменің анимациясы
    if (tapButton) {
        tapButton.style.transform = 'scale(0.95)';
        tapButton.style.transition = 'transform 0.2s';
        
        setTimeout(() => {
            tapButton.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Жүректер эффектісі
    createHeartsEffect(25);
    
    // 2 секундтан кейін бетті ауыстыру
    setTimeout(() => {
        // Егер heart.html файлы бар болса
        // window.location.href = 'heart/heart.html';
        
        // Немесе алдын ала хабарлама
        alert("❤️ Жүректер бетіне өтілуде...");
        
        // Жүректер толық экранды алады
        createFullScreenHearts();
    }, 2000);
}

// Жұлдызшаларды жасау функциясы
function createStars(count) {
    for(let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'floating-star';
        
        // Кездейсоқ өлшем
        const size = 2 + Math.random() * 5;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Кездейсоқ позиция
        star.style.position = 'fixed';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        
        // Стильдер
        star.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        star.style.borderRadius = '50%';
        star.style.boxShadow = '0 0 5px rgba(255, 255, 255, 0.8)';
        star.style.pointerEvents = 'none';
        star.style.zIndex = '999';
        star.style.opacity = '0';
        star.style.transform = 'scale(0)';
        star.style.transition = 'all 1s ease-out';
        
        document.body.appendChild(star);
        
        // Ашылу анимациясы
        setTimeout(() => {
            star.style.opacity = '0.8';
            star.style.transform = 'scale(1)';
        }, 10);
        
        // Жабылу анимациясы
        setTimeout(() => {
            star.style.opacity = '0';
            star.style.transform = 'scale(0)';
            
            // Элементті жою
            setTimeout(() => {
                if (star.parentNode) {
                    star.parentNode.removeChild(star);
                }
            }, 1000);
        }, 1000 + Math.random() * 2000);
    }
}

// Жүректер эффектісін жасау функциясы
function createHeartsEffect(count) {
    const colors = [
        '#ff3366', '#ff0066', '#ff1493', '#ff66b2',
        '#ff3366', '#ff0066', '#ff1493', '#ff66b2'
    ];
    
    for(let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤';
            heart.style.position = 'fixed';
            heart.style.fontSize = (30 + Math.random() * 50) + 'px';
            heart.style.color = colors[Math.floor(Math.random() * colors.length)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '100vh';
            heart.style.zIndex = '1000';
            heart.style.pointerEvents = 'none';
            heart.style.opacity = '0';
            heart.style.filter = 'drop-shadow(0 0 10px currentColor)';
            heart.style.transform = 'translateY(0) scale(0) rotate(0deg)';
            heart.style.textShadow = '0 0 15px currentColor';
            
            document.body.appendChild(heart);
            
            // Кездейсоқ анимация параметрлері
            const duration = 1800 + Math.random() * 1200;
            const rotation = (Math.random() - 0.5) * 360;
            const endX = (Math.random() - 0.5) * 100;
            
            // CSS анимациясы
            heart.animate([
                { 
                    transform: 'translateY(0) scale(0) rotate(0deg)', 
                    opacity: 0 
                },
                { 
                    transform: `translateY(-50px) scale(1) rotate(${rotation/4}deg)`, 
                    opacity: 0.9 
                },
                { 
                    transform: `translateY(-100vh) translateX(${endX}px) scale(1.3) rotate(${rotation}deg)`, 
                    opacity: 0 
                }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
                fill: 'forwards'
            });
            
            // Элементті жою
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, duration);
            
        }, i * 80);
    }
}

// Толық экран жүректер функциясы
function createFullScreenHearts() {
    const container = document.createElement('div');
    container.id = 'fullscreen-hearts';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.zIndex = '9999';
    container.style.pointerEvents = 'none';
    container.style.background = 'rgba(0, 0, 0, 0.9)';
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    container.style.flexWrap = 'wrap';
    
    document.body.appendChild(container);
    
    // Орталық хабарлама
    const message = document.createElement('div');
    message.innerHTML = '❤️ Сүйіспеншілікпен! ❤️';
    message.style.color = '#ff3366';
    message.style.fontSize = 'clamp(24px, 8vw, 48px)';
    message.style.fontWeight = 'bold';
    message.style.textShadow = '0 0 20px rgba(255, 51, 102, 0.8)';
    message.style.textAlign = 'center';
    message.style.zIndex = '10000';
    message.style.position = 'absolute';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.opacity = '0';
    message.style.animation = 'fadeIn 1s ease-out 0.5s forwards';
    
    container.appendChild(message);
    
    // Көптеген жүректер
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤';
        heart.style.position = 'absolute';
        heart.style.fontSize = (20 + Math.random() * 40) + 'px';
        heart.style.color = `hsl(${340 + Math.random()*40}, 100%, ${60 + Math.random()*30}%)`;
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.opacity = '0';
        heart.style.transform = `scale(0) rotate(${Math.random() * 360}deg)`;
        heart.style.transition = `all ${1 + Math.random() * 2}s ease-out`;
        heart.style.filter = 'drop-shadow(0 0 10px currentColor)';
        
        container.appendChild(heart);
        
        // Кездейсоқ кідіріспен анимация
        setTimeout(() => {
            heart.style.opacity = '0.8';
            heart.style.transform = `scale(${0.8 + Math.random() * 0.7}) rotate(${Math.random() * 720}deg)`;
        }, Math.random() * 1000);
    }
    
    // 5 секундтан кейін жою
    setTimeout(() => {
        container.style.opacity = '0';
        container.style.transition = 'opacity 1s ease';
        
        setTimeout(() => {
            if (container.parentNode) {
                container.parentNode.removeChild(container);
            }
        }, 1000);
    }, 5000);
}

// Мобильдік ивенттерді орнату функциясы
function setupMobileEvents() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        // Түртінді басылу
        button.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.95)';
            e.preventDefault();
        });
        
        // Түртінді аяқталу
        button.addEventListener('touchend', function(e) {
            this.style.transform = 'scale(1)';
            e.preventDefault();
        });
        
        // Түртінді тоқтату
        button.addEventListener('touchcancel', function(e) {
            this.style.transform = 'scale(1)';
            e.preventDefault();
        });
    });
    
    // iOS Safari үшін 100vh мәселесін шешу
    function fixViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    fixViewportHeight();
    window.addEventListener('resize', fixViewportHeight);
    
    // CSS қосу
    if (!document.querySelector('#viewport-fix')) {
        const viewportFixStyle = document.createElement('style');
        viewportFixStyle.id = 'viewport-fix';
        viewportFixStyle.textContent = `
            :root {
                --vh: 1vh;
            }
            
            body {
                min-height: calc(var(--vh, 1vh) * 100);
            }
        `;
        document.head.appendChild(viewportFixStyle);
    }
}

// Қосымша CSS анимацияларын қосу
function addAnimations() {
    if (!document.querySelector('#custom-animations')) {
        const style = document.createElement('style');
        style.id = 'custom-animations';
        style.textContent = `
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(20px) scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            @keyframes floatStar {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) rotate(180deg);
                    opacity: 0;
                }
            }
            
            .floating-star {
                animation: floatStar 2s ease-out forwards;
            }
        `;
        document.head.appendChild(style);
    }
}

// Бастапқы CSS анимацияларын қосу
addAnimations();

// Глобальды функцияларды экспорттау
window.openCard = openCard;
window.closeCard = closeCard;
window.goToHearts = goToHearts;

console.log("Love Card JavaScript дайын! ❤️");

// Sayfa kapatıldığında interval'i temizle
window.addEventListener('beforeunload', function() {
    if (starsInterval) {
        clearInterval(starsInterval);
    }
});
