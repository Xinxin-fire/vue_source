// 设计一个字符串支持addword和search操作 字符串由.和小写字母组成,.可以匹配任意字母
function WordDictionary() {
  this.words = {};
}
WordDictionary.prototype.addWord = function(word) {
  if (this.words[word.length]) {
    this.words[word.length].push(word);
  } else {
    this.words[word.length] = [word];
  }
}

WordDictionary.prototype.search = function(word) {
  if (!this.words[word.length]) {
    return false;
  }
  if (word.indexOf('.') !== -1) {
    return this.words[word.length].includes(word);
  }
  const reg = new RegExp(word);
  return this.words[word.length].some(ele => {
    return reg.test(ele);
  })
}