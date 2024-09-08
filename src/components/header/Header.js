import React, { useEffect, useState } from 'react';
import "./Header.scss";
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from 'react-icons/hi';

import { auth } from '../../firebase/config';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast, ToastContainer } from 'react-toastify';
import Loader from '../loader/Loader';
import { useDispatch } from 'react-redux';
import { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } from '../../redux/slice/authSlice';
import ShowOnLogin, { ShowOnLogout } from '../hiddenlink/HiddenLink';

// logo variable
const logo = (
    <div className="logo">
      <Link to="/">
        <h2>
          e<span>Shop</span>.
        </h2>
      </Link>
    </div>
)

// Active Class Variable
const activeLink = ({isActive}) => (isActive ? `${"active"}` : "")

// Cart Variable
const cart = (
      <span className='cart'>
        <NavLink to="/cart" className={activeLink}>
          Cart
          <FaShoppingCart size={20} />
          <p>0</p>
        </NavLink>
      </span>
)


const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [displayName, setdisplayName] = useState("");

  const dispatch = useDispatch()

  // Monitor currently signedIn user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName == null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setdisplayName(uName)
        } else {
          setdisplayName(user.displayName)
        }
        const uid = user.uid;
        dispatch(SET_ACTIVE_USER({
          email: user.email,
          userName: user.displayName ? user.displayName : displayName,
          userID: uid,
        }))
      } 
      else {
        setdisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  const navigate = useNavigate()

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const hideMenu = () => {
    setShowMenu(false)
  }

  const logoutUser = (e) => {
    setIsLoading(true)
    signOut(auth).then(() => {
      toast.success("Logout Successfully.")
      setIsLoading(false)
      navigate("/");
    })
    .catch((error) => {
      toast.error(error.message)
      setIsLoading(false)
    });
  }

  return (
    <>
    <ToastContainer />
    { isLoading && <Loader />}
    <header>
      <div className="header">
       {logo}

        <nav className={
          showMenu 
          ? `${"show-nav"}` 
          : `${"hide-nav"}`}
        >

        <div className={
          showMenu 
          ? `${"nav-wrapper"} ${"show-nav-wrapper"}` 
          : `${"nav-wrapper"}`}
          onClick={hideMenu}
        >

        </div>

        <ul onClick={hideMenu}>
          <li className='logo-mobile'>
            {logo}
            <FaTimes size={22} color='#fff' onClick={hideMenu} />
          </li>
          <li>
            <NavLink 
              to="/" 
              className={activeLink}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact" 
              className={activeLink}
            >
              Contact Us
            </NavLink>
          </li>
        </ul>

        <div className="header-right" onClick={hideMenu}>
          <span className="links">
            <ShowOnLogout>
              <NavLink 
                to="/login" 
                className={activeLink}
              >
                Login
              </NavLink>
            </ShowOnLogout>
            <ShowOnLogin>
              <a href="##" className='userProfile' style={{color: "#ff7722"}}>
                <FaUserCircle size={16} /> Hi, {displayName}
              </a>
            </ShowOnLogin>
            <ShowOnLogout>
              <NavLink 
                to="/register" 
                className={activeLink}
              >
                Register
              </NavLink>
            </ShowOnLogout>
            <ShowOnLogin>
              <NavLink 
                to="/orderhistory"
                className={activeLink}
              >
                My Orders
            </NavLink>
            </ShowOnLogin>
          </span>
          {cart}
          <span className="links">
            <ShowOnLogin>
              <NavLink
                to="/" 
                className={activeLink}
                onClick={logoutUser}
              >
                LogOut
              </NavLink>
            </ShowOnLogin>
          </span>
        </div>

       </nav>

       <div className="menu-icon">
        {cart}
        <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
       </div>
      </div>
    </header>
    </>
  )
}

export default Header;
