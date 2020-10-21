import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import classnames from 'classnames';

function Tabs(props){
	
	return(
		<Nav tabs>
			<NavItem>
				<NavLink
				className={classnames({ active: props.activeTab === '1' })}
				onClick={() => { props.toggle('1'); }}
				>
				Profile
				</NavLink>
			</NavItem>
			<NavItem>
				<NavLink
				className={classnames({ active: props.activeTab === '2' })}
				onClick={() => { props.toggle('2'); }}
				>
				Saved Playlists
				</NavLink>
			</NavItem>
			<NavItem>
				<NavLink
					className={classnames({ active: props.activeTab === '3' })}
					onClick={() => { props.toggle('3'); }}
				>
					Followers
				</NavLink>
			</NavItem>
		</Nav>
	);
}

export default Tabs;