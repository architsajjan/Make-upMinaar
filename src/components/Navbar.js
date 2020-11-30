// IMPORTS
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * @function Navbar :
 * This component is a dynamic navbar
 * 
 * @param {Function} action  a function that triggers an action on click of brand logo.
 * @return {JSX} 
 */
function Navbar(props) {
    return (
        <nav className="navbar">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> <input type="button" className="brandName" value="The MakeUp Minar" onClick={()=>props.action()}/>
                </Link>
            </h1>
        </nav>
    )
}

Navbar.propTypes = {
    action : PropTypes.func.isRequired
}

export default Navbar;