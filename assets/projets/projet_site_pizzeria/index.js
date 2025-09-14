document.addEventListener("DOMContentLoaded", function() {
  const select = document.getElementById("categorieSelect");
  const PizzaStock = document.getElementById("PizzaStock");
  const boutonCommande = document.getElementById("commande");

  let tableauStock = JSON.parse(localStorage.getItem("tableauStock")) || [];
  let tableauPizza = JSON.parse(localStorage.getItem("tableauPizza")) || [];
  let quantites = JSON.parse(localStorage.getItem("quantites")) || [];

  // Ajouter toutes catégories dans le select
  tableauStock.forEach(categorie => {
    let option = document.createElement("option");
    option.value = categorie;
    option.textContent = categorie;
    select.appendChild(option);
  });

  let optionToutes = document.createElement("option");
  optionToutes.value = "";
  optionToutes.textContent = "Toutes catégories";
  select.appendChild(optionToutes);

  function afficherPizzas() {
    const cat = select.value;
    PizzaStock.innerHTML = "";

    let pizzasFiltrees = tableauPizza.filter(p => p.select === cat || cat === "");

    pizzasFiltrees.forEach((pizza, index) => {
      let conteneur = document.createElement("div");
      conteneur.classList.add("ma-pizza");

    conteneur.innerHTML = `
      <img src="images/categories_pizza/${pizza.select}/${pizza.imagePizza}" alt="${pizza.nom}">
      <div class="pizza-details">
        <h2 class="pizza-nom">${pizza.nom}</h2>
        <p class="pizza-ingredients"><span class="label">Ingrédients :</span> ${pizza.ingredientPizza}</p>
        <p class="pizza-prix"><span class="label">Prix :</span> ${pizza.prixPizza}€</p>
        <p class="pizza-categorie"><span class="label">Catégorie :</span> ${pizza.select}</p>
        <div>
          <button class="button-plus">+</button>
          <span class="compteur">${quantites[index] || 0}</span>
          <button class="button-moins">-</button>
        </div>
      </div>
    `;


      // Boutons +
      conteneur.querySelector(".button-plus").addEventListener("click", () => {
        quantites[index] = (quantites[index] || 0) + 1;
        quantites[index] = Math.min(quantites[index], 25);
        localStorage.setItem("quantites", JSON.stringify(quantites));
        afficherPizzas();
      });

      // Boutons -
      conteneur.querySelector(".button-moins").addEventListener("click", () => {
        quantites[index] = (quantites[index] || 0) - 1;
        quantites[index] = Math.max(quantites[index], 0);
        localStorage.setItem("quantites", JSON.stringify(quantites));
        afficherPizzas();
      });

      PizzaStock.appendChild(conteneur);
    });
  }

  select.addEventListener("change", afficherPizzas);
  afficherPizzas();

  boutonCommande.addEventListener("click", () => {
    window.location.href = "html/panier.html";
  });
});
