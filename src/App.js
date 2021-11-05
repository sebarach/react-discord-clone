import React,{useState} from "react";
import Login from "./views/Login";
import Sidebar from "./views/Sidebar";
import ChatScreen from "./views/ChatScreen";
//Importamos la aplicación/credenciales
import firebaseApp from "./firebase/credenciales";
// Conforme se necesite, importar los demás servicios y funciones. Por ejemplo:
import { getAuth, onAuthStateChanged} from "firebase/auth";



const auth = getAuth(firebaseApp); 

function App() {
  const [usuarioGlobal,setUsuarioGlobal] = useState(null);
  const [canalActivo,setCanalActivo] = useState(null);

  onAuthStateChanged(auth,(usuarioFirebase) =>
  {
    if(usuarioFirebase)
    {
      setUsuarioGlobal(usuarioFirebase);
    }else
    {
      setUsuarioGlobal(null);
    }
  })

  return (
    <div className='app'>
    {
      usuarioGlobal ? (
        <>
        <Sidebar 
        usuarioGlobal  = {usuarioGlobal} 
        setCanalActivo = {setCanalActivo}
        /> 
        <ChatScreen 
        canalActivo = {canalActivo}
        usuarioFirebase = {usuarioGlobal}
        />
        </>
      ) :(
        <>
        <Login/>
        </>
      )
    }

    </div>
  );
}

export default App;
