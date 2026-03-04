// script.js - VERSÃO ATUALIZADA

let currentSlide = 0;
const totalSlides = 11; // 0 a 10 (11 slides)

document.addEventListener('DOMContentLoaded', function() {
    showSlide(currentSlide);
    document.addEventListener('keydown', handleKeyPress);
    setupClickNavigation(); // NOVO: configura clique nas laterais
});

// NOVA FUNÇÃO: Configurar clique nas laterais
function setupClickNavigation() {
    const container = document.querySelector('.container');
    
    container.addEventListener('click', function(event) {
        // Pega a largura da tela
        const windowWidth = window.innerWidth;
        const clickX = event.clientX;
        
        // Se clicou no terço direito da tela (a partir de 66% da largura)
        if (clickX > windowWidth * 0.66) {
            nextSlide();
        }
        // Se clicou no terço esquerdo da tela (até 33% da largura)
        else if (clickX < windowWidth * 0.33) {
            prevSlide();
        }
        // Se clicou no meio, não faz nada (para não interferir em botões)
    });
}

// Função para mostrar um slide específico
function showSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    const currentSlideElement = document.getElementById(`slide-${index}`);
    if (currentSlideElement) {
        currentSlideElement.classList.add('active');
    }
    
    updateSlideCounter(index);
    updateDots(index);
    updateProgressBar(index);
    
    currentSlide = index;
    resetAnimations(index);
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        showSlide(currentSlide + 1);
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        showSlide(currentSlide - 1);
    }
}

function goToSlide(index) {
    showSlide(index);
}

function updateSlideCounter(index) {
    const counters = document.querySelectorAll('.slide-counter');
    counters.forEach(counter => {
        counter.textContent = `${index + 1}/${totalSlides}`;
    });
}

function updateDots(index) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function updateProgressBar(index) {
    const progressBars = document.querySelectorAll('.progress');
    const percent = ((index + 1) / totalSlides) * 100;
    progressBars.forEach(bar => {
        bar.style.width = `${percent}%`;
    });
}

function resetAnimations(index) {
    const slide = document.getElementById(`slide-${index}`);
    if (slide) {
        const animatedElements = slide.querySelectorAll('.slide-title, .context-text, .highlight-text, .footer-note, .ranking-container, .pages-ranking, .stats-comparison, .audio-stats, .streak-container, .hours-container, .summary-grid, .final-message, .final-emojis, .credits, .slide-icon, .date-box, .floating-emojis, .chat-preview, .audio-wave, .fun-fact, .peak-time, .total-card, .comparison');
        
        animatedElements.forEach(element => {
            element.style.animation = 'none';
            element.offsetHeight;
            element.style.animation = '';
        });
    }
}

function handleKeyPress(event) {
    switch(event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
        case 'Space':
            event.preventDefault();
            nextSlide();
            break;
        case 'ArrowLeft':
        case 'ArrowUp':
            event.preventDefault();
            prevSlide();
            break;
        case 'Home':
            event.preventDefault();
            goToSlide(0);
            break;
        case 'End':
            event.preventDefault();
            goToSlide(totalSlides - 1);
            break;
    }
}

// Opcional: Criar confetes no último slide
function createConfetti() {
    if (currentSlide === totalSlides - 1) {
        const container = document.querySelector('.slide.active .slide-content');
        if (container) {
            for (let i = 0; i < 30; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('span');
                    confetti.innerHTML = ['🎉', '🎊', '✨', '🌟', '💫'][Math.floor(Math.random() * 5)];
                    confetti.style.position = 'fixed';
                    confetti.style.left = Math.random() * 100 + '%';
                    confetti.style.top = '-10px';
                    confetti.style.fontSize = (Math.random() * 20 + 20) + 'px';
                    confetti.style.zIndex = '1000';
                    confetti.style.pointerEvents = 'none';
                    confetti.style.animation = `fall ${Math.random() * 2 + 2}s linear forwards`;
                    document.body.appendChild(confetti);
                    
                    setTimeout(() => {
                        confetti.remove();
                    }, 4000);
                }, i * 100);
            }
        }
    }
}

// Animação de queda para confetes
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Modifica showSlide para incluir confetes
const originalShowSlide = showSlide;
showSlide = function(index) {
    originalShowSlide(index);
    createConfetti();
};

// Suporte a hash na URL
function checkHash() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#slide-')) {
        const slideIndex = parseInt(hash.replace('#slide-', ''));
        if (!isNaN(slideIndex) && slideIndex >= 0 && slideIndex < totalSlides) {
            showSlide(slideIndex);
        }
    }
}

window.addEventListener('load', checkHash);

// Exporta funções para o escopo global
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.goToSlide = goToSlide;