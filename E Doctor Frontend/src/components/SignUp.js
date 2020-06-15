import React, {useState} from 'react'
import {Alert, Button, Col, Container} from "react-bootstrap";
import API from "../services/api";
import {useHistory} from 'react-router-dom'
import {useDispatch} from "react-redux";
import {showErrorPopup} from "../redux/actions";

export const SignUp = () =>{
    const dispatch =useDispatch()
    const [username, setUsername] = useState('');
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('');
    const history = useHistory();
    const handleSignIn = (event) => {
        event.preventDefault()
        API.post('/user',{name:username,email:email,password:password})
            .then((result) => history.push("/signIn"))
            .catch((error) => dispatch(showErrorPopup(error.response.data)))
    };
    const color="#53658a";
    //todo rejestracja
    return(
        <Container className="text-center" >
            <style> {`body { background-color: ${color};}`} </style>
            <Col>
                <Alert variant={"success"}>
                    <h4 className="card-header text-center">Please sing Up</h4>
                </Alert>
            </Col>
            <Col>
                <Alert variant={"secondary"}>
                    <form onSubmit={handleSignIn}>
                        <input onChange={event => setUsername(event.target.value)} type='text' placeholder="Username"/><br/>
                        <input onChange={event => setEmail(event.target.value)} type='text' placeholder="Email"/><br/>
                        <input onChange={event => setPassword(event.target.value)} type='password' placeholder="Password"/><br/>
                        <Button className="mr-2" type='submit'><strong>Sign in</strong></Button>
                    </form>
                </Alert>
            </Col>
        </Container>
    )
}