# ⚽ Academia de Fútbol Elite — Carrito de Compras

Aplicación web de carrito de compras para inscribirse a los programas de entrenamiento de una academia de fútbol. Los programas se cargan desde **Firebase (Cloud Firestore)** y el carrito se guarda en **localStorage**.

## Funcionalidades
- Listado de programas cargados desde Firebase (con buscador).
- Ver detalle de cada programa.
- Elegir cantidad (+ / −) respetando las vacantes disponibles.
- Agregar al carrito (si el programa ya está, suma la cantidad).
- Icono del carrito con notificación de cantidad de productos.
- Tabla del carrito: eliminar productos, vaciar carrito y cálculo de totales.
- Persistencia en localStorage (el carrito no se pierde al recargar).
- Finalizar compra con mensaje de éxito; la compra se guarda en el historial y en Firestore (colección `compras`).
- Historial de compras.

## Tecnologías
- HTML5 semántico
- CSS3 (estilo propio, responsive)
- JavaScript (ES Modules, manejo del DOM, eventos, localStorage)
- Firebase Cloud Firestore (SDK web 10)
- Git + GitHub, despliegue en Vercel

## Estructura
```
index.html            Programas (cargados desde Firebase)
detalles.html         Detalle y cantidad
carrito.html          Tabla del carrito, totales y finalizar compra
historial.html        Historial de compras
contacto.html         Formulario de contacto
subir-productos.html  Herramienta para cargar los programas en Firestore (usar una vez)
js/                   Lógica JavaScript
img/                  Imágenes
```

## Cómo conectar Firebase
1. Entrar a https://console.firebase.google.com y crear un proyecto.
2. *Build → Firestore Database → Crear base de datos* (modo prueba).
3. *Configuración del proyecto → Tus apps → Web (</>)* y copiar el objeto `firebaseConfig`.
4. Pegarlo en `js/firebase-config.js`.
5. Abrir `subir-productos.html` y tocar **Subir programas** (crea la colección `productos`).
6. Opcional: copiar las reglas de `firestore.rules` en *Firestore → Reglas*.

## Cómo probarlo localmente
Como usa módulos de JavaScript, hay que abrirlo con un servidor (no con doble clic):
- VS Code: extensión **Live Server** → clic derecho en `index.html` → *Open with Live Server*.
- o en la terminal: `npx serve .`

## Despliegue en Vercel
1. Subir el proyecto a GitHub.
2. En https://vercel.com → *Add New → Project* → importar el repositorio.
3. Framework preset: **Other**. Sin comando de build. *Deploy*.

## Autores
Grupo — Academia de Fútbol Elite · 2026
