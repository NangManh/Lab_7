import React, { useState, useEffect } from 'react';

const Cart = ({ updateCartCount }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  const increaseQuantity = (index) => {
    let newCart = [...cart];
    newCart[index].quantity += 1;
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    updateCartCount(newCart.reduce((total, item) => total + item.quantity, 0));
  };

  const decreaseQuantity = (index) => {
    let newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
    } else {
      newCart.splice(index, 1);
    }
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    updateCartCount(newCart.reduce((total, item) => total + item.quantity, 0));
  };

  const removeFromCart = (index) => {
    let newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    updateCartCount(newCart.reduce((total, item) => total + item.quantity, 0));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price} x {item.quantity}
              <button onClick={() => increaseQuantity(index)}>+</button>
              <button onClick={() => decreaseQuantity(index)}>-</button>
              <button onClick={() => removeFromCart(index)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <h2>Total: ${calculateTotal()}</h2>
    </div>
  );
};

export default Cart;
