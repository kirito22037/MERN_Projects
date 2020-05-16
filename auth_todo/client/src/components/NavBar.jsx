import React from 'react';
import { Link ,withRouter } from'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';


const handleLogOut = (props)=>{
    console.log("logout called");
    axios.get('http://localhost:5000/auth/logout')
    .then((result)=>{
        //change the store auth stat
        props.updateAuth(result.data);

        //redirect to login page
        props.history.push('/login');
    })
    .catch(err=>{
        console.log("error during logout");
        console.log(err);
    });
};

const NavBar =(props)=>{
    
        return(
            <nav style={ {marginBottom : "5rem" } }>
                <div className="nav-wrapper">
                    
                    <div className="container">
                        <Link to="/" id="nav-mobile" className="brand-logo"> ToDo</Link>
                        <a  data-target="mobile-demo" className="sidenav-trigger">
                            <i className="material-icons">menu</i>
                        </a>
                        <ul className="right hide-on-med-and-down">
                            { props.authentication.auth ? 
                            <li className="logout"
                            onClick={ ()=> handleLogOut(props) }>
                                <Link to="" >LogOut</Link>
                            </li> : 
                            <li className="login">
                                <Link to="/login" >LogIn</Link>
                            </li>}
                        </ul>
                    </div>
                </div>

                        <ul className="sidenav" id="mobile-demo">
                        { props.authentication.auth ? 
                            <li className="logout" onClick={ ()=> handleLogOut(props) }>
                                <Link to="" >LogOut</Link>
                            </li> : 
                            <li className="login">
                                <Link to="/login" >LogIn</Link>
                            </li>}
                        </ul>
            </nav>
        );
};

const mapStateToProps = (state , ownProp)=>{
    return({
        authentication : state.authentication
    });
};

const mapDispatchToProps = (dispatch)=>{
    return {
        updateAuth : (data)=>{
            dispatch({type : "update the auth stat" , data : data});
        }
    };
};

export default withRouter(connect(mapStateToProps , mapDispatchToProps)(NavBar));