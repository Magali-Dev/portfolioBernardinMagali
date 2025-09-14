  // Menu burger corrigé
        document.addEventListener('DOMContentLoaded', () => {
            const burger = document.querySelector('.bouton-menu');
            const menu = document.querySelector('.liens-navigation');
            
            burger.addEventListener('click', () => {
                const isExpanded = burger.getAttribute('aria-expanded') === 'true';
                burger.setAttribute('aria-expanded', !isExpanded);
                
                // Basculer la visibilité du menu
                if (!isExpanded) {
                    menu.style.display = 'flex';
                    setTimeout(() => {
                        menu.setAttribute('data-visible', 'true');
                    }, 10);
                } else {
                    menu.setAttribute('data-visible', 'false');
                    setTimeout(() => {
                        menu.style.display = 'none';
                    }, 300);
                }
            });
            
            // Masquer le menu au chargement sur mobile
            if (window.innerWidth <= 768) {
                menu.style.display = 'none';
            }
        });// Effet fade-in au scroll
const sections = document.querySelectorAll('.section-a-propos');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => {
  section.classList.add('hidden'); // état initial
  observer.observe(section);
});

// Animation machine à écrire sur le titre
function typeWriter(element, text, speed = 80) {
  let i = 0;
  function typing() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}

document.addEventListener("DOMContentLoaded", () => {
  const titre = document.querySelector(".titre-hero-a-propos");
  if (titre) {
    const texte = titre.textContent;
    titre.textContent = "";
    typeWriter(titre, texte);
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
