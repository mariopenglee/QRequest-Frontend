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
    };

    return (
        <div
            key={section.id}
            id={`section-${section.id}`}
            className={`section ${props.activeSection === section.id ? 'selected' : ''}`}
        >


            <div className="section-columns">
                <div className="cat-icon">
                    <p className='section-title'>{section.title}</p>
                    <p>{section.content}</p>
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
