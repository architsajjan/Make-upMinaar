import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './additionals/ProductCard';

export default class Products extends Component {
    constructor(props){
        super(props);
        this.state={
            brandsFilter: [],
            tagsFilter: [],
            ratingsFilter: 0,
            pricesFilter: 0,
            fetchedProducts: this.props.products,
            products: this.props.products
        };
        this.handleBrandChange = this.handleBrandChange.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.applyFilters = this.applyFilters.bind(this);
    }

    handleBrandChange(event){
        const { brandsFilter } = this.state;
        if(brandsFilter.includes(event.target.value)){
            brandsFilter.pop(event.target.value);
        }
        else{
            brandsFilter.push(event.target.value);
        }
        this.setState({
            brandsFilter: brandsFilter
        });
    }
    
    handleTagChange(event){
        const { tagsFilter } = this.state;
        if(tagsFilter.includes(event.target.value)){
            tagsFilter.pop(event.target.value);
        }
        else{
            tagsFilter.push(event.target.value);
        }
        this.setState({
            tagsFilter: tagsFilter
        });
    }

    handleRatingChange(event){
        const { ratingsFilter } = this.state;
        if(Number(event.target.value) === 0)
        this.setState({
            ratingsFilter: 0
        });
        if(ratingsFilter !== Number(event.target.value) && Number(event.target.value) !== 0)
            this.setState({
                ratingsFilter: Number(event.target.value)
            });
    }

    handlePriceChange(event){
        const { pricesFilter } = this.state;
        if(Number(event.target.value) === 0)
        this.setState({
            pricesFilter: 0
        });
        if(pricesFilter !== Number(event.target.value) && Number(event.target.value) !== 0)
            this.setState({
                pricesFilter: Number(event.target.value)
            });
    }

    applyFilters(){
        const { fetchedProducts, brandsFilter, tagsFilter, ratingsFilter, pricesFilter} = this.state;
        let value = fetchedProducts;
        
        // if(brandsFilter.length === 0 && tagsFilter.length === 0) this.products;
        if(brandsFilter.length !== 0)
        value = value.filter(item => 
          (item.brand!==null ? brandsFilter.includes(item.brand) : false)
        );
        if(tagsFilter.length !== 0)
        value = value.filter(item => 
          (item.tag_list!==null ? tagsFilter.some(tag => item.tag_list.includes(tag)) : false) 
        );
        if(ratingsFilter !== 0)
        value = value.filter(item => 
            (item.rating!==null ? item.rating>=ratingsFilter : false)
        );
        if(pricesFilter === 1)
            value = value.filter(item => 
                (item.price!==null ? item.price<10 : false)
            );
        else if(pricesFilter === 2)
            value = value.filter(item => 
                (item.price!==null ? item.price>=10 && item.price<=15 : false)
            );
        else if(pricesFilter === 3)
            value = value.filter(item => 
                (item.price!==null ? item.price>15 : false)
            );
        

        this.setState({ products: value });        
      }

    render(){
        const { products } = this.state;
        let element;

        if(products.length > 0){

            element =   <div className="productContainer">
                            <h1 className="medium text-primary alignLeft">Search Results for &quot;{this.props.searchString}&quot;</h1>
                            {products.map(product => (
                                <ProductCard key={product.id}
                                    item={product} />
                            ))}
                        </div>  ;
        }
        else{

            element =   <div className="container">
                            <h1 className="medium text-primary">No products found for your searched Item.</h1>
                        </div>  ;
        }
        return (
            <div>
                <div className="landing">
                    
                    <div className="landing-main">
                        {element}  
                    </div>
                    <div className="">
                        <div className="landing-filter">
                        <h1 className="medium">Filters<input type="button" value="Apply" onClick={this.applyFilters} /></h1>
                        <div className="brandFilters">
                            <h3 className="medium">Brands</h3>
                            {this.props.brands.map(brand => 
                                <label key={brand}>
                                <input type="checkbox" key={brand} value={brand} name="brand" onChange={this.handleBrandChange}/> 
                                    {brand}
                                </label>
                            )}
                        </div>
                        <div className="tagFilters">
                            <h3 className="medium">Tags</h3>
                            {this.props.tags.map(tag => 
                                <label key={tag}>
                                <input type="checkbox" key={tag} value={tag} name="tag"  onChange={this.handleTagChange} /> 
                                    {tag}
                                </label>
                            )}
                        </div>
                        <div className="ratingFilters">
                            <h3 className="small">Ratings:&nbsp;</h3>
                            <div className="ratingFilter">
                                <label>
                                    <input type="radio" name="rating" value="1" onChange={this.handleRatingChange} />&nbsp;1^&nbsp;&nbsp;
                                </label>
                                <label>
                                    <input type="radio" name="rating" value="2" onChange={this.handleRatingChange} />&nbsp;2^&nbsp;&nbsp;
                                </label>
                                <label>
                                    <input type="radio" name="rating" value="3" onChange={this.handleRatingChange} />&nbsp;3^&nbsp;&nbsp;
                                </label>
                                <label>
                                    <input type="radio" name="rating" value="4" onChange={this.handleRatingChange} />&nbsp;4^&nbsp;&nbsp;
                                </label>
                                <label>
                                    <input type="radio" name="rating" value="0" onChange={this.handleRatingChange} />&nbsp;All
                                </label>
                            </div>
                        </div>
                        <div className="priceFilters">
                            <h3 className="small">Price Range</h3>
                            <div className="priceFilter">
                                <label>
                                    <input type="radio" name="price" value="0" onChange={this.handlePriceChange} />&nbsp;Any
                                </label><br />
                                <label>
                                    <input type="radio" name="price" value="1" onChange={this.handlePriceChange} />&nbsp;below $10
                                </label><br />
                                <label>
                                    <input type="radio" name="price" value="2" onChange={this.handlePriceChange} />&nbsp;$10 - $15
                                </label><br />
                                <label>
                                    <input type="radio" name="price" value="3" onChange={this.handlePriceChange} />&nbsp;Above $15
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

Products.propTypes = {
    products: PropTypes.object.isRequired,
    searchString: PropTypes.string,
    brands: PropTypes.object.isRequired,
    tags: PropTypes.object.isRequired
    
};