import React from 'react';
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
          items: [],
          itemBrandList: [],
          itemNameList: [],
          itemCategoryList: [],
          itemTagsList: [],
          browseHistory: []
        };
        this.productSearched = false;
        this.fetchedResult = [];
        this.searchedItem = "";
        this.searchItem = this.searchItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.resetProductSearched = this.resetProductSearched.bind(this);
      }
    
      componentDidMount() {
        if(this.state.items.length === 0)
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

      searchItem(){
          const {browseHistory, searchedItem, items} = this.state;
          browseHistory.push(searchedItem); 
          this.productSearched = true;
          this.setState({
              browseHistory: browseHistory
          });
          this.fetchedResult = items.filter(item => 
                (item.brand!=null ? item.brand.includes(searchedItem) : false) || 
                (item.name!=null ? item.name.includes(searchedItem) : false) || 
                (item.category!=null ? item.category.includes(searchedItem) : false)
            );
      }

      handleChange(event) {
        event.preventDefault();
        this.setState({ searchedItem: event.target.value});
      }

      resetProductSearched(){
          this.productSearched = false;
      }

      loadLocalData = () =>{
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
                <SearchBar searchItem={this.searchItem} handleChange={this.handleChange}/>
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
