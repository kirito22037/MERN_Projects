const axios = require('axios');
const Cookies = require('js-cookie');

const signupUser = (userName , email , password)=>{
    return (dispatch)=>{
        dispatch({ type : "AUTH_REQUEST"});
        axios.post('http://localhost:5000/user/signup' , { userName , email ,password })
        .then(res=>{
            //save the token to registry
            Cookies.set('token', res.data.token , { expires : 1 });
            dispatch(userDetails(res.data.token));
            dispatch({ type : "AUTH_SUCCESS" , payload : res.data.token });
            //userDetails(res.data.token);
            
        })
        .catch(err=>{
            dispatch({ type : "AUTH_FAIL" , payload : err.message });
        });
    }
};

const loginUser = (email , password)=>{
    return (dispatch)=>{
        dispatch({ type : "AUTH_REQUEST"});
        axios.post('http://localhost:5000/user/login' , { email , password })
        .then(res=>{
            Cookies.set('token', res.data.token , { expires : 1 });
            dispatch(userDetails(res.data.token));
            dispatch({ type : "AUTH_SUCCESS" , payload : res.data.token });
            //userDetails(res.data.token);
        })
        .catch(err=>{
            dispatch({ type : "AUTH_FAIL" , payload : err.message });
        });
    }
};

const userDetails = (token)=>{
    return (dispatch)=>{
        dispatch({ type : "USER_DETAILS_REQUEST"});
        axios.get("http://localhost:5000/user/me" , {
            headers : {
                'x-access-token' : token
            }
        })
        .then(res=>{
            dispatch({ type : "USER_DETAILS_SUCCESS" , payload : res.data.data });
        })
        .catch(err=>{
            dispatch({ type : "USER_DETAILS_FAIL" , payload : err.message });
        });
    }
}

const userLogout=(dispatch)=>{
    Cookies.remove('token');
    dispatch({ type : "AUTH_LOGOUT"});
    dispatch({ type : "USER_DETAILS_REMOVE" });
};


module.exports = {
    signupUser,
    loginUser,
    userDetails,
    userLogout
};