import { ManageAccount } from './firebaseconect.js';

console.log('Formulario de Registro - Inicio de Sesión');

window.addEventListener('DOMContentLoaded', async (event) => {
  console.log('login.js cargado correctamente')  
})

//crea una instancia de ManageAccount
const manageAccount = new ManageAccount();

// Definimos los elementos del DOM que vamos a utilizar
//const btnSignup = document.getElementById("btn-signup");




// listeners para clic en los botones
document.getElementById("btn-login").addEventListener("click", handleLogin);
document.getElementById("btn-signup").addEventListener("click", handleSignup);



// Función para mostrar la cláusula completa en una ventana emergente personalizada
function mostrarClausula() {
  const popup = document.createElement("div");
  popup.classList.add("popup");
  const textoClausula = document.createElement("p");
  textoClausula.textContent = clausula;
  const btnCerrar = document.createElement("button");
  btnCerrar.textContent = "Cerrar";
  btnCerrar.addEventListener("click", () => {
    document.body.removeChild(popup);
  });
  popup.appendChild(textoClausula);
  popup.appendChild(btnCerrar);
  document.body.appendChild(popup);
}


//función para manejar formulario de inicio de sesión
function handleLogin(event) { 
  event.preventDefault(); // Prevenir la recarga de la página
  // obtener valore del campo de email
  const email = document.getElementById("email").value;
  // si el email está vacio mostrar alerta
  if (email === "") {
    alert("Por favor, introduce tu correo electrónico.");
    return;
  }
  // obtener valor del campo de contrasenya
  const password = document.getElementById("password").value;
  // si la contrasenya está vacia mostrar alerta
  if (password === "") {
    alert("Por favor, introduce tu contraseña.");
    return;
  }
  //llamar a la función para iniciar sesión
  manageAccount.authenticate(email, password);
}


//función para manejar formulario de registro de usuario
function handleSignup(event) {
  event.preventDefault();// Prevenir la recarga de la página
  // obtener valor del campo de email
  const email = document.getElementById("email").value;
  // si el email está vacio mostrar alerta
  if (email === "") {
    alert("Por favor, introduce tu correo electrónico.");
    return;
  }
  // obtener valor del campo de contrasenya
  const password = document.getElementById("password").value;
  // si la contrasenya está vacia mostrar alerta
  if (password === "") {
    alert("Por favor, introduce tu contraseña.");
    return;
  }
  //llamar a la función para registrar usuario
  manageAccount.register(email, password);
  //limpiar formulario
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}


