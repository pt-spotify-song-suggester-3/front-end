import React from "react";
import { Button, Col, Card, CardBody, CardTitle, CardSubtitle, CardImg } from "reactstrap";
const placeholder = require("../placeholder.svg");

function UserCard(){
	return(
		<Col sm="2">
			<Card>
				<CardImg src={placeholder}/>
				<CardBody>
					<CardTitle>User Name</CardTitle>
					<CardSubtitle>First Name</CardSubtitle>
					<Button>Add Friend</Button>
				</CardBody>
			</Card>
		</Col>
	);
}

export default UserCard;