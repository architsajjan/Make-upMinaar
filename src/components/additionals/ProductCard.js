// IMPORTS
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

/**
 * @class
 * ProductCard is an example of a Pure component and doesnt Rerenders
 * @param {String} id Id of the product
 * @param {String} api_featured_image Image of the product
 * @param {String} name Name of the product
 * @param {String} brand Brand of the product
 * @param {String} category Category of the product
 * @param {String} product_type Type of the product
 * @param {String} rating Rating of the product
 * @param {String} currency Currency of the product
 * @param {String} price_sign Price Sign of the product
 * @param {String} price Price of the product
 */
class ProductCard extends PureComponent {
    constructor(props){
        super(props);
    }

    render(){
        let { id, api_featured_image, name, brand, category, product_type, rating, currency, price_sign, price } = this.props.item;

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
        );
    }
}

ProductCard.propTypes = {
    item : PropTypes.object.isRequired
};

export default ProductCard;