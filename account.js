//importaciones
import { ManageAccount } from './firebaseconect.js';
import { cambiarContraseña } from './firebaseconect.js';

window.addEventListener('DOMContentLoaded', (event) => {
  console.log('index.js cargado correctamente')  
})

// Creamos una instancia de manageAccount
const manageAccount = new ManageAccount();

// Definimos los elementos del DOM que vamos a utilizar
const resetBtn = document.getElementById("reset-button");
const passwordCheck1 = document.getElementById('password-check1');
const newpassId = "Sin contraseña añadida, por favor, añade una";
const collections = ["bombasgens", "dinopolis", "dna", "dta", "excursionesmaritimas", "gdsparquesreunidos", "grprgermany", "grprbelgium", "grpritaly", "grprnetherlands", "hwmaspalomas", "islamagica", "magiccostablanca", "oceanografic", "parquesgruposm", "portaventuraworld", "puydufou", "puydufou-france", "sendaviva", "terranatura", "terranaturamurcia", "tixalia", "travelparks", "visitvalencia"];
const newUserPassword1 = document.getElementById("new-password1");
const newUserPassword2 = document.getElementById("new-password2");

// Listeners para los botones y demás elementos.
//document.getElementById("reset-button").addEventListener("click", resetAllPasswords);
document.getElementById("modify-button").addEventListener("click", changePassword);
document.getElementById("logout-button").addEventListener("click", logOut);


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









// a medio hacer. falta comprobar contraseña.

// Escuchar clic en resetBtn que llama a cambiarPassword
// con cambiarPassword actualiza contraseña con el valor de newpassId
// function resetAllPasswords() {
//     //console.log("newpassId: " + newpassId.value);
//     //console.log("tablasel: " + selectorTabla.value);
//     //si tablasel es vacío, mostrar alerta
//     if (!passwordCheck1.value || passwordCheck1.value === "" || passwordCheck1.value === null || passwordCheck1.value === undefined || passwordCheck1.value.trim() === "") {
//       alert("Introduce tu contraseña de usuario para continuar.");
//       return;
//     }
//     //si passwordCheck1.value es el password del usuario, preguntar si quiere continuar.
//     //to do

//     // if (!newpassId.value || newpassId.value === "" || newpassId.value === null || newpassId.value === undefined || newpassId.value.trim() === "") {
//     //   if (!confirm("Contraseña vacía ¿Seguro que quieres borrar la contraseña?")) {
//     //     return; //Si no acepta, no hace nada.
//     //   }
//     //   //si acepta cambiar valor a "Sin contraseña añadida, por favor, añade una"
//     //   newpassId.value="Sin contraseña añadida, por favor, añade una";
//     // }

//     //iterar por cada elemento de collections, llamando a cambiarPassword en cada iteración y dando el valor de collections[i]
//     for (let i = 0; i < collections.length; i++) {
//       cambiarPassword(collections[i], newpassId.value);
//       console.log("Eliminado password de " + collections[i]);
//     }    
//     // Mostrar alerta de registro exitoso
//     alert("Se han eliminado los passwords de todos los expertickets.");
//     //borrar contenido de newpass-id
//     passwordCheck1.value = "";
//   }