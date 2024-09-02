import React, { useState } from 'react';
import "./auth.scss";

import { Link } from 'react-router-dom';
import Card from '../../components/card/Card';
import registerImg from "../../assets/register.png";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const registerUser = (e) => {
    e.preventDefault()
      console.log(email, password, cPassword)
  }

  return (
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
  )
}

export default Register;