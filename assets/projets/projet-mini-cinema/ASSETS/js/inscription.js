const nomUtilisateur = document.getElementById("name");
const prenomUtilisateur = document.getElementById("name-prenom");
const emailUtilisateur = document.getElementById("email");
const passwordUtilisateur = document.getElementById("password");
const dateDeNaissance = document.getElementById("start");
const boutonInscription = document.getElementById('valider-inscription');

let tableauUtilisateur = JSON.parse(localStorage.getItem("tableauUtilisateur")) || [];

boutonInscription.addEventListener("click", function(e) {
  e.preventDefault();

  const user = {
    nom: nomUtilisateur.value.trim(),
    prenom: prenomUtilisateur.value.trim(),
    motDePasse: passwordUtilisateur.value,
    email: emailUtilisateur.value.trim(),
    // dateNaissance: dateDeNaissance.value
  };

  // Vérifie les champs vides
  if (!user.nom || !user.prenom || !user.motDePasse || !user.email) {
    alert("Tous les champs doivent être remplis.");
    resetForm();
    return;
  }

  // Vérifie si l'utilisateur existe déjà (par nom + prénom)
  const existe = tableauUtilisateur.some(u =>
    u.nom.toLowerCase() === user.nom.toLowerCase() &&
    u.prenom.toLowerCase() === user.prenom.toLowerCase()
  );

  if (existe) {
    alert(`L'utilisateur "${user.prenom} ${user.nom}" existe déjà.`);
    resetForm();
    return;
  }

  // Ajoute l'utilisateur
  tableauUtilisateur.push(user);
  localStorage.setItem("tableauUtilisateur", JSON.stringify(tableauUtilisateur));

  alert(`Bienvenue ${user.prenom} ! Vous êtes bien inscrit(e).`);

  resetForm();
});

// Réinitialisation des champs
function resetForm() {
  nomUtilisateur.value = "";
  prenomUtilisateur.value = "";
  passwordUtilisateur.value = "";
  emailUtilisateur.value = "";
  dateDeNaissance.value = "";
}
