import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import './Home.css';
import house from './../images/house.jpg'
import Calc from './Calc'
import Footer from './Footer'


const Home = () => {
    return (
      <Jumbotron fluid className="title-box">
        <img src={house} alt="house" />;
        <h1>Solar Tariff Calculator</h1>
        <p>
            This is a modified jumbotron that occupies the entire horizontal space of
            its parent.
        </p>
        
        <Calc />
        <Footer />
      </Jumbotron>
    )
  }
  
  export default Home
  