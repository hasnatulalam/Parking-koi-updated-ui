import "./SingleSearchItem.css";

import Header from "../../Home/Header/Header";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";


import Reserve from "../Reserve/Reserve";
import { UserContext } from "../../context/Context";
import { SearchContext } from "../../context/SearchContext";

const SingleSearchItem = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(`http://localhost:9000/api/parking/singleParking/${id}`);
  const [state, setState] = useContext(UserContext)
  const navigate = useNavigate();

  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (state) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };
  return (
    <div>

      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer my-10">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="grid lg:grid-cols-2 ">
            <div className="grid grid-cols-2 my-auto p-3 gap-5 border border-solid border-secondary rounded-xl mx-auto">
              <div className="hotelImages">
                {data.photos?.map((photo, i) => (
                  <div className="hotelImgWrapper" key={i}>
                    <img
                      onClick={() => handleOpen(i)}
                      src={photo}
                      alt=""
                      className="w-full rounded "
                    />
                  </div>
                ))}
              </div>
              <div>
                <h1 className="hotelTitle text-xl lg:text-2xl">{data.name}</h1>
                <div className="hotelAddress">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span>{data.address}</span>
                </div>
                <span className="hotelDistance block mt-4">
                  Excellent location – {data.distance}m from center
                </span>
                <span className="hotelPriceHighlight">
                  Book a stay over ${data.cheapestPrice} at this property and get a
                  free airport taxi
                </span>
                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle text-xl lg:text-2xl">{data.title}</h1>
                  <p className="hotelDesc">{data.desc}</p>
                </div>
              </div>
            </div>
            <div className="hotelDetails flex flex-col justify-center max-w-md mx-auto text-center">
              <div className="hotelDetailsPrice">
                <h1 className="text-secondary">Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2><b>${days * data.cheapestPrice * options.sloots}</b> ({days}{" "}nights) </h2>
                <button onClick={handleClick} className="btn btn-primary lg:w-2/3 font-medium leading-5 mx-auto">Reserve or Booking Parking Right Now!</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} parkingSlotId={id} />}
    </div>
  );
};

export default SingleSearchItem;