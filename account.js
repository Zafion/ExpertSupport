//importaciones
import { ManageAccount } from './firebaseconect.js';
import { cambiarContraseña } from './firebaseconect.js';
import { cambiarPassword } from './firebaseconect.js';
import { deleteAccount } from './firebaseconect.js';

window.addEventListener('DOMContentLoaded', (event) => {
  console.log('account.js cargado correctamente')  
})

// Creamos una instancia de manageAccount
const manageAccount = new ManageAccount();

// Definimos los elementos del DOM que vamos a utilizar
const switchReset = document.getElementById('switch-reset');
const switchDelAccount = document.getElementById('switch-del-account');
const newpassId = "Sin contraseña añadida, por favor, añade una";
const collections = ["bombasgens", "dinopolis", "dna", "dta", "excursionesmaritimas", "gdsparquesreunidos", "grprgermany", "grprbelgium", "grpritaly", "grprnetherlands", "hwmaspalomas", "islamagica", "magiccostablanca", "oceanografic", "parquesgruposm", "portaventuraworld", "puydufou", "puydufou-france", "sendaviva", "terranatura", "terranaturamurcia", "tixalia", "travelparks", "visitvalencia"];
const newUserPassword1 = document.getElementById("new-password1");
const newUserPassword2 = document.getElementById("new-password2");

// Listeners para los botones y demás elementos.
document.getElementById("reset-button").addEventListener("click", resetAllPasswords);
document.getElementById("modify-button").addEventListener("click", changePassword);
document.getElementById("logout-button").addEventListener("click", logOut);

//listener para switchReset
switchReset.addEventListener("change", (event) => {
  //cuando cambie mostrar valor por consola
  console.log("El switch cambio de valor a: " + event.target.checked);
  //si switchReset esta activado, mostrar alerta
  if (event.target.checked) {
    //mostrar aviso
    alert("Has activado la eliminación de passwords. pulsa Restablecer para continuar.");
  }
});

//listener para switchDelAccount
switchDelAccount.addEventListener("change", (event) => {
  //cuando cambie mostrar valor por consola
  console.log("El switch cambio de valor a: " + event.target.checked);
  //si switchDelAccount esta activado, mostrar alerta
  if (event.target.checked) {
    var result = confirm("La eliminación de tu cuenta es definitiva e irreversible. Esto significa que una vez que elimines tu cuenta, no podrás recuperarla ni acceder a ninguno de los datos asociados a ella.\n\nAl eliminar tu cuenta, se borrarán todos los datos asociados a ella, incluyendo:\n\n* Tus datos de usuario.\n* Todas tus contraseñas almacenadas serán eliminadas\n\nAl hacer clic en \"Aceptar\", confirmas que has leído y comprendido esta advertencia y que deseas continuar con el proceso de eliminación.\n\nSi no deseas eliminar tu cuenta, puedes cancelar esta acción haciendo clic en \"Cancelar\".\n\nSi tienes alguna pregunta o duda, por favor contacta con el soporte de Experticket.\n\n¿Estás seguro de que deseas eliminar tu cuenta?");
    if (result) {
      switchDelAccount.checked = true;
      console.log("Usuario confirma haber leido la advertencia de eliminación y acepta continuar.");
    } else {
      switchDelAccount.checked = false;
      console.log("Usuario rechaza eliminar la cuenta.");
    }
  }
});


//Función para el para el cierre de sesión
function logOut () {
    manageAccount.signOut().then(() => {
      window.location.href = "login.html";
      alert("Sesión cerrada correctamente.");
    }).catch((error) => {
      console.error(error.message);
      alert("Error al cerrar sesión: " + error.message);
    });
}


//Función para cambiar contraseña de usuario.
function changePassword() {
    //si newUserPassword1 es igual a newUserPassword2, cambiar contrasenya a newUserPassword1
    if (newUserPassword1.value === newUserPassword2.value) {
        console.log("Las contraseñas coinciden.")
        cambiarContraseña(newUserPassword1.value);
        //vacia campos
        newUserPassword1.value = "";
        newUserPassword2.value = "";
    //si newUserPassword1 no es igual a newUserPassword2, mostrar alerta    
    } else {
        console.log("Las contraseñas no coinciden.")
        alert("Las contrasenyes no coinciden. Por favor, introduce la misma en los dos campos.");
        //vacia campos
        newUserPassword1.value = "";
        newUserPassword2.value = "";
    }
}


//Función para resetear todos los passwords
//Sólo funciona si el switchReset esta activado
function resetAllPasswords() {
  //si switchReset esta desactivado, mostrar alerta y no continuar
  if (switchReset.unchecked) {
    alert("Confirma la eliminación antes para continuar.");
    return;
  }
  //si switchReset esta activado, llamar a cambiarPassword
  if (switchReset.checked) {
    //iterar por cada elemento de collections, llamando a cambiarPassword en cada iteración y dando el valor de collections[i]
    for (let i = 0; i < collections.length; i++) {
      cambiarPassword(collections[i], newpassId);
      console.log("Eliminado password de " + collections[i]);
    }    
    // Mostrar alerta de borrado exitoso
    alert("Se han eliminado los passwords de todos los expertickets.");
    //desactivar switchReset
    switchReset.checked = false;
  }
}


// a medio hacer.     


