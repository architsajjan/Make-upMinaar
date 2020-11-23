// IMPORTS
import React from 'react';
import PropTypes from 'prop-types';

export default function Pagination(props) {  
    return (
        <div className="page" onClick={()=>props.callback(props.page)}>
            <p>{props.page}</p>
        </div>
    )
}

Pagination.propTypes = {
    page : PropTypes.number.isRequired,
    callback: PropTypes.func.isrequired
};
