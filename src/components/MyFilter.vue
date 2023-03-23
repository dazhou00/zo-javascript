<template>手写实现 filter</template>

<script setup>
/**
 * 返回一个新数组，每个元素都要通过回调函数测试，且为浅拷贝
 */

Array.prototype.myFilter = function (callBackFn, thisArg) {
  if (typeof callBackFn != 'function') {
    throw new Error('callbackFn must be function')
  }

  thisArg = thisArg || this
  const len = thisArg.length
  const _newArr = []

  for (let i = 0; i < len; i++) {
    if (callBackFn.call(thisArg, this[i], i, this)) {
      if (typeof this[i] == 'object') {
        _newArr.push(Object.create(this[i]))
      } else {
        _newArr.push(this[i])
      }
    }
  }

  return _newArr
}

const arr = [1, 2, 3, 4, 5, 6]

const newArr = arr.myFilter(value => value % 2 == 0)
console.log(newArr)
</script>

<style></style>
