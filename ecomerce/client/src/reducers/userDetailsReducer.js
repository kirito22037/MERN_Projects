const initUserDetails = {
    loading : null,
    data : null,
    error : null
};

const userDetailsReducer = (state=initUserDetails , action)=>{

    switch(action.type)
    {
        case "USER_DETAILS_REQUEST":
        return {
            ...state,
            loading : true,
        }

        case "USER_DETAILS_SUCCESS":
            return {
                ...state,
                loading : false,
                data : action.payload
            }

        case "USER_DETAILS_FAIL":
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        
        case "USER_DETAILS_REMOVE":
            return {
                loading : null,
                data : null,
                error : null
            }

        default : 
        return state;
    }
} ;

module.exports = {
    userDetailsReducer
};