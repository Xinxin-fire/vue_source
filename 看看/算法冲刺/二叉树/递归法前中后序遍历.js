function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

let sonLeft = new TreeNode(4);
let sonRight = new TreeNode(5);
let left = new TreeNode(2, sonLeft, sonRight);
let right = new TreeNode(3);
let root = new TreeNode(1, left, right);
console.log(root)
// 一.递归遍历

// 1.前序遍历
function preOrder(root) {
  if (root === null) {
    return root;
  }
  console.log(root.val);
  root.left && order(root.left)
  root.right && order(root.right)
}

// 1.中序遍历
function midOrder(root) {
  if (root === null) {
    return root;
  }
  root.left && midOrder(root.left)
  console.log(root.val);
  root.right && midOrder(root.right)
}

// 1.后序遍历
function afterOrder(root) {
  if (root === null) {
    return root;
  }
  root.left && afterOrder(root.left)
  root.right && afterOrder(root.right)
  console.log(root.val);
}

afterOrder(root)