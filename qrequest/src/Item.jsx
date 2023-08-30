import React, { useState } from 'react';

export default function Item({ item, onQuantityChange }) {
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

    return (
        <div className="item">
            <div className="item-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
            </div>
            <div className="item-price">
                <p>${item.price}</p>
                <div className="quantity-controls">
                    <button onClick={handleDecrease}>-</button>
                    <span>{quantity}</span>
                    <button onClick={handleIncrease}>+</button>
                </div>
            </div>
        </div>
    );
}
