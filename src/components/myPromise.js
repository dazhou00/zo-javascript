const PENDING_STATE = 'pending'
const SUCCESS_STATE = 'fulfilled'
const FAILURE_STATE = 'rejected'

class MyPromise {
  constructor (executor) {
    // 初始化值和状态
    this.PromiseResult = null // 终值
    this.PromiseState = PENDING_STATE // 状态
    this.onFulfilledCallbacks = [] // 保存成功回调
    this.onRejectedCallbacks = [] // 保存失败回调

    try {
      // 执行传递进来的函数
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      // 捕捉错误直接执行 reject
      this.reject(error)
    }
  }

  resolve (value) {
    // 状态不是等待说明状态已经改变将不再执行
    if (this.PromiseState != PENDING_STATE) return
    // 如果执行到这里，状态将变成成功
    this.PromiseState = SUCCESS_STATE
    // 记录终值
    this.PromiseResult = value
    // 执行保存的成功的回调
    while (this.onFulfilledCallbacks.length) {
      this.onFulfilledCallbacks.shift()(this.PromiseResult)
    }
  }
  reject (reason) {
    if (this.PromiseState != PENDING_STATE) return
    // 如果执行到这里，状态将变成失败
    this.PromiseState = FAILURE_STATE
    // 记录终值
    this.PromiseResult = reason
    // 执行保存的失败的回调
    while (this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()(this.PromiseResult)
    }
  }
  then (onFulfilled, onRejected) {
    // 接收两个回调 onFulfilled onRejected

    // 参数校验 确保一定是函数
    onFulfilled =
      typeof onFulfilled == 'function' ? onFulfilled : value => value
    onRejected =
      typeof onRejected == 'function'
        ? onRejected
        : reason => {
            throw reason
          }

    var thenPromise = new MyPromise((resolve, reject) => {
      const resolvePromise = callback => {
        setTimeout(() => {
          try {
            const x = callback(this.PromiseResult)
            if (x == thenPromise) throw new Error('不能返回自身...')
            if (x instanceof MyPromise) {
              // 如果返回值是 Promise
              x.then(resolve, reject)
            } else {
              // 非 promise 直接成功
              resolve(x)
            }
          } catch (error) {
            // 处理报错
            reject(error)
            throw new Error(error)
          }
        })
      }

      if (this.PromiseState == SUCCESS_STATE) {
        // 如果当前状态为成功，执行第一个回调
        resolvePromise(onFulfilled)
      } else if (this.PromiseState == FAILURE_STATE) {
        // 如果当前状态为失败，执行第二个回调
        resolvePromise(onRejected)
      } else if (this.PromiseState == PENDING_STATE) {
        // 如果当前状态为等待，展示保存两个回调
        this.onFulfilledCallbacks.push(resolvePromise.bind(this, onFulfilled))
        this.onRejectedCallbacks.push(resolvePromise.bind(this, onRejected))
      }
    })

    // 返回包装的 promise
    return thenPromise
  }
  /**
   * 1. 接收一个 Promise 数组，数组中如果有非 Promise项，则此项作为成功
   * 2. 如果 Promise都成功，则返回成功结果数组
   * 3. 如果有一个 Promise 失败，则返回失败的结果
   */
  static all (promises) {
    const result = []
    let count = 0
    return new MyPromise((resolve, reject) => {
      const addData = (index, value) => {
        result[index] = value
        count++
        if (count == promises.length) resolve(result)
      }
      promises.forEach((promise, index) => {
        if (promise instanceof MyPromise) {
          promise.then(
            res => {
              addData(index, res)
            },
            err => reject(err)
          )
        } else {
          addData(index, promise)
        }
      })
    })
  }
  /**
   * 1. 接收一个 Promise 数组，数组中如果有非 Promise 项，则此项作为成功
   * 2. 哪个 Promise最快得到结果，就返回哪个的结果，无论成功或失败
   */
  static race (promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        if (promise instanceof MyPromise) {
          promise.then(
            res => {
              resolve(res)
            },
            err => {
              reject(err)
            }
          )
        } else {
          resolve(promise)
        }
      })
    })
  }

  /**
   * 1. 接收一个 Promise 数组，数组中如果有非 Promise 项，则此项作为成功
   * 2. 把每一个 Promise 的结果集合成数组返回
   */
  static allSettled (promises) {
    const result = []
    let count = 0
    return new MyPromise((resolve, reject) => {
      const addData = (status, value, index) => {
        result[index] = { status, value }
        count++
        if (count == promises.length) resolve(result)
      }
      promises.forEach((promise, index) => {
        if (promise instanceof MyPromise) {
          promise.then(
            res => {
              addData('fulfilled', res, index)
            },
            err => reject('rejected', err, index)
          )
        } else {
          addData('fulfilled', promise, index)
        }
      })
    })
  }
  /**
   * 1. 接收一个 Promise 数组，数组中如果有非 Promise 项，则此项作为成功
   * 2. 如果有一个 Promise 成功，这返回这个成功结果
   * 3. 如果所有 Promise 都失败，则报错
   */
  static any (promises) {
    let count = 0
    return new MyPromise((resolve, reject) => {
      let count = 0
      promises.forEach((promise, index) => {
        if (promise instanceof MyPromise) {
          promise.then(
            res => {
              resolve(res)
            },
            err => {
              count++
              if (count == promises.length)
                reject(new AggregateError('All Promise were rejected'))
            }
          )
        } else {
          resolve(promise)
        }
      })
    })
  }
}

export default MyPromise
