// IMPORTS
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * @function
 * SearchBar : 
 * This component Manages user interaction to enable user to search a product
 * 
 * @param {Array} items  an array of fetched results
 * @param {Array} names  an array to store list of Products Names available
 * @param {Array} types  an array to store list of Product types available
 * @param {Array} categories  an array to store list of Products Categories available
 * @param {Array} tags  an array to store list of Products Tags available
 * @param {Array} brands  an array to store list of Brands available
 * @param {Array} browseHistory  an array to display search history
 * @return {JSX}
 */
function SearchBar(props) {
    const { names, types, categories, tags, brands, browseHistory } = props;

    let items = [];
    if(names)items =[...items, ...props.names]; 
    if(types)items =[...items, ...props.types]; 
    if(categories)items =[...items, ...props.categories]; 
    if(tags)items =[...items, ...props.tags]; 
    if(brands)items =[...items, ...props.brands]; 

    /**
     * State of the SEARCHBAR component using useState Hook
     * @param {Array} suggestions holds list of suggestions for autocomplete
     * @param {Boolean} disableSearchAll a flag to toggle between search all products and search searched product
     * @param {String} str holds the value of searched string
     */
    const [suggestions, setSuggestions] = useState([]);
    const [disableSearchAll, setDisableSearchAll] = useState(false);
    const [str, setStr] = useState("");

    /**
     * @function onTextChanged()
     * this function handles input form changes in searchBar
     * @param {Event} event holds the event that triggeres this method
     */
    function onTextChanged(event){
        const value = event.target.value;
        if (value === "") setDisableSearchAll(false);
        else setDisableSearchAll(true);

        let localSuggestions = [];
        if(value.length > 0){
            const regex = new RegExp(`^${value}`, 'i');
            localSuggestions = items.sort().filter(v => regex.test(v));
        }
        setSuggestions(localSuggestions);

        setStr(value);
    } 

    /**
     * @function renderSuggestions()
     * this function renders suggestions as per searched string
     * @param {Array} suggestions holds the list of suggestions
     * @return {JSX}
     */
    function renderSuggestions(){
        if(suggestions.length === 0){return null;}
        return (
            <ul>
                <p className="medium">TRY TYPING:</p>
                {suggestions.slice(0,5).map((item) => <li onClick={()=>props.autocompleteCallback(item)} key={item}>{item}</li>)}
            </ul>
        );
    }      
    
    /**
     * @function renderRecents()
     * this function renders 5 recently searched strings
     * @param {Array} browseHistory holds the list of 5 recent searches
     * @return {JSX}
     */
    function renderRecents(){
        if(!browseHistory || browseHistory.length === 0){return null;}
        return (
            <ul>
                {browseHistory.map((item) => <li className="recentlySearched" onClick={()=>props.autocompleteCallback(item)} key={item}>{item ==="" ? "ALL Products": item} (RECENT)</li>)}
            </ul>
        );
    }                    

    return (
        <div>
            <form className="form searchForm form-bg" onSubmit={()=>props.searchItem(str)}>
                <div className="form-group">
                    <input type="text" className="SearchBox" spellCheck="false" autoComplete="off"  placeholder="Search for a product/ brand/ category" name="searchedText" onChange={onTextChanged} />
                </div>
                {/* <div className="form-group">
                    <input type="button" className="btn primay-btn SearchButton"  value="All" onClick={props.searchItem} />
                </div>                */}
                <div className="form-group">
                    <input type="submit" className="btn primay-btn SearchButton"  value={disableSearchAll ? "Search" : "All Products"} />
                </div>
            </form>
            {renderSuggestions()}
            {renderRecents()}
        </div>
    )
}

SearchBar.propTypes = {
    searchItem : PropTypes.func.isRequired,
    autocompleteCallback : PropTypes.func.isRequired,
    names : PropTypes.array,
    types : PropTypes.array,
    categories : PropTypes.array,
    brands : PropTypes.array,
    tags : PropTypes.array,
    browseHistory : PropTypes.array
};

export default SearchBar;