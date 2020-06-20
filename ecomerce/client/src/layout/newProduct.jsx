import React , { useEffect , useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector , useDispatch } from 'react-redux';
import axios from 'axios';

import Alert from '../component/alert';
import { userDetails } from '../actions/userActions';

const NewProduct = (props)=>{

    const [loading , setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    
    const userDetailsStore = useSelector(state=>state.userDetails);
    const { data } = userDetailsStore;
    const userAuthStore = useSelector(state=>state.userAuth);
    const { tokenData } = userAuthStore;

    const dispatch = useDispatch();

    useEffect(() => {
        //get the user id
        if(data === null)
        {
            dispatch(userDetails(tokenData)); 
        }

        return () => {
            setMessage(null);
        }
    }, [])

    
    

    const formik = useFormik({
        initialValues:{
            productName : '',
            productBrand : '',
            productPrice : '',
            //image : '',
            description : ''
        },
        validationSchema : Yup.object({
            productName : Yup.string()
            .required('Required'),
            productBrand : Yup.string()
            .required('Required')
            .min(6,"Must be 6 or more character"),
            productPrice : Yup.number()
            .required('Required'),
            
            description : Yup.string()
            .required('Required')
            .min(10 , 'Must be 10 or more character')
        }),
        onSubmit : values =>{
            
            setLoading(true);
            const productform = document.getElementById('productform');
            let formData = new FormData(productform);
            formData.append('trader' , data.data._id );

            //dispatch(productAdd(formData)); 
            console.log("request send");  
            const config = {     
                headers: { 'content-type': 'multipart/form-data' }
            };
            axios.post('http://localhost:5000/product/new', formData , config)
            .then(res=>{
                console.log(res.data);
                setLoading(false);
                setMessage(res.data.message);
            })
            .catch(err=>{
                console.log(err);
                setLoading(false);
                setMessage(err);
            });         
        }
    });

    const error = null;

    return (
        <div className="container pt-4">
            
            { message!==null ? <Alert message={ message } /> : null }

            <div className="card p-4" style={ { minWidth : "26rem" } }>

                <h1 className="card-title mb-4">Create New Product</h1>
                
                <form onSubmit={ formik.handleSubmit } id="productform">
                
                <div className="form-group">
                    <label htmlFor="productName">Product Name</label>
                    <input type="text" className="form-control" 
                    id="productName"
                    name="productName"
                    onChange={ formik.handleChange }
                    onBlur={ formik.handleBlur }
                    value={ formik.values.productName }/>
                    {
                        formik.touched.productName && formik.errors.productName ? 
                        (<small style={ {'color' : 'red'} }>{ formik.errors.productName }</small>) : null
                    }
                </div>

                <div className="form-group">
                    <label htmlFor="productBrand">Product Brand</label>
                    <input type="text" className="form-control" 
                    id="productBrand"
                    name="productBrand" 
                    onChange={ formik.handleChange }
                    onBlur={ formik.handleBlur }
                    value={ formik.values.productBrand }/>
                    {
                        formik.touched.productBrand && formik.errors.productBrand ? 
                        (<small style={ {'color' : 'red'} }>{ formik.errors.productBrand }</small>) : null
                    }
                </div>
                
                {
                <div className="form-group">
                <label htmlFor="productImageC">Product Image </label>
                    <div className="custom-file" id="productImageC">
                        <input type="file" className="custom-file-input" 
                        id ="image"
                        name ="image"
                        onChange={ formik.handleChange }
                        onBlur={ formik.handleBlur }
                        value={ formik.values.image }/>
                        <label className="custom-file-label" htmlFor="image" aria-describedby="inputGroupFileAddon02"
                        >{ formik.values.image }</label>
                    </div>
                    {
                        formik.touched.image && formik.errors.image ? 
                        (<small style={ {'color' : 'red'} }>{ formik.errors.image }</small>) : null
                    }
                </div>
                }

                <div className="form-group">
                    <label htmlFor="productPrice">Product Price</label>
                    <input type="number" className="form-control" 
                    id="productPrice"
                    name="productPrice"
                    onChange={ formik.handleChange }
                    onBlur={ formik.handleBlur }
                    value={ formik.values.productPrice }
                    />
                    {
                        formik.touched.productPrice && formik.errors.productPrice ? 
                        (<small style={ {'color' : 'red'} }>{ formik.errors.productPrice }</small>) : null
                    }
                </div>
                
                <div className="form-group">
                    <label htmlFor="description">Product Description</label>
                    <textarea className="form-control" 
                    id="description" rows="3"
                    name="description"
                    onChange={ formik.handleChange }
                    onBlur={ formik.handleBlur }
                    value={ formik.values.description }
                    ></textarea>
                    {
                        formik.touched.description && formik.errors.description ? 
                        (<small style={ {'color' : 'red'} }>{ formik.errors.description }</small>) : null
                    }
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

        </div>
    )
};

export default NewProduct;