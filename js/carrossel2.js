document.addEventListener("DOMContentLoaded", () => {
    const carouselContainer = document.querySelector(".caroussel-container");
    const cards = document.querySelectorAll(".card");
    let currentIndex = 0;
    let autoScrollInterval;

    const isDesktop = () => window.innerWidth >= 1280;
    const isMediumScreen = () => window.innerWidth >= 550 && window.innerWidth < 800;
    const isMobile = () => window.innerWidth < 550;

    // Referências para o texto Dia1 e Dia2
    const dayLabel = document.getElementById("dayLabel");

    function adjustCarousel() {
        if (isMediumScreen()) {
            setupThreeCards();
        } else if (isMobile()) {
            setupSingleCard();
        } else {
            stopAutoScroll(); // Desktop não precisa de rolagem automática
        }
    }

    function setupThreeCards() {
        stopAutoScroll();
        carouselContainer.scrollLeft = 0; // Restaura a posição inicial

        const controlsContainer = document.querySelector(".carousel-controls");
        if (controlsContainer) controlsContainer.remove();
    }

    function setupSingleCard() {
        startAutoScroll();
        createControls();
    }

    function createControls() {
        const controlsContainer = document.querySelector(".carousel-controls");
        if (controlsContainer) controlsContainer.remove();

        const controls = document.createElement("div");
        controls.className = "carousel-controls";

        const prevButton = document.createElement("button");
        prevButton.className = "arrow";
        prevButton.innerHTML = "←"; // Setinha para voltar
        prevButton.addEventListener("click", () => navigateCarousel(-1));

        const nextButton = document.createElement("button");
        nextButton.className = "arrow";
        nextButton.innerHTML = "→"; // Setinha para avançar
        nextButton.addEventListener("click", () => navigateCarousel(1));

        controls.appendChild(prevButton);
        controls.appendChild(nextButton);
        carouselContainer.parentElement.insertBefore(controls, carouselContainer.nextSibling);
    }

    function navigateCarousel(direction) {
        const cardWidth = carouselContainer.clientWidth;
        currentIndex = (currentIndex + direction + cards.length) % cards.length;

        const offset = currentIndex * cardWidth;
        carouselContainer.scrollTo({ left: offset, behavior: "smooth" });
    }

    function startAutoScroll() {
        stopAutoScroll();
        autoScrollInterval = setInterval(() => navigateCarousel(1), 15000); // 15 segundos
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // Alternar entre os grupos de imagens ao clicar no botão
    const toggleImagesBtn = document.getElementById("toggleImagesBtn");
    const imageGroups = [
        ['../images/day1-1.png', '../images/day1-2.png', '../images/day1-3.png', '../images/day1-4.png', '../images/day1-5.png', '../images/day1-6.png', '../images/day1-7.png'],
        ['../images/day2-1.png', '../images/day2-2.png', '../images/day2-3.png', '../images/day2-4.png', '../images/day2-5.png', '../images/day2-6.png', '../images/day2-7.png']
    ];
    let currentGroupIndex = 0;

    // Função para atualizar as imagens do grupo atual
    function updateImages() {
        const images = imageGroups[currentGroupIndex];
        cards.forEach((card, index) => {
            card.style.backgroundImage = `url(${images[index]})`;
            card.dataset.fullImage = images[index]; // Armazena o caminho completo da imagem para o modo tela cheia
        });
    }

    // Alternar os grupos de imagens e atualizar o texto do dia
    toggleImagesBtn.addEventListener("click", () => {
        currentGroupIndex = (currentGroupIndex + 1) % imageGroups.length;
        updateImages();

        // Atualizar o texto "Dia1" ou "Dia2"
        if (currentGroupIndex === 0) {
            dayLabel.textContent = "Dia 1";
        } else {
            dayLabel.textContent = "Dia 2";
        }
    });

    // Inicialize o grupo de imagens inicial
    updateImages();

    // Função para abrir a imagem em tela cheia
    function openFullscreen(imageSrc) {
        const fullscreenOverlay = document.getElementById("fullscreenOverlay");
        const fullscreenImage = document.getElementById("fullscreenImage");
        const header = document.querySelector(".header");

        fullscreenImage.src = imageSrc;
        fullscreenOverlay.classList.add("active");
        header.classList.add("fullscreen-hidden"); // Esconde o cabeçalho

        // Ajusta a imagem para o tamanho correto conforme a largura da tela
        if (window.innerWidth <= 550) {
            fullscreenImage.style.width = "100%";
            fullscreenImage.style.height = "auto";
        } else {
            fullscreenImage.style.width = "auto";
            fullscreenImage.style.height = "100%";
        }
    }

    // Função para fechar a visualização em tela cheia
    function closeFullscreenView() {
        const fullscreenOverlay = document.getElementById("fullscreenOverlay");
        const fullscreenImage = document.getElementById("fullscreenImage");
        const header = document.querySelector(".header");

        fullscreenOverlay.classList.remove("active");
        fullscreenImage.src = "";
        header.classList.remove("fullscreen-hidden"); // Restaura o cabeçalho
    }

    // Adiciona o evento de duplo clique para abrir a imagem em tela cheia
    cards.forEach(card => {
        card.addEventListener("dblclick", () => {
            const imageSrc = card.dataset.fullImage;
            openFullscreen(imageSrc);
        });
    });

    // Evento para fechar a visualização em tela cheia
    const closeFullscreen = document.getElementById("closeFullscreen");
    closeFullscreen.addEventListener("click", closeFullscreenView);

    // Fecha a visualização em tela cheia ao clicar fora da imagem
    const fullscreenOverlay = document.getElementById("fullscreenOverlay");
    fullscreenOverlay.addEventListener("click", (e) => {
        if (e.target === fullscreenOverlay) {
            closeFullscreenView();
        }
    });

    // Função para mostrar/ocultar os botões conforme a largura da tela
    function toggleNavButtons() {
        const prevBtn = document.getElementById("prevBtn");
        const nextBtn = document.getElementById("nextBtn");

        if (window.innerWidth <= 550) {
            prevBtn.style.display = "block";
            nextBtn.style.display = "block";
        } else {
            prevBtn.style.display = "none";
            nextBtn.style.display = "none";
        }
    }

    // Inicializa a exibição dos botões conforme o tamanho da tela
    toggleNavButtons();

    // Adiciona evento de redimensionamento da tela
    window.addEventListener("resize", toggleNavButtons);

    adjustCarousel();
    window.addEventListener("resize", adjustCarousel);
});