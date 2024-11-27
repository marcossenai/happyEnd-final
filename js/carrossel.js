document.addEventListener("DOMContentLoaded", () => {
    const carouselContainer = document.querySelector(".caroussel-container");
    const cards = document.querySelectorAll(".card");
    const toggleButton = document.getElementById("toggleImagesBtn");
    const dayLabel = document.getElementById("dayLabel");
    let isDayTwo = false;

    const carrousselIdBase = document.getElementById("carrousselIdBase");

    const updateVisibleCards = () => {
        const totalCards = isDayTwo ? 8 : 6;

        if (carrousselIdBase) {
            if (isDayTwo && window.innerWidth > 550) {
                carrousselIdBase.style.width = "110%";
            } else {
                carrousselIdBase.style.width = "90%";
            }
        }

        cards.forEach((card, index) => {
            card.style.display = index < totalCards ? "flex" : "none";
            card.classList.toggle("day2", isDayTwo);
            card.classList.toggle("day1", !isDayTwo);
        });
    };

    updateVisibleCards();

    window.addEventListener("resize", updateVisibleCards);

    toggleButton.addEventListener("change", () => {
        isDayTwo = toggleButton.checked;
        dayLabel.textContent = isDayTwo ? "Dia2" : "Dia1";
        updateVisibleCards();

        const isDesktopMode = window.innerWidth >= 1280;
        if (isDesktopMode && isDayTwo) {
            carouselContainer.classList.add("dia2-style");
        } else {
            carouselContainer.classList.remove("dia2-style");
        }
    });

    const isDesktop = () => window.innerWidth >= 1280;
    const isMediumScreen = () => window.innerWidth >= 550 && window.innerWidth < 800;
    const isMobile = () => window.innerWidth < 550;

    function adjustCarousel() {
        if (isMediumScreen()) {
            setupThreeCards();
        } else if (isMobile()) {
            setupSingleCard();
        }
    }

    function setupThreeCards() {
        carouselContainer.scrollLeft = 0;
        const controlsContainer = document.querySelector(".carousel-controls");
        if (controlsContainer) controlsContainer.remove();
    }

    function setupSingleCard() {
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
        const cardWidth = cards[0].offsetWidth;
        const totalCards = isDayTwo ? 8 : 6;

        // Identificar o índice atual do primeiro card visível
        let visibleIndex = Math.round(carouselContainer.scrollLeft / cardWidth);

        if (direction === 1) { // Next button
            visibleIndex = visibleIndex >= totalCards - 1 ? 0 : visibleIndex + 1;
        } else { // Prev button
            visibleIndex = visibleIndex <= 0 ? totalCards - 1 : visibleIndex - 1;
        }

        // Mover o carrossel para o índice calculado
        carouselContainer.scrollTo({ left: visibleIndex * cardWidth, behavior: "smooth" });
    }

    window.addEventListener("resize", adjustCarousel);

    adjustCarousel();

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

    cards.forEach(card => {
        card.addEventListener("dblclick", () => {
            const image = card.querySelector("img");
            if (image) openFullscreen(image);
        });
    });

    document.querySelector(".close-fullscreen").addEventListener("click", closeFullscreen);
});