// Love Card - JavaScript коды
// Барлық функциялар және анимациялар

document.addEventListener('DOMContentLoaded', function() {
    console.log("Love Card жүктелді ❤️");
    
    // Элементтерді табу
    const closedCard = document.getElementById('closedCard');
    const openedCard = document.getElementById('openedCard');
    const body = document.body;
    
    // Бастапқы ортаға орналастыру
    centerAllElements();
    
    // Фондағы жұлдызшаларды жасау
    createBackgroundStars(50);
    
    // Конверттің жүрек анимациясы
    startHeartAnimation();
    
    // Экран өлшемі өзгергенде ортаға орналастыру
    window.addEventListener('resize', centerAllElements);
    
    // Мобильдік түймелерге арналған ивенттер
    setupMobileEvents();
});

// Барлық элементтерді ортаға орналастыру функциясы
function centerAllElements() {
    const container = document.querySelector('.container');
    const closedCard = document.getElementById('closedCard');
    const openedCard = document.getElementById('openedCard');
    
    if (container) {
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.justifyContent = 'center';
        container.style.alignItems = 'center';
        container.style.minHeight = '100vh';
        container.style.width = '100%';
        container.style.maxWidth = '420px';
        container.style.margin = '0 auto';
        container.style.padding = '20px';
        container.style.position = 'relative';
        container.style.zIndex = '2';
    }
    
    if (closedCard) {
        closedCard.style.display = 'block';
        closedCard.style.width = '100%';
        closedCard.style.maxWidth = '420px';
        closedCard.style.margin = '0 auto';
        closedCard.style.position = 'relative';
        closedCard.style.left = '0';
        closedCard.style.transform = 'translateX(0)';
        closedCard.style.animation = 'fadeIn 0.8s ease-out';
    }
    
    if (openedCard) {
        openedCard.style.width = '100%';
        openedCard.style.maxWidth = '420px';
        openedCard.style.margin = '0 auto';
        openedCard.style.position = 'relative';
        openedCard.style.left = '0';
        openedCard.style.transform = 'translateX(0)';
    }
    
    // iPhone 14 үшін арнайы орнатулар
    if (window.innerWidth <= 430) {
        if (container) {
            container.style.maxWidth = '390px';
            container.style.padding = '15px';
        }
        
        // Конверт өлшемін реттеу
        const envelope = document.querySelector('.envelope');
        if (envelope) {
            envelope.style.height = '300px';
            envelope.style.borderRadius = '25px';
            envelope.style.marginBottom = '35px';
        }
        
        // Жүрек өлшемін реттеу
        const envelopeHeart = document.querySelector('.envelope-heart');
        if (envelopeHeart) {
            envelopeHeart.style.fontSize = '100px';
        }
    }
}

// Картаны ашу функциясы
function openCard() {
    console.log("Карта ашылуда...");
    
    const closedCard = document.getElementById('closedCard');
    const openedCard = document.getElementById('openedCard');
    const openButton = document.querySelector('.open-btn');
    const envelopeHeart = document.querySelector('.envelope-heart');
    
    // Ашылу анимациясы үшін эффект
    if (openButton) {
        openButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            openButton.style.transform = 'scale(1)';
        }, 150);
    }
    
    // Жүрек анимациясы
    if (envelopeHeart) {
        envelopeHeart.style.animation = 'heartbeat 0.5s ease-in-out';
        setTimeout(() => {
            envelopeHeart.style.animation = 'heartbeat 1.8s infinite';
        }, 500);
    }
    
    // Жұлдызшалар эффектісі
    createStarEffect(20);
    
    // Дыбыс эффектісі (егер қолжетімді болса)
    playSoundEffect('open');
    
    // Картаны ауыстыру анимациясы
    if (closedCard && openedCard) {
        // Жабық картаны жасыру
        closedCard.style.animation = 'fadeOut 0.5s ease-out forwards';
        
        setTimeout(() => {
            closedCard.style.display = 'none';
            
            // Ашық картаны көрсету
            openedCard.style.display = 'block';
            openedCard.style.animation = 'slideIn 0.6s ease-out forwards';
            
            // Ортаға туралау
            centerAllElements();
            
            // Ашық картаға арналған анимацияларды бастау
            startLetterAnimations();
            
        }, 500);
    }
}

