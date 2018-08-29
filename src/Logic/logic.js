const axios = require('axios');

const logic = {
  toggle(value) {
    return !value;
  },
  getProducts() {
    return axios.get('http://localhost:4000/products');
  },
  addToCart(cart, product) {
    const productToAdd = { ...product };
    let newCart = [...cart];
    productToAdd.qty = 1;
    let match = false;
    newCart = newCart.map(item => {
      if (item.id === productToAdd.id) {
        match = true;
        item.qty += 1;
      }
      return item;
    });
    if (!match) newCart.push(productToAdd);
    return newCart;
  },
  calculateSubTotal(product) {
    return (product.qty * product.price).toFixed(2);
  },
  calculateTotal(cart) {
    return cart.reduce((total, item) => total + item.qty * item.price, 0).toFixed(2);
  },
  removeItem(cart, id) {
    const modifiedCart = [...cart];
    return modifiedCart
      .map(item => {
        const modifiedItem = { ...item };
        if (modifiedItem.id === id) modifiedItem.qty -= 1;
        return modifiedItem;
      })
      .filter(item => !(item.id === id && item.qty <= 0));
  },
};

module.exports = logic;
