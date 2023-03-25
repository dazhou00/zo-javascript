const arr = ['hi', ['hello', 1], 2, [3, [4, [5]]]]
function flat (list, depth = 1) {
  //...
  return list.reduce((pre, item) => {
    return pre.concat(
      Array.isArray(item) && depth > 1 ? flat(item, depth - 1) : [item]
    )
  }, [])
}
console.log(flat(arr))
// 默认展开一层
// ["hi","hello",1,2,3,[4,[5]]]
console.log(flat(arr, 3))
// 第二个参数支持控制层级
// ['hi', 'hello', 1, 2, 3, 4, 5]

Array.prototype.flatten = function (depth = 1) {
  return this.reduce((acc, item) => {
    return acc.concat(
      Array.isArray(item) && depth > 1 ? item.flatten(depth - 1) : item
    )
  }, [])
}
