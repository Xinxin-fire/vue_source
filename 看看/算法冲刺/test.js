// 1.复习昨天内容（css、loader/plugin手写）
// 2.买卖股票问题、compose、settimeout 模拟实现 setinterval
// 3.js打卡
// 4.浏览器原理打卡
// 5.算法两道
// 6.手写1道

// 121. 买卖股票的最佳时机（easy）限定交易次数 k=1 
// 122. 买卖股票的最佳时机 II（medium）交易次数无限制 k = +infinity 
// 123. 买卖股票的最佳时机 III (hrad) 限定交易次数 k=2 
// 188. 买卖股票的最佳时机 IV (hard) 限定交易次数 最多次数为 k 
// 309. 最佳买卖股票时机含冷冻期(medium) 含有交易冷冻期 
// 714. 买卖股票的最佳时机含手续费
// dp[n][k][0] = Math.max(dp[n-1][k][0], dp[n-1][k][1] - price[n);
// dp[n][k][1] = Math.max(dp[n-1][k][1], dp[n-1][k-1][0] + price[n])
// 6. 手写两道

var maxProfit = function(k, prices) {
  let length = prices.length;
  let fn = new Array(length).fill(0).map(() => new Array(k+1).fill(0).map(() => new Array(2).fill(0)));
  console.log(fn)
  fn[0][k-1][1] = -prices[0];
  for (let i = 1; i < length; i++) {
    let count = k;
    while(count >= 1) {
      // 卖出时次数减一
      fn[i][k][0] = Math.max(fn[i-1][k][0], fn[i-1][k-1][1]+prices[i])
      fn[i][k][1] = Math.max(fn[i-1][k][1], fn[i-1][k][0] - prices[i])
      count--;
    }
  }
  return fn[length-1][k][0]
};
console.log(maxProfit(2, [2,4,1]));