import React, { useState } from 'react';
import "./auth.scss";

import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';
import registerImg from "../../assets/register.png";

// Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Loader from '../../components/loader/Loader';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault()
      if (password !== cPassword) {
        toast.error("Password do not match.");
      }
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      const user = userCredential.user;
      console.log(user)
      setIsLoading(false)
      toast.success("Registration Successful.")
      navigate("/login")
      })
    .catch((error) => {
      toast.error(error.message)
      setIsLoading(false)
      });
  }

  return (
    <>
    <ToastContainer />
    { isLoading && <Loader /> }
    <section className="container auth">
      <Card>
        <div className="form">
          <h2>Register</h2>

          <form onSubmit={registerUser}>
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
            <input 
              type="password" 
              placeholder='Confirm Password' 
              required 
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
            />
            <button 
              className="--btn --btn-primary --btn-block" 
              type='submit'
            >
              Register
            </button>
          </form>

          <span className='register'>
            <p>Already an account? </p>
            <Link to="/login">Login</Link>
          </span>
        </div>
      </Card>
      <div className="img">
        <img src={registerImg} alt="RegisterImg" width="400" />
      </div>
    </section>
    </>
  )
}

export default Register;