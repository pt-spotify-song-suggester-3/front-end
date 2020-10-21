import React, { useState, useEffect} from "react";
import {axiosWithAuth} from './utils/axiosWithAuth'
import { Col, Card, CardTitle, CardImg, ListGroup, ListGroupItem, Button, UncontrolledCollapse } from "reactstrap";
import { useHistory } from 'react-router-dom';

const placeholder = require("../placeholder.svg");

function UserCard(props){

	const [ userCard, setUserCard ] = useState({})
	
	const { push } = useHistory()

	const openEditLink = () => {
		push('/edit-user')
		// window.location.reload(true)
	}

	const logout = e => {
		if(localStorage.getItem("token") || localStorage.getItem('ID')){ 
		localStorage.removeItem('token');
		localStorage.removeItem('ID')
		push("/login")
		window.location.reload(true)
		}		
	};

	useEffect(() => {
        let user_id = localStorage.getItem('ID');
		axiosWithAuth()
			.get(`/users`)
            .then(res=>{
                let users_arr = res.data.users
                let editable_user = users_arr.filter((user)=> user.id == user_id)
                setUserCard(editable_user[0])
            })
            .catch(err=>console.log(err))
    },[])


	
	return(
		<Col sm="2">
	    		<Card>
					<div>
						<CardImg src={placeholder}/>
						<CardTitle>{`${userCard.first_name} ${userCard.last_name}`}</CardTitle>
						
						<Button type="button" id="toggler" block>
							<svg className="bi bi-list" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							  <path fillRule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
							</svg>
						</Button>
						
					    <UncontrolledCollapse toggler="#toggler">
					          <ListGroup>
								  <ListGroupItem onClick={openEditLink} tag="button">Update Profile</ListGroupItem>
							      <ListGroupItem tag="button">Preferences</ListGroupItem>
							      <ListGroupItem tag="button">Account Settings</ListGroupItem>
							      <ListGroupItem tag="button">Song Metrics</ListGroupItem>
							      <ListGroupItem onClick={logout} tag="button" color="danger">Sign Out</ListGroupItem>
							   </ListGroup>
					    </UncontrolledCollapse>
					</div>
				</Card>
	    	</Col>
	);
}

export default UserCard ;