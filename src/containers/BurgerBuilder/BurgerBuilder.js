import React, { Component, Fragment } from 'react';
import axios from '../../AxiosOrders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler'


const INGREDIENT_PRICES = {
  salad: 0.65,
  cheese: 0.5,
  bacon: 1,
  meat: 1.5
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  }

  componentDidMount () {
    axios.get('/ingredients.json')
      .then(res => {
        this.setState({ingredients: res.data})
      })
      .catch (error => {
        this.setState({error: true})
      });
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
    this.setState({ loading: true });
    // alert("Purchased!");
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Harv",
        address: {
          street: "123 Street",
          city: "Bob City",
          zipCode: "95432",
          country: "USA"
        },
        email: "test@test.com"
      },
      deliveryMethod: "fastest"
    }
    axios.post('/orders.json', order)
      .then (reponse => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch (error => {
        this.setState({ loading: false, purchasing: false });
      });
  }
  render () {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>The ingredients cannot be loaded.</p> : <Spinner/>;

    if (this.state.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            clicked={this.purchaseHandler}
            purchasable={!this.state.purchasable}
            price={this.state.totalPrice}/>
        </Fragment>
      )
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          cancel={this.cancelPurchaseHandler}
          continue={this.continuePurchaseHandler}
          price={this.state.totalPrice}/>
      )
    }

    if (this.state.loading) {
      orderSummary = <Spinner/>;
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

export default errorHandler(BurgerBuilder, axios);
