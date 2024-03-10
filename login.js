//ingresar en el head del login.html

//<script type="module" src="firebaseconect.js"></script>
//<script type="module" src="login.js"></script>


import { ManageAccount } from './firebaseconect.js';

// Crear una única instancia de la calse ManageAccount
const manageAccount = new ManageAccount(); 

document.getElementById("formulario-sesion").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  manageAccount.authenticate(email, password);
});

console.log('Formulario de Inicio de Sesión');
