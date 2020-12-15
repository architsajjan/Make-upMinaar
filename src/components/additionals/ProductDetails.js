import React from 'react';
import data from '../../Data.json';
import PropTypes from 'prop-types';

function ProductDetails(props) {
    const product = data.find((obj) => obj.id === Number(props.match.params.productID));
    
    const {api_featured_image, brand, category, created_at, currency, description, image_link, name, price, price_sign, product_api_url,  product_colors, product_link, product_type, rating,  tag_list, updated_at, website_link } = product;
    
    return (
        <div className="landing">
            <div className="productDetails">
                <div className="container">
                    <div className="productProfile">
                        <a href={image_link}><img className="thumbnmailImg" src={api_featured_image} alt="logo.png"/></a><br />
                        <p>Brand: {brand}</p><br />
                        <p>Category: {category}</p><br />
                        <p>Created_at: {created_at}</p><br />
                        <p>Currency: {currency}</p><br />
                        <p>Description: {description}</p><br />
                        <p>Name: {name}</p><br />
                        <p>Price: {price_sign} {price}</p><br />
                        <p>Product_api_url: {product_api_url}</p><br />
                        <p>Product_colors: {product_colors.map(colour => colour+",")}</p><br />
                        <p>Product_link: {product_link}</p><br />
                        <p>Product_type: {product_type}</p><br />
                        <p>Rating: {rating}</p><br />
                        <p>tag_list: {tag_list.map(tag => tag+",")}</p><br />
                        {/* <p>Tag_list: {tag_list}</p><br /> */}
                        <p>updated_at: {updated_at}</p><br />
                        <p>website_link: {website_link}</p><br />
                    </div>
                </div>
            </div>
        </div>
    );
}

ProductDetails.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            productID: PropTypes.string
        })
        }).isRequired
};

export default ProductDetails;