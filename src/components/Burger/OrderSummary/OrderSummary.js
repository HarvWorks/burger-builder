import React, {Fragment} from 'react'

import classes from './OrderSummary.css'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
  .map(igKey => {
    if (props.ingredients[igKey] > 0)
      return <li key={igKey}>{props.ingredients[igKey]}x {igKey}</li>
    return null
  })
  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>An awesome burger with the following:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Your total price is:  <span className={classes.price}>$ {props.price.toFixed(2)}</span></p>
      <div className={classes.buttonContainer}>
        <Button btnType="danger" clicked={props.cancel}>Cancel</Button>
        <Button btnType="success" clicked={props.continue}>Order</Button>
      </div>
    </Fragment>
  )
};

export default orderSummary;
