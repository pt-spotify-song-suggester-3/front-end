import React, { useState, useEffect } from 'react';
import { /*TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText,*/ Row, Col } from 'reactstrap';
// import classnames from 'classnames';
// import SongCard from "./SongCard";
import ProfileCard from "./ProfileCard";
// import UserCard from "./UserCard";
import {axiosWithAuth} from './utils/axiosWithAuth';
import TabsContent from "./TabsContent";
import Tabs from "./Tabs";

function UserPage(){
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

//   useEffect(()=>{
// 	  axiosWithAuth()
// 	  .get("/users")
// 	  .then(res => console.log(res.data.users))
// 	  .catch(err => err)
//   })

	return (
		
		<div>
			<Row>
				<ProfileCard />
				<Col sm="9">
					<Tabs activeTab={activeTab} toggle={toggle} />
					<TabsContent activeTab={activeTab} />
				</Col>
			</Row>
		</div>

	);
}

export default UserPage;