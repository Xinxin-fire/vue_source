let obj= {
  name: 'yule',
  age: 18,
}
let b = Symbol('a')
obj[b] = 'a'
obj[Symbol.iterator] = function() {
  let keys = Reflect.ownKeys(obj);
  const index = keys.indexOf(Symbol.iterator);
  keys.splice(index, 1)
  let count = 0;
  return {
    next() {
      if(count<keys.length){
        return {value: obj[keys[count++]],done:false};
        }else{
            return {value:undefined,done:true};
        }
    }
  }
}
for (let item of obj) {
  console.log(item);
}
