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
    this.orders = [];
  }

  async init() {
    if (this.client) {
      return this.client;
    }

    const resp = await fetch(tokenUrl);
    if (!resp.ok) {
      throw new Error('Could not fetch token');
    }

    const { token } = await resp.json();
    this.client = new SyncClient(token);
    this.orderList = await this.client.list(orderListName);
    this.orders = await this.fetchOrders();
    return this.orders;
  }

  async fetchOrders() {
    const page = await this.orderList.getItems({ pageSize: 1000 });
    return page.items.map(item => {
      return {
        number: item.index,
        order: item.value.order,
        status: item.value.status
      };
    });
  }
}
