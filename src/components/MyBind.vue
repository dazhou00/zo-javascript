<template>手写 bind</template>

<script setup>
const obj = { name: 123 }

function foo (value) {
  console.log(this.name, value)
}
foo.bind(obj)(1)
foo.bind(obj, 2)()

/**
 * 挂载到 Function 原型上
 * 具有 thisArg 和原函数的其它参数
 * thisArg 传递的任何值都需要转换为对象
 * bind中输入的原函数所需要的参数 需要在返回函数中能接收
 */

Function.prototype.myBind = function (thisArg, ...args1) {
  thisArg = Object(thisArg)
  const _this = this
  return function (...args2) {
    return _this.apply(thisArg, args1.concat(args2))
  }
}

foo.myBind(obj)(1)
foo.myBind(obj, 2)()
</script>

<style></style>
