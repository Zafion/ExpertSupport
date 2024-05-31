//importaciones
import { ManageAccount } from './firebaseconect.js';
import { getPassword } from './firebaseconect.js';
import { cambiarPassword } from './firebaseconect.js';

window.addEventListener('DOMContentLoaded', (event) => {
  console.log('index.js cargado correctamente')  
})

// Creamos una instancia de manageAccount
const manageAccount = new ManageAccount();

// Definimos los elementos del DOM que vamos a utilizar
const resetBtn = document.getElementById("reset-button");
const newpassId = "Sin contraseña añadida, por favor, añade una";

// Listeners para los botones y demás elementos.
resetBtn.addEventListener("click", handleClick.resetBtn); // Escucha el clic en el botón de nueva contraseña


// a medio hacer. sólo cambiado valor de newpassId.

// Escuchar clic en resetBtn que llama a cambiarPassword
// con cambiarPassword actualiza contraseña con el valor de newpassId
resetBtn.addEventListener("click", () => {
    //console.log("newpassId: " + newpassId.value);
    console.log("tablasel: " + selectorTabla.value);
    //si tablasel es vacío, mostrar alerta
    if (selectorTabla.value === "Selecciona Expeticket...") {
      alert("Por favor, selecciona una tabla antes de continuar.");
      return;
    }
    //si newpassId.value es vacío o está formado por espacios, preguntar si quiere continuar.
    if (!newpassId.value || newpassId.value === "" || newpassId.value === null || newpassId.value === undefined || newpassId.value.trim() === "") {
      if (!confirm("Contraseña vacía ¿Seguro que quieres borrar la contraseña?")) {
        return; //Si no acepta, no hace nada.
      }
      //si acepta cambiar valor a "Sin contraseña añadida, por favor, añade una"
      newpassId.value="Sin contraseña añadida, por favor, añade una";
    }
    // Llamar a cambiarPassword de la tabla seleccionada con el valor de newpassId
    cambiarPassword(selectorTabla.value,  newpassId.value); 
    // Mostrar alerta de registro exitoso
    alert("Contraseña de " + selectorTabla.value + " actualizada.");
    //borrar contenido de newpass-id
    newpassId.value = "";
    //desactiva 'switch-show' por seguridad
    document.getElementById('switch-show').checked = false;
    // Mostrar asteriscos
    passwordElement.textContent = '*************';
  })