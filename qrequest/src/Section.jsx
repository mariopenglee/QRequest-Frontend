import React from 'react';
import testicon from './assets/react.svg';
import './Section.css';
import Item from './Item';

export default function Section(props) {
    const { section } = props;

    const handleItemQuantityChange = (itemId, newQuantity) => {
        const updatedItems = section.items.map(item => {
            if (item.id === itemId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });

        // Update the state or handle the updatedItems array using your state management mechanism
    };

    return (
        <div
            key={section.id}
            id={`section-${section.id}`}
            className={`section ${props.activeSection === section.id ? 'selected' : ''}`}
        >
            <h2>{section.title}</h2>
            <p>{section.content}</p>

            <div className="section-columns">
                <div className="cat-icon">
                    <img src={testicon} alt="testicon" />
                </div>
                <div className="cat-items">
                    {section.items.map(item => (
                        <Item
                            key={item.id}
                            item={item}
                            onQuantityChange={(newQuantity) => handleItemQuantityChange(item.id, newQuantity)}
                            onAddToCart={props.onAddToCart}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
