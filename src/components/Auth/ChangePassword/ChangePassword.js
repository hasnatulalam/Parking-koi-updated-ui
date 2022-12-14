import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const ChangePassword = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      `http://localhost:9000/api/auth/forget-password/${id}/${token}`,
      input
    );
    if (res.status === 200) {
      alert("password changed Successfully");
      navigate("/login");
    }
  };
  return (
   
<div className="py-10">
      <div className="py-10 container mx-auto bg-green-50 shadow-lg rounded-xl">
        <h2 className="text-center text-green-700 text-3xl mb-4">Sign Up</h2>
        <form
          onSubmit={handleSubmit }
          className="flex flex-col items-center space-y-2"
        >
          <div className="border-2 w-60 border-green-700 flex rounded-3xl">
            <input
              required
             
              className="bg-transparent px-4 py-1 outline-none w-full border-none rounded-3xl"
              type="text"
              name="name"
              id="name"
              placeholder="New Password"
              value={input.newPassword}
                        onChange={(e) =>
                          setInput({
                            ...input,
                            [e.target.name]: e.target.value,
                          })
                        }
            />
          </div>
          <div className="border-2 w-60 border-green-700 flex rounded-3xl">
            <input
              required
              
              className="bg-transparent px-4 py-1 outline-none w-full border-none rounded-3xl"
              type="email"
              name="email"
              id="email"
              placeholder="Confirm Password"
              value={input.confirmPassword}
              onChange={(e) =>
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
         

       

          <div className="flex items-center justify-center mt-5">
            <button type="submit" className="mt-2 flex items-center cursor-pointer justify-center bg-green-600 rounded-full px-6 py-2 text-gray-50 tracking-widest font-semibold transition hover:bg-green-500 focus:ring focus:ring-offset-2 focus:ring-offset-green-500 focus:ring-opacity-70">
            Change Password
              
            </button>
          </div>
        </form>
     

        
        
      </div>
    </div>


  );
};

export default ChangePassword;
