import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Cookies from 'js-cookie';

import { createStore , applyMiddleware , compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer/rootReducer';

const initState = {
    authentication : {
      token : Cookies.getJSON("token") || "",
      auth : Cookies.getJSON("token") ? true : false
    },
    tasks : []
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer  , initState , composeEnhancer(applyMiddleware(thunk)) );
store.subscribe(()=>{
  //console.log("the store is rendered and its data : ");
  //console.log(store.getState());
});


ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);


