// IMPORTS
import React from 'react';
import PropTypes from 'prop-types';

export default function ProductCard(props) {
    let { id, api_featured_image, name, brand, category, product_type, rating, currency, price_sign, price } = props.item;
    
    // HANDLE NULL OR UNDEFINED VALUES IN DATA
    if(api_featured_image === null || api_featured_image === ""){
        api_featured_image = "../../imgs/defaultThumbnail.png";
    }
    if(brand === null || brand === ""){
        brand = "Unavailable";
    }
    if(category === null || category === ""){
        category = "Unavailable";
    }
    if(rating === null || rating === ""){
        rating = "Unavailable";
    }
    if(product_type === null || product_type === ""){
        product_type = "Unavailable";
    }
    
    return (
        <div className="productCard">
            
            <div className="details">
                <h3>{name}</h3><hr />
                <p>Brand: {brand} ||| Category: {category} ||| Product Type: {product_type}</p><br />
                <p>Rating: {rating}</p><p>Price{currency}: {price_sign} {price}</p><br />
                
                {/*        // ENABLE THIS COMMENT TO LOAD LOCAL COMPONENT TO DISPLAY PRODUCT DETAILS
                <input type="button" className="btn primary-btn" value="View Product IN local component" onClick={() => window.open(`/products/${id}/details`)} /> */}
                
                <input type="button" className="btn primary-btn" value="View Product" onClick={() => window.open(`https://makeup-api.herokuapp.com/api/v1/products/${id}`)} />
            </div> 
            <div className="thumbnail">
                <img src={api_featured_image} alt="logo.png"/>
            </div> 
        </div>
    )
}

ProductCard.propTypes = {
    item : PropTypes.array.isRequired
};