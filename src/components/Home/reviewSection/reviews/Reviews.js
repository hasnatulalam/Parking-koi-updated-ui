import React, { useEffect, useState } from "react";



import { Carousel, Row } from "react-bootstrap";
import Review from "../review/Review";




const Reviews = () => {
    const [collectreviews, setCollectReviews] = useState([]);

    useEffect(() => {
        fetch("http://localhost:9000/api/review/collectreviews")
            .then((res) => res.json())
            .then((data) => setCollectReviews(data));
    }, []);



    return (
        <section id='reviews' className='px-5 md:px-10 lg:px-16 py-10 md:pb-20'>
            <div className='max-w-full text-center'>
                <h3 className="text-md lg:text-md lg:text-2xl font-semibold mt-5 text-primary">Feedback from our Customers</h3>
                <h3 className="text-3xl font-semibold mt-3 mb-3 md:mb-12">TESTIMONIALS</h3>
            </div>
            {/* treatments cards starts */}
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 '>
                {
                    collectreviews?.map(collectreview =>
                        <Review
                            key={collectreview._id}
                            collectreview={collectreview}
                        ></Review>
                    )
                }
            </div>
        </section>
    );
};

export default Reviews;