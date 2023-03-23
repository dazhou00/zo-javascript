<template>手写 call</template>

<script setup>
const obj = { name: 123 }

function foo (value, value2) {
  console.log(this.name, value, value2)
}
foo.apply(obj, [1, 2, 3])
foo.apply(obj, [1, 2, 3])

/**
 * 调用一个具有给定 this 值的函数，以及以一个数组(或类数组对象)的形式提供的参数
 */

Function.prototype.myApply = function (thisArg, args) {
  if (thisArg) {
    thisArg = Object(thisArg)
  } else {
    thisArg = typeof window != 'undefined' ? window : global
  }
  thisArg._fn = this
  const result = args ? thisArg._fn(...args) : thisArg._fn()

  delete thisArg._fn

  return result
}

foo.myApply(obj, [2, 4])
foo.myApply(obj, [5, 6])
</script>

<style></style>
