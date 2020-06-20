import React , { useEffect } from 'react';


import Alert from '../component/alert';

import { useDispatch , useSelector } from 'react-redux';
import { productData } from '../actions/productActions';

const Product = (props)=>{

    const dispatch = useDispatch();
    const product = useSelector(state=>state.productData);
    const { loading , data , error } = product;

    useEffect(()=>{
        dispatch( productData(props.match.params.id) );
    },[]);

    return(
        <div className="container">
            
            { loading ? null : (
                error ? <Alert message={ error } /> :
                <React.Fragment>
                <div className="d-flex justify-content-center align-items-center " style={ { height : "100%" }}>
                    
                    <div class="card " style={ { height : "32rem" , minWidth : "28rem" }}>
                    <img 
                    className=""
                    style={ { maxHeight : "100%" , maxWidth : "100%" }}
                    src={ data.imageUrl } 
                    alt="image"></img>
                    </div>

                    <div class="card " style={ { minHeight : "32rem" ,  minWidth : "44rem" } } >
                    <div class="card-body p-5 d-flex flex-column">
                        <h1 className="card-title flex-fill">{ data.productName }</h1>
                        <h3 className="product-price flex-fill">{ `$ ${data.productPrice}` }</h3>

                        <h5 className="text-muted">Brand</h5>
                        <h5 className="card-title flex-fill">{ data.productBrand }</h5>

                        <h5 className="text-muted">Description</h5>
                        <h5 className="card-title flex-fill">{ data.description }</h5>
                        
                        <button className=" btn btn-primary"> Add To CART</button>
                    </div>
                    </div>

                </div>
                </React.Fragment>
            )}
        </div>
    );
};

export default Product;