import React, { useState } from 'react';
import './Item.css';

export default function Item({ item, onQuantityChange, onAddToCart }) {
    const [quantity, setQuantity] = useState(item.quantity);

    const handleIncrease = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onQuantityChange(newQuantity);
    };

    const handleDecrease = () => {
        if (quantity > 0) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            onQuantityChange(newQuantity);
        }
    };

    const handleAddToCart = () => {
        onAddToCart(item.id, quantity);
        setQuantity(0);
        onQuantityChange(0);
    };

    return (
        <div className="item">
            <div className="item-info">
                <div className="item-name-n-price">
                <p className= "item-name">{item.name}</p>
                <div className="item-price">
                    <span>$ {item.price}</span>
                </div>
                </div>
                
                <p className="item-description">{item.description}</p>
                
            </div>
            
            <div className="prices-container">
                <div className="quantity-controls">
                    <button onClick={handleDecrease}>&lt;</button>
                    <div className="quantity-container">
                        {quantity > 0 ? <span className="quantity">{quantity}</span> : null}
                    </div>
                    <button onClick={handleIncrease}>&gt;</button>
                </div>
                <button className="add-to-cart-button" onClick={handleAddToCart}>
                    <span>🛒</span>
                </button>
            </div>
                
        </div>
    );
}
