import React, { Component } from 'react';
import './App.css';

import OrderEntry from './components/OrderEntry';

class App extends Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.finishOrder.bind(this);
    this.cancelOrder.bind(this);
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
          <OrderEntry
            orderNumber={0}
            onCancel={this.cancelOrder}
            onFinished={this.finishOrder}
          >
            Hello
          </OrderEntry>
        </div>
      </div>
    );
  }
}

export default App;
