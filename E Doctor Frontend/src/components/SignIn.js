import React, {useState} from 'react'
import {Alert, Button, Col,Form} from "react-bootstrap";
import API from "../services/api";
import Container from "react-bootstrap/Container";
import {useDispatch} from "react-redux";
import {showErrorPopup} from "../redux/actions";


export const SignIn = () =>{
    const dispatch =useDispatch()
    const [email,setEmail] = useState()
    const [password, setPassword] = useState();
    const [token,setToken]=useState()
    const handleSignIn = (event) => {
        event.preventDefault();
        API.post('/user/login',{email:email,password:password})
            .then((result) =>{
                const value=result.data;
                localStorage.setItem('TOKEN_SECRET', value)
                localStorage.getItem('TOKEN_SECRET')
                setToken(value)
            })
            .catch((error) => dispatch(showErrorPopup(error.response.data)))
    };
    const color="#53658a";
    //todo logowanie
    return(
        <Container className="text-center" >
            <style> {`body { background-color: ${color};}`} </style>
            <Col>
               <Alert variant={"success"}>
                   <h4 className="card-header text-center">Please sing in</h4>
               </Alert>
            </Col>
            <Col>
                <Alert variant={"secondary"}>
                    <Form onSubmit={handleSignIn}>
                        <input onChange={event => setEmail(event.target.value)} type='text' placeholder="Email"/><br/>
                        <input onChange={event => setPassword(event.target.value)} type='password' placeholder="Password"/><br/>
                        <Button  className="mr-2" type='submit'><strong>Sign in</strong></Button>
                    </Form>
                </Alert>
                <Alert>
                    <h1>{token}</h1>
                </Alert>

            </Col>
        </Container>
    )
}