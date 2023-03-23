<template>手写 call</template>

<script setup>
const obj = { name: 123 }

function foo (value) {
  console.log(this.name, value)
}
foo.call(obj, 1)
foo.call(obj, 2)

/**
 * 挂载到 Function 原型上
 * 具有 thisArg 和原函数的其它参数
 * 需要判断 thisArg 是否为 undefined，如果是要给他赋值为全局对象
 * 返回函数的调用结果
 */

Function.prototype.myCall = function (thisArg, ...args) {
  if (thisArg) {
    thisArg = Object(thisArg)
  } else {
    thisArg = typeof window != 'undefined' ? window : global
  }
  thisArg._fn = this

  const result = thisArg._fn(...args)

  delete thisArg._fn

  return result
}

foo.myCall(obj)
foo.myCall(obj, 2)
</script>

<style></style>
