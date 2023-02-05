
// // 岛屿题
// // DFS递归
// // 边界处理
// if (i < 0 || j < 0 || i >= m || j >= n) {
//   // 超出索引边界
//   return;
// }
// // 递归方向
// dfs(grid, i + 1, j);
// dfs(grid, i, j + 1);
// dfs(grid, i - 1, j);
// dfs(grid, i, j - 1);
// // 标记已经递归过的路径
// grid[i][j] = '0';

function myNew(fn) {
  if (typeof fn !== 'function') {
    throw new Error('参数不为函数');
  }
  let args = Array.proptotype.slice(1);
  let obj = Object.create(fn.proptotype);
  let res = fn.call(obj, ...args);
  if ((typeof res === 'object' || typeof res === 'function') && !res) {
    return res;
  } else {
    return obj;
  }
}
let obj = myNew(Fn, args);