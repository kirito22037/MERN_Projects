import React from 'react';
import {Link ,withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';


const handleSubmit= (props , e)=>{
    e.preventDefault();
    console.log("form is submited");

    const form = document.forms.login;
    const email = form.elements.email.value;
    const password = form.elements.password.value;

    
    console.log("login request send");
    axios.post('http://localhost:5000/auth/login',{
        email: email,
        password : password
    })
    .then(res=>{
        console.log("resposne of login : ",res);
        if(res.data.auth)
        {
            console.log("token : ",res.data.token);

            //change the store data here
            props.updateAuth(res.data);

            console.log("redirect url");
            let { history } = props;
            history.push('/');
        }
    })
    .catch(err=>{
        console.log("error during login");
        console.log(err);
    });
};

//-------------function component---------------
const Login = (props)=>{
    
    //console.log("the props of login page : ",props);
    return(
    <div className="container ">
        <div className="card blue-grey lighten-5 ">
            <form className="card-content" 
            name = "login"
            onSubmit={ (e)=> handleSubmit(props , e) }>

                <div className="card-title col l6">Login</div>
                
                <div className="row">
                <div className="input-field ">
                    <input type="text" name="email" id="email"></input>
                    <label htmlFor="email">Email</label>
                </div>
                </div>

                <div className="row">
                <div className="input-field ">
                    <input type="password" name="password" id="password"></input>
                    <label htmlFor="password">Password</label>
                </div>
                </div>

                <div className="row">
                <button className="btn col s3"
                type="submit">
                    Login
                </button>
                <div className="col s9 right-align ">
                <Link to="/signup" className="">don't have an account?</Link>
                </div>
                </div>
            </form>

        </div>
    </div>);
};


const mapDispatchToProps = (dispatch)=>{
    return {
                updateAuth : (data)=>{
                    dispatch({type : "update the auth stat" , data : data});
                }
    };
};

export default withRouter(connect(null , mapDispatchToProps)(Login));
//export default Login;