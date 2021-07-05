import React from 'react';
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCardTitle, MDBIcon } from "mdbreact";
import { LinkContainer } from "react-router-bootstrap";
import yoshisugimoto from "./../images/yoshisugimoto.jpg";


const TitlePage = () => {
    return (
        <MDBContainer className="mt-2 text-center">
            <MDBRow>
                <MDBCol>
                    <MDBJumbotron className="p-0">
                        <MDBCol>
                            <img src={yoshisugimoto} className="img-fluid" alt="" />
                            
                        
                            <MDBCardTitle className="h1-responsive pt-3 mt-2 font-bold">Solar Tariff Calculator</MDBCardTitle>
                                <p className="h5 mx-5 mb-5">Do you have solar panels? </p>
                                <p>This is a simple calculator to help you figure out the best feed-in tariff.</p>
                                <LinkContainer to="/calculator">
                                    <MDBBtn gradient="blue" rounded className="mb-5"><MDBIcon icon="clone" className="mr-2"></MDBIcon> Start Now</MDBBtn>
                                </LinkContainer>
                        </MDBCol>
                        
                    </MDBJumbotron>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default TitlePage
