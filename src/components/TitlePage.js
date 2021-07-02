import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LinkContainer } from "react-router-bootstrap";
import Button from "react-bootstrap/Button";
import './TitlePage.css';


const TitlePage = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <div className="bg"></div>
                    <div className="title-box">
                        <h1>Solar Tariff Calculator</h1>
                        <p>Do you have solar panels?</p>
                        <div className="title-para">
                            <p>This is a simple calculator to help you figure out the best feed-in tariff. </p>
                        </div>
                    </div>
                   
                    <LinkContainer to="/calculator">
                        <Button variant="secondary" className="btn">Start Now</Button>
                    </LinkContainer>
                </Col>
            </Row>
        </Container>
    )
}

export default TitlePage
