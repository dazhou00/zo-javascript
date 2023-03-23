<template>手写实现 map</template>

<script setup>
/**
 * 返回一个新数组，每个元素都是回调函数的返回值
 */

Array.prototype.myMap = function (callBackFn, thisArg) {
  if (typeof callBackFn != 'function') {
    throw new Error('callBackFn must be function')
  }

  const arr = []
  thisArg = thisArg || this
  const len = this.length

  for (let i = 0; i < len; i++) {
    arr.push(callBackFn.call(thisArg, this[i], i, this))
  }

  return arr
}

const arr = [1, 2, 3, 4, 5, 6]

const newArr = arr.myMap(value => value * 2)
console.log(newArr)
</script>
