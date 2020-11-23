// IMPORTS
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function SearchBar(props) {
    let items = [...props.names, ...props.types, ...props.categories, ...props.tags, ...props.brands]; 
    //let suggestions = [];
    const [suggestions, setSuggestions] = useState([]);

    function onTextChanged(event){
        const value = event.target.value;
        let localSuggestions = [];
        if(value.length > 0){
            const regex = new RegExp(`^${value}`, 'i');
            localSuggestions = items.sort().filter(v => regex.test(v));
        }
        setSuggestions(localSuggestions);

        props.handleChange(event);
    } 

    function renderSuggestions(){
        if(suggestions.length === 0){return null;}
        return (
            <ul>
                <p className="medium">TRY TYPING:</p>
                {suggestions.slice(0,5).map((item) => <li onClick={()=>props.autocompleteCallback(item)} key={item}>{item}</li>)}
            </ul>
        );
    }

    return (
        <div>
            <form className="form searchForm form-bg" onSubmit={props.searchItem}>
                <div className="form-group">
                    <input type="text" className="SearchBox" spellCheck="false" autoComplete="off"  placeholder="Search for a product/ brand/ category" name="searchedText" onChange={onTextChanged}  required />
                </div>
                <div className="form-group">
                    <input type="submit" className="btn primay-btn SearchButton"  value="Search" />
                </div>
            </form>
            {renderSuggestions()}
        </div>
    )
}

SearchBar.propTypes = {
    handleChange : PropTypes.func.isRequired,
    searchItem : PropTypes.func.isRequired,
    autocompleteCallback : PropTypes.func.isRequired,
    names : PropTypes.array,
    types : PropTypes.array,
    categories : PropTypes.array,
    brands : PropTypes.array,
    tags : PropTypes.array
};
