document.addEventListener("DOMContentLoaded", function() {
  const panierContainer = document.getElementById("panierContainer");
  const totalPanier = document.getElementById("totalPanier");
  const validerCommande = document.getElementById("validerCommande");

  let tableauPizza = JSON.parse(localStorage.getItem("tableauPizza")) || [];
  let quantites = JSON.parse(localStorage.getItem("quantites")) || [];
  let historique = JSON.parse(localStorage.getItem("historique")) || [];

  function calculerTotal() {
    let total = 0;
    tableauPizza.forEach((pizza, index) => {
      const qte = quantites[index] || 0; 
      total += pizza.prixPizza * qte;
    });
    totalPanier.textContent = "Total : " + total.toFixed(2) + " €";
  }

  function afficherPanier() {
    panierContainer.innerHTML = "";
    tableauPizza.forEach((pizza, index) => {
      if (quantites[index] > 0) {
        const pizzaElement = document.createElement("div");
        pizzaElement.classList.add("pizza-item");
        pizzaElement.innerHTML = `
          <h3>${pizza.nom}</h3>
          <p>Prix unitaire : ${pizza.prixPizza} €</p>
          <p>Quantité : ${quantites[index]}</p>
          <p>Total : ${(pizza.prixPizza * quantites[index]).toFixed(2)} €</p>
          <div class="actions">
            <button class="modifier" data-index="${index}">Modifier</button>
            <button class="supprimer" data-index="${index}">Supprimer</button>
          </div>
        `;
        panierContainer.appendChild(pizzaElement);
      }
    });
    calculerTotal();
  }

  function modifierQuantite(index, nouvelleQuantite) {
    if (nouvelleQuantite >= 0) {
      quantites[index] = nouvelleQuantite;
      localStorage.setItem("quantites", JSON.stringify(quantites));
      afficherPanier();
    }
  }

  function supprimerPizza(index) {
    quantites[index] = 0;
    localStorage.setItem("quantites", JSON.stringify(quantites));
    afficherPanier();
  }

  panierContainer.addEventListener("click", function(event) {
    const index = event.target.getAttribute("data-index");
    if (event.target.classList.contains("modifier")) {
      const nouvelleQuantite = prompt("Nouvelle quantité :", quantites[index]);
      if (nouvelleQuantite !== null) {
        modifierQuantite(index, parseInt(nouvelleQuantite, 10));
      }
    } else if (event.target.classList.contains("supprimer")) {
      supprimerPizza(index);
    }
  });

  validerCommande.addEventListener("click", function() {
    let commande = tableauPizza
      .map((pizza, index) => {
        if (quantites[index] > 0) {
          return { nom: pizza.nom, quantite: quantites[index], prix: pizza.prixPizza };
        }
        return null;
      })
      .filter(item => item !== null);

    if (commande.length === 0) {
      alert("Votre panier est vide !");
      return;
    }

    historique.push({ date: new Date().toLocaleString(), commande });
    localStorage.setItem("historique", JSON.stringify(historique));

    quantites = Array(tableauPizza.length).fill(0);
    localStorage.setItem("quantites", JSON.stringify(quantites));
    afficherPanier();

    alert("Commande validée et enregistrée dans votre historique !");
  });

  afficherPanier();
});
