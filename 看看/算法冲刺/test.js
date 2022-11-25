function a () {
  var a = 1;
  var b = 2;
  return function b(){
    console.log(a);
  }
}
let c  = a();
c()