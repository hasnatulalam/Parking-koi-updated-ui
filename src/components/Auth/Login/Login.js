import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../context/Context";
import { Button, Container, Form, Row } from "react-bootstrap";
import "./Login.css"
import axios from "axios"
import loginImg from "../../assets/images/login.jpg";




const Login = () => {
  const navigate = useNavigate();


  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [state, setState] = useContext(UserContext)




  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:9000/api/auth/users/login", input,)



      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setState({ isUser: response.data.isUser })

        window.localStorage.setItem("auth", JSON.stringify(response.data.isUser))

        alert(response.data.message);
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
          <h2 className="card-title text-2xl justify-center mb-5">Sign in</h2>

          <form
            onSubmit={handleLogin}
            className="form-control w-full max-w-md">

            <div className="form-control w-full max-w-md">
              <input
                required

                className="input input-bordered w-full max-w-full focus:outline-none"
                type="email"
                name="email"
                id="email"
                placeholder="Your Email"
                value={input.email}
                onChange={(e) =>
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  })
                }
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
                onChange={(e) =>
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <Link className="text-secondary text-xs text-right" to="/reset-password">
              Forgot Password?
            </Link>

            <input type="submit" className='btn btn-primary mb-3 mt-2' value="Login" />

          </form >
          <div className="text-xs text-center">
            <p className="inline ml-2">
              Don't have an account?{" "}
              <Link className="text-primary ml-1" to="/register">
                Create new.
              </Link>
            </p>
          </div>

        </div >
      </div >
    </section >




  );
};

export default Login;