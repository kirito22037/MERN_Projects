
const initUserState = {
    loading : null,
    tokenData : null,
    error : null
};

const userAuthReducer = (state=initUserState , action) =>{

    switch(action.type)
    {
        case "AUTH_REQUEST":
            return {
                ...state,
                loading: true
            };

        case "AUTH_SUCCESS":
            return {
                ...state,
                loading : false,
                tokenData : action.payload
            };

        case "AUTH_FAIL":
            return {
                ...state,
                loading : false,
                error : action.payload
            };
        
        case "AUTH_LOGOUT":
            return {
                ...state,
                tokenData : null
            };

        default : 
            return state;
    }
};



export {
    userAuthReducer
};