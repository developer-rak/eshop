import React, { useState } from 'react';
import "./auth.scss";

import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';
import loginImg from "../../assets/login.png";
import { FaGoogle } from 'react-icons/fa';

// Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { auth } from '../../firebase/config';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import Loader from '../../components/loader/Loader';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();


  const loginUser = (e) => {
    e.preventDefault()
    setIsLoading(true)

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        setIsLoading(false)
        toast.success("Login Successful...")
        navigate("/")
      })
      .catch((error) => {
        setIsLoading(false)
        toast.error("Your account or Password do not match.")
      });
  }

  // Login with Google
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    setIsLoading(true)
    
    signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      setIsLoading(false)
      toast.success("Login Successfully.")
      navigate("/") 
      console.log(user)
    })
    .catch((error) => {
      setIsLoading(false)
      toast.error(error.message)
    });
  }

  return (
    <>
    <ToastContainer />
    { isLoading && <Loader /> }
    <section className="container auth">
      <div className="img">
        <img src={loginImg} alt="LoginImg" width="400" />
      </div>
      <Card>
        <div className="form">
          <h2>Login</h2>
          <form onSubmit={loginUser}>
            <input 
              type="email" 
              placeholder='Email' 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="password" 
              placeholder='Password' 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              className="--btn --btn-primary --btn-block"
              type='submit'
            >
              Login
            </button>
            <div className="links">
              <Link to="/reset">Reset Password</Link>
            </div>
            <p>-- or --</p>
          </form>
          <button 
            className="--btn --btn-danger --btn-block"
            onClick={signInWithGoogle}
          >
            <FaGoogle color='#fff' />
            Login With Google
          </button>
          <span className='register'>
            <p>Don't have an account? </p>
            <Link to="/register">Register</Link>
          </span>
        </div>
      </Card>
    </section>
    </>
  )
}

export default Login;
