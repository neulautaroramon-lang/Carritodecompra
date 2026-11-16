import { db, firebaseConfigurado } from "./firebase-config.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { programas } from "./datos-iniciales.js";

const log = document.getElementById("log");
document.getElementById("btnsubir").addEventListener("click", async () => {
  if (!firebaseConfigurado) { log.textContent = "Primero pegá tu configuración en js/firebase-config.js"; return; }
  log.textContent = "Subiendo...\n";
  try {
    for (const p of programas) {
      await setDoc(doc(db, "productos", String(p.codigo)), p);
      log.textContent += `✔ ${p.nombre}\n`;
    }
    log.textContent += "\nListo: los 10 programas están en Firestore (colección 'productos').";
  } catch (e) {
    log.textContent += "\nError: " + e.message + "\nLas reglas no permiten crear programas desde la web (por seguridad). Para cargarlos, habilitá la escritura temporalmente en firestore.rules o cargalos desde la consola de Firebase, y después volvé a publicar las reglas.";
  }
});
