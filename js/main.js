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


// Слайдер litters
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.litters-slider');
    if (!slider) return;

    const wrapper = slider.querySelector('.litters-wrapper');
    const cards = slider.querySelectorAll('.producer-card');
    const prevBtn = slider.querySelector('.litter-prev');
    const nextBtn = slider.querySelector('.litter-next');
    const dotsContainer = slider.querySelector('.litter-dots');

    let currentIndex = 0;
    const total = cards.length;

    // Создаём точки
    dotsContainer.innerHTML = '';
    for (let i = 0; i < total; i++) {
        const dot = document.createElement('div');
        dot.classList.add('litter-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    const dots = dotsContainer.querySelectorAll('.litter-dot');

    function goToSlide(index) {
        currentIndex = (index + total) % total;
        wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    }

    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    // Автопрокрутка
    let autoInterval = setInterval(() => goToSlide(currentIndex + 1), 5000);

    slider.addEventListener('mouseenter', () => clearInterval(autoInterval));
    slider.addEventListener('mouseleave', () => {
        autoInterval = setInterval(() => goToSlide(currentIndex + 1), 5000);
    });

    // Инициализация
    goToSlide(0);
});

// Слайдер champion
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.champions-slider');
    if (!slider) return;

    const wrapper = slider.querySelector('.champions-wrapper');
    const cards = slider.querySelectorAll('.champion-card');
    const prevBtn = slider.querySelector('.champion-prev');
    const nextBtn = slider.querySelector('.champion-next');
    const dotsContainer = slider.querySelector('.champion-dots');

    let currentIndex = 0;
    const total = cards.length;
    if (total === 0) return;

    // Создаём точки
    dotsContainer.innerHTML = '';
    for (let i = 0; i < total; i++) {
        const dot = document.createElement('div');
        dot.classList.add('champion-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    const dots = dotsContainer.querySelectorAll('.champion-dot');

    function goToSlide(index) {
        currentIndex = (index + total) % total;
        wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    }

    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    // Автопрокрутка
    let autoInterval = setInterval(() => goToSlide(currentIndex + 1), 5000);

    slider.addEventListener('mouseenter', () => clearInterval(autoInterval));
    slider.addEventListener('mouseleave', () => {
        autoInterval = setInterval(() => goToSlide(currentIndex + 1), 5000);
    });

    goToSlide(0);
});



// Падающие звёздочки в Hero
function createFallingStars() {
    const container = document.querySelector('.stars-container');
    if (!container) return;

    const starCount = 45;   // количество звёзд

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.textContent = '✦';           // красивая звёздочка

        // Случайное положение и задержка
        const left = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = 12 + Math.random() * 18;   // от 12 до 30 секунд

        star.style.left = `${left}vw`;
        star.style.animationDelay = `-${delay}s`;
        star.style.animationDuration = `${duration}s`;

        container.appendChild(star);
    }
}

// Запускаем после загрузки
document.addEventListener('DOMContentLoaded', createFallingStars);