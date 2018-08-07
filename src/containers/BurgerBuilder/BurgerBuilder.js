import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
  salad: 0.65,
  cheese: 0.5,
  bacon: 1,
  meat: 1.5
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
  }
  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)
    this.setState({purchasable: sum > 0});
  }
  addIngredientHandler = (type) => {
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] += 1
    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice });
    this.updatePurchaseState(updatedIngredients);
  }
  removeIngredientHandler = (type) => {
    const updatedIngredients = {
      ...this.state.ingredients
    };
    if (updatedIngredients[type] > 0) {
      updatedIngredients[type] -= 1
      const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
      this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice });
      this.updatePurchaseState(updatedIngredients);
    }
  }
  purchaseHandler = () => {
    this.setState({purchasing: true})
  }
  cancelPurchaseHandler = () => {
    this.setState({purchasing: false})
  }
  continuePurchaseHandler = () => {
    alert("Purchased!")
  }
  render () {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    return (
      <Fragment>
        <Modal show={this.state.purchasing} clicked={this.cancelPurchaseHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            cancel={this.cancelPurchaseHandler}
            continue={this.continuePurchaseHandler}
            price={this.state.totalPrice}/>
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          clicked={this.purchaseHandler}
          purchasable={!this.state.purchasable}
          price={this.state.totalPrice}/>
      </Fragment>
    );
  }
}

export default BurgerBuilder;
