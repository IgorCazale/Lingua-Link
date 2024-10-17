let slideIndex = 0;
const slides = document.getElementsByClassName("carousel-item");
showSlides();

function showSlides() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; // Esconder todos os slides
    }
    slideIndex++;
    if (slideIndex >= slides.length) { slideIndex = 0; }
    slides[slideIndex].style.display = "block"; // Mostrar o slide atual
    setTimeout(showSlides, 5000); // Mudar de slide a cada 5 segundos
}

function changeSlide(n) {
    slideIndex += n;
    if (slideIndex < 0) { slideIndex = slides.length - 1; }
    if (slideIndex >= slides.length) { slideIndex = 0; }
    showSlides();
}
