import React from 'react'
import {Button} from '@material-ui/core';

import firebaseApp from '../firebase/credenciales';
import {getAuth,GoogleAuthProvider,signInWithRedirect} from 'firebase/auth';

const auth = getAuth(firebaseApp);
const gProvider = new GoogleAuthProvider();

function login() 
{
    function logInConGoogle()
    {
        signInWithRedirect(auth,gProvider);
    }

    return (
        <div className='login'>
            <div className = 'login__logo'>
                <img src='https://image.shutterstock.com/image-photo/young-businesswoman-working-on-his-600w-1930752182.jpg' alt=''/>
            </div>
            <Button onClick={logInConGoogle}>Acceder Con Google</Button>
        </div>
    )
}

export default login
