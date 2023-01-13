
class State {
  static obj = {
    a:1,
    b: function() {
      console.log(this);
    }
  }
  getObj() {
    console.log(this);
  }
}

let state = new State();
console.log(state);
// state.obj.a = 2;
state.obj.b();
state.getObj();
let state1 = new State();
console.log(state1);