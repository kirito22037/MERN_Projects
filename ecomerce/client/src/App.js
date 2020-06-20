import React from 'react';
import Navbar from './component/navbar';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';

import Home from './layout/home';
import Product from './layout/product';
import SignUp from './layout/signup';
import Login from './layout/login';
import Profile from './layout/userProfile';
import NewProduct from './layout/newProduct';

function App() {
  return (
    <Router>
    <React.Fragment>
      <Navbar/>

      <Switch>
        <Route path='/' exact component={ Home } />
        <Route path='/product/:id' component={ Product } />
        <Route path='/signin' component={ SignUp } />
        <Route path='/login' component={ Login } />
        <Route path='/profile' component={ Profile }/>
        <Route path='/newProduct' component={ NewProduct } />
      </Switch>

    </React.Fragment>
    </Router>
  );
}

export default App;
