function openCard() {
    const closedCard = document.getElementById('closedCard');
    const openedCard = document.getElementById('openedCard');
    
    // Жұлдызшалар эффектісі
    createStars(15);
    
    // Жабық карточканы жасыру
    closedCard.style.animation = 'none';
    closedCard.style.opacity = '0';
    closedCard.style.transform = 'translate(-50%, -50%) scale(0.9) translateY(20px)';
    
    setTimeout(() => {
        closedCard.style.display = 'none';
        openedCard.style.display = 'flex'; // flex деп өзгерту ортаға туралау үшін
        
        // iOS үшін орналастыруды бекіту
        openedCard.style.position = 'fixed';
        openedCard.style.top = '50%';
        openedCard.style.left = '50%';
        openedCard.style.transform = 'translate(-50%, -50%) scale(0.9)';
        openedCard.style.width = '90%';
        openedCard.style.maxWidth = '650px';
        openedCard.style.zIndex = '1000';
        openedCard.style.minHeight = '600px';
        
        // Анимация ашу
        setTimeout(() => {
            openedCard.style.animation = 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            openedCard.style.opacity = '1';
            openedCard.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 10);
    }, 400);
}

function closeCard() {
    const closedCard = document.getElementById('closedCard');
    const openedCard = document.getElementById('openedCard');
    
    // Жұлдызшалар эффектісі
    createStars(10);
    
    // Ашық карточканы жасыру
    openedCard.style.animation = 'none';
    openedCard.style.opacity = '0';
    openedCard.style.transform = 'translate(-50%, -50%) scale(0.9)';
    
    setTimeout(() => {
        openedCard.style.display = 'none';
        closedCard.style.display = 'flex'; // flex деп өзгерту
        
        // iOS үшін орналастыруды бекіту
        closedCard.style.position = 'fixed';
        closedCard.style.top = '50%';
        closedCard.style.left = '50%';
        closedCard.style.transform = 'translate(-50%, -50%) scale(0.9)';
        closedCard.style.width = '90%';
        closedCard.style.maxWidth = '500px';
        closedCard.style.zIndex = '1000';
        
        // Анимация ашу
        setTimeout(() => {
            closedCard.style.animation = 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            closedCard.style.opacity = '1';
            closedCard.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 10);
    }, 400);
}

function goToHearts() {
    // Жүректер эффектісі
    createHeartsEffect();
    
    // 2 секундтан кейін бетті ауыстыру - ЕСКЕРТУ: Сіз бұл функцияны өзгерткіңіз келмейді
    setTimeout(() => {
        window.location.href = 'heart/heart.html';
    }, 1000);
}

function createStars(count) {
    for(let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'floating-star';
        star.style.width = star.style.height = (2 + Math.random() * 5) + 'px';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.animationDuration = (10 + Math.random() * 15) + 's';
        
        document.body.appendChild(star);
        
        // Тазалау
        setTimeout(() => star.remove(), 10000);
    }
}

function createHeartsEffect() {
    for(let i = 0; i < 25; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤';
        heart.style.position = 'fixed';
        heart.style.fontSize = (30 + Math.random() * 50) + 'px';
        heart.style.color = `hsl(${340 + Math.random()*20}, 100%, ${60 + Math.random()*20}%)`;
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.zIndex = '1000';
        heart.style.pointerEvents = 'none';
        heart.style.opacity = '0';
        heart.style.filter = 'drop-shadow(0 0 10px currentColor)';
        
        document.body.appendChild(heart);
        
        // Анимация
        const animation = heart.animate([
            { 
                transform: 'translateY(0) scale(0) rotate(0deg)', 
                opacity: 0 
            },
            { 
                transform: 'translateY(-50px) scale(1) rotate(-10deg)', 
                opacity: 0.8 
            },
            { 
                transform: 'translateY(-100vh) scale(1.3) rotate(10deg)', 
                opacity: 0 
            }
        ], {
            duration: 1800 + Math.random() * 1000,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        });
        
        animation.onfinish = () => heart.remove();
    }
}

// Бастапқы жұлдызшалар
document.addEventListener('DOMContentLoaded', () => {
    createStars(30);
    
    const closedCard = document.getElementById('closedCard');
    const openedCard = document.getElementById('openedCard');
    
    // iOS үшін бастапқы орналастыруды бекіту
    closedCard.style.position = 'fixed';
    closedCard.style.top = '50%';
    closedCard.style.left = '50%';
    closedCard.style.transform = 'translate(-50%, -50%)';
    closedCard.style.width = '90%';
    closedCard.style.maxWidth = '500px';
    closedCard.style.opacity = '1';
    closedCard.style.display = 'flex';
    closedCard.style.flexDirection = 'column';
    closedCard.style.alignItems = 'center';
    closedCard.style.zIndex = '1000';
    
    openedCard.style.position = 'fixed';
    openedCard.style.top = '50%';
    openedCard.style.left = '50%';
    openedCard.style.transform = 'translate(-50%, -50%) scale(0.9)';
    openedCard.style.width = '90%';
    openedCard.style.maxWidth = '650px';
    openedCard.style.opacity = '0';
    openedCard.style.display = 'none';
    openedCard.style.flexDirection = 'column';
    openedCard.style.alignItems = 'center';
    openedCard.style.zIndex = '1000';
    openedCard.style.minHeight = '600px';
    
    // iOS Safari үшін бекіту
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
        // iOS құрылғысында қосымша түзетулер
        document.body.style.height = '-webkit-fill-available';
        document.body.style.overflow = 'hidden';
        
        // Кнопкаларға үлкен жер басу аймағы
        const buttons = document.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.style.minHeight = '60px';
            btn.style.fontSize = '24px';
            btn.style.padding = '20px';
        });
        
        // Мәтінді үлкейту
        const handwriting = document.querySelector('.handwriting');
        if (handwriting) {
            handwriting.style.fontSize = '28px';
            handwriting.style.lineHeight = '1.6';
        }
        
        // Тақырыпты үлкейту
        const header = document.querySelector('.letter-header h2');
        if (header) {
            header.style.fontSize = '36px';
        }
    }
});

// Фондағы жұлдызшаларды қайта жасау
setInterval(() => {
    if (Math.random() > 0.7) {
        createStars(3);
    }
}, 3000);
