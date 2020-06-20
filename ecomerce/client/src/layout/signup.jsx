import React , { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch , useSelector } from 'react-redux';
import { signupUser } from '../actions/userActions';

import Alert from '../component/alert';

//check equality of password and re password
const SignUp = (props)=>{

    const dispatch = useDispatch();
    const userAuthData = useSelector(state=>state.userAuth);
    const { loading , tokenData , error } = userAuthData;

    const formik = useFormik({
        initialValues:{
            userName : '',
            email : '',
            password : '',
            repassword : ''
        },
        validationSchema : Yup.object({
            userName : Yup.string()
            .required('Required'),
            email : Yup.string()
            .required('Required')
            .min(6,"Must be 6 or more character"),
            password : Yup.string()
            .required('Required')
            .min(6 , 'Must be 6 character'),
            repassword : Yup.string()
            .required('Required')
            .min(6 , 'Must be 6 or more character')
        }),
        onSubmit : values =>{
            //alert(JSON.stringify(values, null, 2));
            dispatch(signupUser(formik.values.userName , formik.values.email , formik.values.password ));
        }
    });

    useEffect(()=>{
        console.log("loading : ", loading);
        console.log("error : ", error);
        console.log("props : ", props);
        if(loading === false && tokenData !== null)
        {
            props.history.push('/');
        }
    } , [userAuthData]);

    return (
        <div className="container ">
            
            { error!==null ? <Alert message={ error } /> : null }

            <div className="card p-4 mt-4" style={ { minWidth : "26rem" } }>

                <h1 className="card-title mb-4">SignUp Form</h1>
                
                <form onSubmit={ formik.handleSubmit } >
                <div class="form-group">
                    <label htmlFor="username">User Name </label>
                    <input type="username" class="form-control" id="userName"
                    onChange={ formik.handleChange }
                    onBlur={ formik.handleBlur }
                    value={ formik.values.userName }/>
                    {
                        formik.touched.userName && formik.errors.userName ? 
                        (<small style={ {'color' : 'red'} }>{ formik.errors.userName }</small>) : null
                    }
                </div>
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
                <div class="form-group">
                    <label htmlFor="repassword">Re-Enter Password</label>
                    <input type="password" class="form-control" id="repassword"
                    onChange={ formik.handleChange }
                    onBlur={ formik.handleBlur }
                    value={ formik.values.repassword }
                    />
                    {
                        formik.touched.repassword && formik.errors.repassword ? 
                        (<small style={ {'color' : 'red'} }>{ formik.errors.repassword }</small>) : null
                    }
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>

        </div>
    )
};

export default SignUp;