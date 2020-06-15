import React, {useState} from 'react'
import {Alert, Col, Container, Form,Button} from "react-bootstrap";
import API from "../services/api";
import {useDispatch} from "react-redux";
import {showErrorPopup} from "../redux/actions";


export const EDoctorHistory= () => {
   const dispatch =useDispatch()
   const [email,setEmail] = useState()
   const [diseases,setDisease]=useState([])
   const [medicines,setMedicines] =useState([])
   const color="#53658a";


   const handleSubmit = (event) => {
      const myToken=localStorage.getItem('TOKEN_SECRET');
         event.preventDefault();
         API.post(`/eDoctor/user`, {email:email}, {
            headers: {jwt: myToken}
         })
             .then((result) =>{
                const [disease,medicine] = result.data;
                setDisease(disease);
                setMedicines(medicine);
             } )
             .catch((error) => dispatch(showErrorPopup(error.response.data)))
   }

   return(
   <Container className="text-center">
      <style> {`body { background-color: ${color};}`} </style>
      <Col>
         <Alert variant={"primary"}>
            <h1>  Please write down your email :</h1>
         </Alert>
      </Col>
      <Col>
         <Form onSubmit={handleSubmit}>
            <input onChange={(event) => setEmail(event.target.value)} type="text" placeholder="email" /><br/>
            <Button type="submit">Submit</Button>
         </Form>
      </Col>
      <Col>
         <Alert variant="success"><h1>My history of Diseases: </h1></Alert><br/>
      </Col>
      <Col>
         <Alert  >
            {diseases.map(a => (
                <Alert variant="warning" key={a}>{a}</Alert>
            ))}
         </Alert>
      </Col>
      <Col>
         <Alert variant="success"><h1>My history of Medicines: </h1></Alert><br/>
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