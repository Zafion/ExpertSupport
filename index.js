
// Definimos los elementos del DOM que vamos a utilizar
const expertEnv = document.getElementById("expert-env")
const expertType = document.getElementById("expert-type")
const expertId = document.getElementById("expert-id")
const expertBtn = document.getElementById("expert-button")
const freshTicket = document.getElementById("fresh-ticket")
const freshBtn = document.getElementById("fresh-button")
const devopsWI = document.getElementById("devops-wi")
const devopsBtn = document.getElementById("devops-button")
const openSwitch = document.getElementById("switch")
const expertCust = document.getElementById("expert-customer")

// Definimos las URL bases para los diferentes servicios
const freshBase = "https://freshdesk.experticket.com/a/tickets/"
const devopsBase = "https://dev.azure.com/experticket/Experticket/_workitems/edit/"


// Objeto con funciones para manejar los clics en los botones
const handleClick = {
  experTicket: function () { // Verifica si la longitud del identificador es correcta
    if (expertId.value.length === 13 || expertId.value.length === 19) {
      if (openSwitch.checked) { // Verifica si la opción de abrir en una nueva pestaña está activada
        window.open(expertEnv.value + expertType.value + expertId.value, "_blank"); //si lo está abre la URL en una nueva pestaña
      } else {
        window.location = expertEnv.value + expertType.value + expertId.value //si no Redirige a la URL en la misma pestaña
      }
    } else { // Muestra una alerta si el identificador no tiene la longitud adecuada
      alert("El identificador debe tener 13 (19 para las ventas)")
    }
  },
  freshDesk: function () { // Función para manejar el clic en el botón de Freshdesk
    if (openSwitch.checked) {
      window.open(freshBase + freshTicket.value, "_blank");
    } else {
      window.location = freshBase + freshTicket.value
    }
  },
  devOps: function () { // Función para manejar el clic en el botón de DevOps
    if (openSwitch.checked) {
      window.open(devopsBase + devopsWI.value, "_blank");
    } else {
      window.location = devopsBase + devopsWI.value
    }
  }
}

// Función para manejar el presionar teclas enter del teclado
const handleKeyPress = (e) => {
  console.log(e)
    if (e.code == "Enter" || e.code == "NumpadEnter") {
      switch (e.target.id) {
        case "expert-id":
          handleClick.experTicket()
          break;
        case "devops-wi":
          handleClick.devOps()
          break;
        case "fresh-ticket":
          handleClick.freshDesk();
          break;
      }
    }
  }

// Función para manejar el cambio en el desplegable de entorno de Experticket
const handleChangeEnv = () => {
  console.log("Cambió")
}

expertEnv.addEventListener("change", handleChangeEnv) // Escucha el cambio en el desplegable de entorno
freshBtn.addEventListener("click", handleClick.freshDesk) // Escucha el clic en el botón de Freshdesk
devopsBtn.addEventListener("click", handleClick.devOps) // Escucha el clic en el botón de DevOps
expertId.addEventListener("keydown", handleKeyPress) // Escucha la pulsación de teclas en el campo de identificador de Experticket
freshTicket.addEventListener("keydown", handleKeyPress) // Escucha la pulsación de teclas en el campo de número de ticket de Freshdesk
devopsWI.addEventListener("keydown", handleKeyPress) // Escucha la pulsación de teclas en el campo de número de Work Item de DevOps

//expertBtn.addEventListener("click", handleClick.experTicket) // Escucha el clic en el botón de Experticket sustituido por comprobador de selección de abajo.

expertBtn.addEventListener("click", function() { // Escucha el clic en el botón de Experticket
  var selectedOption = expertEnv.value;
  if (selectedOption === 'Selecciona entorno...') {
    alert('Por favor, selecciona un entorno (PRE o PRO) antes de continuar.');
  } else {
    handleClick.experTicket();
  }
})