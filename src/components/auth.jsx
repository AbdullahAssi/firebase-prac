import React from 'react'
import { auth, googleprovider } from '../config/firebase'
import { createUserWithEmailAndPassword , signInWithPopup,signOut } from 'firebase/auth'


function Auth() {
    const [email, setemail] = React.useState("")
    const [password, setpassword] = React.useState("")

    const signIn = async ()=>{
        try{
            await createUserWithEmailAndPassword(auth, email, password)
        }
        catch(err){
            console.err(err)
        }
    };
    const signInwGoogle = async()=>{
        try{
            await signInWithPopup (auth, googleprovider)
        }
        catch(err){
            console.error(err)
        }
    }

    const logout = async ()=> {
        try{
            await signOut(auth)
        }
        catch(err){
            console.error(err)
        }
    }

    return (
        <div className='form'>
            <input type="email" 
                placeholder='Enter Your Email'
                onChange={ (e) => setemail(e.target.value)}
                name='email'
                />

            <input type="password"
                placeholder='Enter Your Password'
                onChange={ (e) => setpassword(e.target.value)}
            />
            <button onClick={signIn}>Sign In</button>
            <button onClick={signInwGoogle}>Sign In with google</button>
            <button onClick={logout}>Logout </button>
        </div>
    )
}

export default Auth