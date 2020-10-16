import React from 'react';
import { Link } from 'react-router-dom';

function NavBar(){
    return (
        <div>
            <Link to="/login"><h2>Login</h2></Link>
            <Link to="/register"><h2>Sign Up</h2></Link>
            <Link to="/"><h2>Home</h2></Link>
        </div>
    )
}

export default NavBar
