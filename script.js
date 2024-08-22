let currentSlide = 0;

const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const scrollContainer = document.querySelector('.scroll-container');

function scrollToSlide(index) {
    if (index >= 0 && index < totalSlides) {
        currentSlide = index;
        scrollContainer.scrollTo({
            top: window.innerHeight * currentSlide,
            behavior: 'smooth'
        });
        updateIndicators();
        updateProgressBar();
    }
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function updateProgressBar() {
    const progress = document.querySelector('.progress');
    const progressHeight = ((currentSlide + 1) / totalSlides) * 100;
    progress.style.height = `${progressHeight}%`;
}

// Adiciona indicadores
const indicatorContainer = document.querySelector('.indicator-container');

for (let i = 0; i < totalSlides; i++) {
    const indicator = document.createElement('div');
    indicator.className = 'indicator';
    indicator.addEventListener('click', () => scrollToSlide(i));
    indicatorContainer.appendChild(indicator);
}

updateIndicators();
updateProgressBar();

// Atualiza a barra de progresso e adiciona a funcionalidade de clique
const progressBar = document.querySelector('.progress-bar');
progressBar.addEventListener('click', (event) => {
    const rect = progressBar.getBoundingClientRect();
    const clickY = event.clientY - rect.top;
    const slideIndex = Math.floor((clickY / progressBar.clientHeight) * totalSlides);
    scrollToSlide(slideIndex);
});

// Navegação por scroll e teclado
document.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
        scrollToSlide(currentSlide + 1);
    } else {
        scrollToSlide(currentSlide - 1);
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
        scrollToSlide(currentSlide + 1);
    } else if (event.key === 'ArrowUp') {
        scrollToSlide(currentSlide - 1);
    }
});

const logo = document.querySelector('.logo');
const sections = document.querySelectorAll('.slide');

function updateLogoColor() {
    let currentSection = '';

    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = section.id;
        }
    });

    if (currentSection === 'sobre') {
        logo.classList.add('dark');
        logo.classList.remove('light');
    } else {
        logo.classList.add('light');
        logo.classList.remove('dark');
    }
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            updateLogoColor();
        }
    });
}, { threshold: [0.5] });

sections.forEach((section) => {
    observer.observe(section);
});
