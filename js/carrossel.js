document.addEventListener("DOMContentLoaded", () => {
    const carouselContainer = document.querySelector(".caroussel-container");
    const cards = document.querySelectorAll(".card");
    const toggleButton = document.getElementById("toggleImagesBtn");
    const dayLabel = document.getElementById("dayLabel");
    let isDayTwo = false;

    // Criar o overlay no primeiro card
    const firstCard = cards[0];
    const instructionOverlay = document.createElement("div");
    instructionOverlay.className = "instruction-overlay";
    instructionOverlay.innerHTML = `
        <p>Clique nos cards para visualizar</p><br>
        <p>Clique duas vezes para ativar o modo de tela cheia</p>
    `;
    firstCard.appendChild(instructionOverlay);
    firstCard.classList.add("highlight");

    // Remover destaque e instruções após interação
    const removeInstructions = () => {
        if (instructionOverlay) {
            instructionOverlay.remove();
        }
        firstCard.classList.remove("highlight");
    };

    // Adicionar evento de clique em todos os cards
    cards.forEach(card => {
        card.addEventListener("click", removeInstructions);
    });

    // Função para atualizar os cards visíveis
    const updateVisibleCards = () => {
        const totalCards = isDayTwo ? 8 : 6;
        cards.forEach((card, index) => {
            card.style.display = index < totalCards ? "flex" : "none";
            // Adicionar ou remover a classe day2
            card.classList.toggle("day2", isDayTwo);
            card.classList.toggle("day1", !isDayTwo);
        });
    };

    // Alternar entre os dias
    toggleButton.addEventListener("change", () => {
        isDayTwo = toggleButton.checked;
        dayLabel.textContent = isDayTwo ? "Dia2" : "Dia1";
        updateVisibleCards();
    });

    // Ajuste inicial dos cards
    updateVisibleCards();

    // Ajuste do carrossel para diferentes tamanhos de tela
    const isDesktop = () => window.innerWidth >= 1280;
    const isMediumScreen = () => window.innerWidth >= 550 && window.innerWidth < 800;
    const isMobile = () => window.innerWidth < 550;

    function adjustCarousel() {
        if (isMediumScreen()) {
            setupThreeCards();
        } else if (isMobile()) {
            setupSingleCard();
        } else {
            stopAutoScroll();
        }
    }

    function setupThreeCards() {
        stopAutoScroll();
        carouselContainer.scrollLeft = 0;
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
        prevButton.innerHTML = "←";
        prevButton.addEventListener("click", () => navigateCarousel(-1));

        const nextButton = document.createElement("button");
        nextButton.className = "arrow";
        nextButton.innerHTML = "→";
        nextButton.addEventListener("click", () => navigateCarousel(1));

        controls.appendChild(prevButton);
        controls.appendChild(nextButton);
        document.querySelector(".carousel").appendChild(controls);
    }

    function navigateCarousel(direction) {
        const cardWidth = cards[0].offsetWidth + 0; // Inclui a margem
        carouselContainer.scrollBy({ left: cardWidth * direction, behavior: "smooth" });
    }

    let autoScrollInterval;

    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            navigateCarousel(1);
        }, 3000);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // Listener para ajustar o carrossel ao redimensionar a janela
    window.addEventListener("resize", adjustCarousel);

    // Ajuste inicial do carrossel
    adjustCarousel();
    
    // Função para abrir e fechar o fullscreen
    function openFullscreen(image) {
        const overlay = document.querySelector(".fullscreen-overlay");
        overlay.classList.add("active");
        const img = overlay.querySelector(".fullscreen-image");
        img.src = image.src;
    }

    function closeFullscreen() {
        const overlay = document.querySelector(".fullscreen-overlay");
        overlay.classList.remove("active");
    }

    // Abrir em fullscreen ao clicar duas vezes na imagem do card
    cards.forEach(card => {
        card.addEventListener("dblclick", () => {
            const image = card.querySelector("img");
            if (image) openFullscreen(image);
        });
    });

    // Fechar fullscreen
    document.querySelector(".close-fullscreen").addEventListener("click", closeFullscreen);
});