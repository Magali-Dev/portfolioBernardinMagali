// Variables CSS dynamiques
const cssVars = {
  primary: '#d32f2f',
  accent: '#ff6f00',
  text: '#212121',
  bgCard: '#fff',
  borderRadius: '20px',
  shadow: '0 8px 20px rgba(0,0,0,0.12)'
};

// Helper pour appliquer le style
function style(el, styles) {
  for (let key in styles) el.style[key] = styles[key];
}

// -----------------------
// Gestion catégories
// -----------------------
const message = document.getElementById("texte");
const stock1 = document.getElementById("stock");
const bouton = document.getElementById("valider");
const select = document.getElementById("categorieSelect");
let tableauStock = JSON.parse(localStorage.getItem("tableauStock")) || [];

function updateCategories() {
  stock1.innerHTML = "";
  tableauStock.forEach((item, index) => {
    const div = document.createElement("div");
    div.textContent = item;
    style(div, { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', color: cssVars.text });

    const btn = document.createElement("button");
    btn.textContent = "Supprimer";
    style(btn, { padding: '5px 10px', backgroundColor: '#e53935', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' });
    btn.onmouseover = () => btn.style.backgroundColor = '#b71c1c';
    btn.onmouseout = () => btn.style.backgroundColor = '#e53935';
    btn.onclick = () => deleteCategory(index);

    div.appendChild(btn);
    stock1.appendChild(div);
  });
  populateSelect();
}

function deleteCategory(index) {
  tableauStock.splice(index, 1);
  localStorage.setItem("tableauStock", JSON.stringify(tableauStock));
  updateCategories();
}

function populateSelect() {
  select.innerHTML = "";
  tableauStock.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

bouton.addEventListener("click", () => {
  const value = message.value.trim();
  if (value && !tableauStock.includes(value)) {
    tableauStock.push(value);
    localStorage.setItem("tableauStock", JSON.stringify(tableauStock));
    message.value = "";
    updateCategories();
  } else if (tableauStock.includes(value)) {
    alert(`La catégorie "${value}" existe déjà.`);
  }
});

updateCategories();

// -----------------------
// Gestion pizzas
// -----------------------
const nomPizza = document.getElementById("nom");
const ingredientPizza = document.getElementById("ingrédients");
const prixPizza = document.getElementById("prix");
const imageInput = document.getElementById("image");
const boutonPizza = document.getElementById("validerCreation");
const PizzaStock = document.getElementById("stockPizza");
let tableauPizza = JSON.parse(localStorage.getItem("tableauPizza")) || [];

function renderPizzas() {
  PizzaStock.innerHTML = "";
  tableauPizza.forEach((pizza, index) => {
    const card = document.createElement("div");
    card.classList.add("ma-pizza");
    style(card, { display:'flex', flexDirection:'column', backgroundColor: cssVars.bgCard, borderRadius: cssVars.borderRadius, boxShadow: cssVars.shadow, margin:'1rem auto', overflow:'hidden', width:'100%', maxWidth:'420px' });

    if(pizza.imagePizza) {
      const img = document.createElement("img");
      img.src = `../images/categories_pizza/${pizza.select}/${pizza.imagePizza}`;
      img.alt = pizza.nom;
      style(img, { width:'100%', height:'200px', objectFit:'cover', borderBottom:'1px solid #eee' });
      card.appendChild(img);
    }

    const details = document.createElement("div");
    details.classList.add("pizza-details");
    style(details, { padding:'1rem', display:'flex', flexDirection:'column', gap:'0.5rem' });
    details.innerHTML = `
      <h2 class="pizza-nom">${pizza.nom}</h2>
      <p class="pizza-ingredients"><span class="ingredients">Ingrédients:</span> ${pizza.ingredientPizza}</p>
      <p class="pizza-prix"><span class="prix">Prix:</span> ${pizza.prixPizza}€</p>
      <p class="pizza-categorie"><span class="categorie_pizza">Catégorie:</span> ${pizza.select}</p>
    `;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Supprimer";
    style(delBtn, { padding:'0.5rem 1rem', borderRadius: cssVars.borderRadius, backgroundColor:'#e53935', color:'#fff', border:'none', cursor:'pointer', alignSelf:'flex-start' });
    delBtn.onmouseover = () => delBtn.style.backgroundColor = '#b71c1c';
    delBtn.onmouseout = () => delBtn.style.backgroundColor = '#e53935';
    delBtn.onclick = () => {
      tableauPizza.splice(index,1);
      localStorage.setItem("tableauPizza", JSON.stringify(tableauPizza));
      renderPizzas();
    };

    details.appendChild(delBtn);
    card.appendChild(details);
    PizzaStock.appendChild(card);
  });

  if(window.innerWidth > 700) {
    Array.from(PizzaStock.children).forEach(card => {
      style(card, { flexDirection:'row' });
      const img = card.querySelector("img");
      if(img) style(img, { width:'50%', height:'auto', borderRight:'1px solid #ddd', borderBottom:'none' });
      const details = card.querySelector(".pizza-details");
      style(details, { width:'50%' });
    });
  }
}

boutonPizza.addEventListener("click", () => {
  const pizza = {
    nom: nomPizza.value.trim(),
    ingredientPizza: ingredientPizza.value.trim(),
    prixPizza: parseFloat(prixPizza.value) || 0,
    select: select.value,
    imagePizza: imageInput.value.trim()
  };

  if(!pizza.nom || !pizza.ingredientPizza || !pizza.prixPizza || !pizza.select){
    alert("Tous les champs doivent être remplis.");
    return;
  }

  if(tableauPizza.some(p => p.nom === pizza.nom)){
    alert(`La pizza "${pizza.nom}" existe déjà.`);
    return;
  }

  tableauPizza.push(pizza);
  localStorage.setItem("tableauPizza", JSON.stringify(tableauPizza));
  nomPizza.value = "";
  ingredientPizza.value = "";
  prixPizza.value = "";
  imageInput.value = "";
  renderPizzas();
});

renderPizzas();

// -----------------------
// Déconnexion et sécurité
// -----------------------
document.getElementById("deconnexion").addEventListener("click", () => {
  sessionStorage.removeItem("auth");
  window.location.href="/index.html";
});

if(sessionStorage.getItem("auth") !== "true") {
  alert("Accès non autorisé. Connectez-vous.");
  window.location.href="/index.html";
}
