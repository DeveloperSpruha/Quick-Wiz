import {useContext, createContext, useEffect, useState} from 'react';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({})

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then((res) => {
            return res
        });
    };

    const facebookSignIn = () => {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider);
    };

    const createUser = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
            console.log("User created")
        }).catch((err) => {
            console.log(err)
        })
    }

    const normalLogin = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
            console.log("User Signed in!")
        }).catch((err) => {
            console.log(err)
        })
    }

    const logout = () => {
        signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            // console.log("User: ", currentUser)
        })
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <AuthContext.Provider value={{ googleSignIn, facebookSignIn, logout, createUser, normalLogin, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}