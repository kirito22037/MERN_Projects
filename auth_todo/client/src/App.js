import React from 'react';
import { BrowserRouter , Switch ,Route } from 'react-router-dom';

import Login from './components/LoginForm';
import NavBar from './components/NavBar';
import SignUp from './components/SignUp';
import Todo from './components/Todo';

function App() {
  return (
    <BrowserRouter>
    <div className="">
      <NavBar/>
      
      <Switch>
        <Route path='/login' exact component={ Login }/>
        <Route path='/' exact component={ Todo }/>
        <Route path='/signup' exact component={ SignUp }/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
