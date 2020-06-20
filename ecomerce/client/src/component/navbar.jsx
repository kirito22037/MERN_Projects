import React  from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useSelector , useDispatch } from 'react-redux';
import { userLogout } from '../actions/userActions';

const Navbar = () =>{
    
    const dispatch = useDispatch();
    const userDetailsStore = useSelector(state=>state.userDetails);
    const { loading } = userDetailsStore;

    const userAuth = useSelector(state=>state.userAuth);
    const { tokenData } = userAuth;

    const handleLogout = ()=>{
        dispatch(userLogout);
    };

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div className="container">
                    <Link className="navbar-brand" to="/">Rai Store</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse flex-row-reverse" id="navbarText">
                        <ul className="navbar-nav ">
                        {
                            tokenData === null || !tokenData ? <React.Fragment>
                            <li className="nav-item active">
                            <Link className="nav-link" to="/signin">Signup <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item active">
                            <Link className="nav-link" to="/login">Login <span className="sr-only">(current)</span></Link>
                            </li></React.Fragment> :
                            <React.Fragment>
                            <li className="nav-item active">
                            <Link className="nav-link" to="/profile">User <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item active">
                            <Link className="nav-link" to="/cart">Cart <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item active">
                            <span 
                            className="nav-link" 
                            style={ { cursor : "pointer" } }
                            onClick={ handleLogout }>Logout <span className="sr-only">(current)</span></span>
                            </li>
                            </React.Fragment>
                        }
                        
                        </ul>
                    </div>
            </div>
        </nav>
    );
};

export default Navbar;