import React from 'react';
import PropTypes from 'prop-types';



{/* <Pagination pages={1} callback={this.implementPage}/>
                                <Pagination pages={2} callback={this.implementPage}/>
                                <Pagination pages={3} callback={this.implementPage}/>
                                <Pagination pages={4} callback={this.implementPage}/>
                                <Pagination pages={5} callback={this.implementPage}/>...
                                <Pagination pages={pages-5} callback={this.implementPage}/>
                                <Pagination pages={pages-4} callback={this.implementPage}/>
                                <Pagination pages={pages-3} callback={this.implementPage}/>
                                <Pagination pages={pages-2} callback={this.implementPage}/>
                                <Pagination pages={pages-1} callback={this.implementPage}/> */}

export default function Pagination(props) {  
    // let pages = [];

    // const page= (i) =>{
    //     <div className="page" onClick={()=>props.callback(i)}>
    //             <p>{i}</p>
    //         </div>
    // }

    // for (let i = 1; i < Number(props.pages); i++) 
    //     pages.push(page(i));
    
    return (
        <div className="page" onClick={()=>props.callback(props.page)}>
            <p>{props.page}</p>
        </div>
    )
}

Pagination.propTypes = {
    page : PropTypes.number.isRequired,
    callback: PropTypes.func.isrequired
};
