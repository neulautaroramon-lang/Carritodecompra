import { db, firebaseConfigurado } from "./firebase-config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { leerCarrito, guardarCarrito, formatoPrecio, aviso } from "./comun.js";

const lista = document.getElementById("lista");
const total = document.getElementById("totalapagar");
const boton = document.getElementById("finalizarcompra");
const vaciar = document.getElementById("vaciarcarrito");

// Calcular totales
export const calcularTotal = (carrito) => carrito.reduce((acc, p) => acc + p.precio, 0);

const cargar = () => {
  const carrito = leerCarrito();
  lista.innerHTML = "";
  if (carrito.length === 0) {
    lista.innerHTML = `<tr><td colspan="6" class="vacio">Tu carrito está vacío. <a href="index.html">Ver programas</a></td></tr>`;
  }
  for (let producto of carrito) {
    const fila = document.createElement("tr");
    fila.id = producto.id;
    fila.innerHTML = `
      <td><img src="${producto.imagen}" alt="${producto.nombre}"></td>
      <td>${producto.nombre}</td>
      <td>${producto.cantidad}</td>
      <td>${formatoPrecio(producto.precio_unitario ?? producto.precio / producto.cantidad)}</td>
      <td><strong>${formatoPrecio(producto.precio)}</strong></td>
      <td><button class="btn-eliminar" title="Eliminar">✕</button></td>`;
    fila.querySelector(".btn-eliminar").addEventListener("click", () => eliminarProducto(producto.id));
    lista.appendChild(fila);
  }
  const cantidad = carrito.reduce((a, p) => a + p.cantidad, 0);
  document.getElementById("cantidadtotal").textContent = cantidad;
  total.textContent = formatoPrecio(calcularTotal(carrito));
  boton.disabled = carrito.length === 0;
  vaciar.disabled = carrito.length === 0;
};

const eliminarProducto = (idproductoeliminar) => {
  if (!confirm("¿Seguro que querés eliminar este programa del carrito?")) return;
  guardarCarrito(leerCarrito().filter(p => p.id !== idproductoeliminar));
  aviso("Programa eliminado", "error");
  cargar();
};

vaciar.addEventListener("click", () => {
  if (!confirm("¿Vaciar todo el carrito?")) return;
  guardarCarrito([]);
  cargar();
});

const finalpago = async () => {
  const carrito = leerCarrito();
  if (carrito.length === 0) return;
  const compra = {
    fecha: new Date().toISOString(),
    productos: carrito,
    total: calcularTotal(carrito)
  };
  // Historial de compras en localStorage
  const historial = JSON.parse(localStorage.getItem("historial")) || [];
  historial.unshift(compra);
  localStorage.setItem("historial", JSON.stringify(historial));
  // También se guarda la compra en Firebase (colección "compras")
  if (firebaseConfigurado) {
    try { await addDoc(collection(db, "compras"), compra); }
    catch (e) { console.error("No se pudo guardar la compra en Firebase", e); }
  }
  guardarCarrito([]);
  cargar();
  document.getElementById("modaltotal").textContent = formatoPrecio(compra.total);
  document.getElementById("modalexito").showModal();
};
boton.addEventListener("click", finalpago);
document.getElementById("cerrarmodal").addEventListener("click", () => document.getElementById("modalexito").close());

cargar();
