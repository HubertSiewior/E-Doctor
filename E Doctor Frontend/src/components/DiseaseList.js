import React, {useEffect, useState} from 'react'
import API from '../services/api'
import {Link} from "react-router-dom";
import {Alert, Container, Row,Col,ListGroup} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {showErrorPopup} from "../redux/actions";

const DiseaseItem = ({_id, name, symptoms}) => {
    return (
        <Container>
            <ListGroup >
                <Link to={`/disease/${_id}`}>{
                    <Row >
                        <Alert variant="success"><h1 className="alert-heading"> {name}</h1></Alert>
                    </Row>
                }</Link>
            </ListGroup>
        </Container>)
}
export const DiseaseList = () => {
    const dispatch =useDispatch()
    const [diseases, setDiseases] = useState([])

    useEffect(() => {
        API.get(`/disease`)
            .then((result) => setDiseases(result.data))
            .catch((error) => dispatch(showErrorPopup(error.response.data)))
    }, [dispatch])

    const color="#53658a";
    return (
        <Container>
            <Col className="text-center">
                <style> {`body { background-color: ${color};}`} </style>
                <Alert  >
                     {diseases.map(disease => <DiseaseItem key={disease._id}
                                                      _id={disease._id}
                                                      name={disease.name}
                                                      symptoms={disease.symptoms}/>)}
                </Alert>
            </Col>
        </Container>
    )
}

