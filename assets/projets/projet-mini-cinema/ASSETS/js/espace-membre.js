
document.addEventListener('DOMContentLoaded', () => {
  const boutonDecon = document.getElementById('decon');
  if (boutonDecon) {
    boutonDecon.addEventListener('click', (e) => {
      e.preventDefault(); 
      localStorage.removeItem('utilisateurConnecté');
      window.location.href = '../../index.html'; 
    });
  }
});
// supprimer des elements
document.addEventListener('DOMContentLoaded', () => {
  const boutonSup = document.getElementById('sup');
  if (boutonSup) {
    boutonSup.addEventListener('click', (e) => {
      e.preventDefault(); 
      localStorage.removeItem('utilisateurConnecté');
      localStorage.removeItem('reservations');
      localStorage.removeItem('achats');
      window.location.href = '../../index.html'; 
    });
  }
});

// personnaliser la page espace membre avec le nom de l'utilisateur 
document.addEventListener('DOMContentLoaded', () => {
  const motNom = document.getElementById('motNom');
  const utilisateurJSON = localStorage.getItem('utilisateurConnecté');

  if (!utilisateurJSON) {
    motNom.textContent = 'Invité';
    window.location.href = 'connexion.html';
    return;
  }

  const utilisateur = JSON.parse(utilisateurJSON);
  if (utilisateur && utilisateur.nom) {
    motNom.textContent = utilisateur.nom;
  } else {
    motNom.textContent = 'Invité';
    window.location.href = 'connexion.html';
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////
// Récupérer le prix unitaire depuis le localStorage ou définir une valeur par défaut
let prixUnitaire = parseFloat(localStorage.getItem('prixUnitaireGlobal')) || 12;
function mettreAJourPrixUnitaire(nouveauPrix) {
  prixUnitaire = nouveauPrix;
  localStorage.setItem('prixUnitaireGlobal', prixUnitaire);
  recalculerTotauxReservations();
  recalculerTotauxAchats();
  afficher();
}


// Fonction pour recalculer les totaux des réservations
function recalculerTotauxReservations() {
  let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
  reservations.forEach(reservation => {
    reservation.total = reservation.quantite * prixUnitaire;
  });
  localStorage.setItem('reservations', JSON.stringify(reservations));
  afficherReservations();
}

// Fonction pour recalculer les totaux des achats
function recalculerTotauxAchats() {
  let achats = JSON.parse(localStorage.getItem('achats')) || [];
  achats.forEach(achat => {
    achat.total = achat.quantite * prixUnitaire;
  });
  localStorage.setItem('achats', JSON.stringify(achats));
  afficherAchats();
}


const container = document.getElementById('reservations');
const containerAchat = document.getElementById('achat');

// Chargement des données depuis le localStorage
let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
let achats = JSON.parse(localStorage.getItem('achats')) || [];

// Fonction pour afficher les réservations et les achats
function afficher() {
  container.innerHTML = '';
  containerAchat.innerHTML = '';
  if (reservations.length === 0) {
    container.textContent = "Aucune réservation en cours.";
  } else {
    reservations.forEach((r, i) => {
      const conteneur = document.createElement('div');
      conteneur.classList.add("conteneurReservation");

      const imagePath = r.image ? `../images/${r.image}` : '../images/default.jpg';

      conteneur.innerHTML = `
        <img src="${imagePath}" alt="${r.titre}" class="image-reservation">
        <strong>${r.titre}</strong><br>
        Quantité : <input type="number" value="${r.quantite}" min="1" data-i="${i}">
        | Total : <span>${r.total.toFixed(2)} €</span>
        <button data-pay="${i}">Payer &#128179;</button>
        <button data-del="${i}">Supprimer &#128465;</button>
        <hr>
      `;

      container.appendChild(conteneur);
    });
  }

  // Affichage des achats
  if (achats.length === 0) {
    containerAchat.textContent = "Aucun achat effectué.";
  } else {
    achats.forEach(r => {
      const div = document.createElement('div');
      div.classList.add('conteneurAchat');

      const img = document.createElement('img');
      img.src = r.image ? `../images/${r.image}` : '../images/coeur +.png';
      img.alt = r.titre;
      img.classList.add('image-achat');
      img.onerror = () => {
        img.onerror = null;
        img.src = '../images/coeur +.png';
      };
      div.appendChild(img);

      const info = document.createElement('div');
      info.innerHTML = `
        <strong>${r.titre}</strong><br>
        Quantité : ${r.quantite}<br>
        Total : ${r.total.toFixed(2)} €
      `;

      div.appendChild(info);
      containerAchat.appendChild(div);
    });
  }
  attacherBoutons();
}


// Fonction pour attacher les événements aux boutons

  function attacherBoutons() {
  // Boutons de paiement
  document.querySelectorAll('button[data-pay]').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = parseInt(btn.dataset.pay);
      const reservation = reservations[i];
      achats.push(reservation);
      localStorage.setItem('achats', JSON.stringify(achats));
      reservations.splice(i, 1);
      localStorage.setItem('reservations', JSON.stringify(reservations));
      afficher();
    });
  });

  // Boutons de suppression
  document.querySelectorAll('button[data-del]').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = parseInt(btn.dataset.del);
      reservations.splice(i, 1);
      localStorage.setItem('reservations', JSON.stringify(reservations));
      afficher();
    });
  });

  // Modification de la quantité
  document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', e => {
      const i = parseInt(e.target.dataset.i);
      const q = parseInt(e.target.value);
      if (q > 0) {
        const prixU = reservations[i].total / reservations[i].quantite;
        reservations[i].quantite = q;
        reservations[i].total = q * prixU;
        localStorage.setItem('reservations', JSON.stringify(reservations));
        afficher();
      }
    });
  });
}


  // Boutons de suppression
  document.querySelectorAll('button[data-del]').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = btn.dataset.del;
      reservations.splice(i, 1);
      localStorage.setItem('reservations', JSON.stringify(reservations));
      afficher();
    });
  });

  // Modification de la quantité
  document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', e => {
      const i = e.target.dataset.i;
      const q = parseInt(e.target.value);
      if (q > 0) {
        const prixU = reservations[i].total / reservations[i].quantite;
        reservations[i].quantite = q;
        reservations[i].total = q * prixU;
        localStorage.setItem('reservations', JSON.stringify(reservations));
        afficher();
      }
    });
  });


