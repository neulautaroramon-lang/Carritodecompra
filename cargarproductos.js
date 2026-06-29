const productos = [
{
id:1,
nombre:"Iniciación al Fútbol",
imagen:"img/pelota.jpg",
descripcion:"Aprendizaje básico para niños que comienzan en el fútbol.",
precio:12000,
stock:"Vacantes: 15"
},
{
id:2,
nombre:"Técnica Individual",
imagen:"img/Técnica Individual.jpg",
descripcion:"Control, pase, recepción y conducción del balón.",
precio:15000,
stock:"Vacantes: 12"
},
{
id:3,
nombre:"Preparación Física",
imagen:"img/Preparación Física.jpeg",
descripcion:"Entrenamiento de velocidad, resistencia y fuerza.",
precio:18000,
stock:"Vacantes: 10"
},
{
id:4,
nombre:"Entrenamiento para Arqueros",
imagen:"img/Entrenamiento para Arqueros.jpg",
descripcion:"Técnicas específicas para guardametas.",
precio:17000,
stock:"Vacantes: 8"
},
{
id:5,
nombre:"Definición y Remate",
imagen:"img/Definición y Remate.jpeg",
descripcion:"Mejora de tiros al arco y precisión.",
precio:16000,
stock:"Vacantes: 10"
},
{
id:6,
nombre:"Táctica de Juego",
imagen:"img/Táctica de Juego.jpg",
descripcion:"Posicionamiento y estrategias colectivas.",
precio:20000,
stock:"Vacantes: 6"
},
{
id:7,
nombre:"Fútbol Competitivo",
imagen:"img/Fútbol Competitivo.jpg",
descripcion:"Preparación para torneos y competencias.",
precio:22000,
stock:"Vacantes: 5"
},
{
id:8,
nombre:"Entrenamiento Personalizado",
imagen:"img/Entrenamiento Personalizado.jpg",
descripcion:"Sesiones individuales con entrenador.",
precio:30000,
stock:"Vacantes: 4"
},
{
id:9,
nombre:"Campus de Vacaciones",
imagen:"img/Campus de Vacaciones.jpg",
descripcion:"Jornadas intensivas durante vacaciones.",
precio:25000,
stock:"Vacantes: 20"
},
{
id:10,
nombre:"Alto Rendimiento",
imagen:"img/Alto Rendimiento.jpeg",
descripcion:"Programa avanzado para futbolistas destacados.",
precio:35000,
stock:"Vacantes: 3"
}
];
function cargar() {
    for (let i = 0; i < productos.length; i = i + 1) {
        let parrafo = document.createElement("div")
        parrafo.id= "boxproducto"
        parrafo.innerHTML=`<h2 id="nombre">${productos[i].nombre}</h2>
                        <img src="${productos[i].imagen}" alt="" id="" width="200">
                        <p id="detalle">${productos[i].descripcion}</p>
                        <h3 id="precio">$ ${productos[i].precio}</h3>
                        <p id="stock">${productos[i].stock}</p>
                        <button id="btndetalle" onclick="verdetalle(${productos[i].id})">Ver detalle</button>`
        document.getElementById("boxproductos").appendChild(parrafo)
    }
}
cargar()

function verdetalle(idproducto) {
  const buscarProducto = productos.find(producto => producto.id === parseInt(idproducto));
  let productojson = JSON.stringify(buscarProducto)
  localStorage.setItem("producto", productojson)
  window.location.href ="detalles.html"
}