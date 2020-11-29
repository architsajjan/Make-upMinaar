// IMPORTS
import React from 'react';
import PropTypes from 'prop-types';

/**
 * @function
 * Loading :
 * This component is displayed when API fetches data from Online Resource
 * 
 * @param {Function} loadLocalData  a function that loads local data in place of waiting for data from Online API
 */
function Loading(props) {
    return (
        <div className="home landing">
        <h2 className="large">Loading The Site! Please wait a moment</h2>
        <input className="btn btn-primary" type="button" onClick={props.loadLocalData} value="Use Local Version"/>
        </div>
    )
}

Loading.propTypes = {
    loadLocalData : PropTypes.func.isRequired
};

export default Loading;