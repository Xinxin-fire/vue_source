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
// 前序遍历
function preorderTraversal(root) {
  if (root === null) {
    return [];
  }
  let stack = [root]
  let res = [];
  while(stack.length) {
    let node = stack.pop();
    res.push(node.val);
    node.right && stack.push(node.right)
    node.left && stack.push(node.left)
  }
  return res;
}
// 后序遍历
function postorderTraversal(root) {
  if (root === null) {
    return [];
  }
  let stack = [root]
  let res = [];
  while(stack.length) {
    let node = stack.pop();
    res.unshift(node.val);
    node.left && stack.push(node.left)
    node.right && stack.push(node.right)
  }
  return res;
}
// 中序遍历
function inorderTraversal(root) {
  let stack = []
  let res = [];
  let cur = root;
  while(cur || stack.length) {
    while (cur) {
      stack.push(cur);
      cur = cur.left;
    }
    cur = stack.pop();
    res.push(cur.val);
    cur = cur.right;
  }
  return res;
}
console.log(inorderTraversal(root))

// 标记法中序遍历
var inorderTraversal = function(root) {
  if (root === null) {
      return []
  }
  let res= [];
  let quene = [root];
  while (quene.length) {
      let node = quene.pop();
      if (!node) {
          res.push(quene.pop().val)
          continue
      }
      node.right && quene.push(node.right);
      quene.push(node);
      quene.push(null);
      node.left && quene.push(node.left);
      
  }
  return res
};