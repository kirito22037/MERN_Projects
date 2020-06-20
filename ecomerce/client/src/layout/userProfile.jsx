import React , { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userDetails } from '../actions/userActions';

const Profile = (props)=>{

    const userDetailsStore  = useSelector(state=>state.userDetails);
    const { loading , data } = userDetailsStore;
    const userAuthStore = useSelector(state=>state.userAuth);
    const { tokenData } = userAuthStore;
    const dispatch = useDispatch();

    useEffect(() => {
        if(tokenData!==null && data===null )
        {
            dispatch(userDetails(tokenData));
        }    
        return () => {
            //nothing
        }
    }, []);

    const handleClick = ()=>{
        props.history.push('/newProduct');
    };

    return(
        <div className="container pt-4">
        
        { loading !== false ? <div>Loading ... </div> :
         
         <React.Fragment>
            <div className="d-flex card img-container-profile" >
                <img src="http://localhost:5000/src/photos/default_user.png" alt="user image" />    
            </div> 

            <div className="card profile-details mt-3">
                <div className="card-body">
                    <h3 className="card-title text-center">
                        User Details
                    </h3>

                    <h5>Name : </h5>
                    <div>{ data.name }</div>

                    <h5>Email : </h5>
                    <div>{ data.email }</div>
                </div>
            </div>

            <div className="card mt-3">

                <button 
                className="btn btn-primary mt-2"
                onClick={ handleClick }>
                    Add Product
                </button>
            </div>
        </React.Fragment>
        }

        </div>
    );
};

export default Profile;