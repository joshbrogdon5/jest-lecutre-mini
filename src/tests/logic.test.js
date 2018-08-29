const { toggle, getProducts, addToCart, calculateSubTotal, calculateTotal, removeItem } = require('../Logic/logic');

let product = {
  id: 1,
  product: 'Fillets',
  price: 69.41,
  image: 'http://goodtogostore.com/product-package-images/192837494.jpg',
};

describe('Tests Toggle Show button', () => {
  test('can toggle true to false', () => {
    expect(toggle(true)).toBe(false);
  });
  test('can toggle false to true', () => {
    expect(toggle(false)).toBe(true);
  });
  test('can toggle truthy to false', () => {
    expect(toggle('string')).toBe(false);
  });
  test('can toggle falsey to true', () => {
    expect(toggle('')).toBe(true);
  });
});

describe('Can Get products from Server', () => {
  test('Gets status 200', () =>
    getProducts().then(res => {
      expect(res.status).toBe(200);
    }));
  test('gets an array from the server', () =>
    getProducts().then(res => {
      expect(Array.isArray(res.data)).toBe(true);
    }));
  test('all items have desired properties', () =>
    getProducts().then(res => {
      expect(res.data[0]).toEqual(product);
    }));
});

describe('Can add item to cart', () => {
  let cart = [];

  beforeEach(() => {
    cart = [];
    product = {
      id: 1,
      product: 'Fillets',
      price: 69.41,
      image: 'http://goodtogostore.com/product-package-images/192837494.jpg',
    };
  });

  test('item Should have qty property', () => {
    expect(addToCart(cart, product)[0]).toMatchObject({ qty: 1 });
  });
  test('can add item to cart if only item', () => {
    expect(addToCart(cart, product)).toHaveLength(1);
  });
  test('should not modify original cart', () => {
    expect(addToCart(cart, product)).not.toEqual(cart);
  });
  test('should not modify original product', () => {
    expect(addToCart(cart, product)[0]).not.toBe(product);
  });
  test('should add quantity', () => {
    const newCart = addToCart(cart, product);
    expect(addToCart(newCart, product)[0]).toMatchObject({ qty: 2 });
  });
  test('should add second item', () => {
    let newCart = addToCart(cart, product);
    newCart = addToCart(newCart, { id: 2 });
    expect(newCart[1]).toMatchObject({ id: 2, qty: 1 });
    expect(newCart).toHaveLength(2);
  });
});

describe('can calculate sub total', () => {
  const subTotalProduct = product;
  beforeEach(() => {
    subTotalProduct.qty = 1;
  });

  test('can get subtotal', () => {
    subTotalProduct.qty = 2;
    expect(calculateSubTotal(subTotalProduct)).toBe('138.82');
  });
  test('can get subtotal', () => {
    subTotalProduct.qty = 5;
    expect(calculateSubTotal(subTotalProduct)).toBe('347.05');
  });
  test('shows double 00 decimal', () => {
    expect(calculateSubTotal({ qty: 2, price: 50 })).toBe('100.00');
  });
});

describe('can calculate Total', () => {
  test('shows 0.00 when array empty', () => {
    expect(calculateTotal([])).toBe('0.00');
  });
  test('shows correct price with one item', () => {
    const cart = [{ qty: 2, price: 25.3 }];
    expect(calculateTotal(cart)).toBe('50.60');
  });
  test('shows correct price with two items', () => {
    const cart = [{ qty: 2, price: 25.3 }, { qty: 1, price: 32.54 }];
    expect(calculateTotal(cart)).toBe('83.14');
  });
});

describe('can remove item', () => {
  let cart = [];

  beforeEach(() => {
    cart = [];
    cart.push({ id: 2, qty: 2 }, { id: 1, qty: 1 });
  });

  test('removes item from cart', () => {
    expect(removeItem(cart, 1)).toHaveLength(1);
  });
  test('removes item from cart', () => {
    expect(removeItem(cart, 2)).toHaveLength(2);
  });
  test('doesnt modify original', () => {
    expect(removeItem(cart, 2)).not.toEqual(cart);
  });
  test('doesnt error if given empty array', () => {
    expect(() => removeItem([])).not.toThrowError();
  });
});
