class LRUCache {
  constructor(max) {
    this.map = new Map();
    this.max = max || 10;
  }
  set(key, value) {
    if (this.map.has(key)) {
      this.map.delete(key)
    } else {
      if (this.map.size >= this.max) {
        this.map.delete(this.map.keys().next().value)
      }
    }
    this.map.set(key,value) 
  }
  get(key) {
    let value = undefined
    if (this.map.has(key)) {
      value = this.map.get(key)
      this.map.delete(key)
      this.map.set(key,value)
    } else {
      return value
    }
  }
}