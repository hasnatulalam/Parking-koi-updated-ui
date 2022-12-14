
import Loading from "../../Shared/Loading";
import About from "../About/About";
import Contact from "../Contact/Contact";
import Featured from "../Featured/Featured";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ParkingList from "../ParkingList/ParkingList";
import Reviews from "../reviewSection/reviews/Reviews";

import "./HomePage.css"



const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="max-w-7xl px-5 md:px-10 lg:px-16 py-10 md:py-20 mx-auto ">
        <Featured />
        <div className='max-w-full text-center mt-40'>
          <h3 className="text-3xl font-semibold mt-3 mb-3 md:mb-12 capitalize">Browse by <span className="text-primary">property type</span> </h3>
        </div>
        <ParkingList />
      </div>

      <About></About>
      <Reviews></Reviews>

      <Contact></Contact>
      <Footer></Footer>
    </div>
  );
};

export default HomePage;