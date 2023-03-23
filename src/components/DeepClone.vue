<template>深拷贝</template>

<script setup>
// 参数增加一个 WeakMap 用来保存
function deepClone (originValue, map = new WeakMap()) {
  // 判断类型是否是函数
  if (originValue instanceof Function) {
    // 将函数转成字符串
    const str = originValue.toString()
    // 截取函数体内部内容
    const subStr = str.substring(str.indexOf('{') + 1, str.lastIndexOf('}'))
    // 利用截取函数体内容的字符和函数的构造器重新生成函数并返回
    return new Function(subStr)
  }

  // 判断是否是 Date 类型
  if (originValue instanceof Date) {
    return new Date(originValue.getTime())
  }

  // 判断是否是 Set 类型(浅拷贝)
  if (originValue instanceof Set) {
    return new Set([...originValue])
  }

  // 判断是否是 Map 类型(浅拷贝)
  if (originValue instanceof Map) {
    return new Map([...originValue])
  }

  // 判断是否是 Smybol 类型
  if (typeof originValue == 'symbol') {
    return Symbol(originValue.description)
  }

  // 如果传入的是 null 或者不是对象类型，直接返回
  if (originValue == null || typeof originValue != 'object') return originValue

  // 判断之前是否存存过，如果有直接返回
  if (map.has(originValue)) {
    return map.get(originValue)
  }

  // 判断传入的是数组还是对象
  const newObj = Array.isArray(originValue) ? [] : {}
  // 创建的 newObj 放到 map 里
  map.set(originValue, newObj)

  for (let key in originValue) {
    if (originValue.hasOwnProperty(key)) {
      newObj[key] = deepClone(originValue[key], map)
    }
  }

  // 对 key 是 Symbol 做处理
  const symbolKeys = Object.getOwnPropertySymbols(originValue)
  for (let key of symbolKeys) {
    newObj[key] = deepClone(originValue[key], map)
  }

  return newObj
}

const s1 = Symbol('aaa')
const s2 = Symbol('bbb')
const obj = {
  name: 'zhangsan',
  address: { city: 'beijing' },
  friends: ['lisi', 'wangwu'],
  foo: function () {
    console.log(this.name)
  },
  createTime: new Date(),
  set: new Set([1, 2, 3]),
  map: new Map([
    ['aaa', 111],
    ['bbb', 22]
  ]),
  s1: s1,
  [s2]: { a: 1 }
}

obj.info = obj

const newObj = deepClone(obj)
obj.address = 'wuhan'
obj.friends[0] = 'maliu'
obj.foo = function () {
  console.log(123)
}
obj.foo()
newObj.foo()

obj.set = new Set([3, 4, 5])
obj.map = new Map([
  ['ccc', 333],
  ['ddd', 444]
])

console.log(obj)
console.log(newObj)
</script>

<style></style>
