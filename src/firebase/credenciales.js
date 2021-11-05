// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";

// Añade aquí tus credenciales
const firebaseConfig = {
  apiKey: "AIzaSyDt8LnsU73RAddL7J4hphQ2sDho4VsEWMY",
  authDomain: "copia-discord-805f0.firebaseapp.com",
  projectId: "copia-discord-805f0",
  storageBucket: "copia-discord-805f0.appspot.com",
  messagingSenderId: "255067503930",
  appId: "1:255067503930:web:3a56ce7ebb3102d709a403"
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;
