document.addEventListener('DOMContentLoaded', () => {
  const inputPrix = document.getElementById('inputPrix');
  const btnSave = document.getElementById('btnSavePrix');
  const achatsKey = 'achats';
  const prixUnitaireKey = 'prixUnitaireGlobal';

  if (!inputPrix || !btnSave) {
    console.error('Champ ou bouton introuvable');
    return;
  }

  let prixUnitaire = parseFloat(localStorage.getItem(prixUnitaireKey));
  if (isNaN(prixUnitaire)) prixUnitaire = 12;

  inputPrix.value = prixUnitaire.toFixed(2);

  function afficherChiffreAffaires() {
    const achats = JSON.parse(localStorage.getItem(achatsKey)) || [];
    const totalCA = achats.reduce((acc, achat) => acc + (Number(achat.total) || 0), 0);
    const caEl = document.getElementById('totalCA');
    if (caEl) caEl.textContent = totalCA.toFixed(2) + ' €';
  }

  // Fonction : afficher les détails des achats
  function afficherDetailsAchats() {
    const achats = JSON.parse(localStorage.getItem(achatsKey)) || [];
    const container = document.getElementById('detailsAchats');
    if (!container) return;

    container.innerHTML = '';
    if (achats.length === 0) {
      container.textContent = 'Aucun achat enregistré.';
      return;
    }

    const table = document.createElement('table');
    table.style.borderCollapse = 'collapse';
    table.style.width = '100%';

    const headerRow = table.createTHead().insertRow();
    ['Titre', 'Quantité', 'Prix Unitaire', 'Total (€)'].forEach(text => {
      const tableauTitre = document.createElement('th');
      tableauTitre.textContent = text;
      tableauTitre.style.border = '1px solid #ddd';
      tableauTitre.style.padding = '8px';
      tableauTitre.style.color = "red"
      headerRow.appendChild(tableauTitre);
    });

    const body = table.createTBody();
    achats.forEach(achat => {
      const row = body.insertRow();
      [ achat.titre,
        achat.quantite,
        (Number(achat.prixUnitaire) || 0).toFixed(2),
        (Number(achat.total) || 0).toFixed(2)
      ].forEach(text => {
        const cell = row.insertCell();
        cell.textContent = text;
        cell.style.border = '1px solid #ddd';
        cell.style.color = 'black';
        cell.style.padding = '8px';
      });
    });

    container.appendChild(table);
  }

  // Événement bouton "enregistrer" prix
  btnSave.addEventListener('click', () => {
    const nouveauPrix = parseFloat(inputPrix.value.trim().replace(',', '.'));
    if (isNaN(nouveauPrix) || nouveauPrix < 0) {
      alert('Veuillez saisir un prix valide.');
      inputPrix.value = prixUnitaire.toFixed(2);
      return;
    }

    prixUnitaire = nouveauPrix;
    localStorage.setItem(prixUnitaireKey, prixUnitaire.toFixed(2));

    // Recalcul des achats
    let achats = JSON.parse(localStorage.getItem(achatsKey)) || [];
    achats = achats.map(achat => {
      achat.prixUnitaire = prixUnitaire;
      achat.total = achat.quantite * prixUnitaire;
      return achat;
    });

    localStorage.setItem(achatsKey, JSON.stringify(achats));
    alert(`Prix mis à jour à ${prixUnitaire.toFixed(2)} €.`);

    inputPrix.value = prixUnitaire.toFixed(2);
    afficherChiffreAffaires();
    afficherDetailsAchats();
  });

  // Affichages initiaux
  afficherChiffreAffaires();
  afficherDetailsAchats();
});



  (function() {
  const isLogged = sessionStorage.getItem('isLoggedAdmin');
  const expires = Number(sessionStorage.getItem('adminExpires'));
  const isExpired = !expires || Date.now() > expires;

  if (isLogged !== 'true' || isExpired) {
    if (!location.pathname.endsWith('admin.html')) { // ← adapte si besoin
      window.location.href = 'admin.html'; // redirige vers une vraie page de login
    }
  }
})();

    