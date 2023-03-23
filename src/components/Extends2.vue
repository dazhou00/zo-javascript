<template>实现继承</template>

<script setup>
// 通过原型链实现继承
// 父类：公共属性和方法
function Person (name) {
  this.name = name
}

// 父类定一个吃的方法
Person.prototype.eating = function () {
  console.log(this.name + ' is eating')
}

// 子类：属性和方法
function Student (name, sno) {
  // 借用父类构造函数
  Person.call(this, name)
  this.sno = sno
}

// Student 的原型对象指向一个 Person的实例对象 per
const per = new Person('zo')
console.log(per)
Student.prototype = per

// 子类定义一个学习的方法
Student.prototype.studying = function () {
  console.log(this.name + ' is studying')
}

const stu = new Student('zz')

console.log(stu)
console.log(stu.name) // stu 对象中没有 name 属性，回去他的原型 per 上面找，per 对象上有属性 name
stu.eating()
stu.studying()
/**
 * 1. 会调用两次父类构造函数
 * 2. 子类对象的原型上会多出没有的属性
 */
</script>

<style></style>
