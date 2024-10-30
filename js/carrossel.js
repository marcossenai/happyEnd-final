let currentSlide = 0;
let totalSlides = document.querySelectorAll('.carousel-slide').length;
let carousel = document.querySelector('.carousel');
let slideCounter = document.getElementById('slide-counter');
let showing3A = true;

// Atualiza o contador de slides
function updateCounter() {
    slideCounter.textContent = `${currentSlide + 1}/${totalSlides}`;
}

// Função para mover o carrossel e destacar os slides adjacentes
function showSlide(index) {
    if (index >= totalSlides) currentSlide = 0;
    if (index < 0) currentSlide = totalSlides - 1;

    // Centraliza o slide ativo
    const offset = currentSlide * -60 + 5; // Ajuste para acomodar a nova largura
    carousel.style.transform = `translateX(${offset}%)`;

    // Remove classes ativas de todos os slides
    document.querySelectorAll('.carousel-slide').forEach(slide => {
        slide.classList.remove('active', 'prev', 'next');
    });

    // Adiciona classes para o slide atual e os adjacentes
    const slides = document.querySelectorAll('.carousel-slide');
    slides[currentSlide].classList.add('active');
    if (slides[currentSlide - 1]) slides[currentSlide - 1].classList.add('prev');
    if (slides[currentSlide + 1]) slides[currentSlide + 1].classList.add('next');

    updateCounter();
}

// Botões de navegação
document.getElementById('nextBtn').addEventListener('click', () => {
    currentSlide++;
    showSlide(currentSlide);
});

document.getElementById('prevBtn').addEventListener('click', () => {
    currentSlide--;
    showSlide(currentSlide);
});

// Alternar entre as imagens do 3A e 3B
document.getElementById('switchBtn').addEventListener('click', () => {
    const carouselContainer = document.querySelector('.carousel');
    carouselContainer.innerHTML = ''; // Limpar slides atuais

    if (showing3A) {
        // Alternando para o 3B
        const images3B = [
            '../images/img1-3B.jpg',
            '../images/img2-3B.jpg',
            '../images/img3-3B.jpg',
            '../images/img4-3B.jpg',
            '../images/img5-3B.jpg',
            '../images/img6-3B.jpg',
            '../images/img7-3B.jpg'
        ];

        images3B.forEach((src, index) => {
            const slideDiv = document.createElement('div');
            slideDiv.classList.add('carousel-slide');
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Projeto 3B - ${index + 1}`;
            slideDiv.appendChild(img);
            carouselContainer.appendChild(slideDiv);
        });

        totalSlides = images3B.length;
        document.getElementById('switchBtn').textContent = "Mudar para 3A";
        showing3A = false;
    } else {
        // Voltando para o 3A
        const images3A = [
            '../images/img1-3A.jpg',
            '../images/img2-3A.jpg',
            '../images/img3-3A.jpg',
            '../images/img4-3A.jpg',
            '../images/img5-3A.jpg',
            '../images/img6-3A.jpg',
            '../images/img7-3A.jpg'
        ];

        images3A.forEach((src, index) => {
            const slideDiv = document.createElement('div');
            slideDiv.classList.add('carousel-slide');
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Projeto 3A - ${index + 1}`;
            slideDiv.appendChild(img);
            carouselContainer.appendChild(slideDiv);
        });

        totalSlides = images3A.length;
        document.getElementById('switchBtn').textContent = "Mudar para 3B";
        showing3A = true;
    }

    // Reiniciar o slide após a troca
    currentSlide = 0;
    showSlide(currentSlide);
});


// Inicializar o carrossel
showSlide(currentSlide);
