import useFetch from "../../hooks/useFetch";
import "./ParkingList.css";

const ParkingList = () => {
  const { data, loading, error } = useFetch("http://localhost:9000/api/parking/allParkings/countByType");

  const images = [
    "https://i.ibb.co/bvDnSp8/images.jpg",
    "https://i.ibb.co/qCxggLK/images-1.jpg",
    "https://i.ibb.co/gZH7kKb/images-2.jpg",

  ];

  console.log(data);
  return (
    <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 justify-center">
      {loading ? (
        "loading"
      ) : (
        <>
          {data &&
            images.map((img, i) => (
              <div className="pListItem" key={i}>
                <img
                  src={img}
                  alt=""
                  className="pListImg"
                />
                <div className="">
                  <h1>{data[i]?.type}</h1>
                  <h2>{data[i]?.count} {data[i]?.type}</h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default ParkingList;