// Fonction pour ajouter une réservation
function ajouterReservation(titre, quantite, prixUnitaire, imageUrl) {

const total = quantite * prixUnitaire;
reservations.push({ titre, quantite, total, prixUnitaire, image: imageSrc });

localStorage.setItem('reservations', JSON.stringify(reservations));

  const reservation = { titre, quantite, total, prixUnitaire, image: imageUrl };
  reservations.push(reservation);
  localStorage.setItem('reservations', JSON.stringify(reservations));
  afficher();
}
afficher();
// Fonction pour afficher les réservations
function afficherReservations() {
  const container = document.getElementById('reservations');
  const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
  container.innerHTML = '';
  reservations.forEach(reservation => {
    const div = document.createElement('div');
    div.innerHTML = `
      <strong>${reservation.titre}</strong><br>
      Quantité : ${reservation.quantite}<br>
      Total : ${reservation.total.toFixed(2)} €
    `;
    container.appendChild(div);
  });
}

// Fonction pour afficher les achats
function afficherAchats() {
  const container = document.getElementById('achats');
  const achats = JSON.parse(localStorage.getItem('achats')) || [];
  container.innerHTML = '';
  achats.forEach(achat => {
    const div = document.createElement('div');
    div.innerHTML = `
      <strong>${achat.titre}</strong><br>
      Quantité : ${achat.quantite}<br>
      Total : ${achat.total.toFixed(2)} €
    `;
    container.appendChild(div);
  });
}


// menu burger


  document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burgerEspace');
    const container = document.getElementById('menu-containerEspace');

    burger.addEventListener('click', () => {
      container.classList.toggle('show');
    });
  });
