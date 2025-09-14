document.addEventListener("DOMContentLoaded", () => {
  // --- Menu burger ---
  const boutonMenu = document.querySelector(".bouton-menu");
  const menu = document.querySelector(".liens-navigation");

  if (boutonMenu && menu) {
    boutonMenu.addEventListener("click", () => {
      const isExpanded = boutonMenu.getAttribute("aria-expanded") === "true";
      boutonMenu.setAttribute("aria-expanded", !isExpanded);
      menu.setAttribute("data-visible", !isExpanded);
    });
  }

  // --- Formulaire Formspree ---
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (form && status) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = 'Envoi en cours...';
      submitButton.disabled = true;

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          status.textContent = "Merci pour votre message ! Je vous répondrai dès que possible.";
          status.className = 'success';
          form.reset();
        } else {
          throw new Error();
        }
      } catch (error) {
        status.textContent = "Oups ! Une erreur s'est produite. Veuillez réessayer ou me contacter directement par email.";
        status.className = 'error';
      } finally {
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        setTimeout(() => { status.style.display = 'none'; }, 5000);
      }
    });
  }

  // --- Messenger ---
  const messengerInterface = document.querySelector('.messenger-interface');
  const typingIndicator = document.querySelector('.typing-indicator');

  function showMessage(message) {
    if (!messengerInterface || !typingIndicator) return;

    const newBubble = document.createElement('div');
    newBubble.className = 'message-bubble';
    newBubble.innerHTML = `<p>${message}</p>`;
    messengerInterface.insertBefore(newBubble, typingIndicator);

    setTimeout(() => {
      const responseBubble = document.createElement('div');
      responseBubble.className = 'message-bubble';

      if (message.includes('projet')) {
        responseBubble.innerHTML = '<p>Super ! Parlons davantage de votre projet. Pourriez-vous m’envoyer plus de détails par email à l’adresse magali.bernardin.tech@gmail.com</p>';
      } else if (message.includes('compétences')) {
        responseBubble.innerHTML = '<p>Développeuse full-stack sur la stack Symfony / PHP / JavaScript / React, je conçois et réalise des applications web complètes et performantes. Que souhaitez-vous savoir précisément ?</p>';
      } else if (message.includes('collaborer')) {
        responseBubble.innerHTML = '<p>Je suis ouverte aux nouvelles opportunités ! Envoyez-moi un email à magali.bernardin.tech@gmail.com et discutons-en.</p>';
      } else {
        responseBubble.innerHTML = '<p>Pour toute autre demande, n’hésitez pas à m’envoyer un email à magali.bernardin.tech@gmail.com afin que nous puissions en discuter.</p>';
      }

      messengerInterface.insertBefore(responseBubble, typingIndicator);
      responseBubble.scrollIntoView({ behavior: 'smooth' });
    }, 1500);
  }

  if (typingIndicator) {
    let isTypingVisible = true;
    setInterval(() => {
      isTypingVisible = !isTypingVisible;
      typingIndicator.style.opacity = isTypingVisible ? '1' : '0.5';
    }, 1000);
  }

  window.showMessage = showMessage;

  // --- Effet machine à écrire + zoom titre ---
  const titre = document.getElementById('titre-contact');
  if (titre) {
    const texteOriginal = titre.textContent;
    titre.textContent = '';
    let i = 0;
    const vitesse = 100;

    function machine() {
      if (i < texteOriginal.length) {
        titre.textContent += texteOriginal[i];
        i++;
        setTimeout(machine, vitesse);
      } else {
        startZoom();
      }
    }
    machine();

    function startZoom() {
      setInterval(() => {
        titre.classList.add('zoom');
        setTimeout(() => titre.classList.remove('zoom'), 300);
      }, 3000);
    }
  }
});

// --- Scroll header ---
window.addEventListener("scroll", function () {
  const header = document.querySelector(".en-tete");
  if (window.scrollY > 50) { 
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// --- Réinitialisation messenger ---
const closeBtn = document.getElementById('close-messenger');
const messengerInterface = document.querySelector('.messenger-interface');

closeBtn.addEventListener('click', () => {
  const messageBubbles = messengerInterface.querySelectorAll('.message-bubble');
  messageBubbles.forEach((bubble, index) => {
    if (index !== 0) bubble.remove();
  });

  const typingIndicator = messengerInterface.querySelector('.typing-indicator');
  if (typingIndicator) typingIndicator.style.display = 'flex';

  const contactOptions = messengerInterface.querySelector('.contact-options');
  if (contactOptions) contactOptions.style.display = 'flex';
});
