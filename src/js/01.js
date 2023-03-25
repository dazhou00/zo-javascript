/**
 * 说明：
 *   写个转换函数，把一个JSON对象的key从下划线形式（Pascal）转换到小驼峰形式（Camel）
 * 示例：
 *   converter({"a_bc_def": 1}); // 返回 {"aBcDef": 1}
 */

function converter (obj) {
  /* 功能实现 */
  const newObj = {}
  for (let key in obj) {
    const keyArr = key.split('_').map((str, index) => {
      if (index == 0) return str
      return str.slice(0, 1).toUpperCase() + str.slice(1)
    })

    newObj[keyArr.join('')] = obj[key]
  }

  return newObj
}

console.log(converter({ a_bc_def: 1 }))
