document.addEventListener("DOMContentLoaded", () => {
    const carouselContainer = document.querySelector(".caroussel-container");
    const cards = document.querySelectorAll(".card");
    let currentIndex = 0;
    let autoScrollInterval;

    const isDesktop = () => window.innerWidth >= 1280;
    const isMediumScreen = () => window.innerWidth >= 550 && window.innerWidth < 800;
    const isMobile = () => window.innerWidth < 550;

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

    adjustCarousel();
    window.addEventListener("resize", adjustCarousel);
});