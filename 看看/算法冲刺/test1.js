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

// 买卖股票问题
// 买卖一次
// dp[i][0] 第i天不持有股票， dp[i][1]第i天持有股票
// 买卖两次
// 0未持有、1持有
dp[i][2][0] = Math.max(dp[i-1][2][0], dp[i-1][2][1] - prices[i]);
dp[i][2][1] = Math.max(dp[i-1][2][1], dp[i-1][1][0] + prices[i])
dp[i][1][0] = Math.max(dp[i-1][1][0], dp[i-1][1][1] - prices[i]);
dp[i][1][1] = Math.max(dp[i-1][1][1], dp[i-1][0][0] + prices[i])