import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import keyboard from './../images/keyboard.jpg'
import './TitlePage.css';

const TitlePage = () => {
    return (
        <Jumbotron fluid >
        <div className="text-center mb-3 title-box">
            <h1>Solar Tariff Calculator</h1>
            <p>Do you have solar panels? <br></br>
            This is a simple calculator to help you figure out the best feed-in tariff. <br></br>
                Just enter the usage information from your electricity bill.</p>
            <img src={keyboard} className="custom-img d-block w-100" alt="keyboard" fluid />
            <a href="calculator">
                <button className="m-2 btn" href="/calculator">Start Now</button>
            </a>
        </div>
        
      </Jumbotron>
    )
}

export default TitlePage
