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
        <p>Hi! Do you have solar panels? This is a simple calculator to help you figure out the best feed-in tariff.</p>
        <Calc />
        <Footer />
      </Jumbotron>
    )
  }
  
  export default Home
  