// IMPORTS
import React from "react";
import PropTypes from 'prop-types';
import PageCard from './PageCard';

/**
 * @function
 * Pagination :
 * This component displays Pagination on the products page
 * 
 * @param {Number} page  a Number that shows the products page number that will be loaded on click
 * @param {Function} callback  a function that loads that aids changing pages for pagination 
 */
export default function Pagination(props) {  
    const {totalPages, currentPage, callback} = props;
    const noOfPagesPerPagination = 5;
    let initialPaginationPage = currentPage; 
    let defaultPagination = true;
    const firstPage = 1;
    const lastPage = totalPages;
     
    if(totalPages <= noOfPagesPerPagination){
        defaultPagination = true;
    }
    else{
        defaultPagination = false;
        while(initialPaginationPage + noOfPagesPerPagination > totalPages)
            initialPaginationPage--;
        if(initialPaginationPage >=3 && initialPaginationPage <= totalPages-noOfPagesPerPagination-2) initialPaginationPage-=2;
        if(initialPaginationPage === 2 || initialPaginationPage ===totalPages-noOfPagesPerPagination-1) initialPaginationPage-=1;
    }

    let pagination = [];
    defaultPagination ?
                        [...Array(totalPages).keys()].map(page => {
                            pagination.push(<PageCard key={page+1} page={page+1} currentPage={currentPage} lastPage={totalPages} callback={callback}/>)
                            })
                        : [...Array(noOfPagesPerPagination).keys()].map(page => {
                            pagination.push(<PageCard key={initialPaginationPage + page} page={initialPaginationPage} currentPage={currentPage} lastPage={totalPages} callback={callback}/>);
                            initialPaginationPage++;
                            });
    return (
        <div style={{display : "inline-flex"}}>
            {!defaultPagination && <PageCard page={firstPage} callback={callback} currentPage={currentPage} lastPage={totalPages} isFirstPage={true}/>}
            {!defaultPagination && <PageCard page={currentPage} callback={callback} currentPage={currentPage} lastPage={totalPages} isPreviousNavPage={true}/>}
            {pagination}
            {!defaultPagination && <PageCard page={currentPage} callback={callback} currentPage={currentPage} lastPage={totalPages} isNextNavPage={true}/>}
            {!defaultPagination && <PageCard page={lastPage} callback={callback} currentPage={currentPage} lastPage={totalPages} isLastPage={true}/>}
        </div>
    )
}

Pagination.propTypes = {
    totalPages : PropTypes.number.isRequired,
    currentPage : PropTypes.number.isRequired,
    callback: PropTypes.func
};
