import React, {useEffect} from 'react'
import {Container, Row, Col, Card, Button} from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'
import "../styles/home.css"


import carousel1 from '././homeImages/carousel1.jpg'
import carousel2 from '././homeImages/carousel2.jpg'
import carousel3 from '././homeImages/carousel3.jpg'
import carousel4 from '././homeImages/carousel4.jpg'
import carousel5 from '././homeImages/carousel5.jpg'
import profilecard from '././homeImages/profilecard.png'
import leavecard from '././homeImages/holidaycard.png'
import helpcard from '././homeImages/supportcard.png'
import messagecard from '././homeImages/messagecard.png'

function Home() {


    useEffect(() => {
        window.twttr.widgets.createTimeline(
            {
                sourceType: "profile",
                screenName: "FDMGroup"
            },
            document.getElementById("TwitterFeed"),
            {
                tweetLimit: 10
            }
        );

    }, []);
    


    return (
        <Container>
            <Carousel className="banner shadow">
                <Carousel.Item>
                    <img
                        className="img-fluid"
                        alt="Welcome to the FDM Employee Portal"
                        src={carousel1}

                    />
                    <Carousel.Caption style={{marginLeft:"0"}}>
                        <h3>Welcome to the FDM Employ E-Portal</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 img-fluid"
                        src={carousel2}
                        alt="Change your details or Book leave"
                    />
                    <Carousel.Caption>
                        <h3>Bringing People and Technology together</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 img-fluid"
                        src={carousel4}
                        alt="Contact HR/IT support using tickets"
                    />
                    <Carousel.Caption>
                        <h3>Control your own data using your Profile</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 img-fluid"
                        src={carousel5}
                        alt="Contact HR/IT support using tickets"
                    />
                    <Carousel.Caption>
                        <h3>Send a Leave Request to take time off</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 img-fluid"
                        src={carousel3}
                        alt="Contact HR/IT support using tickets"
                    />
                    <Carousel.Caption>
                        <h3>Find Support by creating a Ticket</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            
            <Row className="upperSpacing marginAlign">
                <Col className="upperSpacing">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={profilecard}  />
                    <Card.Body className="shadow">
                        <Card.Title>Your Profile</Card.Title>
                        <Card.Text>
                        Your Profile contains all your details which you can view and update when changes occur.
                        </Card.Text>
                        <Button variant="primary" onClick={() => {window.location = "#profile"}}>View Profile</Button>
                    </Card.Body>
                </Card>
                </Col>
                <Col className="upperSpacing">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={leavecard} />
                    <Card.Body className="shadow">
                        <Card.Title>Annual Leave</Card.Title>
                        <Card.Text>
                        Submit a request to take days off using your annual leave. Requests will be sent for approval.
                        </Card.Text>
                        <Button variant="primary" onClick={() => {window.location = "#annual-leave"}}>Request Leave</Button>
                    </Card.Body>
                </Card>
                </Col>
                <Col className="upperSpacing">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={helpcard} />
                    <Card.Body className="shadow">
                        <Card.Title>Request HR/IT support</Card.Title>
                        <Card.Text>
                        Have an issue? Get in touch with HR or IT support by submitting a ticket.
                        </Card.Text>
                        <Button variant="primary" onClick={() => {window.location = "#support"}}>Submit a Ticket</Button>
                    </Card.Body>
                </Card>
                </Col>
                <Col className="twitterTimeline upperSpacing shadow" id="TwitterFeed" ></Col>
        </Row>

            <Row className="upperSpacing marginAlign">
                <Col className="upperSpacing prevent-select">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={messagecard}  />
                        <Card.Body className="shadow">
                            <Card.Title>Send Notification</Card.Title>
                            <Card.Text>
                                Send notifications to other colleagues
                            </Card.Text>
                            <Button variant="primary" onClick={() => {window.location = "#profile"}}>Send Notifications</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Home