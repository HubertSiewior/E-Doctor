import React, {useEffect, useState} from 'react'
import {useParams, useHistory} from "react-router-dom";
import API from '../services/api'
import {Alert, Badge, Button, Container, Col} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {showErrorPopup} from "../redux/actions";
export const Disease= () => {
    const [disease,setDisease] = useState({})
    const {diseaseId} = useParams()
    const history = useHistory();
    const dispatch = useDispatch()



    useEffect(()=>{
        if(diseaseId){
            API.get(`/disease/${diseaseId}`)
                .then((response)=>setDisease(response.data))
                .catch((error) => dispatch(showErrorPopup(error.response.data)))
        }
    },[diseaseId,dispatch])

    const handleDelete = (_id) => {
        API.delete(`/disease/${_id}`)
            .then((response) => history.push('/'))
            .catch((error) => dispatch(showErrorPopup(error.response.data)))
    }

    let symptoms =[];
    if(disease.symptoms) {
        symptoms = disease.symptoms;
    }




    const color="#53658a";
        return (
            <Container>
                <Col className="text-center">
                        <style> {`body { background-color: ${color};}`} </style>
                        <Alert variant="success"><Alert.Heading><h1 className="alert-heading"> Disease Description</h1></Alert.Heading></Alert>
                        <h1>Name: <Badge variant="light">{disease.name} </Badge></h1>
                        <Alert variant="primary"><Alert.Heading><h1 className="alert-heading"> Symptoms :</h1></Alert.Heading></Alert>
                        <Alert >
                            {symptoms.map(a => (
                                <Alert variant="warning" key={a}>{a}</Alert>
                            ))}
                        </Alert>
                    <Button variant="danger" onClick={() => handleDelete(disease._id)}><Alert.Heading>DELETE</Alert.Heading></Button>

                </Col>
            </Container>

        )
}