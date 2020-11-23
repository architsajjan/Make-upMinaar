// IMPORTS
import React from 'react';

// LOCAL IMPORTS
import data from '../Data.json';
import Loading from './additionals/Loading';
import Navbar from './Navbar';
import Products from './Products';
import SearchBar from './SearchBar';

export default class Home extends React.Component {
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
        this.searchItem = this.searchItem.bind(this);
        this.loadLocalData = this.loadLocalData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.reSearch = this.reSearch.bind(this);
      }
    
      componentDidMount() {
        // FETCH FOR DATA FROM API
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

      // INITIATE SEARCHING FOR THE SEARCHED STRING
      searchItem(){
          const {browseHistory, searchedItem, items} = this.state;
          browseHistory.push(searchedItem); 
          this.productSearched = true;
          this.setState({
              browseHistory: browseHistory
          });
          if(searchedItem === "")this.fetchedResult = [...this.state.items];
          else this.fetchedResult = items.filter(item => 
                (item.brand!=null ? item.brand.includes(searchedItem) : false) || 
                (item.name!=null ? item.name.includes(searchedItem) : false) || 
                (item.category!=null ? item.category.includes(searchedItem) : false)
          );
      }

      // HANDLE FORM CHANGES
      handleChange(event) {
        this.setState({ searchedItem: event.target.value});
      }

      // LOAD LOCAL DATA INSTEAD WAITING FOR DATA FROM LIVE API.
      loadLocalData(){
        let tagList = []; 
        data.map(item => item.tag_list.map(tag => tagList.push(tag)))
        this.setState({
          isLoaded: true,
          items: data,
          itemBrandList: Array.from(new Set(data.map(item => item.brand))),
          itemNameList: Array.from(new Set(data.map(item => item.name))),
          itemCategoryList: Array.from(new Set(data.map(item => item.category))),
          itemTagsList: Array.from(new Set(tagList))

        });
        this.localDataLoaded = true;
      }

      // GET READY FOR ANOTHER SEARCH.
      reSearch(){
        this.setState({searchedItem:""});
        this.productSearched =false;
      }

    render(){
        const { error, isLoaded, searchedItem, itemBrandList, itemTagsList} = this.state;
        
        if (error) {
           return <div>Error: {error.message}</div>;
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
                            <SearchBar searchItem={this.searchItem} handleChange={this.handleChange}/>
                        </div>
                    </div>
                </div>
              </div>
            );
    }
}
