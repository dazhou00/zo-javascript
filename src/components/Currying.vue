<template>函数柯里化</template>

<script setup>
/**
 *
 */

function curry (fn) {
  return function _curry (...args) {
    // 判断当前已接收的参数个数是否与 fn函数的一致
    // 当已经传入的参数数量 大于等于 需要的参数时，就执行函数
    if (args.length >= fn.length) return fn.apply(this, args)

    // 没有达到个数时，需要返回一个新函数 继续接收参数
    return function (...args2) {
      // 接收参数后，需要递归调用 _curry 来检查函数格式是否达到
      return _curry.apply(this, [...args, ...args2])
    }
  }
}

const add = (a, b, c, d) => {
  return a + b + c + d
}
const curryFn = curry(add)

console.log(add(1, 2, 3, 4))
console.log(curryFn(1)(2)(3)(4))
console.log(curryFn(1, 2)(3, 4))
console.log(curryFn(1, 2, 3)(4))
console.log(curryFn(1, 2, 3, 4))
</script>

<style></style>
