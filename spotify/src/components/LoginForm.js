import React, { useState } from 'react';
import { Container, Jumbotron, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import {axiosWithAuth} from './utils/axiosWithAuth'


function LoginForm(){
    const [login, setLogin] = useState({
        username: "",
        password: "",
    });

    
    const history = useHistory();

    const changeHandler=  (e) => {
        e.persist();
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axiosWithAuth()
        .post("api/auth/login", {
            username: login.username,
            password: login.password
        })
        .then(res => {
            console.log(res)
            localStorage.setItem('token', res.data.token)
            history.push('/private-route')
        })
    }

    return (
        <Container>
            <Jumbotron>
                <h1>Login:</h1>
                <Form onSubmit={submitHandler}>
                    <FormGroup>
                        <Label for="username" />
                        <Input type="text" name="username" id="username" placeholder="Username" onChange={changeHandler} value={login.username} />

                    </FormGroup>

                    <FormGroup>
                        <Label for="password" />
                        <Input type="password" name="password" id="password" placeHolder="Password" onChange={changeHandler} value={login.password} />
                    </FormGroup>

                    <Button type="submit">Login</Button>
                    <Button type="button" onClick={()=>{history.push("/register")}}
                    >Sign Up</Button>
                </Form>
            </Jumbotron>
        </Container>
    )
}

export default LoginForm