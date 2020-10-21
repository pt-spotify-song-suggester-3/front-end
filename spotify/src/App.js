import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Registration from './components/RegisterForm';
import NavBar from './components/NavBar';
import Searchbar from './components/Searchbar'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/register" component={Registration} />
        <Route exact path="/search" component={Searchbar}/>
      </Switch>
    </div>
  );
}

export default App;
