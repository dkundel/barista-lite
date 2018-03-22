import React, { Component } from 'react';
import './App.css';

import Orders from './data/orders';
import OrderEntry from './components/OrderEntry';

class App extends Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.finishOrder.bind(this);
    this.cancelOrder.bind(this);
    this.orderService = Orders.shared();
    this.state = {
      orders: []
    };
  }

  async componentWillMount() {
    const orders = await this.orderService.init();
    this.setState({ orders });
  }

  finishOrder(orderNumber) {
    console.log('Finish');
  }

  cancelOrder(orderNumber) {
    console.log('Cancel');
  }

  render() {
    return (
      <div role="main">
        <h1>Barista</h1>
        <div className="order-list">
          {this.state.orders.map(entry => (
            <OrderEntry
              key={entry.number}
              orderNumber={entry.number}
              onCancel={this.cancelOrder}
              onFinished={this.finishOrder}
            >
              {entry.order}
            </OrderEntry>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
