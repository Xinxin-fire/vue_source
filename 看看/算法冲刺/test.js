var numEnclaves = function(grid) {
  let row = grid.length;
  let col = grid[0].length;
  for (let i = 0; i < row; i++) {
    if (grid[i][0] === 1) {
      dfs(i, 0);
    }
    if (grid[i][col-1] === 1) {
      dfs(i, col-1);
    }
  }
  for (let j = 0; j < col; j++) {
    if (grid[0][j] === 1) {
      dfs(0, j);
    }
    if (grid[row-1][j] === 1) {
      dfs(row-1, j);
    }
  }
  console.log(grid);
  let res = 0;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
    if (grid[i][j] === 1) {
      res++
    }
    }
  }
  return res
  function dfs(i, j) {
    if (i < 0 || i >= row || j < 0 || j >= col) {
      return;
    }
    if (grid[i][j] === 1) {
      grid[i][j] = 0;
      dfs(i -1, j)
      dfs(i + 1, j)
      dfs(i, j - 1)
      dfs(i, j + 1)
    }
  }
};
console.log(numEnclaves([
  [0,0,0,1,1,1,0,1,0,0],
  [1,1,0,0,0,1,0,1,1,1],
  [0,0,0,1,1,1,0,1,0,0],
  [0,1,1,0,0,0,1,0,1,0],
  [0,1,1,1,1,1,0,0,1,0],
  [0,0,1,0,1,1,1,1,0,1],
  [0,1,1,0,0,0,1,1,1,1],
  [0,0,1,0,0,1,0,1,0,1],
  [1,0,1,0,1,1,0,0,0,0],
  [0,0,0,0,1,1,0,0,0,1]
]));
