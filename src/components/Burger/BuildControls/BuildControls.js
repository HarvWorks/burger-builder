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
    {controls.map(control => (
      <BuildControl key={control.label + ' control'} label={control.label} type={control.type} />
    ))}
  </div>
)

export default BuildControls;
