### 04-八大排序算法JavaScript实现

算法不管对前端还是后端来说都十分重要，尤其是面试大厂时算法更是不可或缺，算法为我们提供了很多种重要的编程思想，对我们的编码，理解复杂的业务也很有帮助。而排序算法是面试中的高频考点，也可以说是算法中的敲门砖，接下来就让我们一起学习一下吧！！！

#### 一、冒泡排序

冒泡排序是最早的排序算法之一，原理是通过比较前后两个元素，这样每一层循环下来都会有一个最大的元素或者最小的元素“冒泡”出来。

```javascript
function bubble(arr) {
    if(!Array.isArray(arr)) {
        return ;
    }
    if(arr.length == 0 || arr.length == 1) {
        return arr;
    }
    for (let i = 0; i < arr.length; i++) {
        //每次外层循环都会有一个最大值排到最后，所以最后面的i个数不需要再循环
        for (let j = 0; j < arr.length-i; j++) { 
            if (arr[j+1] > arr[j]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
            }
        }
    }
    return arr
}
```

算法复杂度分析：冒泡排序需要经过两层循环，因此**时间复杂度为O(n^2)**,没有创建额外的空间因此**空间复杂度为O(n)**,不受数组顺序的影响因此是**稳定的排序**。

#### 二、选择排序

选择排序的原理是将数组中的一个元素与其他所有元素进行比较，每次都能选择一个最大或最小的元素出来。

```javascript
function select(arr) {
    if(!Array.isArray(arr)) {
        return ;
    }
    if(arr.length == 0 || arr.length == 1) {
        return arr;
    }
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if(arr[i] > arr[j] ) {
                [arr[i] ,arr[j]] = [arr[j] ,arr[i]];
            }
        }
    }
    return arr
}
```

算法复杂度分析：选择排序需要经过两层循环，因此**时间复杂度为O(n^2)**,没有创建额外的空间因此**空间复杂度为O(n)**,不受数组顺序的影响因此是**稳定的排序**。

#### 三、插入排序

插入排序，在我们生活中非常常见，比如我们打扑克牌的时候，会将一张牌插入到已经排序好的数组中，这就是插入排序的原理。

```javascript
function insert(arr) {
    if(!Array.isArray(arr)) {
        return ;
    }
    if(arr.length == 0 || arr.length == 1) {
        return arr;
    }
    for (let i = 1; i < arr.length; i++) {
        //保存当前要排序的值，和当前数组最大的索引值
        let temp = arr[i];
        let j = i-1;
        //插入排序核心代码，找到要排序的值要插入的位置，并且其后面的值往后移动一位
        while (j >= 0 && arr[j] > temp) {
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = temp;
    }
    return arr
}
```

算法复杂度分析：插入排序需要经过两层循环，因此**时间复杂度为O(n^2)**,没有创建额外的空间因此**空间复杂度为O(n)**,不受数组顺序的影响因此是**稳定的排序**。

#### 四、希尔排序

希尔排序可以算是插入排序的优化，也是第一个将时间复杂度将到O(n^2)以下的排序算法，他的原理每次将数组以一个数进行拆分，

```

```

五、归并排序

六、快速排序

七、基排序

八、堆排序