import React from 'react';
import { auth, googleprovider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

function Auth() {
    const [email, setemail] = React.useState("");
    const [password, setpassword] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");
    const [logoutMessage, setLogoutMessage] = React.useState("");

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setSuccessMessage("Account Created Successfully!");
    } catch (err) {
        setErrorMessage(err.message);
        console.error(err);
    }
};

    const logIn = async () => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        setSuccessMessage(""); 
        setErrorMessage(""); 
    } catch (err) {
        setErrorMessage("Wrong Password");
        console.error(err);
    }
};

    const signInwGoogle = async () => {
        try {
            await signInWithPopup(auth, googleprovider);
            setSuccessMessage("");
            setErrorMessage(""); 
        } catch (err) {
            setErrorMessage(err.message);
            console.error(err);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setLogoutMessage("Logged out successfully!");
        } catch (err) {
            setErrorMessage(err.message);
            console.error(err);
        }
    };

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
                <button onClick={logIn}>Login</button>
                <button onClick={logout}>Logout </button>
            {successMessage && <p className="success">{successMessage}</p>}
            {errorMessage && <p className="error">{errorMessage}</p>}
            {logoutMessage && <p className="success">{logoutMessage}</p>}
        </div>
    );
}

export default Auth;
