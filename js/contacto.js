import { aviso } from "./comun.js";
document.getElementById("formcontacto").addEventListener("submit", (e) => {
  e.preventDefault();
  aviso("¡Mensaje enviado! Te contactamos pronto.");
  e.target.reset();
});
