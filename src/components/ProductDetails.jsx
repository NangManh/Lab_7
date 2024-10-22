import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetails = ({ updateCartCount }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy data. You can replace this with fetching product data by ID.
  const products = [
    { id: 1, name: 'Product 1', price: 100, description: 'Description of Product 1', image: '/assets/product1.jpg' },
    { id: 2, name: 'Product 2', price: 200, description: 'Description of Product 2', image: '/assets/product2.jpg' },
    { id: 3, name: 'Product 3', price: 300, description: 'Description of Product 3', image: '/assets/product3.jpg' },
  ];

  const product = products.find((p) => p.id === parseInt(id));

  const addToCart = () => {
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
      <img src={product.image} alt={product.name} style={{ width: '300px', height: '300px' }} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
