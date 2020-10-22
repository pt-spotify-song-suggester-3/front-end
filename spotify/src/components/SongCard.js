import React from "react";
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardText, CardImg} from "reactstrap";
//const placeholder = require("../placeholder.svg");

function SongCard(props){
    console.log(props)
	return(
			<Card>
				<Row>
					<Col >
						<CardImg src={props.result ? props.result.album.images[0].url : <img alt="missing image"/>} />
					</Col>
					<Col >
						<CardBody>
							<CardTitle>{props.result ? props.result.name: null}</CardTitle>
							<CardSubtitle>{props.result ? props.result.artists[0].name : null}</CardSubtitle>
							<CardText>{props.result ? props.result.album.release_date : null}</CardText>
						</CardBody>
					</Col>
				</Row>
			</Card>
	);
}
export default SongCard;