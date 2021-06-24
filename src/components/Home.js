import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import './Home.css';
import Hamptons from './../images/Hamptons.jpg'
import Calc from './Calc'


const Home = () => {
    return (
      <Jumbotron fluid className="title-box">
          <img src={Hamptons} alt="beachimage" />;
          <h1>Fluid jumbotron</h1>
          <p>
            This is a modified jumbotron that occupies the entire horizontal space of
            its parent.
          </p>
          <div>
            <Calc />
            
        </div>
      </Jumbotron>
    )
  }
  
  export default Home
  