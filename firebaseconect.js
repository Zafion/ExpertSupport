console.log('firebaseconect.js cargado correctamente')

// Importar librerías Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";

// Importar librerías Firestore
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js"

// Importar librerias de autenticación
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

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

// Inicializar BBDD
const db = getFirestore(app);

// Obtener la instancia de autenticación
const auth = getAuth();

export class ManageAccount {  
  register(email, password) {
    const voidpassword = " ";
    const collections = ["bombasgens", "dinopolis", "dna", "dta", "excursionesmaritimas", "gdsparquesreunidos", "grprgermany", "grprbelgium", "grpritaly", "grprnetherlands", "hwmaspalomas", "islamagica", "magiccostablanca", "oceanografic", "parquesgruposm", "portaventuraworld", "puydufou", "puydufou-france", "sendaviva", "terranatura", "terranaturamurcia", "tixalia", "travelparks", "visitvalencia"];
    createUserWithEmailAndPassword(auth, email, password)
      .then((_) => {

        //itera por todas las colecciones y guarda mail y passwords vacías
        for (let i = 0; i < collections.length; i++) {
          savePassword(collections[i], email, voidpassword)
          console.log("usuario guardado en " + collections[i]);
        }        
        // Mostrar alerta de registro exitoso
        alert("Registro exitoso. Para continuar inicia sesión.");
      })
      .catch((error) => {
        console.error(error.message);
            // Mostrar alerta de error de registro
            alert("Error al registrar: " + error.message);
      });
        //No es necesario redirigir, pues el registro ya se hace en login.html
        //window.location.href = "login.html";
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

// Función para registrar contraseñas de usuario
export const savePassword = (collectionname, mail, password) => {
  addDoc (collection(db, collectionname),{mail, password})    
}

// Function to check authentication state and redirect (optional)
export function checkSession() {
  onAuthStateChanged(auth, (user) => {
      if (!user && window.location.pathname !== "/login.html") {
        //si no funciona !==login probar ===/index
      //if (!user && window.location.pathname === "/index.html") {
          window.location.href = "login.html";
      }
  });
}

// Iniciar la verificación del estado de la sesión despues de inicializar firebase
checkSession();


