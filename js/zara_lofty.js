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



document.addEventListener('DOMContentLoaded', () => {
    // 1. СПИСОК ФОТОГРАФИЙ (Для каждой собаки меняйте этот массив)
    const zaraPhotos = [
        '../asset/img/dog/ZaraLofty/ZaraLofty1.jpg',
        '../asset/img/dog/ZaraLofty/ZaraLofty2.jpg',
        '../asset/img/dog/ZaraLofty/ZaraLofty3.jpg',
        '../asset/img/dog/ZaraLofty/ZaraLofty4.jpg',
        '../asset/img/dog/ZaraLofty/ZaraLofty5.jpg',
        '../asset/img/dog/ZaraLofty/ZaraLofty6.jpg'
    ];

    const wrapper = document.getElementById('gallery-slides');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');

    if (!wrapper) return;

    let currentIndex = 0;

    // 2. ГЕНЕРАЦИЯ СЛАЙДОВ
    zaraPhotos.forEach((src, index) => {
        // Создаем слайд
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('slide');
        img.alt = `Zara Lofty photo ${index + 1}`;
        wrapper.appendChild(img);

        // Создаем точку
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // 3. ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ
    function goToSlide(index) {
        const totalSlides = zaraPhotos.length;
        // Зацикливание
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        currentIndex = index;
        wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Обновляем точки
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    // Кнопки управления
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    // Автопрокрутка (каждые 5 секунд)
    let autoPlay = setInterval(() => goToSlide(currentIndex + 1), 5000);

    // Остановка при наведении
    const sliderArea = document.querySelector('.gallery-slider');
    sliderArea.addEventListener('mouseenter', () => clearInterval(autoPlay));
    sliderArea.addEventListener('mouseleave', () => {
        autoPlay = setInterval(() => goToSlide(currentIndex + 1), 5000);
    });
});