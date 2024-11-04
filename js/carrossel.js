function switchTurma() {
    const carrossel3A = document.getElementById('carrossel3A');
    const carrossel3B = document.getElementById('carrossel3B');
    const serieCARROSSEL = document.getElementById('serieCARROSSEL');

    if (carrossel3A.style.display === "grid") {
        carrossel3A.style.display = "none";
        carrossel3B.style.display = "grid";

        serieCARROSSEL.textContent = '3ºB';
    } else {
        carrossel3A.style.display = "grid";
        carrossel3B.style.display = "none";

        serieCARROSSEL.textContent = '3ºA';
    }
}
