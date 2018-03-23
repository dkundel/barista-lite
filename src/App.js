import React, { Component } from 'react';
import './App.css';

import Orders from './data/orders';
import OrderEntry from './components/OrderEntry';

class App extends Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.finishOrder = this.finishOrder.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
    this.updateOrders = this.updateOrders.bind(this);
    this.orderService = Orders.shared();
    this.orderService.on('updated', this.updateOrders);
    this.state = {
      orders: []
    };
  }

  async componentWillMount() {
    const orders = await this.orderService.init();
    this.setState({ orders });
  }

  updateOrders({ orders }) {
    this.setState({ orders });
  }

  finishOrder(order) {
    this.orderService.updateStatus(order, 'finished');
  }

  cancelOrder(order) {
    this.orderService.updateStatus(order, 'cancelled');
  }

  render() {
    return (
      <div role="main">
        <h1>Barista</h1>
        <div className="order-list">
          {this.state.orders.map(entry => (
            <OrderEntry
              key={entry.number}
              order={entry}
              onCancel={this.cancelOrder}
              onFinished={this.finishOrder}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
