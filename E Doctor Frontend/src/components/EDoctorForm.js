import React, {useState} from 'react'
import API from "../services/api";
import {Alert, Col, Container, Form, Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {showErrorPopup} from "../redux/actions";


export const EDoctorForm = () => {
    const dispatch = useDispatch()
    const [symptoms,setSympoms] = useState(',')
    const [email,setEmail] = useState()
    let tmp = []
    const [diseases,setDisease]=useState([])
    const [medicines,setMedicines] =useState([])

    const handleSubmit = (event) => {
        event.preventDefault();
        const myToken=localStorage.getItem('TOKEN_SECRET');
        tmp=symptoms.split(",")
            API.post(`/eDoctor`, {symptoms:[...tmp],email:email},{  headers: {jwt: myToken}})
                .then((result) =>{
                    const [disease,medicine] = result.data;
                    setDisease(disease);
                    setMedicines(medicine);
                } )
                .catch((error) => dispatch(showErrorPopup(error.response.data)))

    }

    const color="#53658a";
    return (
        <Container className="text-center">
            <style> {`body { background-color: ${color};}`} </style>
            <Col>
                <Form onSubmit={handleSubmit}>
                    <input onChange={(event) => setSympoms(event.target.value)} type="text" placeholder="symptoms" /><br/>
                    <input onChange={(event) => setEmail(event.target.value)} type="text" placeholder="email" /><br/>
                    <Button type="submit">Submit</Button>
                </Form>
            </Col>
            <Col>
                <Alert variant="success"><h1> Diseases: </h1></Alert><br/>
            </Col>
            <Col>
                <Alert  >
                    {diseases.map(a => (
                        <Alert variant="warning" key={a}>{a}</Alert>
                    ))}
                </Alert>
            </Col>
            <Col>
                <Alert variant="success"><h1> Medicines: </h1></Alert><br/>
            </Col>
            <Col>
                <Alert >
                    {medicines.map(a => (
                        <Alert variant="warning" key={a}>{a}</Alert>
                    ))}
                </Alert>
            </Col>
        </Container>
    )
}