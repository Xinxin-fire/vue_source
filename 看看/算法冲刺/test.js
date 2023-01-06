class Storage {
  constructor() {
    this.instance = new Map();
  }
  static getInstance() {
    if (Storage.instance) {
      return Storage.instance
    } else {
      Storage.instance = new Storage();
      return Storage.instance
    }
  }
  getItem(key) {
    return this.instance.get(key)
  }
  setItem(key, value) {
    this.instance.set(key, value)
  }
}