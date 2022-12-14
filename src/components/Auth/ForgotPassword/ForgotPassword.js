import React, { useState } from "react";
import axios from "axios";
import forgetPass from "../../assets/images/forget-password.png"


const ForgetPassword = () => {
  const [email, setEmail] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:9000/api/auth/forget-password", { email });

      if (res.status === 200) {
        alert("Pls Check Your Email A Reset Password Link send for your email Address");
      }


    } catch (error) {
      alert(error.response.data.message);
    }

  };

  return (

    <section className='max-h-screen flex  justify-around items-center'>
      <div className="card items-center card-side gap-x-10 flex-col lg:flex-row p-10">
        <figure className='max-w-md'><img src={forgetPass} alt="Movie" className='w-full' /></figure>
        <div className="card-body p-3 lg:p-8 w-64 sm:w-full lg:w-96 shadow-xl rounded-2xl">
          <h2 className="text-center text-secondary font-semibold text-3xl mb-4">Reset Password</h2>

          <form
            onSubmit={handleSubmit}
            className="form-control w-full max-w-md">

            <div className="form-control w-full max-w-md my-1">
              <input
                required

                className="input input-bordered w-full max-w-full focus:outline-none"
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <input type="submit" className='btn btn-primary mb-3 mt-2' value=" Send Email" />

          </form >

        </div >
      </div >
    </section >

  );
};

export default ForgetPassword;
