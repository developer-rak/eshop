import React, { useState } from 'react';
import "./auth.scss";
import Card from '../../components/card/Card';
import resetImg from "../../assets/forgot.png";
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { toast } from 'react-toastify';

const Reset = () => {
  const [email, setEmail] = useState("");

  const resetPassword = (e) => {
    e.preventDefault()

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Check your email for reset link")
      })
      .catch((error) => {
        toast.error(error.message)
      });
    }

  return (
    <section className="container auth">
      <div className="img">
        <img src={resetImg} alt="LoginImg" width="400" />
      </div>
      <Card>
        <div className="form">
          <h2>Reset Password</h2>
          <form onSubmit={resetPassword}>
            <input 
              type="email" 
              placeholder='Email' 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button 
              className="--btn --btn-primary --btn-block"
              type='submit'
            >
              Reset
            </button>
            <div className="links">
              <p>
                <Link to="/login">- Login</Link>              
              </p>
              <p>
                <Link to="/register">- Register</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </section>
  )
}

export default Reset;
