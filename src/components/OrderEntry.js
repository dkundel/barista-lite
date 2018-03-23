import React from 'react';

import './OrderEntry.css';

const OrderEntry = ({ order, onCancel, onFinished }) => {
  return (
    <div className="order-entry">
      <div className="order-details">
        <h4>
          Order #{order.number} - Status: {order.status}
        </h4>
        <p>{order.order}</p>
      </div>
      <div className="order-options">
        <button onClick={() => onFinished(order)}>Finish Order</button>
        <button className="button-clear" onClick={() => onCancel(order)}>
          Cancel Order
        </button>
      </div>
    </div>
  );
};

export default OrderEntry;
