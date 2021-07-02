import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import keyboard from './../images/keyboard.jpg';
import './TitlePage.css';

const TitlePage = () => {
    return (
        <Container fluid="xxl" className="mt-5">
            <Row>
                <Col>
                    <Image src={keyboard} className="photo" alt="keyboard" />
                    <div className="title-box">
                        <h1>Solar Tariff Calculator</h1>
                        <p>Do you have solar panels?</p>
                        <div className="title-para">
                            <p>This is a simple calculator to help you figure out the best feed-in tariff. </p>
                        </div>
                    </div>
                   
                    <div className="display">    
                        <a href="calculator">
                            <button className="m-2 btn">Start Now</button>
                        </a>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default TitlePage
