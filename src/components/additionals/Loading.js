// IMPORTS
import React from 'react';
import PropTypes from 'prop-types';
import Loader from './Loader';

/**
 * @function
 * Loading :
 * This component is displayed when API fetches data from Online Resource
 * 
 * @param {Function} loadLocalData  a function that loads local data in place of waiting for data from Online API
 */
function Loading(props) {
    if(props.errorRecieved) 
        return (
            <div className="loading landing">
            <h2 className="large">Looks like it&apos;s taking longer than usual</h2>
            <p className="medium">We Recommend you to use the local version instead.</p>
            <input className="btn btn-primary" type="button" onClick={props.loadLocalData} value="Use Local Version"/>
            </div>
        )
    else
        return (
            <div className="loading landing">
            <Loader />
            <h2 className="large">Loading The Site! Please wait a moment</h2>
            <input className="btn btn-primary" type="button" onClick={props.loadLocalData} value="Use Local Version"/>
            </div>
        )
}

Loading.propTypes = {
    loadLocalData : PropTypes.func.isRequired,
    errorRecieved : PropTypes.bool
};

export default Loading;