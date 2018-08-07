import React from 'react';

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Meat', type: 'meat' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Bacon', type: 'bacon' },
];

const BuildControls = (props) => (
  <div className={classes.buildControls}>
    <p>Current Price: <strong>$ {props.price.toFixed(2)}</strong></p>
    {controls.map(control => (
      <BuildControl
        key={control.label + ' control'}
        label={control.label}
        added={() => props.ingredientAdded(control.type)}
        removed={() => props.ingredientRemoved(control.type)}
        disabled={props.disabled[control.type]}/>
    ))}
    <button
      className={classes.orderButton}
      disabled={props.purchasable}
      onClick={props.clicked}
      type="button">Checkout</button>
  </div>
)

export default BuildControls;
