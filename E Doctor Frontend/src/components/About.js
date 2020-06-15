import React from 'react'
import {Alert, Col, Container} from "react-bootstrap";


export const About = () => {
    const color="#53658a";
    return (
        <Container className="text-center">
            <style> {`body { background-color: ${color};}`} </style>
            <Col>
                <Alert variant={"primary"}>
                    <h1 >About</h1>
                </Alert>
                <Alert variant={"primary"}>
                    <h1> Version: 1.0</h1>
                </Alert>
                <Alert variant={"primary"}>
                    <h1>   Created by: Hubert Siewior</h1>
                </Alert>
                <Alert variant={"primary"}>
                    <h1> Github: <a href="https://github.com/HubertSiewior" title="HubertSiewior">HubertSiewior </a></h1>
                </Alert>
            </Col>
        </Container>
    )
}