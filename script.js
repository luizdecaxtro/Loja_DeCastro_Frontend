// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Fade-in animation for products
const faders = document.querySelectorAll(".fade");
const appearOptions = {
    threshold: 0.3
};
const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// Form confirmation
document.getElementById("contactForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Mensagem enviada com sucesso! Obrigado pelo contato.");
    this.reset();
});
