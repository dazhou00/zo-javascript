<template>手写实现 Promise</template>

<script setup>
// 原生调用
/* const p1 = new Promise((resolve, reject) => {
  resolve('成功回调')
  reject('失败回调')
})
console.log('p1', p1)

const p2 = new Promise((resolve, reject) => {
  reject('失败回调')
  resolve('成功回调')
})
console.log('p2', p2)

const p3 = new Promise((resolve, reject) => {
  throw '错误'
})
console.log('p3', p3) */

/**
 * 总结
 * 1. 执行 resolve，Promise 状态会变成 fulfilled
 * 2. 执行 reject，Promise 状态会变成 rejected
 * 3. Promise 会以第一次改变后的状态为准，第一次成功就永久是 fulfilled，第一次失败就永久是 rejected
 * 4. Promise 中的 throw，相当于执行了 reject
 */

// then 方法
/* new Promise((resolve, reject) => {
  resolve('成功')
}).then(
  res => {
    console.log(res)
  },
  err => {
    console.log(err)
  }
)

new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('失败')
  }, 1000)
}).then(
  res => {
    console.log(res)
  },
  err => {
    console.log(err)
  }
)

new Promise((resolve, reject) => {
  resolve(100)
})
  .then(
    res => res * 2,
    err => {
      console.log(err)
    }
  )
  .then(
    res => {
      console.log(res)
    },
    err => {
      console.log(err)
    }
  ) */
/**
 * 总结
 * 1. then 接收两个回调，一个成功回调，一个失败回调
 * 2. 当 Promise状态为 fulfilled 执行成功回调，为rejected执行 失败回调
 * 3. 如果resolve 或 reject 在定时器里，这定时器结束后在执行 then
 * 4. then 支持链式调用，下一次 then 执行受上一次 then 返回值影响
 */

// 链式调用
/* new Promise((resolve, reject) => {
  resolve(100)
})
  .then(
    res => res * 2,
    err => {
      console.log(err)
    }
  )
  .then(
    res => {
      console.log(res)
    },
    err => {
      console.log(err)
    }
  )

new Promise((resolve, reject) => {
  resolve(100)
})
  .then(
    res => new Promise((resolve, reject) => resolve(3 * res)),
    err => {
      console.log(err)
    }
  )
  .then(
    res => {
      console.log(res)
    },
    err => {
      console.log(err)
    }
  ) */
/**
 * 总结
 * 1. then 方法本身会返回一个新的 Promise 对象
 * 2. 如果返回值是 Promise 对象，返回值为成功，新 Promise 就是成功
 * 3. 如果返回值是 Promise 对象，返回值为失败，新 Promise 就是失败
 * 4. 如果返回值 不是 Promise 对象，新 Promise 对象就是成功，值为此返回值
 */

// 自定义实现调用
import MyPromise from './myPromise'
MyPromise.any([
  new MyPromise((resolve, reject) => {
    // resolve(100)
    reject(100)
  }),
  new MyPromise((resolve, reject) => {
    // resolve(100)
    reject(200)
  })
]).then(
  res => {
    console.log(res)
  },
  err => {
    console.log(err)
  }
)
</script>
