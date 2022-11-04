let root = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4
    },
    right: {
      val: 5
    }
  },
  right: {
    val: 3
  }
}
// 层序遍历 BFS
function sequenceOrder(root) {
  if (root === null) {
    return root;
  }
  let stack = [];
  let res = [];
  stack.push(root);
  let length = stack.length;
  while (stack.length) {
    let node = stack.shift();
    res.push(node.val);
    node.left && stack.push(node.left);
    node.right && stack.push(node.right);
    console.log(node.val);
  }
  return res;
}
// 层序遍历分层
function levelOrder(root) {
  if (root === null) {
    return []
  }
  let res = [];
  let stack = [root];
  while (stack.length) {
    let length = stack.length;
    let quene = [];
    for (let i = 0; i < length; i++) {
      let node = stack.shift();
      quene.push(node.val);
      node.left && stack.push(node.left);
      node.right && stack.push(node.right);
    }
    res.push(quene)
  }
  return res
}
// 递归版层序遍历
var levelOrder = function(root) {
  if (root === null) {
      return [];
  }
  let res = [];
  dfs(root, 0, res);
  return res;
  function dfs(root, step) {
      if (root === null) {
          return;
      }
      if (!res[step]) {
          res[step] = [];
      }
      res[step].push(root.val);
      root.left && dfs (root.left, step + 1)
      root.right && dfs (root.right, step + 1)
  }
};
// 二叉树的翻转
function invertTree(root) {
  if (root === null) {
    return root;
  }
  let right = invertTree(root.right)
  let left = invertTree(root.left)
  root.right = left;
  root.left = right;
  return root;
}
console.log(levelOrder(root))