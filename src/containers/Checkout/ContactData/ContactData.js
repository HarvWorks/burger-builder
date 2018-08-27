import React, { Component } from 'react';
import axios from '../../../AxiosOrders';
import { connect } from 'react-redux';

import errorHandler from '../../../hoc/ErrorHandler/ErrorHandler'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      city: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "City"
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 10,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            {value: "fastest", displayValue: "Fastest"},
            {value: "fast", displayValue: "Fast"},
            {value: "normal", displayValue: "Normal"}]
        },
        value: "fastest"
      },
    },
    formIsValid: false,
    loading: false
  }

  checkValidity = (value, rules) => {
    if (rules.required && value.trim() === '') {
      return false
    }
    if (rules.minLength && value.length < rules.minLength) {
      return false
    }
    if (rules.maxLength && value.length > rules.maxLength) {
      return false
    }
    return true
  }

  formValidity = (formData) => {
    for (let key in formData) {
      if (formData[key].validation && !formData[key].valid) {
        return false;
      }
    }
    return true;
  }

  inputChangedHandler = (event, inputKey) => {
    const updatedForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedForm[inputKey] };
    updatedFormElement.value = event.target.value;
    if (updatedFormElement.validation) {
      updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    }
    updatedFormElement.touched = true;
    updatedForm[inputKey] = updatedFormElement;

    let formIsValid = this.formValidity(updatedForm);

    this.setState({orderForm: updatedForm, formIsValid: formIsValid});
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (const key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    }
    axios.post('/orders.json', order)
      .then (reponse => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch (error => {
        this.setState({ loading: false });
        this.props.history.push('/');
      });
  }

  render () {
    const formElements = [];
    for (const key in this.state.orderForm) {
      formElements.push(<Input
        key={key}
        elementType={this.state.orderForm[key].elementType}
        elementConfig={this.state.orderForm[key].elementConfig}
        value={this.state.orderForm[key].value}
        invalid={!this.state.orderForm[key].valid && this.state.orderForm[key].touched}
        shouldValidate={this.state.orderForm[key].validation ? true : false}
        changed={(event) => this.inputChangedHandler(event, key)}/>)
    }

    let form = (
      <div className={classes.contactData}>
        <h4>Enter your Contact Info</h4>
        <form onSubmit={this.orderHandler}>
          {formElements}
          <Button btnType="success" disabled={!this.state.formIsValid}>ORDER</Button>
        </form>
      </div>
    )
    if (this.state.loading) {
      form = <Spinner />
    }
    return form
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    price: state.price,
  }
}

export default connect(mapStateToProps)(errorHandler(ContactData, axios));
