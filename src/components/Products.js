// IMPORTS
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// LOCAL IMPORTS
import ProductCard from './additionals/ProductCard';
import Pagination from './additionals/Pagination';

/**
 * @class
 * Products component shows the list of fetched products on the basis of search
 */
class Products extends Component {
    /**
     * @constructor 
     * @param {Array} brandsFilter  an array to store list of brands filters applied
     * @param {Array} tagsfilter  an array to store list of tags filters applied
     * @param {Array} ratingsFilter  an array to store list of ratings filters applied
     * @param {Array} pricesFilter  an array to store list of prices filters applied
     * @param {Array} fetchedProducts  an array to store list fetched products as per user search 
     * @param {Number} ProductsPerPage  count of products allowed per page
     * @param {Number} pages  number of pages
     * @param {Number} currentPage  current page number
     * @param {Array} paginatedProducts  an array to products to display on the current page
     */
    constructor(props){
        super(props);
        this.state={
            brandsFilter: [],
            tagsFilter: [],
            ratingsFilter: 0,
            pricesFilter: 0,
            fetchedProducts: this.props.products,
            products: this.props.products,
            productsPerPage : 10,
            pages: 1,
            currentPage: 1,
            paginatedProducts : this.props.products
        };
        this.handleBrandChange = this.handleBrandChange.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.applyFilters = this.applyFilters.bind(this);
        this.implementPage = this.implementPage.bind(this);
    }

    componentDidMount(){        
        this.implementPage();
    }

    /**
       * @function implementPage() :
       * IMPLEMENT CURRENT PAGE ACCORDING TO PAGINATION.
       * @param {String} pageNo indicates pageNo of current paginated products. 
       */
    implementPage(pageNo = 1){
        const {productsPerPage, products} = this.state;
        let paginatedProducts = [];
        this.setState({
            pages: Math.ceil(Number((products.length)/productsPerPage))
        });
        const base = (Number(pageNo)-1)* Number(productsPerPage);
        let rounds = ((products.length - base)>=10)? productsPerPage:(products.length - base);


        for(let i = 0; i<rounds ; ++i){
            paginatedProducts.push(products[base+i])
        }
        this.setState({ currentPage:pageNo, paginatedProducts: paginatedProducts});
    }

    /**
      * @function handleBrandChange() :
      * HANDLE BRANDS FILTER.
      * @param {Array} brandsFilter contains list of brands to be filtered. 
      */
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
    
    /**
      * @function handleTagChange() :
      * HANDLE TAGS FILTER.
      * @param {Array} tagsFilter contains list of tags to be filtered. 
      */
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

    /**
      * @function handleRatingChange() :
      * HANDLE RATINGS FILTER.
      * @param {Array} ratingsFilter contains list of ratings to be filtered. 
      */
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

    /**
      * @function handlePriceChange() :
      * HANDLE PRICES FILTER.
      * @param {Array} pricesFilter contains list of prices to be filtered. 
      */
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

    /**
     * @async
     * @function applyFilters() :
     * APPLY FILTERS.
     * @param {Array} brandsFilter contains list of brands to be filtered. 
     * @param {Array} tagsFilter contains list of tags to be filtered. 
     * @param {Array} ratingsFilter contains list of ratings to be filtered. 
     * @param {Array} categoriesFilter contains list of categories to be filtered. 
     * @param {Array} pricesFilter contains list of prices to be filtered. 
     */
    async applyFilters(){
        const { fetchedProducts, brandsFilter, tagsFilter, ratingsFilter, pricesFilter, currentPage} = this.state;
        let value = fetchedProducts;    // if(brandsFilter.length === 0 && tagsFilter.length === 0) this.products;

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
        
        await this.setState({ products: value });
        
        this.implementPage(currentPage);   
      }

    render(){
        const { paginatedProducts, pages } = this.state;
        let element, pagesArr = [];
        for (let page = 1; page <= Number(pages); page++) {
            pagesArr.push(page);
        }

        // DETERMINES WHETHER ANY PRODUCTS FOUND
        if(paginatedProducts.length > 0){
            element =   <div className="productContainer">
                            <h1 className="medium text-primary alignLeft">Search Results for &quot;{this.props.searchString}&quot;<p>({this.state.products.length} products found)</p></h1>
                            <div className="pagination">
                                <p className="medium">PAGES:&nbsp;&nbsp;</p>
                                    {pagesArr.map(page => 
                                        <Pagination key={page} page={page} callback={this.implementPage}/>
                                    )}
                            </div>

                            {paginatedProducts.map(product => (
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
    products: PropTypes.array.isRequired,
    searchString: PropTypes.string,
    brands: PropTypes.array.isRequired,
    tags: PropTypes.array.isRequired
    
};

export default Products;