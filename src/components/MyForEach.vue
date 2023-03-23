<template>手写实现 forEach</template>

<script setup>
/**
 * 1. 挂载到 Array 的原型上
 * 2. 具有 callbackFn thisArg 两个参数
 * 3. callBackFn 是一个函数，且觉有三个参数
 * 4. 返回 undefined
 */

Array.prototype.myForEach = function (callBackFn, thisArg) {
  if (typeof callBackFn != 'function') {
    throw new Error('callBackFn must be function')
  }

  thisArg = thisArg || this
  const len = this.length
  for (let i = 0; i < len; i++) {
    callBackFn.call(thisArg, this[i], i, this)
  }
}
;[1, 2, 3, 4, 5, 6, 7].myForEach((value, index) => {
  console.log(value, index)
})
</script>

<style></style>
