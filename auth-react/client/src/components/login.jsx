import React from 'react';
import './login.css';
import $ from 'jquery';

import { Link } from 'react-router-dom';

class LoginPage extends React.Component{


    googleSignin = (e)=>{
        //e.preventDefault();
        console.log("sending GET request");
        window.open("//localhost:5000/auth/login/google" , "_self"); 
    };
    
   

    testServer = ()=>{
        $.ajax({
            type : 'GET',
            url : '/api/eg',
            contentType : 'application/json',
            success : (result , status)=>{
                console.log("the result we recieved is : ",result);
            },
            error : (xhr ,status ,  err)=>{
                console.log("error : ",err);
            }
        });
    }


    render()
    {
        
        return(
            <div className="card">
                <h2>Login Method</h2>
                <button
                onClick={ this.googleSignin }>
                     Google
                </button>
                <button
                onClick={ this.testServer }>
                    Test Server
                </button>
                
                </div>
            
        );
    }
};


export default LoginPage;