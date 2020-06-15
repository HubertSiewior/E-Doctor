import React from 'react'
import {Alert, Button, Col, Container, Image, Row} from "react-bootstrap";
import doctor3 from "../images/doctor3.jpg"
import doctor4 from "../images/doctor4.jpg"
export const StartPage= () => {
    const color="#53658a";
    return(
        <Container  className="text-center">
            <style> {`body { background-color: ${color};}`} </style>
            <Col >
                <Alert variant="danger">
                    <Alert.Heading>
                        <h1>Log in if you already have account</h1>
                    </Alert.Heading>
                    <Button href='/signIn' variant="primary" className="mr-2" type='submit'>Sign in</Button><br/>
                </Alert>
                <Alert variant="dark">
                    <Alert.Heading>
                        <h1> or register if you are new to this site</h1>
                    </Alert.Heading>
                    <Button href='/signUp' variant="primary" className="mr-2" type='submit'>Sign up</Button><br/>
                </Alert>
            </Col>
            <Row>
                <Image src={doctor4} className="rounded" alt=""/>
                <Image src={doctor3} className="rounded" alt=""/>
            </Row>
        </Container>
    )
}