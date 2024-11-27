document.addEventListener("DOMContentLoaded", () => {
    const carouselContainer = document.querySelector(".caroussel-container");
    const cards = document.querySelectorAll(".card");
    let currentIndex = 0;

    const isDesktop = () => window.innerWidth >= 1280;
    const isMediumScreen = () => window.innerWidth >= 550 && window.innerWidth < 800;
    const isMobile = () => window.innerWidth < 550;

    const dayLabel = document.getElementById("dayLabel");

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
        carouselContainer.parentElement.insertBefore(controls, carouselContainer.nextSibling);
    }

    function navigateCarousel(direction) {
        const cardWidth = cards[0].offsetWidth; 
        currentIndex = (currentIndex + direction + cards.length) % cards.length;

        const offset = currentIndex * cardWidth;
        carouselContainer.scrollTo({ left: offset, behavior: "smooth" });
    }

    const toggleImagesBtn = document.getElementById("toggleImagesBtn");
    const imageGroups = [
        ['../images/day1-1.png', '../images/day1-2.png', '../images/day1-3.png', '../images/day1-4.png', '../images/day1-5.png', '../images/day1-6.png'],
        ['../images/day1-7.png', '../images/day2-1.png', '../images/day2-2.png', '../images/day2-3.png', '../images/day2-4.png', '../images/day2-5.png', '../images/day2-6.png', '../images/day2-7.png']
    ];
    let currentGroupIndex = 0;

    function updateImages() {
        const images = imageGroups[currentGroupIndex];
        cards.forEach((card, index) => {
            card.style.backgroundImage = `url(${images[index]})`;
            card.dataset.fullImage = images[index];
        });
    }

    toggleImagesBtn.addEventListener("click", () => {
        currentGroupIndex = (currentGroupIndex + 1) % imageGroups.length;
        updateImages();

        if (currentGroupIndex === 0) {
            dayLabel.textContent = "Dia 1";
        } else {
            dayLabel.textContent = "Dia 2";
        }
    });

    updateImages();

    function openFullscreen(imageSrc) {
        const fullscreenOverlay = document.getElementById("fullscreenOverlay");
        const fullscreenImage = document.getElementById("fullscreenImage");
        const header = document.querySelector(".header");

        fullscreenImage.src = imageSrc;
        fullscreenOverlay.classList.add("active");
        header.classList.add("fullscreen-hidden"); 

        if (window.innerWidth <= 550) {
            fullscreenImage.style.width = "100%";
            fullscreenImage.style.height = "auto";
        } else {
            fullscreenImage.style.width = "auto";
            fullscreenImage.style.height = "100%";
        }
    }

    function closeFullscreenView() {
        const fullscreenOverlay = document.getElementById("fullscreenOverlay");
        const fullscreenImage = document.getElementById("fullscreenImage");
        const header = document.querySelector(".header");

        fullscreenOverlay.classList.remove("active");
        fullscreenImage.src = "";
        header.classList.remove("fullscreen-hidden"); 
    }

    cards.forEach(card => {
        card.addEventListener("dblclick", () => {
            const imageSrc = card.dataset.fullImage;
            openFullscreen(imageSrc);
        });
    });

    const closeFullscreen = document.getElementById("closeFullscreen");
    closeFullscreen.addEventListener("click", closeFullscreenView);

    const fullscreenOverlay = document.getElementById("fullscreenOverlay");
    fullscreenOverlay.addEventListener("click", (e) => {
        if (e.target === fullscreenOverlay) {
            closeFullscreenView();
        }
    });

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

    toggleNavButtons();
    window.addEventListener("resize", toggleNavButtons);

    adjustCarousel();
    window.addEventListener("resize", adjustCarousel);
});