// Картаны жабу функциясы
function closeCard() {
    console.log("Карта жабылуда...");
    
    const closedCard = document.getElementById('closedCard');
    const openedCard = document.getElementById('openedCard');
    const closeButton = document.querySelector('.close-btn');
    
    // Түйменің анимациясы
    if (closeButton) {
        closeButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            closeButton.style.transform = 'scale(1)';
        }, 150);
    }
    
    // Жұлдызшалар эффектісі
    createStarEffect(15);
    
    // Дыбыс эффектісі
    playSoundEffect('close');
    
    // Картаны ауыстыру анимациясы
    if (closedCard && openedCard) {
        // Ашық картаны жасыру
        openedCard.style.animation = 'slideOut 0.5s ease-out forwards';
        
        setTimeout(() => {
            openedCard.style.display = 'none';
            
            // Жабық картаны көрсету
            closedCard.style.display = 'block';
            closedCard.style.animation = 'fadeIn 0.6s ease-out forwards';
            
            // Ортаға туралау
            centerAllElements();
            
        }, 500);
    }
}

// Жүректер бетіне өту функциясы
function goToHearts() {
    console.log("Жүректер бетіне өту...");
    
    const tapButton = document.querySelector('.tap-btn');
    
    // Түйменің анимациясы
    if (tapButton) {
        tapButton.style.transform = 'scale(0.95)';
        tapButton.innerHTML = '<span>Жүктелуде...</span> <i class="fas fa-spinner fa-spin"></i>';
        
        setTimeout(() => {
            tapButton.style.transform = 'scale(1)';
        }, 150);
    }
    
    // Күшті жүрек анимациясы
    createHeartsEffect(30);
    
    // Дыбыс эффектісі
    playSoundEffect('hearts');
    
    // Барлық экранды жүректермен толтыру
    setTimeout(() => {
        fillScreenWithHearts();
    }, 800);
    
    // 3 секундтан кейін бетті ауыстыру
    setTimeout(() => {
        window.location.href = 'hearts.html';
    }, 3000);
}

// Фондағы жұлдызшаларды жасау функциясы
function createBackgroundStars(count) {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'background-stars';
    starsContainer.style.position = 'fixed';
    starsContainer.style.top = '0';
    starsContainer.style.left = '0';
    starsContainer.style.width = '100%';
    starsContainer.style.height = '100%';
    starsContainer.style.pointerEvents = 'none';
    starsContainer.style.zIndex = '1';
    starsContainer.style.overflow = 'hidden';
    
    document.body.appendChild(starsContainer);
    
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'background-star';
        
        // Кездейсоқ өлшем
        const size = 1 + Math.random() * 3;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Кездейсоқ позиция
        star.style.position = 'absolute';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        
        // Кездейсоқ түс
        const brightness = 0.5 + Math.random() * 0.5;
        star.style.backgroundColor = `rgba(255, 255, 255, ${brightness})`;
        star.style.borderRadius = '50%';
        star.style.boxShadow = `0 0 ${size * 2}px rgba(255, 255, 255, ${brightness})`;
        
        // Кездейсоқ жыпылықтау анимациясы
        const duration = 2 + Math.random() * 4;
        const delay = Math.random() * 5;
        star.style.animation = `starTwinkle ${duration}s infinite ${delay}s`;
        
        starsContainer.appendChild(star);
    }
    
    // Жыпылықтау анимациясын қосу
    const style = document.createElement('style');
    style.textContent = `
        @keyframes starTwinkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
        }
    `;
    document.head.appendChild(style);
}

