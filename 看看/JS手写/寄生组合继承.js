function Parent(name) {
  this.name = name;
}
function Son(name, age) {
  Parent.call(this, ...arguments);
  this.age = age;
}
Son.prototype = Object.create(Parent.prototype);
Son.prototype.constructor = Son;
let son = new Son('yule', 18)
console.log(son);