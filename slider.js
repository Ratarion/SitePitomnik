document.addEventListener('DOMContentLoaded', () => {
    // Находим основные элементы слайдера
    const wrapper = document.querySelector('.champions-wrapper');
    const slides = document.querySelectorAll('.champion-card');
    const prevBtn = document.querySelector('.champion-prev');
    const nextBtn = document.querySelector('.champion-next');
    const dotsContainer = document.querySelector('.champion-dots');

    // Если на странице нет слайдера, прерываем выполнение скрипта
    if (!wrapper || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    let dots = [];

    // 1. Динамически создаем точки пагинации
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        // Делаем первую точку активной по умолчанию
        if (index === 0) dot.classList.add('active');
        
        // Добавляем обработчик клика на каждую точку
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        
        dotsContainer.appendChild(dot);
        dots.push(dot);
    });

    // 2. Основная функция для переключения слайдов
    function goToSlide(index) {
        currentIndex = index;
        // Сдвигаем обертку на 100% ширины слайда * индекс
        wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
    }

    // 3. Функция обновления визуального состояния точек
    function updateDots() {
        dots.forEach((dot, index) => {
            // Если индекс точки совпадает с текущим слайдом, добавляем класс active, иначе убираем
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // 4. Обработчики кликов по стрелкам (с зацикливанием)
    nextBtn.addEventListener('click', () => {
        // Остаток от деления позволяет вернуться к 0, если мы на последнем слайде
        let nextIndex = (currentIndex + 1) % totalSlides;
        goToSlide(nextIndex);
    });

    prevBtn.addEventListener('click', () => {
        // Прибавляем totalSlides, чтобы избежать отрицательных чисел при уходе влево от первого слайда
        let prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        goToSlide(prevIndex);
    });

    // 5. Поддержка свайпов на мобильных устройствах (Touch события)
    let touchStartX = 0;
    let touchEndX = 0;

    wrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    wrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50; // Минимальная длина свайпа в пикселях
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Свайп влево -> следующий слайд
                nextBtn.click();
            } else {
                // Свайп вправо -> предыдущий слайд
                prevBtn.click();
            }
        }
    }
});