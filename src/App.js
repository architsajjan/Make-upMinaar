import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';

import './App.css';
import ProductDetails from './components/additionals/ProductDetails';

class App extends React.Component {
  
  render() {
    return(
      <Router>
        <Switch>
          <Route exact path="/" component={ Home }/>
          <Route path="/products/:productID/details" component={ ProductDetails }/>
        </Switch>
      </Router>
    );
  }
}

export default App;
