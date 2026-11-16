// Funciones compartidas por todas las páginas
export const leerCarrito = () => JSON.parse(localStorage.getItem("carrito")) || [];

export const guardarCarrito = (carrito) => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
};

export const formatoPrecio = (n) => "$ " + Number(n).toLocaleString("es-AR");

// Icono del carrito con la notificación de cantidad
export const actualizarContador = () => {
  const total = leerCarrito().reduce((acc, p) => acc + p.cantidad, 0);
  const badge = document.getElementById("contadorcarrito");
  if (!badge) return;
  badge.textContent = total;
  badge.style.display = total > 0 ? "flex" : "none";
  badge.classList.remove("pop");
  void badge.offsetWidth; // reinicia la animación
  badge.classList.add("pop");
};

// Mensaje flotante (reemplaza a los alert)
export const aviso = (texto, tipo = "ok") => {
  const t = document.createElement("div");
  t.className = `toast toast-${tipo}`;
  t.textContent = texto;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add("visible"), 10);
  setTimeout(() => { t.classList.remove("visible"); setTimeout(() => t.remove(), 300); }, 2600);
};

actualizarContador();
