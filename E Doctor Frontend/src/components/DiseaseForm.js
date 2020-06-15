import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import API from "../services/api";
import {Alert, Button, Col, Container, Form} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {showErrorPopup} from "../redux/actions";


export const DiseaseForm= () => {
    const dispatch =useDispatch()
    const [name, setName] = useState();
    const [symptoms,setSympoms] = useState(',')
    let tmp = []
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        tmp=symptoms.split(",")
        API.post(`/disease`, {name: name,symptoms:[...tmp]})
            .then((result) => history.push("/"))
            .catch((error) => dispatch(showErrorPopup(error.response.data)))
    }
    const color="#53658a";
    return (
        <Container className="text-center">
            <style> {`body { background-color: ${color};}`} </style>
            <Form onSubmit={handleSubmit}>
                <Col>
                    <input onChange={(event) => setName(event.target.value)} type="text" placeholder="name" /><br/>
                </Col>
                <Col>
                    <input onChange={(event) => setSympoms(event.target.value)} type="text" placeholder="symptoms" /><br/>
                </Col>
                <Col>
                    <Button type="submit"><Alert.Heading> Sumbit </Alert.Heading></Button>
                </Col>
            </Form>
        </Container>
    )
}