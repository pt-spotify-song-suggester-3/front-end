import React, { useState, useEffect } from 'react';
import { Container, Jumbotron, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import {axiosWithAuth} from './utils/axiosWithAuth'

function Registration(){
    const [user, setUser] = useState({
        username: '',
        password: '',
        terms: false
    });

    const [errors, setErrors] = useState({
        username: '',
        password:'',
        terms: ''
    });

    const [buttonIsDisabled, setButtonIsDisabled] = useState(true);

    const history = useHistory();

    const schema = yup.object().shape({
        username: yup.string().min(5, "Username must be at least 5 characters.").required("Username is required."),
        password: yup.string().min(8, "Password must be at least 8 characters long.").required("Password is required."),
        terms: yup.boolean().oneOf([true])
    });

    const validateChange = (e) => {
        yup
            .reach(schema, e.target.name)
            .validate(
                e.target.type === "checkbox" ? e.target.checked : e.target.value
            )
            .then((valid) => {
                // the input is passing!
                setErrors({...errors, [e.target.name]: ''})
            })
            .catch((err) => {
                console.log("error", err);
                setErrors({...errors, [e.target.name]: err.errors[0]})
            })
    }

    const changeHandler = (e) => {
        e.persist()
        validateChange(e)
        setUser({
            ...user,
            [e.target.name]: e.target.name === "terms" ? e.target.checked : e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if(user.terms){
            axiosWithAuth()
            .post("api/auth/register", {
                username: user.username,
                password: user.password
            })
            .then(res => {
                console.log(res)
                localStorage.setItem('token', res.data.token)
            })
            .catch(error => {
                console.log("Error upon registering", error)
            })
        }
        
    }

    useEffect(() => {
        schema.isValid(user).then((valid) => {
            setButtonIsDisabled(!valid)
        });
    }, [user])

    return (
        <Container>
            <Jumbotron>
                <h1>Register</h1>
                <Form onSubmit={submitHandler}>
                    <FormGroup>
                        <Label for="username" />
                        <Input type="text" name="username" id="username" placeholder="Username" onChange={changeHandler} value={user.username} />

                        {errors.username.length > 0 ? <p className="error">{errors.username}</p> : null}
                    </FormGroup>

                    <FormGroup>
                        <Label for="password" />
                        <Input type="password" name="password" id="password" placeholder="Password" onChange={changeHandler} value={user.password} />
                        {errors.password.length > 0 ? <p className="error">{errors.password}</p> : null}
                    </FormGroup>

                    <FormGroup>
                        <Label for="terms"/>
                        <Input type="checkbox" name="terms" id="terms" value={user.terms} onChange={changeHandler} />
                        Terms and Conditions
                        {errors.terms.length > 0 ? <p className="error">{errors.terms}</p> : null}
                    </FormGroup>

                    <Button type="submit" disabled={buttonIsDisabled}>Create an Account</Button>
                    <Button type="button" onClick={()=>{history.push("/login")}}
                    >Login</Button>
                </Form>
            </Jumbotron>
        </Container>
    )
}



export default Registration;
