let p1 = new Promise((resolve, reject) => {
  resolve(1);
})
console.log(p1);
let p2 = p1.then(
  (res) => {
    resolve(res+1)
    console.log(res);
  },
  // (err) => {
  //   console.log(err);
  // },
)
console.log(p2);