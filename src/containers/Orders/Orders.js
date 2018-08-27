import React, { Component } from 'react';
import axios from '../../AxiosOrders';

import errorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  state = {
    loading: true,
    orders: [],
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then(res => {
        const orders = [];
        for (const key in res.data) {
          orders.push({
            ...res.data[key],
            id: key
          });
        }
        console.log(orders);
        this.setState({loading: false, orders: orders});
      })
      .catch(err => {
        this.setState({loading: false});
      })
  }
  render () {
    return (
      <div>
        {this.state.orders.map(order =>
          <Order key={order.id} price={+order.price} ingredients={order.ingredients}/>
        )}
      </div>
    )
  }
}

export default errorHandler(Orders, axios);
