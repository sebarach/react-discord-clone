import React,{useState,useEffect,useRef}from 'react'
import {AddCircle,CreditCard,Gif,EmojiEmotions} from '@material-ui/icons'
import HeaderChat from '../components/HeaderChat';
import Mensajes from '../components/Mensajes';


import firebaseApp from '../firebase/credenciales';
import { getFirestore,doc,setDoc, Firestore,collection,getDocs} from '@firebase/firestore';

const db = getFirestore(firebaseApp);


function ChatScreen({canalActivo,usuarioFirebase}) {

    const [inputMensaje,setInputMensaje] = useState('');
    const [listaMensaje,setListaMensaje] = useState([]);
    const anchor = useRef();


    async function getMensajes()
    {
        const mensajesARR= [];
        const coleccion = collection(db,`canales/${canalActivo}/mensajes`);
        const docs = await getDocs(coleccion);
        docs.forEach((mensaje) =>{
            mensajesARR.push(mensaje.data());
        });
        setListaMensaje([...mensajesARR]);
    }

    useEffect(
        () => getMensajes()
        ,[canalActivo]);

        useEffect(
            () => anchor.current.scrollIntoView({
                behavior: "smooth"
              })
            ,[listaMensaje]);



    function enviarMensaje(e){
        e.preventDefault();
        const docuRef = doc(db,
            `canales/${canalActivo}/mensajes/${new Date().getTime()}`
            );
        setDoc(docuRef,
            {
                foto:usuarioFirebase.photoURL,
                usuario:usuarioFirebase.email,
                mensaje:inputMensaje,
                id:new Date().getTime(),
            });

            setInputMensaje('');
            getMensajes();
            anchor.current.scrollIntoView({behavior:'smooth'});
    }

    return (
        <div className='chat'>
           <HeaderChat canalActivo={canalActivo}/>


        <div className='chat__messages'>
            {
                listaMensaje ?
                    listaMensaje.map(mensaje=>{
                     return <Mensajes mensajeFirebase={mensaje}/>
                    })
             : null
             }
             <div ref={anchor} style={{marginBottom:'15px'}} autofocus></div>
            </div>

        
        <div className='chat__input'>

            <AddCircle fontSize='large' />

        <form onSubmit={enviarMensaje}>
            
        <input type='text' 
        disabled ={canalActivo ? false : true}
        value={inputMensaje} onChange={(e) =>
            setInputMensaje(e.target.value)
        } placeholder={`Enviar mensaje a #${canalActivo || ''}`} />


        <button 
        disabled ={canalActivo ? false : true}
        className='chat__inputButton' 
        type='submit'>
            Enviar
        </button>

        </form>

        <div className='chat__inputIcons'>
            <CreditCard fontSize='large'/>
            <Gif fontSize='large'/>
            <EmojiEmotions fontSize='large'/>
        </div>


        </div>
        </div>
    )
}

export default ChatScreen
