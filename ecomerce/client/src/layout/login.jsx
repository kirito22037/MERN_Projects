import React , { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch , useSelector } from 'react-redux';
import { loginUser } from '../actions/userActions';

import Alert from '../component/alert';

//check equality of password and re password
const Login = (props)=>{

    const dispatch = useDispatch();
    const userAuthData = useSelector(state=>state.userAuth);
    const { loading , tokenData , error } = userAuthData;
    
    
    const formik = useFormik({
        initialValues:{
            email : '',
            password : ''
        },
        validationSchema : Yup.object({
            email : Yup.string()
            .required('Required')
            .min(6,"Must be 6 or more character"),
            password : Yup.string()
            .required('Required')
            .min(6 , 'Must be 6 character')
        }),
        onSubmit : values =>{
            //alert(JSON.stringify(values, null, 2));
            dispatch(loginUser( formik.values.email , formik.values.password ));
        }
    });

    useEffect(()=>{
        if(loading === false && tokenData !== null)
        {
            props.history.push('/');
        }
    } , [userAuthData]);

    return (
        <div className="container ">
            
            { error!==null ? <Alert message={ error } /> : null }

            <div className="card p-4 mt-4" style={ { minWidth : "26rem" } }>

                <h1 className="card-title mb-4">Login Form</h1>
                
                <form onSubmit={ formik.handleSubmit } >
                
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp"
                    onChange={ formik.handleChange }
                    onBlur={ formik.handleBlur }
                    value={ formik.values.email }/>
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    {
                        formik.touched.email && formik.errors.email ? 
                        (<small style={ {'color' : 'red'} }>{ formik.errors.email }</small>) : null
                    }
                </div>
                <div class="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" class="form-control" id="password"
                    onChange={ formik.handleChange }
                    onBlur={ formik.handleBlur }
                    value={ formik.values.password }/>
                    {
                        formik.touched.password && formik.errors.password ? 
                        (<small style={ {'color' : 'red'} }>{ formik.errors.password }</small>) : null
                    }
                </div>
                
                <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>

        </div>
    )
};

export default Login;