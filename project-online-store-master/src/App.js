import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Search from './pages/Search';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import AvaliatorProd from './components/AvaliatorProd';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <section className="main-page">
          <Switch>
            <Route exact path="/project-online-store/" component={ Search } />
            <Route path="/project-online-store/shopping-cart" component={ ShoppingCart } />
            <Route
              path="/project-online-store/product/:id/evaluation-forms"
              component={ AvaliatorProd }
            />
            <Route path="/project-online-store/product/:id" component={ ProductDetail } />
            <Route path="/project-online-store/checkout" component={ Checkout } />
          </Switch>
        </section>
        <footer className="footer">
          See our codebase in <a href="https://github.com/DeboraSerra/project-online-store/tree/master">GitHub</a>
        </footer>
      </BrowserRouter>
    );
  }
}

export default App;
