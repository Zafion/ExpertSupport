// Importar librería Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";

// Importar funciones de autenticación
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// Opcional: Importar Firebase Analytics
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyCjszf-x_6jER0x5ZhwzmRgMpUdoJ2Rxuw",
  authDomain: "expertitsupport.firebaseapp.com",
  projectId: "expertitsupport",
  storageBucket: "expertitsupport.appspot.com",
  messagingSenderId: "838032327014",
  appId: "1:838032327014:web:907e395d985322c8ec88a7"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Opcional: Inicializar Firebase Analytics
// const analytics = getAnalytics(app);

// Obtener la instancia de autenticación
const auth = getAuth();

export class ManageAccount {
  register(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((_) => {
        //No es necesario redirigir, pues el registro ya se hace en login.html
        //window.location.href = "login.html";
        // Mostrar alerta de registro exitoso
        alert("Registro exitoso. Para continuar inicia sesión.");
      })
      .catch((error) => {
        console.error(error.message);
            // Mostrar alerta de error de registro
            alert("Error al registrar: " + error.message);
      });
  }

  authenticate(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((_) => {
        window.location.href = "index.html";
        // Mostrar alerta de inicio de sesión exitoso
        alert("Has iniciado sesión correctamente. Serás redirigido a la página principal.");
      })
      .catch((error) => {
        console.error(error.message);
                // Mostrar alerta de error de inicio de sesión
                alert("Error al iniciar sesión: " + error.message);
      });
  }

  signOut() {
    signOut(auth)
      .then((_) => {
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}

// Variable para almacenar el estado de la sesión
let isLoggedIn = false; //no se está usando - borrar

// Variable para almacenar si se ha redirigido
let isRedirected = false; //no se está usando - borrar


// Function to check authentication state and redirect (optional)
export function checkSession() {
  onAuthStateChanged(auth, (user) => {
      if (!user && window.location.pathname !== "/login.html") {
        //si no funciona !==login porbar ===/index
      //if (!user && window.location.pathname === "/index.html") {
          window.location.href = "login.html";
      }
  });
}

// Iniciar la verificación del estado de la sesión despues de inicializar firebase
checkSession();

