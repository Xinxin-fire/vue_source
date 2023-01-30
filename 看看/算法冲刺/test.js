var restoreIpAddresses = function(s) {
  let result = []
  function dfs(res, use, cur) {
    if (cur > 255 || res.split('.').length > 4) {
      return;
    }
    if (res.split('.').length === 4 && use === s.length -1) {
      result.push(res);
    }
    for (let i = use; i< s.length; i++) {
      if (res) {
        dfs(res+'.' + cur, i+1, s[i])
      } else {

        dfs(s[i]+cur, i+1, s[i]+cur)
      }
    }
  }
  dfs('', 0, '');
  return result;
};
console.log(restoreIpAddresses("25525511135"));