let nomDeAdmin = document.getElementById("name");
let motDePasse = document.getElementById("password");
let bouton = document.getElementById("boutton");

bouton.addEventListener('click', () => {
  let MDP = "magali";
  let nom = "bernardin";

  if (nomDeAdmin.value === nom && motDePasse.value === MDP) {
    sessionStorage.setItem('auth', 'true');
    window.location.href = 'admin.html';
  } else {
    alert('Identifiant ou mot de passe incorrect');
    nomDeAdmin.value = '';
    motDePasse.value = '';
}
});

