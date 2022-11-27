let obj = {
  a: 1,
  b: 2
}
for (let item in obj) {
  console.log(item)
}

function A (name){
  this.name = name;
}
function B (name, age) {
  B.prototype = new A();
  this.age = age
}
B.prototype.a = '1';

let d = new B('yuta', '18', '180')
let c = new A('2')
console.log(c.a)