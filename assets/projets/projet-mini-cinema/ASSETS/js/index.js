// bouton pour ouvrir et fermer la fenetre des informationts sur le films

document.addEventListener('DOMContentLoaded', () => {
  const boutonsOuvrir = document.querySelectorAll('.ouvrir-fiche');
  const boutonsFermer = document.querySelectorAll('.fermer-fiche');
  const bouton = document.querySelector('.ouvrir-fiche');
  const image = bouton.querySelector('img');
  console.log(image.src); 

 
  boutonsOuvrir.forEach(bouton => {
    bouton.addEventListener('click', () => {
      const idFiche = bouton.dataset.fiche;
      const fiche = document.getElementById(idFiche);
      if (fiche) {
        fiche.classList.remove('hidden');
      }
    });
  });

  
  boutonsFermer.forEach(bouton => {
    bouton.addEventListener('click', () => {
      const fiche = bouton.closest('.fiche-details');
      fiche.classList.add('hidden');
    });
  });
});
//  autorisation que pour les utilisateurs

document.addEventListener('DOMContentLoaded', () => {
  const utilisateurConnecté = JSON.parse(localStorage.getItem('utilisateurConnecté'));
  const infos = document.querySelectorAll('.informationMembre');

  if (!utilisateurConnecté) {
    infos.forEach(e => {
      e.style.display = 'none';
    });
  }
});
// deconnection de l'utilisateur
document.addEventListener('DOMContentLoaded', () => {
  const boutonDeconnexion = document.getElementById('deconnexion');

  if (boutonDeconnexion) {
    boutonDeconnexion.addEventListener('click', () => {
      
      localStorage.removeItem('utilisateurConnecté');
      window.location.href = 'index.html'; 
    });
  }
});



document.addEventListener('DOMContentLoaded', () => {
  const fiches = document.querySelectorAll('.fiche-details');
  let places = parseInt(localStorage.getItem('placesRestantes')) || 50;
  const prixUnitaire = parseFloat(localStorage.getItem('prixUnitaireGlobal')) || 12;

// mettre à jour toutes les affiches de places restantes
  function mettreAjourPlaces() {
    fiches.forEach(fiche => {
      const placesElement = fiche.querySelector('.places-restantes');
      if (placesElement) {
        placesElement.textContent = `Places restantes : ${places}`;
      }
    });
  }

  mettreAjourPlaces();

  fiches.forEach(fiche => {
    const btnPlus = fiche.querySelector('.plus');
    const btnMoins = fiche.querySelector('.moins');
    const quantiteElement = fiche.querySelector('.count');
    const btnReserve = fiche.querySelector('.reserve-btn');

    let quantite = 0;

    function mettreAjourAffiche() {
      quantiteElement.textContent = quantite;
    
    }

    btnPlus.addEventListener('click', () => {
      if (places > 0) {
        quantite++;
        places--;
        mettreAjourAffiche();
        mettreAjourPlaces();
        localStorage.setItem('placesRestantes', places);
      }
    });

    btnMoins.addEventListener('click', () => {
      if (quantite > 0) {
        quantite--;
        places++;
        mettreAjourAffiche();
        mettreAjourPlaces();
        localStorage.setItem('placesRestantes', places);
      }
    });

    btnReserve.addEventListener('click', () => {
      if (quantite > 0) {
        const titre = fiche.querySelector('h2')?.textContent || 'Réservation';
        const imageElement = fiche.querySelector('.petit-image img');
        const imageSrc = imageElement ? imageElement.getAttribute('src').split('/').pop() : 'default.jpg';

        let reservations = JSON.parse(localStorage.getItem('reservations')) || [];

        const index = reservations.findIndex(r => r.titre === titre);
        if (index !== -1) {
          reservations[index].quantite += quantite;
          reservations[index].total = reservations[index].quantite * prixUnitaire;
        } else {
          reservations.push({
            titre,
            quantite,
            total: quantite * prixUnitaire,
            image: imageSrc
          });
        }

        localStorage.setItem('reservations', JSON.stringify(reservations));

        alert(`Vous avez réservé ${quantite} place(s) pour "${titre}" au total de ${quantite * prixUnitaire} €.`);

        quantite = 0;
        mettreAjourAffiche();
      } else {
        alert('Veuillez sélectionner au moins une place.');
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const key = 'prixUnitaireGlobal';
  const stored = parseFloat(localStorage.getItem(key));
  const prixUnitaire = (!isNaN(stored) && stored >= 0) ? stored : 12;

  // Sélectionne tous les éléments affichant le prix unitaire
  const priceNodes = document.querySelectorAll('.prix');
  priceNodes.forEach(el => {
    el.textContent = prixUnitaire.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }) + ' €';
  });
});


// menu burger
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger');
    const container = document.getElementById('menuContainer');

    burger.addEventListener('click', () => {
      container.classList.toggle('show');
    });
  });



