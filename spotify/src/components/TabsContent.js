import React from "react";
import { Container, Row, Col, TabContent, TabPane } from "reactstrap";
import UserCard from "./UserCard";
import SongCard from "./SongCard";
import PlaylistList from "./PlaylistList";
import Searchbar from './Searchbar'

function TabsContent(props){
	return(
		<TabContent activeTab={props.activeTab}>
			<TabPane tabId="1">
				<Row>
					<Searchbar />
				</Row>
				<Row>
					<Col sm="12">
						<h4>Recently Played</h4>
					</Col>
					<Col>
						<SongCard />
					</Col>
				</Row>
			</TabPane>
			<TabPane tabId="2">
				<Row>
					<Col sm={{ size: 8, offset: 2 }}>
						<PlaylistList />
					</Col>
				</Row>
			</TabPane>
			<TabPane tabId="3">
				<Container>
					<Row>
						<UserCard />
					</Row>
				</Container>
			</TabPane>
		</TabContent>
	);
}

export default TabsContent;