import React from 'react';

import './OrderEntry.css';

const OrderEntry = ({ children: drink, orderNumber, onCancel, onFinished }) => {
  return (
    <div className="order-entry">
      <div className="order-details">
        <h4>Order #{orderNumber}</h4>
        <p>{drink}</p>
      </div>
      <div className="order-options">
        <button onClick={() => onFinished(orderNumber)}>Finish Order</button>
        <button className="button-clear" onClick={() => onCancel(orderNumber)}>
          Cancel Order
        </button>
      </div>
    </div>
  );
};

export default OrderEntry;
