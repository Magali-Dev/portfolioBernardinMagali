
document.getElementById('form-connexion').addEventListener('submit', function(event) {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const passwordInput = document.getElementById('password');
  const name = nameInput.value;
  const mdp = passwordInput.value;

  // Connexion administrateur
  if (name === 'magali' && mdp === 'magali22') {
    localStorage.setItem('utilisateurConnecté', JSON.stringify({ nom: name, role: 'admin' }));
    alert('Vous êtes connecté en tant qu\'administrateur');
    
    // Reset les champs
    nameInput.value = '';
    passwordInput.value = '';
    
    window.location.href = 'admin.html';
    return;
  }

  // Connexion utilisateur
  const tableauUtilisateur = JSON.parse(localStorage.getItem("tableauUtilisateur")) || [];
  const userverification = tableauUtilisateur.find(u => u.nom === name && u.motDePasse === mdp);

  if (userverification) {
    localStorage.setItem('utilisateurConnecté', JSON.stringify(userverification));
    alert('Vous êtes bien connecté');

    // Reset les champs
    nameInput.value = '';
    passwordInput.value = '';

    window.location.href = '../../index.html'; 
  } else {
    alert("Identifiant ou mot de passe incorrect.");

    // Reset aussi en cas d’erreur
    nameInput.value = '';
    passwordInput.value = '';
  }
});

function login() {
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const username = usernameInput.value;
  const password = passwordInput.value;

  if (username === 'admin' && password === 'secret') {
    sessionStorage.setItem('isLoggedAdmin', 'true');
    sessionStorage.setItem('adminExpires', Date.now() + 3600000); 
    alert("Connexion réussie");

    // Reset
    usernameInput.value = '';
    passwordInput.value = '';

    window.location.href = 'admin.html';
  } else {
    alert('Identifiants invalides');

    // Reset aussi en cas d'erreur
    usernameInput.value = '';
    passwordInput.value = '';
  }
}

// menu burger


  document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burgerConnexion');
    const container = document.getElementById('menuContainerConnexion');

    burger.addEventListener('click', () => {
      container.classList.toggle('show');
    });
  });
