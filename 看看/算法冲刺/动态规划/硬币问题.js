
const coinChange = function(coins, amount) {
  let f = [];
  f[0] = 0;
  for (let i = 1; i <= amount; i++) {
    f[i] = Infinity;
    for (let j = 0; j < coins.length; j++) {
      // 总额需大于单个硬币的面额
      if (i >= coins[j]) {
        // 状态转移方程,循环coins中的硬币个数,amount等于随机拿走coins中一枚硬币的最小结果
        f[i] = Math.min(f[i], f[i - coins[j]] + 1);
      }
    }
  }
  if (f[amount] === Infinity) {
    return -1;
  }
  return f[amount];
};
console.log(coinChange([1, 2, 5], 11));