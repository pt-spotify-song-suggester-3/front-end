import React, { useState, useEffect } from "react";
import {Container, Jumbotron, Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from 'react-redux';
import { update, userCreds, removeUser } from '../actions/index'
import { useHistory } from "react-router-dom"
import axiosWithAuth from "../util/axiosWithAuth";

function EditUser({ userCreds, removeUser, update}){

    const history = useHistory()

    // const id = localStorage.getItem('ID')

    // console.log(userData)

    const [ userUpdate, setuserUpdate ] = useState({
        username:"",
        password: "",
    })
    
    const updateUser = (e) => {
        console.log('userUpdate', userUpdate)
        e.preventDefault();
        update(userUpdate)
        history.push('/private-route')
        // window.location.reload(true)
    }
    
    const changeHandler = e => {
        setuserUpdate({
            ...userUpdate,
            [e.target.name]: e.target.value
        })
    }

    const deleteUser = (e) => {
        e.preventDefault()
        let user_id = localStorage.getItem('ID')
		removeUser(user_id)
		localStorage.removeItem('token')
		localStorage.removeItem('ID')
		history.push("/login")
		// window.location.reload(true)
	}

    useEffect(() => {
        let user_id = localStorage.getItem('ID');
        axiosWithAuth().get(`/users`)
            .then(res=>{
                let users_arr = res.data.users
                let editable_user = users_arr.filter((user)=> user.id == user_id)
                setuserUpdate(editable_user[0])
            })
            .catch(err=>console.log(err))
    },[])


    
    return(
        <Container>
			<Jumbotron>
					<Form onSubmit={updateUser}>
						<h1>Edit: </h1>
						<Row>
							<Col sm="4">
								<FormGroup>
									<Label for="email"/>
									<Input type="email" name="email" value={userUpdate.email} id="email" placeholder="Email"  onChange={changeHandler} />
								</FormGroup>
							</Col>
							<Col sm="4">
								<FormGroup>
									<Label for="firstName" />
									<Input type="text" name="first_name" value={userUpdate.first_name} id="firstName" placeholder="First Name"  onChange={changeHandler} />
								</FormGroup>
							</Col>
							<Col sm="4">
								<FormGroup>
									<Label for="lastName" />
									<Input type="text" name="last_name" value={userUpdate.last_name}id="lastName" placeholder="Last Name"  onChange={changeHandler} />
								</FormGroup>
							</Col>
						</Row>
                        <Row>
							<Col sm="12">
								<Button type="submit">Submit Changes</Button>
                            </Col>
                            <Col>
                                <Button type="button" onClick={()=>{
                                    history.push('/private-route')
                                    window.location.reload(true)}
                                    } >Back</Button>
                            </Col>
                        </Row>
                        <Row>
                        <Button onClick={deleteUser} tag="button" color="danger">DELETE ACCOUNT</Button>
                        </Row>
							
					</Form>
			</Jumbotron>
		</Container>
    )
}

const mapStateToProps = state => {
    return {
        username: state.username,
		password: state.password,

    }
}

export default connect (
    mapStateToProps,
	{ update, userCreds, removeUser }
) ( EditUser );