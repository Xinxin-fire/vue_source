// 入参是物品的个数和背包的容量上限，以及物品的重量和价值数组
function knapsack(n, c, w, value) {
  const dp = new Array(c + 1).fill(0);
  let res = -Infinity;
  for (let i = 1; i <= n; i++) {
    for (let v = c; v >= w[i]; v--) {
      dp[v] = Math.max(dp[v], dp[v-w[i]] + value[i])
      if (dp[v] > res) {
        res = dp[v]
      }
    }
  }
  return res
}
console.log(knapsack(3, 6, [2, 5,4], [1, 4, 2]))
