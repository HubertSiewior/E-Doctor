import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import API from "../services/api";
import {Container, Form, Button, Alert} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {useDispatch} from "react-redux";
import {showErrorPopup} from "../redux/actions";


export const MedecineForm= () => {
    const dispatch=useDispatch()
    const [name, setName] = useState();
    const [symptoms,setSympoms] = useState(',')
    const [withoutRecipe,setWithoutRecipe] = useState()
    const [price,setPrice] = useState()
    let tmp = []
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        tmp=symptoms.split(",")
        API.post(`/medicine`, {name: name,symptoms:[...tmp],price:price,withoutRecipe:withoutRecipe})
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
                    <input onChange={(event) => setWithoutRecipe(event.target.value)} type="boolean" placeholder="withoutRecipe" /><br/>
                </Col>
                <Col>
                    <input onChange={(event) => setPrice(event.target.value)} type="number" placeholder="price" /><br/>
                </Col>
                <Col>
                    <Button type="submit"><Alert.Heading> Sumbit </Alert.Heading></Button>
                </Col>
            </Form>
        </Container>
    )
}