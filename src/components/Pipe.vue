<template>函数组合 Pipe</template>

<script setup>
const add1 = num => num + 1
const mul5 = num => num * 5
const sub8 = num => num - 8

const pipe = function (...args) {
  return function (num) {
    return args.reduce((res, callback) => callback(res), num)
  }
}

const res = pipe(sub8, mul5, add1)(1)
console.log(res)

/**
 * compose 是从右往左的顺序执行函数
 */
</script>

<style></style>
