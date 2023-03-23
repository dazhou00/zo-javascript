<template>在对象上找到符合规则的属性</template>

<script setup>
/**
 * 返回一个新数组，每个元素都需要通过回调函数测试，且为对象的属性名。
 */
Object.prototype.filterPrototype = function (callBackFn, thisArg) {
  if (typeof callBackFn != 'function') {
    throw new Error('callBackFn must be function')
  }

  thisArg = thisArg || this

  const prototype = []
  for (let prop in thisArg) {
    if (callBackFn.call(thisArg, prop, this[prop], this)) {
      prototype.push(prop)
    }
  }

  return prototype
}

const obj = {
  a1: 1,
  a2: 2,
  b1: 3,
  c1: 4
}

const arr = obj.filterPrototype(key => /^a/.test(key))
console.log(arr)
</script>

<style></style>
