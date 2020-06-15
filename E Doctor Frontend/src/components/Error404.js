import React from 'react'
import john from "../images/john.jpg"
import {Alert, Container, Image, Row} from "react-bootstrap";

export const Page404 = () => {
    const color="#00ff00"
    return (
        <Container>
            <style> {`body { background-color: ${color};}`} </style>
            <Alert className="text-center">
                <Row>
                    <h1><strong>Where am I?  ERROR 404! Paige not found :(</strong></h1>
                    <Image src={john} />
                </Row>

            </Alert>
        </Container>
    )
}