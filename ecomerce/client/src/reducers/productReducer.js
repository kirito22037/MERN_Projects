const productListReducer = (state={ loading : true } , action)=>{

    switch(action.type)
    {
        case "PRODUCT_LIST_REQUEST" :
            return {
                loading : true
            };

        case "PRODUCT_LIST_SUCCESS":
            return {
                loading : false,
                data : action.payload 
            };

        case "PRODUCT_LIST_FAIL":
            return {
                loading : false,
                error : action.payload
            };

        default : 
            return state;
        
    }
};

const productDataReducer = (state={loading : true} , action)=>{
    switch(action.type)
    {
        case "PRODUCT_DATA_REQUEST":
            return {
                loading : true
            };
        
        case "PRODUCT_DATA_SUCCESS":
            return {
                loading : false,
                data : action.payload
            };

        case "PRODUCT_DATA_FAIL":
            return { 
                loading : false,
                error : action.payload
            };

        default :
            return state;
    }
};

/*
const productAddReducer=(state={loading : null} , action)=>{
    switch(action.type)
    {
        case "PRODUCT_ADD_REQUEST":
            return {
                loading : true
            };
        
        case "PRODUCT_ADD_SUCCESS":
            return {
                loading : false,
                message : action.payload
            };

        case "PRODUCT_ADD_FAIL":
            return {
                loading : false,
                message : action.payload
            };

        default : 
            return state;
    }
};*/

export {
    productListReducer,
    productDataReducer,
    //productAddReducer
};