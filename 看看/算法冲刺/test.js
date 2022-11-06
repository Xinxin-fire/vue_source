var longestPalindrome = function(s) {
    let length = s.length
    let dp = new Array(length).fill(0).map(() => new Array(length).fill(0));
    let res = '';
    for  (let i = 0; i< length; i++) {
        dp[i][i] = 1;
    }
    for  (let i = 1; i< length; i++) {
        for  (let j = i + 1; j < length; j++) {
            if (s[i] === s[j]) {
                dp[i][j] = dp[i-1][j-1]
                if (dp[i][j] && j - i > res.length)  {
                    res = s.slice(i, j+ 1)
                }
            } else {
                 dp[i][j] = 0
            }
        }
    }
    return res;
};
console.log(longestPalindrome("babad"));