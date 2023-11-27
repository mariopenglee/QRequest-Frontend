import React from 'react';
import './CartItem.css';
import PropTypes from 'prop-types';

export default function CartItem(props) {
    return (
    <div className="cart-item">
    <div className="cart-item-info">
      <p className="cart-item-name">{props.cartItem.name}</p>
      <p className="cart-item-price">$ {props.cartItem.price}</p>
    </div>
    <div className="cart-item-quantity">
      <button className="cart-item-quantity-button" onClick={() => props.onQuantityChange(props.cartItem.id, props.quantity - 1)}
      >-</button>
      <p className="cart-item-quantity-number">{props.quantity}</p>
      <button className="cart-item-quantity-button" onClick={() => props.onQuantityChange(props.cartItem.id, props.quantity + 1)}
      >+</button>
    </div>
  </div>
  )

}

CartItem.propTypes = {
// item needs to have name and price
    cartItem: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,

   quantity: PropTypes.number.isRequired,

   onQuantityChange: PropTypes.func.isRequired,
};