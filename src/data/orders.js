import EventEmitter from 'event-emitter-es6';

let instance;
export default class Orders extends EventEmitter {
  static shared() {
    instance = instance || new Orders();
    return instance;
  }

  constructor() {
    super();
    this.client = undefined;
  }
}
