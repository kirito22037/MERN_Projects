import React , { useEffect } from 'react';
import axios from 'axios';

import ProductCard from '../component/productCard';
import Alert from '../component/alert';

import { listProducts } from '../actions/productActions';
import { useSelector , useDispatch } from 'react-redux';
import { userDetails } from '../actions/userActions';

const Home = (props)=>{

    const dispatch = useDispatch();
    const productList = useSelector(state=>state.productList);
    const { loading , data , error } = productList; 

    const userAuthStore = useSelector(state=>state.userAuth);
    const { tokenData } = userAuthStore;

    const userDetailsStore = useSelector(state=>state.userDetails);
    const userDetail = userDetailsStore.data;
    
    useEffect(()=>{
        dispatch(listProducts);
        if( tokenData !== null && userDetail===null )
        {
            dispatch(userDetails(tokenData));
        }
    },[]);

    return(
        <div className="container">
            <h1 className="my-3"> Home </h1>
            <div className="d-flex justify-content-between flex-wrap align-items-stretch">
            { 
                loading ? null : 
                error ? <Alert message={ error } /> :
                data.map(product=>(
                    <ProductCard 
                    key = { product._id }
                    id= { product._id }
                    image={ product.imageUrl }
                    productName={ product.productName } 
                    productPrice={ product.productPrice }
                    productBrand={ product.productBrand } />
                ))
            }
            </div>
        </div>
    );
};

export default Home;