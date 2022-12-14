import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./Contact.css"



const Contact = () => {

  const [mail, setMail] = useState('')
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",

  });

  const { fullName, email, phone, message } = user
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value, })
  }

  const SendMessage = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:9000/api/auth/contact", user);
      if (res) {
        setMail(res.data);
      }
    } catch (error) {
      alert(error.response.data.msg);
    }
  };


  return (

    <section id='contact' className='mt-7'>
      <div className="card w-full max-w-lg  mx-auto  lg:py-12">
        <div className='max-w-xl text-center'>
          <h3 className="text-sm lg:text-md lg:text-xl font-bold mt-5 text-primary">Contact Us</h3>
          <h3 className=" lg:text-2xl text-secondary font-bold mt-3 mb-3">Stay Connected With Us</h3>
        </div>
        <div className="card-body " >
          <div className="form-control">
            <input
              required

              className="input input-bordered"
              type="fullName"
              name="fullName"
              id="fullName"
              placeholder="Your Name"
              value={fullName}
              onChange={onInputChange}
            />
          </div>
          <div className="form-control">
            <input
              required
              className="input input-bordered my-2"
              type="email"
              name="email"
              id="email"
              placeholder="Your Email"
              value={email}
              onChange={onInputChange}
            />
          </div>
          <div className="form-control">
            <input
              required
              className="input input-bordered mb-2"
              type="phone"
              name="phone"
              id="phone"
              placeholder="Your Phone Number"
              value={phone}
              onChange={onInputChange}

            />
          </div>
          <div className="form-control">
            <textarea
              required
              className="textarea textarea-bordered h-32"
              type="message"
              name="message"
              id="message"
              placeholder="Your Message"
              value={message}
              onChange={onInputChange}
            />

          </div>

          <div className="form-control mt-7">
            <button onClick={SendMessage} className="btn btn-primary w-1/2 mx-auto text-white ">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>

  );
}

export default Contact;