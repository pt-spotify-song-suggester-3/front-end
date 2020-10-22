import React, { useState, useEffect } from "react";
import {Container, Jumbotron, Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from 'react-redux';
import { update, removeUser } from './store/actions'
import { useHistory } from "react-router-dom"
import {axiosWithAuth} from './utils/axiosWithAuth';

function EditUser({ removeUser, update}){

    const history = useHistory()

    const [ userUpdate, setuserUpdate ] = useState({
        username:"",
        password:'',
        id:''
    })

    console.log(userUpdate)
    
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
        axiosWithAuth().get(`api/user/${user_id}`)
            .then(res=>{
                console.log("Success on Edit User", res)
                let users_arr = res.data
                setuserUpdate(users_arr)
                
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
									<Label for="username"/>
									<Input type="text" name="username" value={userUpdate.username} id="username" placeholder="Username"  onChange={changeHandler} />
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
	{ update, removeUser }
) ( EditUser );