// Жұлдызшалар эффектісін жасау функциясы
function createStarEffect(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.innerHTML = '✦';
            star.style.position = 'fixed';
            star.style.fontSize = (20 + Math.random() * 30) + 'px';
            star.style.color = `rgba(255, 255, 255, ${0.7 + Math.random() * 0.3})`;
            star.style.left = (Math.random() * 80 + 10) + 'vw';
            star.style.top = (Math.random() * 80 + 10) + 'vh';
            star.style.zIndex = '9998';
            star.style.pointerEvents = 'none';
            star.style.opacity = '0';
            star.style.transform = 'scale(0) rotate(0deg)';
            star.style.transition = 'all 0.8s ease-out';
            star.style.textShadow = '0 0 10px currentColor';
            star.style.fontWeight = 'bold';
            
            document.body.appendChild(star);
            
            // Ашылу анимациясы
            setTimeout(() => {
                star.style.opacity = '1';
                star.style.transform = `scale(${1 + Math.random() * 0.5}) rotate(${Math.random() * 360}deg)`;
            }, 10);
            
            // Жабылу анимациясы
            setTimeout(() => {
                star.style.opacity = '0';
                star.style.transform = 'scale(0) rotate(720deg)';
                
                // Элементті жою
                setTimeout(() => {
                    if (star.parentNode) {
                        star.parentNode.removeChild(star);
                    }
                }, 800);
            }, 800);
        }, i * 50);
    }
}

