// ===============================================
//  CONFIGURACIÓN DE FIREBASE
//  1. Entrá a https://console.firebase.google.com
//  2. Creá un proyecto > Agregar app Web (</>)
//  3. Copiá tu "firebaseConfig" y pegalo acá abajo
//  4. En "Firestore Database" creá la base (modo prueba)
// ===============================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAyOnGVwjvSPrNt-bTlZIxo_CHwuq1BOp8",
  authDomain: "primertoque-8d0f3.firebaseapp.com",
  projectId: "primertoque-8d0f3",
  storageBucket: "primertoque-8d0f3.firebasestorage.app",
  messagingSenderId: "543190947905",
  appId: "1:543190947905:web:fcd28efa54bb1bf2504ec0"
};

export const firebaseConfigurado = !firebaseConfig.apiKey.startsWith("TU_");
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
