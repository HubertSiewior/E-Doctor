import React, {useEffect, useState} from 'react'
import {useParams, useHistory} from "react-router-dom";
import API from '../services/api'
import {Alert, Badge, Button, Col, Container} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {showErrorPopup} from "../redux/actions";

export const Medicine= () => {
    const dispatch =useDispatch()
    const [medicine,setMedicine] = useState({})
    const {id} = useParams()
    const history = useHistory()


    useEffect(()=>{
        if(id){
            API.get(`/medicine/${id}`)
                .then((response)=>setMedicine(response.data))
                .catch((error) => dispatch(showErrorPopup(error.response.data)))
        }
    },[id,dispatch])

    const handleDelete = (_id) => {
        API.delete(`/medicine/${_id}`)
            .then((response) => history.push('/'))
            .catch((error) => dispatch(showErrorPopup(error.response.data)))
    }

    let symptoms =[];
    if(medicine.symptoms) {
        symptoms = medicine.symptoms;
    }
    const color="#53658a";
    return (
        <Container>
            <Col className="text-center">
                    <style> {`body { background-color: ${color};}`} </style>
                    <Alert variant="success"><Alert.Heading><h1 className="alert-heading"> Medicine Description</h1></Alert.Heading></Alert>
                    <h1>Name: <Badge variant="light">{medicine.name} </Badge></h1>
                    <Alert variant="primary"><Alert.Heading><h1 className="alert-heading"> Symptoms :</h1></Alert.Heading></Alert>
                    <Alert >
                        {symptoms.map(a => (
                            <Alert variant="warning" key={a}>{a}</Alert>
                        ))}
                    </Alert>
                    <Alert variant="primary">Price: {medicine.price}</Alert><br/>
                    <Alert variant="primary">WithoutRecipe: {medicine.withoutRecipe ? 'YES': 'No'}</Alert><br/>
                    <Button variant="danger" onClick={() => handleDelete(medicine._id)}><Alert.Heading>DELETE</Alert.Heading></Button>
            </Col>
        </Container>
    )
}