// Жүрек анимациясын бастау функциясы
function startHeartAnimation() {
    const envelopeHeart = document.querySelector('.envelope-heart');
    if (envelopeHeart) {
        envelopeHeart.style.animation = 'heartbeat 1.8s infinite';
    }
    
    // Жүрек анимациясын қосу
    const style = document.createElement('style');
    style.textContent = `
        @keyframes heartbeat {
            0%, 100% { 
                transform: scale(1) rotate(0deg); 
                filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
            }
            25% { 
                transform: scale(1.15) rotate(-5deg); 
                filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.6));
            }
            75% { 
                transform: scale(1.15) rotate(5deg); 
                filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.6));
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            to {
                opacity: 0;
                transform: translateY(-20px) scale(0.95);
            }
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(40px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            to {
                opacity: 0;
                transform: translateY(40px) scale(0.9);
            }
        }
        
        @keyframes letterAppear {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Хат анимацияларын бастау функциясы
function startLetterAnimations() {
    const letterHeader = document.querySelector('.letter-header');
    const letterContent = document.querySelector('.letter-content');
    const wishes = document.querySelectorAll('.wish');
    const tapButton = document.querySelector('.tap-btn');
    
    // Бөліктерді кезекпен көрсету
    if (letterHeader) {
        letterHeader.style.animation = 'letterAppear 0.6s ease-out 0.2s both';
        letterHeader.style.opacity = '0';
    }
    
    if (letterContent) {
        letterContent.style.animation = 'letterAppear 0.6s ease-out 0.4s both';
        letterContent.style.opacity = '0';
    }
    
    // Әр тілекке жеке анимация
    wishes.forEach((wish, index) => {
        wish.style.animation = `letterAppear 0.5s ease-out ${0.6 + index * 0.1}s both`;
        wish.style.opacity = '0';
    });
    
    if (tapButton) {
        tapButton.style.animation = 'letterAppear 0.6s ease-out 1.2s both';
        tapButton.style.opacity = '0';
    }
}

// Жүректер эффектісін жасау функциясы
function createHeartsEffect(count) {
    const colors = [
        '#ff3366', '#ff0066', '#ff1493', '#ff66b2',
        '#ff3366', '#ff0066', '#ff1493', '#ff66b2'
    ];
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤';
            heart.style.position = 'fixed';
            heart.style.fontSize = (30 + Math.random() * 50) + 'px';
            heart.style.color = colors[Math.floor(Math.random() * colors.length)];
            heart.style.left = (Math.random() * 80 + 10) + 'vw';
            heart.style.top = '110vh';
            heart.style.zIndex = '9999';
            heart.style.pointerEvents = 'none';
            heart.style.opacity = '0.9';
            heart.style.filter = 'drop-shadow(0 0 15px currentColor)';
            heart.style.transform = 'scale(0.8)';
            heart.style.textShadow = '0 0 20px currentColor';
            heart.style.fontWeight = 'bold';
            
            document.body.appendChild(heart);
            
            // Кездейсоқ анимация параметрлері
            const duration = 1800 + Math.random() * 1200;
            const rotation = (Math.random() - 0.5) * 360;
            const endX = (Math.random() - 0.5) * 100;
            
            // Анимация
            const keyframes = [
                { 
                    transform: `translateY(0) scale(0.8) rotate(0deg)`, 
                    opacity: 0 
                },
                { 
                    transform: `translateY(-50px) scale(1.2) rotate(${rotation/4}deg)`, 
                    opacity: 0.9 
                },
                { 
                    transform: `translateY(-100vh) translateX(${endX}px) scale(1) rotate(${rotation}deg)`, 
                    opacity: 0 
                }
            ];
            
            const animation = heart.animate(keyframes, {
                duration: duration,
                easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)'
            });
            
            animation.onfinish = () => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            };
        }, i * 80);
    }
}

// Барлық экранды жүректермен толтыру функциясы
function fillScreenWithHearts() {
    const heartsCount = 100;
    const container = document.createElement('div');
    container.id = 'hearts-overlay';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.zIndex = '10000';
    container.style.pointerEvents = 'none';
    container.style.background = 'rgba(0, 0, 0, 0.7)';
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    container.style.flexWrap = 'wrap';
    container.style.overflow = 'hidden';
    
    document.body.appendChild(container);
    
    // Орталық хабарлама
    const message = document.createElement('div');
    message.innerHTML = '❤️ Сүйіспеншілікпен ❤️';
    message.style.color = '#ff3366';
    message.style.fontSize = '36px';
    message.style.fontWeight = 'bold';
    message.style.textShadow = '0 0 20px rgba(255, 51, 102, 0.8)';
    message.style.textAlign = 'center';
    message.style.zIndex = '10001';
    message.style.position = 'absolute';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.opacity = '0';
    message.style.animation = 'fadeIn 1s ease-out 0.5s forwards';
    
    container.appendChild(message);
    
    // Көптеген жүректер
    for (let i = 0; i < heartsCount; i++) {
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
        
        // Жыпылықтау анимациясы
        setInterval(() => {
            if (Math.random() > 0.7) {
                heart.style.opacity = Math.random() > 0.5 ? '1' : '0.6';
            }
        }, 1000 + Math.random() * 2000);
    }
}

// Дыбыс эффектісін ойнату функциясы
function playSoundEffect(type) {
    // Егер браузер дыбысты қолдаса
    try {
        // Жеңіл дыбыс эффектілері (Web Audio API арқылы)
        if (window.AudioContext || window.webkitAudioContext) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioCtx = new AudioContext();
            
            let frequency = 523.25; // C5 нотасы
            
            if (type === 'open') {
                frequency = 659.25; // E5 нотасы
            } else if (type === 'close') {
                frequency = 493.88; // B4 нотасы
            } else if (type === 'hearts') {
                frequency = 783.99; // G5 нотасы
            }
            
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
            
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.5);
            
        }
    } catch (error) {
        console.log("Дыбыс қолдауы жоқ, бірақ бұл мәселе емес!");
    }
}

// Мобильдік ивенттерді орнату функциясы
function setupMobileEvents() {
    // Түймелерге түртінді ивенттер
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
    const viewportFixStyle = document.createElement('style');
    viewportFixStyle.textContent = `
        :root {
            --vh: 1vh;
        }
        
        body {
            min-height: calc(var(--vh, 1vh) * 100);
        }
        
        .container {
            min-height: calc(var(--vh, 1vh) * 100);
        }
    `;
    document.head.appendChild(viewportFixStyle);
}

// Қосымша пайдалы функциялар
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'love-notification';
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.background = 'linear-gradient(135deg, #ff3366, #ff1493)';
    notification.style.color = 'white';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '50px';
    notification.style.zIndex = '10000';
    notification.style.boxShadow = '0 10px 30px rgba(255, 51, 102, 0.5)';
    notification.style.fontWeight = 'bold';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s, transform 0.3s';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Шектеулерді тексеру
function checkLimits() {
    const maxClicks = 50;
    let clickCount = 0;
    
    return function() {
        clickCount++;
        if (clickCount >= maxClicks) {
            showNotification('Сіз мені өте жақсы көресіз! ❤️');
            clickCount = 0;
        }
    };
}

// Желілік күйін тексеру
function checkConnection() {
    if (!navigator.onLine) {
        showNotification('Интернет жоқ, бірақ махаббат бар! ❤️');
    }
}

// Бастапқы тексерулерді іске қосу
checkConnection();
const clickTracker = checkLimits();

// Глобальды функцияларды экспорттау
window.openCard = openCard;
window.closeCard = closeCard;
window.goToHearts = goToHearts;

console.log("Love Card JavaScript дайын! ❤️");
