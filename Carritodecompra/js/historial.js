import { formatoPrecio } from "./comun.js";

const caja = document.getElementById("boxhistorial");
const historial = JSON.parse(localStorage.getItem("historial")) || [];

if (historial.length === 0) {
  caja.innerHTML = `<p class="vacio">Todavía no hiciste ninguna compra.</p>`;
}
historial.forEach((compra, i) => {
  const item = document.createElement("article");
  item.className = "compra";
  item.innerHTML = `
    <header><h3>Compra #${historial.length - i}</h3><time>${new Date(compra.fecha).toLocaleString("es-AR")}</time></header>
    <ul>${compra.productos.map(p => `<li><span>${p.cantidad} × ${p.nombre}</span><span>${formatoPrecio(p.precio)}</span></li>`).join("")}</ul>
    <footer>Total: <strong>${formatoPrecio(compra.total)}</strong></footer>`;
  caja.appendChild(item);
});

document.getElementById("borrarhistorial").addEventListener("click", () => {
  if (confirm("¿Borrar todo el historial?")) { localStorage.removeItem("historial"); location.reload(); }
});
