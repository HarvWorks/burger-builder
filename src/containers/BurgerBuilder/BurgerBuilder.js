import React, { Component, Fragment } from 'react';
import axios from '../../AxiosOrders';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import classes from './BurgerBuilder.css';
import actionTypes from '../../reducers/actions'

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    error: false,
  }

  componentDidMount () {
    // axios.get('/ingredients.json')
    //   .then(res => {
    //     this.setState({ingredients: res.data})
    //   })
    //   .catch (error => {
    //     this.setState({error: true})
    //   });
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)
    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }
  cancelPurchaseHandler = () => {
    this.setState({purchasing: false})
  }
  continuePurchaseHandler = () => {
    this.props.history.push('/checkout');
  }
  render () {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>The ingredients cannot be loaded.</p> : <Spinner/>;

    if (this.props.ings) {
      burger = (
        <Fragment>
          <div className={classes.burgerContainer}>
            <Burger ingredients={this.props.ings}/>
          </div>
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            clicked={this.purchaseHandler}
            purchasable={!this.updatePurchaseState(this.props.ings)}
            price={this.props.totalPrice}/>
        </Fragment>
      )
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          cancel={this.cancelPurchaseHandler}
          continue={this.continuePurchaseHandler}
          price={this.props.totalPrice}/>
      )
    }

    return (
      <Fragment>
        {
          this.state.purchasing ? <Modal show={this.state.purchasing} clicked={this.cancelPurchaseHandler}>
            {orderSummary}</Modal> : null
        }
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice,
  }
}

const mapActionsToProps = action => {
  return {
    onIngredientAdded: (ingredient) => action({type: actionTypes.ADD_INGREDIENT, ingredient: ingredient}),
    onIngredientRemoved: (ingredient) => action({type: actionTypes.REMOVE_INGREDIENT, ingredient: ingredient}),
  }
}

export default connect(mapStateToProps, mapActionsToProps)(errorHandler(BurgerBuilder, axios));
