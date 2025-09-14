const utilisateur = document.getElementById('utilisateur');
const resultat = document.getElementById('resultat');
const buttons = document.querySelectorAll('.touches button');
const calculator = document.getElementById('calculator_base');

// Ajouter un caractère à l'affichage
function afficher(value) {
  utilisateur.value += value;
}

// Effacer
function effacer() {
  utilisateur.value = "";
  resultat.value = "";
}

// Calculer sans eval()
function calculer() {
  try {
    // autoriser uniquement chiffres et opérateurs
    if (/^[0-9+\-*/().\s]+$/.test(utilisateur.value)) {
      const res = Function("return " + utilisateur.value)();
      resultat.value = res;
    } else {
      resultat.value = "Erreur";
    }
  } catch {
    resultat.value = "Erreur";
  }
}

// Gestion des boutons
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.dataset.value;
    const action = btn.dataset.action;

    if (action === "clear") effacer();
    else if (action === "equals") calculer();
    else if (val) afficher(val);
  });
});

// Changement de couleur
document.querySelectorAll(".couleur span").forEach(c => {
  c.addEventListener("click", () => {
    calculator.style.backgroundColor = c.dataset.color;
  });
});
