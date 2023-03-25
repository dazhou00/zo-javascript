// 输入项
const itemList = [
  {
    id: 4,
    paramName: '供应链属性',
    parentId: 0
  },
  {
    id: 2,
    paramName: '供应链属性',
    parentId: 4
  },
  {
    id: 5,
    paramName: '供应链属性',
    parentId: 0
  },
  {
    id: 6,
    paramName: '供应链属性',
    parentId: 5
  }
]

/**
 * 补充下面函数，函数返回示例如下
 * @param {ItemList} arr
 *	@return {ItemTreeNode[]}
 **/
function buildTree (arr) {
  const newArr = arr.filter(a => a.parentId == 0)

  arr.forEach(child => {
    if (child.parentId != 0) {
      const index = newArr.findIndex(p => p.id == child.parentId)
      if (index != -1) {
        if (typeof newArr[index].children == 'undefined')
          newArr[index].children = []

        newArr[index].children.push(child)
      }
    }
  })

  return newArr
}

console.dir(buildTree(itemList))
