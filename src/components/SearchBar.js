// IMPORTS
import React from 'react';
import PropTypes from 'prop-types';

export default function SearchBar(props) {    
    return (
        <div>
            <form className="form searchForm form-bg">
                <div className="form-group">
                    <input type="text" className="SearchBox" spellCheck="false" autoComplete="off"  placeholder="Search for a product/ brand/ category" name="searchedText" onChange={props.handleChange}  required />
                </div>
                <div className="form-group">
                    <input type="button" className="btn primay-btn SearchButton"  value="Search"  onClick={props.searchItem}/>
                </div>
            </form>
        </div>
    )
}

SearchBar.propTypes = {
    handleChange : PropTypes.func.isRequired,
    searchItem : PropTypes.func.isRequired
};
