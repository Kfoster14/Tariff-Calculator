import React from 'react';
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCardTitle, MDBIcon, MDBCardImage, MDBCardBody } from "mdbreact";
import { LinkContainer } from "react-router-bootstrap";
import davidegoldin from "./../images/davidegoldin.jpg";


const TitlePage = () => {
    return (
        <MDBContainer className="mt-5 text-center">
            <MDBRow>
                <MDBCol>
                    <MDBJumbotron className="p-0">
                        <MDBCardTitle className="h1-responsive pt-3 m-5 font-bold">Solar Tariff Calculator</MDBCardTitle>
                        <MDBCardImage
                            className="img-fluid"
                            src={davidegoldin}
                        />
                        <MDBCardBody>
                            <p className="h5 mx-5 mb-5">Do you have solar panels? </p>
                            <p>This is a simple calculator to help you figure out the best feed-in tariff.</p>
                            
                            <LinkContainer to="/calculator">
                                <MDBBtn gradient="purple" rounded className="mb-5"><MDBIcon icon="clone" className="mr-2"></MDBIcon> Start Now</MDBBtn>
                            </LinkContainer>
                        </MDBCardBody>
                    </MDBJumbotron>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default TitlePage
