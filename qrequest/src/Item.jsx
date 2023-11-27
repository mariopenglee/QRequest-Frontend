import React, { useState } from 'react';
import './Item.css';
import {AnimatePresence, LayoutGroup, motion, useAnimate} from 'framer-motion';

const variants = {
    open: { opacity: 1, height: "auto" },
    closed: { opacity: 0, height: 0 }
  }


export default function Item({ item, onAddToCart }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [scope, animate] = useAnimate();

    const shakeAnimation = {
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.4 }
    };

    

    const pageVariants = {
        initial: {
            opacity: 0,
            y: -100,
            scale: 0.8
        },
        in: {
            opacity: 1,
            y: 0,
            scale: 1
        },
        out: {
            opacity: 0,
            y: -100,
            scale: 0.8
        }
    };

    const pageTransition = {
        type: "spring",
        stiffness: 100,
        duration: 0.4

    };

    const handleAddToCart = () => {
        onAddToCart(item, 1);
        animate(scope.current, shakeAnimation);

    };

    const handleExpand = () => {
        setIsExpanded(!isExpanded);
        console.log(isExpanded);
    };

    return (
        <LayoutGroup id={`item-${item.id}`}>
        <motion.div 
        className="item"
        layoutId={`item-${item.id}`}
        key = {item.id}
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
        ref={scope}
        transition={pageTransition}
        
        >
            <div className="item-info">
                <motion.div 
                className="item-image"
                layoutId={`item-image-${item.id}`}
                key = {`item-image-${item.id}`}
                >
                <div className="item-name-n-price" onClick={handleExpand}>
                    <p className="item-name">{item.name}</p>
                </div>
                </motion.div>
                <AnimatePresence mode='wait'>
                {
             <motion.div 
                    className="item-expand"
                    layoutId={`item-expand-${item.id}`}
                    key = {`item-expand-${item.id}`}
                    variants={variants}
                    animate={isExpanded ? 'open' : 'closed'}
                    transition={{ duration: 0.5 }}
                    >
                        
                        <p className="item-description">{item.description}</p>
                        <div className="price-n-cart">
                        <div className="item-price">
                            <span>$ {item.price}</span>
                        </div>
                        <motion.button 
                            className="add-to-cart-button" 
                            onTap={handleAddToCart}
                            
                            >
                            <span>🛒</span>
                        </motion.button>
                        </div>
                    </motion.div>
                }
                </AnimatePresence>
                
              
            </div>
        </motion.div>
        </LayoutGroup>
    );
}
