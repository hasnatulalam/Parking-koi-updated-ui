import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import loginImg from "../../assets/images/login.jpg";

const Register = () => {
  const navigate = useNavigate();
  /*   const [input, setInput] = useState({
      name: "",
      email: "",
      password: "",
     
    }); */

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [role, setRole] = useState()


  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:9000/api/auth/users/register", { name, email, password, role });
      if (response.status === 201) {
        alert(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <section className='max-h-screen flex  justify-around items-center'>
      <div className="card items-center card-side gap-x-10 flex-col lg:flex-row p-10">
        <figure className='max-w-md'><img src={loginImg} alt="Movie" className='w-full' /></figure>
        <div className="card-body p-3 lg:p-8 w-64 sm:w-full lg:w-96 shadow-xl rounded-2xl">
          <h2 className="card-title text-2xl justify-center mb-5">Sign Up</h2>

          <form
            onSubmit={handleRegister}
            className="form-control w-full max-w-md">
            <div className="form-control w-full max-w-md my-3">
              <input
                required
                className="input input-bordered w-full max-w-full focus:outline-none"
                type="text"
                name="name"
                id="name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-control w-full max-w-md">
              <input
                required

                className="input input-bordered w-full max-w-full focus:outline-none"
                type="email"
                name="email"
                id="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control w-full max-w-md my-3">
              <input
                required

                className="input input-bordered w-full max-w-full focus:outline-none"
                type="password"
                name="password"
                id="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-control w-full max-w-md">
              <select
                required
                className="input input-bordered w-full max-w-full focus:outline-none"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Driver">Driver</option>
                <option value="Owner">Owner</option>
              </select >

            </div >

            <input type="submit" className='btn btn-primary mt-5 mb-3' value="Sign Up" />

          </form >
          <div className="flex text-sm text-center items-center justify-center space-x-8">
            <p className="text-xs">
              Already have an account?{" "}
              <Link className="text-primary" to="/login">
                LOGIN.
              </Link>
            </p>
          </div>

        </div >
      </div >
    </section >
  );
};

export default Register;
