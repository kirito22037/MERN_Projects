import React from 'react';
import logo from './logo.svg';
import './App.css';

import Profile from './components/profile';
import ErrorPage from './components/error';
import LoginPage from './components/login';
import { Route, Switch, BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      
      <Switch>
          <Route path='/' component={ LoginPage } exact/>   
          <Route path='/profile' component={ Profile } />
          <Route component={ ErrorPage }/>   
      </Switch>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
