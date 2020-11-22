import React from 'react'
import { Link } from 'react-router-dom';

export default function ProductCard(props) {
    
    let { id, api_featured_image, name, brand, category, product_type, rating, currency, price_sign, price } = props.item;
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
                {/* <Link to={{ 
                    pathname: `/products/${id}/details`, 
                    state: props.item 
                    }}
                    >
                    Register
                </Link> */}
                <input type="button" className="btn primary-btn" value="View Product" onClick={() => window.open(`/products/${props.item.id}/details`)} />
            </div> 
            <div className="thumbnail">
                <img src={api_featured_image} alt="logo.png"/>
            </div> 
        </div>
    )
}
