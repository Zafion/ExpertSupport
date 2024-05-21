window.addEventListener('DOMContentLoaded', async (event) => {
  console.log('firebaseconect.js cargado correctamente')
})

// Importar librerías Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";

// Importar librerías Firestore
import { getFirestore, collection, getDocs, addDoc, updateDoc, query, where } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js"

// Importar librerias de autenticación
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

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


// Clase ManageAccount, registra usuario y crea colecciones, añadiendo mail y passwords vacías
export class ManageAccount {  
  register(email, password) { 
    const voidpassword = "Sin contraseña añadida, por favor, añade una"; //password vacía
    //Listado completo de colecciones:
    const collections = ["bombasgens", "dinopolis", "dna", "dta", "excursionesmaritimas", "gdsparquesreunidos", "grprgermany", "grprbelgium", "grpritaly", "grprnetherlands", "hwmaspalomas", "islamagica", "magiccostablanca", "oceanografic", "parquesgruposm", "portaventuraworld", "puydufou", "puydufou-france", "sendaviva", "terranatura", "terranaturamurcia", "tixalia", "travelparks", "visitvalencia"];
    //Listado de pruebas:
    //const collections = ["test1", "test2"];
    createUserWithEmailAndPassword(auth, email, password)//crea usuario
      .then((_) => {
        //itera por todas listado de colecciones y llama a función addCollection para crear las colecciones y guarda mail y passwords vacías
        for (let i = 0; i < collections.length; i++) {
          addCollection(collections[i], email, voidpassword)
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
  }


  // Función para iniciar sesión
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
  

  // Función para cerrar sesión
  signOut() {
    signOut(auth)
      .then((_) => {
        window.location.href = "login.html";
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}


// Función para crear colección y registrar mail y contraseña
export const addCollection = (collectionname, mail, password) => {
  addDoc (collection(db, collectionname),{mail, password})    
}


// Función para verificar estado de la sesión y redirigir a login si no hay usuario
export function checkSession() {
  onAuthStateChanged(auth, (user) => { //verifica estado de la sesión
      if (!user && window.location.pathname !== "/login.html") {
        //si no hay usuario y no está en login, redirigir a login.
          window.location.href = "login.html";
      }
  });
}
// Iniciar la verificación del estado de la sesión despues de inicializar firebase
checkSession();


// Función para ocultar el botón de inicio de sesión si el usuario ya ha iniciado sesión. 
export function hideLoginButtonIfLoggedIn() {
  onAuthStateChanged(auth, (user) => {  //verifica estado de la sesión
    const loginButton = document.querySelector('a[href="login.html"]'); //busca el botón de inicio de sesión
    if (user) { //si hay usuario, oculta el botón de inicio de sesión
      loginButton.style.display = 'none';
    }
  });
}
//llamar a la función para ocultar el botón de inicio de sesión si el usuario ya ha iniciado sesión
hideLoginButtonIfLoggedIn(); 


// Función para mostrar el mail del usuario
export function getUserMail() {
  try {
    const user = auth.currentUser; // Obtiene el usuario actual
    if (user) { //si hay usuario mostrar el mail del usuario
      const userMailElement = document.getElementById('user-mail');
      userMailElement.textContent = user.email;
    } else { //si no hay usuario mostrar vacío
      const userMailElement = document.getElementById('user-mail');
      userMailElement.textContent = '';
    }
  } catch (error) {
    console.error('Error al obtener el mail del usuario, si aún no se ha logeado es correcto', error);
  }
}
// Verifica si el archivo actual no es login.html antes de llamar a la función para mostrar el mail del usuario
const currentPage = window.location.pathname;
if (currentPage !== '/login.html') {
  onAuthStateChanged(auth, (user) => { 
    getUserMail();
  });
}


//funcion para mostrar el password del usuario
export const getPassword = async (tablaSeleccionada) => { 
  const user = auth.currentUser; // Obtiene el usuario actual
  const querySnapshot = await getDocs(collection(db, tablaSeleccionada)); // Obtiene los datos de la colección
  let html = '';//inicializa variable html
  querySnapshot.forEach((doc) => {  // Itera sobre los datos de la colección
      const client = doc.data() // Obtiene los datos del documento
      //console.log(doc.data())
      if (client.mail === user.email) { // Si el mail del usuario coincide con el mail del documento
          //console.log(doc.data())
          html += `${client.password}` // Agrega el password del documento a la variable html
          //console.log(html)
      }      
  });
  //Obtiene el valor de la variable html y lo muestra en el elemento con id 'experticket-password'
  const passwordContainer = document.getElementById('experticket-password').innerHTML = html
};


//función para cambiar el password del usuario usando updateDoc
//se le proporciona la coleccion, y el nuevo password, el mail es el email del usuario logueado
//no es necesario comprobar si hay un usuario logueado ya que si no se esta logeado redirige a login  
export async function cambiarPassword(coleccion, nuevoPassword) {
  const user = getAuth().currentUser;  // Obtiene el usuario actual
  const coleccionRef = collection(db, coleccion); // Crea una referencia a la colección
  // Crea una consulta para encontrar documentos con el email especificado:
  const q = query(coleccionRef, where("mail", "==", user.email));
  const querySnapshot = await getDocs(q); // Obtiene los documentos que coinciden con la consulta
  querySnapshot.forEach((doc) => {  // Itera sobre los documentos encontrados
    updateDoc(doc.ref, { password: nuevoPassword });  // Actualiza el campo "password" del documento
  });
}

