import React from "react";
import PropTypes from 'prop-types';

export default function PageCard (props){

    const pagetoload = (props.isPreviousNavPage && props.currentPage != 1) ? Number(props.page)-1 : (props.isNextNavPage && props.currentPage != props.lastPage) ? Number(props.page)+1 : Number(props.page);
    return <div className="page" style={{border : (props.currentPage === props.page)? "3px solid red" : "", marginRight : (props.isFirstPage || props.isPreviousNavPage || props.isNextNavPage) ? "8px" : "", marginLeft : (props.isLastPage || props.isNextNavPage) ? "8px" : ""}} onClick={()=>props.callback(pagetoload)}>
            <p>{props.isFirstPage ? "First Page" : props.isLastPage ? "Last Page" : props.isPreviousNavPage ? "Previous Page" : props.isNextNavPage ? "Next Page" : props.page}</p>
        </div>
}

PageCard.propTypes = {
    page : PropTypes.number.isRequired,
    callback: PropTypes.func,
    currentPage: PropTypes.number,
    lastPage: PropTypes.number.isRequired,
    isFirstPage: PropTypes.bool,
    isLastPage: PropTypes.bool,
    isPreviousNavPage: PropTypes.bool,
    isNextNavPage: PropTypes.bool
};
