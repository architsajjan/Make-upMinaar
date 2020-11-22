import React, { Component } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import ProductCard from './additionals/ProductCard';

export default class Products extends Component {
    constructor(props){
        super(props);
        this.state={
            brandsFilter: [],
            tagsFilter: [],
            fetchedProducts: this.props.products
        };
        this.handleBrandChange = this.handleBrandChange.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
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

    applyFilters(){
        const { fetchedProducts, brandsFilter, tagsFilter } = this.state;
        let value = fetchedProducts.filter(item => 
          (item.brand!=null ? brandsFilter.includes(item.brand) : false) ||
          (item.tag_list!=null ? tagsFilter.some(tag => item.tag_list.includes(tag)) : false) 
        );
        this.setState({
            fetchedProducts: value
        });
      }

    render(){
        const { fetchedProducts } = this.state;
        let element;

        if(fetchedProducts.length > 0){

            element =   <div className="productContainer">
                            <h1 className="medium text-primary alignLeft">Search Results for "{this.props.searchString}"</h1>
                            {fetchedProducts.map(product => (
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
                        <div className="brandFilters">
                            <h3 className="medium">Tags</h3>
                            {this.props.tags.map(tag => 
                                <label key={tag}>
                                <input type="checkbox" key={tag} value={tag} name="tag"  onChange={this.handleTagChange} /> 
                                    {tag}
                                </label>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}
