function openCard() {
    const closedCard = document.getElementById('closedCard');
    const openedCard = document.getElementById('openedCard');
    
    // Жұлдызшалар эффектісі
    createStars(15);
    
    // Анимация жабу
    closedCard.style.animation = 'none';
    closedCard.style.opacity = '0';
    closedCard.style.transform = 'scale(0.9) translateY(20px)';
    
    setTimeout(() => {
        closedCard.style.display = 'none';
        openedCard.style.display = 'block';
        
        // Анимация ашу
        setTimeout(() => {
            openedCard.style.animation = 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            openedCard.style.opacity = '1';
            openedCard.style.transform = 'scale(1) translateY(0)';
        }, 10);
    }, 400);
}

function closeCard() {
    const closedCard = document.getElementById('closedCard');
    const openedCard = document.getElementById('openedCard');
    
    // Жұлдызшалар эффектісі
    createStars(10);
    
    // Анимация жабу
    openedCard.style.animation = 'none';
    openedCard.style.opacity = '0';
    openedCard.style.transform = 'scale(0.9) translateY(20px)';
    
    setTimeout(() => {
        openedCard.style.display = 'none';
        closedCard.style.display = 'block';
        
        // Анимация ашу
        setTimeout(() => {
            closedCard.style.animation = 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            closedCard.style.opacity = '1';
            closedCard.style.transform = 'scale(1) translateY(0)';
        }, 10);
    }, 400);
}

function goToHearts() {
    // Жүректер эффектісі
    createHeartsEffect();
    
    // 2 секундтан кейін бетті ауыстыру
    setTimeout(() => {
        window.location.href = 'сердечко/heart.html';
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
    
    closedCard.style.opacity = '1';
    closedCard.style.transform = 'scale(1) translateY(0)';
    openedCard.style.opacity = '0';
    openedCard.style.transform = 'scale(0.9) translateY(20px)';
});

// Фондағы жұлдызшаларды қайта жасау
setInterval(() => {
    if (Math.random() > 0.7) {
        createStars(3);
    }
}, 3000);
