import React from 'react';
import { withRouter } from 'react-router-dom';

const ProductCard = (props) =>{
    //console.log("props of card : " , props);
    const { id , image , productName , productBrand , productPrice } = props;

    const handleClick = (id)=>{
        props.history.push(`/product/${id}`);
    };
    
    return(
        <div 
        onClick={ ()=>{ handleClick(id) } }
        key={ id }
        className="card mb-3" 
        style={ { width: "14rem"} }>
            <div className="img-container d-flex">
                <img src={ image } className="card-img-top" alt="image" />
            </div>
        
        <div className="card-body">
            <h5 className="card-title">{ productName }</h5>
            <h6 className="card-subtitle">{ productBrand }</h6>
            <h6 className="card-subtitle">{ `$ ${productPrice}` }</h6>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
        </div>
    );
};

export default withRouter(ProductCard);