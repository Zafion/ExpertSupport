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

const freshBase = "https://freshdesk.experticket.com/a/tickets/"
const devopsBase = "https://dev.azure.com/experticket/Experticket/_workitems/edit/"

const handleClick = {
  experTicket: function () {
    if (expertId.value.length === 13 || expertId.value.length === 19) {
      if (openSwitch.checked) {
        window.open(expertEnv.value + expertType.value + expertId.value, "_blank");
      } else {
        window.location = expertEnv.value + expertType.value + expertId.value
      }
    } else {
      alert("El identificador debe tener 13 (19 para las ventas)")
    }
  },
  freshDesk: function () {
    if (openSwitch.checked) {
      window.open(freshBase + freshTicket.value, "_blank");
    } else {
      window.location = freshBase + freshTicket.value
    }
  },
  devOps: function () {
    if (openSwitch.checked) {
      window.open(devopsBase + devopsWI.value, "_blank");
    } else {
      window.location = devopsBase + devopsWI.value
    }
  }
}

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

const handleChangeEnv = () => {
  console.log("Cambió")
}

expertEnv.addEventListener("change", handleChangeEnv)
expertBtn.addEventListener("click", handleClick.experTicket)
freshBtn.addEventListener("click", handleClick.freshDesk)
devopsBtn.addEventListener("click", handleClick.devOps)
expertId.addEventListener("keydown", handleKeyPress)
freshTicket.addEventListener("keydown", handleKeyPress)
devopsWI.addEventListener("keydown", handleKeyPress)