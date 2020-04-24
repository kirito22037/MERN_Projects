import React from 'react';
import './profile.css';
import $ from 'jquery';

class Profile extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {
            data : ""
        }
    }

    logOut = ()=>{
        window.open("//localhost:5000/auth/logout" , "_self");
    };

    componentDidMount()
    {
        $.ajax({
            type : 'GET',
            url : '/auth/google/user',
            contentType : 'application/json',
            success : (result , status)=>{
                result = JSON.stringify(result);
                console.log(" the data we reci : ",result);
                this.setState({
                    data : result
                });
            },
            error : (xhr , status ,err)=>{
                console.log("error : ",err);
            }
        });
    }

    render()
    {
        return(
            <div className="card">
                { this.state.data }

                <br/>
                <button 
                onClick={ this.logOut }
                >
                    Logout
                </button>
            </div>
        )
    };
};

export default Profile;