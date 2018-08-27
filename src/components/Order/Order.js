import React from 'react';

import classes from './Order.css'

const order = (props) => {
  const ingredientArray = [];
  for (const key in props.ingredients) {
    ingredientArray.push({
      name: key,
      amount: props.ingredients[key]
    });
  };

  const ingredientOutput = ingredientArray.map(ig => {
    return (<span className={classes.ingredients} key={ig.name}>{ig.name} ({ig.amount})</span>)
  });

  return (
    <div className={classes.order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price: <strong>$ {props.price.toFixed(2)}</strong></p>
    </div>
  );
};

export default order
