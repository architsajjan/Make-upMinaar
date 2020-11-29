// IMPORTS
import React from 'react';
import PropTypes from 'prop-types';

/**
 * @function
 * Pagination :
 * This component displays Pagination on the products page
 * 
 * @param {Number} page  a Number that shows the products page number that will be loaded on click
 * @param {Function} callback  a function that loads that aids changing pages for pagination 
 */
export default function Pagination(props) {  
    return (
        <div className="page" onClick={()=>props.callback(props.page)}>
            <p>{props.page}</p>
        </div>
    )
}

Pagination.propTypes = {
    page : PropTypes.number.isRequired,
    callback: PropTypes.func
};
