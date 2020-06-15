import React, {useEffect, useState} from 'react'
import API from '../services/api'
import {Link} from "react-router-dom";
import {Alert, Container, ListGroup, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {useDispatch} from "react-redux";
import {showErrorPopup} from "../redux/actions";

const MedicineItem = ({_id, name, symptoms,withoutRecipe,price}) => {
    return (
        <Container>
            <ListGroup >
                <Link to={`/medicine/${_id}`}>{
                    <Row >
                        <Alert variant="success"><h1 className="alert-heading"> {name}</h1></Alert>
                    </Row>
                }</Link>
            </ListGroup>
        </Container>)
}

export const MedicineList = () => {
    const dispatch=useDispatch()
    const [medicines, setMedicines] = useState([])


    useEffect(() => {
        API.get(`/medicine`)
            .then((result) => setMedicines(result.data))
            .catch((error) => dispatch(showErrorPopup(error.response.data)))
    }, [dispatch])


    const color="#53658a";
    return (
        <Container>
            <Col className="text-center">
                <style> {`body { background-color: ${color};}`} </style>
                <Alert>
                    {medicines.map(medicine => <MedicineItem key={medicine._id}
                                                                _id={medicine._id}
                                                                name={medicine.name}
                                                                price = {medicine.price}
                                                                withoutRecipe = {medicine.withoutRecipe}
                                                                symptoms={medicine.symptoms}/>)}
                </Alert>
            </Col>
        </Container>
    )
}
