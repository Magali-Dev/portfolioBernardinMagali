document.addEventListener("DOMContentLoaded", () => {
    const boutonMenu = document.querySelector(".bouton-menu");
    const menu = document.querySelector(".liens-navigation");

    if(boutonMenu && menu){
        boutonMenu.addEventListener("click", () => {
            const isExpanded = boutonMenu.getAttribute("aria-expanded") === "true";
            boutonMenu.setAttribute("aria-expanded", !isExpanded);
            menu.setAttribute("data-visible", !isExpanded);
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
  const titre = document.querySelector('.titre-anim');

  if (titre) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          titre.classList.add('visible'); // ajoute la classe pour l'animation
          observer.unobserve(titre);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(titre);
  }
});
window.addEventListener("scroll", function () {
  const header = document.querySelector(".en-tete");
  
  if (window.scrollY > 50) { 
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});


