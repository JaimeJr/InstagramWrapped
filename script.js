// script.js

// Variáveis globais
let currentSlide = 0;
const totalSlides = 11; // 0 a 10 (11 slides)

// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa os slides
    showSlide(currentSlide);
    
    // Adiciona eventos de teclado
    document.addEventListener('keydown', handleKeyPress);
    
    // Adiciona eventos de toque para mobile (opcional)
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe esquerdo → próximo
            nextSlide();
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe direito → anterior
            prevSlide();
        }
    }
});

// Função para mostrar um slide específico
function showSlide(index) {
    // Valida o índice
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    
    // Esconde todos os slides
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Mostra o slide atual
    const currentSlideElement = document.getElementById(`slide-${index}`);
    if (currentSlideElement) {
        currentSlideElement.classList.add('active');
    }
    
    // Atualiza o contador de slides no footer
    updateSlideCounter(index);
    
    // Atualiza as bolinhas indicadoras
    updateDots(index);
    
    // Atualiza a barra de progresso
    updateProgressBar(index);
    
    // Atualiza a variável global
    currentSlide = index;
    
    // Mostra/esconde botões de navegação
    updateNavButtons(index);
    
    // Reseta as animações (opcional, mas garante que rodem novamente)
    resetAnimations(index);
}

// Função para ir para o próximo slide
function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        showSlide(currentSlide + 1);
    } else {
        // Se estiver no último slide, volta para o início (opcional)
        // showSlide(0);
    }
}

// Função para ir para o slide anterior
function prevSlide() {
    if (currentSlide > 0) {
        showSlide(currentSlide - 1);
    }
}

// Função para ir para um slide específico (chamada pelas bolinhas)
function goToSlide(index) {
    showSlide(index);
}

// Atualiza o contador de slides
function updateSlideCounter(index) {
    const counters = document.querySelectorAll('.slide-counter');
    counters.forEach(counter => {
        // Mostra o número atual e total (ajustando para exibir 1-11 em vez de 0-10)
        counter.textContent = `${index + 1}/${totalSlides}`;
    });
}

// Atualiza as bolinhas indicadoras
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

// Atualiza a barra de progresso
function updateProgressBar(index) {
    const progressBars = document.querySelectorAll('.progress');
    const percent = ((index + 1) / totalSlides) * 100;
    progressBars.forEach(bar => {
        bar.style.width = `${percent}%`;
    });
}

// Atualiza a visibilidade dos botões de navegação
function updateNavButtons(index) {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn && nextBtn) {
        // No primeiro slide, esconde o botão anterior
        if (index === 0) {
            prevBtn.style.opacity = '0.3';
            prevBtn.style.pointerEvents = 'none';
        } else {
            prevBtn.style.opacity = '1';
            prevBtn.style.pointerEvents = 'auto';
        }
        
        // No último slide, esconde o botão próximo
        if (index === totalSlides - 1) {
            nextBtn.style.opacity = '0.3';
            nextBtn.style.pointerEvents = 'none';
        } else {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
        }
    }
}

// Reseta as animações para garantir que rodem novamente
function resetAnimations(index) {
    const slide = document.getElementById(`slide-${index}`);
    if (slide) {
        const animatedElements = slide.querySelectorAll('[class*="animate-"], .slide-title, .context-text, .highlight-text, .footer-note, .ranking-container, .pages-ranking, .stats-comparison, .audio-stats, .streak-container, .hours-container, .summary-grid, .final-message, .final-emojis, .credits');
        
        animatedElements.forEach(element => {
            // Remove a animação temporariamente
            element.style.animation = 'none';
            element.offsetHeight; // Força reflow
            element.style.animation = '';
        });
    }
}

// Função para lidar com teclas do teclado
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

// Função para criar confetes no último slide (opcional)
function createConfetti() {
    if (currentSlide === totalSlides - 1) {
        // Simula confetes com emojis
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

// Adiciona animação de queda para confetes
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

// Função para pré-carregar os slides (opcional, para melhor performance)
function preloadSlides() {
    for (let i = 0; i < totalSlides; i++) {
        const slide = document.getElementById(`slide-${i}`);
        if (slide) {
            // Força o carregamento de imagens se houver
            const images = slide.querySelectorAll('img');
            images.forEach(img => {
                const src = img.getAttribute('src');
                if (src) {
                    const preloadImg = new Image();
                    preloadImg.src = src;
                }
            });
        }
    }
}

// Chama o pré-carregamento após a página carregar
window.addEventListener('load', preloadSlides);

// Função para copiar link do slide atual (opcional, para compartilhamento)
function getCurrentSlideLink() {
    return `${window.location.origin}${window.location.pathname}#slide-${currentSlide}`;
}

// Suporte para navegação por hash (#slide-1, #slide-2, etc.)
function checkHash() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#slide-')) {
        const slideIndex = parseInt(hash.replace('#slide-', ''));
        if (!isNaN(slideIndex) && slideIndex >= 0 && slideIndex < totalSlides) {
            showSlide(slideIndex);
        }
    }
}

// Verifica o hash quando a página carrega
window.addEventListener('load', checkHash);

// Atualiza o hash quando o slide muda (opcional)
function updateHash(index) {
    window.location.hash = `slide-${index}`;
}

// Modifique a função showSlide para incluir a atualização do hash
const originalShowSlide = showSlide;
showSlide = function(index) {
    originalShowSlide(index);
    updateHash(index);
    createConfetti(); // Tenta criar confetes no último slide
};

// Função para toggle de tela cheia (opcional)
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// Adiciona atalho 'F' para tela cheia
document.addEventListener('keydown', function(event) {
    if (event.key === 'f' || event.key === 'F') {
        toggleFullscreen();
    }
});

// Exporta funções para o escopo global
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.goToSlide = goToSlide;