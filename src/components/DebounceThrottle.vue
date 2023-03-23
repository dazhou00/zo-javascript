<template>
  <div>防抖与节流</div>
  <button @click="handleClick(1, $event)">防抖</button>
  <button @click="handleClickCalcle">取消</button>
  <button @click="handleClick2">节流</button>
</template>

<script setup>
function debounce (fn, delay, immediate = false) {
  let timer = null // 定义一个定时器变量
  let isInvoke = false // 是否调用过
  function _debounce () {
    let context = this // 保存当前上下文
    let args = arguments // 保存当前参数
    if (timer) clearTimeout(timer)

    // 如果是第一次调用 立即执行
    if (immediate && !isInvoke) {
      fn.apply(context, args)
      isInvoke = true
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, delay)
    }
  }

  _debounce.cancle = function () {
    clearTimeout(timer)
    timer = null
  }

  return _debounce
}

const handleClick = debounce(
  (value, event) => {
    console.log(event, value)
    console.log(123)
  },
  1000,
  true
)

const handleClickCalcle = () => {
  console.log('取消事件')
  handleClick.cancle()
}

function throttle (fn, delay, leading = true) {
  let flag = true // 标志变量
  let isInvoke = false // 是否调用过
  return function () {
    let context = this // 保存当前上下文
    let args = arguments // 保存当前参数
    if (!flag) return // 如果标志变量为false，则不继续执行

    if (!isInvoke && leading) {
      fn.apply(context, args)
      isInvoke = true
    }
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
