import { ManageAccount } from './firebaseconect.js';

// Create a single instance of the ManageAccount class
const manageAccount = new ManageAccount();

// Function to handle login form submission
function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  manageAccount.authenticate(email, password);
}

// Function to handle signup form submission
function handleSignup(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  manageAccount.register(email, password);
}

// Attach event listeners to the respective buttons
document.getElementById("btn-login").addEventListener("click", handleLogin);
document.getElementById("btn-signup").addEventListener("click", handleSignup);

console.log('Formulario de Registro - Inicio de Sesión');