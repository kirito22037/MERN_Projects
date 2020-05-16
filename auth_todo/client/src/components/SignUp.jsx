import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';


    //pass props with event
    const handleSubmit= (props, e)=>{
        e.preventDefault();
        console.log("signup form is submited");

        const form = document.forms.signup;
        const name = form.elements.name.value;
        const email = form.elements.email.value;
        const password = form.elements.password.value;
        const repassword = form.elements.repassword.value;
        

        //return <Redirect to='/login' />
        if(password !== repassword)
        {
            console.log("the passwords dosnt match reenter");
        }

        else
        {
        //console.log(email , password);
        axios.post('http://localhost:5000/auth/register',{
            name : name,
            email: email,
            password : password
        })
        .then(res=>{
            console.log("resposne of signup : ",res);
            if(res.data.auth)
            {
                console.log(res.data.auth);
                console.log(res.data.token);

                //change the auth stat in store
                props.updateAuth(res.data);

                //return <Redirect to="/" />
                let { history } =props;
                history.push('/');
            }
        })
        .catch(err=>{
            console.log("error during signup" , err);
        });
        }
    };

//------------------signup function component---------------
const SignUp = (props)=>{

    
    return(
    <div className="container ">

        
        <div className="card blue-grey lighten-5 ">
            
            <form className="card-content" 
            onSubmit={ (e)=> handleSubmit(props, e) }
            name="signup">

                <div className="card-title col l6">SignIn</div>
                
                <div className="row">
                <div className="input-field ">
                    <input type="text" id="name" name="name"></input>
                    <label htmlFor="name">Name</label>
                </div>
                </div>

                <div className="row">
                <div className="input-field ">
                    <input type="text" id="email"  name="email"></input>
                    <label htmlFor="email">Email</label>
                </div>
                </div>

                <div className="row">
                <div className="input-field ">
                    <input type="password" id="password" name="password"></input>
                    <label htmlFor="password">Password</label>
                </div>
                </div>

                <div className="row">
                <div className="input-field ">
                    <input type="password" id="re_enter" name="repassword"></input>
                    <label htmlFor="re_enter">Re-enter Password</label>
                </div>
                </div>

                <div className="row">
                <button className="btn col s3">
                    SignUp
                </button>
                <div className="col s9 right-align">
                <Link to="/login" className="right-align">already have an account?</Link>
                </div>
                </div>
            </form>

        </div>

        
    </div>);
};

const mapDispatchToProps =(dispatch)=>{
    return({
        updateAuth : (data)=>{
            dispatch({type : "update the auth stat" , data : data});
        }
    })
};

export default withRouter(connect(null , mapDispatchToProps)(SignUp));