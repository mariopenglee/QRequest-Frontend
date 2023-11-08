import React, { useState } from 'react';
import './Item.css';

export default function Item({ item, onAddToCart }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleAddToCart = () => {
        onAddToCart(item, 1);
    };

    const handleExpand = () => {
        setIsExpanded(!isExpanded);
        console.log(isExpanded);
    };

    return (
        <div className="item">
            <div className="item-info">
                <div className="item-name-n-price" onClick={handleExpand}>
                    <p className="item-name">{item.name}</p>
                </div>
                <div className={`item-hidden ${isExpanded ? 'visible' : 'hidden'}`}>
                    <p className="item-description">{item.description}</p>
                    <div className="price-n-cart">
                    <div className="item-price">
                        <span>$ {item.price}</span>
                    </div>
                    <button className="add-to-cart-button" onClick={handleAddToCart}>
                        <span>🛒</span>
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
