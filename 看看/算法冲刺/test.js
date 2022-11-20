
var wordBreak = function(s, wordDict) {
    if (s.length === 0) {
        return true;
    }
    for (let item of wordDict) {
        if (s.indexOf(item) === 0) {
            if (wordBreak(s.slice(item.length), wordDict) === true) {
              return true;
            }
        }
    }
    return false;
};
console.log(wordBreak("cars", ["car","ca","rs"]));