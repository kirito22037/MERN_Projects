import React from 'react';

const Alert = ({ message })=>{

    return(
        <div className="alert alert-warning alert-dismissible fade show mt-4" role="alert">
        <strong>{ message }</strong>
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
    );
};

export default Alert;