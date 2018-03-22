import SyncClient from 'twilio-sync';
import EventEmitter from 'event-emitter-es6';

const tokenUrl = 'https://dramatic-sidewalk-3548.twil.io/barista-token';
const orderListName = 'orders';

let instance;
export default class Orders extends EventEmitter {
  static shared() {
    instance = instance || new Orders();
    return instance;
  }

  constructor() {
    super();
    this.client = undefined;
    this.orderList = undefined;
    this.orders = undefined;
  }

  async init() {
    if (this.orders) {
      return this.orders;
    }

    const resp = await fetch(tokenUrl);
    if (!resp.ok) {
      throw new Error('Could not fetch token');
    }

    const { token } = await resp.json();
    this.client = new SyncClient(token);
    this.orderList = await this.client.list(orderListName);
    this.orders = await this.fetchOrders();
    this.addEventListeners();
    return this.orders;
  }

  async updateStatus(order, status) {
    const idx = this.orders.findIndex(item => item.number === order.number);
    this.orders[idx] = { ...order, status };
    this.emit('updated', { orders: this.orders });
    return this.orderList.update(order.number, { status });
  }

  async fetchOrders() {
    const page = await this.orderList.getItems({ pageSize: 1000 });
    return page.items.map(this.convertItemToOrder);
  }

  addEventListeners() {
    this.orderList.on('itemAdded', evt => {
      const item = evt.item.data;
      this.orders = [...this.orders, this.convertItemToOrder(item)];
      this.emit('updated', { orders: this.orders });
    });
    this.orderList.on('itemUpdated', evt => {
      const order = this.convertItemToOrder(evt.item.data);
      const idx = this.orders.findIndex(
        existingItem => order.number === existingItem.number
      );
      const newOrders = [...this.orders];
      newOrders[idx] = order;
      this.orders = newOrders;
      this.emit('updated', { orders: this.orders });
    });
    this.orderList.on('itemRemoved', item => {
      const order = this.convertItemToOrder(item);
      const idx = this.orders.findIndex(
        existingItem => order.number === existingItem.number
      );
      const newOrders = [...this.orders];
      newOrders.splice(idx, 1);
      this.orders = newOrders;
      this.emit('updated', { orders: this.orders });
    });
  }

  convertItemToOrder(item) {
    return {
      number: item.index,
      order: item.value.order,
      status: item.value.status
    };
  }
}
