import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/contextAuth';
import { Grid } from '@mui/material';
import '../Login/Login.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const { googleSignIn, facebookSignIn, createUser, logout, user } = UserAuth()

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn().then((res) => {
                navigate('/')
            })
        } catch (error) {
            // console.log(error)
        }
    }

    const handleFacebookSignIn = async () => {
        try {
            await facebookSignIn().then((res) => {
                navigate("/")
            })
        } catch (error) {
            // console.log(error)
        }
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            createUser(email, password).then(
                window.location.href = '/login/'
            )
        } catch (err) {
            // console.log(err)
        }
    }

    const handleLogout = async () => {
        try {
            await logout()
        } catch (error) {
            // console.log(error)
        }
    }

    useEffect(() => {
        if (user != null) {
            navigate('/start/')
        }
    }, [user])

    return (
        <div className="loginPage">
            <div className="authLogo">
                <Link to="/"><h1 style={{ textAlign: "center", fontSize: "4rem", color: "white" }}>Quick Wiz</h1></Link>            
            </div>
            <div className="loginSection">
                <Grid container flexDirection="column" justifyContent="center">
                    <Grid container item flexDirection="column" justifyContent="center">
                        <h1 style={{ color: "black", marginBottom: "10px", textAlign: "center" }}>Register</h1>
                        <input type="email" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} />
                        <input type="password" value={password} placeholder='Password' onChange={e => setPassword(e.target.value)} />
                        <button type="submit" className="Btn centerBtn" style={{ position: "relative", top: '5px' }} onClick={handleSignUp}>Create Account</button>
                    </Grid>
                    <hr />
                    <Grid container item flexDirection="column">
                        <button className="centerBtn googleBtn" onClick={handleGoogleSignIn}><GoogleIcon style={{ position: "relative", right: "10px", fontSize: "2rem" }} />Continue with Google</button>
                        <button className="centerBtn facebookBtn" onClick={handleFacebookSignIn}><FacebookIcon style={{ position: "relative", right: "5px", fontSize: "2rem" }} />Continue with Facebook</button>
                        <p style={{ textAlign: "center", marginTop: "1rem" }}><Link to="/login/">Already have an account? Sign in here.</Link></p>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Signup