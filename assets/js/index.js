// assets/js/index.js

document.addEventListener('DOMContentLoaded', function() {
  const boutonMenu = document.querySelector('.bouton-menu');
  const liensNavigation = document.querySelector('.liens-navigation');
  const body = document.body;

  if (boutonMenu && liensNavigation) {
    function toggleMenu() {
      const estOuvert = boutonMenu.getAttribute('aria-expanded') === 'true';
      boutonMenu.setAttribute('aria-expanded', !estOuvert);
      liensNavigation.setAttribute('data-visible', !estOuvert);
      body.classList.toggle('menu-ouvert', !estOuvert);
    }

    boutonMenu.addEventListener('click', toggleMenu);

    const liens = document.querySelectorAll('.liens-navigation a');
    liens.forEach(lien => {
      lien.addEventListener('click', () => {
        boutonMenu.setAttribute('aria-expanded', 'false');
        liensNavigation.setAttribute('data-visible', 'false');
        body.classList.remove('menu-ouvert');
      });
    });

    document.addEventListener('click', (e) => {
      if (!liensNavigation.contains(e.target) && !boutonMenu.contains(e.target) &&
          liensNavigation.getAttribute('data-visible') === 'true') {
        toggleMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && liensNavigation.getAttribute('data-visible') === 'true') {
        toggleMenu();
        boutonMenu.focus();
      }
    });
  }

  const logo = document.querySelector('.logo img');
  if (logo) {
    logo.addEventListener('click', function(e) {
      e.preventDefault();
      this.style.transition = 'transform 1s ease';
      this.style.transform = 'rotate(360deg)';
      setTimeout(() => {
        this.style.transition = '';
        this.style.transform = '';
        window.location.href = 'index.html';
      }, 1000);
    });

    let dernierDefilement = window.scrollY;
    window.addEventListener('scroll', function() {
      const delta = window.scrollY - dernierDefilement;
      if (Math.abs(delta) > 50) {
        logo.style.transition = 'transform 0.5s ease';
        logo.style.transform = `rotate(${delta > 0 ? 15 : -15}deg)`;
        setTimeout(() => { logo.style.transform = 'rotate(0deg)'; }, 500);
        dernierDefilement = window.scrollY;
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const titre = document.querySelector('.titre-hero');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // première étape : rotation
        titre.classList.add('flip');

        setTimeout(() => {
          // changer le texte au milieu de la rotation
          titre.textContent = "Portfolio";
          titre.classList.remove('flip');
        }, 5000); // 400ms pour être au milieu de l'animation

        observer.unobserve(titre);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(titre);
});
window.addEventListener("scroll", function () {
  const header = document.querySelector(".en-tete");
  
  if (window.scrollY > 50) { 
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
