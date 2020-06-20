import { createStore , compose , combineReducers , applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Cookies from 'js-cookie';

import { productListReducer, productDataReducer } from './reducers/productReducer';
import { userAuthReducer } from './reducers/userReducer';
import { userDetailsReducer } from './reducers/userDetailsReducer';


const initState = {
    userAuth : { 
        loading : null,
        tokenData : Cookies.get('token') || null,
        error : null
    }
};

const reducer = combineReducers({
    productList : productListReducer,
    userAuth : userAuthReducer,
    productData : productDataReducer,
    userDetails : userDetailsReducer,
    //addProduct : productAddReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(reducer , initState , composeEnhancer(applyMiddleware(thunk)));

export default store;