// 1.验证一个二叉树是否是高度平衡的二叉树
function isBalanced(root) {
  let flag = true
  function dfs(root) {
    if (!root || !flag) {
      return 0
    }
    let left = dfs(root.left)
    let right = dfs(root.right)
    if (Math.abs(left - right) > 1) {
      flag = false;
      return 0
    }
    return Math.max(left, right) + 1
  }
  dfs(root)
  return flag
}
function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}
// 将二叉搜索树转换成平衡二叉树
function balanceBST(root) {
  if (root=== null) {
    return root
  }
  let arr = []
  function midOrder(root) {
    if (root === null) {
      return root
    }
    root.left && midOrder(root.left)
    arr.push(root.val)
    root.right && midOrder(root.right)
  }
  midOrder(root)
  function bfs(low, high) {
    if (low > high) {
      return null;
    }
    let mid = Math.floor((low + high) / 2);
    let cur = new TreeNode(arr[mid])
    cur.left = bfs(low, mid -1)
    cur.right = bfs(mid + 1, high)
    return cur
  }
  return bfs(0, arr.length - 1)
}
