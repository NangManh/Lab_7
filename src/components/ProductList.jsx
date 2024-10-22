import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProductList = ({ updateCartCount }) => {
  const navigate = useNavigate();

  const [products] = useState([
    { id: 1, name: 'Product 1', price: 100, image: '/assets/product1.jpg' },
    { id: 2, name: 'Product 2', price: 200, image: '/assets/product2.jpg' },
    { id: 3, name: 'Product 3', price: 300, image: '/assets/product3.jpg' },
  ]);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const foundIndex = cart.findIndex(item => item.id === product.id);

    if (foundIndex >= 0) {
      cart[foundIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(cart.reduce((total, item) => total + item.quantity, 0));
    alert(`${product.name} added to cart`);
    navigate('/cart');
  };

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.name} style={{ width: '150px', height: '150px' }} />
            <Link to={`/product/${product.id}`}>{product.name}</Link> - ${product.price}
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
