// IMPORTS
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// LOCAL IMPORTS
import Home from './components/Home';
import Products from './components/Products';
import ProductDetails from './components/additionals/ProductDetails';

// STYLESHEET
import './App.css';

const App = () => 
      <Router>
        <Switch>
          <Route exact path="/" component={ Home }/>
          <Route path="/products/all" component={ Products }/>
          <Route path="/products/:productID/details" component={ ProductDetails }/>
        </Switch>
      </Router>
 
export default App;
