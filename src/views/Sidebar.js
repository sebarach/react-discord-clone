import React,{useState,useEffect} from 'react'
import {Avatar} from '@material-ui/core';
import {ExpandMore,Add,Mic,Settings,Headset, CallMergeSharp} from '@material-ui/icons';
import CanalSideBar from '../components/CanalSideBar';

import firebaseApp from '../firebase/credenciales';
import {getFirestore,doc,setDoc,collection,getDocs} from 'firebase/firestore';
import { getAuth,signOut } from '@firebase/auth';

const auth = getAuth(firebaseApp);

const firestore = getFirestore(firebaseApp);

function Sidebar({usuarioGlobal,setCanalActivo}) {

    const [listaCanales,setListaCanales] = useState([]);

    async function getData(){
        const data = []
        const datos = collection(firestore,'canales');
        const canalesCifrados = await getDocs(datos);
        canalesCifrados.forEach(canalCifrado=>{
        data.push(canalCifrado.data());
        })
        setListaCanales(data);
    }


// cargar una vez
useEffect(()=>{
    getData();
} , [])
  
    function agregarCanal(){
        const nombreCanal = prompt('Ingrese nombre de Canal');
        if(nombreCanal){
            const docuRef = doc(firestore,`canales/${nombreCanal}`);
            setDoc(docuRef,{
                id : new Date().getTime(),
                nombre : nombreCanal,
            })
            getData();
        }
    }   

    return (
        <div className='sidebar'>
            <div className='sidebar__top'>
                <h3>Servidor de Test !!!</h3>
                <ExpandMore/>
            </div>

        <div className='sidebar__channels'>
            <div className='sidebar__channelsHeader'>
                <div className='sidebar__header'>
                    <ExpandMore/>
                    <h4>Canales de Texto</h4>
                </div>

                <Add className='sidebar__addChannel' onClick={agregarCanal} />
            </div>

        <div className='sidebar__channelsList'>
            {listaCanales ? listaCanales.map((canal) =>{
                return (
                    <div onClick={()=> setCanalActivo(canal.nombre)}> 
                <CanalSideBar nombreCanal={canal.nombre}/>
                    </div>
                );
            }) : null}
        </div>

        </div>

        <div className='sidebar__profile'>
            <Avatar src={usuarioGlobal.photoURL} />
            <div className='sidebar__profileInfo'>
                <h3>{usuarioGlobal.displayName}</h3>
                <p>{usuarioGlobal.uid.substring(0,4)}</p>
            </div>
            <div className='sidebar__profileIcons'>
            <Mic/>
            <Headset />
            <Settings onClick={() =>signOut(auth)}/>
        </div>
        </div>



    </div>
    )
}

export default Sidebar
