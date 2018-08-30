const { toggle, getProducts, addToCart, calculateSubTotal, calculateTotal, removeItem } = require('../Logic/logic');

const product = {
  id: 1,
  product: 'Fillets',
  price: 69.41,
  image: 'http://goodtogostore.com/product-package-images/192837494.jpg',
};

describe('Tests Toggle Show button', () => {
  test('can toggle true to false', () => {
    expect(toggle(true)).toBe(false)
  })
  test('can toggle false to true', () => {
    expect(toggle(false)).toBe(true)
  })

});

describe('Can Get products from Server', () => {});

describe('Can add item to cart', () => {});

describe('can calculate sub total', () => {});

describe('can calculate Total', () => {});

describe('can remove item', () => {});
