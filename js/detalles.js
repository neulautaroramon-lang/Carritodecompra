import { leerCarrito, guardarCarrito, formatoPrecio, aviso } from "./comun.js";

const productojson = JSON.parse(localStorage.getItem("producto"));
const caja = document.getElementById("boxdetalle");
let contar = 0;

const cargar = () => {
  if (!productojson) {
    caja.innerHTML = `<p class="vacio">No elegiste ningún programa. <a href="index.html">Volver al inicio</a></p>`;
    return;
  }
  const yaEnCarrito = leerCarrito().find(p => p.id === productojson.id)?.cantidad || 0;
  caja.innerHTML = `
    <div class="detalle-img"><img src="${productojson.imagen}" alt="${productojson.nombre}"></div>
    <div class="detalle-info">
      <span class="chip">${productojson.categoria ?? "Programa"}</span>
      <h2>${productojson.nombre}</h2>
      <p>${productojson.descripcion}</p>
      <h3>${formatoPrecio(productojson.precio)} <small>/ mes</small></h3>
      <p class="vacantes">Vacantes disponibles: ${productojson.stock}${yaEnCarrito ? ` · ya tenés ${yaEnCarrito} en el carrito` : ""}</p>
      <div id="boxcontador">
        <button id="btnrestar" aria-label="Restar">−</button>
        <p id="contador">0</p>
        <button id="btnsumar" aria-label="Sumar">+</button>
      </div>
      <p id="subtotal">Subtotal: ${formatoPrecio(0)}</p>
      <button id="btnagregar" class="btn btn-verde">Agregar al carrito</button>
    </div>`;
  document.getElementById("btnrestar").addEventListener("click", restar);
  document.getElementById("btnsumar").addEventListener("click", sumar);
  document.getElementById("btnagregar").addEventListener("click", agregar);
};

const refrescar = () => {
  document.getElementById("contador").textContent = contar;
  document.getElementById("subtotal").textContent = "Subtotal: " + formatoPrecio(contar * productojson.precio);
};

const restar = () => { if (contar > 0) { contar--; refrescar(); } };

const sumar = () => {
  const yaEnCarrito = leerCarrito().find(p => p.id === productojson.id)?.cantidad || 0;
  if (contar + yaEnCarrito < Number(productojson.stock)) { contar++; refrescar(); }
  else aviso("No hay más vacantes disponibles", "error");
};

const agregar = () => {
  if (contar === 0) return aviso("Elegí la cantidad de inscripciones", "error");
  const carrito = leerCarrito();
  const existente = carrito.find(p => p.id === productojson.id);
  if (existente) {
    existente.cantidad += contar;
    existente.precio = existente.precio_unitario * existente.cantidad;
  } else {
    carrito.push({
      id: productojson.id,
      imagen: productojson.imagen,
      nombre: productojson.nombre,
      cantidad: contar,
      precio_unitario: Number(productojson.precio),
      precio: Number(productojson.precio) * contar
    });
  }
  guardarCarrito(carrito);
  aviso("¡Agregado al carrito!");
  setTimeout(() => (window.location.href = "carrito.html"), 700);
};

cargar();
