import React from 'react';

export default function SearchBar(props) {
    return (
        <div>
            <form className="form searchForm form-bg">
                <div className="form-group">
                    <input type="text" className="SearchBox" spellCheck="false"  placeholder="Search for a product/ brand/ category" name="searchedText" onChange={props.handleChange}  required />
                </div>
                <div className="form-group">
                    <input type="button" className="btn primay-btn SearchButton"  value="Search"  onClick={props.searchItem}/>
                </div>
            </form>
        </div>
    )
}
