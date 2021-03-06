// IMPORTS
import React from 'react';

// LOCAL IMPORTS
import data from '../Data.json';
import Loading from './additionals/Loading';
import Navbar from './Navbar';
import Products from './Products';
import SearchBar from './SearchBar';

/**
 * @class
 * Home Component control the main state of the application 
 */
class Home extends React.Component {
    /**
     * @constructor
     * @param {Object} state.error  checks if any error or exception is returned while fetching the API
     * @param {Boolean} state.isLoaded  flag to update once the data is loaded from the API or local storage 
     * @param {Array} state.items  an array to store the loaded data 
     * @param {Array} state.itemsBrandList  an array to store list of Brands available
     * @param {Array} state.itemsNameList  an array to store list of Products Names available
     * @param {Array} state.itemsCategoryList  an array to store list of Products Categories available
     * @param {Array} state.itemsTagsList  an array to store list of Products Tags available
     * @param {Array} state.browseHistory  an array to store search history
     */
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          searchedItem: "",
          items: [],
          itemBrandList: [],
          itemNameList: [],
          itemCategoryList: [],
          itemTagsList: [],
          browseHistory: []
        };
        this.localDataLoaded = false;
        this.productSearched = false;
        this.fetchedResult = [];
        this.loadLocalData = this.loadLocalData.bind(this);
        this.reSearch = this.reSearch.bind(this);
        this.autocompleteCallback = this.autocompleteCallback.bind(this);
      }
    
      componentDidMount() {
        // FETCH DATA FROM API (if) items array is empty or local data isnt loaded. 
        if(this.state.items.length === 0 && !this.localDataLoaded)
        fetch("http://makeup-api.herokuapp.com/api/v1/products.json")
          .then(res => res.json())
          .then(
            (result) => {
              let tagList = []; 
              data.map(item => item.tag_list.map(tag => tagList.push(tag)))
              this.setState({
                isLoaded: true,
                items: result,
                itemBrandList: Array.from(new Set(result.map(item => item.brand))),
                itemNameList: Array.from(new Set(result.map(item => item.name))),
                itemCategoryList: Array.from(new Set(result.map(item => item.category))),
                itemTagsList: Array.from(new Set(tagList))
              });
              
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }

      /**
       * @function searchItem() :
       * INITIATE SEARCHING FOR THE SEARCHED STRING.
       * @param {String} str contains the value of the searched string. 
       */
      searchItem=(str)=>{
          const {browseHistory, items} = this.state;
          if(browseHistory.indexOf(str) != -1){
            browseHistory.splice(browseHistory.indexOf(str), 1);
          }
          browseHistory.push(str); 
          this.productSearched = true;
          this.setState({
              browseHistory: browseHistory,
              searchedItem: str
          });
          if(str === "")this.fetchedResult = [...this.state.items];
          else this.fetchedResult = items.filter(item => 
                (item.brand!=null ? item.brand.toLowerCase().includes(str.toLowerCase()) : false) || 
                (item.name!=null ? item.name.toLowerCase().includes(str.toLowerCase()) : false) || 
                (item.category!=null ? item.category.toLowerCase().includes(str.toLowerCase()) : false)
          );       
      }

      /**
       * @function loadLocalData() :
       * LOAD LOCAL DATA INSTEAD WAITING FOR DATA FROM LIVE API.
       * @param {Array} data contains local data 
       */
      loadLocalData(){
        let tagList = []; 
        data.map(item => item.tag_list.map(tag => tagList.push(tag)))
        this.setState({
          isLoaded: true,
          items: data,
          itemBrandList: Array.from(new Set(data.map(item => item.brand))),
          itemNameList: Array.from(new Set(data.map(item => item.name))),
          itemCategoryList: Array.from(new Set(data.map(item => item.category))),
          itemTypeList: Array.from(new Set(data.map(item => item.product_type))),
          itemTagsList: Array.from(new Set(tagList))

        });
        this.localDataLoaded = true;
      }

      /**
       * @function reSearch() :
       * GET READY FOR ANOTHER SEARCH..
       * @param {Boolean} productSearched used to toggle between two product searches  
       */
      reSearch(){
        this.setState({searchedItem:""});
        this.productSearched =false;
      }

      /**
       * @function autocompleteCallback() :
       * Autocomplete callback method to initiate search.
       */
      autocompleteCallback(str){
        this.searchItem(str);
    }

    render(){
        const { error, isLoaded, searchedItem, itemBrandList, itemTagsList, browseHistory} = this.state;
        
        if (error) {
           return (
            <div>
              <Navbar action={()=> {}}/>
              <Loading loadLocalData={this.loadLocalData} errorRecieved={true}/>
            </div>
           );
        }
        else if(!isLoaded){
            return(
              <div>
                <Navbar action={()=> {}}/>
                <Loading loadLocalData={this.loadLocalData}/>
              </div>
            );
        }
        else if(this.productSearched){
            return(
              <div>
                <Navbar action={this.reSearch}/>
                <Products products={this.fetchedResult} searchString={searchedItem} brands={itemBrandList} tags={itemTagsList}/>
              </div>
            );
        }
        else
            return (
              <div>
                <Navbar action={()=> {}}/>
                <div className="landing">
                    <div>
                        <div className="home">
                        <h1 className="x-large">Welcome to The MakeUp Minar</h1>
                            <SearchBar 
                              searchItem={this.searchItem} 
                              handleChange={this.handleChange}
                              autocompleteCallback = {this.autocompleteCallback} 
                              names={this.state.itemNameList}
                              brands={this.state.itemBrandList}
                              categories={this.state.itemCategoryList}
                              types={this.state.itemTypeList}
                              tags={this.state.itemTagsList}
                              browseHistory={(browseHistory.length > 5) ? browseHistory.slice(browseHistory.length-5, browseHistory.length).reverse() : browseHistory.slice(0, browseHistory.length).reverse()}
                            />
                        </div>
                    </div>
                </div>
              </div>
            );
    }
}

export default Home;