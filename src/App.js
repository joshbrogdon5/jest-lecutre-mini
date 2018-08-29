import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';
import './App.css';

import Item from './Components/Item';
import Cart from './Components/Cart';

class App extends Component {
  constructor() {
    super();

    this.state = {
      cart: [],
      products: [],
      total: 0.00,
      tax: 0,
      showCart: true,
    };
  }

  componentDidMount() {

  }

  addToCart = (itemToAdd) => {

  }

  showCart = () => {

  }

  calculateTotal() {

  }

  renderProducts(products) {
    return products.map(product => <Item key={product.id} product={product} addToCart={this.addToCart} />);
  }

  render() {
    return (
      <div className="App">
        <header>
          <div className="content">
            <div className='title'>
              <figure>
                <img src="https://media.giphy.com/media/j2rCxv6luaLq8/giphy.gif" alt="" />
              </figure>
              <h1>CatBug Mart</h1>
            </div>
            <nav>
              <li>Total: ${this.state.total}</li>
              <FontAwesome name="shopping-cart" onClick={this.showCart} />
            </nav>
          </div>
        </header>
        <Cart show={this.state.showCart} hideCart = {this.showCart} cart={this.state.cart}/>
        <div className="items">{this.renderProducts(this.state.products)}</div>
      </div>
    );
  }
}

export default App;

