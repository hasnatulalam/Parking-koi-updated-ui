import React, { useContext, useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";






import axios from "axios";
const  CustomerReview = () => {
 
  const [rating,setRating]=useState()
  const handleChange = (event) =>{
    setRating(event.target.value);
  }
  const [description,setDescription]=useState("")
    const handleValue = (event) =>{
    setDescription(event.target.value);
  }
  
  
   
  
    const handleSubmit = async (e) => {
      e.preventDefault();
     
      
      try {
        await axios.post("http://localhost:9000/api/review/addreview",{rating,description}, );
      } catch (err) {
        console.log(err);
      }
      
    };
  
    return (
      <>
        <Container>
           <form onSubmit={handleSubmit} >
            <div className="col-12 col-lg-6 mx-auto">
              <div className="form-container py-5">
                
                  <h2 className=" text-center mb-2 abril-font">
                    Give Us An Honest Review, Please !
                  </h2>
                  <p className="text-cyan text-center mb-5">
                    Your review helps us to improve our operating system and
                    provide you better services.
                  </p>
                 
                 
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridRating">
                      <Form.Label>
                        Give Us A Rating (1 is the wrost , 5 is the best)
                      </Form.Label>
                      <select
                        required
                        className="form-control shadow-none"
                        value={rating}
                        onChange={handleChange}
                      >
                        <option value="1">1</option>
                        <option value="1.5">1.5</option>
                        <option value="2">2</option>
                        <option value="2.5">2.5</option>
                        <option value="3">3</option>
                        <option value="3.5">3.5</option>
                        <option value="4">4</option>
                        <option value="4.5">4.5</option>
                        <option value="5">5</option>
                      </select>
                    </Form.Group>
                    <textarea
              
              required
              
              
              className="bg-transparent px-4 py-1 outline-none w-full border-none rounded-3xl"
              type="message"
              name="message"
              id="message"
              placeholder="Your Message"
              value={description}
              onChange={handleValue}
            />
                  </Row>
  
                  <div className="text-center">
                    <Button 
                      type="submit"
                      className="px-4 py-2 fw-bold btn-light-green shadow-none"
                    >
                      <i className="fas fa-clipboard-check text-warning me-2"></i>
                      Review Us
                    </Button>
                  </div>
             
              </div>
            </div>
         </form>
        </Container>
      </>
    );
  };
  
  export default CustomerReview;