// 二叉搜索树的左子树上所有结点小于等于根节点,右子树上所有结点大于等于根节点
// 二叉树搜索树查找特定值
function search(root, n) {
  if (root === null) {
    return false;
  }
  if (root.val === n) {
    return root;
  } else if (root.val > n) {
    search(root.left, n)
  } else {
    search(root.right, n)
  }
}
function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}
// 插入新节点
function insertIntoBST(root, n) {
  if (root === null) {
    root = new TreeNode(n);
    return root;
  }
  if (root.val > n) {
    root.left = insertIntoBST(root.left, n)
  } else {
    root.right = insertIntoBST(root.right, n)
  }
  return root;
}

// 平衡二叉树的删除
var deleteNode = function(root, key) {
  if(root === null) {
    return root;
  }
  if (root.val === key) {
    if (!root.left && !root.right) {
      root = null
    } else if (root.left) {
      let leftMax = findLeftMax(root.left);
      // 将左子树的最大值赋值给当前节点，并删掉对应的最大值
      root.val = leftMax.val;
      root.left = deleteNode(root.left, leftMax.val);
    } else {
      let rightMin = findRightMin(root.right);
      // 将右子树的最小值赋值给当前节点，并删掉对应的最大值
      root.val = rightMin.val;
      root.right = deleteNode(root.right, rightMin.val);
    }
  } else if (root.val > key){
    root.left = deleteNode(root.left, key)
  } else {
    root.right = deleteNode(root.right, key)
  }
  return root;
}
// 寻找左子树的最大值
function findLeftMax(root) {
  while(root.right) {
    root = root.right
  }
  return root
}
// 寻找右子树的最大值
function findRightMin(root) {
  while(root.left) {
    root = root.left
  }
  return root
}

// 判断一个二叉树是否为二叉搜索树
function isValidBST(root) {
  function dfs(root, minValue, maxValue) {
    if (root === null) {
      return true;
    }
    if (root.val <= minValue || root.val >= maxValue) {
      return false;
    }
    return dfs(root.left, minValue, root.val) && dfs(root.right, root.val, maxValue)
  }
  dfs(root, -Infinity, Infinity)
}

function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

// 将一个有序数组转换成一个搜索二叉树
function sortedArrayToBST(nums) {
  if (nums.length === 0) {
    return null
  }
  return build(0, nums.length - 1)
  function build(low, high) {
    if (low > high) {
      return null
    }
    let mid = Math.floor(low + (high - low/2))
    let cur = new TreeNode(nums[mid])
    cur.left = build(low, mid - 1)
    cur.right = build(mid + 1, high)
    return cur
  }
}
// 平衡二叉树
var isBalanced = function(root) {
  if(root === null) {
    return true;
  }
  let flag = true
  function dfs(root) {
    if (root === null) {
      return 0
    }
    let leftHeight = dfs(root.left)
    let rightHeight = dfs(root.right)
    if (Math.abs(leftHeight - rightHeight) > 1) {
      flag = false;
      // 结束递归
      return 0;
    }
    return Math.max(leftHeight, rightHeight) + 1
  }
  dfs(root);
  return flag
};
// 构造平衡二叉树
var balanceBST = function(root) {
  let res = []
  inorder(root);
  function inorder(root) {
    if (root === null) {
      return;
    }
    root.left && inorder(root.left)
    res.push(root.val)
    root.right && inorder(root.right)
  }
  function bfs(left, right) {
    if (left > right) {
      return null;
    }
    let mid = Math.floor(left + (right - left)/2);
    let  ret = new TreeNode(res[mid]);
    ret.left = bfs(left, mid -1);
    ret.right = bfs(mid+ 1, right);
    return ret
  }
  return bfs(0, res.length -1)
};