<template>
  <div>防抖与节流</div>
  <button @click="handleClick">防抖</button>
  <button @click="handleClick2">节流</button>
</template>

<script setup>
function debounce (fn, delay) {
  let timer = null // 定义一个定时器变量
  return function () {
    let context = this // 保存当前上下文
    let args = arguments // 保存当前参数
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(context, args)
    }, delay)
  }
}

const handleClick = debounce(() => {
  console.log(123)
}, 500)

function throttle (fn, delay) {
  let flag = true // 标志变量
  return function () {
    let context = this // 保存当前上下文
    let args = arguments // 保存当前参数
    if (!flag) return // 如果标志变量为false，则不继续执行
    flag = false
    setTimeout(() => {
      fn.apply(context, args)
      flag = true
    }, delay)
  }
}

const handleClick2 = throttle(() => {
  console.log(456)
}, 1000)
</script>
