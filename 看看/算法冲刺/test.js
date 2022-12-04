function unique(arr) {
  return Array.from(new Set(arr))
}

// function unique(arr) {
//   let obj = {};
//   for (let i =0; i < arr.length; i++) {
//     if (obj[arr[i]]) {
//       arr.splice(i, 1);
//       i--;
//     } else {
//       obj[arr[i]] = true;
//     }
//   }
//   return arr
// }
// function unique(arr) {
//   let map = new Map();
//   for (let i =0; i < arr.length; i++) {
//     if (map.has([arr[i]])) {
//       arr.splice(i, 1);
//       i--;
//     } else {
//       map.set([arr[i]], true)
//     }
//   }
//   return arr;
// }

function unique(arr) {
  let res = [];
  for (let i =0; i < arr.length; i++) {
    if (!res.includes(arr[i])) {
      res.push(arr[i])
    } 
  }
  return res
}

// function unique(arr) {
//   return arr.filter((ele,index)=> {
//     let i = arr.indexOf(ele)
//     return i === index
//   })
// }

// function unique(arr) {
//   return arr.reduce((pre,cur)=> {
//     if (!pre.includes(cur)) {
//       pre.push(cur)
//     }
//     return pre
//   },[])
// }
console.log(unique([1,2,3,2,1, {a: 1}, {b: 2}, [], [], undefined, null, null, undefined, Symbol('a'), Symbol('a')]));




