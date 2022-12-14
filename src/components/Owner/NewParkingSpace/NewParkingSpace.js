import "./NewParkingSpace.css";


import { useState } from "react";
import { roomInputs } from "../../Data/FormSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewParkingSpace = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [slots, setSlots] = useState([]);

  const { data, loading, error } = useFetch("http://localhost:9000/api/parking/allParkings");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const slotNumbers = slots.split(",").map((slot) => ({ number: slot }));
    try {
      await axios.post(`http://localhost:9000/api/parkingSlot/createParkingSlot/${hotelId}`, { ...info, slotNumbers });
    } catch (err) {
      console.log(err);
    }
    
  };


  return (
    <div className="new">
     
      <div className="newContainer">
        
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  onChange={(e) => setSlots(e.target.value)}
                  placeholder="give comma between room numbers."
                />
              </div>
              <div className="formInput">
                <label>Choose a hotel</label>
                <select
                  id="hotelId"
                  onChange={(e) => setHotelId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data?.map((parking) => (
                        <option key={parking._id} value={parking._id}>{parking.name}</option>
                      ))}
                </select>
              </div> 
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewParkingSpace;