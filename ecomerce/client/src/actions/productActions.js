import axios from 'axios';

const listProducts = (dispatch)=>{
    dispatch({ type : "PRODUCT_LIST_REQUEST" });
    axios.get('http://localhost:5000/product/all')
        .then(res=>{
            dispatch({ type : "PRODUCT_LIST_SUCCESS" , payload : res.data });
        })
        .catch(err=>{
            dispatch({ type : "PRODUCT_LIST_FAIL" , payload : err });
        });
};

const productData = (id)=>(dispatch , getState )=>{
        dispatch({ type : "PRODUCT_DATA_REQUEST" });
        axios.get(`http://localhost:5000/product/${id}`)
        .then(res=>{
            dispatch({ type : "PRODUCT_DATA_SUCCESS" , payload : res.data });
        })
        .catch(err=>{
            dispatch({ type : "PRODUCT_DATA_FAIL" , payload : err });
        });
    };

/*
const productAdd = (formData)=>{
    return (dispatch, getState)=>{
        dispatch({ type : "PRODUCT_ADD_REQUEST"});

        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        };
        axios.post('http://localhost:5000/product/new', formData , config)
        .then(res=>{
            dispatch({ type : "PRODUCT_ADD_SUCCESS" , payload : res.data });
        })
        .catch(err=>{
            dispatch({ type : "PRODUCT_ADD_FAIL" , payload : err });
        });
    };
};*/

export { 
    listProducts,
    productData,
    //productAdd
};