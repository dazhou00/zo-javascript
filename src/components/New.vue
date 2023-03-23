<template>new 函数</template>

<script setup>
/**
 * 创建一个空对象 obj
 * 将该对象的原型指向构造函数的原型
 * 将这个新对象绑定到函数的 this 上
 * 执行构造函数，把构造函数的属性添加到新对象
 * 若无显示返回对象或函数，才返回 obj 对象
 *
 */

function _new (TragetClass, ...args) {
  // 创建对象空间，并将新对象的__proto__ 属性指向构造函数的 prototype
  const obj = Object.create(TragetClass.prototype)
  // 将新对象绑定到函数的 this 上，执行构造函数
  const ret = TragetClass.apply(obj, args)
  return typeof ret == 'object' ? ret : obj
}

function Foo (name) {
  this.name = name
}

Foo.prototype.sayHello = function () {
  console.log('this is ' + this.name)
}

const f = _new(Foo, 'hello')
f.sayHello()
console.log(f)
</script>

<style></style>
