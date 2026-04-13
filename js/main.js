const navIcon = document.getElementById('nav-icon');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-list a');
const headerBtn = document.querySelector('.header-call-btn'); // Новый класс

function toggleMenu() {
    const isOpen = navList.classList.toggle('show');
    navIcon.classList.toggle('open');
    document.body.style.overflow = isOpen ? 'hidden' : '';

    // Прячем кнопку в шапке, чтобы не мешалась
    if (headerBtn) {
        headerBtn.style.opacity = isOpen ? '0' : '1';
        headerBtn.style.pointerEvents = isOpen ? 'none' : 'auto';
    }
}

navIcon.addEventListener('click', toggleMenu);

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navList.classList.contains('show')) toggleMenu();
    });
});


// Слайдер галереи
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.gallery-slider');
    if (!slider) return;

    const wrapper = slider.querySelector('.slides-wrapper');
    const slides = slider.querySelectorAll('.slide');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    const dotsContainer = slider.querySelector('.slider-dots');

    let currentIndex = 0;
    const totalSlides = slides.length;

    // Создаём точки
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    const dots = dotsContainer.querySelectorAll('.slider-dot');

    function goToSlide(index) {
        currentIndex = index;
        wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    }

    // Кнопки
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        goToSlide(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        goToSlide(currentIndex);
    });

    // Автопрокрутка
    let autoplayInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        goToSlide(currentIndex);
    }, 4000);

    // Пауза при наведении
    slider.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    slider.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            goToSlide(currentIndex);
        }, 4000);
    });

    // Поддержка свайпа на телефоне
    let startX = 0;
    wrapper.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    wrapper.addEventListener('touchend', e => {
        const endX = e.changedTouches[0].clientX;
        if (endX < startX - 50) {
            // свайп влево → следующий
            currentIndex = (currentIndex + 1) % totalSlides;
            goToSlide(currentIndex);
        } else if (endX > startX + 50) {
            // свайп вправо → предыдущий
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            goToSlide(currentIndex);
        }
    });
});