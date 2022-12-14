import React, { useContext, useEffect, useState } from 'react';

import { UserContext } from '../../context/Context';
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialIcons from '../SocialIcons';
import avatarImg from '../../assets/images/avatar.png'
import logo from '../../assets/images/logo.png'


const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [state, setState] = useContext(UserContext);
  const { isUser } = useContext(UserContext);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:9000/api/auth/users/logout");
      if (response.status === 200) {
        alert(response.data.message);
        localStorage.removeItem("auth")
        localStorage.removeItem("email")

        localStorage.removeItem("name")
        localStorage.removeItem("user")
        localStorage.removeItem("token")



        setState(null)
        navigate("/login")


      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };



  const menuItems = <>

    <li>
      <Link to="/" className='hover:text-primary active:text-primary focus:text-primary px-4 py-2'>Home</Link>
    </li>
    <li>
      <Link to="/about" className='hover:text-primary active:text-primary focus:text-primary px-4 py-2'>About</Link>
    </li>
    <li>
      <Link to="/map" className='hover:text-primary active:text-primary focus:text-primary px-4 py-2'>Map</Link>
    </li>

    <li>
      <Link to="/contact" className='hover:text-primary active:text-primary focus:text-primary px-4 py-2'>Contact Us</Link>
    </li>

    {state !== null ? (
      <>
        <li><Link to="/dashboard" className='hover:text-primary active:text-primary focus:text-primary px-4 py-2'>DashBoard</Link></li>
      </>
    )
      : (

        <>

          <li><Link to="/login" className='hover:text-primary active:text-primary focus:text-primary px-4 py-2'>Login</Link></li>
        </>
      )}
  </>


  return (
    <header className='w-full mx-auto px-3 sm:px-8 sticky top-0 left-0 z-10  bg-white'>
      <nav className='my-4'>
        <div className="navbar ">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex="0" className="btn btn-ghost lg:hidden ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
              </label>
              <ul tabIndex="0" className="navigation-links menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-xl w-52 ">
                {menuItems}
              </ul>
            </div>
            <a href='/'>
              <img src={logo} alt="" className='h-10 sm:h-16  ml-4' />
            </a>
          </div>
          <div className=" navbar-center hidden lg:flex">
            <ul className="menu-horizontal p-0 text-lg font-semibold">
              {menuItems}
            </ul>
          </div>
          <div className="navbar-end lg:w-36 mr-5 lg:mr-10">
            {
              state !== null ?
                <div className="dropdown dropdown-end avatar">
                  <label tabIndex={5} className=" m-1">
                    <div className="w-7 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                      <img src={avatarImg} alt='user name' className='w-7' />
                    </div>
                  </label>
                  <ul tabIndex={5} className="dropdown-content menu p-2 shadow bg-base-100 rounded-xl w-52">
                    <li><Link to='/dashboard'>Dashboard</Link></li>
                    <li><button onClick={handleLogout} className="">Logout</button></li>
                  </ul>
                </div>
                :
                <Link to='/login' className="btn  btn-outline px-6 ">Login</Link>
            }

            {/* dashboard sidebar for small device  only when it is dashboard route*/}

            {
              location.pathname === '/dashboard' &&
              <label tabIndex="2" htmlFor="dashboard-sidebar" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
              </label>
            }
          </div>

        </div>
      </nav>
    </header>
  );
};

export default Navbar;