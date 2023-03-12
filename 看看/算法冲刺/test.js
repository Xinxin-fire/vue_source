var minPathSum = function (grid) {
  let result = Infinity;
  function getRes(row, col, res) {
    if (
      (row === grid.length && col === grid[0].length - 1) ||
      (row === grid.length - 1 && col === grid[0].length)
    ) {
      result = Math.min(res, result);
      return;
    }
    for (let i = row; i < grid.length; i++) {
      for (let j = col; j < grid[0].length; j++) {
        getRes(i, j + 1, res + grid[i][j]);
        getRes(i + 1, j, res + grid[i][j]);
      }
    }
  }
  getRes(0, 0, 0);
  return result;
};
console.log(minPathSum([[1,3,1],[1,5,1],[4,2,1]]))