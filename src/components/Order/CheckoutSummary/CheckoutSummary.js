import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
  let burger = props.ingredients ? <Burger ingredients={props.ingredients}/> : null
  return (
    <div className={classes.checkoutSummary}>
      <h1>We hope this is the best burger you ever had!</h1>
      <div className={classes.burgerContainer}>
        {burger}
      </div>
      <Button
        btnType="danger"
        clicked={props.checkoutCancelled}>CANCEL</Button>
      <Button
        btnType="success"
        clicked={props.checkoutContinue}>CONTINUE</Button>
    </div>
  )
}

export default checkoutSummary;
