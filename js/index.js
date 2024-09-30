// compartilhamento
document.getElementById("shareButton").addEventListener("click", function () {
    let linkSite = window.location.href;
    navigator.clipboard.writeText(linkSite);
    // Verifica se a API de compartilhamento está disponível no navegador
    if (navigator.share) {
        navigator.share({
            title: 'O Último Projeto',
            text: 'Presencie o último projeto da primeira turma SENAI - Ferraz de Vasconcelos',
            url: window.location.href // URL atual do site
        });
    } else {
        alert('A API de compartilhamento não é suportada neste dispositivo.');
    }
});





// iniciar video Saiba Mais
document.getElementById('btnSaibaMais').addEventListener('click', function (e) {
    const iframe = document.getElementById('youtubeVideo');

    const videoSrc = iframe.src + "&autoplay=1";
    iframe.src = videoSrc;
});





// copiar endereço
document.getElementById("copyAdress").addEventListener("click", function () {
    let endereco = "SESI - Ferraz de Vasconcelos, R. Francisco A Zeiler, 20 - Jardim Juliana, Ferraz de Vasconcelos - SP, 08502-310";
    navigator.clipboard.writeText(endereco);
});





// Carrossel 
// variaveis 
var currentIndex = 0;
let slides = document.querySelectorAll(".slide");
let next = document.querySelector('.next')
let prev = document.querySelector('.prev')
let totalSlides = slides.length;
let pause = false



// Função para atualizar as classes dos slides
function updateSlides() {
    slides.forEach((slide, index) => {
        slide.style.transform = 'translateX(0)'; // Colocar todos os slides à direita
        slide.classList.remove('active', 'prev', 'next', 'out');

        if (index === currentIndex) { //active
            
            slide.style.transform = 'translateX(0)';
            slide.classList.add('active')

        } else if (index === (currentIndex - 1 + totalSlides) % totalSlides) { //prev
            
            slide.style.transform = 'translateX(-90%)';
            slide.classList.add('prev')

        } else if (index === (currentIndex + 1) % totalSlides) { //next
            
            slide.style.transform = 'translateX(90%)';
            slide.classList.add('next')

        }
        else { //out
            slide.classList.add('out');
            slide.style.transform = 'translateX(0)';
        }
    });
}

// Função para mover para a direita
function moveRight() {
    currentIndex = (currentIndex + 1) % totalSlides; // Atualiza o índice
    updateSlides(); // Atualiza os slides
}

// Função para mover para a esquerda
function moveLeft() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Atualiza o índice
    updateSlides(); // Atualiza os slides
}

// Inicializa a apresentação de slides
updateSlides(); // Chamada inicial para configurar as classes corretas


const interval = setInterval(() => {
    if (!pause) {
        moveRight();
    }
}, 5000);