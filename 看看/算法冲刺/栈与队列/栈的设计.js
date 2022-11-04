function Stack() {
  this.stack1 = [];
  this.stack2 = [];
}

Stack.prototype.push = function(x) {
  this.stack1.push(x)
  if (!this.stack2.length || x <= this.stack2[this.stack2.length - 1]) {
    this.stack2.push(x)
  }
}

Stack.prototype.pop = function() {
  if (this.stack1.pop() === this.stack2[this.stack2.length - 1]) {
    this.stack2.pop()
  }
}

Stack.prototype.top = function() {
  return this.stack1[this.stack1.length - 1]
}

Stack.prototype.getMin = function() {
  return this.stack2[this.stack2.length - 1]
}