let currentSlide = 0;
let totalSlides = document.querySelectorAll('.carousel-slide').length;
let carousel = document.querySelector('.carousel');
let slideCounter = document.getElementById('slide-counter');
let showing3A = true; // Estado para controlar entre 3A e 3B

// Função para atualizar o contador de slides
function updateCounter() {
    slideCounter.textContent = `${currentSlide + 1}/${totalSlides}`;
}

// Função para mover o carrossel para o slide atual
function showSlide(index) {
    if (index >= totalSlides) currentSlide = 0;
    if (index < 0) currentSlide = totalSlides - 1;
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
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

// Swipe usando eventos touch
let startX = 0;

carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

carousel.addEventListener('touchmove', (e) => {
    let moveX = e.touches[0].clientX;
    if (startX - moveX > 50) {
        currentSlide++;
        showSlide(currentSlide);
        startX = moveX;
    } else if (startX - moveX < -50) {
        currentSlide--;
        showSlide(currentSlide);
        startX = moveX;
    }
});

// Função para alternar entre as imagens do 3A e 3B
document.getElementById('switchBtn').addEventListener('click', () => {
    const carouselContainer = document.querySelector('.carousel');
    carouselContainer.innerHTML = ''; // Limpar slides atuais

    if (showing3A) {
        // Alternando para o 3B
        const images3B = [
            '../images/img1-3B.jpg',
            '../images/img2-3B.jpg',
            '../images/img3-3B.jpg'
            // Adicionar mais imagens do 3B conforme necessário
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
        document.getElementById('switchBtn').textContent = "Mudar para 3A"; // Atualiza o botão
        showing3A = false;
    } else {
        // Voltando para o 3A
        const images3A = [
            '../images/img1-3A.jpg',
            '../images/img2-3A.jpg',
            '../images/img3-3A.jpg'
            // Adicionar mais imagens do 3A conforme necessário
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
        document.getElementById('switchBtn').textContent = "Mudar para 3B"; // Atualiza o botão
        showing3A = true;
    }

    // Reiniciar o slide após a troca
    currentSlide = 0;
    showSlide(currentSlide);
});

// Inicializar o carrossel
showSlide(currentSlide);
