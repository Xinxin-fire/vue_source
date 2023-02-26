let local = {
  el: {
    empty: {
      description: "暂无数据",
    },
  },
};

function $t(local, path) {
    let arr = path.split('.');
    let value = local;
    for (let item of arr) {
        if (value[item]) {
          value = value[item];
        } else {
          return "";
        }
    }
    return value;
}
console.log($t(local, "el.empty.description"))
