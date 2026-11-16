import { db, firebaseConfigurado } from "./firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { formatoPrecio, aviso } from "./comun.js";
import { programas } from "./datos-iniciales.js";

let productos = [];
const contenedor = document.getElementById("boxproductos");

const obtenerProductos = async () => {
  if (!firebaseConfigurado) {
    document.getElementById("avisofirebase").hidden = false;
    return programas.map(p => ({ id: String(p.codigo), ...p }));
  }
  const snapshot = await getDocs(collection(db, "productos"));
  return snapshot.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (a.codigo ?? 0) - (b.codigo ?? 0));
};

const dibujar = (lista) => {
  contenedor.innerHTML = "";
  if (lista.length === 0) {
    contenedor.innerHTML = `<p class="vacio">No hay programas cargados. Usá <a href="subir-productos.html">subir-productos.html</a> para cargarlos en Firebase.</p>`;
    return;
  }
  for (let producto of lista) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "card";
    tarjeta.innerHTML = `
      <div class="card-img">
        <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
        <span class="chip">${producto.categoria ?? "Programa"}</span>
      </div>
      <div class="card-body">
        <h2>${producto.nombre}</h2>
        <p>${producto.descripcion}</p>
        <div class="card-pie">
          <strong>${formatoPrecio(producto.precio)}</strong>
          <span class="vacantes">${producto.stock} vacantes</span>
        </div>
        <button class="btn btn-verde btndetalle">Ver detalle</button>
      </div>`;
    tarjeta.querySelector(".btndetalle").addEventListener("click", () => verdetalle(producto.id));
    contenedor.appendChild(tarjeta);
  }
};

const verdetalle = (idproducto) => {
  const buscarProducto = productos.find(p => p.id === idproducto);
  localStorage.setItem("producto", JSON.stringify(buscarProducto));
  window.location.href = "detalles.html";
};

// Buscador
document.getElementById("buscador").addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase();
  dibujar(productos.filter(p => p.nombre.toLowerCase().includes(q)));
});

const cargar = async () => {
  contenedor.innerHTML = `<p class="vacio">Cargando programas desde Firebase...</p>`;
  try {
    productos = await obtenerProductos();
    dibujar(productos);
  } catch (error) {
    console.error(error);
    contenedor.innerHTML = `<p class="vacio">No se pudieron cargar los programas. Revisá la configuración de Firebase.</p>`;
    aviso("Error al conectar con Firebase", "error");
  }
};
cargar();
