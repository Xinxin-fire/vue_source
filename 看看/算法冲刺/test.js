const data = [
  {
    value: 'w',
    count: 5
  },
  {
    value: 'e',
    count: 4
  },
  {
    value: 'v',
    count: 2
  },
  {
    value: 'g',
    count: 2
  },
  {
    value: 'a',
    count: 2
  },
  {
    value: 'e',
    count: 2
  },
  {
    value: '2',
    count: 1
  },
  {
    value: '9',
    count: 1
  },
  {
    value: '4',
    count: 1
  }
]
function sort(arr) {
  arr.sort((a, b) =>  b.count - a.count);
  for (let i = 0; i < arr.length; i++) {
    if (!isNaN(arr[i].value)) {
      arr.splice(i, 1);
      i--
      continue;
    }
    let j = i + 1;
    while(arr[j].count === arr[i].count && j < arr.length) {
      j++;
    }
    if (j > i + 1) {
      partSort(arr, i, j - 1);
      i = j - 1;
    }
  }
  function partSort(arr, i, j) {
    console.log(i, j);
    for (let m = i; m <=j; m++) {
      for (let n = i + 1; n <=j; n++ ) {
        if (arr[m].value.charCodeAt() > arr[n].value.charCodeAt()) {
          let temp = arr[m];
          arr[m] = arr[n];
          arr[n] = temp;
          // [arr[m], arr[n]] = [arr[n], arr[m]];
        }
      }
    }
  }
  console.log(arr);
}

sort(data);